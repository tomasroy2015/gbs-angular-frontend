(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.region", {
                url: "/region?regionId",
                templateUrl: "app/region/region.tmpl.html",
                controller: "regionController",
                controllerAs: "vm"
            });
    }

    angular
     .module("region")

 // Configure the routes and route resolvers
     .config(routeConfigurator);

    //routeConfigurator.$inject = ["$stateProvider"];
})();