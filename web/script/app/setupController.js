appRoot.controller('setupController', ['$scope', 'apiService',
    function ($scope, apiService) {
        /* $scope.ranges = {
         dayOfWeek: 0,
         fascia: 0,
         timeStart: "",
         timeEnd: "",
         setPoint: 0,
         hystersis: 0,
         };*/

        $scope.giorno = "0";
        $scope.ranges = [];
        $scope.rangesCp = [];
        $scope.selectedRange = {};
        $scope.r = {};
        $scope.manualTemp = 20.0;

        $scope.$watch('giorno', function (newValue) {
            apiService.getTimeRanges(newValue).then(function (data) {
                //$scope.ranges = data.ranges;
                $scope.ranges.length = 0;
                angular.forEach(data.ranges, function (range) {
                    var initSplit = range.timeStart.split(/[:]/);
                    var endSplit = range.timeEnd.split(/[:]/);
                    range.initHour = parseInt(initSplit[0]);
                    range.initMinute = parseInt(initSplit[1]);
                    range.endHour = parseInt(endSplit[0]);
                    range.endMinute = parseInt(endSplit[1]);
                    range.setPoint = parseFloat(range.setPoint);
                    range.hysteresis = parseFloat(range.hysteresis);
                    $scope.ranges.push(range);
                })

                if ($scope.ranges.length > 0) {
                    $scope.selectedRange = $scope.ranges[0];
                }

            }, function (reason) {
            });
        });

        $scope.saveRanges = function () {
            apiService.saveRanges({dayOfWeek: $scope.giorno, ranges: $scope.ranges}).then(function (data) {

            }, function (reasons) {

            })
        }

        $scope.addRange = function ($index) {
            var newElement = angular.copy($scope.ranges[$index]);

            newElement.id = "-1";

            $scope.ranges.splice($index + 1, 0, newElement);

            for (var i = 0; i < $scope.ranges.length; i++) {
                $scope.ranges[i].id = (i + 1).toString();
            }

        }

        $scope.removeRange = function ($index) {
            $scope.ranges.splice($index, 1);
            for (var i = 0; i < $scope.ranges.length; i++) {
                $scope.ranges[i].id = (i + 1).toString();
            }
            if ($scope.ranges.length > 0) {
                $scope.selectedRange = $scope.ranges[$index - 1];
            }
        }

        $scope.addNewRange = function ($index) {
            $scope.ranges.push({
                dayOfWeek: $scope.giorno,
                id: "1",
                timeStart: "00:00:00",
                timeEnd: "00:00:00",
                setPoint: 20,
                hysteresis: 0.5,
                initHour: 0,
                initMinute: 0,
                endHour: 0,
                endMinute: 0
            })
        }

        $scope.copyRange = function () {
            $scope.rangesCp = angular.copy($scope.ranges);


        }

        $scope.pasteRange = function () {
            $scope.ranges = angular.copy($scope.rangesCp);
            angular.forEach($scope.ranges, function (range) {
                range.dayOfWeek = $scope.giorno;
            })
        }

        $scope.updateInit = function (init) {
            init.timeStart = twoDigits(init.initHour) + ":" + twoDigits(init.initMinute) + ":00";
        }
        $scope.updateEnd = function (end) {
            end.timeEnd = twoDigits(end.endHour) + ":" + twoDigits(end.endMinute) + ":00";
        }

        $scope.showMyDialog = function (id) {
            var dialog = $(id).data('dialog');
            dialog.open();
        }
    }]);