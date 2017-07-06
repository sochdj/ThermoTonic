appRoot.controller('manualController', ['$scope', 'apiService',
    function ($scope, apiService) {
        $scope.manualData = {
            enabled: 0,
            dateTime: "04-07-2017 11:40:35",
            tempMan: 20.0,
            hysteresis: 0.5,
        };

        $scope.manEnabled = 0;
        $scope.manTemp = 20.0;
        $scope.hysteresis = 0.5;
        $scope.manButton = "OK";

        apiService.getManualData().then(function (data) {
            $scope.manualData = data.manualData;
            $scope.manEnabled = $scope.manualData.enabled;
            $scope.manTemp = $scope.manualData.tempMan;
            $scope.hysteresis = $scope.manualData.hysteresis;
            if ($scope.manualData.enabled == 0) {
                $scope.manButton = "OK";
            }
            else {
                $scope.manButton = "Stop";
            }
        }, function (reason) {
        });


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
            if ($scope.manualData.enabled == 0) {
                $scope.manButton = "Stop";
                $scope.manualData.enabled = 1;
            }
            else {
                $scope.manButton = "OK";
                $scope.manualData.enabled = 0;
            }
            $scope.manualData.dateTime = $scope.getNowDateTimeStr();
            $scope.manualData.tempMan = $scope.manTemp;
            $scope.manualData.hysteresis = 0.5;
        }

        $scope.getNowDateTimeStr = function () {
            var now = new Date();
            var hour = now.getHours() - (now.getHours() >= 12 ? 12 : 0);
            return [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("/"), [AddZero(hour), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");
        }

        //Pad given value to the left with "0"
        $scope.AddZero = function (num) {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        }
    }]);