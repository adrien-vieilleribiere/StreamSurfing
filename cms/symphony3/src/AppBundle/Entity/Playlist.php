<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class Playlist
 * @package AppBundle\Entity
 * @ORM\Entity
 * @ORM\Table(name="playlist")
 */
class Playlist
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

    /*
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\JoinMediaPlaylist", mappedBy="mediaId")
     *  private $mediaId;
     */



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



}