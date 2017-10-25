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

class UtilisateurType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder
            ->add('personne', PersonneType::class, array('label' => 'Identification'))
            ->add('username', null, array('label' => 'Login: ', "required"=>true, 'attr' => array('tabindex' => '14')))
//            ->add('motDePasse', RepeatedType::class, array(
//                'type' => PasswordType::class,
//                'first_options' => array('label' => 'Password:'),
//                'second_options' => array('label' => 'Confirm password :')))
            ->add('active', null, array('label' => 'Active', 'attr' => array('tabindex' => '15')))
            ->add('rolesEntity', EntityType::class, array(
                'class' => 'JSAppBundle:Role',
                'label' => 'User roles',
                'required' => true,
                'multiple' => true,
                'expanded' => true,
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('r');
                },
                'choice_label' => function (Role $role) {
                    return $role->getLibelle();
                },
                'attr' => array('tabindex' => '16')
            ))
        ;
        //$builder->add('id', HiddenType::class);

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