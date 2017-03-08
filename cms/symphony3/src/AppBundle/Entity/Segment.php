<?php
/**
 * Created by PhpStorm.
 * User: Didi
 * Date: 10/02/2017
 * Time: 17:20
 */

namespace AppBundle\Entity;


use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="segment")
 */
class Segment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    private $name;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank()
     */
    private $mediaIdStart; // id de media

    /**
     * @ORM\Column(type="integer")
     */
    private $mediaIdEnd;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotBlank()
     */
    private $timeStart; // float en s

    /**
     * @ORM\Column(type="float")
     */
    private $timeEnd;

}