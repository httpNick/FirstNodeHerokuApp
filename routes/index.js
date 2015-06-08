var express = require('express');
var router = express.Router();
var requestify = require('requestify');
var async = require('async');

var getPrice = function(url, doneCallback) {
	console.log(url.url + " Wep: " + url.wep + " Skin: " + url.skin);
	requestify.get(url.url).then(function(response){
		console.log(response.getBody());
		url.info = response.getBody();
		var lowest = url.info.lowest_price.split(';');
		url.info.lowest_price = lowest[1];
		var median = url.info.median_price.split(';');
		url.info.median_price = median[1];
		return doneCallback(null, url);
	});
}

router.get('/price/:data', function(req, res, next) {
	var theData = JSON.parse(req.params.data);
	var results = [];
	var urls = [];
	console.log('got here');
	for(i = 0; i < theData.length; i++) {
		var currWep = theData[i].weapon;
		for(j = 0; j < theData[i].names.length; j++) {
			var currSkin = theData[i].names[j].name;
			var currURL = 'http://steamcommunity.com/market/priceoverview/'+
				'?currency=1&appid=730&market_hash_name='
				+encodeURI(currWep)+encodeURI(' | ')+encodeURI(currSkin)+encodeURI(' (Field-Tested)');
			urls.push({'url': currURL, 'wep': currWep, 'skin' : currSkin, 'info' : ''});
		}
	}
	async.map(urls, getPrice, function(err, results) {
		console.log(results[0].info.median_price + ' ' + results[0].skin);
		var index = 0;
		for(x = 0; x < theData.length; x++) {
			for(y = 0; y < theData[x].names.length; y++) {
				theData[x].names[y].price = results[index].info;
				index = index + 1;
			}
		}
		res.json(theData);
	})
});

module.exports = router;