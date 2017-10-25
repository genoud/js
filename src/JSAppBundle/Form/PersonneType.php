<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 25/08/2016
 * Time: 23:42
 */

namespace JSAppBundle\Form;


use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CountryType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PersonneType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder
            ->add('image', FileType::class, array('label' => "Picture", "required"=>false))

            ->add('titre', ChoiceType::class, array(
                'choices' => array(""=>"","Mr."=>"Mr.","Ms."=>"Ms.","Pr."=>"Pr.", "Dr."=>"Dr."),
                'required' => true,
                'attr' => array('tabindex' => '1'),
                'placeholder' => 'Title'))
            ->add('nom', null, array( 'label' => 'Last Name :','required' => true,
                'attr' => array('tabindex' => '2'),))
            ->add('prenom', null, array('label' => 'First Name :','required' => true,
                'attr' => array('tabindex' => '3')))
            ->add('email', EmailType::class, array('label' => 'Email :', 'attr' => array('tabindex' => '4')))
            ->add('telephone', null, array( 'label' => 'Phone number :','required' => true, 'attr' => array('tabindex' => '5')))
            ->add('pays', CountryType::class, array('label' => 'Country :', 'attr' => array('tabindex' => '6')))
            ->add('ville', null, array( 'label' => 'Town: ', 'attr' => array('tabindex' => '7')))
            ->add('etat', null, array( 'label' => 'State / Region / Province:','required' => false, 'attr' => array('tabindex' => '8')))
            ->add('codePostale', null, array( 'label' => 'Zip Code:','required' => false, 'attr' => array('tabindex' => '9')))
            ->add('adresse', TextAreaType::class, array( 'label' => 'Address :', 'attr' => array('tabindex' => '10')))
            ->add('institution', null, array('label' => 'Institution', "required"=>true, 'attr' => array('tabindex' => '11')))
            ->add('departement', null, array('label' => 'Department', "required"=>true, 'attr' => array('tabindex' => '12')))
            ->add('affiliation', null, array('label' => 'Affiliation', "required"=>true, 'attr' => array('tabindex' => '13')))



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
            'data_class' => 'JSAppBundle\Entity\Personne',
            'cascade_validation' => true
        ));
    }

}