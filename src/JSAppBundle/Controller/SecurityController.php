<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 11/06/2016
 * Time: 13:16
 */

namespace JSAppBundle\Controller;


use JSAppBundle\Entity\Utilisateur;
use JSAppBundle\Form\LoginType;
use Monolog\Logger;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class SecurityController extends CoreRestController
{

    /**
     * @Route("/login", name="js_login", options={"expose"=true})
     * @param Request $request
     * @return Response $response
     */
    public function loginAction(Request $request){

        $authenticationUtils = $this->get('security.authentication_utils');

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        $user=new Utilisateur();

        $core = $this->getJsService();
        $manager = $core->getUtilisateurManager();

        $form = $this->createForm(LoginType::class, $user, array('method' => $request->getMethod()));
        $form->handleRequest($request);



        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        $user->setUsername($lastUsername);

        ob_clean();

        return $this->render(
            'JSAppBundle::login_page.html.twig',
            array(
                // last username entered by the user
                'last_username' => $lastUsername,
                'error'         => $error,
                "form"=>$form->createView()
            )
        );
    }

    /**
     * @Route("/login/form", name="js_login_form", options={"expose"=true})
     * @param Request $request
     * @return  Response $response
     */
    public function loginFormAction(Request $request){

        $authenticationUtils = $this->get('security.authentication_utils');

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        $user=new Utilisateur();

        $form = $this->createForm(LoginType::class, $user, array('method' => $request->getMethod()));
        $form->handleRequest($request);



        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        $user->setUsername($lastUsername);

        ob_clean();

        return $this->render(
            'JSAppBundle::login_form.html.twig',
            array(
                // last username entered by the user
                'last_username' => $lastUsername,
                'error'         => $error,
                "form"=>$form->createView()
            )
        );
    }

    /**
     * @Route("/login/check", name="js_login_check", options={"expose"=true})
     * @Route("/check", name="js_check", options={"expose"=true})
     */
    public function loginCheckAction(Request $request){

        $core=$this->getJsService();
        $manager=$core->getUtilisateurManager();

        $manager->getLogger()->log(Logger::ERROR, "Check controller");

        $authenticationUtils = $this->get('security.authentication_utils');

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        $user=new Utilisateur();

        $form = $this->createForm(LoginType::class, $user, array('method' => $request->getMethod()));
        $form->handleRequest($request);

        if($form->isValid()){

            $dbUser=$manager->loadByUsername($user->getUsername());
            if(!isset($dbUser)){
                return array("success"=>false, "message"=>"Authentication failed! user not found");
            }
            $cryptedPassword=$manager->cryptPassword($user, $user->getMotDePasse());
            $password=$dbUser->getPassword();
            if($cryptedPassword===$password){
                $this->loginUser($request, $dbUser);
                return array("success"=>true, "message"=>"User Authenticated successfully");
            }
            else{
                return array("success"=>false, "message"=>"Authentication failed! Password incorrect");
            }
        }
        else{
            if($request->isXmlHttpRequest()){

                return array("success"=>false, "message"=>"Form is not valid, please check");

            }else{
                $lastUsername = $authenticationUtils->getLastUsername();
                $user->setUsername($lastUsername);

                return $this->render(
                    'JSAppBundle::login_page.html.twig',
                    array(
                        // last username entered by the user
                        'last_username' => $lastUsername,
                        'error'         => $error,
                        "form"=>$form->createView()
                    )
                );
            }
        }

    }


    /**
     * @Route("/registration", name="js_registration")
     */
    public function registrationAction(){

        $authenticationUtils = $this->get('security.authentication_utils');

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        ob_clean();

        return $this->render(
            'JSAppBundle:Public:registration.html.twig',
            array(
                // last username entered by the user
                'last_username' => $lastUsername,
                'error'         => $error,
            )
        );
    }

    public function loginUser(Request $request, UserInterface $user){

        $token = new UsernamePasswordToken($user, $user->getPassword(), "core_secured_area", $user->getRoles());

        $this->get("security.token_storage")->setToken($token);

        // Déclencher l'évènement d'authentification
        $event = new InteractiveLoginEvent($request, $token);
        $this->get("event_dispatcher")->dispatch("security.interactive_login", $event);

        return true;

    }
}