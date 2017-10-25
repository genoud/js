<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 24/08/2016
 * Time: 23:32
 */

namespace JSAppBundle\Controller;


use JSAppBundle\Entity\Utilisateur;
use JSAppBundle\Form\RegistrationType;
use JSAppBundle\Form\UtilisateurType;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Context\Context;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\Annotations as REST;

class UtilisateurController extends CoreRestController
{

    /**
     * Get single Utilisateur,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\Utilisateur",
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
     * @return Utilisateur|Form
     * @Route("/api/v1/utilisateur/{id}.{_format}", name="get-utilisateur")
     * @throws NotFoundHttpException when page not exist
     */
    public function getUtilisateurAction(Request $request, $id)
    {

        $core = $this->getJsService();
        $manager = $core->getUtilisateurManager();
        var_dump($id);
        $user = $manager->load($id);
        if (!isset($user)) {
            if ($request->get('_format') == "html") {
                $user = new Utilisateur();
                $form = $this->createForm(UtilisateurType::class, $user, array('method' => $request->getMethod()));
                $form->handleRequest($request);
                ob_clean();
                return $form;
            }
        } else {

            $form = $this->createForm(UtilisateurType::class, $user, array('method' => $request->getMethod()));
            $form->handleRequest($request);
            ob_clean();
            return $form;
        }
//        ob_clean();
        return $user;
    }

    /**
     * Get single Utilisateur,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\Utilisateur",
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
     * @return Utilisateur|Form
     * @Route("/api/v1/registration.{_format}", name="get-registration")
     * @throws NotFoundHttpException when page not exist
     */
    public function getRegistrationAction(Request $request)
    {

        $core = $this->getJsService();
        $manager = $core->getUtilisateurManager();

        $user = new Utilisateur();

        if ($request->get('_format') == "html") {
            $user = new Utilisateur();
            $form = $this->createForm(RegistrationType::class, $user, array('method' => $request->getMethod()));
            $form->handleRequest($request);
            ob_clean();
            return $form;
        }

        return $user;
    }


    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function deleteUtilisateurAction(Request $request, $id)
    {

        $core = $this->getJsService();
        $manager = $core->getUtilisateurManager();
        $user = $manager->load($id);
        $manager->delete($user);
        return array("success" => true, "data" => null, "message" => "CoAuthor deleted successfully");


    }

    /**
     * @param Request $request
     * @param int $id the user id
     * @return array
     */
    public function postUtilisateurAction(Request $request, $id)
    {

        try {
            $user = new Utilisateur();
            $core = $this->getJsService();
            $manager = $core->getUtilisateurManager();

            if (isset($id) && $id > 0) {
                //chargement de l'objet
                $user = $manager->load($id);
            }


            $form = $this->createForm(UtilisateurType::class, $user, array('method' => $request->getMethod()));

//            $form->submit($request->get("auteur"), 'PATCH' !== $request->getMethod());

//            var_dump($request->request);
            $form->handleRequest($request);

            if ($form->isValid()) {
//                $coauteur = $form->getData();

                if (isset($id) && $id > 0) {
                    //modification d'un auteur

//                    $coauteur->setId($id);

                    $user = $manager->update($user);
                    ob_clean();
                    return array("success" => true, "data" => $user, "message" => "CoAuthor edited successfully");


                } else {
                    //Ajout d'un auteur
                    $user = $manager->create($user);
                    ob_clean();
                    return array("success" => true, "data" => $user, "message" => "Author created successfully");


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

    /**
     * @param Request $request
     * @param int $id the user id
     * @return array
     */
    public function postRegistrationAction(Request $request)
    {

        try {
            $user = new Utilisateur();
            $core = $this->getJsService();
            $manager = $core->getUtilisateurManager();

            $form = $this->createForm(RegistrationType::class, $user, array('method' => $request->getMethod()));

//            $form->submit($request->get("auteur"), 'PATCH' !== $request->getMethod());

//            var_dump($request->request);
            $form->handleRequest($request);

            if ($form->isValid()) {
//                $coauteur = $form->getData();

                //Ajout d'un auteur
                $user = $manager->register($user);
                ob_clean();
                return array("success" => true, "data" => $user, "message" => "User registered successfully");

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


    public function getUtilisateursAction(Request $request)
    {

        $core = $this->getJsService();
        $manager = $core->getUtilisateurManager();

        $query = $this->getQueryString($request);
        $limit = $request->query->get("length");
        $page = $this->getPage($request, $limit);


        $typesFichiers = $manager->findByQueryString($page, $limit, $query);
        $countMatched = $manager->countByQueryString($query);
        $countAll = $countMatched;
        $draw = 0;
        $result = array("data" => $typesFichiers, "success" => true, "message" => "", "recordsFiltered" => $countMatched, "recordsTotal" => $countAll, "draw" => $draw, "page" => $page);

        return $result;

    }


    public function getEditorsAction(Request $request)
    {

        $core = $this->getJsService();
        $manager = $core->getUtilisateurManager();

        $query = $this->getQueryString($request);
        $limit = $this->getLimit($request);
        $page = $this->getPage($request, $limit);


        $editors = $manager->findEditorsByQueryString($page, $limit, $query);
        $countMatched = $manager->countEditorsByQueryString($query);
        $countAll = $countMatched;
        $draw = 0;
        $result = array("data" => $editors, "success" => true, "message" => "", "recordsFiltered" => $countMatched, "recordsTotal" => $countAll, "draw" => $draw, "page" => $page);

        return $result;

    }


    public function getReviewersAction(Request $request)
    {

        $core = $this->getJsService();
        $manager = $core->getUtilisateurManager();

        $query = $this->getQueryString($request);
        $limit = $this->getLimit($request);
        $page = $this->getPage($request, $limit);

        $reviewers = $manager->findReviewersByQueryString($page, $limit, $query);
        $countMatched = $manager->countReviewersByQueryString($query);
        $countAll = $countMatched;
        $draw = 0;
        $result = array("data" => $reviewers, "success" => true, "message" => "Test service", "recordsFiltered" => $countMatched, "recordsTotal" => $countAll, "draw" => $draw, "page" => $page);

        return $result;

    }


}