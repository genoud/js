<?php
namespace JSAppBundle\Dao;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Doctrine\ORM\QueryBuilder;

/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 20:57
 */
class CoreRepository extends EntityRepository
{


    /**
     * @param QueryBuilder $qb
     * @return int
     */
    protected function getSingleScalarResult($qb){
        $query=$qb->getQuery();

        $value=0;
        try{
            $value=$query->getSingleScalarResult();
        }
        catch(NonUniqueResultException $ex){

        }
        catch(NoResultException $ex){

        }
        return $value;
    }

    /**
     * @param QueryBuilder $qb
     * @param int $page
     * @param int $limit
     * @return mixed
     */
    protected function getResultPage($qb, $page, $limit){
        $query=$qb->getQuery();
        if ($page > 0 && $limit > 0) {
            $first = ($page - 1) * $limit;
            return $query->setMaxResults($limit)->setFirstResult($first)->getResult();
        } else {
            return $query->getResult();
        }
    }

}