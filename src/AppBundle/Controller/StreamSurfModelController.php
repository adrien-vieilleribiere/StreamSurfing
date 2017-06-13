<?php
/**
 * Created by AV
 * Date: 01/06/2017
 * Time: 15:01
 */
namespace AppBundle\Controller;
use AppBundle\Form\StreamSurfModelNewForm;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class StreamSurfModelController extends Controller
{

    /**
     * @Route("/sSM/new", name="new_streamSurfModel")
     */
    public function newAction(Request $request)
    {
        $form = $this->createForm(StreamSurfModelNewForm::class);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            //dump($form->getData());die;
            $sSConf = $form->getData();
            $em = $this->getDoctrine()->getManager();
            $em->persist($sSConf);
            $em->flush();
            return new Response("streamSurfModel created.<pre><code>".print_r($sSConf,true).'</code></pre>');
        }

        return $this->render('streamSurf/newModel.html.twig', [
            'StreamSurfModelNewForm' => $form->createView()
        ]);
    }


    /**
     * @Route("/sSM", name="list_streamSurfModels")
     */
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();

        $sSConfs = $em->getRepository('AppBundle\Entity\StreamSurfModel')
            ->findAll();

        dump($sSConfs);//die;

        return new Response('end listAction (list_streamSurfModels)');
    }


}
