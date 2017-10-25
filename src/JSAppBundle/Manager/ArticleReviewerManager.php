<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 02/11/2016
 * Time: 21:56
 */

namespace JSAppBundle\Manager;


use JSAppBundle\Dao\ArticleReviewerRepository;
use JSAppBundle\Entity\ArticleReviewer;
use Symfony\Component\DependencyInjection\ContainerInterface as Container;

class ArticleReviewerManager extends CoreManager
{

    public function __construct(Container $container, CoreService $core)
    {
        $entityClass="JSAppBundle\Entity\ArticleReviewer";
        parent::__construct($container, $core, $entityClass);
    }

    /**
     * @param ArticleReviewer $articleReviewer
     * @return mixed
     * @throws \Exception
     */
    public function createArticelReviewer(ArticleReviewer $articleReviewer){

        $state=$this->beginTransaction();
        try{
            
            $articleReviewer=$this->create($articleReviewer);

            $this->commitTransaction($state);
            return $articleReviewer;
        }
        catch(\Exception $ex){

            $this->rollbackTransaction($state);
            throw $ex;
        }
    }

    public function updateArticleReviewer(ArticleReviewer $ArticleReviewer){

        $state=$this->beginTransaction();
        try{
            $ArticleReviewer=$this->update($ArticleReviewer);

            $this->commitTransaction($state);
            return $ArticleReviewer;
        }
        catch(\Exception $ex){
            $this->rollbackTransaction($state);
            throw $ex;
        }
    }

    /**
     * Return the author of an article
     * @param $article
     * @return ArticleReviewer[]
     */
    public function getArticleReviewersByArticle($article, $opposed, $suggested){
        $repo=$this->getRepository();
        $data=array();
        if($opposed){
            $data=$repo->findByArticleOpposed($article);
        }
        else if($suggested){
            $data=$repo->findByArticleSuggested($article);
        }
        else{
            $data=$repo->findAll();
        }

        return $data;
    }

    /**
     * @return ArticleReviewerRepository
     */
    public function getRepository()
    {
        return parent::getRepository();
    }
}