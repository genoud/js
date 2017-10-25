<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 24/08/2016
 * Time: 23:32
 */

namespace JSAppBundle\Controller;


use JSAppBundle\Entity\Typefichier;
use JSAppBundle\Form\TypefichierType;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Context\Context;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\Annotations as REST;

class TypeFichierController extends CoreRestController
{

    /**
     * Get single TypeFichier,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\TypeFichier",
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
     * @return Typefichier|Form
     * @Route("/api/v1/typetichier/{id}.{_format}", name="get-typefichier")
     * @throws NotFoundHttpException when page not exist
     */
    public function getTypefichierAction(Request $request, $id)
    {

        $core = $this->getJsService();
        $manager = $core->getTypefichierManager();
        $typeFichier = $manager->load($id);
        if (!isset($typeFichier)) {
            if ($request->get('_format') == "html") {
                $typeFichier = new Typefichier();
                $form = $this->createForm(TypefichierType::class, $typeFichier, array('method' => $request->getMethod()));
                $form->handleRequest($request);
                ob_clean();
                return $form;
            }
        }
        else{

            $form = $this->createForm(TypefichierType::class, $typeFichier, array('method' => $request->getMethod()));
            $form->handleRequest($request);
            ob_clean();
            return $form;
        }
//        ob_clean();
        return $typeFichier;
    }


    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function deleteTypefichierAction(Request $request, $id){

        $core = $this->getJsService();
        $manager = $core->getTypefichierManager();
        $user=$manager->load($id);
        $manager->delete($user);
        return array("success" => true, "data" => null, "message" => "Attachement type deleted successfully");
    }

    /**
     * @param Request $request
     * @param int $id the user id
     * @return array
     */
    public function postTypefichierAction(Request $request, $id)
    {

        try {
            $typeFichier = new Typefichier();
            $core = $this->getJsService();
            $manager = $core->getTypefichierManager();

            if (isset($id) && $id > 0) {
                //chargement de l'objet
                $typeFichier=$manager->load($id);
            }


            $form = $this->createForm(TypefichierType::class, $typeFichier, array('method' => $request->getMethod()));

            $form->handleRequest($request);

            if ($form->isValid()) {

                if (isset($id) && $id > 0) {
                    $typeFichier = $manager->update($typeFichier);
                    ob_clean();
                    return array("success" => true, "data" => $typeFichier, "message" => "Attachement type edited successfully");


                } else {
                    //Ajout d'un auteur
                    $typeFichier=$manager->create($typeFichier);
                    ob_clean();
                    return array("success" => true, "data" => $typeFichier, "message" => "Author created successfully");


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

    public function getTypefichiersAction(Request $request){

        $core=$this->getJsService();
        $manager = $core->getTypeFichierManager();

        $query=$this->getQueryString($request);
        $limit=$this->getLimit($request);
        $page=$this->getPage($request, $limit);


        $typesFichiers=$manager->findByQueryString($page, $limit, $query);
        $countMatched=$manager->countByQueryString( $query);
        $countAll=$countMatched;
        $draw=0;
        $result = array("data" => $typesFichiers, "success" => true, "message" => "", "recordsFiltered" => $countMatched, "recordsTotal" => $countAll, "draw" => $draw, "page" => $page);

        return $result;

    }


}