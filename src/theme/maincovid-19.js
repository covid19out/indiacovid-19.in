function gtag() {
    dataLayer.push(arguments)
}
window.fbAsyncInit = function() {
        FB.init({
            appId: "631795427369724",
            cookie: !0,
            xfbml: !0,
            version: "v6.0"
        }), FB.AppEvents.logPageView()
    },
    function(e, a, t) {
        var n, o = e.getElementsByTagName(a)[0];
        e.getElementById(t) || ((n = e.createElement(a)).id = t, n.src = "https://connect.facebook.net/en_US/sdk.js", o.parentNode.insertBefore(n, o))
    }(document, "script", "facebook-jssdk"), window.dataLayer = window.dataLayer || [], gtag("js", new Date), gtag("config", "UA-131358040-4");

var isCollapsed = !0;

function toggleNavbarMobile() {
    (isCollapsed = !isCollapsed) ? $(".navbar-collapse").removeClass("mobile-navbar"): $(".navbar-collapse").addClass("mobile-navbar")
}

function hideDropdown() {
    isCollapsed = !0
}
// var _paq = window._paq || [];
// _paq.push(["trackPageView"]), _paq.push(["enableLinkTracking"]),
//     function() {
//         var e = "//matomo.aptlogica.com/";
//         _paq.push(["setTrackerUrl", e + "matomo.php"]), _paq.push(["setSiteId", "1"]);
//         var a = document,
//             t = a.createElement("script"),
//             n = a.getElementsByTagName("script")[0];
//         t.type = "text/javascript", t.async = !0, t.defer = !0, t.src = e + "matomo.js", n.parentNode.insertBefore(t, n)
//     }();