<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class Media
 * @package AppBundle\Entity
 * @ORM\Entity(repositoryClass="MediaRepository")
 * @ORM\Table(name="media")
 */
class Media
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

     /**
     * @ORM\Column(type="integer")
     */
    private $mediaType;

     /**
     * @ORM\Column(type="string")
     */
    private $url;

    /**
     * @ORM\Column(type="string")
     */
    private $name;

    /**
     * @ORM\Column(type="float")
     *
     */
    private $duration=0;

    /**
     * @ORM\Column(type="string")
     */
    private $metadata;


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
    public function getMediaType()
    {
        return $this->mediaType;
    }

    /**
     * @param mixed $mediaType
     */
    public function setMediaType($mediaType)
    {
        $this->mediaType = $mediaType;
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
    public function getMetadata()
    {
        return $this->metadata;
    }

    /**
     * @param mixed $metadata
     */
    public function setMetadata($metadata)
    {
        $this->metadata = $metadata;
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
    public function getDuration()
    {
        return $this->duration;
    }

    /**
     * @param mixed $duration
     */
    public function setDuration($duration)
    {
        $this->duration = $duration;
    }

    /**
     * @return mixed
     */
    public function searchMetadata()
    {
        switch ($this->mediaType) {
            case 12000  :   // pul-lup audio
            case 21000 : // youtube video
            case 21001 : // youtube video in a playlist
                return '{"name":"' . $this->getName()
                    . '","idPlatform":"' . $this->searchIdPlatform().'"}';
                break;
            default:
                return '{"name":'.$this->getName().'}';
        }
    }
    /**
     * @return mixed
     */
    public function searchIdPlatform()
    {
        $idPlatform='';
        switch ($this->mediaType) {
            case 12000  :   // pul-lup audio
                $urlPi=pathinfo($this->getUrl());
                if (strpos ($urlPi['basename'],"_") !== false){
                    $idPlatform=substr($urlPi['basename'],0,strpos ($urlPi['basename'],"_"));
                }
                return $idPlatform;
                break;
            case 21000 : // youtube video
            case 21001 : // youtube video in a playlist
                // call youtubeAPI // credentials needed
                parse_str( parse_url( $this->getUrl(), PHP_URL_QUERY ), $youtube_array_of_vars );
                if (isset($youtube_array_of_vars['v']) && $youtube_array_of_vars['v']){
                    $idPlatform=$youtube_array_of_vars['v'];
                }
                return $idPlatform;
                break;
            case 10001 : // mp3
            case 20001 : // mp4
                $idPlatform=str_replace('.','_',$urlPi['basename']);
                return $idPlatform;
                break;
            default:
                return '';
        }
    }
    /**
     * @return mixed
     */
    public function searchUrlWithoutExt()
    {
        $urlPi=pathinfo($this->getUrl());
        return $urlPi['dirname']."/".$urlPi['filename'];
    }
    /**
     * @return mixed
     */
    public function getMediaTypeFromUrl()
    {
        $urlPi=pathinfo($this->getUrl());
        switch ($urlPi['dirname']){
            case 'http://pul-lup.com/sound':

                return 12000; // pul-lup audio
                break;
            case 'https://www.youtube.com':
                if (strpos($urlPi['basename'], 'list=') !== false) {
                    if ( (strpos($urlPi['basename'], '&v=') !== false)
                        || (strpos($urlPi['basename'], '?v=') !== false) ) {
                        return 21001; // youtube video in a playlist
                    }
                    else {
                        return 21100; // youtube playlist
                    }
                }
                else {
                    if ( (strpos($urlPi['basename'], '&v=') !== false)
                        || (strpos($urlPi['basename'], '?v=') !== false) ) {
                        return 21000; // youtube video
                    }
                    else{
                        return 0; // unknown
                    }
                }
                break;
            case 'http://time.adrien-v.com/private':
                switch ($urlPi['extension']){
                    case 'mp3':
                        return 10001;
                    case 'mp4':
                        return 20001;
                    default:
                        return 0; // unknown
                }
                break;
            default:
                return 0; // unknown
        }
    }


}