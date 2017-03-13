<?php

namespace AppBundle\Form;

use AppBundle\Entity\TcPlaybackRate;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TcPlaybackRateForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
          ->add('min',NumberType::class, array(
                'data' => '0.5',
            ))
            /*    ->add('max')
              ->add('default')
              ->add('distribution')
            */
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
          'data_class' => TcPlaybackRate::class
        ]);
    }
}
