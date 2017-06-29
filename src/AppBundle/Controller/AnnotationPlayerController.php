<?php
/**
 * Created by AV
 * Date: 01/06/2017
 * Time: 15:01
 */
namespace AppBundle\Controller;
use AppBundle\Form\WaveForm;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Entity\AnnotationPlayer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AnnotationPlayerController extends Controller
{

    /**
     * @Route("/ap/{idPlayer}/route", name="showPlayerRoute", options={"expose"=true})
     */
    public function showRouteAction($idPlayer)
    {
        $em = $this -> getDoctrine() -> getManager();
        $apObject = $em
            -> getRepository('AppBundle\Entity\AnnotationPlayer')
            -> findOneBy(['id' => $idPlayer]);
        return new Response(  $this -> generateUrl($apObject -> getRoute(), array(), true));
    }

}
