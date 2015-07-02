
var app = angular.module('httpCSGOStash', ['ui.router', 'angular.filter', 'ui.bootstrap.modal']);

/* Very cool trick from: 
http://stackoverflow.com/questions/16199418/how-do-i-implement-the-bootstrap-navbar-active-class-with-angular-js */

app.controller('NavCtrl', ['$scope', '$location', 
    function($scope, $location) {
        $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };
    }]);

app.controller('MainCtrl', ['$scope', '$http', 'prices',
    function($scope, $http, prices) {

    $scope.weapons = prices.prices;

    $scope.selectMessage = function(wep) {
        if (!wep.cached) {
            $http.get('/singleprice/' + JSON.stringify(wep)).success(function(data) {
                for(i = 0; i < prices.prices.length; i++) {
                    if (prices.prices[i].weapon === data.weapon) {
                        prices.prices[i].cached = true;
                        prices.prices[i].names = data.names;
                        break;
                    }
                }
            });
        }
    };

}]);

app.controller('SkinCtrl', ['$scope', 'skin',
    function($scope, skin) {
        $scope.skin = skin;
        $scope.test = {a:'a', b:'b', c:'c'}
    }]);

app.controller('NothingCtrl', ['$scope',
    function($scope) {
        $scope.nothing = "this is a nothing.";
        $scope.posts = {};
        $scope.open = function() {
          $scope.showModal = true;
        };

        $scope.ok = function() {
          $scope.showModal = false;
        };

        $scope.cancel = function() {
          $scope.showModal = false;
        };
    }]);

app.factory('prices', ['$http', function($http) {
    
    var o = {
        prices : [{weapon: "AWP", 
                    cached:  false,
                        names:
                            [{name: "Asiimov",
                                wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Redline", 
                                wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "BOOM", 
                               wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Hyper Beast", 
                               wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Man-o'-war", 
                               wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }}]},
                        {weapon: "AK-47", 
                        cached: false,
                        names:
                            [{name: "Jaguar", 
                               wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Redline", 
                                wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Vulcan", 
                            wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Wasteland Rebel", 
                               wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Aquamarine Revenge", 
                                 wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }}]},
                        {weapon: "M4A1-S", 
                        cached: false,
                        names:
                            [{name: "Guardian", 
                              wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Nitro", 
                                wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Atomic Alloy", 
                                wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Hyper Beast", 
                              wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Cyrex", 
                                wears: { 
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }}]}]
    };

    o.getPrices = function() {
        return $http.get('/price/'+JSON.stringify(o.prices)).success(function(data) {
            o.prices = data;
        })
    }
    return o;
}]);

app.config([
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
            url: '/wep/{wep}-{skin}',
            templateUrl: '/wep.html',
            controller: 'SkinCtrl',
            resolve: {
                skin : ['$stateParams', 'prices',
                function($stateParams, prices) {
                    for (i = 0; i < prices.prices.length; i++) {
                        if (prices.prices[i].weapon === $stateParams.wep) {
                            for (j = 0; j < prices.prices[i].names.length; j++) {
                                if(prices.prices[i].names[j].name === $stateParams.skin) {
                                    console.log(prices.prices[i].names[j])
                                    return prices.prices[i].names[j];
                                }
                            }
                        }
                    }
                }]
            }
        });
        
        $stateProvider
        .state('nothing', {
            url: '/nothing',
            templateUrl: '/nothing.html',
            controller: 'NothingCtrl'
        });

        $urlRouterProvider.otherwise('home');
    }]);


/*$(function(){
  $('#AWP').on('hide.bs.collapse', function () {
    console.log('change to down');
    $('#theButton')
    .html('<span class="glyphicon glyphicon-collapse-down"></span> AWP');
  })
  $('#AWP').on('show.bs.collapse', function () {
    console.log('change to up.');
    $('#theButton')
    .html('<span class="glyphicon glyphicon-collapse-up"></span> AWP');
  })
}) */

/*
var socket = io.connect('http://localhost:8080');
socket.emit('itemPrice', 'http://steamcommunity.com/market/priceoverview/?callback=JSON_CALLBACK&currency=3&appid=730&market_hash_name=StatTrak%E2%84%A2%20P250%20%7C%20Steel%20Disruption%20%28Factory%20New%29');
socket.emit('itemPrice', 'http://steamcommunity.com/market/listings/730/FAMAS%20%7C%20Neural%20Net%20%28Well-Worn%29')
socket.on('returnPrice', function(response) {
    console.log(response);
});

*/