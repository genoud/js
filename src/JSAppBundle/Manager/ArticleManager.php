<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 21:17
 */

namespace JSAppBundle\Manager;

use JSAppBundle\Dao\ArticleRepository;
use JSAppBundle\Entity\Article;
use JSAppBundle\Entity\Auteur;
use JSAppBundle\Entity\CoAuteur;
use JSAppBundle\Entity\StatutManuscrit;
use JSAppBundle\Entity\Utilisateur;
use Symfony\Component\DependencyInjection\ContainerInterface as Container;

class ArticleManager extends CoreManager
{

    public function __construct(Container $container, CoreService $core)
    {
        $entityClass = "JSAppBundle\Entity\Article";
        parent::__construct($container, $core, $entityClass);
    }

    /**
     * @param Article $article
     * @return Article
     */
    public function create($article)
    {
        return parent::create($article);
    }


    /**
     * @param Article $manuscrit
     * @param int $stepId
     * @return mixed
     * @throws \Exception
     */
    public function createStep($manuscrit, $stepId)
    {

        $state=$this->beginTransaction();
        try{
            $this->setStepStatus($manuscrit, $stepId);
            if ($manuscrit->isStep1() && $manuscrit->isStep2() && $manuscrit->isStep3() && $manuscrit->isStep4()
                && $manuscrit->isStep5() && $manuscrit->isStep6() && $manuscrit->isStep7() && $manuscrit->isStep8()
                && $manuscrit->isStep9() && $manuscrit->isStep10() && $manuscrit->isStep11()
            ) {

                $manuscrit->setStatut(StatutManuscrit::$SOUMISSION_EN_ATTENTE_DE_VALIDATION["code"]);

//            $manuscrit->setStatut(StatutManuscrit::$SOUMISSION_EN_ATTENTE_DE_VALIDATION["code"]);
            } else {

                $manuscrit->setStatut(StatutManuscrit::$SOUMISSION_INCOMPLETE["code"]);

//            $manuscrit->setStatut(StatutManuscrit::$SOUMISSION_INCOMPLETE["code"]);
            }
            $manuscrit->setUtilisateur($this->getConnectedUser());
            $manuscrit->setDateCreation(new \DateTime("now"));


            $auteur=new Auteur();
            $auteur->setPersonne($this->getConnectedUser()->getPersonne());
            $manuscrit->addAuteur($auteur, true);

            $manuscrit= $this->create($manuscrit);

            $this->commitTransaction($state);
            return $manuscrit;
        }
        catch(\Exception $ex){
            $this->rollbackTransaction($state);
            throw $ex;
        }
    }

    public function createRevision(Article $manuscript){

        $state=$this->beginTransaction();

        try{
            $revision = clone  $manuscript;

            $revision= $this->create($revision);

            $manuscript->setRevision($revision);
            $this->update($manuscript);

            $this->commitTransaction($state);
            return $revision;
        }
        catch(\Exception $ex){
            $this->rollbackTransaction($state);
            throw $ex;
        }

    }

    /**
     * @param Article $manuscrit
     * @param int $stepId
     * @return Article
     */
    public function updateStep($manuscrit, $stepId)
    {

        $this->setStepStatus($manuscrit, $stepId);
        if ($manuscrit->isStep1() && $manuscrit->isStep2() && $manuscrit->isStep3() && $manuscrit->isStep4()
            && $manuscrit->isStep5() && $manuscrit->isStep6() && $manuscrit->isStep7() && $manuscrit->isStep8()
            && $manuscrit->isStep9() && $manuscrit->isStep10() && $manuscrit->isStep11()
        ) {
            if ($this->isRevision($manuscrit)) {
                $manuscrit->setStatut(StatutManuscrit::$REVISION_EN_ATTENTE_DE_VALIDATION["code"]);
            } else {
                $manuscrit->setStatut(StatutManuscrit::$SOUMISSION_EN_ATTENTE_DE_VALIDATION["code"]);
            }

//            $manuscrit->setStatut(StatutManuscrit::$SOUMISSION_EN_ATTENTE_DE_VALIDATION["code"]);
        } else {
            if ($this->isRevision($manuscrit)) {
                $manuscrit->setStatut(StatutManuscrit::$REVISION_INCOMPLETE["code"]);
            } else {
                $manuscrit->setStatut(StatutManuscrit::$SOUMISSION_INCOMPLETE["code"]);
            }
//            $manuscrit->setStatut(StatutManuscrit::$SOUMISSION_INCOMPLETE["code"]);

        }
        return $this->update($manuscrit);
    }

    /**
     * @param Article $manuscrit
     * @return bool
     */
    public function isRevision($manuscrit)
    {
        $article = $this->findByRevision($manuscrit);
        if (isset($article)) {
            return true;
        }
        return false;
    }

    /**
     * @param Article $manuscrit
     * @return Article
     */
    public function findByRevision($manuscrit)
    {
        $repo = $this->getRepository();
        $revisions = $repo->findByRevision($manuscrit);
        if (isset($revisions) && count($revisions) > 0) {
            return $revisions[0];
        }
        return null;
    }

    /**
     * @param Article $manuscrit
     * @param $stepId
     */
    public function setStepStatus($manuscrit, $stepId)
    {
        switch ($stepId) {
            case 1:
                $manuscrit->setStep1(true);
                break;
            case 2:
                $manuscrit->setStep2(true);
                break;
            case 3:
                $manuscrit->setStep3(true);
                break;
            case 4:
                $manuscrit->setStep4(true);
                break;
            case 5:
                $manuscrit->setStep5(true);
                break;
            case 6:
                $manuscrit->setStep6(true);
                break;
            case 7:
                $manuscrit->setStep7(true);
                break;
            case 8:
                $manuscrit->setStep8(true);
                break;
            case 9:
                $manuscrit->setStep9(true);
                break;
            case 10:
                $manuscrit->setStep10(true);
                break;
            case 11:
                $manuscrit->setStep11(true);
                break;
        }
    }

    /**
     * @param string $statut
     * @param Utilisateur $user
     * @return int|mixed
     */
    public function countByStatutByUser($statut, $user, $query="")
    {
        $repo = $this->getRepository();
        return $repo->countByStatusByUser($statut, $user, $query);
    }

    /**
     * @param string $statut
     * @param Utilisateur $user
     * @param int $page
     * @param int $limit
     * @return Article[]
     */
    public function findByStatutByUser($statut, $user, $page = -1, $limit = -1, $query="")
    {
        $repo = $this->getRepository();
        return $repo->findByStatusByUser($statut, $user, $page, $limit, $query);
    }

    /**
     * @return ArticleRepository
     */
    public function getRepository()
    {
        return parent::getRepository();
    }

    public function getByUtilisateur($user)
    {
        $repo = $this->getRepository();
        $authors = $repo->findByUtilisateur($user);
        if (isset($authors) && count($authors) > 0) {
            return $authors[0];
        }
    }

    /**
     * @param string $articleIds
     * @param Utilisateur $editor
     * @return mixed
     */
    public function setEditors($articleIds, $editor)
    {
        $repo=$this->getRepository();
        return $repo->setEditors($articleIds, $editor);
    }

    /**
     * @param string []
     * @param $reviewers
     * @return bool
     */
    public function requestReviewers($articleIds, $reviewers)
    {
        $repo=$this->getRepository();
        return $repo->requestReviewers($articleIds, $reviewers);
    }


    public function findByQueryByFilter($page, $limit, $query, $filterObject)
    {
        $repo=$this->getRepository();
        return $repo->findByQueryByFilter($page, $limit, $query, $filterObject);

    }

    public function countByQueryByFilter($query, $filterObject)
    {
        $repo=$this->getRepository();
        return $repo->countByQueryByFilter( $query, $filterObject);
    }

    /**
     * @param Article $article
     * @throws \Exception
     */
    public function validateManuscript($article)
    {
        if($article->getStatut()==StatutManuscrit::$SOUMISSION_EN_ATTENTE_DE_VALIDATION["code"] ||
            $article->getStatut()==StatutManuscrit::$REVISION_EN_ATTENTE_DE_VALIDATION["code"]){
            if($article->getStatut()==StatutManuscrit::$SOUMISSION_EN_ATTENTE_DE_VALIDATION["code"]){
                $article->setStatut(StatutManuscrit::$SOUMISSION_EN_COURS_DE_TRAITEMENT["code"]);
            }
            else{
                $article->setStatut(StatutManuscrit::$REVISION_EN_COURS_DE_TRAITEMENT["code"]);
            }

            parent::update($article);


            $files=array();
            foreach($article->getFichiers() as $fichier){
                $files[]=$fichier->getUrl();
            }
            //Sent email the the author
            $this->sendEmail("Registration completed", $article->getUtilisateur()->getPersonne()->getEmail(),
                $this->renderView("JSAppBundle:Emails:manuscriptValidation.html.twig", array(
                    "article" => $article,
                    "user" => $this->getConnectedUser(),
                )),"contact@capvcm.com",$files
            );

            //Sent email the the main editor
            $this->sendEmail("Registration completed", "magloiredjatio@gmail.com",
                $this->renderView("JSAppBundle:Emails:mainEditorSubmissionNotification.html.twig", array(
                    "article" => $article,
                    "editor" => $this->getConnectedUser(),
                    "user" => $this->getConnectedUser(),
                )),"contact@capvcm.com",$files
            );

        }
        else{
            throw new \Exception("This submission can not be validated");
        }
    }

    /**
     * @param int $id
     * @return null|Article
     */
    public function load($id)
    {
        return parent::load($id); // TODO: Change the autogenerated stub
    }

    /**
     * Valide un article
     * @param $articleIds
     * @return bool
     * @throws \Exception
     */
    public function validateArticles($articleIds)
    {
        $state=$this->beginTransaction();

        try{
            foreach($articleIds as $id){
                $article=$this->load($id);
                if($article->getStatut()==StatutManuscrit::$SOUMISSION_AVEC_PRODUCTION["code"]){
                    throw new \Exception("Article already published");
                }
                if($article->getStatut()==StatutManuscrit::$SOUMISSION_EN_COURS_DE_TRAITEMENT["code"]
                    || $article->getStatut()==StatutManuscrit::$REVISION_EN_COURS_DE_TRAITEMENT["code"]){
                    $article->setStatut(StatutManuscrit::$SOUMISSION_AVEC_DECISION["code"]);
                    $article->setAccepted(true);

                    $this->update($article);
                }
                else{
                    throw new \Exception("Submission not validated by the author");
                }

            }

            $this->commitTransaction($state);
            return true;
        }
        catch(\Exception $ex){

            $this->rollbackTransaction($state);
            throw $ex;
        }



    }

    /**
     * Valide un article
     * @param $articleIds
     * @return bool
     * @throws \Exception
     */
    public function rejectArticles($articleIds)
    {
        $state=$this->beginTransaction();

        try{
            foreach($articleIds as $id){
                $article=$this->load($id);
                if($article->getStatut()==StatutManuscrit::$SOUMISSION_AVEC_PRODUCTION["code"]){
                    throw new \Exception("Article already published");
                }
                if($article->getStatut()==StatutManuscrit::$SOUMISSION_EN_COURS_DE_TRAITEMENT["code"]
                    || $article->getStatut()==StatutManuscrit::$REVISION_EN_COURS_DE_TRAITEMENT["code"]){
                    $article->setStatut(StatutManuscrit::$SOUMISSION_AVEC_DECISION["code"]);
                    $article->setAccepted(false);
                    $article->setRefused(true);
                    $this->update($article);
                }
                else{
                    throw new \Exception("Submission not validated by the author");
                }

            }

            $this->commitTransaction($state);
            return true;
        }
        catch(\Exception $ex){

            $this->rollbackTransaction($state);
            throw $ex;
        }



    }

    public function sentBackToUser($articleIds)
    {
        $state=$this->beginTransaction();

        try{
            foreach($articleIds as $id){
                $article=$this->load($id);
                if($article->getStatut()==StatutManuscrit::$SOUMISSION_AVEC_PRODUCTION["code"]){
                    throw new \Exception("Article already published");
                }
                if($article->getStatut()==StatutManuscrit::$SOUMISSION_EN_COURS_DE_TRAITEMENT["code"]
                    || $article->getStatut()==StatutManuscrit::$REVISION_EN_COURS_DE_TRAITEMENT["code"]){
                    if($this->isRevision($article)){
                        $article->setStatut(StatutManuscrit::$REVISION_RENVOYEE_A_L_AUTEUR["code"]);
                    }
                    else{
                        $article->setStatut(StatutManuscrit::$SOUMISSION_RETOURNEE_AUTEUR["code"]);
                    }
                    $this->update($article);
                }
                else{
                    throw new \Exception("Submission not validated by the author");
                }

            }

            $this->commitTransaction($state);
            return true;
        }
        catch(\Exception $ex){

            $this->rollbackTransaction($state);
            throw $ex;
        }
    }
}