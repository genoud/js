<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 21:28
 */

namespace JSAppBundle\Manager;

use JSAppBundle\Dao\NumeroJournalRepository;
use JSAppBundle\Dao\TypeFichierRepository;
use Symfony\Component\DependencyInjection\ContainerInterface as Container;
class NumeroJournalManager extends CoreManager
{

    public function __construct(Container $container, CoreService $core)
    {
        $entityClass="JSAppBundle\Entity\NumeroJournal";
        parent::__construct($container, $core, $entityClass);
    }

    public function findByQueryString($page, $limit, $query)
    {
        $repo=$this->getRepository();
        return $repo->findByQuery($page, $limit, $query);
    }

    public function countByQueryString($query)
    {
        $repo=$this->getRepository();
        return $repo->countByQuery($query);
    }

    /**
     * @return NumeroJournalRepository
     */
    public function getRepository()
    {
        return parent::getRepository(); // TODO: Change the autogenerated stub
    }
}