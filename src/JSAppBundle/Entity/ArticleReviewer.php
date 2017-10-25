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
 * ArticleReviewer
 *
 * @ORM\Table(name="article_reviewer", indexes={@ORM\Index(name="FK_article_reviewer_reviewer", columns={"rev_id"}),
 * @ORM\Index(name="FK_opposed_reviewer_article", columns={"opposed_art_id"}),
 * @ORM\Index(name="FK_suggested_reviewer_article", columns={"suggested_art_id"})
 * })
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\ArticleReviewerRepository")
 */
class ArticleReviewer
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
     *   @ORM\JoinColumn(name="opposed_art_id", referencedColumnName="id")
     * })
     */
    private $articleOpposed;

    /**
     * @var Article
     *
     * @ORM\ManyToOne(targetEntity="Article")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="suggested_art_id", referencedColumnName="id")
     * })
     */
    private $articleSuggested;

    /**
     * @var Reviewer
     *
     * @ORM\ManyToOne(targetEntity="Reviewer", cascade={"persist", "merge"})
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="rev_id", referencedColumnName="id")
     * })
     */
    private $reviewer;

    /**
     * @var string
     *
     * @ORM\Column(name="reason", type="string", length=500, nullable=true)
     */
    private $reason;

    /**
 * @var boolean
 *
 * @ORM\Column(name="opposed", type="boolean", nullable=true)
 */
    private $opposed;

    /**
     * @var boolean
     *
     * @ORM\Column(name="suggested", type="boolean", nullable=true)
     */
    private $suggested;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return Reviewer
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return Reviewer
     */
    public function getReviewer()
    {
        return $this->reviewer;
    }

    /**
     * @param Reviewer $reviewer
     */
    public function setReviewer($reviewer)
    {
        $this->reviewer = $reviewer;
    }

    /**
     * @return string
     */
    public function getReason()
    {
        return $this->reason;
    }

    /**
     * @param string $reason
     */
    public function setReason($reason)
    {
        $this->reason = $reason;
    }

    /**
     * @return boolean
     */
    public function isOpposed()
    {
        return $this->opposed;
    }

    /**
     * @param boolean $opposed
     */
    public function setOpposed($opposed)
    {
        $this->opposed = $opposed;
    }

    /**
     * @return boolean
     */
    public function isSuggested()
    {
        return $this->suggested;
    }

    /**
     * @param boolean $suggested
     */
    public function setSuggested($suggested)
    {
        $this->suggested = $suggested;
    }

    /**
     * @return Article
     */
    public function getArticleOpposed()
    {
        return $this->articleOpposed;
    }

    /**
     * @param Article $articleOpposed
     */
    public function setArticleOpposed($articleOpposed)
    {
        $this->articleOpposed = $articleOpposed;
    }

    /**
     * @return Article
     */
    public function getArticleSuggested()
    {
        return $this->articleSuggested;
    }

    /**
     * @param Article $articleSuggested
     */
    public function setArticleSuggested($articleSuggested)
    {
        $this->articleSuggested = $articleSuggested;
    }


    public function __clone()
    {
       $this->id=null;
    }


}