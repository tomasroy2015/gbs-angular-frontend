(function () {
    'use strict';

    function routeConfigurator($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, $httpProvider, $locationProvider) {
        //$locationProvider.hashPrefix('');
        $locationProvider.hashPrefix('!');

        
        cfpLoadingBarProvider.includeSpinner = true;

       
         
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
                    cultureResolve: function (languageResolve, hotelService, $cookies, $http) {

                         
                        var lang = $cookies.get("lang");
                        if (lang == null || lang == undefined) {
                            var json = 'http://ipinfo.io/json';
                            if (window.location.href.indexOf("https") != -1) {
                                json = 'https://ipinfo.io/json';
                            }
                          //  var promie = $http.get(json);
                            $.ajax({
                                url: json,
                                async: false,
                                dataType: 'json',
                                success: function (data) {
                                    // do stuff with response.
                                    lang = "en";
                                    
                                    if (data.country == 'FR')
                                        lang = "fr";
                                    if (data.country == 'RU')
                                        lang = "ru";
                                    if (data.country == 'DE')
                                        lang = "de";
                                    if (data.country == 'GB')
                                        lang = "en";
                                    if (data.country == 'TR')
                                        lang = "tr";
                                    if (data.country == 'SA')
                                        lang = "ar";
                                    $cookies.put("lang", lang, { expires: GBSHelper.helpers.getCookieExpire() });
                                    return hotelService.getCurrencyLoad(lang).then(function (response) { return response; }).catch(function (err) { console.log(err) });
                                }
                            });
                        }
                        else {
                            return hotelService.getCurrencyLoad(lang).then(function (response) { return response; }).catch(function (err) { console.log(err) });
                        }
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
                        templateUrl: "app/layout/content.tmpl.html?v=1.22"
                    },
                    "FooterView": {
                        templateUrl: "app/layout/footer.html",
                        controller: "footerController",
                        controllerAs: "vm"
                    }
                }
            });
     
    }

    
     
    function allowCookie($httpProvider) {
      // $httpProvider.defaults.withCredentials = true;
    }

  
   
    String.prototype.trunc = String.prototype.trunc ||
      function (n) {
          return (this.length > n) ? this.substr(0, n - 1) + '...' : this;
      };
        var facebookID =
        (
            window.location.href.indexOf('localhost') != -1 ?
            '253111121388184' //this is for locahost testing
            : '1103816132975397' //  live: clientId
        );
    
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
       
        .config(['$facebookProvider', function ($facebookProvider) {
            $facebookProvider.setAppId(facebookID).setPermissions(['email', 'user_friends']);
        }])
        .run(['$rootScope', '$window', '$location', function ($rootScope, $window, $location) {
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

            // initialise google analytics
            $window.ga('create', 'UA-46104079-1', 'auto');
            //ga('create', 'UA-46104079-1', 'auto');
            //ga('send', 'pageview');
            // track pageview on state change
            $rootScope.$on('$stateChangeSuccess', function (event) {
                $window.ga('send', 'pageview', $location.path());
            });

        }])
        .constant("API_URL", {
            URL: (window.location.href.indexOf('localhost') != -1 ? 
                      ""
                 : 
                    "https://api.gbshotels.com/api/"
                 )
        })
        .constant("GOOGLE_API_KEY",{
            KEY:(window.location.href.indexOf('localhost') != -1 ? 
                      "AIzaSyCxWF0eLCoV4XdLU-CLZl88LO4frFVitqI"
                    : "AIzaSyBWUA5rOR3O3p9Y2b0_py7oeOmI76NLCeA"
                 ),
            URL: "https://www.googleapis.com/plus/v1/people",
            USERCONTENT: (window.location.href.indexOf('localhost') != -1 ? 
                    "1003522574619-rime6t81jg0p9o2lnren6j4toarh9b43.apps.googleusercontent.com"
                    :"1005463768683-j5utop9jun4o6d84m3jqeage1gogkijv.apps.googleusercontent.com"
                    // OLD MVC :  "368302432175-00mdonk78c454dvohgup6h0fl95glvbi.apps.googleusercontent.com"
                 )
        }).
    constant("API_Extranet", { URL: "https://167.114.102.159:8081" })
    //new directive reference : http://jsfiddle.net/abhishekbhalani/hqLjq3fb/
    .directive('autoScroll', function ($document, $timeout, $location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.okSaveScroll = true;
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
    routeConfigurator.$inject = ["$stateProvider", "$urlRouterProvider", "cfpLoadingBarProvider","$httpProvider","$locationProvider"];
    
    
})();