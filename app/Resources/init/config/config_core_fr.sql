-- Généré le :  Ven 07 Juillet 2017 à 10:26
-- Version du serveur :  5.5.54-0+deb8u1
-- Version de PHP :  5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Contenu de la table `AnnotationPlayer`
--

INSERT INTO `AnnotationPlayer` (`id`, `name`, `route`, `param`) VALUES
(1, 'Liste basique', 'annotationPlayer/ulBasic.html.twig', NULL),
(2, 'Liste éditable', 'annotationPlayer/ulEdit.html.twig', NULL);

--
-- Contenu de la table `MediaPlayer`
--

INSERT INTO `MediaPlayer` (`id`, `name`, `route`, `param`) VALUES
(1, 'Lecteur Generique Minimal', 'streamSurf/mediaPlayers/mediaPlayerMin.html.twig', NULL);

--
-- Contenu de la table `StreamSurfModel`
--

INSERT INTO `StreamSurfModel` (`id`, `name`, `route`, `param`) VALUES
(1, 'Media au dessus, Vagues en dessous', 'streamSurf/models/sS_playerTop_annotBottom.html.twig', '{"test":42}');

--
-- Contenu de la table `TtgAnnotationScheme`
--

INSERT INTO `TtgAnnotationScheme` (`id`, `name`, `route`) VALUES
(1, 'Basic', '/av/annotScheme/basic.json');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
