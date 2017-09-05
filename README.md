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
Create tables with doctrine in the root directory (StreamSurfing): 
```bash
php bin/console doctrine:schema:update --force
```
Add data with one of the provided `config_*.sql` in [app/Resources/init](https://github.com/adrien-vieilleribiere/StreamSurfing/tree/master/app/Resources/init):
- config_core_*: the minimal configuration to Streamsurf
- config_demo_*: a larger possibilities of players and annotation schemes (needed for the demo dataset)

For details of what is added, see [MANUAL_INSTALL.md](https://github.com/adrien-vieilleribiere/StreamSurfing/tree/master/MANUAL_INSTALL.md)

## 2. Add Content ##

Create a new StreamSurfing with a Media and a Wave:
- by a sql dump: 
[data_demo_fr.sql](https://github.com/adrien-vieilleribiere/StreamSurfing/tree/master/app/Resources/init/data_demo_fr.sql)
- by hand: see [MANUAL_CONTENT.md](https://github.com/adrien-vieilleribiere/StreamSurfing/tree/master/MANUAL_CONTENT.md) for details.

![StreamSurfing = Media + MediaPlayer + Wave; Wave = Annotation + AnnotationPlayer](https://raw.githubusercontent.com/adrien-vieilleribiere/StreamSurfing/tree/master/app/Resources/documentations/StreamSurfingDiagram.png)

## 3. StreamSurf ##
Display the StreamSurfing from the route `app.php/sS/{idOfTheStreamSurfing}`, 
e.g. `app.php/sS/1` for the running example.
