<?php
/**
 * Created by PhpStorm.
 * User: maglo
 * Date: 25/08/2016
 * Time: 23:42
 */

namespace JSAppBundle\Form;


use Doctrine\ORM\EntityRepository;
use JSAppBundle\Entity\ArticleAppreciation;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ReviewType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options) {


        $appreciations=ArticleAppreciation::getAppreciationList();
        $result=array();
        foreach($appreciations as $prop){
            $result[$prop["libelle"]]=$prop["code"];
        }
//        var_dump($result);
//        return $result;

        $builder
            ->add('appreciation', ChoiceType::class, array(
                'label' => 'Appreciation',
                "choices"=>$result
            ))
            ->add('needReview', null, array('label' => 'Need Review'))
            ->add('titre', null, array('label' => 'Title'))
            ->add('content', TextareaType::class, array('label' => 'Review content'))
        ;


    }


    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver) {
        $resolver->setDefaults(array(
            'data_class' => 'JSAppBundle\Entity\Review',
            'cascade_validation' => true
        ));
    }

}