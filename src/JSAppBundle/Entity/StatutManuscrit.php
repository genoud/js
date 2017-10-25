<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 06/09/2016
 * Time: 21:47
 */

namespace JSAppBundle\Entity;


class StatutManuscrit
{

    public static $SOUMISSION_RETOURNEE_AUTEUR=array("id"=>1, "code"=>"SOUMISSION_RETOURNE_A_L_AUTEUR", "libelle"=>"Submissions sent back to author");
    public static $SOUMISSION_INCOMPLETE=array("id"=>2, "code"=>"SOUMISSION_INCOMPLETE", "libelle"=>"Incomplete submissions");
    public static $SOUMISSION_EN_ATTENTE_DE_VALIDATION=array("id"=>3, "code"=>"SOUMISSION_EN_ATTENTE_DE_VALIDATION", "libelle"=>"Submissions waiting for validation");
    public static $SOUMISSION_EN_COURS_DE_TRAITEMENT=array("id"=>4, "code"=>"SOUMISSION_EN_COURS_DE_TRAITEMENT", "libelle"=>"Submission being processed");

    public static $SOUMISSION_EN_ATTENTE_DE_REVISION=array("id"=>5, "code"=>"SOUMISSION_EN_ATTENTE_DE_REVISION", "libelle"=>"Submission waiting for revision");
    public static $REVISION_RENVOYEE_A_L_AUTEUR=array("id"=>6, "code"=>"REVISION_RENVOYE_A_L_AUTEUR", "libelle"=>"Revisions sent back to author");
    public static $REVISION_INCOMPLETE=array("id"=>7, "code"=>"REVISION_INCOMPLETE", "libelle"=>"Incomplete revision");
    public static $REVISION_EN_ATTENTE_DE_VALIDATION=array("id"=>8, "code"=>"REVISION_EN_ATTENTE_DE_VALIDATION", "libelle"=>"Revisions waiting for validation");
    public static $REVISION_EN_COURS_DE_TRAITEMENT=array("id"=>9, "code"=>"REVISION_EN_COURS_DE_TRAITEMENT", "libelle"=>"Revisions being processed");
    public static $REVISION_REFUSEE=array("id"=>10, "code"=>"REVISION_REFUSEE", "libelle"=>"Rejected revisions");
    public static $SOUMISSION_AVEC_DECISION=array("id"=>11, "code"=>"SOUMISSION_AVEC_DECISION", "libelle"=>"Submissions with decision");
    public static $SOUMISSION_AVEC_PRODUCTION=array("id"=>12, "code"=>"SOUMISSION_AVEC_PRODUCTION", "libelle"=>"Submission with production");

    public static function getStatusById($id){
        $reflection=new \ReflectionClass("JSAppBundle\Entity\StatutManuscrit");
        $statics=$reflection->getStaticProperties();
        foreach($statics as $prop){
            if($prop["id"]==$id){
                return $prop;
            }
        }
        return null;
    }

}