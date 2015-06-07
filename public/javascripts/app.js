
var app = angular.module('httpCSGOStash', ['ui.router']);


app.controller('MainCtrl', ['$scope', 'prices',
    function($scope, prices) {
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
                            {name: "BOOM", price: ""}]},
                        {weapon: "AK-47", 
                        names:
                            [{name: "Jaguar", price: ""},
                            {name: "Redline", price: ""},
                            {name: "Vulcan", price: ""}]},
                        {weapon: "M4A1-S", 
                        names:
                            [{name: "Guardian", price:""},
                            {name: "Nitro", price: ""},
                            {name: "Atomic Alloy", price: ""}]}]
    };

    o.getPrices = function() {
        return $http.get('/price/'+JSON.stringify(o.prices)).success(function(data) {
            console.log(data);
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
  $('.btn btn-primary').on('hide.bs.collapse', function () {
    $('#button')
    .html('<span class="glyphicon glyphicon-collapse-down"></span> AWP');
  })
  $('.btn btn-primary').on('show.bs.collapse', function () {
    $('#button')
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