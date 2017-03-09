<?php
/**
 * Created by PhpStorm.
 * User: Didi
 * Date: 10/02/2017
 * Time: 15:01
 */
namespace AppBundle\Controller;
use AppBundle\Form\AnnotationForm;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AnnotationController extends Controller
{
    /**
     * @Route("/annotation", name="annotation")
     */
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();

        $tcs = $em->getRepository('AppBundle\Entity\Annotation')
            ->findAll();

        dump($tcs);//die;

        return new Response('end listAction (AnnotationController)');
    }

    /**
     * @Route("/annotation/new", name="new_annotation")
     */
    public function newAction(Request $request)
    {
        $form = $this->createForm(AnnotationForm::class,null,array(
            'entity_manager' => $this->get('doctrine.orm.entity_manager')
        ));

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

            $tcPR = $form->getData();
            $tcPR -> setAnnotationType(
                $tcPR->searchAnnotationType());
            //dump($tcPR);die;
            $em = $this->getDoctrine()->getManager();
            $em->persist($tcPR);
            $em->flush();
            return new Response("annotation created.<pre><code>".print_r($tcPR,true).'</code></pre>');
        }

        return $this->render('annotation/new.html.twig', [
            'AnnotationForm' => $form->createView()
        ]);
    }

    /**
     * @Route("/annotation/{$id}/render", name="render_annotation")
     */
    public function renderAction($id)
    {
        $em = $this -> getDoctrine() -> getManager();
        $tc = $em -> getRepository('AppBundle\Entity\Annotation')
            -> findOneBy(['id' => $id]);
        dump($tc);//die;
        return new Response("end renderAction Annotation ($id)");
    }


    /**
     * @Route("/annotation/{$id}", name="show_annotation")
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $tc = $em->getRepository('AppBundle\Entity\Annotation')
            ->findOneBy(['id' => $id]);

        dump($tc);//die;
        //dump($media->searchMetadata());
        return new Response('Show Annotation.'  );
    }
}
