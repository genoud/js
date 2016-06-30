<?php

namespace JSAppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Publication
 *
 * @ORM\Table(name="publication", indexes={@ORM\Index(name="FK_fichier_publie", columns={"fic_id"}), @ORM\Index(name="FK_publication_article", columns={"art_id"}), @ORM\Index(name="FK_utilisateur_publier", columns={"uti_id"})})
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\PublicationRepository")
 */
class Publication
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
     * @var \DateTime
     *
     * @ORM\Column(name="datePub", type="datetime", nullable=true)
     */
    private $datepub;

    /**
     * @var string
     *
     * @ORM\Column(name="commentaires", type="string", length=254, nullable=true)
     */
    private $commentaires;

    /**
     * @var string
     *
     * @ORM\Column(name="article", type="string", length=254, nullable=true)
     */
    private $contenu;

    /**
     * @var string
     *
     * @ORM\Column(name="etat", type="string", length=254, nullable=true)
     */
    private $etat;

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
     * @var Fichier
     *
     * @ORM\ManyToOne(targetEntity="Fichier")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="fic_id", referencedColumnName="id")
     * })
     */
    private $fichier;

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
     * @return \DateTime
     */
    public function getDatepub()
    {
        return $this->datepub;
    }

    /**
     * @param \DateTime $datepub
     */
    public function setDatepub($datepub)
    {
        $this->datepub = $datepub;
    }

    /**
     * @return string
     */
    public function getCommentaires()
    {
        return $this->commentaires;
    }

    /**
     * @param string $commentaires
     */
    public function setCommentaires($commentaires)
    {
        $this->commentaires = $commentaires;
    }

    /**
     * @return string
     */
    public function getContenu()
    {
        return $this->contenu;
    }

    /**
     * @param string $contenu
     */
    public function setContenu($contenu)
    {
        $this->contenu = $contenu;
    }

    /**
     * @return string
     */
    public function getEtat()
    {
        return $this->etat;
    }

    /**
     * @param string $etat
     */
    public function setEtat($etat)
    {
        $this->etat = $etat;
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
     * @return Fichier
     */
    public function getFichier()
    {
        return $this->fichier;
    }

    /**
     * @param Fichier $fichier
     */
    public function setFichier($fichier)
    {
        $this->fichier = $fichier;
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



}

