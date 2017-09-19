-- Generated:  2017/07/07 14:43
-- Server Version:  5.5.54-0+deb8u1
-- PHP Version:  5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Content of the table `MediaPlayer`
--

INSERT INTO `MediaPlayer` (`id`, `name`, `route`, `param`) VALUES
(2, 'Player with fixed jumps', 'streamSurf/mediaPlayers/mediaPlayerFixedJumps.html.twig', NULL);


INSERT INTO `TtgAnnotationScheme` (`id`, `name`, `route`) VALUES
(1, 'Minimal Player', 'streamSurf/mediaPlayers/mediaPlayerMin.html.twig', NULL),
(2, 'dim1', '/av/annotScheme/dim1.json'),
(3, 'dim2', '/av/annotScheme/dim2.json'),
(4, 'keybord', '/av/annotScheme/keybord.json'),
(5, 'dev', '/av/annotScheme/dev.json');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
