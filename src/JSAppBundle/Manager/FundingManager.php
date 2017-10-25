<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 02/11/2016
 * Time: 21:56
 */

namespace JSAppBundle\Manager;


use JSAppBundle\Dao\CoAuteurRepository;
use JSAppBundle\Dao\FundingRepository;
use JSAppBundle\Entity\Funding;
use Symfony\Component\DependencyInjection\ContainerInterface as Container;

class FundingManager extends CoreManager
{

    public function __construct(Container $container, CoreService $core)
    {
        $entityClass="JSAppBundle\Entity\Funding";
        parent::__construct($container, $core, $entityClass);
    }

    /**
     * @param Funding $funding
     * @return Funding
     * @throws \Exception
     */
    public function createFunding(Funding $funding){

        $state=$this->beginTransaction();
        try{

            $funding=$this->create($funding);

            $this->commitTransaction($state);
            return $funding;
        }
        catch(\Exception $ex){
            $this->rollbackTransaction($state);
            throw $ex;
        }
    }

    /**
     * @param Funding $funding
     * @return Funding
     * @throws \Exception
     */
    public function updateFunding(Funding $funding){

        $state=$this->beginTransaction();
        try{

            $funding=$this->update($funding);

            $this->commitTransaction($state);
            return $funding;
        }
        catch(\Exception $ex){
            $this->rollbackTransaction($state);
            throw $ex;
        }
    }

    /**
     * Return the author of an article
     * @param $article
     * @return Funding[]
     */
    public function getFundingByArticle($article){
        $repo=$this->getRepository();
        $data=$repo->findByArticle($article);
        return $data;
    }

    /**
     * @return FundingRepository
     */
    public function getRepository()
    {
        return parent::getRepository();
    }
}