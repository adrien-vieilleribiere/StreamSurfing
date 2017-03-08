<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class TtgPlayerConfig
 * @package AppBundle\Entity
 * @ORM\Entity(repositoryClass="TtgPlayerConfigRepository")
 * @ORM\Table(name="TtgPlayerConfig")
 */
class TtgPlayerConfig
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
     * @return TtgPlayerConfig
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
     * @return TtgPlayerConfig
     */
    public function setRoute($route)
    {
        $this->route = $route;
        return $this;
    }

}