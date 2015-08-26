var express = require('express');
var router = express.Router();
var csgo = require('csgo-market');
var Q = require('q');

var wears = ['Field-Tested', 'Minimal Wear', 'Well-Worn', 'Battle-Scarred', 'Factory New'];

router.get('/singleprice/:data', function(req, res, next) {
	var promises = [];
	var items = JSON.parse(req.params.data);
	items.skins.forEach(function(skin) {
		items.skinData[skin] = {};
		wears.forEach(function(wear) {
			promises.push(csgo.getSinglePriceAsync(items.weapon, skin, wear, false)
			.then(function(data) {
				if (data.lowest_price) {
					data.lowest_price = data.lowest_price.split(';')[0];
				} else {
					items.skinData[skin][wear].lowest_price = "No Data Exists";
				}
				if (data.median_price) {
					data.median_price = data.median_price.split(';')[0];
				} else {
					items.skinData[skin][wear].median_price = "No Data Exists";
				}
				items.skinData[skin][wear] = data;
			}));
		});
	});
	return Q.allSettled(promises).then(function() {
		res.json(items);
	})
});

/*var getPrice = function(url, doneCallback) {
	//console.log(url.url + " Wep: " + url.wep + " Skin: " + url.skin);
	requestify.get(url.url).then(
		function(response){
			url.info = response.getBody();
			var lowest = url.info.lowest_price.split(';');
			url.info.lowest_price = lowest[1];
			var median = url.info.median_price.split(';');
			url.info.median_price = median[1];
			//console.log("wep: " + url.wep + " skin: " + url.skin + " wear: " + url.wear + " count: " + count++);
			return doneCallback(null, url);
	}, function(err) {
			url.info = {'median_price': "", 'lowest_price': ""};
			url.info.median_price = "No Price Data";
			url.info.lowest_price = "No Price Data";
			//console.log("wep: " + url.wep + " skin: " + url.skin + " wear: " + url.wear + " count: " + count++);
			return doneCallback(null, url);
		});
}

var urlify = function(wep, skin, wear) {
	return 'http://steamcommunity.com/market/priceoverview/'+
				'?currency=1&appid=730&market_hash_name='
				+encodeURI(wep)+encodeURI(' | ')+encodeURI(skin)+encodeURI(' ('+wear+')');
}

router.get('/singleprice/:data', function(req, res, next) {
	var urls = [];
	var theData = JSON.parse(req.params.data);
	var wepName = theData.weapon;
	for (i = 0; i < theData.names.length; i++) {
		var currSkin = theData.names[i].name;
		//add logic to GET request here for single weapon.
		for(k = 0; k < wears.length; k++) {
			urls.push({'url': urlify(wepName, currSkin, wears[k]), 'wep': wepName,
				'skin': currSkin, 'info': '', 'wear': wears[k]});
		}
	}
	// force the async GET requests sync up.
	async.map(urls, getPrice, function(err, results) {
		console.log("results length " + results.length);
		var index = 0;
		for(i = 0; i < theData.names.length; i++) {
			theData.names[i].wears['FieldTested'] = results[index].info;
			index += 1;
			theData.names[i].wears['MinimalWear'] = results[index].info;
			index += 1;
			theData.names[i].wears['WellWorn'] = results[index].info;
			index += 1;
			theData.names[i].wears['BattleScarred'] = results[index].info;
			index += 1;
		}
		res.json(theData);
	}, function(err, results) {
		console.log("error in async map.");
	});
}); */

module.exports = router;
