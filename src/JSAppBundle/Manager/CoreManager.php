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
use JSAppBundle\Entity\Utilisateur;
use Swift_Attachment;
use Swift_Message;
use Symfony\Bridge\Monolog\Logger;
use Symfony\Component\DependencyInjection\ContainerInterface as Container;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;

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

        $this->getEm()->persist($obj);
        $this->getEm()->flush();
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
        $this->getEm()->flush();
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


    /**
     * @return TokenStorage
     */
    protected function getTokeStorage()
    {
        return $this->getContainer()->get("security.token_storage");
    }

    /**
     * @return Utilisateur
     */
    public function getConnectedUser()
    {
        $token = $this->getTokeStorage()->getToken();
        $user = null;
        if (isset($token)) {
            $user = $token->getUser();
        }
        if (is_a($user, '\JSAppBundle\Entity\Utilisateur')) {
            return $user;
        }
        return null;
    }

    /**
     * @return Logger
     */
    public function getLogger()
    {
        return $this->getContainer()->get("logger");
    }


    public function sendEmail($objet, $destinataire, $content, $from = "contact@capvcm.com", $attachments = array())
    {

        $message = Swift_Message::newInstance()
            ->setSubject($objet)
            ->setFrom($from)
            ->setTo($destinataire)
            ->setBody(
                $content,
                'text/html'
            );
        if (count($attachments) > 0) {
            foreach ($attachments as $attachment) {
                $message->attach(Swift_Attachment::fromPath($attachment));
            }
        }

        $this->container->get('mailer')->send($message);
    }

    public function renderView($view, $parameters)
    {
        if ($this->container->has('templating')) {
            return $this->container->get('templating')->render($view, $parameters);
        }

        if (!$this->container->has('twig')) {
            throw new \LogicException('You can not use the "renderView" method if the Templating Component or the Twig Bundle are not available.');
        }

        return $this->container->get('twig')->render($view, $parameters);
    }

}