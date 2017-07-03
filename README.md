# StreamSurfing #

The idea of **StreamSurfing** is to be able to surf over a stream in ways correlated to its content.

To achieve this, this repository provide tools to: 
- enrich the timeline of a (audio or video) streams. 
- surf (_i.e._ filter, navigate, summary...) a stream with enriched timeline

This is &alpha; version, for development purposes.

## 1. Installation ##

### Install dependancies ###

In the root directory (StreamSurfing),  use [Composer](https://getcomposer.org/) by running the following command:
```bash
composer install
```
and set up your own database/mailer parameters.

### Init the database ###
- Create tables with doctrine in the root directory (StreamSurfing): 
```bash
php bin/console doctrine:schema:update --force
```
- Execute on of the provided sql dumps in [app/Resources/init](https://github.com/adrien-vieilleribiere/StreamSurfing/tree/master/app/Resources/init).
For details of what is added, see [MANUAL_INSTALL.md](https://github.com/adrien-vieilleribiere/StreamSurfing/tree/master/MANUAL_INSTALL.md)

## 2. Add Content ##

### Add Medias ###
- from  the new Media form at `app.php/media/new`
- or from a SQL dump:
 ```sql
INSERT INTO `media` (`id`, `name`, `media_type`, `url`, `metadata`, `duration`) VALUES
(1, 'Beenie Man, Lt Stitchie and Josey Wales at King Jammy\'s studio', 21000, 'https://www.youtube.com/watch?v=MCzd8LgUgeQ', '{"name":"Beenie Man, Lt Stitchie and Josey Wales at King Jammy\'s studio","idPlatform":"MCzd8LgUgeQ"}', 1665);
 ```

### Add Annotation ###
- from the new Annotation form at `app.php/annotation/new`
- or from a SQL dump:
 ```sql
INSERT INTO `annotation` (`id`, `name`, `annotation_type`, `media`, `url`, `scheme`) VALUES
(1, 'Beenie Man, Lt Stitchie and Josey Wales - Singers', 'csv_av', 34, '/av/annot/MCzd8LgUgeQ_KingJammys.csv', '3');
 ```

### Add Wave ###
Create a new Wave by associating an Annotation with an Annotation Player: 
- from the new Annotation form at `app.php/w/new`
- or from a SQL dump:
 ```sql
INSERT INTO `wave` (`id`, `name`, `annotation_player_id`, `annotation_id`, `param`) VALUES
(1, 'Beenie Man, Lt Stitchie and Josey Wales - Singers (ul basic)', '1', '1', NULL);
```

## 3. Create StreamSurfing ## 
Create a new StreamSurfing by associating a Media, a Media Player and a Wave: 
- from the new Annotation form at `app.php/sS/new"`
- or from a SQL dump:
 ```sql
INSERT INTO `streamsurfing` (`id`, `name`, `stream_surf_model_id`, `param`, `stream_surf_media_player_id`, `stream_surf_media_id`, `stream_surf_wave_id`) VALUES
(1, 'Beenie Man, Lt Stitchie and Josey Wales (basic MediaPlayer) - Singers (ul basic)', 1, '{\'test\': 42}', 1, 1, '1');
```

## 4. StreamSurf ##
Display the StreamSurfing from the route `app.php/sS/{idOfTheStreamSurfing}`, 
e.g. `app.php/sS/1` for the running example.
