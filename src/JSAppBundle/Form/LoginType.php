<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 25/08/2016
 * Time: 23:42
 */

namespace JSAppBundle\Form;


use Doctrine\ORM\EntityRepository;
use JSAppBundle\Entity\Role;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class LoginType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder
            ->add('username', null, array('label' => 'Login: ', "required"=>true,
                'attr' => array(
                    'class' => 'form-control'
                )))
            ->add('motDePasse', PasswordType::class, array(
                'label' => "Password",
                'attr' => array(
                    'class' => 'form-control'
                )
                ))
        ;

    }


    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver) {
        $resolver->setDefaults(array(
            'data_class' => 'JSAppBundle\Entity\Utilisateur',
            'cascade_validation' => true
        ));
    }

}