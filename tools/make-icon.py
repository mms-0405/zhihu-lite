"""从 apk图标.jpg 生成全套启动图标资源（各密度 WebP + Android 8+ 自适应图标）。

用法：python tools/make-icon.py        （在工程根目录，或任意目录下直接跑）

为什么不是简单地把照片缩成几张 48/72/96... 的图：

这张照片是一只小野猪，原图 916×1180 竖构图，正方形最多只能取 916，装不下整只，
必须取舍——保脸：耳朵、眼睛、鼻头才是缩到 48px 还认得出来的部分。裁切框因此正对头部中心。

而 Android 8+ 的自适应图标只保证中央 66dp 圆形安全区一定可见（108dp 画布，
遮罩只作用在中央 72dp 视区）。量过头部轮廓：耳朵尖是离头部中心最远的像素，
左耳尖 (225,169) 距中心 (380,394) 为 273px。所以：
  1. 裁切框 760px 见方、正对头部中心，耳尖落在距画布中心 30.3dp 处，
     在 33dp 安全半径内（圆形、圆角、最严的安全圆三种遮罩都验过，耳朵完整）；
  2. 清晰照片占画布 78%，仍盖满整个 72dp 视区，任何遮罩形状都看不到照片边缘；
  3. 背景层是同图的镜像延展 + 高斯模糊，只在前景被启动器轻微缩放/视差时兜底。
"""
import os
import sys
from PIL import Image, ImageFilter, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'apk图标.jpg')
RES = os.path.join(ROOT, 'app', 'src', 'main', 'res')
PREVIEW = os.path.join(ROOT, 'tools', 'icon-preview.png')

# 裁到头部：正对头部中心 (380,394)，760px 见方。再大脸就小，再小左耳尖会被
# 最严的遮罩切掉（实测耳尖距中心 273px，裁切框小于 700px 就超出 33dp 安全半径）。
CROP = (0, 14, 760, 774)
# 清晰照片占 108dp 画布的比例，实测耳尖距中心 30.3dp，安全圆半径 33dp。
PHOTO_SHARE = 0.78

LEGACY = [('mdpi', 48), ('hdpi', 72), ('xhdpi', 96), ('xxhdpi', 144), ('xxxhdpi', 192)]
LAYER = [('mdpi', 108), ('hdpi', 162), ('xhdpi', 216), ('xxhdpi', 324), ('xxxhdpi', 432)]

FLIP_LR = Image.Transpose.FLIP_LEFT_RIGHT
FLIP_TB = Image.Transpose.FLIP_TOP_BOTTOM

# 照片存 PNG 的话各密度加起来约 1MB；有损 WebP（alpha 无损）视觉上看不出差别，
# 只有 140KB。minSdk 23 远高于 WebP 资源要求的 API 14/18。
WEBP = {'lossless': False, 'quality': 92, 'alpha_quality': 100, 'method': 6}

photo = Image.open(SRC).convert('RGB').crop(CROP)


def mirrored(img, size):
    """把图片向四周镜像延展，再从中裁出 size×size 的正中窗口。"""
    tile = img.size[0]
    mosaic = Image.new('RGB', (tile * 3, tile * 3))
    for row in range(3):
        for column in range(3):
            piece = img
            if column != 1:
                piece = piece.transpose(FLIP_LR)
            if row != 1:
                piece = piece.transpose(FLIP_TB)
            mosaic.paste(piece, (column * tile, row * tile))
    left = tile + (tile - size) // 2
    return mosaic.crop((left, left, left + size, left + size))


def photo_square(size):
    return photo.resize((size, size), Image.Resampling.LANCZOS)


def legacy_icon(size):
    out = photo_square(size)
    if size <= 96:
        # 48/72px 的照片会糊成一团，轻微锐化让铁丝网还看得清
        out = out.filter(ImageFilter.UnsharpMask(radius=1.0, percent=60, threshold=2))
    return out


def round_icon(size):
    out = photo_square(size).convert('RGBA')
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)
    out.putalpha(mask)
    return out


def layer_foreground(size):
    inner = max(2, round(size * PHOTO_SHARE))
    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    out.paste(photo_square(inner).convert('RGBA'), ((size - inner) // 2, (size - inner) // 2))
    return out


def layer_background(size):
    inner = max(2, round(size * PHOTO_SHARE))
    return mirrored(photo_square(inner), size).filter(
        ImageFilter.GaussianBlur(radius=max(2.0, size * 0.03)))


def load(density, name, size):
    path = os.path.join(RES, 'mipmap-' + density, name + '.webp')
    return Image.open(path).convert('RGBA').resize((size, size), Image.Resampling.LANCZOS)


def masked(img, shape, size):
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    viewport = size * 2 / 3          # 遮罩实际作用的 72dp 视区
    safe = size * 66 / 108           # 所有遮罩都必须显示的 66dp 安全圆
    box = [(size - viewport) / 2] * 2 + [(size + viewport) / 2] * 2
    if shape == 'circle':
        draw.ellipse(box, fill=255)
    elif shape == 'squircle':
        draw.rounded_rectangle(box, radius=viewport * 0.3, fill=255)
    else:
        low = (size - safe) / 2
        draw.ellipse((low, low, size - low, size - low), fill=255)
    out = img.copy()
    out.putalpha(mask)
    return out


def write_preview(size=240):
    """预览按实际产出的 webp 渲染：方形老图标 + 三种遮罩下的自适应图标。"""
    sheet = Image.new('RGB', (size * 4 + 50, size + 20), (245, 245, 245))
    square = load('xxxhdpi', 'ic_launcher', size)
    sheet.paste(square, (10, 10), square)
    for index, shape in enumerate(('circle', 'squircle', 'safe')):
        composite = load('xxxhdpi', 'ic_launcher_background', size)
        foreground = load('xxxhdpi', 'ic_launcher_foreground', size)
        composite.paste(foreground, (0, 0), foreground)
        tile = masked(composite, shape, size)
        sheet.paste(tile, (10 + (size + 10) * (index + 1), 10), tile)
    sheet.save(PREVIEW)
    return PREVIEW


def main():
    # Windows 控制台默认 cp1252，直接 print 中文会 UnicodeEncodeError
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass
    for density, size in LEGACY:
        folder = os.path.join(RES, 'mipmap-' + density)
        os.makedirs(folder, exist_ok=True)
        for stale in ('ic_launcher.png', 'ic_launcher_round.png'):
            if os.path.exists(os.path.join(folder, stale)):
                os.remove(os.path.join(folder, stale))
        legacy_icon(size).save(os.path.join(folder, 'ic_launcher.webp'), **WEBP)
        round_icon(size).save(os.path.join(folder, 'ic_launcher_round.webp'), **WEBP)
    for density, size in LAYER:
        folder = os.path.join(RES, 'mipmap-' + density)
        os.makedirs(folder, exist_ok=True)
        for stale in ('ic_launcher_background.png', 'ic_launcher_foreground.png'):
            if os.path.exists(os.path.join(folder, stale)):
                os.remove(os.path.join(folder, stale))
        layer_background(size).save(os.path.join(folder, 'ic_launcher_background.webp'), **WEBP)
        layer_foreground(size).save(os.path.join(folder, 'ic_launcher_foreground.webp'), **WEBP)
    total = sum(os.path.getsize(os.path.join(RES, folder, name))
                for folder in os.listdir(RES) if folder.startswith('mipmap-')
                for name in os.listdir(os.path.join(RES, folder)))
    print('图标资源已写出，共 %d 字节' % total)
    print('预览图：%s' % write_preview())


if __name__ == '__main__':
    main()
