angular.module(
  'httpCSGOStash',
  [
    'ui.router',
    'angular.filter',
    'chart.js'
  ]
);

angular.module('httpCSGOStash').factory('itemData', ['$http', function($http) {
      return {
        get : function() {
          return $http.get(
            '/assets/test.json'
          );
        },
        data : null
      }
}]);

angular.module('httpCSGOStash').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
      /* Updates all prices for weapons/skins before page loads if uncommented. */
      /*resolve: {
          pricePromise : ['prices', function(prices) {
            return prices.getPrices();
          }]
      }*/
    });

    $stateProvider
    .state('wep', {
      url: '/wep/{wep}',
      templateUrl: '/wep.html',
      controller: 'WepCtrl',
      resolve: {
      }
    })

    $stateProvider
    .state('singleskin', {
      url: '/singleskin/{wep} | {skin}',
      templateUrl: '/singleskin.html',
      controller: 'SkinCtrl',
      resolve: {
        skin : ['$stateParams', 'itemData',
        function($stateParams, itemData) {
          var i = itemData.data.length;
            while (i--)
              if (itemData.data[i].name === $stateParams.wep)
              return itemData.data[i].skinData[$stateParams.skin];
        }],
        wep: ['$stateParams',
          function($stateParams) {
            return {
              wep: $stateParams.wep,
              skin: $stateParams.skin
            };
          }]
        }
    });

    $stateProvider
    .state('nothing', {
      url: '/nothing',
      templateUrl: '/nothing.html',
      controller: 'NothingCtrl'
    });

    $stateProvider
    .state('search', {
      url: '/search',
      templateUrl: '/search.html',
      controller: 'SearchCtrl'
    });

    $urlRouterProvider.otherwise('home');
    }]);
