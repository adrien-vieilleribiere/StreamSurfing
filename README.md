# StreamSurfing #

The idea of **StreamSurfing** is to be able to surf over a stream in ways correlated to its content.

To achieve this, this repository provide tools to: 
- enrich the timeline of a (audio or video) streams. 
- surf (_i.e._ filter, navigate, summary...) a stream with enriched timeline

This is &alpha; version, for development purposes.

### Prerequisites ###

PHP, Composer and Mysql are requiered.

#### PHP ####
Make sure you can interpret [PHP code](https://en.wikipedia.org/wiki/PHP).
#### Composer ####
Install [Composer](https://getcomposer.org/).
#### MySQL ####
Create a [MySQL database](https://en.wikipedia.org/wiki/MySQL) (named symfony by default)
and grant it to a MySql User ('root' as default).
#### git ####
Get the repository ([git](https://en.wikipedia.org/wiki/Git), [clone](https://help.github.com/articles/cloning-a-repository/)):

```bash
git clone https://github.com/adrien-vieilleribiere/StreamSurfing
```
## 1. Installation ##

In the root directory (StreamSurfing),  run the following command:
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

## 3. Add Content ##

Create a new StreamSurfing with a Media and a Wave:
- by a sql dump: 
[data_demo_fr.sql](https://github.com/adrien-vieilleribiere/StreamSurfing/tree/master/app/Resources/init/data_demo_fr.sql)
- by hand: see [MANUAL_CONTENT.md](https://github.com/adrien-vieilleribiere/StreamSurfing/tree/master/MANUAL_CONTENT.md) for details.

![StreamSurfing = Media + MediaPlayer + Wave; Wave = Annotation + AnnotationPlayer](https://raw.githubusercontent.com/adrien-vieilleribiere/StreamSurfing/master/app/Resources/documentations/StreamSurfingDiagram.png)

## 4. StreamSurf ##
Display the StreamSurfing from the route `app.php/sS/{idOfTheStreamSurfing}`, 
e.g. `app.php/sS/1` for the running example.
