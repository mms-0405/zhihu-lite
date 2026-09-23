(() => {
  const styleId = 'zhihu-shell-clean-style';
  let style = document.getElementById(styleId);
  if (!style) {
    style = document.createElement('style');
    style.id = styleId;
    (document.head || document.documentElement).appendChild(style);
  }
  let viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    viewport = document.createElement('meta');
    viewport.name = 'viewport';
    (document.head || document.documentElement).appendChild(viewport);
  }
  viewport.content = 'width=device-width, initial-scale=1, minimum-scale=0.5, maximum-scale=4, user-scalable=yes';
  style.textContent = `
    html, body, #root, .App, .App-main {
      box-sizing: border-box !important;
      width: 100% !important;
      min-width: 0 !important;
      max-width: 100% !important;
      overflow-x: hidden !important;
      text-size-adjust: 100% !important;
      -webkit-text-size-adjust: 100% !important;
    }
    body { margin: 0 !important; }
    .AppHeader, .AppHeader-inner, .QuestionHeader-content,
    .Question-main, .Topstory-container, .Search-container,
    .Profile-main, .Settings-main {
      box-sizing: border-box !important;
      width: 100% !important;
      min-width: 0 !important;
      max-width: 100% !important;
    }
    .AppHeader-inner, .QuestionHeader-content {
      padding-left: 12px !important;
      padding-right: 12px !important;
    }
    .Question-main, .Topstory-container, .Search-container,
    .Profile-main, .Settings-main {
      display: block !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      padding-left: 8px !important;
      padding-right: 8px !important;
    }
    .Question-main, .Question-mainColumn, .QuestionHeader-main,
    .Topstory-mainColumn, .SearchMain, .Profile-mainColumn,
    .Profile-sideColumn,
    .ContentItem, .RichContent, .RichText, .List, .List-item,
    .Card, .Comments-container, .Comments, .CommentListV2,
    [class*="CommentList"], [class*="Comments-container"] {
      box-sizing: border-box !important;
      width: 100% !important;
      min-width: 0 !important;
      max-width: 100% !important;
    }
    .Profile-sideColumn {
      overflow: visible !important;
    }
    .RichText, .ztext, .CommentContent, [class*="CommentContent"] {
      font-size: 17px !important;
      line-height: 1.75 !important;
      overflow-wrap: anywhere !important;
      word-break: break-word !important;
    }
    img, video { max-width: 100% !important; height: auto !important; }
    pre, table { max-width: 100% !important; overflow-x: auto !important; }
    .TopstoryTabs { overflow-x: auto !important; white-space: nowrap !important; }
    .ContentItem-actions {
      position: static !important;
      display: flex !important;
      flex-wrap: wrap !important;
      align-items: center !important;
      gap: 6px !important;
      width: 100% !important;
      overflow: visible !important;
    }
    .ContentItem-actions > * { flex: 0 0 auto !important; margin: 0 !important; }
    .zhihu-shell-expand-row {
      box-sizing: border-box !important;
      position: relative !important;
      clear: both !important;
      display: flex !important;
      align-items: center !important;
      width: 100% !important;
      min-height: 38px !important;
      padding: 6px 0 8px !important;
      overflow: visible !important;
    }
    .zhihu-shell-expand-button, .zhihu-shell-following-link {
      box-sizing: border-box !important;
      position: static !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-height: 32px !important;
      padding: 4px 12px !important;
      border: 1px solid #1772f6 !important;
      border-radius: 6px !important;
      background: #fff !important;
      color: #1772f6 !important;
      font: inherit !important;
      font-size: 15px !important;
      line-height: 22px !important;
      text-decoration: none !important;
      white-space: nowrap !important;
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
    }
    .zhihu-shell-profile-links {
      box-sizing: border-box !important;
      display: flex !important;
      gap: 10px !important;
      width: 100% !important;
      padding: 10px 16px !important;
      margin: 0 0 10px !important;
      background: #fff !important;
      overflow-x: auto !important;
    }
    .zhihu-shell-persistent-controls {
      box-sizing: border-box !important;
      position: fixed !important;
      right: 14px !important;
      bottom: calc(18px + env(safe-area-inset-bottom, 0px)) !important;
      z-index: 2147483646 !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-end !important;
      gap: 10px !important;
      width: auto !important;
      pointer-events: none !important;
    }
    .zhihu-shell-collapse-button {
      box-sizing: border-box !important;
      position: static !important;
      align-items: center !important;
      justify-content: center !important;
      min-width: 96px !important;
      min-height: 40px !important;
      padding: 8px 14px !important;
      border: 0 !important;
      border-radius: 20px !important;
      background: #1772f6 !important;
      color: #fff !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, .2), 0 0 0 2px rgba(255, 255, 255, .9) !important;
      font: inherit !important;
      font-size: 15px !important;
      font-weight: 500 !important;
      line-height: 22px !important;
      white-space: nowrap !important;
      opacity: .96 !important;
      visibility: visible !important;
      pointer-events: auto !important;
    }
    .Modal-wrapper, .Modal-inner, .Modal-content {
      box-sizing: border-box !important;
      max-width: calc(100vw - 16px) !important;
    }
    .AdblockBanner, .AppHeader-download, .AppBanner, .Banner-link,
    .OpenInAppButton, .MobileAppHeader-downloadLink,
    .TopstoryItem--advertCard, .Pc-card, .Pc-word,
    .Question-sideColumn, .Topstory-sidebar, .TopstorySideBar,
    .GlobalSideBar, .Search-sideBar,
    [class*="DownloadApp"], [class*="OpenInApp"],
    [class*="Advert"], [class*="advert"],
    a[href^="zhihu://"], a[href^="intent://"],
    a[href*="oia.zhihu.com"], a[href*="/download-app"],
    [data-za-detail-view-name*="广告"],
    [data-za-module-info*="advert"], [data-za-module-info*="commercial"] {
      display: none !important;
      visibility: hidden !important;
    }
  `;

  const promotion = /(打开|下载|安装|使用|前往).{0,10}(知乎|客户端|app)|在.{0,6}(知乎|app).{0,8}(打开|查看)|立即下载|更佳体验/i;
  const login = /登录|验证码|手机号|扫码/;
  const appButton = /^(打开|前往|下载|安装|使用).{0,8}(知乎)?\s*(app|客户端)|^在\s*(app|知乎).{0,8}(打开|查看)/i;
  const isAppButton = element => {
    if (!element) return false;
    const href = (element.getAttribute('href') || '').toLowerCase();
    const text = (element.innerText || element.textContent || '').replace(/\s+/g, ' ').trim();
    return href.startsWith('zhihu://') || href.startsWith('intent://') ||
      href.includes('oia.zhihu.com') || href.includes('/download-app') ||
      (text.length <= 40 && appButton.test(text));
  };
  const persistentState = window.__zhihuShellPersistentState || {
    reading: null,
    comments: null
  };
  window.__zhihuShellPersistentState = persistentState;
  const controlText = element => (element && (element.textContent || '')).replace(/\s+/g, ' ').trim();
  const findCard = element => element && element.closest(
    '.ContentItem,.List-item,.AnswerItem,[class*="CommentItem"],.Card'
  );
  /* ---------- 悬浮「收起」按钮 ----------
     原生的收起控件只长在被展开内容的最末尾：回答读到一半想退出得一路划到底，
     评论读到一半想收起得倒回展开它的那一行。这里固定两个随时可点的按钮。
     显隐规则：只要用户点过「展开」就一定显示，绝不依赖「能不能找到原生收起控件」——
     知乎的收起经常是纯 div（不带 button/role），React 重渲染又会整个换掉节点，
     按控件探测会导致按钮根本不出现，所以这里按状态显示。 */
  const READING_COLLAPSE = /^(收起全文|收起回答|收起)$/;
  const COMMENTS_COLLAPSE = /^(收起评论|关闭评论|收起评论区)$/;
  const INTERACTIVE_TEXT = /^(阅读全文|展开全文|展开更多|展开评论|查看全部评论|查看全部|显示更多|更多评论|全部评论|收起全文|收起回答|收起|收起评论|关闭评论|收起评论区)$/;
  const READING_CONTAINER = '.ContentItem,.List-item,.AnswerItem,.QuestionAnswer,.RichContent,.Card';
  const COMMENTS_CONTAINER = '.Comments-container,.Comments,.CommentList,.CommentListV2,[class*="Comment"]';
  /* 命中的可能是包着一层的 wrapper：往下钻到最深的有效节点再点。
     点击会冒泡回真正的控件；反过来点 wrapper 是不会触发内层监听的。 */
  const deepestMatch = (element, pattern) => {
    let node = element;
    for (let depth = 0; depth < 6; depth++) {
      let next = null;
      for (const child of Array.from(node.children)) {
        const text = controlText(child);
        if (text && text.length <= 8 && pattern.test(text)) { next = child; break; }
      }
      if (!next) break;
      node = next;
    }
    return node;
  };
  /* 在 scope（展开的那张卡片）内连 div/span 一起找；卡片外只扫 button/a 控制开销。
     评论侧在卡片范围内不再要求命中 Comment 容器——知乎的收起评论可能是操作栏上的
     那个按钮（文字变成收起评论），它长在 .ContentItem-actions 里，不在评论区元素内。 */
  const collectCollapseTargets = (kind, scope) => {
    const reading = kind === 'reading';
    const pattern = reading ? READING_COLLAPSE : COMMENTS_COLLAPSE;
    const container = reading ? READING_CONTAINER : COMMENTS_CONTAINER;
    const found = [];
    const scan = (root, includePlain, strict) => {
      if (!root || !root.querySelectorAll) return;
      root.querySelectorAll(includePlain ? 'button,[role="button"],a,div,span' : 'button,[role="button"],a').forEach(element => {
        if (element.closest('.zhihu-shell-persistent-controls,.zhihu-shell-expand-row')) return;
        const text = controlText(element);
        if (!text || text.length > 8 || !pattern.test(text)) return;
        if (strict && !element.closest(container)) return;
        const rect = element.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) return;
        found.push(deepestMatch(element, pattern));
      });
    };
    if (scope && scope.isConnected) scan(scope, true, reading);
    if (!found.length) scan(document, false, true);
    return found;
  };
  const ensurePersistentControls = () => {
    let controls = document.querySelector('.zhihu-shell-persistent-controls');
    if (controls) return controls;
    controls = document.createElement('div');
    controls.className = 'zhihu-shell-persistent-controls';
    const reading = document.createElement('button');
    reading.type = 'button';
    reading.className = 'zhihu-shell-collapse-button';
    reading.dataset.kind = 'reading';
    reading.style.display = 'none';
    reading.textContent = '收起回答';
    reading.addEventListener('click', () => collapseNow('reading'));
    const comments = document.createElement('button');
    comments.type = 'button';
    comments.className = 'zhihu-shell-collapse-button';
    comments.dataset.kind = 'comments';
    comments.style.display = 'none';
    comments.textContent = '收起评论区';
    comments.addEventListener('click', () => collapseNow('comments'));
    controls.append(reading, comments);
    (document.body || document.documentElement).appendChild(controls);
    return controls;
  };
  /* ---------- 评论区的显隐改看现场：页面上有可见的评论区就亮按钮 ----------
     此前的做法是拦下 N 条评论 那次点击来记状态，但桌面版数字写法多样
     （如 1,090 条评论 带千分位逗号），正则漏一种按钮就永远不出现；而且
     同一个按钮点开是它、收起也是它，光看文字分不清是开还是关。
     评论区出现在 DOM 里且可见 = 开，消失 = 关，这是不会骗人的信号。 */
  const COMMENT_BOX = '.Comments-container,.Comments,.CommentList,.CommentListV2,[class*="Comment"]';
  /* 评论开关的文字形态很多：计数（1,090 条评论）、添加评论、收起评论……全都要认 */
  const COMMENT_TRIGGER = /\d[\d,]*(\.\d+)?\s*万?\s*条评论|条评论|添加评论|写评论|展开评论|查看全部评论|更多评论|全部评论|收起评论|关闭评论/;
  const visibleCommentBox = () => {
    for (const box of document.querySelectorAll(COMMENT_BOX)) {
      if (box.closest('.zhihu-shell-persistent-controls')) continue;
      const rect = box.getBoundingClientRect();
      if (rect.width > 80 && rect.height > 30) return box;
    }
    return null;
  };
  const findCommentTrigger = scope => {
    const pick = (root, loose) => Array.from(root.querySelectorAll('button,[role="button"],a'))
      .filter(element => !element.closest('.zhihu-shell-persistent-controls'))
      .find(element => {
        const text = controlText(element);
        if (!text || text.length > 16) return false;
        return loose ? /评论/.test(text) : COMMENT_TRIGGER.test(text);
      });
    if (scope && scope.isConnected) {
      const inCard = pick(scope, false) || pick(scope, true);
      if (inCard) return inCard;
    }
    /* 没有卡片范围时，只在全页恰好一个评论开关时才用它，有几个会误伤 */
    const everywhere = Array.from(document.querySelectorAll('button,[role="button"],a'))
      .filter(element => !element.closest('.zhihu-shell-persistent-controls') &&
        COMMENT_TRIGGER.test(controlText(element)));
    return everywhere.length === 1 ? everywhere[0] : null;
  };
  /* 回答侧仍按状态判断（已验证可用）：记着的卡片/按钮还在，或页面上找得到收起控件 */
  const stateAlive = kind => {
    const active = persistentState[kind];
    if ((active && active.trigger && active.trigger.isConnected) ||
        (active && active.scope && active.scope.isConnected)) return true;
    return collectCollapseTargets(kind, null).length > 0;
  };
  const updatePersistentControls = () => {
    const controls = ensurePersistentControls();
    const reading = controls.querySelector('[data-kind="reading"]');
    const comments = controls.querySelector('[data-kind="comments"]');
    const readingAlive = stateAlive('reading');
    if (!readingAlive) persistentState.reading = null;
    reading.dataset.active = readingAlive ? 'true' : 'false';
    reading.style.display = readingAlive ? 'inline-flex' : 'none';
    const commentsAlive = !!visibleCommentBox();
    comments.dataset.active = commentsAlive ? 'true' : 'false';
    comments.style.display = commentsAlive ? 'inline-flex' : 'none';
  };
  const activatePersistent = (kind, trigger) => {
    persistentState[kind] = { trigger, scope: findCard(trigger) };
    updatePersistentControls();
  };
  const clearPersistent = kind => {
    persistentState[kind] = null;
    updatePersistentControls();
  };
  const viewportDistance = element => {
    const rect = element.getBoundingClientRect();
    const middle = window.innerHeight / 2;
    if (rect.top <= middle && rect.bottom >= middle) return 0;
    return Math.min(Math.abs(rect.top - middle), Math.abs(rect.bottom - middle));
  };
  const clickNative = element => {
    window.__zhihuShellSuppressGuard = true;
    try { element.click(); } finally { window.__zhihuShellSuppressGuard = false; }
  };
  const dispatchEscape = () => {
    const init = { key: 'Escape', keyCode: 27, which: 27, bubbles: true, cancelable: true };
    document.dispatchEvent(new KeyboardEvent('keydown', init));
    document.dispatchEvent(new KeyboardEvent('keyup', init));
  };
  const collapseNow = kind => {
    if (kind === 'comments') return collapseComments();
    const active = persistentState[kind] || {};
    const targets = collectCollapseTargets(kind, active.scope);
    let control = null;
    if (targets.length) {
      /* 一次可能展开着好几条：收起离屏幕中心最近的那个，也就是正在看的那个 */
      control = targets.reduce((best, element) =>
        (!best || viewportDistance(element) < viewportDistance(best) ? element : best), null);
    } else if (active.trigger && active.trigger.isConnected) {
      /* 退路：再点一次当初展开它的开关，通常就是切换回收起 */
      control = active.trigger;
    }
    persistentState[kind] = null;
    updatePersistentControls();
    if (!control) return;
    clickNative(control);
    /* 原生收起是异步渲染的：400ms 后还在就说明没真收起来，把按钮留下供重试 */
    setTimeout(() => {
      if (persistentState[kind]) return;
      if ((active.trigger || active.scope) && collectCollapseTargets(kind, active.scope).length > 0) {
        persistentState[kind] = active;
        updatePersistentControls();
      }
    }, 400);
  };
  const nearestControl = list => list.reduce((best, element) =>
    (!best || viewportDistance(element) < viewportDistance(best) ? element : best), null);
  /* 图标式的关闭按钮没有文字，靠 aria-label / class 认 */
  const ICON_CLOSE = /关闭|收起|close|collapse|fold/i;
  const findIconClose = root => {
    if (!root || !root.querySelectorAll) return null;
    for (const element of root.querySelectorAll('button,[role="button"],a,[class*="close" i],[class*="Close"],[class*="collapse" i]')) {
      if (element.closest('.zhihu-shell-persistent-controls,.zhihu-shell-expand-row')) continue;
      const hint = (element.getAttribute('aria-label') || '') + ' ' +
        (element.getAttribute('title') || '') + ' ' +
        (typeof element.className === 'string' ? element.className : '');
      if (!ICON_CLOSE.test(hint)) continue;
      const rect = element.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) continue;
      return element;
    }
    return null;
  };
  const setCommentsLabel = busy => {
    const controls = document.querySelector('.zhihu-shell-persistent-controls');
    const button = controls && controls.querySelector('[data-kind="comments"]');
    if (button) button.textContent = busy ? '正在收起…' : '收起评论区';
  };
  const finishComments = () => {
    window.__zhihuShellCommentsBusy = false;
    setCommentsLabel(false);
    updatePersistentControls();
  };
  /* 逐级试：每招过后 320ms 复查，评论区还在就换下一招 */
  const runCollapseSteps = (steps, index = 0) => {
    if (index >= steps.length) { finishComments(); return; }
    steps[index]();
    setTimeout(() => {
      if (!visibleCommentBox()) { finishComments(); return; }
      runCollapseSteps(steps, index + 1);
    }, 320);
  };
  /* 点一下按钮先给个反馈：立刻变成“正在收起…”，配合下面的逐级兜底不会让人以为没反应 */
  const collapseComments = () => {
    if (window.__zhihuShellCommentsBusy) return;
    const active = persistentState.comments || {};
    const box = visibleCommentBox();
    /* 弹层形式的评论区挂在页面根部、不在任何卡片里，扫描范围就用评论区自身 */
    const scope = (box && findCard(box)) || null;
    const steps = [];
    const scoped = collectCollapseTargets('comments', scope || box);
    if (scoped.length) steps.push(() => clickNative(nearestControl(scoped)));
    const icon = findIconClose(box) || findIconClose(scope);
    if (icon) steps.push(() => clickNative(icon));
    steps.push(() => {
      const wide = collectCollapseTargets('comments', null);
      if (wide.length) clickNative(nearestControl(wide));
    });
    steps.push(() => {
      /* 那个评论开关按钮点开、收起都靠它，再点一次试试 */
      let trigger = null;
      if (active.trigger && active.trigger.isConnected && (!scope || scope.contains(active.trigger))) {
        trigger = active.trigger;
      }
      if (!trigger) trigger = findCommentTrigger(scope);
      if (trigger) clickNative(trigger);
    });
    /* 弹层形式的评论区通常吃 Esc */
    steps.push(dispatchEscape);
    /* 以上都不通（知乎的评论区既无文字控件、开关也不切换、还不吃 Esc）时自己收尾：
       先把评论区藏起来，界面效果就是收起了，箭头按钮也会随之自动消失。 */
    steps.push(() => {
      const target = visibleCommentBox();
      if (target) target.style.setProperty('display', 'none', 'important');
    });
    steps.push(() => {
      const target = visibleCommentBox();
      if (target) target.remove();
    });
    window.__zhihuShellCommentsBusy = true;
    setCommentsLabel(true);
    runCollapseSteps(steps);
  };
  const clean = () => {
    document.querySelectorAll('a,button,[role="button"]').forEach(element => {
      if (isAppButton(element)) element.remove();
    });
    document.querySelectorAll('[class*="Modal"],[class*="Popup"],[class*="Banner"],[style*="position: fixed"]').forEach(element => {
      const text = (element.innerText || element.textContent || '').replace(/\s+/g, ' ').trim();
      if (promotion.test(text) && !login.test(text)) element.remove();
    });
    document.querySelectorAll('a[target="_blank"]').forEach(link => link.removeAttribute('target'));
    createExpandProxies();
    ensureProfileFollowingLink();
    updatePersistentControls();
  };
  const createExpandProxies = () => {
    const expandPattern = /阅读全文|展开(全文|评论|更多)|查看(全部|全部评论)|显示更多|更多评论/;
    document.querySelectorAll('button,[role="button"],a').forEach(element => {
      if (element.closest('.zhihu-shell-expand-row')) return;
      const text = (element.innerText || element.textContent || '').replace(/\s+/g, ' ').trim();
      const label = element.getAttribute('aria-label') || element.getAttribute('title') || '';
      if (!expandPattern.test(text) && !expandPattern.test(label)) return;
      if (element.dataset.zhihuShellProxy === 'true') {
        /* 知乎的 React 重渲染会删掉我们插进去的按钮，而挂在原生按钮上的
           display:none 会留下，于是「阅读全文」整个消失。按钮没了就重做一次。 */
        const row = element.__zhihuShellProxyRow;
        if (row && row.isConnected) return;
        element.style.removeProperty('display');
        delete element.dataset.zhihuShellProxy;
      }
      const card = element.closest('.ContentItem,.List-item,.AnswerItem,[class*="CommentItem"]');
      if (!card) return;
      const actions = card.querySelector('.ContentItem-actions,[class*="CommentItem"][class*="footer" i]');
      const row = document.createElement('div');
      row.className = 'zhihu-shell-expand-row';
      const proxy = document.createElement('button');
      proxy.type = 'button';
      proxy.className = 'zhihu-shell-expand-button';
      proxy.textContent = text || label;
      proxy.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const kind = /评论/.test(text || label) ? 'comments' : 'reading';
        activatePersistent(kind, element);
        element.click();
        setTimeout(() => {
          element.style.removeProperty('display');
          delete element.dataset.zhihuShellProxy;
          delete element.__zhihuShellProxyRow;
          row.remove();
          clean();
        }, 300);
      });
      row.appendChild(proxy);
      element.__zhihuShellProxyRow = row;
      element.dataset.zhihuShellProxy = 'true';
      element.style.setProperty('display', 'none', 'important');
      if (actions && actions.parentNode) actions.parentNode.insertBefore(row, actions);
      else card.appendChild(row);
    });
  };
  const ensureProfileFollowingLink = () => {
    const match = location.pathname.match(/^\/people\/([^/]+)/);
    if (!match || document.querySelector('.zhihu-shell-following-link')) return;
    const profileMain = document.querySelector('.Profile-main,.Profile-mainColumn,[class*="ProfileMain"]');
    if (!profileMain) return;
    const links = document.createElement('nav');
    links.className = 'zhihu-shell-profile-links';
    const following = document.createElement('a');
    following.className = 'zhihu-shell-following-link';
    following.href = `/people/${match[1]}/following`;
    following.textContent = '关注的人';
    const followers = document.createElement('a');
    followers.className = 'zhihu-shell-following-link';
    followers.href = `/people/${match[1]}/followers`;
    followers.textContent = '关注者';
    links.append(following, followers);
    profileMain.insertBefore(links, profileMain.firstChild);
  };
  clean();
  if (!window.__zhihuShellObserver) {
    let cleanupTimer;
    window.__zhihuShellObserver = new MutationObserver(() => {
      clearTimeout(cleanupTimer);
      cleanupTimer = setTimeout(clean, 80);
    });
    window.__zhihuShellObserver.observe(document.documentElement, { childList: true, subtree: true });
  }
  if (!window.__zhihuShellClickGuard) {
    window.__zhihuShellClickGuard = true;
    document.addEventListener('click', event => {
      if (window.__zhihuShellSuppressGuard) return;
      let target = event.target.closest && event.target.closest('a,button,[role="button"]');
      if (!target) {
        /* 有的「阅读全文 / 收起」是普通 div，没有 button/role，往上找几层 */
        let node = event.target;
        for (let depth = 0; node && depth < 4 && !target; depth++, node = node.parentElement) {
          const nodeText = controlText(node);
          if (nodeText && nodeText.length <= 12 && INTERACTIVE_TEXT.test(nodeText)) target = node;
        }
      }
      if (!target || target.closest('.zhihu-shell-persistent-controls,.zhihu-shell-expand-row')) return;
      const text = controlText(target);
      const label = target.getAttribute('aria-label') || target.getAttribute('title') || '';
      if (/阅读全文|展开全文|展开更多/.test(text) || /阅读全文|展开全文/.test(label)) {
        activatePersistent('reading', target);
      } else if (/收起(全文|回答)|折叠(全文|回答)?|^收起$/.test(text) || /收起(全文|回答)/.test(label)) {
        clearPersistent('reading');
      }
      if (/(^|\s)\d[\d,]*(\.\d+)?\s*万?\s*条评论|添加评论|写评论|展开评论|查看全部评论|更多评论|全部评论/.test(text) || /展开评论|查看全部评论/.test(label)) {
        activatePersistent('comments', target);
      } else if (/收起评论|关闭评论/.test(text) || /收起评论|关闭评论/.test(label)) {
        clearPersistent('comments');
      }
      if (isAppButton(target)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        target.remove();
      }
    }, true);
  }
  window.open = url => {
    if (url) window.location.href = url;
    return null;
  };
})();
