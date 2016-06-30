<?php

namespace JSAppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Typefichier
 *
 * @ORM\Table(name="typefichier")
 * @ORM\Entity(repositoryClass="JSAppBundle\Dao\TypeFichierRepository")
 */
class Typefichier
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
     * @ORM\Column(name="intitule", type="string", length=254, nullable=true)
     */
    private $intitule;

    /**
     * @var boolean
     *
     * @ORM\Column(name="inclure", type="boolean", nullable=true)
     */
    private $inclure;

    /**
     * @var integer
     *
     * @ORM\Column(name="rang", type="integer", nullable=true)
     */
    private $rang;

    /**
     * @var boolean
     *
     * @ORM\Column(name="obligatoire", type="boolean", nullable=true)
     */
    private $obligatoire;

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
     * @return boolean
     */
    public function isInclure()
    {
        return $this->inclure;
    }

    /**
     * @param boolean $inclure
     */
    public function setInclure($inclure)
    {
        $this->inclure = $inclure;
    }

    /**
     * @return int
     */
    public function getRang()
    {
        return $this->rang;
    }

    /**
     * @param int $rang
     */
    public function setRang($rang)
    {
        $this->rang = $rang;
    }

    /**
     * @return boolean
     */
    public function isObligatoire()
    {
        return $this->obligatoire;
    }

    /**
     * @param boolean $obligatoire
     */
    public function setObligatoire($obligatoire)
    {
        $this->obligatoire = $obligatoire;
    }



}

