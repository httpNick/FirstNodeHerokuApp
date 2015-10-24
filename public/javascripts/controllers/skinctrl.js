angular.module('httpCSGOStash').controller('SkinCtrl', ['$scope', 'skin', 'wep',
    function($scope, skin, wep) {
        $scope.skin = skin;
        $scope.wep = wep;
    }
  ]
);
