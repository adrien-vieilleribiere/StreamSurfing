<?php
/**
 * Created by AV
 * Date: 10/02/2017
 * Time: 15:01
 */
namespace AppBundle\Controller;
use AppBundle\Form\StreamSurfingForm;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class StreamSurfingController extends Controller
{
    /**
     * @Route("/sS", name="list_streamSurfings")
     */
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();

        $sSConfs = $em->getRepository('AppBundle\Entity\StreamSurfing')
            ->findAll();

        dump($sSConfs);//die;

        return new Response('end listAction (list_streamSurfings)');
    }

    /**
 * @Route("/sS/new", name="new_streamSurfing")
 */
    public function newAction(Request $request)
    {
        $em = $this -> getDoctrine() -> getManager();
        //$option = Array('entity_manager' => $em); //$form = $this->createForm(StreamSurfingForm::class, $option);
        $form = $this -> createForm(StreamSurfingForm::class,null,array(
            'entity_manager' => $this->get('doctrine.orm.entity_manager')
        ));

        $form -> handleRequest($request);
        if ($form -> isSubmitted() && $form -> isValid()) {
            // dump($form->getData());//die;
            $sSRec = $form -> getData();
            $em = $this -> getDoctrine() -> getManager();
            $em -> persist($sSRec);
            $em -> flush();
            dump($sSRec);
            $sSid = $sSRec -> getId();
            return new Response('<h2>'
                . $this -> get('translator') -> trans('StreamSurfing created')
                . '</h2>'
                . '<pre><code>' . print_r($sSRec,true) . '</code></pre>'
                . '<ul>'
                . '<li>'
                . '<a href="play/' . $sSid . '">'
                . $this -> get('translator') -> trans('Play the created StreamSurfing')
                . '</a>'
                . '</li>'
                . '<li>'
                . '<a href="list">'
                . $this -> get('translator') -> trans('See Available StreamSurfings')
                . '</a>'
                . '</li>'
                . '<li>'
                . '<a href="new">'
                . $this -> get('translator') -> trans('Create a new StreamSurfing')
                . '</a>'
                . '</li>'

                . '</ul>');
        }

        return $this->render('streamSurf/new.html.twig', [
            'StreamSurfingForm' => $form->createView()
        ]);


        return new Response('end listAction (list_streamSurfings)');
    }

    /**
     * @Route("/sS/play/{idStreamSturfing}", name="play_streamSurfing")
     */
    public function playAction($idStreamSturfing)
    {
        $em = $this -> getDoctrine() -> getManager();
        $sSObject = $em
                -> getRepository('AppBundle\Entity\StreamSurfing')
                -> findOneBy(['id' => $idStreamSturfing]);
        dump($sSObject);
        // todo? check coherence between the mediaId and the media given the the wave

        $sSModel = $em
            -> getRepository('AppBundle\Entity\StreamSurfModel')
            -> findOneBy(['id' => $sSObject -> getStreamSurfModelId() ]);
        // dump($sSModel);
        $media = $em
            -> getRepository('AppBundle\Entity\Media')
            -> findOneBy(['id' => $sSObject -> getStreamSurfMediaId() ]);
        // dump($media);
        $mediaId = $media -> getId();
        $mediaPlayer = $em
            -> getRepository('AppBundle\Entity\MediaPlayer')
            -> findOneBy(['id' => $sSObject -> getStreamSurfMediaPlayerId() ]);
        // dump($mediaPlayer);
        $randomInt = random_int(1, 1000000);
        $playerStrHtml = 'player' . $randomInt;
        $playerStrJs = 'ttgPlayer' . $randomInt;
        // $annotBoxHtml = 'an' . $idAnnot . ' ' . $randomInt;
        $annotBoxHtml = 'an' . $randomInt;
        $wave = $em
            -> getRepository('AppBundle\Entity\Wave')
            -> findOneBy(['id' => $sSObject -> getStreamSurfWaveId() ]);
        //dump($wave);
        $annot = $em
            -> getRepository('AppBundle\Entity\Annotation')
            -> findOneBy(['id' => $wave -> getAnnotationId() ]);
        dump($annot);
        $annotScheme = $em -> getRepository('AppBundle\Entity\TtgAnnotationScheme')
            -> findOneBy(['id' => $annot -> getScheme() ]);
        dump($annotScheme);
        $annotSchemeRoute = $annotScheme -> getRoute();
        $annotPlayer = $em
            -> getRepository('AppBundle\Entity\AnnotationPlayer')
            -> findOneBy(['id' => $wave -> getAnnotationPlayerId() ]);
        dump($annotPlayer);
        $mediaRenderer = $this -> render(
            $mediaPlayer -> getRoute(),
            [
                'playerConfig' => $mediaPlayer,
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

        // dump('mediaRenderer');
        // dump($mediaRenderer);
        $waveRenderer =  $this -> render(
            $annotPlayer -> getRoute(),
            [
                'playerConfig' => $mediaPlayer,
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
        dump($waveRenderer);
        $globalRenderer = $this -> render(
            $sSModel -> getRoute(),
            [
                'media' => $media,
                'mediaRender' => $mediaRenderer -> getContent(),
                'waveRender' => $waveRenderer -> getContent()
            ]);
        // dump($globalRenderer);
        return new Response($globalRenderer -> getContent());
        // die;

        /*




            $annotInitPossibilities = Array();
            $annots = $em
                -> getRepository('AppBundle\Entity\Annotation')
                ->findAll();
            // todo : replace this by a "where" clause (with selectable design patern)
            dump($annots);
            if (count($annots) > 0) {
                foreach ($annots as $annot) {
                    if ($annot -> getMedia() == $mediaId) {
                        $annotInitPossibilities [$annot -> getName()]
                            = $annot -> getId();
                    }
                }
            }
            dump($annotInitPossibilities);
            if (count($annotInitPossibilities) > 0) {
                $annotInitPossibilitiesJson = json_encode($annotInitPossibilities) ;
            }
            else {
                echo "no annotatations for initialisation, build it empty.";
                $annotInitPossibilitiesJson = '[]';
            }

            dump($annotInitPossibilitiesJson);





            return new Response($globalRenderer);

            die;
            return new Response("streamSurfing created.<pre><code>".print_r($sSRec,true).'</code></pre>');
            //return new Response("streamSurfing created here.");
        }

        return $this->render('streamSurf/new.html.twig', [
            'StreamSurfingForm' => $form->createView()
        ]);


        return new Response('end listAction (list_streamSurfings)');
         */
    }

}
