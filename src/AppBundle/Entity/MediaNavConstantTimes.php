<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class MediaNavConstantTimes
 * @package AppBundle\Entity
 * @ORM\Table(name="tc_fixedNav")
 */
class MediaNavConstantTimes
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
    private $fixedNavPrevious;

   /**
     * @ORM\Column(type="string")
     */
    private $fixedNavNext;

    /**
     * @ORM\Column(type="string")
     */
    private $fixedNavTimes;



}