<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 21:09
 */

namespace JSAppBundle\Dao;


use Doctrine\ORM\QueryBuilder;
use JSAppBundle\Entity\Review;
use JSAppBundle\Entity\Utilisateur;

class ReviewRepository extends CoreRepository
{

    /**
     * @param Utilisateur $reviewer
     * @param string $status
     * @param string $query
     * @return int
     */
    public function countByReviewerByStatus($reviewer, $status, $query=null)
    {
        $qb=$this->buildQuery($reviewer, $status, true);
        $this->addQueryString($qb, $query);
        return $this->getSingleScalarResult($qb);

    }



    /**
     * @param Utilisateur $reviewer
     * @param string $status
     * @param int $page
     * @param int $limit
     * @param string $query
     * @return Review[]
     */
    public function findByReviewerByStatus($reviewer, $status, $page, $limit, $query=null)
    {
        $qb=$this->buildQuery($reviewer, $status, false);
        $this->addQueryString($qb, $query);
//        var_dump($qb->getQuery()->getSQL());
        return $this->getResultPage($qb, $page, $limit);

    }

    /**
     * @param QueryBuilder $qb
     * @param string $query
     */
    private function addQueryString($qb, $query){
        if(isset($query) && $query!=""){
            $query=str_replace(" ", "%", $query);
            $query="%".$query."%";

            $qb->leftJoin("r.reviewer", "u")
                ->leftJoin('u.personne', "p")
                ->leftJoin("r.article", "a")
                ->leftJoin("a.typeArticle", "t")
                ->leftJoin("a.categories", "c")
                ->andWhere("(r.titre like :query
                or r.content like :query
                or r.appreciation like :query
                p.nom like :query
                or p.prenom like :query
                or p.telephone like :query
                or p.email like :query
                or a.titreCourt like :query
                or a.abstract like :query
                or a.motscles like :query
                or t.libelle like :query
                or c.intitule like :query)")
            ->setParameter("query", $query);

        }
    }

    /**
     * @param $reviewer
     * @param $status
     * @param $isCount
     * @return QueryBuilder
     */
    private function buildQuery($reviewer=null, $status=null, $isCount=false){
        $qb=$this->createQueryBuilder("r")
            ->where("1=1");

        if($isCount){
            $qb->select("count(r)");
        }
        if(isset($reviewer)){
            $qb->andWhere("r.reviewer = :reviewer")
                ->setParameter("reviewer", $reviewer);
        }
        if(isset($status) && $status!=""){
            $qb->andWhere("r.statut = :statut")
                ->setParameter("statut", $status);
        }
        return $qb;
    }
}