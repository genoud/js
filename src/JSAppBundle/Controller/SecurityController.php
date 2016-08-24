<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 11/06/2016
 * Time: 13:16
 */

namespace U2g\Axtincal\ERatingBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class SecurityController extends Controller
{

    /**
     * @Route("/login", name="erating_login")
     */
    public function loginAction(){

        $authenticationUtils = $this->get('security.authentication_utils');

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        ob_clean();

        return $this->render(
            'U2gAxtincalERatingBundle::login_form.html.twig',
            array(
                // last username entered by the user
                'last_username' => $lastUsername,
                'error'         => $error,
            )
        );
    }
}