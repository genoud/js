<?php
namespace JSAppBundle\Form;

use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 07/07/2016
 * Time: 22:23
 */
class ReviewRequestType extends AbstractType
{
    /**
 * @param FormBuilderInterface $builder
 * @param array $options
 */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('reviewers', EntityType::class, array(
                'class' => 'JSAppBundle:Utilisateur',
                'query_builder' => function(EntityRepository $er) {
                    $reviewer='ROLE_JS_REVIEWER';
                    return $er->createQueryBuilder('u')
                        ->join('u.rolesEntity', 'r')
                        ->where('r.code = :reviewer')
                        ->setParameter('reviewer', $reviewer);
                },
                'label' => 'Reviewers',
                'expanded'=>false,
                'multiple'=>true,
            ))
//            ->add('save', SubmitType::class, array('label' => 'Next'))
//            ->add('cancel', SubmitType::class, array('label' => 'cancel'))
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function setDefaultOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'JSAppBundle\Entity\Article'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'jsappbundle_article';
    }

}