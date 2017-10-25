<?php

namespace JSAppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Auteur
 *
 * @ORM\Table(name="auteur", indexes={@ORM\Index(name="FK_auteur_peut_etre_personne", columns={"pers_id"})})
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\AuteurRepository")
 */
class Auteur
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
     * @var Personne
     *
     * @ORM\ManyToOne(targetEntity="Personne" , cascade={"persist", "merge", "remove"})
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="pers_id", referencedColumnName="id")
     * })
     */
    private $personne;

//    /**
//     * @var \Doctrine\Common\Collections\Collection
//     *
//     * @ORM\ManyToMany(targetEntity="Article", inversedBy="aut")
//     * @ORM\JoinTable(name="coauteur",
//     *   joinColumns={
//     *     @ORM\JoinColumn(name="aut_id", referencedColumnName="id")
//     *   },
//     *   inverseJoinColumns={
//     *     @ORM\JoinColumn(name="article_id", referencedColumnName="id")
//     *   }
//     * )
//     */
//    private $articles;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->articles = new \Doctrine\Common\Collections\ArrayCollection();
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

    public function __clone(){
        $this->setId(null);
//        $this->personne=clone $this->personne;
    }




}

