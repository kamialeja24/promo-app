'use strict';
  
angular.module('promo-app')

.factory('ClientService',['$http','ApiEndpoint' ,function($http, ApiEndpoint) {
    console.log('ApiEndpoint', ApiEndpoint)
    // get all clients
    var getClients = function() {
        return $http.get(ApiEndpoint.url + '/app/clients')
          .then(function(data) {
            console.log('Got some data: ', data);
            return data;
          });
    };
    
    //create a client
    var createClient = function (user) {
        return $http.post(ApiEndpoint.url + '/app/clients',
                          {first_name: user.first_name,
                           last_name: user.last_name,
                           username: user.username,
                           password: user.password,
                           email: user.email,
                           sex: user.sex,
                           age: user.age
                          })
            .then(function(data){
                return data;
        })
    
    };
    
    


  return {
    getClients: getClients,
    createClient: createClient
  };
}]);