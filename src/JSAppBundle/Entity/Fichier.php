<?php

namespace JSAppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JSAppBundle\Tools\Tools;
use Symfony\Component\HttpFoundation\File\File;

/**
 * Fichier
 *
 * @ORM\Table(name="fichier", indexes={@ORM\Index(name="FK_fichier_avoir_type", columns={"typ_id"}),
 * @ORM\Index(name="FK_fichier_commentaire", columns={"rev_id"}),
 * @ORM\Index(name="FK_fichiers_joint", columns={"art_id"})})
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\FichierRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Fichier
{
    const DIRECTORY = "fichiers";
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
     * @var Review
     *
     * @ORM\ManyToOne(targetEntity="Review")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="rev_id", referencedColumnName="id")
     * })
     */
    private $review;

    /**
     * @var File
     */
    public $fichier;

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
     * @return Review
     */
    public function getReview()
    {
        return $this->review;
    }

    /**
     * @param Review $review
     */
    public function setReview($review)
    {
        $this->review = $review;
    }



    /**
     * @ORM\PostLoad()
     */
    public function setImageUrl()
    {

        $rootDir = Tools::getUploadRootDir();

        $dir = Fichier::DIRECTORY;

        $fichierDir = Tools::createDir($rootDir, $dir, $this->getId());

        $nbFichier = Tools::countFileInDir($fichierDir);

        if ($nbFichier == 0) {
            $this->url = Tools::getWebPath($dir . '/default.png');
        } else {
            $files = glob($fichierDir . DIRECTORY_SEPARATOR . "*.*");
            if ($files && count($files) > 0) {
                $firstFile = $files[0];
                $index = strripos($firstFile, DIRECTORY_SEPARATOR) + 1;
                $this->url = Tools::getWebPath($dir . '/' . $this->getId() . '/' . substr($firstFile, $index));
            } else {
                $this->url = Tools::getWebPath($dir . '/default.png');
            }
        }
    }


    /**
     * @ORM\PostPersist()
     */
    public function postPersist()
    {
        $this->upload();
    }

    /**
     * @ORM\PostUpdate()
     */
    public function upload()
    {

        if (null === $this->fichier) {
            echo "uploading images: No files to upload";
            return;
        }

        $dir = Fichier::DIRECTORY;

        echo "uploading images: Image set";
        $rootDir = Tools::getUploadRootDir();
        $fichierDir = Tools::createDir($rootDir, $dir, $this->getId());
        Tools::deleteFiles($fichierDir);
        $nbFichier = Tools::countFileInDir($fichierDir);
        $nbFichier++;
        $nomFichier = $nbFichier . '.' . $this->fichier->guessExtension();
        $this->fichier->move($fichierDir, $nomFichier);
        unset($this->fichier);
        $this->fichier = null;
        $this->setImageUrl();
    }

    public function __clone()
    {
        $file=new File($this->url);
        $this->fichier=$file;
        $this->id=null;
    }


}

