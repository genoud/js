<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 24/08/2016
 * Time: 23:26
 */

namespace JSAppBundle\Controller;

use JSAppBundle\Entity\Article;
use JSAppBundle\Entity\Role;
use JSAppBundle\Form\ArticleEditorType;
use JSAppBundle\Form\ArticleType;
use JSAppBundle\Form\ManuscritStep10Type;
use JSAppBundle\Form\ManuscritStep11Type;
use JSAppBundle\Form\ManuscritStep12Type;
use JSAppBundle\Form\ManuscritStep1Type;
use JSAppBundle\Form\ManuscritStep2Type;
use JSAppBundle\Form\ManuscritStep3Type;
use JSAppBundle\Form\ManuscritStep4Type;
use JSAppBundle\Form\ManuscritStep5Type;
use JSAppBundle\Form\ManuscritStep6Type;
use JSAppBundle\Form\ManuscritStep7Type;
use JSAppBundle\Form\ManuscritStep8Type;
use JSAppBundle\Form\ManuscritStep9Type;
use JSAppBundle\Form\ReviewRequestType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use JSAppBundle\Entity\AppConfig;
use JSAppBundle\Entity\StatutManuscrit;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

use JSAppBundle\Tools\Tools;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Context\Context;
use FOS\RestBundle\Controller\Annotations as REST;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class ArticleController extends CoreRestController
{

    /**
     * @Route("/edition/article/form", name="js-edition-article-form", options={"expose"=true})
     * Get Article ,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\Article",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the page is not found"
     *   }
     * )
     * @REST\View(
     * templateVar="form",
     * serializerEnableMaxDepthChecks=true
     * )
     * @param Request $request the request object
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getManuscritStepAction(Request $request)
    {
        $articleManager = $this->getJsService()->getArticleManager();

        $articleId = $request->query->getInt("id");
        $stepId = $request->query->getInt("stepId");

        if (isset($articleId) && $articleId > 0) {
            $article = $articleManager->load($articleId);
        } else {
            $article = new Article();
        }


        $stepId = $request->query->getInt("stepId");

        $form = $this->getForm($request, $stepId, $article);

        $form->handleRequest($request);


        return $form;
    }

    /**
     * Get Article ,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\Article",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the page is not found"
     *   }
     * )
     * @REST\View(
     * templateVar="form",
     * serializerEnableMaxDepthChecks=true
     * )
     * @param Request $request the request object
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getEditorAction(Request $request)
    {
        $articleManager = $this->getJsService()->getArticleManager();

        $articleId = $request->query->getInt("id");


        if (isset($articleId) && $articleId > 0) {
            $article = $articleManager->load($articleId);
        } else {
            $article = new Article();
        }

        $form = $form = $this->createForm(ArticleEditorType::class, $article, array('method' => $request->getMethod()));

        $form->handleRequest($request);


        return $form;
    }



    /**
     * @param Request $request
     * @param int $step
     * @param Article $article
     * @return Form
     */
    private function getForm($request, $step, $article)
    {

        $form = null;

        switch ($step) {
            case 1:
                $form = $this->createForm(ManuscritStep1Type::class, $article, array('method' => $request->getMethod()));
                break;
            case 2:

//                $articleManager = $this->getJsService()->getArticleManager();
//                $user = $articleManager->getConnectedUser();
//                $author = $articleManager->getByUtilisateur($user);
                $form = $this->createForm(ManuscritStep2Type::class, $article, array('method' => $request->getMethod()));
                break;
            case 3:
                $form = $this->createForm(ManuscritStep3Type::class, $article, array('method' => $request->getMethod()));
                break;
            case 4:
                $form = $this->createForm(ManuscritStep4Type::class, $article, array('method' => $request->getMethod()));
                break;
            case 5:
                $form = $this->createForm(ManuscritStep5Type::class, $article, array('method' => $request->getMethod()));
                break;
            case 6:
                $form = $this->createForm(ManuscritStep6Type::class, $article, array('method' => $request->getMethod()));
                break;
            case 7:
                $form = $this->createForm(ManuscritStep7Type::class, $article, array('method' => $request->getMethod()));
                break;
            case 8:
                $form = $this->createForm(ManuscritStep8Type::class, $article, array('method' => $request->getMethod()));
                break;
            case 9:
                $form = $this->createForm(ManuscritStep9Type::class, $article, array('method' => $request->getMethod()));
                break;
            case 10:
                $form = $this->createForm(ManuscritStep10Type::class, $article, array('method' => $request->getMethod()));
                break;
            case 11:
                $form = $this->createForm(ManuscritStep11Type::class, $article, array('method' => $request->getMethod()));
                break;
            case 12:
                $form = $this->createForm(ManuscritStep12Type::class, $article, array('method' => $request->getMethod()));
                break;
        }

        return $form;
    }

    private function isNoFormStep($stepId)
    {
        return $stepId == 3 || $stepId == 4 || $stepId == 7 || $stepId == 10 || $stepId == 11 || $stepId == 12;
    }

    /**
     * @REST\View(
     * templateVar="form",
     * serializerEnableMaxDepthChecks=true
     * )
     * @param Request $request
     * @param $stepId
     * @return Form
     * @throws \Exception
     */
    public function postManuscritAction(Request $request, $stepId)
    {

        try {
            $core = $this->getJsService();
            $manager = $core->getArticleManager();

            $articleId = $request->query->getInt("id");
//        $stepId=$request->query->getInt("stepId");

            if (isset($articleId) && $articleId > 0) {
//                echo "Loading article";
                $article = $manager->load($articleId);
            } else {
                $article = new Article();
            }

            if ($this->isNoFormStep($stepId)) {

                if ($stepId == 7) {
                    $motCles = $request->query->get("extraData");
                    $article->setMotscles($motCles);
                }
                $article = $manager->updateStep($article, $stepId);
                if ($request->get('_format') == "json") {
                    return array("success" => true, "data" => $article, "message" => "Etape enregistrée avec succès");
                }
            }

//            var_dump($article);

            $form = $this->getForm($request, $stepId, $article);

            $form->handleRequest($request);

//            $form->submit($request->get("article"), 'PATCH' !== $request->getMethod());
//            $form->submit();

            if ($form->isValid()) {


//                $article = $form->getData();

//                var_dump($articleId);
//                var_dump($article);

                if (isset($articleId) && $articleId > 0) {
                    $article = $manager->updateStep($article, $stepId);
                } else {
                    $article = $manager->createStep($article, $stepId);
                }

                if ($request->get('_format') == "json") {
                    return array("success" => true, "data" => $article, "message" => "Etape enregistrée avec succès");
                }

            } else {
                if ($request->get('_format') == "json") {
                    return array("success" => false, "data" => $article, "message" => "Formulaire invalide");
                }
            }
//        return $this->render('JSAppBundle:Article:getArticle.html.twig', array('form'=>$form->createView()));
            return $form;
        } catch (\Exception $ex) {
            if ($request->get('_format') == "json") {
                return array("success" => false, "data" => null, "message" => $ex->getMessage());
            }
            throw $ex;
        }
    }

    /**
     * @REST\View(
     * templateVar="form",
     * serializerEnableMaxDepthChecks=true
     * )
     * @param Request $request
     * @return Form
     * @throws \Exception
     */
    public function postEditorAction(Request $request)
    {

        try {
            $core = $this->getJsService();
            $manager = $core->getArticleManager();

            $articleIds = $request->query->get("articleIds");

            if (isset($articleId) && $articleId > 0) {
                $article = $manager->load($articleId);
            } else {
                $article = new Article();
            }


            $form = $this->createForm(ArticleEditorType::class, $article, array('method' => $request->getMethod()));

            $form->handleRequest($request);


            if ($form->isValid()) {

//                $article=$form->getData();

                $editor = $article->getEditeur();


                $manager->setEditors($articleIds, $editor);


                if ($request->get('_format') == "json") {
                    return array("success" => true, "data" => null, "message" => "editor set successfully");
                }

            } else {
                if ($request->get('_format') == "json") {
                    return array("success" => false, "data" => $article, "message" => "The form is not valid");
                }
            }
//        return $this->render('JSAppBundle:Article:getArticle.html.twig', array('form'=>$form->createView()));
            return $form;
        } catch (\Exception $ex) {
            if ($request->get('_format') == "json") {
                return array("success" => false, "data" => null, "message" => $ex->getMessage());
            }
            throw $ex;
        }
    }


    public function postValidateAction(Request $request)
    {
        try {
            $core = $this->getJsService();
            $manager = $core->getArticleManager();

            $articleIds = $request->query->get("articleIds");

            $result = $manager->validateArticles(explode(',', $articleIds));

            if ($request->get('_format') == "json") {
                return array("success" => $result, "data" => null, "message" => "Article validated successfully");
            }
        } catch (\Exception $ex) {
            if ($request->get('_format') == "json") {
                return array("success" => false, "data" => null, "message" => $ex->getMessage());
            }
            throw $ex;
        }
    }

    public function postRejectAction(Request $request)
    {
        try {
            $core = $this->getJsService();
            $manager = $core->getArticleManager();

            $articleIds = $request->query->get("articleIds");

            $result = $manager->rejectArticles(explode(',', $articleIds));

            if ($request->get('_format') == "json") {
                return array("success" => $result, "data" => null, "message" => "Article validated successfully");
            }
        } catch (\Exception $ex) {
            if ($request->get('_format') == "json") {
                return array("success" => false, "data" => null, "message" => $ex->getMessage());
            }
            throw $ex;
        }
    }

    public function postSentbacktouserAction(Request $request)
    {
        try {
            $core = $this->getJsService();
            $manager = $core->getArticleManager();

            $articleIds = $request->query->get("articleIds");

            $result = $manager->sentBackToUser(explode(',', $articleIds));

            if ($request->get('_format') == "json") {
                return array("success" => $result, "data" => null, "message" => "Article validated successfully");
            }
        } catch (\Exception $ex) {
            if ($request->get('_format') == "json") {
                return array("success" => false, "data" => null, "message" => $ex->getMessage());
            }
            throw $ex;
        }
    }


    public function getArticleAction(Request $request, $id)
    {
        $user = $this->getUser();
        $articleManager = $this->getJsService()->getArticleManager();

        if (isset($id) && $id > 0) {
            $article = $articleManager->load($id);
        } else {
            throw new NotFoundHttpException();
        }
    }

    public function getManuscritsActions(Request $request)
    {
        $user = $this->getUser();
        $articleManager = $this->getJsService()->getArticleManager();
        $statusId = $request->get("status");
        $query = $request->get("query");
        $limit = $this->getLimit($request);
        $page = $this->getPage($request, $limit);
        $status = StatutManuscrit::getStatusById($statusId);
        if (isset($status)) {
            $articles = $articleManager->findByStatutByUser($status["code"], $articleManager->getConnectedUser(), $page, $limit, $query);
            $countMatched = $articleManager->countByStatutByUser($status["code"], $articleManager->getConnectedUser(), $query);
            $countAll = $countMatched;
            $draw = 0;
            $result = array("data" => $articles, "success" => true, "message" => "", "recordsFiltered" => $countMatched, "recordsTotal" => $countAll, "draw" => $draw, "page" => $page);

            return $result;
        } else {
            throw new NotFoundHttpException();
        }
    }


    public function getAuthorManuscritCountAction(Request $request)
    {
        //Nous ne supportons pas le format HTML pour ce contenu
        if ($request->get('_format') == "html") {
            throw new NotFoundHttpException();
        }
        if (!$this->isGranted("IS_AUTHENTICATED_FULLY")) {
            throw  new AccessDeniedHttpException();
        }

        $articleManager = $this->getJsService()->getArticleManager();
        $user = $this->getUser();

        $SOUMISSION_RETOURNEE_AUTEUR = $articleManager->countByStatutByUser(StatutManuscrit::$SOUMISSION_RETOURNEE_AUTEUR["code"], $user);
        $SOUMISSION_INCOMPLETE = $articleManager->countByStatutByUser(StatutManuscrit::$SOUMISSION_INCOMPLETE["code"], $user);
        $SOUMISSION_EN_ATTENTE_DE_VALIDATION = $articleManager->countByStatutByUser(StatutManuscrit::$SOUMISSION_EN_ATTENTE_DE_VALIDATION["code"], $user);
        $SOUMISSION_EN_COURS_DE_TRAITEMENT = $articleManager->countByStatutByUser(StatutManuscrit::$SOUMISSION_EN_COURS_DE_TRAITEMENT["code"], $user);

        $SOUMISSION_EN_ATTENTE_DE_REVISION = $articleManager->countByStatutByUser(StatutManuscrit::$SOUMISSION_EN_ATTENTE_DE_REVISION["code"], $user);
        $REVISION_RENVOYEE_A_L_AUTEUR = $articleManager->countByStatutByUser(StatutManuscrit::$REVISION_RENVOYEE_A_L_AUTEUR["code"], $user);
        $REVISION_INCOMPLETE = $articleManager->countByStatutByUser(StatutManuscrit::$REVISION_INCOMPLETE["code"], $user);
        $REVISION_EN_ATTENTE_DE_VALIDATION = $articleManager->countByStatutByUser(StatutManuscrit::$REVISION_EN_ATTENTE_DE_VALIDATION["code"], $user);
        $REVISION_EN_COURS_DE_TRAITEMENT = $articleManager->countByStatutByUser(StatutManuscrit::$REVISION_EN_COURS_DE_TRAITEMENT["code"], $user);
        $REVISION_REFUSEE = $articleManager->countByStatutByUser(StatutManuscrit::$REVISION_REFUSEE["code"], $user);

        $SOUMISSION_AVEC_DECISION = $articleManager->countByStatutByUser(StatutManuscrit::$SOUMISSION_AVEC_DECISION["code"], $user);
        $SOUMISSION_AVEC_PRODUCTION = $articleManager->countByStatutByUser(StatutManuscrit::$SOUMISSION_AVEC_PRODUCTION["code"], $user);

        return array(
            "soummission_retourne_auteur" => $SOUMISSION_RETOURNEE_AUTEUR,
            "soulission_incomplete" => $SOUMISSION_INCOMPLETE,
            "soumission_a_valider" => $SOUMISSION_EN_ATTENTE_DE_VALIDATION,
            "soumission_a_traiter" => $SOUMISSION_EN_COURS_DE_TRAITEMENT,
            "soumission_a_reviser" => $SOUMISSION_EN_ATTENTE_DE_REVISION,
            "revision_retournee" => $REVISION_RENVOYEE_A_L_AUTEUR,
            "revision_incomplete" => $REVISION_INCOMPLETE,
            "revision_a_valider" => $REVISION_EN_ATTENTE_DE_VALIDATION,
            "revision_a_traiter" => $REVISION_EN_COURS_DE_TRAITEMENT,
            "revision_refusee" => $REVISION_REFUSEE,
            "soumission_avec_decision" => $SOUMISSION_AVEC_DECISION,
            "soumission_avec_production" => $SOUMISSION_AVEC_PRODUCTION,
        );
    }

    public function getEditorManuscritsAction(Request $request)
    {

        if(!$this->isGranted(Role::$ROLE_EDITOR["code"]) && !$this->isGranted(Role::$ROLE_MAIN_EDITOR["code"])){
            throw new UnauthorizedHttpException("");
        }

        $filterObject = $this->buildFilter($request);
        $query = $this->getQueryString($request);
        $limit = $this->getLimit($request);
        $page = $this->getPage($request, $limit);

        if (isset($filterObject)) {
            $articleManager = $this->getJsService()->getArticleManager();
            $articles = $articleManager->findByQueryByFilter($page, $limit, $query, $filterObject);
            $countMatched = $articleManager->countByQueryByFilter($query, $filterObject);
            $countAll = $countMatched;
            $draw = 0;
            $result = array("data" => $articles, "success" => true, "message" => "", "recordsFiltered" => $countMatched, "recordsTotal" => $countAll, "draw" => $draw, "page" => $page);

            return $result;
        } else {
            throw new NotFoundHttpException();
        }


    }



    /**
     * @param Request $request
     * @return \stdClass
     */
    private function buildFilter(Request $request)
    {

        $intStatus=$request->query->getInt("status");
        $intArticleType=$request->query->getInt("articleType");
        $intCategorie=$request->query->getInt("categorie");
        $strDateCreation=$request->query->get("dateCreation");
        $strDateSoummission=$request->query->get("dateSoummission");
        $intAuthor=$request->query->getInt("author");
        $intEditor=$request->query->getInt("editor");
        $intReviewer=$request->query->getInt("reviewer");

        $filterObject = new \stdClass();


        $status=StatutManuscrit::getStatusById($intStatus);

        if(isset($strDateCreation) && $strDateCreation!=""){
            list($dateCreationDebut, $dateCreationFin)=$this->getDates($strDateCreation);
            $filterObject->dateCreationDebut=$dateCreationDebut;
            $filterObject->dateCreationFin=$dateCreationFin;
        }

        if(isset($strDateSoummission) && $strDateSoummission!=""){
            list($dateSoummissionDebut, $datesoummissionFin)=$this->getDates($strDateSoummission);
            $filterObject->dateSoummissionDebut=$dateSoummissionDebut;
            $filterObject->dateSoummissionFin=$datesoummissionFin;
        }
        if(isset($status)){
            $filterObject->status=$status["code"];
        }


        if(isset($intArticleType) && $intArticleType>0){
            $filterObject->idArticleType=$intArticleType;
        }
        if(isset($intCategorie) && $intCategorie>0){
            $filterObject->idCategory=$intCategorie;
        }

        if(isset($intAuthor) && $intAuthor>0){
            $filterObject->idAuthor=$intAuthor;
        }

        if(isset($intReviewer) && $intReviewer>0){
            $filterObject->idReviewer=$intReviewer;
        }

        if(isset($intEditor) && $intEditor>0){
            $filterObject->idEditor=$intEditor;
        }

        if(!$this->isGranted(Role::$ROLE_MAIN_EDITOR["code"])){

            $connectedUser=$this->getJsService()->getUtilisateurManager()->getConnectedUser();
            $filterObject->idEditor=$connectedUser->getId();
        }

        return $filterObject;
    }

    /**
     * @param $strDate
     * @return array
     */
    private function getDates($strDate){
        $arrayDate=explode('-', $strDate);
        $strFirst=trim($arrayDate[0]);
        $strSecond=trim($arrayDate[1]);


        $datefirst = \DateTime::createFromFormat("d/m/Y|", $strFirst);
        $dateSecond=\DateTime::createFromFormat("d/m/Y|", $strSecond);
        $interval = new \DateInterval("PT23H59M59S");
        $dateSecond->add($interval);

        return array($datefirst, $dateSecond);

    }

    /**
     * @param Request $request
     * @return array
     */
    public function getStatusListActions(Request $request)
    {


        $reflection = new \ReflectionClass("JSAppBundle\Entity\StatutManuscrit");
        $staticProperties = $reflection->getStaticProperties();
        $data = array();

        foreach ($staticProperties as $name => $values) {
            $data[] = $values;

        }

        return array("data" => $data, "success" => true, "message" => "", "recordsFiltered" => count($data), "recordsTotal" => count($data), "draw" => count($data), "page" => 1);


    }

    public function putManuscriptValidateAction(Request $request, $id){


        if(isset($id) && is_numeric($id)){
            $core=$this->getJsService();
            $articleManager=$core->getArticleManager();

            $article=$articleManager->load($id);

            $articleManager->validateManuscript($article);

            return array("success" => true, "data" => $article, "message" => "Manuscript submitted successfully");
        }
        else{
            throw new NotFoundHttpException();
        }


    }

    public function getArticleRevisionAction(Request $request, $id){
        if(isset($id) && is_numeric($id)){
            $core=$this->getJsService();
            $articleManager=$core->getArticleManager();

            $article=$articleManager->load($id);

            $revision=$articleManager->createRevision($article);

            ob_clean();
            return array("success" => true, "data" => $revision, "message" => "Revision created successfully");
        }
        else{
            throw new NotFoundHttpException();
        }
    }


}