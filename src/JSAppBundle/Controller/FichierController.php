<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 24/08/2016
 * Time: 23:28
 */

namespace JSAppBundle\Controller;


use JSAppBundle\Entity\Fichier;
use JSAppBundle\Form\FichierType;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Context\Context;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\Annotations as REST;

class FichierController extends CoreRestController
{

    /**
     * Get single Fichier,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\Fichier",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the page is not found"
     *   }
     * )
     *
     * @REST\View(
     * templateVar="form",
     * serializerEnableMaxDepthChecks=true
     * )
     *
     * @param Request $request the request object
     * @param int $id the fichier id
     *
     * @return Fichier|Form
     * @Route("/api/v1/fichier/{id}.{_format}", name="get-fichier")
     * @throws NotFoundHttpException when page not exist
     */
    public function getFichierAction(Request $request, $id)
    {

        $core = $this->getJsService();
        $manager = $core->getFichierManager();
        $fichier = $manager->load($id);
        if (!isset($fichier)) {
            if ($request->get('_format') == "html") {
                $fichier = new Fichier();
                $form = $this->createForm(FichierType::class, $fichier, array('method' => $request->getMethod()));
                $form->handleRequest($request);
                ob_clean();
                return $form;
            }
        }
        else{

            $form = $this->createForm(FichierType::class, $fichier, array('method' => $request->getMethod()));
            $form->handleRequest($request);
            ob_clean();
            return $form;
        }
//        ob_clean();
        return $fichier;
    }

    /**
     * Get single Article fichier,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\Fichier",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the page is not found"
     *   }
     * )
     *
     * @REST\View(
     * templateVar="form",
     * serializerEnableMaxDepthChecks=true
     * )
     *
     * @param Request $request the request object
     *
     * @return Fichier[]
     * @throws NotFoundHttpException when page not exist
     */
    public function getFichiersAction(Request $request)
    {
        $core = $this->getJsService();
        $manager = $core->getFichierManager();

        $articleId=$request->query->getInt("articleId");
        $reviewId=$request->query->getInt("reviewId");


        if(isset($articleId) && $articleId>0){
            $articleManager=$core->getArticleManager();
            $articcle=$articleManager->load($articleId);
            $data = $manager->getFichiersByArticle($articcle);
            return array("success" => true, "data" => $data, "message" => "OK");
        }
        else if(isset($reviewId) && $reviewId>0){
            $reviewManager=$core->getReviewManager();
            $review=$reviewManager->load($reviewId);
            $data = $manager->getFichiersByReview($review);
            return array("success" => true, "data" => $data, "message" => "OK");
        }
        return null;

    }

    /**
     * @param Request $request
     * @param $id
     * @return Fichier
     * @throws \Exception
     */
    public function putFichierAction(Request $request, $id){
        $core = $this->getJsService();
        $manager = $core->getCoAuteurManager();
        $fichier=$manager->load($id);
        return array("success" => true, "data" => $fichier, "message" => "Attachement edited successfully");
    }

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function deleteFichierAction(Request $request, $id){

        $core = $this->getJsService();
        $manager = $core->getFichierManager();
        $fichier=$manager->load($id);
        $manager->delete($fichier);
        return array("success" => true, "data" => null, "message" => "Attachement deleted successfully");


    }
    /**
     * @param Request $request
     * @param int $id the fichier id
     * @return array
     */
    public function postFichierAction(Request $request, $id)
    {

        try {
            $articleId=$request->query->getInt("articleId");
            $reviewId=$request->query->getInt("reviewId");

            $fichier = new Fichier();
            $core = $this->getJsService();
            $manager = $core->getFichierManager();

            if (isset($id) && $id > 0) {
                //chargement de l'objet
                $fichier=$manager->load($id);
            }


            $form = $this->createForm(FichierType::class, $fichier, array('method' => $request->getMethod()));

//            $form->submit($request->get("auteur"), 'PATCH' !== $request->getMethod());

//            var_dump($request->request);
            $form->handleRequest($request);

            if ($form->isValid()) {
//                $coauteur = $form->getData();
                $article=null;
                if(isset($articleId) && $articleId>0){
                    $articleManager=$core->getArticleManager();
                    $article=$articleManager->load($articleId);
                    $fichier->setArticle($article);
                }
                $review=null;
                if(isset($reviewId) && $reviewId>0){
                    $reviewManager=$core->getReviewManager();
                    $review=$reviewManager->load($articleId);
                    $fichier->setReview($review);
                }
                if (isset($id) && $id > 0) {

                    $fichier = $manager->updateFichier($fichier);
                    ob_clean();
                    return array("success" => true, "data" => $fichier, "message" => "Attachement edited successfully");


                } else {
                    //Ajout d'un auteur

                    $fichier=$manager->createFichier($fichier);
                    ob_clean();
                    return array("success" => true, "data" => $fichier, "message" => "Attachement created successfully");


                }
            } else {
                $errors = $form->getErrors($deep = true);
                ob_clean();
                return array("success" => false, "message" => "The form contains errors. Please check.", "errors" => $errors);
            }

        } catch (\Exception $ex) {
            ob_clean();

            return array("success" => false, "message" => $ex->getMessage());
        }

    }
}