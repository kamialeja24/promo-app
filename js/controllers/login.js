'use strict';
angular.module('promo-app')

.controller('LoginCtrl',
    ['$scope', '$rootScope', '$location', '$state', 'AuthenticationService','$ionicPopup',
    function ($scope, $rootScope, $location, $state, AuthenticationService,$ionicPopup) {
        // reset login status
        AuthenticationService.ClearCredentials();
        $scope.user= {};
        
        var emptyUser = angular.copy($scope.user);
        
        $scope.setFormScope= function(scope){
            this.formScope = scope;
        }    
        $scope.reset = function (){
            this.formScope.loginForm.$setPristine();
            this.user = angular.copy(emptyUser);
        };
         $scope.showAlert = function(api_message) {
           var alertPopup = $ionicPopup.alert({
             title: 'Error!',
             cssClass: 'bar-assertive',
             template: api_message,
             okText: 'Entiendo',
             okType: 'button-assertive'
           });
         };
        $scope.login = function (user) {
            $scope.dataLoading = true;
            $scope.user = user;
            console.log($scope.user);
            AuthenticationService.Login($scope.user.username, $scope.user.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.user.username, $scope.user.password);
                    $location.path('#/tab/favorites');
                    $scope.error = '';
                    $scope.dataLoading = false;
                } else {
                    $scope.showAlert(response.message);
                    $scope.dataLoading = false;
                }
            });
        };
    }]);