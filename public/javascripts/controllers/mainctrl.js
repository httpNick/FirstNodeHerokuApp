angular.module('httpCSGOStash')
  .controller('MainCtrl', ['$scope', '$http', 'itemData',
    function($scope, $http, itemData) {
      itemData.data
        ?
          $scope.weapons = itemData.data
        :
          itemData
          .get()
          .then(function(data) {
            $scope.weapons = data.data;
          });

      $scope.selectMessage = function(wep) {
        if (!wep.cached)
          $http
          .get('/singleprice/' + JSON.stringify(wep))
          .success(function(data) {
            data.cached = true;
            $scope.weapons.find(function(wep, index, arr) {
              return wep.name === data.name
                && (
                    $scope.weapons[index] = data,
                    itemData.data = $scope.weapons
                   )
            });
          });
        }
    }
  ]);
