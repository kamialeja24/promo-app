// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('promo-app', [
    'ionic',
    'ngCookies',
    'base64'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
// Change the constant to http://localhost:8100/api for ionic serve and to http://192.168.0.3:3000/v1 ofr ionic run
.constant('ApiEndpoint', {
  url: 'http://192.168.0.3:3000/v1'
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:
  .state('login',{
    url:"/login",
    templateUrl:"templates/login.html",
    controller: 'LoginCtrl'
  })
  .state('register',{
    url:"/register",
    templateUrl:"templates/register.html",
    controller: 'RegisterCtrl'
  })
  
  .state('tab.favorites', {
    url: '/favorites',
    views: {
      'tab-favorites': {
        templateUrl: 'templates/tab-favorites.html',
        controller: 'FavoritesCtrl'
      }
    }
  })

  .state('tab.tree', {
      url: '/tree',
      views: {
        'tab-tree': {
          templateUrl: 'templates/tab-tree.html',
          controller: 'TreeCtrl'
        }
      }
    })
    .state('tab.demographic', {
      url: '/demographic',
      views: {
        'tab-demographic': {
          templateUrl: 'templates/tab-demographic.html',
          controller: 'DemographicCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/favorites');

})
 //app security for non members access disable for testing
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
        var exception_paths = ['/login','/register'] 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if (exception_paths.indexOf($location.path()) == -1  && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);
