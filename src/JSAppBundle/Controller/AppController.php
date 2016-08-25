<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 24/08/2016
 * Time: 23:56
 */

namespace JSAppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class AppController extends Controller
{

    /**
     * @Route("/edition", name="js-edition-home")
     * @param Request $request
     * @return Response
     */
    public function editionAction(Request $request) {

//        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_ANONYMOUSLY')) {
//            throw $this->createAccessDeniedException("Unable access to this page");
//        }

        $user = $this->getUser();

        return $this->render('JSAppBundle:Edition:index.html.twig', array(
                "user" => $user
            )
        );

    }

    /**
     * @Route("/public", name="js-public-home1")
     * @Route("/", name="js-public-home2")
     * @param Request $request
     * @return Response
     */
    public function publicAction(Request $request) {

//        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_ANONYMOUSLY')) {
//            throw $this->createAccessDeniedException("Unable access to this page");
//        }

        $user = $this->getUser();

        return $this->render('JSAppBundle:Public:index.html.twig', array(
                "user" => $user
            )
        );

    }

    /**
     * @Route("/admin", name="js-admin-home")
     * @param Request $request
     * @return Response
     */
    public function adminAction(Request $request) {

//        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_ANONYMOUSLY')) {
//            throw $this->createAccessDeniedException("Unable access to this page");
//        }

        $user = $this->getUser();

        return $this->render('JSAppBundle:Admin:index.html.twig', array(
                "user" => $user
            )
        );

    }

}