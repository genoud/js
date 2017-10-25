<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 06/09/2016
 * Time: 21:47
 */

namespace JSAppBundle\Entity;


class ArticleAppreciation
{

    public static $POOR=array("id"=>1, "code"=>"POOR", "libelle"=>"Poor");
    public static $FAIR=array("id"=>2, "code"=>"FAIR", "libelle"=>"Fair");
    public static $PRETTY_GOOD=array("id"=>3, "code"=>"PRETTY_GOOD", "libelle"=>"Pretty good");
    public static $GOOD=array("id"=>4, "code"=>"GOOD", "libelle"=>"Good");
    public static $VERY_GOOD=array("id"=>5, "code"=>"VERY_GOOD", "libelle"=>"Very Good");

    public static function getAppreciationById($id){
        $reflection=new \ReflectionClass("JSAppBundle\Entity\ArticleAppreciation");
        $statics=$reflection->getStaticProperties();
        foreach($statics as $prop){
            if($prop["id"]==$id){
                return $prop;
            }
        }
        return null;
    }

    public static function getAppreciationList(){
        $reflection=new \ReflectionClass("JSAppBundle\Entity\ArticleAppreciation");
        $statics=$reflection->getStaticProperties();
        return $statics;
    }

}