appRoot.controller('homeController', ['$scope', '$interval', 'apiService',
    function ($scope, $interval, apiService) {
        $scope.latestTemperature = {
            id: 1,
            dateTime: "",
            tempInt: 0,
            tempExt1: 0,
            tempExt2: 0,
            tempExt3: 0
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
        $scope.series = ['Interna', 'Ext1'];
        $scope.data = [
            [],
            []
        ];
        $scope.selezione = "Oggi";


        $scope.$watch('selezione', function (newValue) {
            switch (newValue) {
                case "Oggi":
//                    $scope.data = [
//                        [65, 59, 80, 81, 56, 55, 40],
//                        [28, 48, 40, 19, 86, 27, 90]
//                    ];
                    var start = toMysqlFormat(2016, 3, 12, 00, 00, 00);
                    var stop = toMysqlFormat(2016, 3, 12, 23, 59, 59);
                    apiService.getRangeTemperatures(start, stop).then(function (data) {
                        $scope.labels.length = 0;
                        $scope.data[0].length = 0;
                        $scope.data[1].length = 0;

                        angular.forEach(data.temperatures, function (temp) {
                            $scope.labels.push(temp.dateTime);
                            $scope.data[0].push(temp.tempInt);
                            $scope.data[1].push(temp.tempExt1);
                        });
                    }, function (reasons) {

                    })
                    break;
                case "Ieri":
                    $scope.data = [
                        [28, 48, 40, 19, 86, 27, 90],
                        [65, 59, 80, 81, 56, 55, 40]
                    ];
                    break;
                case "UltimaSettimana":
                    $scope.data = [
                        [28, 48, 80, 81, 56, 27, 90],
                        [65, 59, 84, 19, 86, 55, 40]
                    ];
                    break;
                case "UltimoMese":
                    $scope.data = [
                        [65, 59, 80, 81, 56, 27, 90],
                        [28, 48, 84, 19, 86, 55, 40]
                    ];
                    break;

            }
        })


    }]);