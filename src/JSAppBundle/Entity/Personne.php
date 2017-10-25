<?php

namespace JSAppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JSAppBundle\Tools\Tools;
use Symfony\Component\HttpFoundation\File\File;

/**
 * Personne
 *
 * @ORM\Table(name="personne")
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\PersonneRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Personne
{
    const DIRECTORY = "personne";
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
     * @ORM\Column(name="nom", type="string", length=254, nullable=true)
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="prenom", type="string", length=254, nullable=true)
     */
    private $prenom;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=254, nullable=true)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="telephone", type="string", length=254, nullable=true)
     */
    private $telephone;

    /**
     * @var string
     *
     * @ORM\Column(name="adresse", type="string", length=254, nullable=true)
     */
    private $adresse;

    /**
     * @var string
     *
     * @ORM\Column(name="ville", type="string", length=254, nullable=true)
     */
    private $ville;

    /**
     * @var string
     *
     * @ORM\Column(name="code_postale", type="string", length=254, nullable=true)
     */
    private $codePostale;

    /**
     * @var string
     *
     * @ORM\Column(name="etat", type="string", length=254, nullable=true)
     */
    private $etat;

    /**
     * @var string
     *
     * @ORM\Column(name="pays", type="string", length=254, nullable=true)
     */
    private $pays;


    /**
     * @var string
     *
     * @ORM\Column(name="affiliation", type="string", length=254, nullable=true)
     */
    private $affiliation;

    /**
     * @var string
     *
     * @ORM\Column(name="institution", type="string", length=254, nullable=true)
     */
    private $institution;

    /**
     * @var string
     *
     * @ORM\Column(name="departement", type="string", length=254, nullable=true)
     */
    private $departement;


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
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * @param string $nom
     */
    public function setNom($nom)
    {
        $this->nom = $nom;
    }

    /**
     * @return string
     */
    public function getPrenom()
    {
        return $this->prenom;
    }

    /**
     * @param string $prenom
     */
    public function setPrenom($prenom)
    {
        $this->prenom = $prenom;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return string
     */
    public function getTelephone()
    {
        return $this->telephone;
    }

    /**
     * @param string $telephone
     */
    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;
    }

    /**
     * @return string
     */
    public function getAdresse()
    {
        return $this->adresse;
    }

    /**
     * @param string $adresse
     */
    public function setAdresse($adresse)
    {
        $this->adresse = $adresse;
    }

    /**
     * @return string
     */
    public function getVille()
    {
        return $this->ville;
    }

    /**
     * @param string $ville
     */
    public function setVille($ville)
    {
        $this->ville = $ville;
    }

    /**
     * @return string
     */
    public function getCodePostale()
    {
        return $this->codePostale;
    }

    /**
     * @param string $codePostale
     */
    public function setCodePostale($codePostale)
    {
        $this->codePostale = $codePostale;
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
     * @return string
     */
    public function getPays()
    {
        return $this->pays;
    }

    /**
     * @param string $pays
     */
    public function setPays($pays)
    {
        $this->pays = $pays;
    }

    /**
     * @return string
     */
    public function getAffiliation()
    {
        return $this->affiliation;
    }

    /**
     * @param string $affiliation
     */
    public function setAffiliation($affiliation)
    {
        $this->affiliation = $affiliation;
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
    public function getDepartement()
    {
        return $this->departement;
    }

    /**
     * @param string $departement
     */
    public function setDepartement($departement)
    {
        $this->departement = $departement;
    }


//    public function getImage()
//    {
//        return $this->image;
//    }
//
//    public function setImage($image)
//    {
//        $this->$image = $image;
//    }

    /**
     * @ORM\PostLoad()
     */
    public function setImageUrl()
    {

        $rootDir = Tools::getUploadRootDir();

        $dir = Personne::DIRECTORY;

        $personneDir = Tools::createDir($rootDir, $dir, $this->getId());

        $nbFichier = Tools::countFileInDir($personneDir);

        if ($nbFichier == 0) {
            $this->imgUrl = Tools::getWebPath($dir . '/default.png');
        } else {
            $files = glob($personneDir . DIRECTORY_SEPARATOR . "*.*");
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

        $dir = Personne::DIRECTORY;

        echo "uploading images: Image set";
        $rootDir = Tools::getUploadRootDir();
        $personneDir = Tools::createDir($rootDir, $dir, $this->getId());
        Tools::deleteFiles($personneDir);
        $nbFichier = Tools::countFileInDir($personneDir);
        $nbFichier++;
        $nomFichier = $nbFichier . '.' . $this->image->guessExtension();
        $this->image->move($personneDir, $nomFichier);
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

    /**
     * @param string $dir
     */
    public function setDir($dir)
    {
        $this->dir = $dir;
    }

    public function __clone()
    {
        $this->setId(null);
    }

    public function getNomComplet(){
        return $this->prenom." ".$this->getNom();
    }

}

