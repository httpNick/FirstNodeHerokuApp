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
			items.skinData[skin][wear] = {
				median_price : "No Data Exists",
				lowest_price : "No Data Exists"
			}
			promises.push(csgo.getSinglePriceAsync(items.weapon, skin, wear, false)
			.then(function(data) {
				if (data.lowest_price) data.lowest_price = data.lowest_price.split(';')[0];
				if (data.median_price) data.median_price = data.median_price.split(';')[0];
				items.skinData[skin][wear] = data;
			}));
		});
	});
	return Q.allSettled(promises).then(function() {
		res.json(items);
	})
});

module.exports = router;
