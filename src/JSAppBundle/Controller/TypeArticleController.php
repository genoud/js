<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 24/08/2016
 * Time: 23:32
 */

namespace JSAppBundle\Controller;


use JSAppBundle\Entity\TypeArticle;
use JSAppBundle\Form\TypeArticleType;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Context\Context;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\Annotations as REST;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class TypeArticleController extends CoreRestController
{

    /**
     * Get single TypeArticle,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\TypeArticle",
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
     * @return TypeArticle|Form
     * @Route("/api/v1/typetichier/{id}.{_format}", name="get-typearticle")
     * @throws NotFoundHttpException when page not exist
     */
    public function getTypearticleAction(Request $request, $id)
    {

        $core = $this->getJsService();
        $manager = $core->getTypeArticleManager();
        $typeArticle = $manager->load($id);
        if (!isset($typeArticle)) {
            if ($request->get('_format') == "html") {
                $typeArticle = new TypeArticle();
                $form = $this->createForm(TypeArticleType::class, $typeArticle, array('method' => $request->getMethod()));
                $form->handleRequest($request);
                ob_clean();
                return $form;
            }
        }
        else{

            $form = $this->createForm(TypeArticleType::class, $typeArticle, array('method' => $request->getMethod()));
            $form->handleRequest($request);
            ob_clean();
            return $form;
        }
//        ob_clean();
        return $typeArticle;
    }


    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function deleteTypearticleAction(Request $request, $id){

        $core = $this->getJsService();
        $manager = $core->getTypeArticleManager();
        $user=$manager->load($id);
        $manager->delete($user);
        return array("success" => true, "data" => null, "message" => "Attachement type deleted successfully");
    }

    /**
     * @param Request $request
     * @param int $id the user id
     * @return array
     */
    public function postTypearticleAction(Request $request, $id)
    {

        try {
            $typeArticle = new TypeArticle();
            $core = $this->getJsService();
            $manager = $core->getTypeArticleManager();

            if (isset($id) && $id > 0) {
                //chargement de l'objet
                $typeArticle=$manager->load($id);
            }


            $form = $this->createForm(TypeArticleType::class, $typeArticle, array('method' => $request->getMethod()));

            $form->handleRequest($request);

            if ($form->isValid()) {

                if (isset($id) && $id > 0) {
                    $typeArticle = $manager->update($typeArticle);
                    ob_clean();
                    return array("success" => true, "data" => $typeArticle, "message" => "Attachement type edited successfully");


                } else {
                    //Ajout d'un auteur
                    $typeArticle=$manager->create($typeArticle);
                    ob_clean();
                    return array("success" => true, "data" => $typeArticle, "message" => "Author created successfully");


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

    public function getTypearticlesAction(Request $request){

        $core=$this->getJsService();
        $manager = $core->getTypeArticleManager();

        $query=$this->getQueryString($request);
        $limit=$this->getLimit($request);
        $page=$this->getPage($request, $limit);


            $types=$manager->findByQueryString($page, $limit, $query);
            $countMatched=$manager->countByQueryString( $query);
            $countAll=$countMatched;
            $draw=0;
            $result = array("data" => $types, "success" => true, "message" => "", "recordsFiltered" => $countMatched, "recordsTotal" => $countAll, "draw" => $draw, "page" => $page);

            return $result;

    }
}