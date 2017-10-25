<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 25/08/2016
 * Time: 23:42
 */

namespace JSAppBundle\Form;


use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class NumeroJournalType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options) {

        $builder->add('numero', null, array(
                'label' => 'Number',
                "required"=>true
            ));
        $builder
            ->add('description', TextareaType::class, array(
                'label' => 'Description',
                "required"=>true
            ));
//        $builder
//            ->add('editeur', EntityType::class, array(
//                'class' => 'JSAppBundle:Utilisateur',
//                'query_builder' => function(EntityRepository $er) {
//                    return $er->findAll();
//                },
//                'attr' => array('class' => 'form-control'),
//                'label' => 'Editor',
//                'choice_label' => 'numero',
//            ));

    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver) {
        $resolver->setDefaults(array(
            'data_class' => 'JSAppBundle\Entity\NumeroJournal',
            'cascade_validation' => true
        ));
    }

}