<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class StreamSurfing
 * @package AppBundle\Entity
 * @ORM\Entity(repositoryClass="StreamSurfingRepository")
 * @ORM\Table(name="StreamSurfing")
 */
class StreamSurfing
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
     * @ORM\Column(type="integer")
     */
    private $streamSurfModelId;


    /**
     * @ORM\Column(type="integer")
     */
    private $streamSurfMediaPlayerId;

    /**
     * @ORM\Column(type="integer")
     */
    private $streamSurfMediaId;

    /**
     * @ORM\Column(type="string")
     */
    private $streamSurfWaveId;

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
     * @return StreamSurfing
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getStreamSurfModelId()
    {
        return $this->streamSurfModelId;
    }

    /**
     * @param mixed $modelId
     * @return StreamSurfing
     */
    public function setStreamSurfModelId($modelId)
    {
        $this->streamSurfModelId = $modelId;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getStreamSurfMediaPlayerId()
    {
        return $this->streamSurfMediaPlayerId;
    }

    /**
     * @param mixed $mediaPlayerId
     * @return StreamSurfing
     */
    public function setStreamSurfMediaPlayerId($mediaPlayerId)
    {
        $this->streamSurfMediaPlayerId = $mediaPlayerId;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getStreamSurfMediaId()
    {
        return $this->streamSurfMediaId;
    }

    /**
     * @param mixed $mediaId
     * @return StreamSurfing
     */
    public function setStreamSurfMediaId($mediaId)
    {
        $this->streamSurfMediaId = $mediaId;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getStreamSurfWaveId()
    {
        return $this->streamSurfWaveId;
    }

    /**
     * @param mixed $waveId
     * @return StreamSurfing
     */
    public function setStreamSurfWaveId($waveId)
    {
        $this->streamSurfWaveId = $waveId;
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
     * @return StreamSurfing
     */
    public function setParam($param)
    {
        $this->param = $param;
        return $this;
    }

}