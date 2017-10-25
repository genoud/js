<?php

namespace JSAppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * Article
 *
 * @ORM\Table(name="article", indexes={@ORM\Index(name="FK_article_type", columns={"typ_id"}), @ORM\Index(name="FK_creer", columns={"uti_id"}),  @ORM\Index(name="FK_revision", columns={"art_id"})})
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
     * @ORM\Column(name="abstract", type="string", length=5000, nullable=true)
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
     * @JMS\Type("DateTime<'d/m/Y H:i:s'>")
     * @ORM\Column(name="date_creation", type="datetime", nullable=true)
     */
    private $dateCreation;

    /**
     * @var \DateTime
     * @JMS\Type("DateTime<'d/m/Y H:i:s'>")
     * @ORM\Column(name="date_soummission", type="datetime", nullable=true)
     */
    private $dateSoummission;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_revision", type="datetime", nullable=true)
     */
    private $dateRevision;

    /**
     * @var string
     *
     * @ORM\Column(name="titre_complet", type="text", nullable=true)
     */
    private $titreComplet;

    /**
     * @var integer
     *
     * @ORM\Column(name="etat", type="integer", nullable=true)
     */
    private $etat;

    /**
 * @var string
 *
 * @ORM\Column(name="statut", type="string", length=254, nullable=true)
 */
    private $statut;

    /**
     * @var string
     *
     * @ORM\Column(name="motscles", type="string", length=1000, nullable=true)
     */
    private $motscles;
    /**
     * @var Article
     *
     * @ORM\ManyToOne(targetEntity="Article")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="art_id", referencedColumnName="id")
     * })
     */
    private $revision;

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
     * @var Utilisateur
     *
     * @ORM\ManyToOne(targetEntity="Utilisateur")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="editor_id", referencedColumnName="id")
     * })
     */
    private $editeur;


    /**
     * @var Utilisateur[]
     * @JMS\Exclude
     * @ORM\ManyToMany(targetEntity="Utilisateur", inversedBy="manuscrits", cascade={"persist", "merge"})
     *  @ORM\JoinTable(name="review_manuscript",
     *   joinColumns={
     *     @ORM\JoinColumn(name="art_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="reviewer_id", referencedColumnName="id")
     *   }
     * )
     */
    private $reviewers;


    /**
     * @var Categorie[]
     * @ORM\ManyToMany(targetEntity="Categorie", inversedBy="articles", cascade={"persist", "merge"})
     *  @ORM\JoinTable(name="avoir_categorie",
     *   joinColumns={
     *     @ORM\JoinColumn(name="art_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="cat_id", referencedColumnName="id")
     *   }
     * )
     */
    private $categories;


    /**
     * @var CoAuteur[]
     *
     * @ORM\OneToMany(targetEntity="CoAuteur", mappedBy="article", cascade={"persist", "merge"})
     */
    private $auteurs;

    /**
     * @var Funding[]
     *
     * @ORM\OneToMany(targetEntity="Funding", mappedBy="article", cascade={"persist", "merge"})
     */
    private $funding;


    /**
     * @var boolean
     * @ORM\Column(name="accepted", type="boolean", nullable=true)
     */
    private $accepted;

    /**
 * @var boolean
 * @ORM\Column(name="published", type="boolean", nullable=true)
 */
    private $published;

    /**
     * @var boolean
     * @ORM\Column(name="refused", type="boolean", nullable=true)
     */
    private $refused;

    /**
     * @var boolean
     * @ORM\Column(name="step1", type="boolean", nullable=true)
     */
    private $step1;

    /**
     * @var boolean
     * @ORM\Column(name="step2", type="boolean", nullable=true)
     */
    private $step2;

    /**
     * @var boolean
     * @ORM\Column(name="step3", type="boolean", nullable=true)
     */
    private $step3;

    /**
     * @var boolean
     * @ORM\Column(name="step4", type="boolean", nullable=true)
     */
    private $step4;

    /**
     * @var boolean
     * @ORM\Column(name="step5", type="boolean", nullable=true)
     */
    private $step5;

    /**
     * @var boolean
     * @ORM\Column(name="step6", type="boolean", nullable=true)
     */
    private $step6;

    /**
     * @var boolean
     * @ORM\Column(name="step7", type="boolean", nullable=true)
     */
    private $step7;

    /**
     * @var boolean
     * @ORM\Column(name="step8", type="boolean", nullable=true)
     */
    private $step8;

    /**
     * @var boolean
     * @ORM\Column(name="step9", type="boolean", nullable=true)
     */
    private $step9;

    /**
     * @var boolean
     * @ORM\Column(name="step10", type="boolean", nullable=true)
     */
    private $step10;

    /**
     * @var boolean
     * @ORM\Column(name="step11", type="boolean", nullable=true)
     */
    private $step11;

    /**
     * @var boolean
     * @ORM\Column(name="step12", type="boolean", nullable=true)
     */
    private $step12;


    /**
     * @var string
     *
     * @ORM\Column(name="additionalinfo1", type="string", length=500, nullable=true)
     */
    private $addinfo1;

    /**
     * @var string
     *
     * @ORM\Column(name="additionalinfo2", type="string", length=500, nullable=true)
     */
    private $addinfo2;

    /**
     * @var string
     *
     * @ORM\Column(name="comments", type="string", length=2000, nullable=true)
     */
    private $comments;

    /**
     * @var ArticleReviewer[]
     *
     * @ORM\OneToMany(targetEntity="ArticleReviewer", mappedBy="articleOpposed", cascade={"persist", "merge"})
     */
    private $opposedReviewers;

    /**
     * @var ArticleReviewer[]
     *
     * @ORM\OneToMany(targetEntity="ArticleReviewer", mappedBy="articleSuggested", cascade={"persist", "merge"})
     */
    private $suggestedReviewers;

    /**
     * @var ReviewRequest[]
     *
     * @ORM\OneToMany(targetEntity="ReviewRequest", mappedBy="article", cascade={"persist", "merge"})
     */
    private $reviewRequests;

    /**
     * @var Fichier[]
     *
     * @ORM\OneToMany(targetEntity="Fichier", mappedBy="article", cascade={"persist", "merge"})
     */
    private $fichiers;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->auteurs = new ArrayCollection();
        $this->funding=new ArrayCollection();
        $this->categories=new ArrayCollection();
        $this->opposedReviewers=new ArrayCollection();
        $this->suggestedReviewers=new ArrayCollection();
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
    public function getRevision()
    {
        return $this->revision;
    }

    /**
     * @param Article $revision
     */
    public function setRevision($revision)
    {
        $this->revision = $revision;
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
    public function getCategories()
    {
        return $this->categories;
    }

    /**
     * @param Categorie[] $categories
     */
    public function setCategories($categories)
    {
        $this->categories = $categories;
    }

    /**
     * Add role
     *
     * @param Categorie $categorie
     * @return Article
     */
    public function addCategorie( Categorie $categorie) {
        $found=false;

        foreach($this->categories as $cat){
            if($cat->getId()==$categorie->getId()){
                $found=true;
            }
        }
        if(!$found){
            $this->categories[] = $categorie;
        }
        return $this;
    }

    /**
     * Remove categorie
     *
     * @param Categorie $categorie
     */
    public function removeCategorie(Categorie $categorie) {
        $this->categories->removeElement($categorie);
    }


    /**
     * @return CoAuteur[]
     */
    public function getAuteurs()
    {
        return $this->auteurs;
    }

    /**
     * @param CoAuteur[]
     */
    public function setAuteurs($auteurs)
    {
        $this->auteurs = $auteurs;
    }

    /**
     * @param CoAuteur $auteur
     */
    public function addCoAuteur($auteur){
        if(!$this->auteurs->contains($auteur)){
            $this->auteurs->add($auteur);
        }
    }

    /**
     * @param CoAuteur $auteur
     */
    public function removeCoAuteur($auteur){
        if($this->auteurs->contains($auteur)){
            $this->auteurs->removeElement($auteur);
        }
    }

    /**
     * @param Auteur $auteur
     * @param boolean $principal
     */
    public function addAuteur($auteur, $principal){
        //Check if an coAuthor exist with the given author

        $found=false;
        foreach($this->auteurs as $coAuthor){
            if($coAuthor->getAuteur()->getId()==$auteur->getId()){
                $coAuthor->setPrincipal($principal);
                $found=true;
            }
            else{
                if($principal){
                    $coAuthor->setPrincipal(false);
                }
            }
        }
        if(!$found){
            $newCoAuteur=new CoAuteur();
            $newCoAuteur->setAuteur($auteur);
            $newCoAuteur->setArticle($this);
            $newCoAuteur->setPrincipal($principal);

            $this->auteurs->add($newCoAuteur);
        }
    }

    /**
     * @return ArticleReviewer[]
     */
    public function getOpposedReviewers()
    {
        return $this->opposedReviewers;
    }

    /**
     * @param ArticleReviewer[]
     */
    public function setOpposedReviewers($opposedReviewers)
    {
        $this->opposedReviewers = $opposedReviewers;
    }

    /**
     * @param ArticleReviewer $opposedReviewers
     */
    public function addOpposedReviewer($opposedReviewers){
        if(!$this->opposedReviewers->contains($opposedReviewers)){
            $this->opposedReviewers->add($opposedReviewers);
        }
    }

    /**
     * @param ArticleReviewer $opposedReviewers
     */
    public function removeOpposedReviewer($opposedReviewers){
        if($this->opposedReviewers->contains($opposedReviewers)){
            $this->opposedReviewers->removeElement($opposedReviewers);
        }
    }


    /**
     * @return ArticleReviewer[]
     */
    public function getSuggestedReviewers()
    {
        return $this->suggestedReviewers;
    }

    /**
     * @param ArticleReviewer[]
     */
    public function setSuggestedReviewers($suggestedReviewers)
    {
        $this->suggestedReviewers = $suggestedReviewers;
    }

    /**
     * @param ArticleReviewer $suggestedReviewers
     */
    public function addSuggestedReviewer($suggestedReviewers){
        if(!$this->suggestedReviewers->contains($suggestedReviewers)){
            $this->suggestedReviewers->add($suggestedReviewers);
        }
    }

    /**
     * @param ArticleReviewer $suggestedReviewers
     */
    public function removeSuggestedReviewer($suggestedReviewers){
        if($this->suggestedReviewers->contains($suggestedReviewers)){
            $this->suggestedReviewers->removeElement($suggestedReviewers);
        }
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
    public function isStep1()
    {
        return $this->step1;
    }

    /**
     * @param boolean $step1
     */
    public function setStep1($step1)
    {
        $this->step1 = $step1;
    }

    /**
     * @return boolean
     */
    public function isStep2()
    {
        return $this->step2;
    }

    /**
     * @param boolean $step2
     */
    public function setStep2($step2)
    {
        $this->step2 = $step2;
    }

    /**
     * @return boolean
     */
    public function isStep3()
    {
        return $this->step3;
    }

    /**
     * @param boolean $step3
     */
    public function setStep3($step3)
    {
        $this->step3 = $step3;
    }

    /**
     * @return boolean
     */
    public function isStep4()
    {
        return $this->step4;
    }

    /**
     * @param boolean $step4
     */
    public function setStep4($step4)
    {
        $this->step4 = $step4;
    }

    /**
     * @return boolean
     */
    public function isStep5()
    {
        return $this->step5;
    }

    /**
     * @param boolean $step5
     */
    public function setStep5($step5)
    {
        $this->step5 = $step5;
    }

    /**
     * @return boolean
     */
    public function isStep6()
    {
        return $this->step6;
    }

    /**
     * @param boolean $step6
     */
    public function setStep6($step6)
    {
        $this->step6 = $step6;
    }

    /**
     * @return boolean
     */
    public function isStep7()
    {
        return $this->step7;
    }

    /**
     * @param boolean $step7
     */
    public function setStep7($step7)
    {
        $this->step7 = $step7;
    }

    /**
     * @return boolean
     */
    public function isStep8()
    {
        return $this->step8;
    }

    /**
     * @param boolean $step8
     */
    public function setStep8($step8)
    {
        $this->step8 = $step8;
    }

    /**
     * @return boolean
     */
    public function isStep9()
    {
        return $this->step9;
    }

    /**
     * @param boolean $step9
     */
    public function setStep9($step9)
    {
        $this->step9 = $step9;
    }

    /**
     * @return boolean
     */
    public function isStep10()
    {
        return $this->step10;
    }

    /**
     * @param boolean $step10
     */
    public function setStep10($step10)
    {
        $this->step10 = $step10;
    }

    /**
     * @return boolean
     */
    public function isStep11()
    {
        return $this->step11;
    }

    /**
     * @param boolean $step11
     */
    public function setStep11($step11)
    {
        $this->step11 = $step11;
    }

    /**
     * @return boolean
     */
    public function isStep12()
    {
        return $this->step12;
    }

    /**
     * @param boolean $step12
     */
    public function setStep12($step12)
    {
        $this->step12 = $step12;
    }



    /**
     * @return Funding[]
     */
    public function getFunding()
    {
        return $this->funding;
    }

    /**
     * @param Funding[] $funding
     */
    public function setFunding($funding)
    {
        $this->funding = $funding;
    }

    /**
     * @return string
     */
    public function getMotscles()
    {
        return $this->motscles;
    }

    /**
     * @param string $motscles
     */
    public function setMotscles($motscles)
    {
        $this->motscles = $motscles;
    }

    /**
     * @return string
     */
    public function getAddinfo1()
    {
        return $this->addinfo1;
    }

    /**
     * @param string $addinfo1
     */
    public function setAddinfo1($addinfo1)
    {
        $this->addinfo1 = $addinfo1;
    }

    /**
     * @return string
     */
    public function getAddinfo2()
    {
        return $this->addinfo2;
    }

    /**
     * @param string $addinfo2
     */
    public function setAddinfo2($addinfo2)
    {
        $this->addinfo2 = $addinfo2;
    }

    /**
     * @return string"
     */
    public function getComments()
    {
        return $this->comments;
    }

    /**
     * @param string $comments
     */
    public function setComments($comments)
    {
        $this->comments = $comments;
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
     * @return Utilisateur[]
     */
    public function getReviewers()
    {
        return $this->reviewers;
    }

    /**
     * @param Utilisateur[] $reviewers
     */
    public function setReviewers($reviewers)
    {
        $this->reviewers = $reviewers;
    }

    /**
     * @return ReviewRequest[]
     */
    public function getReviewRequests()
    {
        return $this->reviewRequests;
    }

    /**
     * @param ReviewRequest[] $reviewRequests
     */
    public function setReviewRequests($reviewRequests)
    {
        $this->reviewRequests = $reviewRequests;
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






    public function isCOmpleted(){
        return $this->isStep1() && $this->isStep2() && $this->isStep3() && $this->isStep4()
            && $this->isStep5() && $this->isStep6() && $this->isStep7() && $this->isStep8()
            && $this->isStep9() && $this->isStep10() && $this->isStep11() && $this->isStep12();
    }

    /**
     * @return boolean
     */
    public function isAccepted()
    {
        return $this->accepted;
    }

    /**
     * @param boolean $accepted
     */
    public function setAccepted($accepted)
    {
        $this->accepted = $accepted;
    }

    /**
     * @return \DateTime
     */
    public function getDateSoummission()
    {
        return $this->dateSoummission;
    }

    /**
     * @param \DateTime $dateSoummission
     */
    public function setDateSoummission($dateSoummission)
    {
        $this->dateSoummission = $dateSoummission;
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
     * @return boolean
     */
    public function isRefused()
    {
        return $this->refused;
    }

    /**
     * @param boolean $refused
     */
    public function setRefused($refused)
    {
        $this->refused = $refused;
    }

    public function __clone()
    {

        $this->id = null;

        $this->setRevision(null);

        $authors=new ArrayCollection();
        foreach($this->auteurs as $coAuthor){
            $newAuthor= clone $coAuthor;
            $newAuthor->setArticle($this);
            $authors->add($newAuthor);
        }

        $fundingList=new ArrayCollection();
        foreach($this->funding as $funding){
            $newFunding= clone $funding;
            $newFunding->setArticle($this);
            $fundingList->add($newFunding);
        }

        $opposedReviewers=new ArrayCollection();
        foreach($this->opposedReviewers as $opposeReviewer){
            $newOpposedReviwer= clone $opposeReviewer;
            $newOpposedReviwer->setArticleOpposed($this);
            $opposedReviewers->add($newOpposedReviwer);
        }

        $suggestedReviewers=new ArrayCollection();
        foreach($this->suggestedReviewers as $suggestedReviewer){
            $newSuggestedReviwer= clone $suggestedReviewer;
            $newSuggestedReviwer->setArticleSuggested($this);
            $suggestedReviewers->add($newSuggestedReviwer);
        }

//        $reviewRequests=new ArrayCollection();
//        foreach($this->reviewRequests as $reviewRequest){
//            $newReviewRequest= clone $reviewRequest;
//            $newReviewRequest->setArticle($this);
//            $reviewRequests->add($newReviewRequest);
//        }

        $fichiers=new ArrayCollection();
        foreach($this->fichiers as $fichier){
            $newFichier= clone $fichier;
            $newFichier->setArticle($this);
            $fichiers->add($newFichier);
        }



        $this->auteurs = $authors;
        $this->funding=$fundingList;

        $this->opposedReviewers=$opposedReviewers;
        $this->suggestedReviewers=$suggestedReviewers;

        $this->reviewRequests=new ArrayCollection();
        $this->fichiers=$fichiers;

        $this->step1=false;
        $this->step2=false;
        $this->step3=false;
        $this->step4=false;
        $this->step5=false;
        $this->step6=false;
        $this->step7=false;
        $this->step8=false;
        $this->step9=false;
        $this->step10=false;
        $this->step11=false;
        $this->step12=false;

        $this->setStatut(StatutManuscrit::$REVISION_INCOMPLETE["code"]);

    }


}

