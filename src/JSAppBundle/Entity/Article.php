<?php

namespace JSAppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Article
 *
 * @ORM\Table(name="article", indexes={@ORM\Index(name="FK_article_type", columns={"typ_id"}), @ORM\Index(name="FK_creer", columns={"uti_id"}), @ORM\Index(name="FK_domaine_article", columns={"cat_id"}), @ORM\Index(name="FK_revision", columns={"art_id"})})
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\ArticleRepository")
 */
class Article
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
     * @ORM\Column(name="titre_court", type="string", length=254, nullable=true)
     */
    private $titreCourt;

    /**
     * @var string
     *
     * @ORM\Column(name="abstract", type="string", length=254, nullable=true)
     */
    private $abstract;

    /**
     * @var string
     *
     * @ORM\Column(name="introduction", type="string", length=254, nullable=true)
     */
    private $introduction;

    /**
     * @var string
     *
     * @ORM\Column(name="resume", type="string", length=254, nullable=true)
     */
    private $resume;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_creation", type="datetime", nullable=true)
     */
    private $dateCreation;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_revision", type="datetime", nullable=true)
     */
    private $dateRevision;

    /**
     * @var string
     *
     * @ORM\Column(name="titre_complet", type="string", length=254, nullable=true)
     */
    private $titreComplet;

    /**
     * @var integer
     *
     * @ORM\Column(name="etat", type="integer", nullable=true)
     */
    private $etat;

    /**
     * @var Article
     *
     * @ORM\ManyToOne(targetEntity="Article")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="art_id", referencedColumnName="id")
     * })
     */
    private $articleParent;

    /**
     * @var TypeArticle
     *
     * @ORM\ManyToOne(targetEntity="TypeArticle")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="typ_id", referencedColumnName="id")
     * })
     */
    private $typeArticle;

    /**
     * @var Utilisateur
     *
     * @ORM\ManyToOne(targetEntity="Utilisateur")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="uti_id", referencedColumnName="id")
     * })
     */
    private $utilisateur;

    /**
     * @var Categorie
     *
     * @ORM\ManyToOne(targetEntity="Categorie")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="cat_id", referencedColumnName="id")
     * })
     */
    private $categorie;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Auteur", mappedBy="article")
     */
    private $auteurs;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->auteurs = new \Doctrine\Common\Collections\ArrayCollection();
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
    public function getTitreCourt()
    {
        return $this->titreCourt;
    }

    /**
     * @param string $titreCourt
     */
    public function setTitreCourt($titreCourt)
    {
        $this->titreCourt = $titreCourt;
    }

    /**
     * @return string
     */
    public function getAbstract()
    {
        return $this->abstract;
    }

    /**
     * @param string $abstract
     */
    public function setAbstract($abstract)
    {
        $this->abstract = $abstract;
    }

    /**
     * @return string
     */
    public function getIntroduction()
    {
        return $this->introduction;
    }

    /**
     * @param string $introduction
     */
    public function setIntroduction($introduction)
    {
        $this->introduction = $introduction;
    }

    /**
     * @return string
     */
    public function getResume()
    {
        return $this->resume;
    }

    /**
     * @param string $resume
     */
    public function setResume($resume)
    {
        $this->resume = $resume;
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
    public function getDateRevision()
    {
        return $this->dateRevision;
    }

    /**
     * @param \DateTime $dateRevision
     */
    public function setDateRevision($dateRevision)
    {
        $this->dateRevision = $dateRevision;
    }

    /**
     * @return string
     */
    public function getTitreComplet()
    {
        return $this->titreComplet;
    }

    /**
     * @param string $titreComplet
     */
    public function setTitreComplet($titreComplet)
    {
        $this->titreComplet = $titreComplet;
    }

    /**
     * @return int
     */
    public function getEtat()
    {
        return $this->etat;
    }

    /**
     * @param int $etat
     */
    public function setEtat($etat)
    {
        $this->etat = $etat;
    }

    /**
     * @return Article
     */
    public function getArticleParent()
    {
        return $this->articleParent;
    }

    /**
     * @param Article $articleParent
     */
    public function setArticleParent($articleParent)
    {
        $this->articleParent = $articleParent;
    }

    /**
     * @return TypeArticle
     */
    public function getTypeArticle()
    {
        return $this->typeArticle;
    }

    /**
     * @param TypeArticle $typeArticle
     */
    public function setTypeArticle($typeArticle)
    {
        $this->typeArticle = $typeArticle;
    }

    /**
     * @return Utilisateur
     */
    public function getUtilisateur()
    {
        return $this->utilisateur;
    }

    /**
     * @param Utilisateur $utilisateur
     */
    public function setUtilisateur($utilisateur)
    {
        $this->utilisateur = $utilisateur;
    }

    /**
     * @return Categorie
     */
    public function getCategorie()
    {
        return $this->categorie;
    }

    /**
     * @param Categorie $categorie
     */
    public function setCategorie($categorie)
    {
        $this->categorie = $categorie;
    }

    /**
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAuteurs()
    {
        return $this->auteurs;
    }

    /**
     * @param \Doctrine\Common\Collections\Collection $auteurs
     */
    public function setAuteurs($auteurs)
    {
        $this->auteurs = $auteurs;
    }


}

