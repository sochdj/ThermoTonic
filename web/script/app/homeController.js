appRoot.controller('homeController', function ($scope, $interval, Temperature) {

    $scope.intvalue = 0;
    $interval(function () {
        var t = Temperature.get( { id: $scope.intvalue },function () {
            $scope.intvalue = t.temp;
        });
    }, 2000);

    $scope.extvalue = 20;
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

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.selezione = "Oggi";


    $scope.$watch('selezione', function (newValue) {
        switch (newValue) {
            case "Oggi":
                $scope.data = [
                    [65, 59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ];
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
});