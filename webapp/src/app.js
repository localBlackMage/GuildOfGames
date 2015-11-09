(function (ng) {
    'use strict';

    var app = ng.module('guildOfGames.app', [
        // Other dependencies
        'ui.router',

        // Templates
        'guildOfGames.templates',

        // Services
        'guildOfGames.services.userService'

        // Directives

        // Controllers
    ]);

    app.controller('HeaderController', ['$rootScope', '$scope', '$state',
        function ($rootScope, $scope, $state) {
        }
    ]);

    app.controller('HomeController', ['$scope', '$state', 'UserService', 'currentUser',
        function ($scope, $state, UserService, currentUser) {
            console.log(currentUser);
        }
    ]);

    app.config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider',
        function ($stateProvider, $urlRouterProvider, RestangularProvider) {
            $urlRouterProvider.when('', '/');

            // Restangular global config
            RestangularProvider.setBaseUrl('https://api.parse.com/1');

            RestangularProvider.setDefaultHeaders({
                "X-Parse-Application-Id": "VS6qVTDjXnCfXoME3OBRPzOYCsb4r3DlXNtwzYf2",
                "X-Parse-REST-API-Key": "EVzQYQ7s4679CZNXwiU9d3kPmrxw1o8iiMQAZY6X",
                "Content-Type": "application/json"
            });

            $stateProvider
                .state('app', {
                    url: '/',
                    resolve: {
                        currentUser: ['UserService', function (UserService) {
                            return UserService.getCurrentUser();
                        }]
                    },
                    views: {
                        'header@': {
                            templateUrl: 'header.html',
                            controller: 'HeaderController'
                        },
                        'main@': {
                            templateUrl: 'home.html',
                            controller: 'HomeController'
                        }
                    }
                });
        }
    ]);
})(angular);
