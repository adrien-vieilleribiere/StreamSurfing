<?php

namespace AppBundle\Form;

use AppBundle\Entity\Media;
use AppBundle\Entity\TtgPlayer;
use AppBundle\Entity\TtgPlayerConfig;
use AppBundle\Entity\StreamSurfModel;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


class StreamSurfModelNewForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('route')
            ->add('param');
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
          'data_class' => StreamSurfModel::class
        ]);
    }
}
