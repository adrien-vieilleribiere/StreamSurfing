<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;


/**
 * Class TtgAnnotationScheme
 * @package AppBundle\Entity
 * @ORM\Entity(repositoryClass="TtgAnnotationSchemeRepository")
 * @ORM\Table(name="TtgAnnotationScheme")
 */
class TtgAnnotationScheme
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
     */
    private $route;


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
     * @return TtgAnnotationScheme
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }
    /**
     * @return mixed
     */
    public function getRoute()
    {
        return $this->route;
    }

    /**
     * @param mixed $route
     * @return TtgAnnotationScheme
     */
    public function setRoute($route)
    {
        $this->route = $route;
        return $this;
    }

}