<?php
/**
 * Created by PhpStorm.
 * User: Didi
 * Date: 10/02/2017
 * Time: 15:01
 */
namespace AppBundle\Controller;
use AppBundle\Form\MediaForm;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MediaController extends Controller
{
    /**
     * @Route("/medias", name="list_medias")
     */
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();

        $medias = $em->getRepository('AppBundle\Entity\Media')
            ->findAll();

        dump($medias);//die;

        return new Response('end listAction (MediaController)');
    }

    /**
     * @Route("/medias/new", name="new_media")
     */
    public function newAction(Request $request)
    {
        $form = $this->createForm(MediaForm::class);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            //dump($form->getData());die;
            $media = $form->getData();
            $media->setMediaType($media->getMediaTypeFromUrl());
            $media->setMetadata($media->searchMetadata());
            $em = $this->getDoctrine()->getManager();
            $em->persist($media);
            $em->flush();
            return new Response("Media created.<pre><code>".print_r($media,true).'</code></pre>');
        }

        return $this->render('media/new.html.twig', [
            'mediaForm' => $form->createView()
        ]);
    }
    /**
     * @Route("/medias/{id}/play", name="play_media")
     */
    public function playAction($id)
    {
        $em = $this -> getDoctrine() -> getManager();
        $media = $em -> getRepository('AppBundle\Entity\Media')
            -> findOneBy(['id' => $id]);
        dump($media);//die;
        switch ($media->getMediaType()) {
            case '21000':
            case '21001':
            case '12000':
            case '20001':
                return $this -> render(
                    /*'media/play_21001.html.twig'*/
                    'media/play.html.twig', [
                    'media' => $media,
                    'mediaTyOnPlayerReadyStr' => "var tmltmtlmtl='42'"
                    /*
                    'mediaIdPlateform' => ($media -> searchIdPlatform()),
                    'mediaUrl' => ($media -> getUrl()),
                    'mediaName' => ($media -> getName()),
                    'mediaMetadata' => ($media -> getMetadata()),
                    'mediaTyLoadStr' => ("videoId: '". ($media -> searchIdPlatform()) . "',"), // comment ne pas encoder les ' ???
                    'mediaTyOnPlayerReadyStr' => '' */
                ]);
            //echo '<div id="player"></div>';
        }
        return new Response("end playAction ($id)");
    }

    /**
     * @Route("/medias/{id}/render", name="render_media")
     */
    public function renderAction($id)
    {
        $em = $this -> getDoctrine() -> getManager();
        $media = $em -> getRepository('AppBundle\Entity\Media')
            -> findOneBy(['id' => $id]);
        dump($media);//die;
        switch ($media->getMediaType()) {
            case '21001':
                return $this -> render(
                /*'media/play_21001.html.twig'*/
                    'media/play.html.twig', [
                    'media' => $media,
                    'mediaTyOnPlayerReadyStr' => "var tmltmtlmtl='42'"
                    /*
                    'mediaIdPlateform' => ($media -> searchIdPlatform()),
                    'mediaUrl' => ($media -> getUrl()),
                    'mediaName' => ($media -> getName()),
                    'mediaMetadata' => ($media -> getMetadata()),
                    'mediaTyLoadStr' => ("videoId: '". ($media -> searchIdPlatform()) . "',"), // comment ne pas encoder les ' ???
                    'mediaTyOnPlayerReadyStr' => '' */
                ]);
            //echo '<div id="player"></div>';
        }
        return new Response("end playAction ($id)");
    }


    /**
     * @Route("/medias/{$id}", name="show_media")
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $media = $em->getRepository('AppBundle\Entity\Media')
            ->findOneBy(['id' => $id]);

        dump($media);//die;
        //dump($media->searchMetadata());
        return new Response('Show Media.'  );
    }
}
