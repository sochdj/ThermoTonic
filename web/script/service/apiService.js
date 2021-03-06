/**
 * Created by sochdj on 08/03/16.
 */
appRoot.factory('apiService', ['$http', '$q',
    function apiService($http, $q) {

        var getLatestTemperatures = function () {
            var p = $q.defer();
            $http.get('/temperature').then(
                function (response) {

                    p.resolve(response.data);
                },
                function (reason) {
                    p.reject(reason);
                }
            );
            return p.promise;
        }

        var getRangeTemperatures = function (start, stop) {
            var p = $q.defer();
            $http.get('/temperature?start=' + start + '&stop=' + stop).then(
                function (response) {
                    p.resolve(response.data);
                },
                function (reason) {
                    p.reject(reason);
                }
            );
            return p.promise;
        }

        var getTimeRanges = function (dayOfWeek) {
            var p = $q.defer();
            $http.get('/temperature?dayOfWeek=' + dayOfWeek).then(
                function (response) {
                    p.resolve(response.data);
                },
                function (reason) {
                    p.reject(reason);
                }
            );
            return p.promise;
        }

        var saveRanges = function (ranges) {
            var p = $q.defer();
            $http.post('/temperature', ranges).then(
                function (response) {
                    p.resolve(response.data);
                },
                function (reason) {
                    p.reject(reason);
                }
            );
            return p.promise;
        }

        var getManualData = function () {
            var p = $q.defer();
            $http.get('/manual').then(
                function (response) {

                    p.resolve(response.data);
                },
                function (reason) {
                    p.reject(reason);
                }
            );
            return p.promise;
        }

        var setManualData = function (manualData) {
            var p = $q.defer();
            $http.post('/manual', manualData).then(
                function (response) {

                    p.resolve(response.data);
                },
                function (reason) {
                    p.reject(reason);
                }
            );
            return p.promise;
        }

        return {
            getLatestTemperatures: getLatestTemperatures,
            getRangeTemperatures: getRangeTemperatures,
            getTimeRanges: getTimeRanges,
            saveRanges: saveRanges,
            getManualData: getManualData,
            setManualData: setManualData
        }
    }]);