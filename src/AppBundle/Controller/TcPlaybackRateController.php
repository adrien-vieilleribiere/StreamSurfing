<?php
/**
 * Created by PhpStorm.
 * User: Didi
 * Date: 10/02/2017
 * Time: 15:01
 */
namespace AppBundle\Controller;
use AppBundle\Form\TcPlaybackRateForm;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TcPlaybackRateController extends Controller
{
    /**
     * @Route("/tcPlaybackRate", name="tcPlaybackRate")
     */
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();

        $tcs = $em->getRepository('AppBundle\Entity\TcPlaybackRate')
            ->findAll();

        dump($tcs);//die;

        return new Response('end listAction (TcPlaybackRateController)');
    }

    /**
     * @Route("/tcPlaybackRate/new", name="new_tcPlaybackRate")
     */
    public function newAction(Request $request)
    {
        $form = $this->createForm(TcPlaybackRateForm::class);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            //dump($form->getData());die;
            $tcPR = $form->getData();

            $em = $this->getDoctrine()->getManager();
            $em->persist($tcPR);
            $em->flush();
            return new Response("tcPlaybackRate created.<pre><code>".print_r($tcPR,true).'</code></pre>');
        }

        return $this->render('tc/playbackRate/newModel.html.twig', [
            'TcPlaybackRateForm' => $form->createView()
        ]);
    }

    /**
     * @Route("/tcPlaybackRate/{id}/render", name="render_tcPlaybackRate")
     */
    public function renderAction($id)
    {
        $em = $this -> getDoctrine() -> getManager();
        $tc = $em -> getRepository('AppBundle\Entity\TcPlaybackRate')
            -> findOneBy(['id' => $id]);
        dump($tc);//die;
        return new Response("end renderAction TcPlaybackRate ($id)");
    }


    /**
     * @Route("/tcPlaybackRate/{id}", name="show_tcPlaybackRate")
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $tc = $em->getRepository('AppBundle\Entity\TcPlaybackRate')
            ->findOneBy(['id' => $id]);

        dump($tc);//die;
        //dump($media->searchMetadata());
        return new Response('Show TcPlaybackRate.'  );
    }
}
