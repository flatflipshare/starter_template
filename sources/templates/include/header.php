<!DOCTYPE html>

<html lang="ru">

<head>
  <meta charset="utf-8" />

  <title>Project title</title>
  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="format-detection" content="telephone=no">
  <meta name="viewport" id="viewport" content="width=device-width">
  <meta name="cmsmagazine" content="9fd15f69c95385763dcf768ea3b67e22" />
  <meta name="theme-color" content="#0068b2" />
  
  <link rel="stylesheet" href="css/vendor.min.css?nocache=<?=rand()?>" />
  <link rel="stylesheet" href="css/app.min.css?nocache=<?=rand()?>" />

  <script>
    var appConfig = {
      'mobileVersion':false,
      'desktopVersion':true,
      'startupMessage':{
        'title':false,
        'message':false
      }
    };
    (function(){var a,b,c,d,e,f,g,h,i,j;a=window.device,window.device={},c=window.document.documentElement,j=window.navigator.userAgent.toLowerCase(),device.ios=function(){return device.iphone()||device.ipod()||device.ipad()},device.iphone=function(){return d("iphone")},device.ipod=function(){return d("ipod")},device.ipad=function(){return d("ipad")},device.android=function(){return d("android")},device.androidPhone=function(){return device.android()&&d("mobile")},device.androidTablet=function(){return device.android()&&!d("mobile")},device.blackberry=function(){return d("blackberry")||d("bb10")||d("rim")},device.blackberryPhone=function(){return device.blackberry()&&!d("tablet")},device.blackberryTablet=function(){return device.blackberry()&&d("tablet")},device.windows=function(){return d("windows")},device.windowsPhone=function(){return device.windows()&&d("phone")},device.windowsTablet=function(){return device.windows()&&d("touch")&&!device.windowsPhone()},device.fxos=function(){return(d("(mobile;")||d("(tablet;"))&&d("; rv:")},device.fxosPhone=function(){return device.fxos()&&d("mobile")},device.fxosTablet=function(){return device.fxos()&&d("tablet")},device.meego=function(){return d("meego")},device.cordova=function(){return window.cordova&&"file:"===location.protocol},device.nodeWebkit=function(){return"object"==typeof window.process},device.mobile=function(){return device.androidPhone()||device.iphone()||device.ipod()||device.windowsPhone()||device.blackberryPhone()||device.fxosPhone()||device.meego()},device.tablet=function(){return device.ipad()||device.androidTablet()||device.blackberryTablet()||device.windowsTablet()||device.fxosTablet()},device.desktop=function(){return!device.tablet()&&!device.mobile()},device.portrait=function(){return window.innerHeight/window.innerWidth>1},device.landscape=function(){return window.innerHeight/window.innerWidth<1},device.noConflict=function(){return window.device=a,this},d=function(a){return-1!==j.indexOf(a)},f=function(a){var b;return b=new RegExp(a,"i"),c.className.match(b)},b=function(a){return f(a)?void 0:c.className+=" "+a},h=function(a){return f(a)?c.className=c.className.replace(a,""):void 0},device.ios()?device.ipad()?b("ios ipad tablet"):device.iphone()?b("ios iphone mobile"):device.ipod()&&b("ios ipod mobile"):b(device.android()?device.androidTablet()?"android tablet":"android mobile":device.blackberry()?device.blackberryTablet()?"blackberry tablet":"blackberry mobile":device.windows()?device.windowsTablet()?"windows tablet":device.windowsPhone()?"windows mobile":"desktop":device.fxos()?device.fxosTablet()?"fxos tablet":"fxos mobile":device.meego()?"meego mobile":device.nodeWebkit()?"node-webkit":"desktop"),device.cordova()&&b("cordova"),e=function(){return device.landscape()?(h("portrait"),b("landscape")):(h("landscape"),b("portrait"))},i="onorientationchange"in window,g=i?"orientationchange":"resize",window.addEventListener?window.addEventListener(g,e,!1):window.attachEvent?window.attachEvent(g,e):window[g]=e,e()}).call(this);
    (function(m,a,d,vp){
      var w = screen.width;
      if(device.mobile() || device.tablet()) {
        document.getElementById(vp).setAttribute('content','width=device-width');
        appConfig.mobileVersion = true;
      }
      if(device.ipad()) {
        document.getElementById(vp).setAttribute('content','width='+d);
        appConfig.mobileVersion = false;
      }
    })(320,745,1350,'viewport');
  </script>

  <meta property="og:url" content="<? /* http://domain.com/path/to/page/ */ ?>" />
  <meta property="og:site_name" content="<? /* Site name */ ?>" />
  <meta property="og:title" content="<? /* title */ ?>" />
  <meta property="og:description" content="<? /* description */ ?>" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="<? /* http://domain.com/path/to/image.png */ ?>" />

  <link rel="apple-touch-icon" href="/img/icons/icon57.png" />
  <link rel="apple-touch-icon" sizes="57x57" href="/img/icons/icon57.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="/img/icons/icon72.png" />
  <link rel="apple-touch-icon" sizes="114x114" href="/img/icons/icon114.png" />
  <link rel="apple-touch-icon" sizes="120x120" href="/img/icons/icon120.png">
  <link rel="apple-touch-icon" sizes="152x152" href="/img/icons/icon152.png">
  <link rel="shortcut icon" type="image/png" href="/img/icons/icon16.png"/>
</head>

<? $curPage = ""; ?>

<body id="body" class="body-bg">
  <script>
    (function(b,c){
      if (appConfig.mobileVersion) { return false; }
      var el = document.getElementById(b);
      if (el.classList) { el.classList.add(c); }
      else { el.className += ' ' + c; }
    })('body','jsfx');
  </script>

  <div class="global-layout">
    <div class="global-layout__content">

      <div class="loader">
        <div class="loader_inner"></div>
      </div>

      <header class="is-header">
                  
        <div class="is-header__inner">
          <div class="is-header__left">
            <a href="#" class="is-header__logo">Лого</a>
          </div>
          <div class="is-header__middle">
            <nav class="is-header__nav header-nav">
              <ul class="header-nav__list">
                <li class="header-nav__item"><a href="#" class="header-nav__text is-link">Заголовок_1</a></li>
                <li class="header-nav__item"><a href="#" class="header-nav__text is-link">Заголовок_2</a></li>
                <li class="header-nav__item"><a href="#" class="header-nav__text is-link">Заголовок_3</a></li>
                <li class="header-nav__item"><a href="#" class="header-nav__text is-link">Заголовок_4</a></li>
              </ul>
            </nav>
          </div>
          <div class="is-header__right">
              
          </div>
        </div>

      </header>




    

