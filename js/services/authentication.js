'use strict';
  
angular.module('promo-app')
  
.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope', '$timeout','ApiEndpoint','$base64',
    function ($http, $cookieStore, $rootScope, $timeout,ApiEnpoint,$base64) {
        var service = {};
 
        service.Login = function (username, password, callback) {
 
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            
//            $timeout(function(){
//                var response = { success: username === 'test' && password === 'test' };
//                if(!response.success) {
//                    response.message = 'Username or password is incorrect';
//                }
//                callback(response);
//            }, 1000);
 
 
            /* Use this for real authentication
             ----------------------------------------------*/
            $http.post(ApiEnpoint.url + '/platform/authentications/verify_credentials', { username: username, password: password })
                .success(function (response) {
                    console.log(response);
                    response['success'] = true;
                    callback(response);
                }).error(function (response) {
                    callback(response);
                });
        };
  
        service.SetCredentials = function (username, password, userObject) {
            var authdata = $base64.encode(username + ':' + password);  
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata,
                    userObject: userObject
                }
            };
  
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };
  
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
  
        return service;
    }]);
  
