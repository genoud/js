<?php

namespace JSAppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\Role\RoleInterface;
use JMS\Serializer\Annotation as JMS;

/**
 * Role
 *
 * @ORM\Table(name="role")
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\RoleRepository")
 */
class Role implements RoleInterface
{

    public static $ROLE_PUBLIC=array("code"=>"ROLE_JS_PUBLIC", "libelle"=>"Public User");
    public static $ROLE_AUTEUR=array("code"=>"ROLE_JS_AUTHOR", "libelle"=>"Author");
    public static $ROLE_REVIEWER=array("code"=>"ROLE_JS_REVIEWER", "libelle"=>"Reviewer") ;
    public static $ROLE_EDITOR=array("code"=>"ROLE_JS_EDITOR", "libelle"=>"Editor") ;
    public static $ROLE_PUBLISHER=array("code"=>"ROLE_JS_PUBLISHER", "libelle"=>"Publisher") ;
    public static $ROLE_SUPER_ADMIN=array("code"=>"ROLE_JS_SUPER_ADMIN", "libelle"=>"Administrator") ;
    public static $ROLE_MAIN_EDITOR=array("code"=>"ROLE_JS_MAIN_EDITOR", "libelle"=>"Main Editor") ;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="code", type="string", length=254, nullable=false, unique=true)
     */
    private $code;

    /**
     * @var string
     *
     * @ORM\Column(name="libelle", type="string", length=254, nullable=true)
     */
    private $libelle;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=254, nullable=true)
     */
    private $description;

    /**
     * @var \Doctrine\Common\Collections\Collection
     * @JMS\Exclude
     * @ORM\ManyToMany(targetEntity="Utilisateur", mappedBy="rolesEntity")
     */
    private $utilisateurs;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->utilisateurs = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getLibelle()
    {
        return $this->libelle;
    }

    /**
     * @param string $libelle
     */
    public function setLibelle($libelle)
    {
        $this->libelle = $libelle;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUtilisateurs()
    {
        return $this->utilisateurs;
    }

    /**
     * @param \Doctrine\Common\Collections\Collection $utilisateurs
     */
    public function setUtilisateurs($utilisateurs)
    {
        $this->utilisateurs = $utilisateurs;
    }

    /**
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * @param string $code
     */
    public function setCode($code)
    {
        $this->code = $code;
    }



    /**
     * Returns the role.
     *
     * This method returns a string representation whenever possible.
     *
     * When the role cannot be represented with sufficient precision by a
     * string, it should return null.
     *
     * @return string|null A string representation of the role, or null
     */
    public function getRole()
    {
        return $this->code;
    }

    public function __clone()
    {
        $this->id=null;
    }

}

