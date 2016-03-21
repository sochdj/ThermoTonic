appRoot.controller('homeController', ['$scope', '$interval', 'apiService',
    function ($scope, $interval, apiService) {
        $scope.latestTemperature = {
            dateTime: "",
            tempInt: 0,
            tempExt1: 0,
            tempExt2: 0,
            tempExt3: 0,
            timeSlot: 0,
            riscON: 0
        };

        $scope.intvalue = 0;

        $interval(function () {
            apiService.getLatestTemperatures().then(function (data) {
                $scope.latestTemperature = data.latestTemperature;
            }, function (reason) {

            })
        }, 2000);


        $scope.upperLimit = 50;
        $scope.lowerLimit = 0;
        $scope.unit = "C";
        $scope.precision = 1;
        $scope.ranges = [
            {
                min: 0,
                max: 10,
                color: '#DEDEDE'
            },
            {
                min: 10,
                max: 20,
                color: '#8DCA2F'
            },
            {
                min: 20,
                max: 30,
                color: '#FDC702'
            },
            {
                min: 30,
                max: 40,
                color: '#FF7700'
            },
            {
                min: 40,
                max: 50,
                color: '#C50200'
            }
        ];

        $scope.labels = [];
        $scope.series = ['Internal', 'External'];
        $scope.data = [
            [],
            []
        ];
        $scope.selezione = "Oggi";


        $scope.$watch('selezione', function (newValue) {
            switch (newValue) {
                case "Oggi":
                    $scope.labels.length = 0;
                    $scope.data[0].length = 0;
                    $scope.data[1].length = 0;
                    var today = new Date();

                    var start = toMysqlFormat(today.getFullYear(), today.getMonth() + 1, today.getDate(), 00, 00, 00);
                    var stop = toMysqlFormat(today.getFullYear(), today.getMonth() + 1, today.getDate(), 23, 59, 59);
                    apiService.getRangeTemperatures(start, stop).then(function (data) {

                        angular.forEach(data.temperatures, function (temp) {
                            $scope.labels.push("");
                            //$scope.labels.push(temp.dateTime);
                            $scope.data[0].push(temp.tempInt);
                            $scope.data[1].push(temp.tempExt1);
                        })

                    }, function (reasons) {

                    });

                    break;
                case "Ieri":
                    $scope.labels.length = 0;
                    $scope.data[0].length = 0;
                    $scope.data[1].length = 0;
                    var yesterday = new Date();

                    yesterday.setDate(yesterday.getDate() - 1);

                    var start = toMysqlFormat(yesterday.getFullYear(), yesterday.getMonth() + 1, yesterday.getDate(), 00, 00, 00);
                    var stop = toMysqlFormat(yesterday.getFullYear(), yesterday.getMonth() + 1, yesterday.getDate(), 23, 59, 59);
                    apiService.getRangeTemperatures(start, stop).then(function (data) {

                        angular.forEach(data.temperatures, function (temp) {
                            $scope.labels.push("");
                            //$scope.labels.push(temp.dateTime);
                            $scope.data[0].push(temp.tempInt);
                            $scope.data[1].push(temp.tempExt1);
                        })

                    }, function (reasons) {

                    });
                    break;
                case "UltimaSettimana":
                    $scope.labels.length = 0;
                    $scope.data[0].length = 0;
                    $scope.data[1].length = 0;
                    var today = new Date();
                    var yesterday = new Date();

                    yesterday.setDate(yesterday.getDate() - 7);

                    var start = toMysqlFormat(yesterday.getFullYear(), yesterday.getMonth() + 1, yesterday.getDate(), 00, 00, 00);
                    var stop = toMysqlFormat(today.getFullYear(), today.getMonth() + 1, today.getDate(), 23, 59, 59);
                    apiService.getRangeTemperatures(start, stop).then(function (data) {

                        angular.forEach(data.temperatures, function (temp) {
                            $scope.labels.push("");
                            //$scope.labels.push(temp.dateTime);
                            $scope.data[0].push(temp.tempInt);
                            $scope.data[1].push(temp.tempExt1);
                        })

                    }, function (reasons) {

                    });
                    break;
                case "UltimoMese":
                    $scope.labels.length = 0;
                    $scope.data[0].length = 0;
                    $scope.data[1].length = 0;


                    var today = new Date();
                    var lastMonth = new Date();

                    lastMonth.setMonth(lastMonth.getMonth() - 1);

                    var start = toMysqlFormat(lastMonth.getFullYear(), lastMonth.getMonth() + 1, lastMonth.getDate(), 00, 00, 00);
                    var stop = toMysqlFormat(today.getFullYear(), today.getMonth() + 1, today.getDate(), 23, 59, 59);
                    apiService.getRangeTemperatures(start, stop).then(function (data) {

                        angular.forEach(data.temperatures, function (temp) {
                            $scope.labels.push("");
                            //$scope.labels.push(temp.dateTime);
                            $scope.data[0].push(temp.tempInt);
                            $scope.data[1].push(temp.tempExt1);
                        })

                    }, function (reasons) {

                    });
                    break;

            }
        })


    }]);