<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 22:07
 */

namespace JSAppBundle\Controller;


use FOS\RestBundle\Controller\FOSRestController;
use JSAppBundle\Manager\CoreService;

class CoreRestController extends FOSRestController
{

    /**
     * @return CoreService
     */
    public function getJsService(){
        return $core = $this->container->get("js_app.core");
    }
}