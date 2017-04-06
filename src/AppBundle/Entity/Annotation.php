<?php
/**
 * Created by PhpStorm.
 * User: Didi
 * Date: 10/02/2017
 * Time: 17:07
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Class Annotation
 * @package AppBundle\Entity
 * @ORM\Entity(repositoryClass="AnnotationRepository")
 * @ORM\Table(name="annotation")
 */
class Annotation
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     */
    private $name;

    /**
     * @ORM\Column(type="string")
     *
      // todo move to refid of the table AnnotationScheme
     */
    private $scheme;


    /**
     * @ORM\Column(type="string")
     * @Assert\Choice(choices = {"srtFile", "csv_av", "json_avTV"}, message = "please use 'srtFile', 'csv_av' or 'json_avTV'")
     */
    // xxxx to move to integer : refid of the table AnnotationType
    private $annotationType;

    /**
     * @ORM\Column(type="string",nullable=true)
     */
    private $url;

    /**
     * @ORM\Column(type="integer")
     */
    private $media;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getScheme()
    {
        return $this->scheme;
    }

    /**
     * @param mixed $scheme
     */
    public function setScheme($scheme)
    {
        $this->scheme = $scheme;
    }

    /**
     * @return mixed
     */
    public function getAnnotationType()
    {
        return $this->annotationType;
    }

    /**
     * @param mixed $annotationType
     */
    public function setAnnotationType($annotationType)
    {
        $this->annotationType = $annotationType;
    }

    /**
     * @return mixed
     */
    public function getMedia()
    {
        return $this->media;
    }

    /**
     * @param mixed $media
     */
    public function setMedia($media)
    {
        $this->media = $media;
    }

    /**
     * @return mixed
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param mixed $url
     */
    public function setUrl($url)
    {
        $this->url = $url;
    }

    /**
     * @return mixed
     */
    public function searchAnnotationType()
    {
        $urlPi = pathinfo($this->getUrl());
        switch ($urlPi['extension']) {
            case 'srt':
                return 'srtFile';
            case 'csv':
                return 'csv_av';
            case 'json':
                return 'json_avTV';
            default:
                return '';
        }
    }

     /**
         * @return mixed
         */
        public function searchScheme()
        {

            switch ($this->getAnnotationType()) {
                case 'srtFile':
                    return "1";
                case 'csv_av':
                    //todo check columns;
                case 'json_avTV':
                    //todo check dimensions;
                    return "1";
                default:
                    return '1';
            }
        }
}