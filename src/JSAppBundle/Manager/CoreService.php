<?php
namespace JSAppBundle\Manager;

use Symfony\Component\DependencyInjection\ContainerInterface as Container;

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
     * @var CommentaireManager
     */
    private $commentaireManager;

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
     * @return CategorieManager
     */
    public function getCategorieManager(){
        if(!isset($this->categorieManager)){
            $this->categorieManager=new CategorieManager($this->container, $this);
        }
        return $this->categorieManager;
    }

    /**
     * @return CommentaireManager
     */
    public function getCommentaireManager(){
        if(!isset($this->commentaireManager)){
            $this->commentaireManager=new CommentaireManager($this->container, $this);
        }
        return $this->commentaireManager;
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


}