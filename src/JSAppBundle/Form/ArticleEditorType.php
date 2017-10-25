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
class ArticleEditorType extends AbstractType
{
    /**
 * @param FormBuilderInterface $builder
 * @param array $options
 */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('editeur', EntityType::class, array(
                'class' => 'JSAppBundle:Utilisateur',
                'placeholder' => 'Choose an editor',
                'query_builder' => function(EntityRepository $er) {

                    $mainEditor='ROLE_JS_MAIN_EDITOR';
                    $editor='ROLE_JS_EDITOR';

                    return $er->createQueryBuilder('u')
                        ->join('u.rolesEntity', 'r')
                        ->where("r.code = :maineditor ")
                        ->orWhere("r.code = :editor ")
                        ->orderBy('u.id', 'ASC')
                        ->setParameter('editor', $mainEditor)
                        ->setParameter('maineditor', $editor)
                        ;
                },
                'label' => 'Editor',
                'expanded'=>false,
                'multiple'=>false,
            ))
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