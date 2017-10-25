<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 21:07
 */

namespace JSAppBundle\Dao;


use Doctrine\ORM\NoResultException;
use JSAppBundle\Entity\Auteur;

class AuteurRepository extends CoreRepository
{

    /**
     * @param $page
     * @param $limit
     * @param $query
     * @return Auteur[]
     */
    public function findByQyery($page, $limit, $query)
    {
        $qb = $this->buildQuery($query);
        $query=$qb->getQuery();
        if ($page > 0 && $limit > 0) {
            $first = ($page - 1) * $limit;
            return $query->setMaxResults($limit)->setFirstResult($first)->getResult();
        } else {
            return $query->getResult();
        }

    }

    public function countByQyery($query)
    {
        $qb = $this->buildQuery($query, true);

        $query=$qb->getQuery();

        try {
            $count = $query->getSingleScalarResult();
        } catch (NoResultException $e) {
            $count = 0;
        }
        return $count;
    }

    /**
     * @param $query
     * @return \Doctrine\ORM\QueryBuilder
     */
    private function buildQuery($query, $isCount=false)
    {
        $query = str_replace(" ", "%", $query);
        $query="%".$query."%";
        $qb = $this->createQueryBuilder("a")
            ->join("a.personne", "p")
            ->where("p.nom like :query")
            ->orWhere("p.prenom like :query")
            ->orWhere("p.telephone like :query")
            ->orWhere("p.email like :query")
            ->orWhere("p.adresse like :query")
            ->orWhere("p.ville like :query")
            ->orWhere("p.pays like :query")
            ->setParameter("query", $query);
        if($isCount){
            $qb->select("count(a)");
        }
        return $qb;
    }
}