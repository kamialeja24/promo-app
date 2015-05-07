'use strict';
angular.module('promo-app')
.controller('FavoritesCtrl',['$scope','$http','ClientService','$rootScope', function($scope,$http,ClientService, $rootScope){
    // Simple GET request example :
    console.log("Current User");
    console.log($rootScope.globals.currentUser.userObject);
    $rootScope.$on('$stateChangeStart', 
        function(){
        $scope.loadContent();
    });
    $scope.loadContent = function (){
        $scope.dataLoading = true;
        var promise = ClientService.getClients();
        promise.then(function (data) {
        $scope.users = data.data.clients;
        $scope.dataLoading = false;
        console.log ($scope.users);
        });
    }

}]);