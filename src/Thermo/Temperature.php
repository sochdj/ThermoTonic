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

        } else {

            $sql = "SELECT * FROM Temperature where id=(SELECT max(id) from Temperature)";

            $rows = $db->fetch_all_array($sql);


            $ret = array('latestTemperature' => $rows[0]);


        }
        $db->close();
        return new Response(200, json_encode($ret));

    }

    /**
     *
     * @method GET
     * @params str $startDate
     * @params str $endDate
     * @provides application/json
     * @json
     * @return Tonic\Reponse
     */

    public function getRangeTemperature($startDate, $endDate)
    {
        $db = new Database(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
        $db->connect();

        $sql = "SELECT * FROM Temperature where DateTime BETWEEN " . $startDate . " and " . $endDate;

        $rows = $db->fetch_all_array($sql);

        $db->close();

        $ret = array('temperature' => $rows);
        return new Response(200, json_encode($ret));
    }

}
