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
     * @Route("/annotation/{idAnnot}/{idplayerConfig}", name="render_annotation_simple")
     */
    public function renderAction($idAnnot, $idplayerConfig)
    {
        $em = $this -> getDoctrine() -> getManager();
        $annot = $em -> getRepository('AppBundle\Entity\Annotation')
            -> findOneBy(['id' => $idAnnot]);
        dump($annot);
        $media = $em -> getRepository('AppBundle\Entity\Media')
            -> findOneBy(['id' => $annot -> getMedia() ]);
        dump($media);
        $annotScheme = $em -> getRepository('AppBundle\Entity\TtgAnnotationScheme')
            -> findOneBy(['id' => $annot -> getScheme() ]);
        dump($annotScheme);

        $playerConf = $em -> getRepository('AppBundle\Entity\TtgPlayerConfig')
            -> findOneBy(['id' => $idplayerConfig]);
        dump($playerConf);

        $randomInt = random_int(1, 1000000);
        $playerStrHtml = 'player' . $randomInt;
        $playerStrJs = 'ttgPlayer' . $randomInt;
        $annotBoxHtml = 'an' . $idAnnot . ' ' . $randomInt;
        $annotSchemeRoute = $annotScheme -> getRoute();
       //die;
        return $this->render(
            $playerConf->getRoute(),
            [
                'playerConfig' => $playerConf,
                'media' => $media,
                'randomKey' => $randomInt,
                'playerHtmlId' => $playerStrHtml,
                'playerJsId' => $playerStrJs,
                'annotBoxId ' => $annotBoxHtml,
                'annotUrl' =>  $annot -> getUrl(),
                'annotType' => $annot -> getAnnotationType(),
                'annotScheme' => $annot -> getScheme(),
                'annotName' => $annot -> getName(),
                'annotScheme' => $annotScheme,
                'annotSchemeRoute' => $annotSchemeRoute
            ]);
       // return new Response("end renderAction Annotation ($idAnnot)");
    }


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
     * @Route("/annotation/new", name="new_annotation", options={"expose"=true})
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



}
