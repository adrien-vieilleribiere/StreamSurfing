<?php
/**
 * Created by PhpStorm.
 * User: Didi
 * Date: 10/02/2017
 * Time: 17:31
 */

namespace AppBundle\Entity;


use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="segment_properties")
 */
class SegmentProperties extends Segment
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
    private $key;

    /**
     * @ORM\Column(type="string")
     */
    private $value;


}