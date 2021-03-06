<?php

namespace Thermo;

use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;

/**
 * The obligitory Hello World example
 *
 * The @uri annotation routes requests that match that URL to this resource. Multiple
 * annotations allow this resource to match multiple URLs.
 *
 * @uri /hello
 * @uri /hello/:id
 */
class Hello extends Resource
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
     * @params str $id
     * @provides application/json
     * @json
     * @return Tonic\Reponse
     */
    public function sayHello($id)
    {
        $conn = mysqli_connect('localhost', 'Thermo', 'Thermo', 'Thermo');
        //if(mysqli_connect_errno())
        //die(mysqli_connect_error());
        $ret = array('temp' => intval($id) + 1);
        if ($ret ['temp'] > 50)
            $ret ['temp'] = 0;
        return new Response(200, json_encode($ret));
    }


//$DB = new DBPDO();
//$temperature = $DB->fetch("SELECT * FROM Temperature");

//$ret =array('temp'=>$temperature);

//return new Response(200, json_encode($ret));
}
