'use strict';
angular.module('promo-app')
.controller('AccountCtrl',[ '$scope','$location','AuthenticationService','$state', function($scope, $location, AuthenticationService, $state) {
  $scope.logout = function(){
    AuthenticationService.ClearCredentials();
    $state.go('login');
      console.log("tapped");
  };
  $scope.settings = {
    enableFriends: true
  };
}]);