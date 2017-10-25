<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 24/08/2016
 * Time: 23:27
 */

namespace JSAppBundle\Controller;


use JSAppBundle\Entity\ArticleReviewer;

use JSAppBundle\Entity\CoAuteur;
use JSAppBundle\Entity\Review;
use JSAppBundle\Form\ArticleReviewerType;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Context\Context;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\Annotations as REST;

class ArticleReviewerController extends CoreRestController
{

    /**
     * Get single CoAuthor,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\ArticleReviewer",
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
     * @param int $id the article reviewer id
     *
     * @return CoAuteur|Form
     * @Route("/api/v1/articlereviewer/{id}.{_format}", name="get-articlereviewer")
     * @throws NotFoundHttpException when page not exist
     */
    public function getArticlereviewerAction(Request $request, $id)
    {

        $core = $this->getJsService();
        $manager = $core->getArticleReviewerManager();
        $reviewer = $manager->load($id);
        if (!isset($reviewer)) {
            if ($request->get('_format') == "html") {
                $reviewer = new ArticleReviewer();
                $form = $this->createForm(ArticleReviewerType::class, $reviewer, array('method' => $request->getMethod()));
                $form->handleRequest($request);
                ob_clean();
                return $form;
            }
        }
        else{

            $form = $this->createForm(ArticleReviewerType::class, $reviewer, array('method' => $request->getMethod()));
            $form->handleRequest($request);
            ob_clean();
            return $form;
        }
//        ob_clean();
        return $reviewer;
    }

    /**
     * Get single Article Reviewer,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\ArticleReviewer",
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
     * @return CoAuteur[]
     * @throws NotFoundHttpException when page not exist
     */
    public function getArticlereviewersAction(Request $request)
    {
        $core = $this->getJsService();
        $manager = $core->getArticleReviewerManager();
        $articleManager=$core->getArticleManager();
        $articleId=$request->query->getInt("articleId");
        $opposed=$request->query->getBoolean("opposed");
        $suggested=$request->query->getBoolean("suggested");

        if(isset($articleId) && $articleId>0){
            $articcle=$articleManager->load($articleId);
            $data = $manager->getArticleReviewersByArticle($articcle, $opposed, $suggested);
            return array("success" => true, "data" => $data, "message" => "OK");
        }
        return null;

    }

    /**
     * @param Request $request
     * @param $id
     * @return ArticleReviewer
     * @throws \Exception
     */
    public function putArticlereviewerAction(Request $request, $id){
        $core = $this->getJsService();
        $manager = $core->getCoAuteurManager();
        $reviewer=$manager->load($id);
        return array("success" => true, "data" => $reviewer, "message" => "Reviewer edited successfully");
    }

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function deleteArticlereviewerAction(Request $request, $id){

        $core = $this->getJsService();
        $manager = $core->getArticleReviewerManager();
        $reviewer=$manager->load($id);
        $manager->delete($reviewer);
        return array("success" => true, "data" => null, "message" => "Reviewer deleted successfully");


    }
    /**
     * @param Request $request
     * @param int $id the reviewer id
     * @return array
     */
    public function postArticlereviewerAction(Request $request, $id)
    {

        try {
            $articleId=$request->query->getInt("articleId");
            $opposed=$request->query->getBoolean("opposed");
            $suggested=$request->query->getBoolean("suggested");

            $reviewer = new ArticleReviewer();
            $core = $this->getJsService();
            $manager = $core->getArticleReviewerManager();

            if (isset($id) && $id > 0) {
                //chargement de l'objet
                $reviewer=$manager->load($id);
            }


            $form = $this->createForm(ArticleReviewerType::class, $reviewer, array('method' => $request->getMethod()));

//            $form->submit($request->get("auteur"), 'PATCH' !== $request->getMethod());

//            var_dump($request->request);
            $form->handleRequest($request);

            if ($form->isValid()) {
//                $coauteur = $form->getData();
                $article=null;
                if(isset($articleId) && $articleId>0){
                    $articleManager=$core->getArticleManager();
                    $article=$articleManager->load($articleId);
                    if($opposed){
                        $reviewer->setOpposed(true);
                        $reviewer->setArticleOpposed($article);

                    }
                    else if($suggested){
                        $reviewer->setSuggested(true);
                        $reviewer->setArticleSuggested($article);
                    }
                }
                if (isset($id) && $id > 0) {
                    //modification d'un auteur

//                    $coauteur->setId($id);

                    $reviewer = $manager->updateArticleReviewer($reviewer);
                    ob_clean();
                    return array("success" => true, "data" => $reviewer, "message" => "Reviewer edited successfully");


                } else {
                    //Ajout d'un auteur

                    $reviewer=$manager->createArticelReviewer($reviewer);
                    ob_clean();
                    return array("success" => true, "data" => $reviewer, "message" => "Reviewer created successfully");


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

    public function getReviewerCountAction(Request $request)
    {
        //Nous ne supportons pas le format HTML pour ce contenu
        if ($request->get('_format') == "html") {
            throw new NotFoundHttpException();
        }
        if (!$this->isGranted("IS_AUTHENTICATED_FULLY")) {
            throw  new AccessDeniedHttpException();
        }

        $articleManager = $this->getJsService()->getArticleManager();
        $reviewRequestmanager=$this->getJsService()->getReviewREquestManager();
        $reviewManager=$this->getJsService()->getReviewManager();

        $user = $articleManager->getConnectedUser();;

        $reviewRequest=$reviewRequestmanager->countPendingByReviewer($user, "");
        $revisionInProgress=$reviewManager->countAllByReviewerByStatus($user, Review::$REVIEW_IN_PROGRESS);
        $submittedReviews=$reviewManager->countAllByReviewerByStatus($user, Review::$REVIEW_SUBMITTED);
        $validatedReviews=$reviewManager->countAllByReviewerByStatus($user, Review::$REVIEW_VALIDATED);
        $rejectedReviews=$reviewManager->countAllByReviewerByStatus($user, Review::$REVIEW_REJECTED);
        $completedReview=3;

        return array(
            "reviewRequest" => $reviewRequest,
            "reviewInProgress" => $revisionInProgress,
            "submittedReviews" => $submittedReviews,
            "validatedReviews" => $validatedReviews,
            "rejectedReviews" => $rejectedReviews
        );
    }

}