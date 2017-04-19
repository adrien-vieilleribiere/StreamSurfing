<?php

namespace AppBundle\Form;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\Annotation;
use AppBundle\Entity\Media;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


class AnnotationForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        //print_r($options);die;
        $builder
            ->add('name')
            ->add('url')
            ->add('scheme')
            ->add('media',ChoiceType::class, array(
                'choices' => $this->buildMediaChoices($options),
                'choice_translation_domain' => false
            ))


            /*
             *
             *
            ->add('annotationType', ChoiceType::class, array(
                'choices'  => array(
                    'srt' => 'srtFile',
                    'json' => 'json_avTV',
                    'csv' => 'csv_av',
                ),
            ))

              ->add('min',NumberType::class, array(
                'data' => '0.5',
            ))

             ->add('max')
              ->add('default')
              ->add('distribution')
            */
        ;
    }

    public function buildMediaChoices($options) {
        $choices          = [];
        $em = $options['entity_manager'];
        $table2Repository = $em->getRepository('AppBundle\Entity\Media');
        $table2Objects    = $table2Repository->findAll();
        foreach ($table2Objects as $table2Obj) {
            $choices[$table2Obj->getName() . " [" . $table2Obj->getUrl() . "]" ]
                = $table2Obj->getId();
        }
        return $choices;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
          'data_class' => Annotation::class
        ]);
        $resolver->setRequired('entity_manager');
    }
}
