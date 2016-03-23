appRoot.controller('setupController', function ($scope){

    $scope.giorno = "Lunedi";

    $scope.ranges = [{
        dayOfWeek: '1',
        fascia: '1',
        timeStart: "10:00:00",
        timeEnd: "11:00:00",
        setPoint: "22",
        hysteresis: "0.5"
    }, {
        dayOfWeek: '1',
        fascia: '2',
        timeStart: "11:00:00",
        timeEnd: "17:00:00",
        setPoint: "26",
        hysteresis: "0.5"
    }];

});