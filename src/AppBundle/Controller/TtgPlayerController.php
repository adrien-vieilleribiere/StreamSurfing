<?php
/**
 * Created by PhpStorm.
 * User: Didi
 * Date: 10/02/2017
 * Time: 15:01
 */
namespace AppBundle\Controller;
use AppBundle\Entity\TtgPlayer;
use AppBundle\Form\MediaForm;
use AppBundle\Form\TtgPlayerForm;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TtgPlayerController extends Controller
{
    /**
     * @Route("/player", name="list_players")
     */
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();

        $players = $em->getRepository('AppBundle\Entity\TtgPlayer')
            ->findAll();

        dump($players);//die;

        return new Response('end listAction (TtgPlayerController)');
    }

    /**
     * @Route("/player/new", name="new_player")
     */
    public function newAction(Request $request)
    {
        $form = $this->createForm(TtgPlayerForm::class);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            //dump($form->getData());die;
            $player = $form->getData();
            $em = $this->getDoctrine()->getManager();
            $em->persist($player);
            $em->flush();
            return new Response("Player created.<pre><code>".print_r($player,true).'</code></pre>');
        }

        return $this->render('ttgPlayer/newModel.html.twig', [
            'playerForm' => $form->createView()
        ]);
    }
    /**
     * @Route("/player/{idplayerConfig}/{idMedia}", name="player_playerConfig_media")
     */
    public function playAction($idplayerConfig,$idMedia)
    {
        $em = $this -> getDoctrine() -> getManager();
        $playerConfig = $em -> getRepository('AppBundle\Entity\TtgPlayerConfig')
            -> findOneBy(['id' => $idplayerConfig]);
        // dump($playerConfig);
        $media = $em -> getRepository('AppBundle\Entity\Media')
            -> findOneBy(['id' => $idMedia]);
        // dump($media);
        // die;
        //$randomStr = 'ttgPlayer' . base64_encode(random_bytes(10));
        $randomInt = random_int(1, 1000000);
        $randomStrHtml = 'player' . $randomInt;
        $randomStrJs = 'ttgPlayer' . $randomInt;
        return $this->render(
            $playerConfig->getRoute(),
            [
                'playerConfig' => $playerConfig,
                'media' => $media,
                'randomKey' => $randomInt,
                'playerHtmlId' => $randomStrHtml,
                'playerJsId' => $randomStrJs
            ]);

        // return new Response("end playAction ($idplayerConfig,$idMedia)");
    }

}
