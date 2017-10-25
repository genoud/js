<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 24/08/2016
 * Time: 23:32
 */

namespace JSAppBundle\Controller;


use JSAppBundle\Entity\NumeroJournal;
use JSAppBundle\Entity\Typefichier;
use JSAppBundle\Form\NumeroJournalType;
use JSAppBundle\Form\TypefichierType;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Context\Context;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\Annotations as REST;

class NumeroJournalController extends CoreRestController
{

    /**
     * Get single TypeFichier,
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Gets a Page for a given id",
     *   output = "JSAppBundle\Entity\NumeroJournal",
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
     * @return NumeroJournal|Form
     * @Route("/api/v1/numero/{id}.{_format}", name="get-numerojournal")
     * @throws NotFoundHttpException when page not exist
     */
    public function getNumerojournalAction(Request $request, $id)
    {

        $core = $this->getJsService();
        $manager = $core->getNumeroJournalManager();
        $numeroJournal = $manager->load($id);
        if (!isset($numeroJournal)) {
            if ($request->get('_format') == "html") {
                $numeroJournal = new NumeroJournal();
                $form = $this->createForm(NumeroJournalType::class, $numeroJournal, array('method' => $request->getMethod()));
                $form->handleRequest($request);
                ob_clean();
                return $form;
            }
        }
        else{

            $form = $this->createForm(NumeroJournalType::class, $numeroJournal, array('method' => $request->getMethod()));
            $form->handleRequest($request);
            ob_clean();
            return $form;
        }
//        ob_clean();
        return $numeroJournal;
    }


    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function deleteNumerojournalAction(Request $request, $id){

        $core = $this->getJsService();
        $manager = $core->getNumeroJournalManager();
        $user=$manager->load($id);
        $manager->delete($user);
        return array("success" => true, "data" => null, "message" => "Journal Number deleted successfully");
    }

    /**
     * @param Request $request
     * @param int $id the user id
     * @return array
     */
    public function postNumerojournalAction(Request $request, $id)
    {

        try {
            $numeroJournal = new NumeroJournal();
            $core = $this->getJsService();
            $manager = $core->getNumeroJournalManager();

            if (isset($id) && $id > 0) {
                //chargement de l'objet
                $numeroJournal=$manager->load($id);
            }


            $form = $this->createForm(NumeroJournalType::class, $numeroJournal, array('method' => $request->getMethod()));

            $form->handleRequest($request);

            if ($form->isValid()) {

                if (isset($id) && $id > 0) {
                    $numeroJournal = $manager->update($numeroJournal);
                    ob_clean();
                    return array("success" => true, "data" => $numeroJournal, "message" => "Journal Number edited successfully");


                } else {
                    //Ajout d'un auteur
                    $numeroJournal=$manager->create($numeroJournal);
                    ob_clean();
                    return array("success" => true, "data" => $numeroJournal, "message" => "Journal Number successfully");


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

    public function getNumerojournalsAction(Request $request){

        $core=$this->getJsService();
        $manager = $core->getNumeroJournalManager();

        $query=$this->getQueryString($request);
        $limit=$this->getLimit($request);
        $page=$this->getPage($request, $limit);


        $numeroJournals=$manager->findByQueryString($page, $limit, $query);
        $countMatched=$manager->countByQueryString( $query);
        $countAll=$countMatched;
        $draw=0;
        $result = array("data" => $numeroJournals, "success" => true, "message" => "", "recordsFiltered" => $countMatched, "recordsTotal" => $countAll, "draw" => $draw, "page" => $page);

        return $result;

    }


}