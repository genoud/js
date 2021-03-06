<?php
namespace JSAppBundle\Form;

use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 07/07/2016
 * Time: 22:23
 */
class ManuscritStep2Type extends AbstractType
{
    /**
 * @param FormBuilderInterface $builder
 * @param array $options
 */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('titreCourt', TextType::class, array(
                'label' => 'Short title'
            ))
            ->add('titreComplet', TextareaType::class, array(
                'label' => 'Long title'
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