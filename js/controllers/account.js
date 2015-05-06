'use strict';
angular.module('promo-app')
.controller('AccountCtrl',['$location', '$scope', function($scope, $location) {

  $scope.settings = {
    enableFriends: true,
  };
}]);