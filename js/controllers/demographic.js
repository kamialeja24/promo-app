'use strict';
angular.module('promo-app')
.controller('DemographicCtrl',['$scope', 'Chats', function($scope, Chats){
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
}]);