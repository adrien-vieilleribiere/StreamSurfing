<?php
/**
 * Created by PhpStorm.
 * User: Didi
 * Date: 10/02/2017
 * Time: 15:01
 */
namespace AppBundle\Controller;
use AppBundle\Form\TtgPlayerConfigForm;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TtgPlayerConfigController extends Controller
{
    /**
     * @Route("/playerConf", name="list_players_confs")
     */
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();

        $playersConfs = $em->getRepository('AppBundle\Entity\TtgPlayerConfig')
            ->findAll();

        dump($playersConfs);//die;

        return new Response('end listAction (TtgPlayerController)');
    }

    /**
     * @Route("/playerConf/new", name="new_playerConf")
     */
    public function newAction(Request $request)
    {
        $form = $this->createForm(TtgPlayerConfigForm::class);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            //dump($form->getData());die;
            $playerConf = $form->getData();
            $em = $this->getDoctrine()->getManager();
            $em->persist($playerConf);
            $em->flush();
            return new Response("PlayerConf created.<pre><code>".print_r($playerConf,true).'</code></pre>');
        }

        return $this->render('ttgPlayerConfig/newModel.html.twig', [
            'TtgPlayerConfigForm' => $form->createView()
        ]);
    }

}
