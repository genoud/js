<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 21:22
 */

namespace JSAppBundle\Manager;

use JSAppBundle\Entity\Personne;
use Symfony\Component\DependencyInjection\ContainerInterface as Container;
class PersonneManager extends CoreManager
{

    public function __construct(Container $container, CoreService $core)
    {
        $entityClass="JSAppBundle\Entity\Personne";
        parent::__construct($container, $core, $entityClass);
    }

    /**
     * @param Personne $personne
     * @return Personne
     */
    public function create($personne){
        return parent::create($personne);
    }
}