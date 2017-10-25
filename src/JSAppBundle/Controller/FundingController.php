<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 24/08/2016
 * Time: 23:27
 */

namespace JSAppBundle\Controller;


use JSAppBundle\Entity\Auteur;
use JSAppBundle\Entity\CoAuteur;
use JSAppBundle\Entity\Funding;
use JSAppBundle\Form\AuteurType;
use JSAppBundle\Form\CoAuteurType;
use JSAppBundle\Form\FundingType;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Context\Context;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\Annotations as REST;

class FundingController extends CoreRestController
{

    /**
     * Get single Funding,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\Funding",
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
     * @param int $id the page id
     *
     * @return Funding|Form
     * @Route("/api/v1/funding/{id}.{_format}", name="get-funding")
     * @throws NotFoundHttpException when page not exist
     */
    public function getFundingAction(Request $request, $id)
    {

        $core = $this->getJsService();
        $manager = $core->getFundingManager();
        $funding = $manager->load($id);
        if (!isset($funding)) {
            if ($request->get('_format') == "html") {
                $funding = new Funding();
                $form = $this->createForm(FundingType::class, $funding, array('method' => $request->getMethod()));
                $form->handleRequest($request);
                ob_clean();
                return $form;
            }
        }
        else{

            $form = $this->createForm(FundingType::class, $funding, array('method' => $request->getMethod()));
            $form->handleRequest($request);
            ob_clean();
            return $form;
        }
//        ob_clean();
        return $funding;
    }

    /**
     * Get single Funding,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\Funding",
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
     * @param int $id the page id
     *
     * @return Funding[]
     * @throws NotFoundHttpException when page not exist
     */
    public function getFundingsAction(Request $request)
    {
        $core = $this->getJsService();
        $manager = $core->getFundingManager();
        $articleManager=$core->getArticleManager();
        $articleId=$request->query->getInt("articleId");
        if(isset($articleId) && $articleId>0){
            $articcle=$articleManager->load($articleId);
            $data = $manager->getFundingByArticle($articcle);
            return array("success" => true, "data" => $data, "message" => "OK");
        }
        return null;

    }

    /**
     * @param Request $request
     * @param $id
     * @return true
     * @throws \Exception
     */
    public function deleteFundingAction(Request $request, $id){

        $core = $this->getJsService();
        $manager = $core->getFundingManager();
        $funding=$manager->load($id);
        if(isset($funding)){
            $manager->delete($funding);
            return array("success" => true, "data" => null, "message" => "Funding deleted successfully.");
        }

        return false;


    }

    /**
     * @param Request $request
     * @param int $id the author id
     * @param int $articleId the arrticle id
     * @return array
     */
    public function postFundingAction(Request $request, $id)
    {

        try {
            $articleId=$request->query->getInt("articleId");
            $funding = new Funding();
            $core = $this->getJsService();
            $manager = $core->getFundingManager();

            if (isset($id) && $id > 0) {
                //chargement de l'objet
                $funding=$manager->load($id);
            }


            $form = $this->createForm(FundingType::class, $funding, array('method' => $request->getMethod()));

//            $form->submit($request->get("auteur"), 'PATCH' !== $request->getMethod());

//            var_dump($request->request);
            $form->handleRequest($request);

            if ($form->isValid()) {
//                $funding2 = $form->getData();
                $article=null;
                if(isset($articleId) && $articleId>0){
                    $articleManager=$core->getArticleManager();
                    $article=$articleManager->load($articleId);
                    $funding->setArticle($article);
                }
                if (isset($id) && $id > 0) {
                    //modification d'un auteur

                    $funding = $manager->updateFunding($funding);
                    ob_clean();
                    return array("success" => true, "data" => $funding, "message" => "Funding edited successfully");


                } else {
                    //Ajout d'un auteur
                    $funding=$manager->createFunding($funding);
                    ob_clean();
                    return array("success" => true, "data" => $funding, "message" => "Funding created successfully");


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