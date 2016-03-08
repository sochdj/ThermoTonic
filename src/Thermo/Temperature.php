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
 * @uri /temperature/:id
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
    public function getLatestTemperature($id)
    {

        $db = new Database(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
        $db->connect();

        $sql = "SELECT * FROM Temperature where id=(SELECT max(id) from Temperature)";

        $rows = $db->fetch_all_array($sql);

        $db->close();
        $temp = array('date' => $rows[0]['DateTime'],
            'tempInt' => doubleval($rows[0]['TempInt']),
            'tempExt1' => doubleval($rows[0]['TempExt1']),
            'tempExt2' => doubleval($rows[0]['TempExt2']),
            'tempExt3' => doubleval($rows[0]['TempExt3']));
        $ret = array('latestTemperature' => $temp);


        return new Response(200, json_encode($ret));
    }


}
