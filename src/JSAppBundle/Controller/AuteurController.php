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
use FOS\RestBundle\Controller\Annotations as REST;

class AuteurController extends CoreRestController
{

    /**
     * Get single Author,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\Auteur",
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
     * @return Auteur|Form
     *
     * @throws NotFoundHttpException when page not exist
     */
    public function getAuteurAction(Request $request, $id)
    {

        $core = $this->getJsService();
        $manager = $core->getAuteurManager();
        $auteur = $manager->load($id);
        if (!isset($auteur)) {
            if ($request->get('_format') == "html") {
                $auteur = new Auteur();
                $form = $this->createForm(AuteurType::class, $auteur, array('method' => $request->getMethod()));
                $form->handleRequest($request);
                ob_clean();
                return $form;
            }
        }
//        ob_clean();
        return $auteur;
    }



    /**
     * @param Request $request
     * @param int $id the author id
     * @return array
     */
    public function postAuteurAction(Request $request, $id)
    {

        try {
            $auteur = new Auteur();
            $core = $this->getJsService();
            $manager = $core->getAuteurManager();


            $form = $this->createForm(AuteurType::class, $auteur, array('method' => $request->getMethod()));

//            $form->submit($request->get("auteur"), 'PATCH' !== $request->getMethod());

//            var_dump($request->request);
            $form->handleRequest($request);

            if ($form->isValid()) {
                $auteur = $form->getData();
                if (isset($id) && $id > 0) {
                    //modification d'un auteur
                    $auteur = $manager->update($auteur);
                    ob_clean();
                    return array("success" => true, "data" => $auteur, "message" => "Agence modifiée avec succès");


                } else {
                    //Ajout d'un auteur
                    $auteur=$manager->create($auteur);
                    ob_clean();
                    return array("success" => true, "data" => $auteur, "message" => "Auteur créé avec succès");


                }
            } else {
                $errors = $form->getErrors($deep = true);
                ob_clean();
                return array("success" => false, "message" => "Le formulaire contient des erreurs. Veuilez vérifier.", "errors" => $errors);
            }

        } catch (\Exception $ex) {
            ob_clean();
            return array("success" => false, "message" => $ex->getMessage());
        }

    }

    /**
     * @param Request $request
     * @param int $id the author id
     * @return array
     */
    public function postRegistrationAction(Request $request, $id)
    {

        try {
            $auteur = new Auteur();
            $core = $this->getJsService();
            $manager = $core->getAuteurManager();


            $form = $this->createForm(AuteurType::class, $auteur, array('method' => $request->getMethod()));


            $form->submit($request->get("auteur"), 'PATCH' !== $request->getMethod());

            if ($form->isValid()) {
                $auteur = $form->getData();
                if (isset($id) && $id > 0) {
                    //modification d'un auteur
                    $auteur = $manager->update($auteur);
                    ob_clean();
                    return array("success" => true, "data" => $auteur, "message" => "Auteur modifiée avec succès");


                } else {
                    //Ajout d'un auteur

                    $auteur=$manager->create($auteur);
                    ob_clean();
                    return array("success" => true, "data" => $auteur, "message" => "Auteur créé avec succès");


                }
            } else {
                $errors = $form->getErrors($deep = true);
                // var_dump($agence);
                ob_clean();
                return array("success" => false, "message" => "Le formulaire contient des erreurs. Veuilez vérifier.", "errors" => $errors);
            }

        } catch (\Exception $ex) {
            ob_clean();
            return array("success" => false, "message" => $ex->getMessage());
        }

    }

    public function getAuteursAction(Request $request){

        $core=$this->getJsService();
        $manager = $core->getAuteurManager();

        $query=$this->getQueryString($request);
        $limit=$this->getLimit($request);
        $page=$this->getPage($request, $limit);


        $auteurs=$manager->findByQueryString($page, $limit, $query);
        $countMatched=$manager->countByQueryString( $query);
        $countAll=$countMatched;
        $draw=0;
        $result = array("data" => $auteurs, "success" => true, "message" => "", "recordsFiltered" => $countMatched, "recordsTotal" => $countAll, "draw" => $draw, "page" => $page);

        return $result;

    }

}