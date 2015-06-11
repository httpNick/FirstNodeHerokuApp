
var app = angular.module('httpCSGOStash', ['ui.router', 'angular.filter']);


app.controller('MainCtrl', ['$scope', 'prices',
    function($scope, prices) {
    $scope.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 
                     'G', 'H', 'I', 'J', 'K', 'L', 
                     'M', 'N', 'O', 'P', 'Q', 'R', 
                     'S', 'T', 'U', 'V', 'W', 'X', 
                     'Y', 'Z'];
  

    $scope.weapons = prices.prices;
    
    $scope.getPrice = function(data) {
        for(i in data.names) {
            prices.getPrice(data.weapon, i);
        }
    }
}]);

app.filter('retrievePrice', [function() {
    return function(skinName, wepName) {
        
    }
}]);

app.factory('prices', ['$http', function($http) {
    
    var o = {
        prices : [{weapon: "AWP", 
                        names:
                            [{name: "Asiimov", price: ""},
                            {name: "Redline", price: ""},
                            {name: "BOOM", price: ""},
                            {name: "Hyper Beast", price: ""},
                            {name: "Man-o'-war", price: ""}]},
                        {weapon: "AK-47", 
                        names:
                            [{name: "Jaguar", price: ""},
                            {name: "Redline", price: ""},
                            {name: "Vulcan", price: ""},
                            {name: "Wasteland Rebel", price: ""},
                            {name: "Aquamarine Revenge", price: ""}]},
                        {weapon: "M4A1-S", 
                        names:
                            [{name: "Guardian", price:""},
                            {name: "Nitro", price: ""},
                            {name: "Atomic Alloy", price: ""},
                            {name: "Hyper Beast", price: ""},
                            {name: "Cyrex", price: ""}]}]
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
            controller: 'MainCtrl',
            resolve: {
                pricePromise : ['prices', function(prices) {
                    return prices.getPrices();
                }]
            }
        });

        $urlRouterProvider.otherwise('home');
    }]);


$(function(){
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
})

/*
var socket = io.connect('http://localhost:8080');
socket.emit('itemPrice', 'http://steamcommunity.com/market/priceoverview/?callback=JSON_CALLBACK&currency=3&appid=730&market_hash_name=StatTrak%E2%84%A2%20P250%20%7C%20Steel%20Disruption%20%28Factory%20New%29');
socket.emit('itemPrice', 'http://steamcommunity.com/market/listings/730/FAMAS%20%7C%20Neural%20Net%20%28Well-Worn%29')
socket.on('returnPrice', function(response) {
    console.log(response);
});

*/