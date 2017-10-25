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
use JSAppBundle\Form\AuteurType;
use JSAppBundle\Form\CoAuteurType;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Context\Context;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\Annotations as REST;

class CoAuteurController extends CoreRestController
{

    /**
     * Get single CoAuthor,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\CoAuteur",
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
     * @return CoAuteur|Form
     * @Route("/api/v1/coauteur/{id}.{_format}", name="get-coauteur")
     * @throws NotFoundHttpException when page not exist
     */
    public function getCoauteurAction(Request $request, $id)
    {

        $core = $this->getJsService();
        $manager = $core->getCoAuteurManager();
        $coauteur = $manager->load($id);
        if (!isset($coauteur)) {
            if ($request->get('_format') == "html") {
                $coauteur = new CoAuteur();
                $form = $this->createForm(CoAuteurType::class, $coauteur, array('method' => $request->getMethod()));
                $form->handleRequest($request);
                ob_clean();
                return $form;
            }
        }
        else{

            $form = $this->createForm(CoAuteurType::class, $coauteur, array('method' => $request->getMethod()));
            $form->handleRequest($request);
            ob_clean();
            return $form;
        }
//        ob_clean();
        return $coauteur;
    }

    /**
     * Get single CoAuthor,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\CoAuteur",
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
     * @return CoAuteur[]
     * @throws NotFoundHttpException when page not exist
     */
    public function getCoauteursAction(Request $request)
    {
        $core = $this->getJsService();
        $manager = $core->getCoAuteurManager();
        $articleManager=$core->getArticleManager();
        $articleId=$request->query->getInt("articleId");
        if(isset($articleId) && $articleId>0){
            $articcle=$articleManager->load($articleId);
            $data = $manager->getCoauteursByArticle($articcle);
            return array("success" => true, "data" => $data, "message" => "OK");
        }
        return null;

    }

    /**
     * @param Request $request
     * @param $id
     * @return CoAuteur
     * @throws \Exception
     */
    public function putCoauteurAction(Request $request, $id){

        $isPrincipal=$request->query->getBoolean("principal");
        $core = $this->getJsService();
        $manager = $core->getCoAuteurManager();
        $coauteur=$manager->load($id);
        if($isPrincipal){
            $coauteur->setPrincipal(true);
            $manager->updateCoAuteur($coauteur);
        }
        return array("success" => true, "data" => $coauteur, "message" => "CoAuthor set as principal successfully successfully");
    }

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function deleteCoauteurAction(Request $request, $id){

        $core = $this->getJsService();
        $manager = $core->getCoAuteurManager();
        $coauteur=$manager->load($id);
        $manager->delete($coauteur);
        return array("success" => true, "data" => null, "message" => "CoAuthor deleted successfully");


    }
    /**
     * @param Request $request
     * @param int $id the author id
     * @param int $articleId the arrticle id
     * @return array
     */
    public function postCoauteurAction(Request $request, $id)
    {

        try {
            $articleId=$request->query->getInt("articleId");
            $coauteur = new CoAuteur();
            $core = $this->getJsService();
            $manager = $core->getCoAuteurManager();

            if (isset($id) && $id > 0) {
                //chargement de l'objet
                $coauteur=$manager->load($id);
            }


            $form = $this->createForm(CoAuteurType::class, $coauteur, array('method' => $request->getMethod()));

//            $form->submit($request->get("auteur"), 'PATCH' !== $request->getMethod());

//            var_dump($request->request);
            $form->handleRequest($request);

            if ($form->isValid()) {
//                $coauteur = $form->getData();
                $article=null;
                if(isset($articleId) && $articleId>0){
                    $articleManager=$core->getArticleManager();
                    $article=$articleManager->load($articleId);
                    $coauteur->setArticle($article);
                }
                if (isset($id) && $id > 0) {
                    //modification d'un auteur

//                    $coauteur->setId($id);

                    $coauteur = $manager->updateCoAuteur($coauteur);
                    ob_clean();
                    return array("success" => true, "data" => $coauteur, "message" => "CoAuthor edited successfully");


                } else {
                    //Ajout d'un auteur
                    $coauteur=$manager->createCoAuteur($coauteur);
                    ob_clean();
                    return array("success" => true, "data" => $coauteur, "message" => "Author created successfully");


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