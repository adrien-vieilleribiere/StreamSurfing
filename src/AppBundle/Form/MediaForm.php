<?php

namespace AppBundle\Form;

use AppBundle\Entity\Media;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


class MediaForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('url');
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
          'data_class' => Media::class
        ]);
    }
}
