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
 * Funding
 *
 * @ORM\Table(name="funding",  indexes={@ORM\Index(name="FK_funding_article", columns={"art_id"})})
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\FundingRepository")
 */
class Funding
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
     * @var string
     *
     * @ORM\Column(name="institution", type="string", length=254, nullable=true)
     */
    private $institution;

    /**
     * @var string
     *
     * @ORM\Column(name="number", type="string", length=254, nullable=true)
     */
    private $number;


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
     * @return string
     */
    public function getInstitution()
    {
        return $this->institution;
    }

    /**
     * @param string $institution
     */
    public function setInstitution($institution)
    {
        $this->institution = $institution;
    }

    /**
     * @return string
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * @param string $number
     */
    public function setNumber($number)
    {
        $this->number = $number;
    }
    public function __clone()
    {
        $this->id=null;
    }





}