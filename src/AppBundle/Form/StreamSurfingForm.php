<?php

namespace AppBundle\Form;

use AppBundle\Entity\StreamSurfing;
use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\Annotation;
use AppBundle\Entity\Media;
use AppBundle\Entity\StreamSurfModel;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


class StreamSurfingForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        //print_r($options);die;
        $builder
            -> add('name')
            -> add('streamSurfModelId',ChoiceType::class, array(
                'choices' => $this->buildSSModelChoices($options),
                'choice_translation_domain' => false
            ))
            ->add('streamSurfMediaId',ChoiceType::class, array(
                'choices' => $this->buildSSMediaChoices($options),
                'choice_translation_domain' => false
            ))
            -> add('streamSurfMediaPlayerId',ChoiceType::class, array(
                'choices' => $this->buildSSMediaPlayerChoices($options),
                'choice_translation_domain' => false
            ))
            /* -> add('streamSurfAnnotationPlayerId',ChoiceType::class, array(
                'choices' => $this->buildSSAnnotationPlayerChoices($options),
                'choice_translation_domain' => false
            ))*/
            -> add('streamSurfWaveId',ChoiceType::class, array(
                'choices' => $this->buildWaveChoices($options),
                'choice_translation_domain' => false
            ))

            -> add('param')
        ;
    }

    public function buildSSModelChoices($options) {
        $choices = [];
        $em = $options['entity_manager'];
        $table2Repository = $em -> getRepository('AppBundle\Entity\StreamSurfModel');
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

    public function buildSSMediaChoices($options) {
        $choices = [];
        $em = $options['entity_manager'];
        $table2Repository = $em -> getRepository('AppBundle\Entity\Media');
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

    public function buildSSMediaPlayerChoices($options) {
        $choices = [];
        $em = $options['entity_manager'];
        $table2Repository = $em -> getRepository('AppBundle\Entity\MediaPlayer');
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

    public function buildSSAnnotationPlayerChoices($options) {
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

    public function buildWaveChoices($options) {
        $choices = [];
        $em = $options['entity_manager'];
        $table2Repository = $em -> getRepository('AppBundle\Entity\Wave');
        $table2Objects = $table2Repository -> findAll();
        // print_r($table2Objects);die;
        foreach ($table2Objects as $table2Obj) {
            /*$choices[$table2Obj->getName() . " [" . $table2Obj->getParam() . "]" ]
                = $table2Obj->getId();
            */
            $choices[ $table2Obj -> getId() . " - " . $table2Obj -> getName()]
                = $table2Obj -> getId();
        }
        return $choices;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
          'data_class' => StreamSurfing::class
        ]);
        $resolver->setRequired('entity_manager');
    }
}
