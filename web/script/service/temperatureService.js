/**
 * Created by sochdj on 09/12/15.
 */
appRoot.factory('Temperature', function($resource) {
    return $resource('/hello/:id');
});