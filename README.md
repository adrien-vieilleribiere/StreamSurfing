# StreamSurfing

The idea of **StreamSurfing** is to be able to surf over a stream in ways correlated to its content.

To achieve this, this repository provide tools to: 
- enrich the timeline of a (audio or video) streams. 
- surf (_i.e._ filter, navigate, summary...) a stream with enriched timeline

This is &alpha; version, for development purposes.

##1 - Installation

#### Install dependancies

In the root directory (StreamSurfing),  use [Composer](https://getcomposer.org/) by running the following command:
```bash
composer install
```
and set up your own database/mailer parameters.

#### Setup global model(s)
A StreamSurf Model describes the global positions of its components 
(mainly its MediaPlayer and its WavePlayer).
- It can be initialized by [the template provided ](streamSurf/models/sS_playerTop_annotBottom.html.twig) 
by a SQL dump:
 ```sql
INSERT INTO `streamsurfmodel` (`id`, `name`, `route`, `param`) VALUES
(1, 'Player Top, Wave bottom', 'streamSurf/models/sS_playerTop_annotBottom.html.twig', '{\'test\':42}');
```
- it can be enrich with the new StreamSurfModel form, reachable from `app_dev.php/sSM/new`

#### Setup media player(s)
A Media player descibes how to render a media file. 
it can be initialized with elements provided in [the mediaPlayer folder](streamSurf/mediaPlayers/), for instance by a SQL dump:
 ```sql
INSERT INTO `mediaplayer` (`id`, `name`, `route`, `param`) VALUES
(1, 'Player Generic Minimal', 'streamSurf/mediaPlayers/mediaPlayerMin.html.twig', NULL),
(2, 'Player with fixed jumps', 'streamSurf/mediaPlayers/mediaPlayerFixedJumps.html.twig', NULL);
```

#### Setup Annotation player(s)
An Annotation Player descibes how to render an annotation. 
it can be initialized with elements provided in [the annotationPlayer folder](annotationPlayer/), for instance by a SQL dump:
 ```sql
INSERT INTO `annotationplayer` (`id`, `name`, `route`, `param`) VALUES
(1, 'annotation ul basic', 'annotationPlayer/ulBasic.html.twig', NULL),
(2, 'annotation ul edit', 'annotationPlayer/ulEdit.html.twig', NULL);
```

##2 - Add Content

####Add Medias
- from  the new Media form at `app_dev.php/media/new`
- from a SQL dump:
 ```sql
INSERT INTO `media` (`id`, `name`, `media_type`, `url`, `metadata`, `duration`) VALUES
(1, 'Beenie Man, Lt Stitchie and Josey Wales at King Jammy\'s studio', 21000, 'https://www.youtube.com/watch?v=MCzd8LgUgeQ', '{"name":"Beenie Man, Lt Stitchie and Josey Wales at King Jammy\'s studio","idPlatform":"MCzd8LgUgeQ"}', 1665);
 ```

####Add Annotation
- from the new Annotation form at `app_dev.php/annotation/new`
- from a SQL dump:
 ```sql
INSERT INTO `annotation` (`id`, `name`, `annotation_type`, `media`, `url`, `scheme`) VALUES
(1, 'Beenie Man, Lt Stitchie and Josey Wales - Singers', 'csv_av', 34, '/av/annot/MCzd8LgUgeQ_KingJammys.csv', '3');
 ```

####Add Wave
Create a new Wave by associating an Annotation with an Annotation Player: 
- from the new Annotation form at `app_dev.php/w/new`
- from a SQL dump:
 ```sql
INSERT INTO `wave` (`id`, `name`, `annotation_player_id`, `annotation_id`, `param`) VALUES
(1, 'Beenie Man, Lt Stitchie and Josey Wales - Singers (ul basic)', '1', '1', NULL);
```

## 3 - Create StreamSurfing
Create a new StreamSurfing by associating a Media, a Media Player and a Wave: 
- from the new Annotation form at `app_dev.php/sS/new"`
- from a SQL dump:
 ```sql
INSERT INTO `streamsurfing` (`id`, `name`, `stream_surf_model_id`, `param`, `stream_surf_media_player_id`, `stream_surf_media_id`, `stream_surf_wave_id`) VALUES
(1, 'Beenie Man, Lt Stitchie and Josey Wales (basic MediaPlayer) - Singers (ul basic)', 1, '{\'test\': 42}', 1, 1, '1');
```

## 4 - StreamSurf
Display the StreamSurfing from the route `app_dev.php/sS/{idOfTheStreamSurfing}`, 
e.g. `app_dev.php/sS/1` for the running example.




