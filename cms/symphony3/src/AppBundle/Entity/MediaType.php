<?php
/**
 * Created by PhpStorm.
 * User: Didi
 * Date: 10/02/2017
 * Time: 15:15
 */

namespace AppBundle\Entity;


use Doctrine\ORM\Mapping as ORM;

/*
$media->setMediaType(10000); // native sound
$media->setMediaType(10001); // mp3
$media->setMediaType(10002); // ogg
$media->setMediaType(11000); // soundcloud audio
$media->setMediaType(12000); // pul-lup audio

$media->setMediaType(20000); // native video
$media->setMediaType(20001); // mp4
$media->setMediaType(20002); // mkv
$media->setMediaType(20003); // avi
$media->setMediaType(21000); // youtube video
$media->setMediaType(21001); // youtube video in a playlist
$media->setMediaType(21100); // youtube playlist
$media->setMediaType(22000); // vimeo video

*/



/**
 * Class MediaType
 * @package AppBundle\Entity
 * @ORM\Entity
 * @ORM\Table(name="mediatype")
 */
class MediaType
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */private $id;

    /**
     * @ORM\Column(type="string")
     */
    private $name;

}