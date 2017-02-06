(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.login", {
                url: "/login",
                templateUrl: "app/Home/home.tmpl.html",
                controller: "homeController",
                controllerAs: "vm"
            });
    }

    angular
    .module("login")
    .config(routeConfigurator);
})();