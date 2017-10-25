<?php

namespace JSAppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use \Doctrine\Common\Collections\ArrayCollection;

/**
 * Reviewer
 *
 * @ORM\Table(name="reviewer", indexes={@ORM\Index(name="FK_reviewer_peut_etre_personne", columns={"pers_id"})})
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\ReviewerRepository")
 */
class Reviewer
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



    /**
     * Constructor
     */
    public function __construct()
    {
        $this->articles = new ArrayCollection();
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
        $this->personne=clone $this->personne;
    }



}

