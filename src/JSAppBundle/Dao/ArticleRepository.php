<?php
namespace JSAppBundle\Dao;
use Doctrine\ORM\NoResultException;
use Doctrine\ORM\QueryBuilder;
use JSAppBundle\Entity\Article;
use JSAppBundle\Entity\ReviewRequest;
use JSAppBundle\Entity\Utilisateur;

/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 21:03
 */
class ArticleRepository extends CoreRepository
{

    /**
     * @param string $statut
     * @param Utilisateur $user
     * @return int|mixed
     */
    public function countByStatusByUser($statut, $user,  $query=""){
        $qb=$this->createQueryBuilder("a")
            ->select("count(a) as total")
            ->where("a.statut = :statut")
            ->andWhere("a.utilisateur = :utilisateur")
            ->andWhere("a.revision is null")
            ->setParameter("statut", $statut)
            ->setParameter("utilisateur", $user);

        try {
            $count = $qb->getQuery()->getSingleScalarResult();
        } catch (NoResultException $e) {
            $count = 0;
        }
        return $count;

    }

    /**
     * @param string $statut
     * @param Utilisateur $user
     * @param int $page
     * @param int $limite
     * @return Article[]
     */
    public function findByStatusByUser($statut, $user, $page = -1, $limite = -1, $query="") {

            $qb = $this->createQueryBuilder("a")
                ->select("a")
                ->where("a.statut = :statut")
                ->andWhere("a.utilisateur = :utilisateur")
                ->andWhere("a.revision is null")
                ->setParameter("statut", $statut)
                ->setParameter("utilisateur", $user);

        $query = $qb->getQuery();
        if ($page > 0 && $limite > 0) {
            $first = ($page - 1) * $limite;
            return $query->setMaxResults($limite)->setFirstResult($first)->getResult();
        } else {
            return $query->getResult();
        }
    }

    /**
     * @param string $articleIds
     * @param Utilisateur $editor
     * @return mixed
     */
    public function setEditors($articleIds, $editor)
    {
        $qb = $this->createQueryBuilder('a')
            ->update('JSAppBundle\Entity\Article', 'a')
            ->set('a.editeur',':editeur')
            ->setParameter('editeur', $editor)
        ->where('a.id in (:articleIds)')
        ->setParameter('articleIds', explode(",", $articleIds));
        return $qb->getQuery()->execute();

    }

    /**
     * @param string[] $articleIds
     * @param Utilisateur[] $reviewers
     * @return bool
     */
    public function requestReviewers($articleIds, $reviewers)
    {
        foreach($reviewers as $reviewer){
            foreach($articleIds as $articleid){
                $this->getEntityManager()
                    ->getConnection()
                    ->createQueryBuilder()
                    ->insert('review_request')
                    ->values(array(
                        'art_id'=>'?',
                        'rev_id'=>'?',
                        'status'=>'?'
                    ))
                    ->setParameter(0,$articleid )
                    ->setParameter(1, $reviewer->getId())
                    ->setParameter(2, ReviewRequest::$STATUS_NOT_HANDLED)
                    ->execute();
            }
        }
        return true;
    }

    /**
     * @param $page
     * @param $limit
     * @param $query
     * @param $filterObject
     * @return Article[]
     */
    public function findByQueryByFilter($page, $limit, $query, $filterObject)
    {
        $qb = $this->buildQuery($query, false);
        $this->addFilter($qb, $filterObject);

        $query = $qb->getQuery();
        if ($page > 0 && $limit > 0) {
            $first = ($page - 1) * $limit;
            return $query->setMaxResults($limit)->setFirstResult($first)->getResult();
        } else {
            return $query->getResult();
        }

    }

    /**
     * @param $query
     * @param $filterObject
     * @return int
     */
    public function countByQueryByFilter($query, $filterObject)
    {
        $qb = $this->buildQuery($query, true);
        $this->addFilter($qb, $filterObject);

        $query = $qb->getQuery();
        $count=0;
        try {
            $count = $query->getSingleScalarResult();
        } catch (NoResultException $e) {
            $count = 0;
        }
        return $count;
    }

    private function addFilter(QueryBuilder $qb, $filterObject){

        $this->addDateCreation($qb, $filterObject);
        $this->addDateSoummission($qb, $filterObject);

        if(property_exists($filterObject, "status")){
            $status=$filterObject->status;
            if(isset($status) && $status!=""){
                $qb->andWhere("a.statut = :status")
                    ->setParameter("status", $status);
            }
        }


        if(property_exists($filterObject, "idArticleType")){
            $idArticleType=$filterObject->idArticleType;
            if(isset($idArticleType) && $idArticleType>0){
                $qb->leftJoin("a.typeArticle", "t")
                    ->andWhere("t.id = :idTypeArticle")
                    ->setParameter("idTypeArticle", $idArticleType);
            }
        }


        if(property_exists($filterObject, "idCategory")){
            $idCategory=$filterObject->idCategory;
            if(isset($idCategory) && $idCategory>0){
                $qb->leftJoin("a.categories", "c")
                    ->andWhere("c.id = :idCategorie")
                    ->setParameter("idCategorie", $idCategory);
            }
        }


        if(property_exists($filterObject, "idAuthor")){
            $idAuthor=$filterObject->idAuthor;
            if(isset($idAuthor) && $idAuthor>0){
                $qb->leftJoin("a.auteurs", "cau")
                    ->leftJoin("cau.auteur", "au")
                    ->andWhere("au.id = :idAuthor")
                    ->setParameter("idAuthor", $idAuthor);
            }
        }


        if(property_exists($filterObject, "idReviewer")){
            $idReviewer=$filterObject->idReviewer;
            if(isset($idReviewer) && $idReviewer>0){
                $qb->leftJoin("a.reviewers", "r")
                    ->andWhere("r.id = :idReviewer")
                    ->setParameter("idReviewer", $idReviewer);
            }
        }


        if(property_exists($filterObject, "idEditor")){
            $idEditor=$filterObject->idEditor;
            if(isset($idEditor) && $idEditor>0){
                $qb->leftJoin("a.editeur", "e")
                    ->andWhere("e.id = :idEditor")
                    ->setParameter("idEditor", $idEditor);
            }
        }


    }

    private function buildQuery($queryString, $isCount=false){

        $qb = $this->createQueryBuilder("a");

        if(isset($queryString) && trim($queryString)!=""){
            $queryString=str_replace(" ", "%", $queryString);

            $queryString="%".$queryString."%";
            $qb->where("(a.titreCourt like :query  or
            a.abstract like :query or
            a.introduction like :query or
            a.resume like :query or
            a.titreComplet like :query or
            a.titreComplet like :query or
            a.statut like :query or
            a.motscles like :query
            )")
                ->andWhere("a.revision is null")
                ->setParameter("query", $queryString);
        }
        else{
            $qb->where("a.revision is null");
        }



        if($isCount){
            $qb->select("count(a)");
        }

        return $qb;
    }



    /**
     * @param QueryBuilder $qb
     * @param $filterObject
     */
    private function addDateCreation(QueryBuilder $qb, $filterObject)
    {
        if(property_exists($filterObject, "dateCreationDebut")){
            $dateCreationDebut = $filterObject->dateCreationDebut;
            if (isset($dateCreationDebut)) {
                $qb->andWhere("a.dateCreation>= :creationDebut")
                    ->setParameter("creationDebut", $dateCreationDebut);
            }

        }

        if(property_exists($filterObject, "dateCreationFin")){
            $dateCreationFin = $filterObject->dateCreationFin;
            if (isset($dateCreationFin)) {
                $qb->andWhere("a.dateCreation<= :creationFin")
                    ->setParameter("creationFin", $dateCreationFin);
            }
        }


    }

    /**
     * @param QueryBuilder $qb
     * @param $filterObject
     */
    private function addDateSoummission(QueryBuilder $qb, $filterObject)
    {
        if(property_exists($filterObject, "dateSoummissionDebut")){
            $dateSoummissionDebut = $filterObject->dateSoummissionDebut;
            if (isset($dateSoummissionDebut)) {
                $qb->andWhere("a.dateSoummission>= :dateSoummissionDebut")
                    ->setParameter("dateSoummissionDebut", $dateSoummissionDebut);
            }
        }
        if(property_exists($filterObject, "dateSoummissionFin")){
            $dateSoummissionFin = $filterObject->dateSoummissionFin;
            if (isset($dateSoummissionFin)) {
                $qb->andWhere("a.dateSoummission<= :dateSoummissionFin")
                    ->setParameter("dateSoummissionFin", $dateSoummissionFin);
            }
        }

    }


}