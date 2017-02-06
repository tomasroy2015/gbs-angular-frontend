(function () {
    'use strict';

    function routeConfigurator($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, $httpProvider) {
        //$httpProvider.defaults.withCredentials = true;

         //,IdleProvider, KeepaliveProvider
        //IdleProvider.idleDuration(10 * 60); // 10 minutes idle
        //IdleProvider.warningDuration(30); // 30 second warning
        //KeepaliveProvider.interval(5 * 60); // 5 minute keep-alive ping
        //cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
         cfpLoadingBarProvider.includeSpinner = true;
        //cfpLoadingBarProvider.spinnerTemplate = '<div class="pt-spinner-overlay"><img class="imageRotate"  style="width: 50px;position:absolute; top: 50%; left: 50%;"  src="content/images/Loading_icon.png" /></div>';
//        cfpLoadingBarProvider.spinnerTemplate = '<div id="loader">\
//    <div id="box"></div>\
//    <div id="hill"></div>\
        //</div>';

        //     var isHotelDetail = getUrlParameter("hotelname");
        //     var loaderTemp = '<div class="pt-spinner-overlay"><div class="cs-loader"><div class="cs-loader-title">Welcome to ';
        //     if (isHotelDetail === undefined || isHotelDetail == "") {
        //         loaderTemp += "GBS HOTELS";
        //     }
        //     else {
        //         loaderTemp += unescape(isHotelDetail).trunc(20);//Used to truncate prototype method of JS6
        //     }
        //     loaderTemp += '</div><div class="cs-loader-inner">\
        //    <label>	<i class="fa fa-star" aria-hidden="true"></i></label>\
        //    <label>	<i class="fa fa-star" aria-hidden="true"></i></label>\
        //    <label>	<i class="fa fa-star" aria-hidden="true"></i></label>\
        //    <label>	<i class="fa fa-star" aria-hidden="true"></i></label>\
        //    <label>	<i class="fa fa-star" aria-hidden="true"></i></label>\
        //    <label>	<i class="fa fa-star" aria-hidden="true"></i></label>\
        //  </div>\
        //  </div>\
        //</div>';
        //cfpLoadingBarProvider.spinnerTemplate = loaderTemp;
         
        $urlRouterProvider
            .when('', '/home')
            .when('/', '/home')
            .otherwise('/');
        $stateProvider
            .state('master', {
                abstract: true,
                templateUrl: 'app/layout/gbs.allstate.html',
                resolve: {
                    languageResolve: function (hotelService) {
                        return hotelService.getCulture().then(function (response) {
                            return response;
                        }).catch(function (err) {

                        });
                    },
                    cultureResolve: function (languageResolve, hotelService, $cookies) {
                        var lang = $cookies.get("lang");
                        if (lang == null || lang == undefined)
                        {
                            lang = "en";
                            $cookies.put("lang","en")
                        }
                        return hotelService.getCurrencyLoad(lang).then(function (response) {
                            return response;
                        }).catch(function (err) {

                        })
                    }

                }
            })
            .state('master.gbs', {
                abstract: true,
                views: {
                    "HeaderView": {
                        templateUrl: "app/layout/topnav.html",
                        controller: "topNavigationController",
                        controllerAs: "vm",

                    },
                    "ContentView": {
                        templateUrl: "app/layout/content.tmpl.html"
                    },
                    "FooterView": {
                        templateUrl: "app/layout/footer.html",
                        controller: "footerController",
                        controllerAs: "vm"
                    }
                }
            });
       // $locationProvider.html5Mode(true);
    }

    var facebookID = '1103816132975397'; 
    

    //Facebook provider
    //function facebookProvider($facebookProvider)
    //{
    //    $facebookProvider.setAppId(facebookID).setPermissions(['email', 'user_friends']);
    //}

    //function idleConfigurator($routeProvider, IdleProvider, KeepaliveProvider) {
    //    console.log("ideal provider");
    //    IdleProvider.idleDuration(10 * 60); // 10 minutes idle
    //    IdleProvider.warningDuration(30); // 30 second warning
    //    KeepaliveProvider.interval(5 * 60); // 5 minute keep-alive ping
    //}

    function allowCookie($httpProvider) {
      // $httpProvider.defaults.withCredentials = true;
    }

    //function authProvider($authProvider) {
    //        $authProvider.facebook({
    //            //live: clientId: '1103816132975397'
    //            clientId: '253111121388184',
    //        });

    //        // Optional: For client-side use (Implicit Grant), set responseType to 'token' (default: 'code')
    //        $authProvider.facebook({
    //            //clientId: '1103816132975397',
    //            clientId: '253111121388184',
    //            responseType: 'token',
    //            redirectUri: window.location.origin + '/',
    //            requiredUrlParams: ['display', 'scope'],
    //            scope: ['email'],
    //            scopeDelimiter: ',',
    //            display: 'popup',
    //            oauthType: '2.0'
    //        });

    //        $authProvider.google({
    //            //clientId: '368302432175-00mdonk78c454dvohgup6h0fl95glvbi.apps.googleusercontent.com'
    //            clientId: '1003522574619-rime6t81jg0p9o2lnren6j4toarh9b43.apps.googleusercontent.com'
    //            // client secreat: WvOAyUhJmpD-MQvTRD579Phn
    //            //, optionalUrlParams: ['access_type']
    //            , scope: "https://www.googleapis.com/auth/plus.profile.emails.read"
    //           //, accessType: 'plus,profile,emails,read,offline'
    //            //,redirectUri: window.location.origin + '/' 
    //            // ,url: '/auth/google',
    //            , url: '/auth/google'
    //            ,authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    //            redirectUri: window.location.origin + '/'
    //        });
    //}
   
    String.prototype.trunc = String.prototype.trunc ||
      function (n) {
          return (this.length > n) ? this.substr(0, n - 1) + '...' : this;
      };

    //to save last position of scroll on view state changes : BY: Abhishek on 30-09-2016
    // Not working now, may be some issue 
    function fnkeepScrollPos($route, $window, $timeout, $location, $anchorScroll) {
            // cache scroll position of each route's templateUrl
            var scrollPosCache = {};
            // compile function
            return function(scope, element, attrs) {

                scope.$on('$routeChangeStart', function() {
                    // store scroll position for the current view
                    if ($route.current) {
                        scrollPosCache[$route.current.loadedTemplateUrl] = [ $window.pageXOffset, $window.pageYOffset ];
                    }
                });

                scope.$on('$routeChangeSuccess', function () {
                   
                    // if hash is specified explicitly, it trumps previously stored scroll position
                    if ($location.hash()) {
                        $anchorScroll();

                        // else get previous scroll position; if none, scroll to the top of the page
                    } else {
                        var prevScrollPos = scrollPosCache[$route.current.loadedTemplateUrl] || [ 0, 0 ];
                        $timeout(function() {
                            $window.scrollTo(prevScrollPos[0], prevScrollPos[1]);
                        }, 0);
                    }
                });
            }
       

    }

    angular
        .module('app')
        .config(routeConfigurator)
        .config(allowCookie)
       // .config(authProvider)
        //.config(facebookProvider)
        .config(['$facebookProvider', function ($facebookProvider) {
            $facebookProvider.setAppId(facebookID).setPermissions(['email', 'user_friends']);
        }])
        .run(['$rootScope', '$window', function ($rootScope, $window) {
            //console.log("run app config");
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            $rootScope.$on('fb.load', function () {
                $window.dispatchEvent(new Event('fb.load'));
            });

        }])
        .constant("API_URL", {
              //  URL: "http://localhost:49365/api/"
            //URL: "http://api.maplayout.com/api/"
           // URL: "http://api.gdsbooking.com/api/"
           URL: "https://api.gbshotels.com/api/"
            //URL: "http://localhost:8096/api/"
            //URL: "https://localhost:44304/api"
            //URL: "https://localhost:4430/api/"
        })
        .constant("GOOGLE_API_KEY",{
            KEY:"AIzaSyCxWF0eLCoV4XdLU-CLZl88LO4frFVitqI",
            URL:"https://www.googleapis.com/plus/v1/people"
        }).
        constant("API_Extranet", { URL: "http://167.114.102.159:8081/"})
    //.directive('keepScrollPos',fnkeepScrollPos);

    //new directive reference : http://jsfiddle.net/abhishekbhalani/hqLjq3fb/
    .directive('autoScroll', function ($document, $timeout, $location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.okSaveScroll = true;
                debugger
                scope.scrollPos = {};

                $document.bind('scroll', function () {
                    if (scope.okSaveScroll) {
                        scope.scrollPos[$location.path()] = $(window).scrollTop();
                    }
                });

                scope.scrollClear = function (path) {
                    scope.scrollPos[path] = 0;
                };

                scope.$on('$locationChangeSuccess', function (route) {
                    $timeout(function () {
                        $(window).scrollTop(scope.scrollPos[$location.path()] ? scope.scrollPos[$location.path()] : 0);
                        scope.okSaveScroll = true;
                    }, 0);
                });

                scope.$on('$locationChangeStart', function (event) {
                    scope.okSaveScroll = false;
                });
            }
        };
    })

    // Common directive for Focus
    .directive('focus',
        function ($timeout) {
            return {
                scope: {
                    trigger: '@focus'
                },
                link: function (scope, element) {
                    scope.$watch('trigger', function (value) {
                        if (value === "true") {
                            $timeout(function () {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        }
    );
    
   
    //routeConfigurator.$inject = ["$stateProvider", "$urlRouterProvider", "cfpLoadingBarProvider", "IdleProvider", "KeepaliveProvider"];
    routeConfigurator.$inject = ["$stateProvider", "$urlRouterProvider", "cfpLoadingBarProvider","$httpProvider"];
    
    //Below not worked so comment temporary
    //authProvider.$inject = ["$authProvider"];

    // new FB provider
  //  facebookProvider.$inject = ["$facebookProvider"];

    //  idleConfigurator.$inject = ["$routeProvider", "IdleProvider", "KeepaliveProvider"]
    /***Start : To save last position of scroll on view state changes : BY: Abhishek on 30-09-2016
    // Not working now, may be some issue 
    //keepScrollDirective.$inject=['$route', '$window', '$timeout', '$location', '$anchorScroll'];
    End**/
})();