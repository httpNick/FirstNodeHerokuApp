/* Very cool trick from:
http://stackoverflow.com/questions/16199418/how-do-i-implement-the-bootstrap-navbar-active-class-with-angular-js */
angular.module('httpCSGOStash')
  .controller('NavCtrl', ['$scope', '$location',
    function($scope, $location) {
      $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
      };
    }
  ]
);
