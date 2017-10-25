<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 22:07
 */

namespace JSAppBundle\Controller;


use FOS\RestBundle\Controller\FOSRestController;
use JSAppBundle\Manager\CoreService;
use Swift_Attachment;
use Swift_Message;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

class CoreRestController extends FOSRestController
{

    /**
     * @return CoreService
     */
    public function getJsService()
    {
        return $core = $this->container->get("js_app.core");
    }

    /**
     * @return Request
     */
    protected function getCurrentRequest()
    {
        $request = $this->getRequestStack()->getCurrentRequest();
        return $request;
    }

    /**
     * @return RequestStack
     */
    protected function getRequestStack()
    {
        $requeStack = $this->get('request_stack');
        return $requeStack;
    }

    /**
     * @param Request $request
     * @param $limit
     * @return float|int
     */
    protected function getPage(Request $request, $limit)
    {
        $page = $request->query->getInt("page");
        if (isset($page) && $page > 0) {
            return $page;
        }
        $start = $request->query->get("start");
        $page = 1;
        if (isset($start) && isset($limit)) {
            $page = (int)$start / $limit;
            $page++;
            return $page;
        }
        return $page;
    }
    /**
     * @param Request $request
     * @return int
     */
    protected function getLimit(Request $request)
    {
        $limit = $request->query->getInt("length");
        if (isset($limit)) {
            if ($limit <= 0) {
                $limit = 10;
            }
        } else {
            $limit = $request->query->getInt("limit");
            if(!isset($limit) || $limit<=0){
                $limit = 10;
            }
        }

        return $limit;
    }

    protected function getQueryString($request)
    {
        $query = $request->query->get("search");
        if (isset($query) && is_array($query)) {
            $query = $query["value"];
        } else {
            $query = "";
        }
        if ($query === "") {
            $query = $request->query->get("q");
            if (!isset($query)) {
                $query = $request->query->get("query");
                if (!isset($query)) {
                    $query = "";
                }
            }
        }
        return $query;
    }

    public function sendEmail($objet, $destinataire, $content, $from = "contact@capvcm.com", $attachments = array())
    {

        $message = Swift_Message::newInstance()
            ->setSubject($objet)
            ->setFrom($from)
            ->setTo($destinataire)
            ->setBody(
                $content,
                'text/html'
            );

        if (count($attachments) > 0) {
            foreach ($attachments as $attachment) {
                $message->attach(Swift_Attachment::fromPath($attachment));
            }
        }

        $this->get('mailer')->send($message);
    }

//
//    public function sendEmail($objet, $destinataire, $content, $from = "contact@capvcm.com", $attachments=array()) {
//
//        $message = Swift_Message::newInstance()
//            ->setSubject($objet)
//            ->setFrom($from)
//            ->setTo($destinataire)
//            ->setBody(
//                "Test", 'text/plain'
//            )
//        ;
//
////        if(count($attachments)>0){
////            foreach($attachments as $attachment){
////                $message->attach(Swift_Attachment::fromPath('my-document.pdf'));
////            }
////        }
//        $this->get('mailer')->send($message);
//    }


}