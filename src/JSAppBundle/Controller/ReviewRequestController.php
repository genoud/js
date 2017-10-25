<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 24/08/2016
 * Time: 23:32
 */

namespace JSAppBundle\Controller;


use JSAppBundle\Entity\Article;
use JSAppBundle\Entity\TypeArticle;
use JSAppBundle\Form\ReviewRequestType;
use JSAppBundle\Form\TypeArticleType;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Context\Context;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\Annotations as REST;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ReviewRequestController extends CoreRestController
{

    public function getReviewrequestsAction(Request $request)
    {

        $core = $this->getJsService();
        $manager = $core->getReviewRequestManager();

        $query = $this->getQueryString($request);
        $limit = $this->getLimit($request);
        $page = $this->getPage($request, $limit);

        $reviewer = $manager->getConnectedUser();

        $reviewRequest = $manager->findPendingByReviewer($reviewer, $page, $limit, $query);
        $countMatched = $manager->countPendingByReviewer($reviewer, $query);
        $countAll = $countMatched;
        $draw = 0;
        $result = array("data" => $reviewRequest, "success" => true, "message" => "", "recordsFiltered" => $countMatched, "recordsTotal" => $countAll, "draw" => $draw, "page" => $page);

        return $result;

    }

    public function putReviewrequestHandleAction(Request $request, $id){

        $core = $this->getJsService();
        $manager = $core->getReviewRequestManager();

        $decision=$request->query->getBoolean("decision");

        $revRequest=$manager->load($id);

        $manager->handleRequest($revRequest, $decision);

        return array("success"=>true, "data"=>null, "message"=>"REquest handled successfully");
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
    public function postReviewrequestAction(Request $request)
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


            $form = $this->createForm(ReviewRequestType::class, $article, array('method' => $request->getMethod()));

            $form->handleRequest($request);


            if ($form->isValid()) {

//                $article=$form->getData();

                $reviewers = $article->getReviewers();


                $manager->requestReviewers(explode(',', $articleIds), $reviewers);


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

    /**
     * Get ReviewRequest ,
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
    public function getReviewrequestAction(Request $request)
    {
        $articleManager = $this->getJsService()->getArticleManager();

        $articleId = $request->query->getInt("id");


        if (isset($articleId) && $articleId > 0) {
            $article = $articleManager->load($articleId);
        } else {
            $article = new Article();
        }

        $form = $form = $this->createForm(ReviewRequestType::class, $article, array('method' => $request->getMethod()));

        $form->handleRequest($request);


        return $form;
    }


}