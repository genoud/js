<?php

namespace JSAppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Review
 *
 * @ORM\Table(name="review", indexes={@ORM\Index(name="FK_commentaire_article", columns={"Art_id"}),
 * @ORM\Index(name="FK_commenter", columns={"rev_id"})})
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\ReviewRepository")
 */
class Review
{

    public static $REVIEW_IN_PROGRESS = "REVIEW_IN_PROGRESS";
    public static $REVIEW_SUBMITTED = "REVIEW_SUBMITTED";
    public static $REVIEW_VALIDATED = "REVIEW_VALIDATED";
    public static $REVIEW_REJECTED = "REVIEW_REJECTED";



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
     * @ORM\Column(name="titre", type="string", length=254, nullable=true)
     */
    private $titre;

    /**
     * @var string
     *
     * @ORM\Column(name="content", type="string", length=254, nullable=true)
     */
    private $content;

    /**
     * @var string
     *
     * @ORM\Column(name="appreciation", type="string", length=254, nullable=true)
     */
    private $appreciation;

    /**
     * @var integer
     *
     * @ORM\Column(name="date_commentaire", type="integer", nullable=true)
     */
    private $dateCommentaire;

    /**
     * @var Utilisateur
     *
     * @ORM\ManyToOne(targetEntity="Utilisateur")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="rev_id", referencedColumnName="id")
     * })
     */
    private $reviewer;

    /**
     * @var Article
     *
     * @ORM\ManyToOne(targetEntity="Article")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="art_id", referencedColumnName="id")
     * })
     */
    private $article;

    /**
     * @var Fichier[]
     *
     * @ORM\OneToMany(targetEntity="Fichier", mappedBy="review", cascade={"persist", "merge"})
     */
    private $fichiers;

    /**
     * @var string
     *
     * @ORM\Column(name="statut", type="string", length=254, nullable=true)
     */
    private $statut;

    /**
     * @var boolean
     * @ORM\Column(name="need_review", type="boolean", nullable=true)
     */
    private $needReview;

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
    public function getTitre()
    {
        return $this->titre;
    }

    /**
     * @param string $titre
     */
    public function setTitre($titre)
    {
        $this->titre = $titre;
    }

    /**
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param string $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @return string
     */
    public function getAppreciation()
    {
        return $this->appreciation;
    }

    /**
     * @param string $appreciation
     */
    public function setAppreciation($appreciation)
    {
        $this->appreciation = $appreciation;
    }

    /**
     * @return int
     */
    public function getDateCommentaire()
    {
        return $this->dateCommentaire;
    }

    /**
     * @param int $dateCommentaire
     */
    public function setDateCommentaire($dateCommentaire)
    {
        $this->dateCommentaire = $dateCommentaire;
    }

    /**
     * @return Utilisateur
     */
    public function getReviewer()
    {
        return $this->reviewer;
    }

    /**
     * @param Utilisateur $reviewer
     */
    public function setReviewer($reviewer)
    {
        $this->reviewer = $reviewer;
    }

    /**
     * @return Article
     */
    public function getArticle()
    {
        return $this->article;
    }

    /**
     * @param Article $article
     */
    public function setArticle($article)
    {
        $this->article = $article;
    }

    /**
     * @return Fichier[]
     */
    public function getFichiers()
    {
        return $this->fichiers;
    }

    /**
     * @param Fichier[] $fichiers
     */
    public function setFichiers($fichiers)
    {
        $this->fichiers = $fichiers;
    }

    /**
     * @return string
     */
    public function getStatut()
    {
        return $this->statut;
    }

    /**
     * @param string $statut
     */
    public function setStatut($statut)
    {
        $this->statut = $statut;
    }

    /**
     * @return boolean
     */
    public function isNeedReview()
    {
        return $this->needReview;
    }

    /**
     * @param boolean $needReview
     */
    public function setNeedReview($needReview)
    {
        $this->needReview = $needReview;
    }

    public function __clone()
    {
        $this->id=null;
    }





}

