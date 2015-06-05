var app = angular.module('httpCSGOStash', []);


app.controller('MainCtrl', function($scope, $http) {
    $http.get("http://steamcommunity.com/market/priceoverview/?currency=3&appid=730&market_hash_name=StatTrak%E2%84%A2%20P250%20%7C%20Steel%20Disruption%20%28Factory%20New%29").success(function(response) { 
        $scope.values = response;
        console.log(response); 
    });
});
