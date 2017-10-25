<?php

namespace JSAppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JSAppBundle\Tools\Tools;
use Symfony\Component\HttpFoundation\File\File;

/**
 * Categorie
 *
 * @ORM\Table(name="categorie")
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\CategorieRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Categorie
{
    const DIRECTORY = "category";
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
     * @ORM\Column(name="intitule", type="string", length=254, nullable=true)
     */
    private $intitule;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=254, nullable=true)
     */
    private $description;

    /**
     * @var \Doctrine\Common\Collections\Collection
     * @ORM\ManyToMany(targetEntity="Article", mappedBy="categories" )
     *
     */
    private $articles;

    /**
     * @var File
     */
    public $image;
    private $imgUrl;

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
    public function getIntitule()
    {
        return $this->intitule;
    }

    /**
     * @param string $intitule
     */
    public function setIntitule($intitule)
    {
        $this->intitule = $intitule;
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
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getArticles()
    {
        return $this->articles;
    }

    /**
     * @param \Doctrine\Common\Collections\Collection $articles
     */
    public function setArticles($articles)
    {
        $this->articles = $articles;
    }


    /**
     * @ORM\PostLoad()
     */
    public function setImageUrl()
    {

        $rootDir = Tools::getUploadRootDir();

        $dir = Categorie::DIRECTORY;

        $categoryDir = Tools::createDir($rootDir, $dir, $this->getId());

        $nbFichier = Tools::countFileInDir($categoryDir);

        if ($nbFichier == 0) {
            $this->imgUrl = Tools::getWebPath($dir . '/default.png');
        } else {
            $files = glob($categoryDir . DIRECTORY_SEPARATOR . "*.*");
            if ($files && count($files) > 0) {
                $firstFile = $files[0];
                $index = strripos($firstFile, DIRECTORY_SEPARATOR) + 1;
                $this->imgUrl = Tools::getWebPath($dir . '/' . $this->getId() . '/' . substr($firstFile, $index));
            } else {
                $this->imgUrl = Tools::getWebPath($dir . '/default.png');
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

        if (null === $this->image) {
            echo "uploading images: No files to upload";
            return;
        }

        $dir = Categorie::DIRECTORY;

        echo "uploading images: Image set";
        $rootDir = Tools::getUploadRootDir();
        $categoryDir = Tools::createDir($rootDir, $dir, $this->getId());
        Tools::deleteFiles($categoryDir);
        $nbFichier = Tools::countFileInDir($categoryDir);
        $nbFichier++;
        $nomFichier = $nbFichier . '.' . $this->image->guessExtension();
        $this->image->move($categoryDir, $nomFichier);
        unset($this->image);
        $this->image = null;
        $this->setImageUrl();
    }

    /**
     * @return string
     */
    public function getImgUrl()
    {
        return $this->imgUrl;
    }

    /**
     * @param string $imgUrl
     */
    public function setImgUrl($imgUrl)
    {
        $this->imgUrl = $imgUrl;
    }

    public function __clone()
    {
        $this->id=null;
    }






}

