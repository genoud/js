<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 09/06/2016
 * Time: 11:32
 */

namespace JSAppBundle\Entity;


use JSAppBundle\Entity\Utilisateur;

class AppConfig
{

    private $baseUrl="";

    /**
     * @var Utilisateur
     */
    private $user=null;

    private $tpls;

    /**
     * @return string
     */
    public function getBaseUrl()
    {
        return $this->baseUrl;
    }

    /**
     * @param string $baseUrl
     */
    public function setBaseUrl($baseUrl)
    {
        $this->baseUrl = $baseUrl;
    }


    /**
     * @return Utilisateur
     */
    public function getUser(){
        return $this->user;
    }

    /**
     * @param Utilisateur $user
     */
    public function setUser(Utilisateur $user=null){
        $this->user=$user;
    }

    public function setTpls($tpls){
        $this->tpls=$tpls;

    }

    public function getTpls(){
        return $this->tpls;
    }


}