appRoot.controller('homeController', ['$scope', '$interval', 'apiService',
    function ($scope, $interval, apiService) {
        $scope.latestTemperature = {
            dateTime: ".",
            tempInt: 10,
            tempExt1: 0,
            tempExt2: 10,
            tempExt3: 0,
            timeSlot: 0,
            riscON: 0
        };

        $scope.intvalue = 0;
        $scope.visTemp = 0;

        $(document).ready(function () {
            var date = new Date();
            var td = date.toString();
            var today = td.split(" ");
            td = today[2] + " " + today[1] + " " + today[3];
            $("#dataInizio").datepicker().datepicker().val(td);
            $("#dataFine").datepicker().datepicker().val(td);

            var maxTemp = 0;
            var minTemp = 100;

            var stDate = new Date($('#dataInizio').val())
            var enDate = new Date($('#dataFine').val())
            var start = toMysqlFormat(stDate.getFullYear(), stDate.getMonth() + 1, stDate.getDate(), 00, 00, 00);
            var stop = toMysqlFormat(enDate.getFullYear(), enDate.getMonth() + 1, enDate.getDate(), 23, 59, 59);
            apiService.getRangeTemperatures(start, stop).then(function (data) {
                $scope.graph.data.length = 0;
                angular.forEach(data.temperatures, function (temp) {
                    var t = temp.dateTime.split(/[- :]/);
                    var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
                    if (maxTemp < parseFloat(temp.tempInt))  maxTemp = parseFloat(temp.tempInt);
                    if (maxTemp < parseFloat(temp.tempExt1)) maxTemp = parseFloat(temp.tempExt1);
                    if (minTemp > parseFloat(temp.tempInt))  minTemp = parseFloat(temp.tempInt);
                    if (minTemp > parseFloat(temp.tempExt1)) minTemp = parseFloat(temp.tempExt1);
                    $scope.graph.data.push([d, temp.tempInt, temp.tempExt1]);
                })
                $scope.graph.options.valueRange = [(minTemp - 5), (maxTemp + 5)];

            }, function (reasons) {

            });
        });


        $interval(function () {
            apiService.getLatestTemperatures().then(function (data) {
                var t = data.latestTemperature.dateTime.split(/[- :]/);
                var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
                $scope.latestTemperature = data.latestTemperature;
                $scope.latestTemperature.tempInt = parseFloat($scope.latestTemperature.tempInt).toFixed(1);
                $scope.latestTemperature.tempExt1 = parseFloat($scope.latestTemperature.tempExt1).toFixed(1);
                $scope.latestTemperature.tempExt2 = parseFloat($scope.latestTemperature.tempExt2).toFixed(1);
                $scope.latestTemperature.dateTime = t[2] + '-' + t[1] + '-' + t[0] + ' ' + t[3] + ':' + t[4] + ':' + t[5];

            }, function (reason) {

            })
        }, 2000);

        $scope.lowerLimitIn = 10.0;
        $scope.upperLimitIn = 40.0;
        $scope.lowerLimitOut = -20.0;
        $scope.upperLimitOut = 45.0;
        $scope.lowerLimitTermo = 10;
        $scope.upperLimitTermo = 90;

        $scope.unit = "\u00B0" + "C";
        $scope.precision = 2;
        $scope.rangesIn = [
            {
                min: 10,
                max: 15,
                color: '#00BFFF'
            },
            {
                min: 15,
                max: 20,
                color: '#7FFFD4'
            },
            {
                min: 20,
                max: 25,
                color: '#00FF00'
            },
            {
                min: 25,
                max: 30,
                color: '#F7FE2E'
            },
            {
                min: 30,
                max: 35,
                color: '#F4A460'
            },
            {
                min: 35,
                max: 40,
                color: '#FE642E'
            },
        ];

        $scope.rangesOut = [
            {
                min: -20,
                max: -10,
                color: '#0000FF'
            },
            {
                min: -10,
                max: -5,
                color: '#0040FF'
            },
            {
                min: -5,
                max: 0,
                color: '#0080FF'
            },
            {
                min: 0,
                max: 5,
                color: '#00BFFF'
            },
            {
                min: 5,
                max: 10,
                color: '#2ECCFA'
            },
            {
                min: 10,
                max: 15,
                color: '#00FFFF'
            },
            {
                min: 15,
                max: 20,
                color: '#00FFBF'
            },
            {
                min: 20,
                max: 25,
                color: '#00FF00'
            },
            {
                min: 25,
                max: 30,
                color: '#C8FE2E'
            },
            {
                min: 30,
                max: 35,
                color: '#F7FE2E'
            },
            {
                min: 35,
                max: 45,
                color: '#FF0000'
            },
        ];

        $scope.rangesTermo = [
            {
                min: 10,
                max: 25,
                color: '#00BFFF'
            },
            {
                min: 25,
                max: 40,
                color: '#2EFE2E'
            },
            {
                min: 40,
                max: 50,
                color: '#FFFF00'
            },
            {
                min: 50,
                max: 60,
                color: '#FFBF00'
            },
            {
                min: 60,
                max: 75,
                color: '#FF8000'
            },
            {
                min: 75,
                max: 90,
                color: '#FF0000'
            },
        ];

        $scope.labels = [];
        $scope.series = ['Internal', 'External'];
        $scope.data = [
            [],
            []
        ];


        $scope.graph = {
            data: [],
            options: {
                title: 'Temperature rilevate',
                labels: ["Data", "Interna", "Esterna"],
                ylabel: 'Temperature (C)',
                legend: 'always',
                labelsDivStyles: {
                 'text-align': 'right',
                 'background': 'none'
                },
                strokeWidth: 2.0,
                digitsAfterDecimal: 1,
            },
            /*            legend: {
             series: {
             A: {
             label: "Interna"
             },
             B: {
             label: "Esterna"
             }
             }
             }
             */
        };

        $scope.selezione = "Oggi";

        $scope.$watch('selezione', function (newValue) {
            switch (newValue) {
                case "Oggi":
                    var today = new Date();
                    var maxTemp = 0;
                    var minTemp = 100;

                    var start = toMysqlFormat(today.getFullYear(), today.getMonth() + 1, today.getDate(), 00, 00, 00);
                    var stop = toMysqlFormat(today.getFullYear(), today.getMonth() + 1, today.getDate(), 23, 59, 59);
                    apiService.getRangeTemperatures(start, stop).then(function (data) {
                        $scope.graph.data.length = 0;

                        angular.forEach(data.temperatures, function (temp) {
                            var t = temp.dateTime.split(/[- :]/);
                            var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
                            if (maxTemp < parseFloat(temp.tempInt))  maxTemp = parseFloat(temp.tempInt);
                            if (maxTemp < parseFloat(temp.tempExt1)) maxTemp = parseFloat(temp.tempExt1);
                            if (minTemp > parseFloat(temp.tempInt))  minTemp = parseFloat(temp.tempInt);
                            if (minTemp > parseFloat(temp.tempExt1)) minTemp = parseFloat(temp.tempExt1);
                            $scope.graph.data.push([d, temp.tempInt, temp.tempExt1]);
                        })
                        $scope.graph.options.valueRange = [(minTemp - 5), (maxTemp + 5)];

                    }, function (reasons) {

                    });
                    break;

                case "Ieri":
                    var yesterday = new Date();
                    var maxTemp = 0;
                    var minTemp = 100;

                    yesterday.setDate(yesterday.getDate() - 1);

                    var start = toMysqlFormat(yesterday.getFullYear(), yesterday.getMonth() + 1, yesterday.getDate(), 00, 00, 00);
                    var stop = toMysqlFormat(yesterday.getFullYear(), yesterday.getMonth() + 1, yesterday.getDate(), 23, 59, 59);
                    apiService.getRangeTemperatures(start, stop).then(function (data) {
                        $scope.graph.data.length = 0;

                        angular.forEach(data.temperatures, function (temp) {
                            var t = temp.dateTime.split(/[- :]/);
                            var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
                            if (maxTemp < parseFloat(temp.tempInt))  maxTemp = parseFloat(temp.tempInt);
                            if (maxTemp < parseFloat(temp.tempExt1)) maxTemp = parseFloat(temp.tempExt1);
                            if (minTemp > parseFloat(temp.tempInt))  minTemp = parseFloat(temp.tempInt);
                            if (minTemp > parseFloat(temp.tempExt1)) minTemp = parseFloat(temp.tempExt1);
                            $scope.graph.data.push([d, temp.tempInt, temp.tempExt1]);
                        })
                        $scope.graph.options.valueRange = [(minTemp - 5), (maxTemp + 5)];

                    }, function (reasons) {

                    });
                    break;

                case "UltimaSettimana":
                    var today = new Date();
                    var yesterday = new Date();
                    var maxTemp = 0;
                    var minTemp = 100;

                    yesterday.setDate(yesterday.getDate() - 7);

                    var start = toMysqlFormat(yesterday.getFullYear(), yesterday.getMonth() + 1, yesterday.getDate(), 00, 00, 00);
                    var stop = toMysqlFormat(today.getFullYear(), today.getMonth() + 1, today.getDate(), 23, 59, 59);
                    apiService.getRangeTemperatures(start, stop).then(function (data) {
                        $scope.graph.data.length = 0;
                        angular.forEach(data.temperatures, function (temp) {

                            var t = temp.dateTime.split(/[- :]/);
                            var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
                            if (maxTemp < parseFloat(temp.tempInt))  maxTemp = parseFloat(temp.tempInt);
                            if (maxTemp < parseFloat(temp.tempExt1)) maxTemp = parseFloat(temp.tempExt1);
                            if (minTemp > parseFloat(temp.tempInt))  minTemp = parseFloat(temp.tempInt);
                            if (minTemp > parseFloat(temp.tempExt1)) minTemp = parseFloat(temp.tempExt1);
                            $scope.graph.data.push([d, temp.tempInt, temp.tempExt1]);
                        })
                        $scope.graph.options.valueRange = [(minTemp - 5), (maxTemp + 5)];

                    }, function (reasons) {

                    });
                    break;

                case "UltimoMese":
                    var today = new Date();
                    var lastMonth = new Date();
                    var maxTemp = 0;
                    var minTemp = 100;

                    lastMonth.setMonth(lastMonth.getMonth() - 1);

                    var start = toMysqlFormat(lastMonth.getFullYear(), lastMonth.getMonth() + 1, lastMonth.getDate(), 00, 00, 00);
                    var stop = toMysqlFormat(today.getFullYear(), today.getMonth() + 1, today.getDate(), 23, 59, 59);
                    apiService.getRangeTemperatures(start, stop).then(function (data) {
                        $scope.graph.data.length = 0;

                        angular.forEach(data.temperatures, function (temp) {
                            var t = temp.dateTime.split(/[- :]/);
                            var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
                            if (maxTemp < parseFloat(temp.tempInt))  maxTemp = parseFloat(temp.tempInt);
                            if (maxTemp < parseFloat(temp.tempExt1)) maxTemp = parseFloat(temp.tempExt1);
                            if (minTemp > parseFloat(temp.tempInt))  minTemp = parseFloat(temp.tempInt);
                            if (minTemp > parseFloat(temp.tempExt1)) minTemp = parseFloat(temp.tempExt1);
                            $scope.graph.data.push([d, temp.tempInt, temp.tempExt1]);
                        })
                        $scope.graph.options.valueRange = [(minTemp - 5), (maxTemp + 5)];

                    }, function (reasons) {

                    });
                    break;

            }
        })

        $scope.visGraph = function () {
            var maxTemp = 0;
            var minTemp = 100;

            var stDate = new Date($('#dataInizio').val())
            var enDate = new Date($('#dataFine').val())
            var tmpDate = new Date()

            if (stDate > enDate) {
                tmpDate = stDate;
                stDate = enDate;
                enDate = tmpDate;
            }

            var start = toMysqlFormat(stDate.getFullYear(), stDate.getMonth() + 1, stDate.getDate(), 00, 00, 00);
            var stop = toMysqlFormat(enDate.getFullYear(), enDate.getMonth() + 1, enDate.getDate(), 23, 59, 59);
            apiService.getRangeTemperatures(start, stop).then(function (data) {
                $scope.graph.data.length = 0;
                angular.forEach(data.temperatures, function (temp) {
                    var t = temp.dateTime.split(/[- :]/);
                    var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
                    if (maxTemp < parseFloat(temp.tempInt))  maxTemp = parseFloat(temp.tempInt);
                    if (maxTemp < parseFloat(temp.tempExt1)) maxTemp = parseFloat(temp.tempExt1);
                    if (minTemp > parseFloat(temp.tempInt))  minTemp = parseFloat(temp.tempInt);
                    if (minTemp > parseFloat(temp.tempExt1)) minTemp = parseFloat(temp.tempExt1);
                    $scope.graph.data.push([d, temp.tempInt, temp.tempExt1]);
                })
                $scope.graph.options.valueRange = [(minTemp - 5), (maxTemp + 5)];

            }, function (reasons) {

            });
        }
    }]);