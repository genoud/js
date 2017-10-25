<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 21:07
 */

namespace JSAppBundle\Dao;


use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use JSAppBundle\Entity\ReviewRequest;
use JSAppBundle\Entity\Utilisateur;

class ReviewRequestRepository extends CoreRepository
{
    /**
     * @param Utilisateur $reviewer
     * @param string $query
     * @return int|mixed
     */
    public function countPendingByReviewer($reviewer, $query){
        $qb = $this->buildQueryPendingByReviewer($reviewer, true);

        $query=$qb->getQuery();

        $count=0;
        try{
            $count=$query->getSingleScalarResult();
        }
        catch(NonUniqueResultException $ex){

        }
        catch(NoResultException $ex){

        }
        return $count;
    }

    /**
     * @param Utilisateur $reviewer
     * @param int $page
     * @param int $limit
     * @param string $query
     * @return ReviewRequest[]
     */
    public function findPendingByReviewer($reviewer, $page, $limit, $query){

        $qb = $this->buildQueryPendingByReviewer($reviewer, false);

        $query=$qb->getQuery();
        if ($page > 0 && $limit > 0) {
            $first = ($page - 1) * $limit;
            return $query->setMaxResults($limit)->setFirstResult($first)->getResult();
        } else {
            return $query->getResult();
        }
    }

    /**
     * @param Utilisateur $reviewer
     * @param boolean $isCount
     * @return \Doctrine\ORM\QueryBuilder
     */
    private function buildQueryPendingByReviewer($reviewer, $isCount=false)
    {
        $qb = $this->createQueryBuilder("rr")
            ->where("rr.reviewer = :reviewer")
            ->andWhere("rr.status = :status")
            ->setParameter("reviewer", $reviewer)
            ->setParameter("status", ReviewRequest::$STATUS_NOT_HANDLED);
        if($isCount){
            $qb->select("count(rr)");
        }
        return $qb;
    }

}