<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 21:12
 */

namespace JSAppBundle\Dao;


use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Doctrine\ORM\QueryBuilder;
use JSAppBundle\Entity\Role;
use JSAppBundle\Entity\Utilisateur;
use Symfony\Bridge\Doctrine\Security\User\UserLoaderInterface;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;

class UtilisateurRepository extends CoreRepository implements UserLoaderInterface
{

    /**
     * Loads the user for the given username.
     *
     * This method must return null if the user is not found.
     *
     * @param string $username The username
     * @return null|Utilisateur
     * @throws \Exception
     */
    public function loadUserByUsername($username)
    {
        $q = $this
            ->createQueryBuilder('u')
            ->select('u, r')
            ->leftJoin('u.personne', 'p')
            ->leftJoin('u.rolesEntity', 'r')
            ->where('u.username = :username or p.email = :email or p.telephone=:tel')
            ->setParameter('username', $username)
            ->setParameter('email', $username)
            ->setParameter('tel', $username)
            ->getQuery();
        try {
// La méthode Query::getSingleResult() lance une exception
// s'il n'y a pas d'entrée correspondante aux critères
            $user = $q->getSingleResult();
        } catch (NoResultException $e) {
            throw new UsernameNotFoundException(sprintf('Unable to find an active admin
AcmeUserBundle:User object identified by "%s".', $username), 0, $e);
        } catch (NonUniqueResultException $ex) {
            throw new \Exception("The user you provided is not unique");
        }
        return $user;
    }

    public function findByQuery($page, $limite, $query)
    {
        $qb = $this->buildQuery($query);

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
        $qb = $this->buildQuery($query, true);

        $query = $qb->getQuery();
        try {
            $count = $query->getSingleScalarResult();
        } catch (NoResultException $e) {
            $count = 0;
        }
        return $count;
    }

    public function findEditorsByQuery($page, $limit, $query)
    {
        $qb=$this->buildQuery($query);
        $qb->leftJoin("u.rolesEntity", "r")
            ->andWhere("(r.code = :editor or r.code = :maineditor)")
            ->setParameter("editor", Role::$ROLE_EDITOR["code"])
            ->setParameter("maineditor", Role::$ROLE_MAIN_EDITOR["code"]);

        $query = $qb->getQuery();
        if ($page > 0 && $limit > 0) {
            $first = ($page - 1) * $limit;
            return $query->setMaxResults($limit)->setFirstResult($first)->getResult();
        } else {
            return $query->getResult();
        }
    }

    public function countEditorsByQuery($query)
    {
        $qb=$this->buildQuery($query, true);
        $qb->leftJoin("u.rolesEntity", "r")
            ->andWhere("(r.code = :editor or r.code = :maineditor)")
            ->setParameter("editor", Role::$ROLE_EDITOR["code"])
            ->setParameter("maineditor", Role::$ROLE_MAIN_EDITOR["code"]);

        $query = $qb->getQuery();
        try {
            $count = $query->getSingleScalarResult();
        } catch (NoResultException $e) {
            $count = 0;
        }
        return $count;
    }

    /**
     * @param $query
     * @return QueryBuilder
     */
    private function buildQuery($query, $isCount=false)
    {
        $query = str_replace(" ", "%", $query);
        $query = "%" . $query . "%";

        $qb = $this->createQueryBuilder("u")
//            ->select("u")
            ->leftJoin('u.personne', 'p')
            ->where("(u.username like :query
            or p.titre like :query
            or p.nom like :query
            or p.prenom like :query
            or p.email like :query
            or p.telephone like :query
            or p.ville like :query
            or p.pays like :query
            or p.adresse like :query
            or p.codePostale like :query
            or p.affiliation like :query
            or p.institution like :query
            or p.departement like :query)")
            ->setParameter("query", $query);
        if($isCount){
            $qb->select("count(u)");
        }
        return $qb;
    }

    public function findReviewersByQuery($page, $limit, $query)
    {
        $qb=$this->buildQuery($query, false);
        $qb->leftJoin("u.rolesEntity", "r")
            ->andWhere("(r.code = :reviewer)")
            ->setParameter("reviewer", Role::$ROLE_REVIEWER["code"]);

        $query = $qb->getQuery();
        if ($page > 0 && $limit > 0) {
            $first = ($page - 1) * $limit;
            return $query->setMaxResults($limit)->setFirstResult($first)->getResult();
        } else {
            return $query->getResult();
        }
    }

    public function countReviewersByQuery($query)
    {
        $qb=$this->buildQuery($query, true);
        $qb->leftJoin("u.rolesEntity", "r")
            ->andWhere("(r.code = :reviewer)")
            ->setParameter("reviewer", Role::$ROLE_REVIEWER["code"]);

        $query = $qb->getQuery();
        try {
            $count = $query->getSingleScalarResult();
        } catch (NoResultException $e) {
            $count = 0;
        }
        return $count;
    }


}