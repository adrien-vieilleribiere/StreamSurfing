-- Généré le :  Ven 07 Juillet 2017 à 15:25
-- Version du serveur :  5.5.54-0+deb8u1
-- Version de PHP :  5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Contenu de la table `annotation`
--

INSERT INTO `annotation` (`id`, `name`, `scheme`, `annotation_type`, `url`, `media`) VALUES
(1, 'Présentation de Ligaran : Sous titre français', '1', 'srtFile', '/av/annot/9229G9hgzJM__LigaranPresentation__subtitle.srt', 4),
(2, 'Présentation de Ligaran : Chapitrage', '3', 'csv_av', '/av/annot/9229G9hgzJM__LigaranPresentation__chapter.csv', 4),
(3, 'Présentation de Ligaran : Phrases', '3', 'json_av', '/av/annot/9229G9hgzJM__ligaranPresentation__sentence.json', 2);

--
-- Contenu de la table `media`
--

INSERT INTO `media` (`id`, `media_type`, `url`, `name`, `duration`, `metadata`) VALUES
(1, 20001, 'http://examples.adrien-v.com/media/Presentation_de_Ligaran.mp4', 'Présentation de Ligaran (video - mp4)', 130, '{"name":Présentation de Ligaran (video - mp4)}'),
(2, 10001, 'http://examples.adrien-v.com/media/Presentation_de_Ligaran.mp3', 'Présentation de Ligaran (audio - mp3)', 130, '{"name":Présentation de Ligaran (audio - mp3)}'),
(3, 10002, 'http://examples.adrien-v.com/media/Presentation_de_Ligaran.ogg', 'Présentation de Ligaran (audio - ogg)', 130, '{"name":Présentation de Ligaran (audio - ogg)}'),
(4, 21000, 'https://www.youtube.com/watch?v=9229G9hgzJM', 'Présentation de Ligaran (video - youtube)', 130, '{"name":Présentation de Ligaran (video - youtube)}');

--
-- Contenu de la table `StreamSurfing`
--

INSERT INTO `StreamSurfing` (`id`, `name`, `stream_surf_model_id`, `stream_surf_media_player_id`, `stream_surf_media_id`, `stream_surf_wave_id`, `param`) VALUES
(1, 'Présentation de Ligaran : Chapitage avec liste (youtube, minimal player)', 1, 1, 4, '1', NULL),
(2, 'Présentation de Ligaran : Phrases (mp3, player with jumps, liste)', 1, 1, 2, '3', NULL),
(3, 'Présentation de Ligaran : Edition d''un Chapitrage (youtube, player minimal)', 1, 1, 1, '4', NULL);

--
-- Contenu de la table `Wave`
--

INSERT INTO `Wave` (`id`, `name`, `annotation_player_id`, `annotation_id`, `param`) VALUES
(1, 'Présentation de Ligaran : Chapitrage avec liste', '1', '2', NULL),
(2, 'Présentation de Ligaran : Sous-titrage avec liste editable', '2', '1', NULL),
(3, 'Présentation de Ligaran : Phrases avec liste', '1', '3', NULL),
(4, 'Présentation de Ligaran : Chapitrage avec liste editable', '2', '2', NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
