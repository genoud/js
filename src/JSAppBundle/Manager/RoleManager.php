<?php
/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 21:27
 */

namespace JSAppBundle\Manager;

use Symfony\Component\DependencyInjection\ContainerInterface as Container;
class RoleManager extends CoreManager
{

    public function __construct(Container $container, CoreService $core)
    {
        $entityClass="JSAppBundle\Entity\Role";
        parent::__construct($container, $core, $entityClass);
    }
}