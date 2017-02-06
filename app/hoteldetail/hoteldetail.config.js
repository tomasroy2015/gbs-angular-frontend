(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.hoteldetail", {
                url: "/hoteldetail?hotelId&hotelname&checkin&checkout",
                templateUrl: "app/hoteldetail/hoteldetail.tmpl.html",
                controller: "hoteldetailController",
              //  css:"content/HotelInformation.css",
                controllerAs: "vm",
                resolve: {
                    tabTitle: function (hotelService, $cookies) {
                        hotelService.GetTextMessagesAsString($cookies.get("lang"), "PropertyInfo").then(function (response) {
                            window.document.title = response;
                        });
                    }
                },
                params: {
                    hotelId: null,
                    hotelname: null,
                    checkin:null,
                    checkout:null
                }
            });
           
    }

    angular
     .module("hoteldetail")

 // Configure the routes and route resolvers
     .config(routeConfigurator)
    .run(function ($rootScope) {
        //console.log("hdetails config");
        $rootScope.hotelname = unescape(getUrlParameter("hotelname")).trunc(20);
        $rootScope.isShowLoader = true;
    });
    //routeConfigurator.$inject = ["$stateProvider"];
})();