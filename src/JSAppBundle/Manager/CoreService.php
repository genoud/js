<?php
namespace JSAppBundle\Manager;

use Symfony\Component\DependencyInjection\ContainerInterface as Container;
use Symfony\Component\Security\Core\Encoder\EncoderFactory;

/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 20:37
 */
class CoreService
{
    /**
     * @var Container
     */
    private $container;

    /**
     * @var ArticleManager
     */
    private $articleManager;

    /**
     * @var AuteurManager
     */
    private $auteurManager;

    /**
     * @var CategorieManager
     */
    private $categorieManager;

    /**
     * @var ReviewManager
     */
    private $reviewManager;

    /**
     * @var FichierManager
     */
    private $fichierManager;

    /**
     * @var PersonneManager
     */
    private $personneManager;

    /**
     * @var PublicationManager
     */
    private $publicationManager;

    /**
     * @var RoleManager
     */
    private $roleManager;

    /**
     * @var TypeArticleManager
     */
    private $typeArticleManager;

    /**
     * @var TypeFichierManager
     */
    private $typeFichierManager;

    /**
     * @var UtilisateurManager
     */
    private $utilisateurManager;

    /**
     * @var CoAuteurManager
     */
    private $coAuteurManager;
/**
     * @var CoAuteurManager
     */
    private $fundingManager;

    /**
     * @var ArticleReviewerManager
     */
    private $articleReviewerManager;

    /**
     * @var ReviewRequestManager
     */
    private $reviewRequestManager;

    /**
     * @var NumeroJournalManager
     */
    private $numeroJournalManager;

    /**
     * @var
     */
    private $encoderFactory;


    public function __construct(Container $container)
    {
        $this->container = $container;
    }


    /**
     * @return ArticleManager
     */
    public function getArticleManager()
    {
        if(!isset($this->articleManager)){
            $this->articleManager=new ArticleManager($this->container, $this);
        }
        return $this->articleManager;
    }

    /**
     * @return AuteurManager
     */
    public function getAuteurManager(){
        if(!isset($this->auteurManager)){
            $this->auteurManager=new AuteurManager($this->container, $this);
        }
        return $this->auteurManager;
    }

    /**
     * @return CoAuteurManager
     */
    public function getCoAuteurManager(){
        if(!isset($this->coAuteurManager)){
            $this->coAuteurManager=new CoAuteurManager($this->container, $this);
        }
        return $this->coAuteurManager;
    }

    /**
     * @return FundingManager
     */
    public function getFundingManager(){
        if(!isset($this->fundingManager)){
            $this->fundingManager=new FundingManager($this->container, $this);
        }
        return $this->fundingManager;
    }

    /**
     * @return ArticleReviewerManager
     */
    public function getArticleReviewerManager(){
        if(!isset($this->articleReviewerManager)){
            $this->articleReviewerManager=new ArticleReviewerManager($this->container, $this);
        }
        return $this->articleReviewerManager;
    }

    /**
     * @return CategorieManager
     */
    public function getCategorieManager(){
        if(!isset($this->categorieManager)){
            $this->categorieManager=new CategorieManager($this->container, $this);
        }
        return $this->categorieManager;
    }

    /**
     * @return ReviewManager
     */
    public function getReviewManager(){
        if(!isset($this->reviewManager)){
            $this->reviewManager=new ReviewManager($this->container, $this);
        }
        return $this->reviewManager;
    }

    /**
     * @return FichierManager
     */
    public function getFichierManager(){
        if(!isset($this->fichierManager)){
            $this->fichierManager=new FichierManager($this->container, $this);
        }
        return $this->fichierManager;
    }

    /**
     * @return PersonneManager
     */
    public function getPersonneManager(){
        if(!isset($this->personneManager)){
            $this->personneManager=new PersonneManager($this->container, $this);
        }
        return $this->personneManager;
    }

    /**
     * @return PublicationManager
     */
    public function getPublicationManager(){
        if(!isset($this->publicationManager)){
            $this->publicationManager=new PublicationManager($this->container, $this);
        }
        return $this->publicationManager;
    }

    /**
     * @return RoleManager
     */
    public function getRoleManager(){
        if(!isset($this->roleManager)){
            $this->roleManager=new RoleManager($this->container, $this);
        }
        return $this->roleManager;
    }

    /**
     * @return TypeArticleManager
     */
    public function getTypeArticleManager(){
        if(!isset($this->typeArticleManager)){
            $this->typeArticleManager=new TypeArticleManager($this->container, $this);
        }
        return $this->typeArticleManager;
    }

    /**
     * @return TypeFichierManager
     */
    public function getTypeFichierManager(){
        if(!isset($this->typeFichierManager)){
            $this->typeFichierManager=new TypeFichierManager($this->container, $this);
        }
        return $this->typeFichierManager;
    }

    /**
     * @return UtilisateurManager
     */
    public function getUtilisateurManager(){
        if(!isset($this->utilisateurManager)){
            $this->utilisateurManager=new UtilisateurManager($this->container, $this);
        }
        return $this->utilisateurManager;
    }

    /**
     * @return ReviewRequestManager
     */
    public function getReviewRequestManager(){
        if(!isset($this->reviewRequestManager)){
            $this->reviewRequestManager=new ReviewRequestManager($this->container, $this);
        }
        return $this->reviewRequestManager;
    }

    /**
     * @return NumeroJournalManager
     */
    public function getNumeroJournalManager(){
        if(!isset($this->numeroJournalManager)){
            $this->numeroJournalManager=new NumeroJournalManager($this->container, $this);
        }
        return $this->numeroJournalManager;
    }

    /**
     * @return EncoderFactory
     */
    public function getEncoderFactory() {
        if($this->encoderFactory==null){
            $this->encoderFactory=$this->container->get("security.encoder_factory");
        }
        return $this->encoderFactory;
    }


}