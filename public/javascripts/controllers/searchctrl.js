angular.module('httpCSGOStash')
  .controller('SearchCtrl', ['$scope', 'itemData', '$http',
    function($scope, itemData, $http) {

      itemData
      .get()
      .then(function(data) {
        $scope.weapons = data.data;
      });

      $scope.results = [];

      $scope.search = function(inputText) {
        $scope.results = [];
        angular.forEach($scope.weapons, function(weapon) {
          if (weapon.name.toLowerCase().indexOf(inputText.toLowerCase()) > -1) {
            $scope.results.push(weapon);
          } else {
            angular.forEach(weapon.skins, function(skin) {
              if (skin.toLowerCase().indexOf(inputText.toLowerCase()) > -1) {
                if ($scope.results.indexOf(weapon) < 0) {
                  $scope.results.push(weapon);
                }
              }
            })
          }
        });
      }
    }
  ]);
