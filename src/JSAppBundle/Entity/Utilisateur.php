<?php

namespace JSAppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\Role\RoleInterface;
use Symfony\Component\Security\Core\User\AdvancedUserInterface;
use JMS\Serializer\Annotation as JMS;

/**
 * Utilisateur
 *
 * @ORM\Table(name="utilisateur", indexes={@ORM\Index(name="FK_Generalisation_5", columns={"per_id"})})
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\UtilisateurRepository")
 */
class Utilisateur implements AdvancedUserInterface
{
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
     * @ORM\Column(name="username", type="string", length=254, nullable=false, unique=true)
     */
    private $username;

    /**
     * @var string
     *
     * @ORM\Column(name="mot_de_passe", type="string", length=254, nullable=false)
     */
    private $motDePasse;

    /**
     * @var Personne
     *
     * @ORM\ManyToOne(targetEntity="Personne", cascade={"persist", "merge", "remove"})
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="per_id", referencedColumnName="id")
     * })
     */
    private $personne;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Role", inversedBy="utilisateurs", cascade={"persist", "merge", "remove"})
     * @ORM\JoinTable(name="avoir_role",
     *   joinColumns={
     *     @ORM\JoinColumn(name="uti_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="rol_id", referencedColumnName="id")
     *   }
     * )
     */
    private $rolesEntity;

    /**
     * @var string
     * @ORM\Column(name="salt", type="string", length=254, nullable=true)
     */
    private $salt;

    /**
     * @var boolean
     * @ORM\Column(name="active", type="boolean", nullable=true)
     */
    private $active;

    /**
     * @var \Doctrine\Common\Collections\Collection
     * @JMS\Exclude
     * @ORM\ManyToMany(targetEntity="Article", mappedBy="reviewers" )
     *
     */
    private $manuscrits;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->rolesEntity = new \Doctrine\Common\Collections\ArrayCollection();
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
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param string $username
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }

    /**
     * @return string
     */
    public function getMotDePasse()
    {
        return $this->motDePasse;
    }

    /**
     * @param string $motDePasse
     */
    public function setMotDePasse($motDePasse)
    {
        $this->motDePasse = $motDePasse;
    }

    /**
     * @return Personne
     */
    public function getPersonne()
    {
        return $this->personne;
    }

    /**
     * @param Personne $personne
     */
    public function setPersonne($personne)
    {
        $this->personne = $personne;
    }

//    /**
//     * @return \Doctrine\Common\Collections\Collection
//     */
//    public function getRoles()
//    {
//        return $this->roles;
//    }
//
//    /**
//     * @param \Doctrine\Common\Collections\Collection $roles
//     */
//    public function setRoles($roles)
//    {
//        $this->roles = $roles;
//    }


    /**
     * Add idRole
     *
     * @param Role $role
     *
     * @return Utilisateur
     */
    public function addRole(Role $role) {
        $this->rolesEntity[] = $role;

        return $this;
    }

    /**
     * Remove idRole
     *
     * @param Role $role
     * @return Utilisateur
     */
    public function removeRole($role) {
        if (is_a($role, "JSAppBundle\Entity\Role")) {
            $this->rolesEntity->removeElement($role);
        } else {
            $arr = $this->rolesEntity->toArray();

            foreach ($arr as $r) {
                if ($r->getCode() === $role) {
                    $this->rolesEntity->removeElement($r);
                }
            }
        }
        return $this;
    }

    /**
     * @return ArrayCollection|Collection
     */
    public function getRolesEntity() {
        return $this->rolesEntity;
    }

    /**
     * Get idRole
     *
     * @return RoleInterface[]
     */
    public function getRoles() {
        $toReturn = array();
        foreach ($this->rolesEntity as $role) {
            $toReturn[] = $role->getCode();
        }
        return $toReturn;
    }

    /**
     * Checks whether the user's account has expired.
     *
     * Internally, if this method returns false, the authentication system
     * will throw an AccountExpiredException and prevent login.
     *
     * @return bool true if the user's account is non expired, false otherwise
     *
     * @see AccountExpiredException
     */
    public function isAccountNonExpired()
    {
        return $this->active;
//        return true;
    }

    /**
     * Checks whether the user is locked.
     *
     * Internally, if this method returns false, the authentication system
     * will throw a LockedException and prevent login.
     *
     * @return bool true if the user is not locked, false otherwise
     *
     * @see LockedException
     */
    public function isAccountNonLocked()
    {
//        return true;
        return $this->active;
    }

    /**
     * Checks whether the user's credentials (password) has expired.
     *
     * Internally, if this method returns false, the authentication system
     * will throw a CredentialsExpiredException and prevent login.
     *
     * @return bool true if the user's credentials are non expired, false otherwise
     *
     * @see CredentialsExpiredException
     */
    public function isCredentialsNonExpired()
    {
//        return true;
        return $this->active;
    }

    /**
     * Checks whether the user is enabled.
     *
     * Internally, if this method returns false, the authentication system
     * will throw a DisabledException and prevent login.
     *
     * @return bool true if the user is enabled, false otherwise
     *
     * @see DisabledException
     */
    public function isEnabled()
    {
//        return true;
        return $this->active;
    }

    /**
     * Returns the password used to authenticate the user.
     *
     * This should be the encoded password. On authentication, a plain-text
     * password will be salted, encoded, and then compared to this value.
     *
     * @return string The password
     */
    public function getPassword()
    {
       return $this->getMotDePasse();
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * This can return null if the password was not encoded using a salt.
     *
     * @return string|null The salt
     */
    public function getSalt()
    {
        return $this->salt;
    }

    /**
     * @param $salt
     */
    public function setSalt($salt){
        $this->salt=$salt;
    }

    /**
     * @return boolean
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * @param boolean $active
     */
    public function setActive($active)
    {
        $this->active = $active;
    }


    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     */
    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    public function __clone()
    {
//        $this->setId(null);
//        $this->personne=clone $this->personne;
//        foreach($this->rolesEntity as &$role){
//            $role=clone $role;
//        }
    }

    public function __toString()
    {
        return $this->getPersonne()->getPrenom(). " ". $this->getPersonne()->getNom();
    }

}

