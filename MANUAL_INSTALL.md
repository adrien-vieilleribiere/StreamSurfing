# StreamSurfing : Database Init Details 

## Setup global model(s)
A StreamSurf Model describes the global positions of its components 
(mainly its MediaPlayer and its WavePlayer).
- It can be initialized with [the provided template](https://github.com/adrien-vieilleribiere/StreamSurfing/tree/master/app/Resources/views/streamSurf/models) 
by a SQL dump:
 ```sql
INSERT INTO `streamsurfmodel` (`id`, `name`, `route`, `param`) VALUES
(1, 'Player Top, Wave bottom', 'streamSurf/models/sS_playerTop_annotBottom.html.twig', '{\'test\':42}');
```
- it can be enrich with the new StreamSurfModel form, reachable from `app.php/sSM/new`

## Setup media player(s)
A Media player descibes how to render a media file. 
it can be initialized with elements provided in [the mediaPlayer folder](https://github.com/adrien-vieilleribiere/StreamSurfing/tree/master/app/Resources/views/mediaPlayer/models), for instance by a SQL dump:
 ```sql
INSERT INTO `mediaplayer` (`id`, `name`, `route`, `param`) VALUES
(1, 'Player Generic Minimal', 'streamSurf/mediaPlayers/mediaPlayerMin.html.twig', NULL),
(2, 'Player with fixed jumps', 'streamSurf/mediaPlayers/mediaPlayerFixedJumps.html.twig', NULL);
```

## Setup Annotation player(s)
An Annotation Player descibes how to render an annotation. 
it can be initialized with elements provided in [the annotationPlayer folder](https://github.com/adrien-vieilleribiere/StreamSurfing/tree/master/app/Resources/views/annotationPlayer), for instance by a SQL dump:
 ```sql
INSERT INTO `annotationplayer` (`id`, `name`, `route`, `param`) VALUES
(1, 'annotation ul basic', 'annotationPlayer/ulBasic.html.twig', NULL),
(2, 'annotation ul edit', 'annotationPlayer/ulEdit.html.twig', NULL);
```
