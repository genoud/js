<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 25/08/2016
 * Time: 23:05
 */

namespace JSAppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CoAuteur
 *
 * @ORM\Table(name="coauteur", indexes={@ORM\Index(name="FK_coauteur_auteur", columns={"aut_id"}), @ORM\Index(name="FK_coauteur_article", columns={"art_id"})})
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\CoAuteurRepository")
 */
class CoAuteur
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
     * @var Article
     *
     * @ORM\ManyToOne(targetEntity="Article")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="art_id", referencedColumnName="id")
     * })
     */
    private $article;

    /**
     * @var Auteur
     *
     * @ORM\ManyToOne(targetEntity="Auteur", cascade={"persist", "merge"})
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="aut_id", referencedColumnName="id")
     * })
     */
    private $auteur;

    /**
     * @var boolean
     *
     * @ORM\Column(name="principal", type="boolean", nullable=true)
     */
    private $principal;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return CoAuteur
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return Auteur
     */
    public function getAuteur()
    {
        return $this->auteur;
    }

    /**
     * @param Auteur $auteur
     * @return CoAuteur
     */
    public function setAuteur($auteur)
    {
        $this->auteur = $auteur;
        return $this;
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
     * @return CoAuteur
     */
    public function setArticle($article)
    {
        $this->article = $article;
        return $this;
    }

    /**
     * @return boolean
     */
    public function isPrincipal()
    {
        return $this->principal;
    }

    /**
     * @param boolean $principal
     * @return CoAuteur
     */
    public function setPrincipal($principal)
    {
        $this->principal = $principal;
        return $this;
    }

    public function __clone()
    {
        $this->id=null;
    }


}