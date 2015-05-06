'use strict';
angular.module('promo-app')
.controller('FavoritesCtrl',['$scope','$http','ClientService', function($scope,$http,ClientService){
    // Simple GET request example :
    $scope.dataLoading = true;
    var promise = ClientService.getClients();
    promise.then(function (data) {
    $scope.users = data.data.clients;
    $scope.dataLoading = false;
    console.log ($scope.users);
    });
    
}]);