appRoot.controller('setupController', ['$scope', 'apiService',
    function ($scope, apiService) {
        $scope.ranges = {
            dayOfWeek: 0,
            fascia: 0,
            timeStart: "",
            timeEnd: "",
            setPoint: 0,
            hystersis: 0,
        };

        $scope.giorno = "1";

        $scope.$watch('giorno', function (newValue) {
            apiService.getTimeRanges(newValue).then(function (data) {
                $scope.ranges = data.ranges;
            }, function (reason) {
            });
        });
    }]);