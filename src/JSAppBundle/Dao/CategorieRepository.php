<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 21:08
 */

namespace JSAppBundle\Dao;


use Doctrine\ORM\NoResultException;

class CategorieRepository extends CoreRepository
{

    public function findByQuery($page, $limite, $query)
    {
        $query=str_replace(" ","%", $query);
        $query="%".$query."%";

        $qb = $this->createQueryBuilder("c")
            ->select("c")
            ->where("c.intitule like :query")
            ->orWhere("c.description like :query")
            ->setParameter("query", $query);

        $query = $qb->getQuery();
        if ($page > 0 && $limite > 0) {
            $first = ($page - 1) * $limite;
            return $query->setMaxResults($limite)->setFirstResult($first)->getResult();
        } else {
            return $query->getResult();
        }

    }

    public function countByQuery($query)
    {
        $query=str_replace(" ","%", $query);
        $query="%".$query."%";

        $qb = $this->createQueryBuilder("c")
            ->select("count(c) as total")
            ->where("c.intitule like :query")
            ->orWhere("c.description like :query")
            ->setParameter("query", $query);

        $query = $qb->getQuery();
        try {
            $count = $query->getSingleScalarResult();
        } catch (NoResultException $e) {
            $count = 0;
        }
        return $count;
    }
}