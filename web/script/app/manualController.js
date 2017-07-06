appRoot.controller('manualController', ['$scope', 'apiService',
    function ($scope, apiService) {
        $scope.manualData = {
            enabled: 0,
            dateTime: "04-07-2017 11:40:35",
            tempMan: 20.0,
            hysteresis: 0.5,
        };

        $scope.manTemp = 20.0;
        $scope.manButton = "OK";

        $scope.increase = function () {
            if ($scope.manTemp < 25) {
                $scope.manTemp += 0.1;
            }
        }

        $scope.decrease = function () {
            if ($scope.manTemp > 15) {
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

        $scope.$on('$viewContentLoaded', function () {
            apiService.getManualData().then(function (data) {
                $scope.manualData = data.manualData;
                $scope.manTemp = $scope.manualData.tempMan;
                if ($scope.manualData.enabled == 0) {
                    $scope.manButton = "OK";
                }
                else {
                    $scope.manButton = "Stop";
                }
            }, function (reason) {
            });
        });
    }]);