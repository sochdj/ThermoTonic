appRoot.controller('manualController', ['$scope', 'apiService',
    function ($scope, apiService) {

        $scope.manTemp = 20.0;
        $scope.manButton = "OK";

        $scope.increase = function () {
            if ($scope.manTemp < 25) {
                $scope.manTemp += 0.1;
            }
        }

        $scope.decrease = function () {
            if ($scope.manTemp > 10) {
                $scope.manTemp -= 0.1;
            }
        }

        $scope.startStop = function () {
            if ($scope.manButton == "OK") {
                $scope.manButton = "Stop";
            }
            else {
                $scope.manButton = "OK";
            }
        }
    }]);