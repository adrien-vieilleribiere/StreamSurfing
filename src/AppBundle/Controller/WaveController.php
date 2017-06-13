<?php
/**
 * Created by AV
 * Date: 01/06/2017
 * Time: 15:01
 */
namespace AppBundle\Controller;
use AppBundle\Form\WaveForm;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Entity\Annotation;
use AppBundle\Entity\AnnotationPlayer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class WaveController extends Controller
{

    /**
     * @Route("/w/new", name="new_Wave")
     */
    public function newAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $form = $this->createForm(WaveForm::class,null,array(
            'entity_manager' => $this->get('doctrine.orm.entity_manager')
        ));
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            //dump($form->getData());die;
            $sSConf = $form->getData();
            $em = $this->getDoctrine()->getManager();
            $em->persist($sSConf);
            $em->flush();
            return new Response('<h2>'
                . $this -> get('translator') -> trans('Wave created')
                . '</h2>'
                . '<pre><code>' . print_r($sSConf,true) . '</code></pre>'
                . '<ul>'
                . '<li>'
                . '<a href="list">'
                . $this -> get('translator') -> trans('See Available Waves')
                . '</a>'
                . '</li>'
                . '<li>'
                . '<a href="new">'
                . $this -> get('translator') -> trans('Create a new Wave')
                . '</a>'
                . '</li>'
                . '</ul>'      );
        }

        return $this->render('wave/new.html.twig', [
            'WaveForm' => $form->createView()
        ]);
    }


    /**
     * @Route("/w/list", name="list_Waves")
     */
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();
        $sSWaves = $em->getRepository('AppBundle\Entity\Wave')
            ->findAll();
        dump($sSWaves);//die;
        return new Response('end listAction (list_Waves)');
    }


}
