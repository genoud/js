<?php

namespace JSAppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Fichier
 *
 * @ORM\Table(name="fichier", indexes={@ORM\Index(name="FK_fichier_avoir_type", columns={"typ_id"}), @ORM\Index(name="FK_fichier_commentaire", columns={"com_id"}), @ORM\Index(name="FK_fichiers_joint", columns={"art_id"})})
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\FichierRepository")
 */
class Fichier
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
     * @ORM\Column(name="url", type="string", length=254, nullable=true)
     */
    private $url;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=254, nullable=true)
     */
    private $description;

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
     * @var Typefichier
     *
     * @ORM\ManyToOne(targetEntity="Typefichier")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="typ_id", referencedColumnName="id")
     * })
     */
    private $typeFichier;

    /**
     * @var Commentaire
     *
     * @ORM\ManyToOne(targetEntity="Commentaire")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="com_id", referencedColumnName="id")
     * })
     */
    private $commentaire;

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
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param string $url
     */
    public function setUrl($url)
    {
        $this->url = $url;
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
     * @return Typefichier
     */
    public function getTypeFichier()
    {
        return $this->typeFichier;
    }

    /**
     * @param Typefichier $typeFichier
     */
    public function setTypeFichier($typeFichier)
    {
        $this->typeFichier = $typeFichier;
    }

    /**
     * @return Commentaire
     */
    public function getCommentaire()
    {
        return $this->commentaire;
    }

    /**
     * @param Commentaire $commentaire
     */
    public function setCommentaire($commentaire)
    {
        $this->commentaire = $commentaire;
    }



}

