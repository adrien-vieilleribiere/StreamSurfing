<?php

namespace AppBundle\Form;

use AppBundle\Entity\Media;
use AppBundle\Entity\TtgPlayer;
use AppBundle\Entity\TtgPlayerConfig;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


class TtgPlayerConfigForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('route');
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
          'data_class' => TtgPlayerConfig::class
        ]);
    }
}
