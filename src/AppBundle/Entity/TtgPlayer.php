<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class TtgPlayer
 * @package AppBundle\Entity
 * @ORM\Entity(repositoryClass="TtgPlayerRepository")
 * @ORM\Table(name="TtgPlayer")
 */
class TtgPlayer
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
    private $ttgPlayerConfigId;

    /**
     * @ORM\Column(type="integer",nullable=true)
     */
    private $currentMediaId;

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
    public function getTtgPlayerConfigId()
    {
        return $this->ttgPlayerConfigId;
    }

    /**
     * @param mixed $ttgPlayerConfigId
     * @return TtgPlayer
     */
    public function setTtgPlayerConfigId($ttgPlayerConfigId)
    {
        $this->ttgPlayerConfigId = $ttgPlayerConfigId;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCurrentMediaId()
    {
        return $this->currentMediaId;
    }

    /**
     * @param mixed $currentMediaId
     * @return TtgPlayer
     */
    public function setCurrentMediaId($currentMediaId)
    {
        $this->currentMediaId = $currentMediaId;
        return $this;
    }

    /**
     * @return Media
     */
    public function getCurrentMedia()
    {
        $em = $this -> getDoctrine() -> getManager();
        $media = $em -> getRepository('AppBundle\Entity\Media')
            -> findOneBy(['id' => $this->currentMediaId]);
        return $media ;
    }

}