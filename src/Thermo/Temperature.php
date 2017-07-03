<?php

namespace Thermo;

use Database;
use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

DBPDO;

/**
 * The obligitory Hello World example
 *
 * The @uri annotation routes requests that match that URL to this resource. Multiple
 * annotations allow this resource to match multiple URLs.
 *
 * @uri /temperature
 */
class Temperature extends Resource
{
    /**
     * Use this method to handle GET HTTP requests.
     *
     * The optional :name parameter in the URL available as the first parameter to the method
     * or as a property of the resource as $this->name.
     *
     * Method can return a string response, an HTTP status code, an array of status code and
     * response body, or a full Tonic\Response object.
     *
     * @method GET
     * @provides application/json
     * @json
     * @return Tonic\Reponse
     */
    public function getTemperatures()
    {
        $db = new Database(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
        $db->connect();
        if (isset($_GET['start']) && $_GET['stop']) {
            $sql = "SELECT * FROM Temperature where DateTime BETWEEN '" . $_GET['start'] . "' and '" . $_GET['stop'] . "'";
            $rows = $db->fetch_all_array($sql);
            $ret = array("temperatures" => $rows);
        } else if (isset($_GET['dayOfWeek'])) {
            $sql = "SELECT * FROM TimeRanges where dayOfWeek=" . $_GET['dayOfWeek'];
            $rows = $db->fetch_all_array($sql);
            $ret = array('ranges' => $rows);
        } else {
            $sql = "SELECT * FROM CurrentTemp where id=1";
            $rows = $db->fetch_all_array($sql);
            $ret = array('latestTemperature' => $rows[0]);
        }
        $db->close();
        return new Response(200, json_encode($ret), er);
    }


    /**
     * All HTTP methods are supported. The @accepts annotation makes method only match if the
     * request body content-type matches.
     *
     * curl -i -H "Content-Type: application/json" -X POST -d '{"hello": "computer"}' http://localhost/www/tonic/web/hello.json
     *
     * @method POST
     * @accepts application/json
     * @provides application/json
     * @json
     * @return Response
     */
    public function saveRanges()
    {
        $data = json_decode($this->request->getData(), true);

        $dayOfWeek = $data["dayOfWeek"];

        $db = new Database(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
        $db->connect();


        $sql = "DELETE FROM TimeRanges  where dayOfWeek=" . $dayOfWeek;

        $db->query($sql);
        foreach ($data["ranges"] as $range) {
            unset($range["initHour"]);
            unset($range["initMinute"]);
            unset($range["endHour"]);
            unset($range["endMinute"]);

            $db->query_insert("TimeRanges", $range);
        }

        $db->close();

        return new Response(200);
    }
}
