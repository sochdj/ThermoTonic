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


        return {
            getLatestTemperatures: getLatestTemperatures,
            getRangeTemperatures: getRangeTemperatures
        }
    }]);