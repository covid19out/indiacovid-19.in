
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '631795427369724',
      cookie     : true,
      xfbml      : true,
      version    : 'v6.0'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

function gtag() { dataLayer.push(arguments) } window.dataLayer = window.dataLayer || [], gtag("js", new Date), gtag("config", "UA-131358040-4"); var isCollapsed = !0; function toggleNavbarMobile() { (isCollapsed = !isCollapsed) ? $(".navbar-collapse").removeClass("mobile-navbar") : $(".navbar-collapse").addClass("mobile-navbar") } function hideDropdown() { isCollapsed = !0 } var _paq = window._paq || []; _paq.push(["trackPageView"]), _paq.push(["enableLinkTracking"]), function () { var a = "//matomo.aptlogica.com/"; _paq.push(["setTrackerUrl", a + "matomo.php"]), _paq.push(["setSiteId", "1"]); var e = document, t = e.createElement("script"), o = e.getElementsByTagName("script")[0]; t.type = "text/javascript", t.async = !0, t.defer = !0, t.src = a + "matomo.js", o.parentNode.insertBefore(t, o) }();