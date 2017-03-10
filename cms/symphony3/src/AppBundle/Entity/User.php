<?php
/**
 * Created by PhpStorm.
 * User: Nid
 * Date: 14/2/2017
 * Time: 12:16 PM
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 * @UniqueEntity(fields={"email"}, message="It looks like you already have an account!")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    public function __construct()
    {
        parent::__construct();
    }

 }