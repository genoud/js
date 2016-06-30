<?php
namespace JSAppBundle\Manager;

/**
 * Created by PhpStorm.
 * User: magloire
 * Date: 30/06/2016
 * Time: 20:37
 */
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\DependencyInjection\ContainerInterface as Container;

class CoreManager
{
    /**
     * @var Container
     */
    private $container;

    /**
     * @var CoreService
     */
    private $core;

    /**
     * @var bool
     */
    private static $transactionInProcess = false;

    /**
     * @var EntityManager
     */
    private $em;

    private $entityClass = "";

    public function __construct(Container $container, CoreService $core, $entityClass)
    {
        $this->container = $container;
        $this->core = $core;
        $this->entityClass = $entityClass;
    }

    /**
     * @return EntityManager
     */
    public function getEm()
    {

        if ($this->em == null) {
            $this->em = $this->container->get("doctrine.orm.entity_manager");
        }
        return $this->em;
    }

    /**
     * @return Container
     */
    public function getContainer()
    {
        return $this->container;
    }

    /**
     * @return CoreService
     */
    public function getCore()
    {
        return $this->core;
    }

    public function beginTransaction()
    {
        if (!CoreManager::$transactionInProcess) {
            CoreManager::$transactionInProcess = true;
            $this->getEm()->getConnection()->beginTransaction();
            return true;
        }
        return false;
    }

    public function commitTransaction($state)
    {
        if ($state) {
            $this->getEm()->getConnection()->commit();
            CoreManager::$transactionInProcess = false;
        }
    }

    public function rollbackTransaction($state)
    {
        if ($state) {
            $this->getEm()->getConnection()->rollback();
            CoreManager::$transactionInProcess = false;
        }
    }

    /**
     * @return EntityRepository
     */
    protected function getRepository()
    {
        return $this->getEm()->getRepository($this->entityClass);
    }

    /**
     *
     * @param mixed $obj
     * @return mixed
     */
    public function create($obj)
    {
        $state = $this->beginTransaction();

        $this->em->persist($obj);
        $this->em->flush();
        $this->commitTransaction($state);
        return $obj;


    }

    /**
     *
     * @param mixed $obj
     * @return mixed
     */
    public function update($obj)
    {
        $state = $this->beginTransaction();
        $this->em->flush();
        $this->commitTransaction($state);
        return $obj;

    }

    /**
     *
     * @param $obj
     * @return bool
     */
    public function delete($obj)
    {
        $state = $this->beginTransaction();
        $this->getEm()->remove($obj);
        $this->getEm()->flush();
        $this->commitTransaction($state);
        return true;
    }

    /**
     * @return array
     */
    public function getAll()
    {
        $repository = $this->getRepository();
        return $repository->findAll();
    }

    /**
     * Load
     * @param int $id
     * @return null|object $mixed
     */
    public function load($id)
    {
        $repository = $this->getRepository();
        return $repository->find($id);
    }

}