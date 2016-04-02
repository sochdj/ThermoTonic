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

        $scope.giorno = "1";

        $scope.ranges = [];

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

            }, function (reason) {
            });
        });

        $scope.saveRanges = function () {
            apiService.saveRanges($scope.ranges).then(function (data) {

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
        }

        $scope.updateInit = function (init) {
            init.timeStart = twoDigits(init.initHour) + ":" + twoDigits(init.initMinute) + ":00";
        }
        $scope.updateEnd = function (end) {
            end.timeEnd = twoDigits(end.endHour) + ":" + twoDigits(end.endMinute) + ":00";
        }

    }]);