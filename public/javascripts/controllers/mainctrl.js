angular.module('httpCSGOStash')
  .controller('MainCtrl', ['$scope', '$http', 'prices',
    function($scope, $http, prices) {
      $scope.weapons = prices.prices;
      $scope.selectMessage = function(wep) {
        if (!wep.cached) {
          $http.get('/singleprice/' + JSON.stringify(wep)).success(function(data) {
            data.cached = true;
            var i = prices.prices.length;
            while (i--)
              if (prices.prices[i].weapon === data.weapon)
                prices.prices[i] = data;
          });
        }
      };
    }
  ]
);
