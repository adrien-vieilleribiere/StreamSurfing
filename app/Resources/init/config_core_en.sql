-- Generated:  2017/07/07 10:32
-- Server Version:  5.5.54-0+deb8u1
-- PHP Version:  5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


--
-- Content of the table `AnnotationPlayer`
--

INSERT INTO `AnnotationPlayer` (`id`, `name`, `route`, `param`) VALUES
(1, 'Basic List', 'annotationPlayer/ulBasic.html.twig', NULL),
(2, 'Editable List', 'annotationPlayer/ulEdit.html.twig', NULL);

--
-- Content of the table `MediaPlayer`
--

INSERT INTO `MediaPlayer` (`id`, `name`, `route`, `param`) VALUES
(1, 'Minimal Player', 'streamSurf/mediaPlayers/mediaPlayerMin.html.twig', NULL);

--
-- Content of the table `StreamSurfModel`
--

INSERT INTO `StreamSurfModel` (`id`, `name`, `route`, `param`) VALUES
(1, 'Player Top, Wave bottom', 'streamSurf/models/sS_playerTop_annotBottom.html.twig', '{''test'':42}');

--
-- Content of the table `TtgAnnotationScheme`
--

INSERT INTO `TtgAnnotationScheme` (`id`, `name`, `route`) VALUES
(1, 'Basic', '/av/annotScheme/basic.json');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
