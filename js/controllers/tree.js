'use strict';
angular.module('promo-app')
.controller('TreeCtrl',['$scope', 'Chats', function($scope, Chats){
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
    Chats.remove(chat);
  }
}]);