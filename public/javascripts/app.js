var app = angular.module('httpCSGOStash', []);


app.controller('MainCtrl', function($scope) {
    $scope.awpSkins = [{weapon: "AWP", 
    					names:
    						[{name: "Asiimov"},
    						{name: "Redline"},
    						{name: "BOOM"}]},
    					{weapon: "AK-47", 
    					names:
    						[{name: "Jaguar"},
    						{name: "Redline"},
    						{name: "Vulcan"}]},
    					{weapon: "M4A1-S", 
    					names:
    						[{name: "Guardian"},
    						{name: "Nitro"},
    						{name: "Atomic Alloy"}]}];
});


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