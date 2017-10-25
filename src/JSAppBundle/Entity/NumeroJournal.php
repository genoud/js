<?php

namespace JSAppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * NumeroJournal
 *
 * @ORM\Table(name="numero_journal")
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\NumeroJournalRepository")
 */
class NumeroJournal
{
    public static $DRAFT=array("id"=>1, "code"=>"DRAFT", "libelle"=>"Draft");
    public static $VALIDATED=array("id"=>2, "code"=>"VALIDATED", "libelle"=>"VAlidated");


    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_pub", type="datetime", nullable=true)
     */
    private $datePub;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_creation", type="datetime", nullable=true)
     */
    private $dateCreation;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_validation", type="datetime", nullable=true)
     */
    private $dateValidation;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=1000, nullable=true)
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="numero", type="string", length=15, nullable=true)
     */
    private $numero;

    /**
     * @var Utilisateur
     *
     * @ORM\ManyToOne(targetEntity="Utilisateur")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="editor_id", referencedColumnName="id")
     * })
     */
    private $editeur;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=25, nullable=true)
     */
    private $status;

    /**
     * @var boolean
     * @ORM\Column(name="published", type="boolean", nullable=true)
     */
    private $published;

    /**
     * @var Publication[]
     *
     * @ORM\OneToMany(targetEntity="Publication", mappedBy="numeroJournal", cascade={"persist", "merge"})
     */
    private $publications;


    public function __construct()
    {
        $this->publications=new ArrayCollection();
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
     * @return \DateTime
     */
    public function getDatePub()
    {
        return $this->datePub;
    }

    /**
     * @param \DateTime $datePub
     */
    public function setDatePub($datePub)
    {
        $this->datePub = $datePub;
    }

    /**
     * @return \DateTime
     */
    public function getDateCreation()
    {
        return $this->dateCreation;
    }

    /**
     * @param \DateTime $dateCreation
     */
    public function setDateCreation($dateCreation)
    {
        $this->dateCreation = $dateCreation;
    }

    /**
     * @return \DateTime
     */
    public function getDateValidation()
    {
        return $this->dateValidation;
    }

    /**
     * @param \DateTime $dateValidation
     */
    public function setDateValidation($dateValidation)
    {
        $this->dateValidation = $dateValidation;
    }

    /**
     * @return Utilisateur
     */
    public function getEditeur()
    {
        return $this->editeur;
    }

    /**
     * @param Utilisateur $editeur
     */
    public function setEditeur($editeur)
    {
        $this->editeur = $editeur;
    }

    /**
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param string $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
    }

    /**
     * @return boolean
     */
    public function isPublished()
    {
        return $this->published;
    }

    /**
     * @param boolean $published
     */
    public function setPublished($published)
    {
        $this->published = $published;
    }

    /**
     * @return Publication[]
     */
    public function getPublications()
    {
        return $this->publications;
    }

    /**
     * @param Publication[] $publications
     */
    public function setPublications($publications)
    {
        $this->publications = $publications;
    }

    /**
     * Add publication
     *
     * @param Publication $publication
     * @return NumeroJournal
     */
    public function addPublication( Publication $publication) {
        $found=false;

        foreach($this->publications as $pub){
            if($pub->getId()==$publication->getId()){
                $found=true;
            }
        }
        if(!$found){
            $this->publications[] = $publication;
        }
        return $this;
    }

    /**
     * Remove publication
     *
     * @param Publication $publication
     */
    public function removePublication(Publication $publication) {
        $this->publications->removeElement($publication);
    }

    /**
     * @return string
     */
    public function getNumero()
    {
        return $this->numero;
    }

    /**
     * @param string $numero
     */
    public function setNumero($numero)
    {
        $this->numero = $numero;
    }
    public function __clone()
    {
        $this->id=null;
    }




}

