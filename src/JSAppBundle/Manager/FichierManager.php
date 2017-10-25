<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 21:21
 */

namespace JSAppBundle\Manager;

use JSAppBundle\Entity\Article;
use JSAppBundle\Entity\Fichier;
use JSAppBundle\Entity\Review;
use Symfony\Component\DependencyInjection\ContainerInterface as Container;
class FichierManager extends CoreManager
{
    public function __construct(Container $container, CoreService $core)
    {
        $entityClass="JSAppBundle\Entity\Fichier";
        parent::__construct($container, $core, $entityClass);
    }

    /**
     * @param Fichier $fichier
     * @return mixed
     * @throws \Exception
     */
    public function createFichier($fichier){

        $state=$this->beginTransaction();
        try{
            $fichier=$this->create($fichier);
            $this->commitTransaction($state);
            return $fichier;
        }
        catch(\Exception $ex){
            $this->rollbackTransaction($state);
            throw $ex;
        }
    }

    /**
     * @param Fichier $fichier
     * @return mixed
     * @throws \Exception
     */
    public function updateFichier($fichier){
        $state=$this->beginTransaction();
        try{
            $fichier=$this->update($fichier);
            $this->commitTransaction($state);
            return $fichier;
        }
        catch(\Exception $ex){
            $this->rollbackTransaction($state);
            throw $ex;
        }
    }

    /**
     * @param Article $article
     * @return Fichier[]
     */
    public function getFichiersByArticle($article)
    {
        $repo=$this->getRepository();
        $data=$repo->findByArticle($article);
        return $data;
    }

    /**
     * @param Review $review
     * @return Fichier[]
     */
    public function getFichiersByReview($review)
    {
        $repo=$this->getRepository();
        $data=$repo->findByArticle($review);
        return $data;
    }

}