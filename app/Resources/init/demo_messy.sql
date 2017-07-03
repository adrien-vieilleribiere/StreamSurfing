-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Jeu 29 Juin 2017 à 14:44
-- Version du serveur :  5.7.14
-- Version de PHP :  5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `symfony`
--

--
-- Contenu de la table `annotation`
--

INSERT INTO `annotation` (`id`, `name`, `annotation_type`, `media`, `url`, `scheme`) VALUES
(1, 'FLqft-ICVQo__fr__HumanExtendedVersionE1_landscape.srt', 'srtFile', 16, '/av/annot/FLqft-ICVQo__fr__HumanExtendedVersionE1_landscape.srt', '1'),
(2, 'IPW_jYHZ45Y__fr__HumanExtendedVersionE3_landscape.srt', 'srtFile', 23, '/av/annot/IPW_jYHZ45Y__fr__HumanExtendedVersionE3_landscape.srt', '1'),
(4, 'Séquences par artiste', 'csv_av', 35, '/av/annot/tmp/Bvy1ytp4_Xw_pontDesArtistes10_fr.csv', '5'),
(5, 'Santé Saveurs 1 - Entrée - Sous-titres français', 'srtFile', 36, '/av/annot/SanteSaveurs/MS_Entree_Irlcy6pS8S8_0_fr.srt', '1'),
(6, 'Santé Saveurs 1 - Entrée - Ingrédients', 'csv_av', 36, '/av/annot/SanteSaveurs/ingredients_entree.csv', '3'),
(7, 'Tracklist Blakkamoore Chronicles Vol 1 - Ready We Gone', 'csv_av', 37, '/av/annot/pullup/348__Jahdan_Blakkamoore-Relic_Secure__Blakkamoore_Chronicles_Vol_1__Ready_We_Gone.csv', '3'),
(8, 'Tracklist - Global Warming - Jahdan Blakkamoore', 'csv_av', 38, '/av/annot/pullup/204__Jahdan_Blakkamoore__Global_Warming.csv', '2'),
(9, 'Beenie Man, Lt Stitchie and Josey Wales', 'csv_av', 34, '/av/annot/MCzd8LgUgeQ_KingJammys.csv', '5'),
(10, 'Présentation de Ligaran : Sous titre français', 'srtFile', 39, '/av/annot/9229G9hgzJM__LigaranPresentation_captions.srt', '3'),
(11, 'Demi-finale de la Coupe du Monde de Football 2014 : Brésil - Allemagne [evenements]', 'srtFile', 40, '/av/annot/FIFA.World.Cup.2014.Semi.Final.Brazil.vs.Germany_events.srt', '3'),
(12, 'Revue de l\'audio digital #1 - Février 2017 : Transcription complete', 'srtFile', 42, '/av/annot/Moustic_RevueDePresse_N1_V2_01_full_text.srt', '5'),
(13, 'Revue de l\'audio digital #1 - Février 2017 : Chapitrage', 'srtFile', 42, '/av/annot/Moustic_RevueDePresse_N1_V2_01_chapter.srt', '5');

--
-- Contenu de la table `annotationplayer`
--

INSERT INTO `annotationplayer` (`id`, `name`, `route`, `param`) VALUES
(1, 'annotation ul basic', 'annotationPlayer/ulBasic.html.twig', NULL),
(2, 'annotation ul edit', 'annotationPlayer/ulEdit.html.twig', NULL);

--
-- Contenu de la table `media`
--

INSERT INTO `media` (`id`, `name`, `media_type`, `url`, `metadata`, `duration`) VALUES
(8, 'AV Voyage dans le temps: "Human" avec Filtres', 21000, 'https://www.youtube.com/watch?v=G1RkwNatiDU', '', 0),
(12, 'Conscious Reggae Mix for Charlie', 12000, 'http://pul-lup.com/sound/18__Parasite__ConsciousReggaeMixForCharlie.mp3', '', 4728),
(13, 'IN GAME - Episode 1 - Rêves de légende', 21001, 'https://www.youtube.com/watch?list=PLPPb7a2TQHZgXWTtOU4SdDKdZ0i81y2dg&v=4r8ZFTONTyc', '', 0),
(14, 'Duke Ellington, Ella Fitzgerald, Django Reinhardt... - Les Trésors Jazz de la BnF par Couleurs Jazz', 21000, 'https://www.youtube.com/watch?v=TLNrssA70v0', '', 0),
(15, '7 histoires incroyables mais vraies - 28 - e-penser', 21000, 'https://www.youtube.com/watch?v=HAolyfAKM-E', '', 0),
(16, 'HUMAN VOL.1', 21001, 'https://www.youtube.com/watch?list=PL6VtZr9AUGWNAgGYzDoOjIA3dw2_uJhR2&v=FLqft-ICVQo', '', 0),
(17, 'HUMAN VOL.2', 21001, 'https://www.youtube.com/watch?v=ZoHWcpz5oZM&list=PL6VtZr9AUGWNAgGYzDoOjIA3dw2_uJhR2&index=2', '', 0),
(23, 'HUMAN VOL. 3', 21001, 'https://www.youtube.com/watch?v=IPW_jYHZ45Y&index=3&list=PL6VtZr9AUGWNAgGYzDoOjIA3dw2_uJhR2', '', 0),
(24, 'Python Programming', 21000, 'https://www.youtube.com/watch?v=N4mEzFDjqtA', '', 0),
(25, 'Les prix Nobel 2016 — A chaud #4', 21000, 'https://www.youtube.com/watch?v=ZOR8RUoFhI8', '', 0),
(34, 'Beenie Man, Lt Stitchie and Josey Wales at King Jammy\'s studio', 21000, 'https://www.youtube.com/watch?v=MCzd8LgUgeQ', '{"name":"Beenie Man, Lt Stitchie and Josey Wales at King Jammy\'s studio","idPlatform":"MCzd8LgUgeQ"}', 1665),
(35, 'Le Pont des artistes - 10 - JEANNE CHERHAL / PIERS FACCINI / YELLI YELLI', 21000, 'https://www.youtube.com/watch?v=Bvy1ytp4_Xw', '{"name":"Le Pont des artistes - 10 - JEANNE CHERHAL / PIERS FACCINI / YELLI YELLI","idPlatform":"Bvy1ytp4_Xw"}', 6834),
(36, 'Santé Saveurs - Épisode 1 - L\'entrée', 21000, 'https://www.youtube.com/watch?v=ecUEEqCnHAA', '{"name":"Santé Saveurs - Épisode 1 - L\'entrée","idPlatform":"Irlcy6pS8S8"}', 739),
(37, 'Blakkamoore Chronicles Vol 1 - Ready We Gone', 12000, 'http://pul-lup.com/sound/348__Jahdan_Blakkamoore-Relic_Secure__Blakkamoore_Chronicles_Vol_1__Ready_We_Gone.mp3', '{"name":"Blakkamoore Chronicles Vol 1 - Ready We Gone","idPlatform":"348"}', 3273),
(38, 'Global Warming - Jahdan Blakkamoore', 12000, 'http://pul-lup.com/sound/204__Jahdan_Blakkamoore__Global_Warming.mp3', '{"name":"Global Warming - Jahdan Blakkamoore","idPlatform":"204"}', 1684),
(39, 'Présentation de Ligaran', 20001, 'http://pul-lup.com/private/v_LIGARAN005.mp4', '{"name":Présentation de Ligaran}', 130),
(40, 'Demi-finale de la Coupe du Monde de Football 2014 : Brésil - Allemagne', 20001, 'http://pul-lup.com/private/FIFA.World.Cup.2014.Semi.Final.Brazil.vs.Germany.HDTV.x264-W4F.mp4', '{"name":Demi-finale de la Coupe du Monde de Football 2014 : Brésil - Allemagne}', 5748),
(41, 'Cérémonie de remise du prix Lumière - Catherine Deneuve', 10001, 'http://pul-lup.com/private/CeremonieDeRemiseDuPrixLumiere-CatherineDeneuve_288963214_soundcloud.mp3', '{"name":Cérémonie de remise du prix Lumière - Catherine Deneuve}', 8133),
(42, 'Revue de l\'audio digital #1 - Février 2017', 10001, 'http://pul-lup.com/private/Moustic_RevueDePresse_N1_V2_01.mp3', '{"name":Revue de l\'audio digital #1 - Février 2017}', 283);

--
-- Contenu de la table `mediaplayer`
--

INSERT INTO `mediaplayer` (`id`, `name`, `route`, `param`) VALUES
(1, 'Player Generic Minimal', 'streamSurf/mediaPlayers/mediaPlayerMin.html.twig', NULL),
(2, 'Player with fixed jumps', 'streamSurf/mediaPlayers/mediaPlayerFixedJumps.html.twig', NULL);

--
-- Contenu de la table `streamsurfing`
--

INSERT INTO `streamsurfing` (`id`, `name`, `stream_surf_model_id`, `param`, `stream_surf_media_player_id`, `stream_surf_media_id`, `stream_surf_wave_id`) VALUES
(53, 'Ex1', 1, '{\'toto\': 42}', 1, 34, '12'),
(54, 'Revue de l\'audio digital #1 - Février 2017 - Transcription (liste)', 1, NULL, 1, 42, '13'),
(55, 'Revue de l\'audio digital #1 - Février 2017 - Chapitrage (liste éditable)', 1, NULL, 1, 42, '14');

--
-- Contenu de la table `streamsurfmodel`
--

INSERT INTO `streamsurfmodel` (`id`, `name`, `route`, `param`) VALUES
(1, 'Player Top, Wave bottom', 'streamSurf/models/sS_playerTop_annotBottom.html.twig', '{\'test\':42}');

--
-- Contenu de la table `ttgannotationscheme`
--

INSERT INTO `ttgannotationscheme` (`id`, `name`, `route`) VALUES
(1, 'Basic', '/av/annotScheme/basic.json'),
(2, 'dim1', '/av/annotScheme/dim1.json'),
(3, 'dim2', '/av/annotScheme/dim2.json'),
(4, 'keybord', '/av/annotScheme/keybord.json'),
(5, 'dev', '/av/annotScheme/dev.json');

--
-- Contenu de la table `ttgplayerconfig`
--

INSERT INTO `ttgplayerconfig` (`id`, `route`, `name`) VALUES
(1, 'ttgPlayerConfig/ttgPlayer_min.html.twig', 'Min'),
(2, 'ttgPlayerConfig/ttgPlayer_dev1.html.twig', 'Dev Player Config 1'),
(3, 'ttgPlayerConfig/ttgPlayer_dev2.html.twig', 'Dev Player Config 2'),
(4, 'ttgPlayerConfig/ttgPlayer_1.html.twig', 'Standard'),
(5, 'ttgPlayerConfig/ttgPlayer_playbackRate_21001.html.twig', 'playbackRate_21001'),
(6, 'ttgPlayerConfig/ttgPlayer_playbackRate_slider.html.twig', 'PlaybackRate Slider'),
(7, 'ttgPlayerConfig/ttgPlayer_playbackRate_radio.html.twig', 'PlaybackRate Radio'),
(8, 'annotation/ulBasic/ul.html.twig', 'annotation ul basic'),
(9, 'ttgPlayerConfig/ttgPlayer_progressWithZoom.html.twig', 'Progress Bar With Zoom'),
(10, 'ttgPlayerConfig/ttgPlayer_fixedMoves.html.twig', 'Fixed Jumps'),
(11, 'annotation/ulEdit/ul.html.twig', 'annotation ul edit');

--
-- Contenu de la table `wave`
--

INSERT INTO `wave` (`id`, `name`, `annotation_player_id`, `annotation_id`, `param`) VALUES
(12, 'Beenie Man, Lt Stitchie and Josey Wales, ul basic', '1', '9', NULL),
(13, 'Revue de l\'audio digital #1 - Février 2017 : Transcription', '1', '12', NULL),
(14, 'Revue de l\'audio digital #1 - Février 2017 : Chapitrage (edition)', '2', '13', NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
