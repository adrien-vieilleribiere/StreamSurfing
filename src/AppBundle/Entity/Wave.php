<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class Wave
 * @package AppBundle\Entity
 * @ORM\Entity(repositoryClass="WaveRepository")
 * @ORM\Table(name="Wave")
 */
class Wave
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
     * @ORM\Column(type="string",nullable=true)
     */
    private $annotationPlayerId;

    /**
     * @ORM\Column(type="string",nullable=true)
     */
    private $annotationId;

    /**
     * @ORM\Column(type="string",nullable=true)
     */
    private $param;

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
     * @return Wave
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getAnnotationPlayerId()
    {
        return $this->annotationPlayerId;
    }

    /**
     * @param mixed $annotationPlayerId
     * @return Wave
     */
    public function setAnnotationPlayerId($annotationPlayerId)
    {
        $this->annotationPlayerId = $annotationPlayerId;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getAnnotationId()
    {
        return $this->annotationId;
    }

    /**
     * @param mixed $annotationId
     * @return Wave
     */
    public function setAnnotationId($annotationId)
    {
        $this->annotationId = $annotationId;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getParam()
    {
        return $this->param;
    }

    /**
     * @param mixed $params
     * @return Wave
     */
    public function setParam($param)
    {
        $this->param = $param;
        return $this;
    }

}