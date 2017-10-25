<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 24/08/2016
 * Time: 23:32
 */

namespace JSAppBundle\Controller;


use JSAppBundle\Entity\Review;
use JSAppBundle\Entity\TypeArticle;
use JSAppBundle\Form\ReviewType;
use JSAppBundle\Form\TypeArticleType;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Context\Context;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\Annotations as REST;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ReviewController extends CoreRestController
{

    /**
     * Get single Review,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\Review",
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
     * @param int $id the user id
     *
     * @return Review|Form
     * @Route("/api/v1/review/{id}.{_format}", name="get-review")
     * @throws NotFoundHttpException when page not exist
     */
    public function getReviewAction(Request $request, $id)
    {

        $core = $this->getJsService();
        $manager = $core->getReviewManager();
        $review = $manager->load($id);
        if (!isset($review)) {
            if ($request->get('_format') == "html") {
                $review = new Review();
                $form = $this->createForm(ReviewType::class, $review, array('method' => $request->getMethod()));
                $form->handleRequest($request);
                ob_clean();
                return $form;
            }
        }
        else{

            $form = $this->createForm(ReviewType::class, $review, array('method' => $request->getMethod()));
            $form->handleRequest($request);
            ob_clean();
            return $form;
        }
//        ob_clean();
        return $review;
    }

    public function getReviewsAction(Request $request)
    {

        $status=$request->query->getInt("status");

        $statusStr="";
        if($status && $status>0){
            if($status==1){
                $statusStr=Review::$REVIEW_IN_PROGRESS;
            }
            else if($status==2){
                $statusStr=Review::$REVIEW_SUBMITTED;
            }
            else if($status==3){
                $statusStr=Review::$REVIEW_VALIDATED;
            }
            else if($status==4){
                $statusStr=Review::$REVIEW_REJECTED;
            }
        }
        $core = $this->getJsService();
        $manager = $core->getReviewManager();

        $query = $this->getQueryString($request);
        $limit = $this->getLimit($request);
        $page = $this->getPage($request, $limit);

        $reviewer = null; //$manager->getConnectedUser();

        $reviewRequest = $manager->findByReviewerByStatus($reviewer,$statusStr,  $page, $limit, $query);
        $countMatched = $manager->countAllByReviewerByStatus($reviewer,$statusStr, $query);
        $countAll = $countMatched;
        $draw = 0;
        $result = array("data" => $reviewRequest, "success" => true, "message" => "", "recordsFiltered" => $countMatched, "recordsTotal" => $countAll, "draw" => $draw, "page" => $page);

        return $result;

    }


    public function getReviewsByReviewerAction(Request $request)
    {

        $status=$request->query->getInt("status");

        $statusStr="";
        if($status && $status>0){
            if($status==1){
                $statusStr=Review::$REVIEW_IN_PROGRESS;
            }
            else if($status==2){
                $statusStr=Review::$REVIEW_SUBMITTED;
            }
            else if($status==3){
                $statusStr=Review::$REVIEW_VALIDATED;
            }
            else if($status==4){
                $statusStr=Review::$REVIEW_REJECTED;
            }
        }
        $core = $this->getJsService();
        $manager = $core->getReviewManager();

        $query = $this->getQueryString($request);
        $limit = $this->getLimit($request);
        $page = $this->getPage($request, $limit);

        $reviewer = $manager->getConnectedUser();

        $reviewRequest = $manager->findByReviewerByStatus($reviewer,$statusStr,  $page, $limit, $query);
        $countMatched = $manager->countAllByReviewerByStatus($reviewer,$statusStr, $query);
        $countAll = $countMatched;
        $draw = 0;
        $result = array("data" => $reviewRequest, "success" => true, "message" => "", "recordsFiltered" => $countMatched, "recordsTotal" => $countAll, "draw" => $draw, "page" => $page);

        return $result;

    }

    /**
     * @param Request $request
     * @param int $id the user id
     * @return array
     */
    public function postReviewAction(Request $request, $id)
    {

        try {
            $review = new Review();
            $core = $this->getJsService();
            $manager = $core->getReviewManager();

            if (isset($id) && $id > 0) {
                //chargement de l'objet
                $review=$manager->load($id);
            }

            $form = $this->createForm(ReviewType::class, $review, array('method' => $request->getMethod()));

            $form->handleRequest($request);

            if ($form->isValid()) {

                if (isset($id) && $id > 0) {
                    $review = $manager->update($review);
                    ob_clean();
                    return array("success" => true, "data" => $review, "message" => "Review edited successfully");

                } else {
                    //Ajout d'un auteur
                    $review=$manager->create($review);
                    ob_clean();
                    return array("success" => true, "data" => $review, "message" => "Review created successfully");

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

    public function putReviewSubmitAction(Request $request, $id){

        $core = $this->getJsService();
        $manager = $core->getReviewManager();

        $review=$manager->load($id);

        $manager->submitReview($review);

        return array("success"=>true, "data"=>null, "message"=>"Review submitted successfully");
    }

    public function putReviewValidateAction(Request $request, $id){

        $core = $this->getJsService();
        $manager = $core->getReviewManager();

        $review=$manager->load($id);

        $manager->validateReview($review);

        return array("success"=>true, "data"=>null, "message"=>"Review validated successfully");
    }

    public function putReviewRejectAction(Request $request, $id){

        $core = $this->getJsService();
        $manager = $core->getReviewManager();

        $review=$manager->load($id);

        $manager->rejectReview($review);

        return array("success"=>true, "data"=>null, "message"=>"Review rejected successfully");
    }
}