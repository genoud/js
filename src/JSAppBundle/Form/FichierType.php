<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 25/08/2016
 * Time: 23:42
 */

namespace JSAppBundle\Form;


use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CountryType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FichierType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder


            ->add('typeFichier', EntityType::class, array(
                'class' => 'JSAppBundle:Typefichier',
                'label' => 'Attachement type',
                'choice_label' => 'intitule',
                'expanded'=>false,
                'multiple'=>false,
                "required"=>true
//                'data' => '1',
            ))
            ->add('description', TextareaType::class, array( 'label' => 'Description :','required' => false))
            ->add('fichier', FileType::class, array('label' => "Attachement", "required"=>true))

//            //->add('genre', null, array('property_path' => 'genre','label'=>'Genre'))
//            ->add('genre', ChoiceType::class, array(
//                'choices' => array(""=>"","Homme"=>"Homme","Femme"=>"Femme"),
//                'required' => false,
//                'placeholder' => 'Choisir le genre'))
//
//            ->add('dat_nais', DateType::class, array('property_path' => 'datNais',
//                'widget' => 'single_text',
//                'format'=>'dd/MM/yyyy',
//                'label' => 'Date de naissance :'))
//
//
//
//            ->add('lieu_nais', null, array('property_path' => 'lieuNais', 'label' => 'Lieu de naissance :'))
        ;
        //$builder->add('id', HiddenType::class);

    }


    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver) {
        $resolver->setDefaults(array(
            'data_class' => 'JSAppBundle\Entity\Fichier',
            'cascade_validation' => true
        ));
    }

}