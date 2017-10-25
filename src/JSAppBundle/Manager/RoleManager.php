<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 21:27
 */

namespace JSAppBundle\Manager;

use JSAppBundle\Dao\RoleRepository;
use JSAppBundle\Entity\Role;
use Symfony\Component\DependencyInjection\ContainerInterface as Container;
class RoleManager extends CoreManager
{

    public function __construct(Container $container, CoreService $core)
    {
        $entityClass="JSAppBundle\Entity\Role";
        parent::__construct($container, $core, $entityClass);
    }

    /**
     * @param string $code
     * @return Role
     */
    public function getRoleByCode($code){
        $repo=$this->getRepository();
        $roles=$repo->findByCode($code);
        if(isset($roles) && count($roles)>0){
            return $roles[0];
        }
        return null;
    }
    /**
     * @return RoleRepository
     */
    public function getRepository()
    {
        return parent::getRepository();
    }
}