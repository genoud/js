<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 24/08/2016
 * Time: 23:27
 */

namespace JSAppBundle\Controller;


use JSAppBundle\Entity\Categorie;
use JSAppBundle\Form\CategorieType;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Context\Context;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\Annotations as REST;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CategorieController extends CoreRestController
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
     * @return Categorie|Form
     * @Route("/api/v1/categorie/{id}.{_format}", name="get-categorie")
     * @throws NotFoundHttpException when page not exist
     */
    public function getCategorieAction(Request $request, $id)
    {

        $core = $this->getJsService();
        $manager = $core->getCategorieManager();
        $categorie = $manager->load($id);
        if (!isset($categorie)) {
            if ($request->get('_format') == "html") {
                $categorie = new Categorie();
                $form = $this->createForm(CategorieType::class, $categorie, array('method' => $request->getMethod()));
                $form->handleRequest($request);
                ob_clean();
                return $form;
            }
        }
        else{

            $form = $this->createForm(CategorieType::class, $categorie, array('method' => $request->getMethod()));
            $form->handleRequest($request);
            ob_clean();
            return $form;
        }
//        ob_clean();
        return $categorie;
    }


    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function deleteCategorieAction(Request $request, $id){

        $core = $this->getJsService();
        $manager = $core->getCategorieManager();
        $user=$manager->load($id);
        $manager->delete($user);
        return array("success" => true, "data" => null, "message" => "Attachement type deleted successfully");
    }

    /**
     * @param Request $request
     * @param int $id the user id
     * @return array
     */
    public function postCategorieAction(Request $request, $id)
    {

        try {
            $categorie = new Categorie();
            $core = $this->getJsService();
            $manager = $core->getCategorieManager();

            if (isset($id) && $id > 0) {
                //chargement de l'objet
                $categorie=$manager->load($id);
            }


            $form = $this->createForm(CategorieType::class, $categorie, array('method' => $request->getMethod()));

            $form->handleRequest($request);

            if ($form->isValid()) {

                $image=$categorie->image;
                if(isset($image)){
                    $categorie->upload();
                }
                if (isset($id) && $id > 0) {
                    $categorie = $manager->update($categorie);
                    ob_clean();
                    return array("success" => true, "data" => $categorie, "message" => "Attachement type edited successfully");


                } else {
                    //Ajout d'un auteur
                    $categorie=$manager->create($categorie);
                    ob_clean();
                    return array("success" => true, "data" => $categorie, "message" => "Author created successfully");


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

    public function getCategoriesAction(Request $request){

        $core=$this->getJsService();
        $manager = $core->getCategorieManager();

        $query=$this->getQueryString($request);
        $limit=$this->getLimit($request);
        $page=$this->getPage($request, $limit);


        $categories=$manager->findByQueryString($page, $limit, $query);
        $countMatched=$manager->countByQueryString( $query);
        $countAll=$countMatched;
        $draw=0;
        $result = array("data" => $categories, "success" => true, "message" => "", "recordsFiltered" => $countMatched, "recordsTotal" => $countAll, "draw" => $draw, "page" => $page);

        return $result;

    }

}