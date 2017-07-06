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
            now = new Date();
            nowStr = formatDate(now);
            $scope.manualData.dateTime = nowStr;
            $scope.manualData.tempMan = $scope.manTemp;
            $scope.manualData.hysteresis = 0.5;
        }

        var formatDate = function (jsDate) {
            return (jsDate.getDate() < 10 ? ("0" + jsDate.getDate()) : jsDate.getDate()) + "-" +
                ((jsDate.getMonth() + 1) < 10 ? ("0" + (jsDate.getMonth() + 1)) : (jsDate.getMonth() + 1)) + "-" +
                jsDate.getFullYear() + " " + (jsDate.getHours() < 10 ? ("0" + jsDate.getHours()) : jsDate.getHours()) +
                ":" + (jsDate.getMinutes() < 10 ? ("0" + jsDate.getMinutes()) : jsDate.getMinutes()) +
                ":" + (jsDate.getSeconds() < 10 ? ("0" + jsDate.getSeconds()) : jsDate.getSeconds());
        }
    }]);