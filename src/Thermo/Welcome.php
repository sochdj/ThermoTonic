<?php

namespace Thermo;

use Tonic\Resource,
    Tonic\Response;

/**
 * Introduction resource to the examples.
 *
 * Creates a HTML resource at the root of your Tonic application that explains and links
 * to the other example resources within the Tyrell namespace.
 *
 * @uri /
 */
class Welcome extends Resource
{
    /**
     * Returns the welcome message.
     * @method GET
     */
    public function welcomeMessage()
    {
        $body = file_get_contents(__DIR__.'/../../web/index.html');

        return new Response(Response::OK, $body, array(
            'content-type' => 'text/html'
        ));
    }

}