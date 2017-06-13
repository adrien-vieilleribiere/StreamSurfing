<?php
/**
 * Created by PhpStorm.
 * User: Didi
 * Date: 10/02/2017
 * Time: 15:01
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Playlist;
use AppBundle\Form\PlaylistForm;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PlaylistController extends Controller
{
    /**
     * @Route("/playlists", name="list_playlists")
     */
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();

        $playlists = $em->getRepository('AppBundle\Entity\Playlist')
            ->findAll();

        dump($playlists);//die;

        return new Response('end listAction (PlaylistController)');
    }

    /**
     * @Route("/playlists/new", name="new_playlist")
     */
    public function newAction(Request $request)
    {
        $form = $this->createForm(PlaylistForm::class);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $playlist = $form->getData();
            dump($form->getData());//die;

            $em = $this->getDoctrine()->getManager();
            $em->persist($playlist);
            $em->flush();

            return new Response("Playlist created.");
        }

        return $this->render('playlist/newModel.html.twig', [
            'playlistForm' => $form->createView()
        ]);
    }


    /**
     * @Route("/playlists/{id}", name="show_playlist")
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $playlist = $em->getRepository('AppBundle\Entity\Playlist')
            ->findOneBy(['id' => $id]);

        dump($playlist);//die;

        return new Response('Show Playlist.');
    }


}