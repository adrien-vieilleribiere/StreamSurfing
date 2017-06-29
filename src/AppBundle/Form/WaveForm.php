<?php

namespace AppBundle\Form;

use AppBundle\Entity\StreamSurfing;
use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\Wave;
use AppBundle\Entity\Annotation;
use AppBundle\Entity\AnnotationPlayer;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


class WaveForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        //dump($options);die;
        $builder
            -> add('name')
            -> add('annotationId',ChoiceType::class, array(
                'choices' => $this->buildAnnotationChoices($options),
                'choice_translation_domain' => false
                /*,
                'multiple'  => true*/
            ))
            -> add('annotationPlayerId',ChoiceType::class, array(
                'choices' => $this->buildAnnotationPlayerChoices($options),
                'choice_translation_domain' => false
            ))
           /*
             ->
            ))


            */
            -> add('param')
        ;
    }


    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
          'data_class' => Wave::class
        ]);
        $resolver->setRequired('entity_manager');
    }

    public function buildAnnotationChoices($options) {
        $choices = [];
        $em = $options['entity_manager'];
        //$em = $this -> getDoctrine() -> getManager();
        $table2Repository = $em -> getRepository('AppBundle\Entity\Annotation');
        $table2Objects = $table2Repository -> findAll();
        // print_r($table2Objects);die;
        foreach ($table2Objects as $table2Obj) {
            /*$choices[$table2Obj->getName() . " [" . $table2Obj->getParam() . "]" ]
                = $table2Obj->getId();
            */
            $choices[$table2Obj -> getId() . " - " . $table2Obj -> getName()]
                = $table2Obj -> getId();
        }
        return $choices;
    }

    public function buildAnnotationPlayerChoices($options) {
        $choices = [];
        $em = $options['entity_manager'];
        $table2Repository = $em -> getRepository('AppBundle\Entity\AnnotationPlayer');
        $table2Objects = $table2Repository -> findAll();
        // print_r($table2Objects);die;
        foreach ($table2Objects as $table2Obj) {
            /*$choices[$table2Obj->getName() . " [" . $table2Obj->getParam() . "]" ]
                = $table2Obj->getId();
            */
            $choices[$table2Obj -> getName()]
                = $table2Obj -> getId();
        }
        return $choices;
    }

}
