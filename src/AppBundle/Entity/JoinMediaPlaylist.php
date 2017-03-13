<?php
/**
 * Created by PhpStorm.
 * User: Didi
 * Date: 10/02/2017
 * Time: 17:40
 */

namespace AppBundle\Entity;


use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="join_media_playlist")
 */
class JoinMediaPlaylist
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
    private $playlistId;
    /**
     * @ORM\Column(type="integer")
     */
    private $mediaId;

    /**
     * @ORM\Column(type="string")
     */
    private $position;
}