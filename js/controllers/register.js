'use strict';

angular.module('promo-app')

.controller('RegisterCtrl', ['$scope','ClientService','$ionicPopup', function($scope, ClientService, $ionicPopup){
    $scope.showAlert = function(api_message,title,type) {
        if (type == "Error"){
            var okType = "button-assertive";
        }else{
            var okType = "button-balanced";
        }
       var alertPopup = $ionicPopup.alert({
         title: title,
         cssClass: 'bar-assertive cool-text',
         template: api_message,
         okText: 'Entiendo',
         okType: okType
       });
     };
    $scope.client= {};
    $scope.errors= {};
    $scope.register = function (client){
        $scope.dataLoading = true;
        $scope.client = client;
        console.log($scope.client);
        var createPromise = ClientService.createClient(client);
        createPromise.then(function (data) {
        console.log(data);
        $scope.showAlert("Registrado satisfactoriamente porfavor ingresa", "Muy bien", "Satisfactorio");
        $scope.dataLoading = false;
        },function(data){
            console.log(data);
            if (data.status == 404){
                $scope.error = true;
                $scope.errors = data.data;
                $scope.dataLoading = false;
            }if (data.status == 500){
                $scope.showAlert("Verifica tu conexion a internet","Error!","Error");
                $scope.dataLoading = false;
            }
        });
        };


}]);