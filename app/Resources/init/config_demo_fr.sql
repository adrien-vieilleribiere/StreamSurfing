-- Généré le :  Ven 07 Juillet 2017 à 14:43
-- Version du serveur :  5.5.54-0+deb8u1
-- Version de PHP :  5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Contenu de la table `MediaPlayer`
--

INSERT INTO `MediaPlayer` (`id`, `name`, `route`, `param`) VALUES
(1, 'Lecteur Generique Minimal', 'streamSurf/mediaPlayers/mediaPlayerMin.html.twig', NULL),
(2, 'Lecteur avec sauts fixes', 'streamSurf/mediaPlayers/mediaPlayerFixedJumps.html.twig', NULL),
(3, 'Lecteur avec sauts fixes', 'streamSurf/mediaPlayers/mediaPlayerDev.html.twig', NULL);


INSERT INTO `TtgAnnotationScheme` (`id`, `name`, `route`) VALUES
(1, 'Basique', '/av/annotScheme/basic.json'),
(2, 'dim1', '/av/annotScheme/dim1_fr.json'),
(3, 'dim2', '/av/annotScheme/dim2_fr.json'),
(4, 'clavier', '/av/annotScheme/keybord_fr.json'),
(5, 'dev', '/av/annotScheme/dev.json');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
