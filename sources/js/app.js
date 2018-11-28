var $window, $document, $body, globalXHRStatus, yModalConfig;

var conf = {
    'fancyStatus':false,
    'nodeBody':$('#body'),
    'fancyDefault':{
        wrapCSS: 'fb-fancy-default',
        padding: 0,
        margin: 0,
        autoScale: false,
        fitToView: false,
        openSpeed: 300,
        closeSpeed: 300,
        nextSpeed: 300,
        prevSpeed: 300,
        closeBtn : false,
        toolbar : false,
        afterShow:function(){
            conf.nodeBody.addClass('body-state-fancy');

            // this modal parent
            var $thisFancy = $('.fancybox-inner');
            moduleApp.executeModules($thisFancy);

        },
        beforeClose:function(){
            conf.nodeBody.removeClass('body-state-fancy');
        },
        afterClose:function(){
            conf.fancyStatus = false;
        }
    }
};

var moduleApp = {
    'init': function () {
        this.initGlobals();
        this.initGlobalsEvents();
        this.startupMessage();
        this.executeModules();
        this.confirmLocationPopup();
        this.loaderImages();
        this.pageLoader();
        this.pagePreLoader();
    },
    'getRandom':function(min,max){
        return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    'initGlobals':function(){
        $window = $(window);
        $document = $(document);
        $body = $('#body');
        globalXHRStatus = false;
        $window.on('load',function(){
            $window.trigger('resize');
        });
    },
    'initGlobalsEvents':function(){
        
        var methods = {
            'init':function(){
                methods.getInitialEvents('click');
                methods.getInitialEvents('change');
            },
            'getInitialEvents':function(thisEvent){
                $document.on(thisEvent,'[data-g'+thisEvent+']',function(e){
                    e.preventDefault();
                    var $this = $(this);
                    var thisAction = $this.attr('data-g'+thisEvent);
                    var thisValue = $this.val() || $this.data().value;
                    if (actions[thisAction]) { actions[thisAction]($this,thisValue); }
                    else { console.log('Event: '+thisEvent+', Action:"'+thisAction+'" - not defined'); }
                });
            },
            'getTarget':function(thisTarget){
                return $('[data-target="'+thisTarget+'"]');
            }
        };

        var actions = {

            'm-menu':function(){
                var $menuBtn = $('.js-hamburger');
                var $menu = $('.js-is-mobile');
                $menuBtn.toggleClass('is-active');
                $menu.toggleClass('is-active');
            },
            'closeFancy':function(){
                $.fancybox.close();
            },
            'share-page':function($this,thisValue){
                var shareService = thisValue;
                var shareData = {
                    'link':$('[property="og:url"]').attr('content'),
                    'title':encodeURI($('[property="og:title"]').attr('content')),
                    'description':encodeURI($('[property="og:description"]').attr('content')),
                    'image':$('[property="og:image"]').attr('content')
                };

                var windowLink = 'http://share.yandex.ru/go.xml?service=' + shareService;
                var fbWindowLink = 'http://www.facebook.com/sharer/sharer.php?';
                windowLink += '&title=' + shareData.title;

                if (shareService=='twitter') {
                    windowLink += ' ' + shareData.description;
                    windowLink += '&url=' + shareData.link;
                    windowLink += '&link=' + shareData.link;
                } else if (shareService=='facebook'){
                    fbWindowLink += 'u=' + shareData.link;
                } else {
                    windowLink += '&url=' + shareData.link;
                    windowLink += '&link=' + shareData.link;
                    windowLink += '&description=' + shareData.description;
                    windowLink += '&image=' + shareData.image;
                }
                if (shareService == 'facebook'){
                    window.open(fbWindowLink,'','toolbar=0,status=0,width=625,height=435');
                } else {
                    window.open(windowLink,'','toolbar=0,status=0,width=625,height=435');
                }
            },
            'print-page':function(){
                window.print();
            },
            'scroll-to-anchor': function($this) {
                var target = $this.attr('href');
                if( target.length ) {
                    $('html, body').stop().animate({
                        scrollTop: $(target).offset().top -70
                    }, 700);
                }
            },
            'scroll-top':function() {
                $('html,body').animate({
                    scrollTop: 0
                }, 700);
            },
            'toggle-lk-menu': function($this) {
              var $menu = $('#lkMenu');
              var $close = $menu.find('.js_menuClose');
              $menu.addClass('is-active');

              $document.mouseup(function(e) {
                  if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
                      $menu.removeClass('is-active');
                  }
              });
              $close.on('click', function() {
                  $menu.removeClass('is-active');
              })
            }
        };

        methods.init();
    },
    'executeModules':function(){
        $('[data-is]').each(function(i,thisModule){
            var $thisModule = $(thisModule);
            var thisModuleName = $thisModule.attr('data-is');
            if(moduleApp[thisModuleName]) {
                console.log('Auto start: `' + thisModuleName + '`.');
                moduleApp[thisModuleName]($thisModule);
            } else {
                console.log('Module: `' + thisModuleName + '` is not defined.');
            }
        });
    },
    'pageLoader': function(){
        $body.addClass('jsfx-loaded');
        setTimeout(function(){ moduleApp.inViewLoader(); }, 300);
    },
    'pagePreLoader': function() {
        $(".loader_inner").fadeOut();
        $(".loader").delay(100).fadeOut("slow");
    },
    'confirmLocationPopup':function() {
        if(appConfig.mobileVersion) {
            $(".js-confirm-location-trigger").detach().appendTo('#globalHeader');
        }
        $window.load(function () {
            setTimeout(function(){
                $(".js-confirm-location-trigger").addClass("is-active");
            }, 3000);
            $(".js-hide-check-location").on("click", function() {
                
                $(".js-confirm-location-trigger").removeClass("is-active");
            })
        });
    },
    'inViewLoader':function(){
        var hiddenClass = 'view-hidden';
        var $inView = $('.'+hiddenClass);

        $inView.each(function(i,e){
            var $e = $(e);
            var r1 = parseInt(Math.random() * 1000) + 500;
            var r2 = parseInt(Math.random() * 200);
            var string = 'transition-duration:'+r1+'ms;transition-delay:'+r2+'ms;transition-property:opacity;';
            var style = $e.attr('style');
            if (style) { string = string + style; }
            $e.attr('style',string);

        });

        $inView.on('inview', function(event, isInView) {
            if (isInView) { $(this).removeClass(hiddenClass); }
        });
    },
    'startupMessage':function(){
        if (appConfig.startupMessage.title && appConfig.startupMessage.message) {
            var t = '<div class="fb-modal-default">';
            t += '<a class="is-cross-link" data-gclick="closeFancy" href="#"><img src="/assets/img/icon-cross.svg" alt=""></a>';
            t += '<div class="md-body">'+appConfig.startupMessage.message+'</div>';
            t += '</div>';

            var thisFancyConfig = $.extend({}, conf.fancyDefault, {
                content: t
            });

            $.fancybox.open(t, thisFancyConfig);
        }
    },  
    'loaderImages':function($img){

        var inviewFlag = true;
        if (!$img) { $img = $('[data-img]'); }

        $img.each(function(i,thisImg){

            var $thisImage = $(thisImg);
            var $parentNode = $thisImage.parent();

            var imgUrl = $thisImage.data().img || '';
            var imgMiddle = $thisImage.data().middle || false;
            var imgVisible = $thisImage.data().visible || false;
            var nativeStyle = $thisImage.attr('style') || '';

            if (!imgVisible) { $thisImage.addClass('sfx-hidden'); }

            $thisImage.removeAttr('data-img');
            var tempImage = new Image();
            tempImage.src = imgUrl;
            tempImage.onload = function(){


                var r1 = moduleApp.getRandom(500,1200);
                var r2 = moduleApp.getRandom(0,300);

                if ($thisImage.is('img')) {
                    $thisImage.attr('src',imgUrl);


                    if (imgMiddle) {
                        var middleArray = { };
                        middleArray.width = parseInt($thisImage.width());
                        middleArray.height = parseInt($thisImage.height());
                        middleArray.halfTop = parseInt(middleArray.height/2);
                        middleArray.halfLeft = parseInt(middleArray.width/2);
                        nativeStyle += 'position:absolute;display:block;top:50%;left:50%;width:'+middleArray.width+'px;height:'+middleArray.height+'px;margin:-'+middleArray.halfTop+'px 0 0 -'+middleArray.halfLeft+'px;';
                    }

                    $thisImage.attr('style',nativeStyle + 'transition-property:opacity;transition-duration:'+r1+'ms;transition-delay:'+r2+'ms;');
                } else {
                    $thisImage.attr('style',nativeStyle+'background-image:url('+imgUrl+');transition-property:opacity;transition-duration:'+r1+'ms;transition-delay:'+r2+'ms;');
                }
                if($parentNode.hasClass('js-zoom-image')) $parentNode.zoom();
            };
        });

        if (inviewFlag) {
            $img.on('inview', function(event, isInView, howView) {
                if (isInView) {
                    var $this = $(this);
                    $(this).removeClass('sfx-hidden');
                }
            });
        } else {
            $img.removeClass('sfx-hidden');
        }
    },
    'ease-carousel':function($thisModule){
        var items = parseInt($thisModule.data('view-mode'));
        var nextTpl1 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40"><defs><path id="vhr3a" d="M1335 1340v-40h40v40z"/><path id="vhr3c" d="M1347 1320h16"/><path id="vhr3d" d="M1357 1314l6 6-6 6"/><clipPath id="vhr3b"><use fill="#fff" xlink:href="#vhr3a"/></clipPath></defs><g><g transform="translate(-1335 -1300)"><g><use fill="#fff" fill-opacity="0" stroke="#b2b2b2" stroke-miterlimit="50" stroke-width="2" clip-path="url(&quot;#vhr3b&quot;)" xlink:href="#vhr3a"/></g><g><use fill="#fff" fill-opacity="0" stroke="#b2b2b2" stroke-miterlimit="50" xlink:href="#vhr3c"/></g><g><use fill="#fff" fill-opacity="0" stroke="#b2b2b2" stroke-miterlimit="50" xlink:href="#vhr3d"/></g></g></g></svg>';
        var prevTpl1 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40"><defs><path id="dtk9a" d="M65 1340v-40h40v40z"/><path id="dtk9c" d="M93 1320H77"/><path id="dtk9d" d="M83 1326l-6-6 6-6"/><clipPath id="dtk9b"><use fill="#fff" xlink:href="#dtk9a"/></clipPath></defs><g><g transform="translate(-65 -1300)"><g><use fill="#fff" fill-opacity="0" stroke="#b2b2b2" stroke-miterlimit="50" stroke-width="2" clip-path="url(&quot;#dtk9b&quot;)" xlink:href="#dtk9a"/></g><g><use fill="#fff" fill-opacity="0" stroke="#b2b2b2" stroke-miterlimit="50" xlink:href="#dtk9c"/></g><g><use fill="#fff" fill-opacity="0" stroke="#b2b2b2" stroke-miterlimit="50" xlink:href="#dtk9d"/></g></g></g></svg>';
        var nextTpl2 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40"><defs><path id="v2qta" d="M1335 1297a20 20 0 0 1 40 0 20 20 0 0 1-40 0z"/><path id="v2qtc" d="M1347 1297h16"/><path id="v2qtd" d="M1357 1291l6 6-6 6"/><clipPath id="v2qtb"><use fill="#fff" xlink:href="#v2qta"/></clipPath></defs><g><g transform="translate(-1335 -1277)"><g><use fill="#fff" fill-opacity="0" stroke="#b2b2b2" stroke-miterlimit="50" stroke-width="2" clip-path="url(&quot;#v2qtb&quot;)" xlink:href="#v2qta"/></g><g><use fill="#fff" fill-opacity="0" stroke="#b2b2b2" stroke-miterlimit="50" xlink:href="#v2qtc"/></g><g><use fill="#fff" fill-opacity="0" stroke="#b2b2b2" stroke-miterlimit="50" xlink:href="#v2qtd"/></g></g></g></svg>';
        var prevTpl2 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40"><defs><path id="51s1a" d="M65 1297a20 20 0 0 1 40 0 20 20 0 0 1-40 0z"/><path id="51s1c" d="M93 1297H77"/><path id="51s1d" d="M83 1303l-6-6 6-6"/><clipPath id="51s1b"><use fill="#fff" xlink:href="#51s1a"/></clipPath></defs><g><g transform="translate(-65 -1277)"><g><use fill="#fff" fill-opacity="0" stroke="#b2b2b2" stroke-miterlimit="50" stroke-width="2" clip-path="url(&quot;#51s1b&quot;)" xlink:href="#51s1a"/></g><g><use fill="#fff" fill-opacity="0" stroke="#b2b2b2" stroke-miterlimit="50" xlink:href="#51s1c"/></g><g><use fill="#fff" fill-opacity="0" stroke="#b2b2b2" stroke-miterlimit="50" xlink:href="#51s1d"/></g></g></g></svg>'
        
        var navs = [prevTpl1,nextTpl1];
        if($thisModule.hasClass('is-style-round')) navs = [prevTpl2,nextTpl2];

        var tabletItems = 1, mobileItems = 1;

        if(items == 3) {
            tabletItems = 2;
            mobileItems = 1
        } else if(items == 4 || items == 5) {
            tabletItems = 3;
            mobileItems = 1;
        }

        var $owlPromoConfig = {
            items:  items,
            nav  :  true,
            dots :  false,
            margin: 20,
            navText: navs,
            onInitialized: switchContent,
            onTranslated: switchContent,
            responsive: {
                320 : {
                    items : mobileItems
                },
                768 : {
                    items : tabletItems
                },
                1199 : {
                    items : items
                }
            }
        };
        function switchContent(event) {
            var items = event.item.count;
            if(!items > 1) return false;
            var element = event.target;
            var $modParent = $(element).closest('.is-contest-prod');
            var item = $(element).find('.owl-item.active');
            var idx = item.find('[data-idx]').data('idx');
            var $content = $modParent.find(".js-prod-content[data-idx='"+ idx +"']");
            $modParent.find(".js-prod-content[data-idx]").addClass('hidden view-hidden');
            $content.removeClass('hidden');
            setTimeout(function(){
                $content.removeClass('view-hidden');
            },10); 

        };
        var $parent = $thisModule.find('.owl-carousel');
        $parent.owlCarousel($owlPromoConfig);
    }
};

var pageApp = {
    'init': function(){
        var curApp = $('#app').attr('data-app');
        if (pageApp[curApp]) { pageApp[curApp](); }
    },
    'page-index':function(){
        console.log('index-here');
    }
};


$(document).ready(function(){ 
    moduleApp.init(); 
    // pageApp.init();

});
