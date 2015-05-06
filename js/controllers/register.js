'use strict';

angular.module('promo-app')

.controller('RegisterCtrl', ['$scope','ClientService', function($scope, ClientService){
    $scope.client= {};
    $scope.register = function (client){
        $scope.client = client;
        console.log($scope.client);
        var createPromise = ClientService.createClient(client);
        createPromise.then(function (data) {
        console.log(data);
        });
        };


}]);