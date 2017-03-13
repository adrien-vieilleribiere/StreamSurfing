<?php

namespace AppBundle\Form;

use AppBundle\Entity\Media;
use AppBundle\Entity\TtgPlayer;
use AppBundle\Entity\TtgPlayerConfig;
use AppBundle\Entity\TtgPlayerConfigRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\OptionsResolver\OptionsResolver;


class TtgPlayerForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $em = TtgPlayerConfigRepository::class->getDoctrine()->getManager();
        $playerConfs = $em->getRepository('AppBundle\Entity\TtgPlayerConfig')
            ->findAll();
        $playerConfigChoices=array();
        if (count ($playerConfs) > 0) {
            foreach ($playerConfs as $playerConf){
                $playerConfigChoices[$playerConf.getId()]
                    =$playerConf.getName();
            }
        }
        $medias = $em->getRepository('AppBundle\Entity\Media')
            ->findAll();

        dump($medias);
        $builder
            ->add('currentMediaId');
        $builder->add('ttgPlayerConfigId', ChoiceType::class, array(
            'choices' => $playerConfigChoices,
        ));
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
          'data_class' => TtgPlayer::class
        ]);
    }
}
