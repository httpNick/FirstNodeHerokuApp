angular.module('httpCSGOStash').controller('WepCtrl', ['$scope', 'wep',
  function($scope, wep) {
      $scope.wep = JSON.parse(wep);
  }
]);
