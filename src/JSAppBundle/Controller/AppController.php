<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 24/08/2016
 * Time: 23:56
 */

namespace JSAppBundle\Controller;

include __DIR__.'/../../../vendor/PDFMerger/PDFMerger.php';

use JSAppBundle\Entity\AppConfig;
use JSAppBundle\Entity\StatutManuscrit;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use JSAppBundle\Tools\Tools;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Context\Context;
use FOS\RestBundle\Controller\Annotations as REST;

class AppController extends CoreRestController
{

    /**
     * @Route("/reviewer", name="js-reviewer-home", options={"expose"=true})
     * @param Request $request
     * @return Response
     */
    public function appReviewerAction(Request $request) {

//        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_ANONYMOUSLY')) {
//            throw $this->createAccessDeniedException("Unable access to this page");
//        }

        $articleManager=$this->getJsService()->getArticleManager();
        $user = $this->getUser();

        return $this->render('JSAppBundle:Edition:reviewer.html.twig', array(
                "user" => $user,
                "isReviewer"=>true,
                "isAuthor"=>false
            )
        );

    }

    /**
     * @Route("/author", name="js-author-home", options={"expose"=true})
     * @param Request $request
     * @return Response
     */
    public function appAuthorAction(Request $request) {

//        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_ANONYMOUSLY')) {
//            throw $this->createAccessDeniedException("Unable access to this page");
//        }

        $articleManager=$this->getJsService()->getArticleManager();
        $user = $this->getUser();

        $SOUMISSION_RETOURNEE_AUTEUR=$articleManager->countByStatutByUser(StatutManuscrit::$SOUMISSION_RETOURNEE_AUTEUR["code"], $user);
        $SOUMISSION_INCOMPLETE=$articleManager->countByStatutByUser(StatutManuscrit::$SOUMISSION_INCOMPLETE["code"], $user);
        $SOUMISSION_EN_ATTENTE_DE_VALIDATION=$articleManager->countByStatutByUser(StatutManuscrit::$SOUMISSION_EN_ATTENTE_DE_VALIDATION["code"], $user);
        $SOUMISSION_EN_COURS_DE_TRAITEMENT=$articleManager->countByStatutByUser(StatutManuscrit::$SOUMISSION_EN_COURS_DE_TRAITEMENT["code"], $user);

        $SOUMISSION_EN_ATTENTE_DE_REVISION=$articleManager->countByStatutByUser(StatutManuscrit::$SOUMISSION_EN_ATTENTE_DE_REVISION["code"], $user);
        $REVISION_RENVOYEE_A_L_AUTEUR=$articleManager->countByStatutByUser(StatutManuscrit::$REVISION_RENVOYEE_A_L_AUTEUR["code"], $user);
        $REVISION_INCOMPLETE=$articleManager->countByStatutByUser(StatutManuscrit::$REVISION_INCOMPLETE["code"], $user);
        $REVISION_EN_ATTENTE_DE_VALIDATION=$articleManager->countByStatutByUser(StatutManuscrit::$REVISION_EN_ATTENTE_DE_VALIDATION["code"], $user);
        $REVISION_EN_COURS_DE_TRAITEMENT=$articleManager->countByStatutByUser(StatutManuscrit::$REVISION_EN_COURS_DE_TRAITEMENT["code"], $user);
        $REVISION_REFUSEE=$articleManager->countByStatutByUser(StatutManuscrit::$REVISION_REFUSEE["code"], $user);

        $SOUMISSION_AVEC_DECISION=$articleManager->countByStatutByUser(StatutManuscrit::$SOUMISSION_AVEC_DECISION["code"], $user);
        $SOUMISSION_AVEC_PRODUCTION=$articleManager->countByStatutByUser(StatutManuscrit::$SOUMISSION_AVEC_PRODUCTION["code"], $user);


        return $this->render('JSAppBundle:Edition:index.html.twig', array(
                "user" => $user,
                "soummission_retourne_auteur"=>$SOUMISSION_RETOURNEE_AUTEUR,
                "soulission_incomplete"=>$SOUMISSION_INCOMPLETE,
                "soumission_a_valider"=>$SOUMISSION_EN_ATTENTE_DE_VALIDATION,
                "soumission_a_traiter"=>$SOUMISSION_EN_COURS_DE_TRAITEMENT,
                "soumission_a_reviser"=>$SOUMISSION_EN_ATTENTE_DE_REVISION,
                "revision_retournee"=>$REVISION_RENVOYEE_A_L_AUTEUR,
                "revision_incomplete"=>$REVISION_INCOMPLETE,
                "revision_a_valider"=>$REVISION_EN_ATTENTE_DE_VALIDATION,
                "revision_a_traiter"=>$REVISION_EN_COURS_DE_TRAITEMENT,
                "revision_refusee"=>$REVISION_REFUSEE,
                "soumission_avec_decision"=>$SOUMISSION_AVEC_DECISION,
                "soumission_avec_production"=>$SOUMISSION_AVEC_PRODUCTION,
                "isAuthor"=>true,
                "isReviewer"=>false,
                "isEdition"=>false,
                "isRules"=>false
            )
        );

    }



    /**
     * @Route("/edition/manuscrit/list", name="js-edition-article-list" , options={"expose"=true})
     * @param Request $request
     * @return Response
     */
    public function appEditionManuscritListAction(Request $request) {

//        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_ANONYMOUSLY')) {
//            throw $this->createAccessDeniedException("Unable access to this page");
//        }

        $user = $this->getUser();

        $articleManager=$this->getJsService()->getArticleManager();
        $statusId=$request->get("status");
        $status=StatutManuscrit::getStatusById($statusId);
        if(isset($status)){
            $articles=$articleManager->findByStatutByUser($status["code"], $articleManager->getConnectedUser());
            return $this->render('JSAppBundle:Edition:list.html.twig', array(
                    "user" => $user,
                    "articles"=>$articles,
                    "typeLabel"=>$status["libelle"]
                )
            );
        }
        else{
            throw new NotFoundHttpException();
        }


    }

    /**
     * @Route("/public", name="js-public-home1" , options={"expose"=true})
     * @Route("/", name="js-public-home2")
     * @param Request $request
     * @return Response
     */
    public function appPublicAction(Request $request) {

//        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_ANONYMOUSLY')) {
//            throw $this->createAccessDeniedException("Unable access to this page");
//        }

        $user = $this->getUser();

        return $this->render('JSAppBundle:Public:index.html.twig', array(
                "user" => $user,
                "isAuthor"=>false,
                "isReviewer"=>false,
                "isEditor"=>false
            )
        );

    }

    /**
     * @Route("/admin", name="js-admin-home" , options={"expose"=true})
     * @param Request $request
     * @return Response
     */
    public function appAdminAction(Request $request) {

//        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_ANONYMOUSLY')) {
//            throw $this->createAccessDeniedException("Unable access to this page");
//        }

        $user = $this->getUser();

        return $this->render('JSAppBundle:Admin:index.html.twig', array(
                "user" => $user
            )
        );
    }

    /**
     * Get Application configuration,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\AppConfig",
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
     *
     * @return array
     */
    public function getAppConfigAction(Request $request) {

        $userManager = $this->getJsService()->getUtilisateurManager();
        $connectedUser = $userManager->getConnectedUser();
        $config = new AppConfig();
//        //charger les configurations de l'application
        $baseUrl = $request->getBaseUrl();
        if (strpos($baseUrl, "app_dev.php") >= 0) {
            $baseUrl = str_replace("/app_dev.php", "", $baseUrl);
        }
        if (strpos($baseUrl, "app.php") >= 0) {
            $baseUrl = str_replace("/app.php", "", $baseUrl);
        }
        $config->setBaseUrl($baseUrl);

        $config->setUser($connectedUser);

        $tplArray=Tools::getAllTemplateFiles($baseUrl);

        $config->setTpls($tplArray);

//        ob_clean();
        return $config;
    }


    public function getTestSendMailAction(Request $request){

//        $userManager = $this->getJsService()->getUtilisateurManager();
//        $connectedUser = $userManager->getConnectedUser();

//        $content=$this->renderView(
//        // app/Resources/views/Emails/registration.html.twig
//            'JSAppBundle:Emails:test.html.twig', array("user" => $connectedUser)
//        );

        $this->sendEmail("Compte E-Rating créé", "magloiredjatio@gmail.com",
            $this->renderView("JSAppBundle:Emails:test.html.twig", array(
                "login" => "login",
                "pass" => "motdepasse",
                "message"=>"",
                "prenom" => "genoud Magloire",
                "nom" => "DOUANLA DJATIO"
            )),"contact@capvcm.com",array()
        );

//        $this->sendEmail("Test sent mail","magloiredjatio@gmail.com" , $content);

        return array("message"=>"Mails sent successfully!");
    }


    public function getTestPdfMergeAction(Request $request){
        $pdf = new \PDFMerger;
        $pdf->addPDF('my-document.pdf', '1-2')
            ->addPDF('samplepdfs/two.pdf', '1-2')
            ->addPDF('samplepdfs/three.pdf', 'all')
            ->merge('file', 'samplepdfs/TEST2.pdf');

        return array("message"=>"Mails sent successfully!");
    }

}