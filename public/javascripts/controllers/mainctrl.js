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
        if (!wep.cached) {
          $http
          .get('/singleprice/' + JSON.stringify(wep))
          .success(function(data) {
            data.cached = true;
            var i = $scope.weapons.length;
            while (i--) {
              if ($scope.weapons[i].name === data.name) {
                $scope.weapons[i] = data;
                itemData.data = $scope.weapons;
                return;
              }
            }
          });
        }
      };
    }
  ]
);
