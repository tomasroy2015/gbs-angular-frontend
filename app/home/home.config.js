(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.home", {
                url: "/home?RemindCode?VerificationCode",
                templateUrl: "app/home/home.tmpl.html",
                controller: "homeController",
                controllerAs: "vm",
                resolve : {
                    tabTitle: function (hotelService, $cookies) {
                        if (!$cookies.get("lang"))
                        {
                            //set default language
                            $cookies.put("lang", "en")
                        }
                        hotelService.GetTextMessagesAsString($cookies.get("lang"), "HomePage").then(function (response) {
                            window.document.title = response;
                        });
                    }
                },
                params : {
                    RemindCode: null,
                    VerificationCode: null,
                }
            });
    }

    angular
     .module("home")

 // Configure the routes and route resolvers
     .config(routeConfigurator) 
    .run(function ($rootScope) {
        //console.log("run home config");
        
    });
    //routeConfigurator.$inject = ["$stateProvider"];
})();