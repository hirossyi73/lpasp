// 設定値 --------------------------------------------------
// URLに付加するクエリ文字列と、analyticsのkeyの一覧
if (!("analytics_array" in window)) {
    analytics_array = {};
}

// 標準で使用するanalyticsのkey
if (!("analytics_default_key" in window)) {
    analytics_default_key = '';
}
// ページを判断するために埋め込むhiddenのselector
if (!("lp_page_selector" in window)) {
    lp_page_selector = '';
}
// クエリ文字列のキー値
if (!("query_key" in window)) {
    query_key = 'page';
}

// 読み込み後に実施する関数
function ready_func() {
    if (!lp_page_selector) {
        return;
    }
    var target = document.querySelector(lp_page_selector);
    if (!target) {
        return;
    }
    target.value = query_value;
    console.log('target.value:' + target.value);
}
if (window.addEventListener) {
    window.addEventListener('load', ready_func);
} else if (window.attachEvent) {
    window.attachEvent('onload', ready_func);
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// 指定のanalyticsをクエリ文字列から判断
var analytics = analytics_default_key;
var query_value = getParameterByName(query_key);
for (var key in analytics_array) {
    if (key == query_value && analytics_array[key].length > 0) {
        analytics = analytics_array[key];
        break;
    }
}

console.log('analytics:' + analytics);
console.log('query_value:' + query_value);

// googleアナリティクス読み込み
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://www.googletagmanager.com/gtag/js?id=" + analytics;
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', analytics);
