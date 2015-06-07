var express = require('express');
var router = express.Router();
var requestify = require('requestify');

router.get('/price/:data', function(req, res, next) {
	var theData = JSON.parse(req.params.data);
	var results = [];
	for(i = 0; i < theData.length; i++) {
		var currWep = theData[i].weapon;
		for(j = 0; j < theData[i].names.length; j++) {
			var currSkin = theData[i].names[j].name;
			var currURL = 'http://steamcommunity.com/market/priceoverview/'+
				'?callback=JSON_CALLBACK&currency=3&appid=730&market_hash_name='
				+encodeURI(currWep)+encodeURI(' | ')+encodeURI(currSkin)+encodeURI(' (Field-tested)');
			var theJSON;
			requestify.get(currURL).then(function(response) {
				theJSON = JSON.parse(response.body);
				results.push(theJSON);
				console.log(theJSON);
			});
			//console.log(theData[i].names[j].name + " : " + theJSON.median_price);
		}
	}
	res.json({'hello' : 'hello'});
});

module.exports = router;
/*
var socket = io.connect('http://localhost:8080');
socket.emit('itemPrice', 'http://steamcommunity.com/market/priceoverview/?callback=JSON_CALLBACK&currency=3&appid=730&market_hash_name=StatTrak%E2%84%A2%20P250%20%7C%20Steel%20Disruption%20%28Factory%20New%29');
socket.emit('itemPrice', 'http://steamcommunity.com/market/listings/730/FAMAS%20%7C%20Neural%20Net%20%28Well-Worn%29')
socket.on('returnPrice', function(response) {
    console.log(response);
});

*/