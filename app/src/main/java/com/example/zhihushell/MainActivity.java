package com.example.zhihushell;

import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Intent;
import android.graphics.Insets;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowInsets;
import android.webkit.CookieManager;
import android.webkit.SslErrorHandler;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

public final class MainActivity extends Activity {
    private static final String HOME_URL = "https://www.zhihu.com/";
    private static final String DESKTOP_USER_AGENT =
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
            "(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
    private static final Set<String> BLOCKED_HOSTS = Collections.unmodifiableSet(new HashSet<String>() {{
        add("sugar.zhihu.com");
        add("zhihu-web-analytics.zhihu.com");
        add("analytics.zhihu.com");
        add("crash2.zhihu.com");
        add("appcloud2.in.zhihu.com");
    }});

    private WebView webView;
    private ProgressBar progressBar;
    private TextView titleView;
    private String cleanupScript;

    @Override protected void onCreate(Bundle state) {
        super.onCreate(state);
        cleanupScript = readAsset("page-cleanup.js");
        setContentView(createContentView());
        configureWebView();
        if (state == null || webView.restoreState(state) == null) webView.loadUrl(HOME_URL);
    }

    private String readAsset(String name) {
        try (InputStream input = getAssets().open(name)) {
            byte[] buffer = new byte[8192];
            StringBuilder result = new StringBuilder();
            int count;
            while ((count = input.read(buffer)) != -1) result.append(new String(buffer, 0, count, "UTF-8"));
            return result.toString();
        } catch (IOException error) {
            return "";
        }
    }

    private View createContentView() {
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(getColor(R.color.page_background));
        if (Build.VERSION.SDK_INT >= 35) root.setOnApplyWindowInsetsListener((view, insets) -> {
            Insets bars = insets.getInsets(WindowInsets.Type.systemBars());
            view.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            return insets;
        });

        LinearLayout toolbar = new LinearLayout(this);
        toolbar.setGravity(Gravity.CENTER_VERTICAL);
        toolbar.setPadding(dp(4), 0, dp(4), 0);
        toolbar.setBackgroundColor(0xffffffff);
        root.addView(toolbar, new LinearLayout.LayoutParams(-1, dp(52)));

        Button back = toolbarButton("‹", R.string.back);
        back.setTextSize(40);
        back.setOnClickListener(view -> navigateBack());
        toolbar.addView(back, new LinearLayout.LayoutParams(dp(48), -1));
        Button refresh = toolbarButton("↻", R.string.refresh);
        refresh.setTextSize(30);
        refresh.setOnClickListener(view -> webView.reload());
        toolbar.addView(refresh, new LinearLayout.LayoutParams(dp(48), -1));
        titleView = new TextView(this);
        titleView.setText(R.string.app_name);
        titleView.setTextColor(getColor(R.color.toolbar_text));
        titleView.setTextSize(21);
        titleView.setSingleLine(true);
        titleView.setEllipsize(android.text.TextUtils.TruncateAt.END);
        titleView.setGravity(Gravity.CENTER_VERTICAL);
        LinearLayout.LayoutParams titleParams = new LinearLayout.LayoutParams(0, -1, 1);
        titleParams.setMarginStart(dp(6));
        toolbar.addView(titleView, titleParams);
        Button copy = toolbarButton(getString(R.string.copy_link), R.string.copy_link);
        copy.setTextSize(16);
        copy.setOnClickListener(view -> copyCurrentLink());
        toolbar.addView(copy, new LinearLayout.LayoutParams(dp(80), -1));

        progressBar = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        progressBar.setMax(100);
        progressBar.setProgressTintList(getColorStateList(R.color.zhihu_blue));
        root.addView(progressBar, new LinearLayout.LayoutParams(-1, dp(2)));
        webView = new WebView(this);
        webView.setBackgroundColor(getColor(R.color.page_background));
        root.addView(webView, new LinearLayout.LayoutParams(-1, 0, 1));
        return root;
    }

    private Button toolbarButton(String text, int description) {
        Button button = new Button(this);
        button.setText(text);
        button.setContentDescription(getString(description));
        button.setAllCaps(false);
        button.setTextColor(getColor(R.color.zhihu_blue));
        button.setGravity(Gravity.CENTER);
        button.setMinWidth(0);
        button.setMinimumWidth(0);
        button.setPadding(dp(4), 0, dp(4), 0);
        button.setBackgroundColor(0);
        return button;
    }

    private int dp(int value) { return Math.round(value * getResources().getDisplayMetrics().density); }

    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setLoadWithOverviewMode(false);
        settings.setUseWideViewPort(false);
        settings.setTextZoom(100);
        settings.setSupportZoom(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);
        settings.setSupportMultipleWindows(false);
        settings.setJavaScriptCanOpenWindowsAutomatically(false);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);
        settings.setUserAgentString(DESKTOP_USER_AGENT);
        if (Build.VERSION.SDK_INT >= 26) settings.setSafeBrowsingEnabled(true);
        CookieManager cookies = CookieManager.getInstance();
        cookies.setAcceptCookie(true);
        cookies.setAcceptThirdPartyCookies(webView, true);
        webView.setWebViewClient(new ZhihuWebViewClient());
        webView.setWebChromeClient(new WebChromeClient() {
            @Override public void onProgressChanged(WebView view, int progress) {
                progressBar.setProgress(progress);
                progressBar.setVisibility(progress >= 100 ? View.GONE : View.VISIBLE);
            }
            @Override public void onReceivedTitle(WebView view, String title) {
                titleView.setText(title == null || title.isEmpty() ? getString(R.string.app_name) : title);
            }
        });
    }

    private void injectPageCleanup(WebView view) { view.evaluateJavascript(cleanupScript, null); }

    private final class ZhihuWebViewClient extends WebViewClient {
        @Override public void onPageStarted(WebView view, String url, android.graphics.Bitmap favicon) { injectPageCleanup(view); }
        @Override public void onPageCommitVisible(WebView view, String url) { injectPageCleanup(view); }
        @Override public void onPageFinished(WebView view, String url) { injectPageCleanup(view); }
        @Override public void onReceivedSslError(WebView view, SslErrorHandler handler, android.net.http.SslError error) { handler.cancel(); }
        @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
            Uri uri = request.getUrl();
            if (isBlockedHost(uri.getHost())) return emptyResponse();
            return super.shouldInterceptRequest(view, request);
        }
        @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) { return handleNavigation(request.getUrl()); }
        @Override public boolean shouldOverrideUrlLoading(WebView view, String url) { return handleNavigation(Uri.parse(url)); }
    }

    private boolean isBlockedHost(String host) { return host != null && BLOCKED_HOSTS.contains(host.toLowerCase(Locale.ROOT)); }
    private WebResourceResponse emptyResponse() { return new WebResourceResponse("text/plain", "UTF-8", 200, "OK", Collections.emptyMap(), new ByteArrayInputStream(new byte[0])); }
    private boolean isAppPromotionLink(Uri uri) {
        String host = uri.getHost();
        if ("oia.zhihu.com".equalsIgnoreCase(host)) return true;
        String path = uri.getPath();
        if (path == null) return false;
        String normalized = path.toLowerCase(Locale.ROOT);
        return normalized.equals("/app") || normalized.startsWith("/download-app") || normalized.startsWith("/app-download");
    }
    private boolean handleNavigation(Uri uri) {
        String scheme = uri.getScheme();
        if (scheme == null || scheme.equalsIgnoreCase("about") || scheme.equalsIgnoreCase("data")) return false;
        if (!scheme.equalsIgnoreCase("http") && !scheme.equalsIgnoreCase("https")) {
            Toast.makeText(this, R.string.unsafe_link_blocked, Toast.LENGTH_SHORT).show();
            return true;
        }
        if (isAppPromotionLink(uri)) {
            Toast.makeText(this, R.string.app_link_blocked, Toast.LENGTH_SHORT).show();
            return true;
        }
        String host = uri.getHost();
        if (host == null || (!host.equals("zhihu.com") && !host.endsWith(".zhihu.com"))) {
            try {
                startActivity(new Intent(Intent.ACTION_VIEW, uri).addCategory(Intent.CATEGORY_BROWSABLE));
            } catch (RuntimeException error) {
                Toast.makeText(this, R.string.cannot_open_link, Toast.LENGTH_SHORT).show();
            }
            return true;
        }
        return false;
    }
    private void copyCurrentLink() {
        String url = webView.getUrl();
        if (url != null && !url.isEmpty()) {
            ((ClipboardManager) getSystemService(CLIPBOARD_SERVICE)).setPrimaryClip(ClipData.newPlainText(getString(R.string.app_name), url));
            Toast.makeText(this, R.string.link_copied, Toast.LENGTH_SHORT).show();
        }
    }
    private void navigateBack() { if (webView.canGoBack()) webView.goBack(); else finish(); }
    @Override public void onBackPressed() { navigateBack(); }
    @Override protected void onPause() { CookieManager.getInstance().flush(); webView.onPause(); super.onPause(); }
    @Override protected void onResume() { super.onResume(); webView.onResume(); }
    @Override protected void onSaveInstanceState(Bundle state) { webView.saveState(state); super.onSaveInstanceState(state); }
    @Override protected void onDestroy() {
        if (webView != null) {
            ViewGroup parent = (ViewGroup) webView.getParent();
            if (parent != null) parent.removeView(webView);
            webView.stopLoading();
            webView.setWebChromeClient(null);
            webView.setWebViewClient(null);
            webView.destroy();
        }
        super.onDestroy();
    }
}
