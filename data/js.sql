-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2017 at 06:08 PM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `js`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `art_id` int(11) DEFAULT NULL,
  `uti_id` int(11) DEFAULT NULL,
  `typ_id` int(11) DEFAULT NULL,
  `titre_court` varchar(254) DEFAULT NULL,
  `abstract` varchar(5000) DEFAULT NULL,
  `introduction` varchar(254) DEFAULT NULL,
  `resume` varchar(254) DEFAULT NULL,
  `date_creation` datetime DEFAULT NULL,
  `date_revision` datetime DEFAULT NULL,
  `titre_complet` longtext,
  `etat` int(11) DEFAULT NULL,
  `statut` varchar(254) DEFAULT NULL,
  `step1` tinyint(1) DEFAULT NULL,
  `step2` tinyint(1) DEFAULT NULL,
  `step3` tinyint(1) DEFAULT NULL,
  `step4` tinyint(1) DEFAULT NULL,
  `step5` tinyint(1) DEFAULT NULL,
  `step6` tinyint(1) DEFAULT NULL,
  `step7` tinyint(1) DEFAULT NULL,
  `step8` tinyint(1) DEFAULT NULL,
  `step9` tinyint(1) DEFAULT NULL,
  `step10` tinyint(1) DEFAULT NULL,
  `step11` tinyint(1) DEFAULT NULL,
  `step12` tinyint(1) DEFAULT NULL,
  `motscles` varchar(1000) DEFAULT NULL,
  `additionalinfo1` varchar(500) DEFAULT NULL,
  `additionalinfo2` varchar(500) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `editor_id` int(11) DEFAULT NULL,
  `date_soummission` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_revision` (`art_id`),
  KEY `FK_article_type` (`typ_id`),
  KEY `FK_creer` (`uti_id`),
  KEY `IDX_23A0E666995AC4C` (`editor_id`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`id`, `art_id`, `uti_id`, `typ_id`, `titre_court`, `abstract`, `introduction`, `resume`, `date_creation`, `date_revision`, `titre_complet`, `etat`, `statut`, `step1`, `step2`, `step3`, `step4`, `step5`, `step6`, `step7`, `step8`, `step9`, `step10`, `step11`, `step12`, `motscles`, `additionalinfo1`, `additionalinfo2`, `comments`, `editor_id`, `date_soummission`) VALUES
(1, NULL, 1, 1, 'Design pattern Transaction Rrequired', '<p>dfherhbzr <strong>vzeve</strong></p>\r\n\r\n<hr />\r\n<p>sdvzvaevaez</p>\r\n\r\n<p>sdvzevaezvaze</p>\r\n\r\n<ol>\r\n	<li>ddvzeveaz</li>\r\n</ol>', NULL, NULL, NULL, NULL, 'Comment bien gérer les trasactions propagées', NULL, 'SOUMISSION_EN_COURS_DE_TRAITEMENT', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 'Geographie;Tourisme;Nucléaire;Géopolitique', 'dfbnsrhns', 'dfndsrjhnrs', 'fshsjrzrhqsrhsr', 1, NULL),
(2, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(3, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(4, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(5, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(6, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(7, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(8, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(9, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(10, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(11, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(12, NULL, NULL, 2, 'TEst', NULL, NULL, NULL, NULL, NULL, 'TEst', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(13, NULL, NULL, 2, 'Test  sdfshjdfl', NULL, NULL, NULL, NULL, NULL, 'Test long skdufhsldmsd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(14, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(15, NULL, NULL, 1, 'Titre court', NULL, NULL, NULL, NULL, NULL, 'Titre long', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(16, NULL, NULL, 1, 'Titre court', NULL, NULL, NULL, NULL, NULL, 'Titre long', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(17, NULL, NULL, 1, 'zefzevze', NULL, NULL, NULL, NULL, NULL, 'sdvzsd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(18, NULL, NULL, 2, 'zgzregze', NULL, NULL, NULL, NULL, NULL, 'sfgzegfze', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(19, NULL, NULL, 2, 'Titre court', NULL, NULL, NULL, NULL, NULL, 'Tite long', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(20, NULL, NULL, 2, 'Titre court', NULL, NULL, NULL, NULL, NULL, 'Titre complet', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(21, NULL, NULL, 2, 'svbsdbd', NULL, NULL, NULL, NULL, NULL, 'sbsdfbsdfbdsq', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(22, NULL, NULL, 2, 'hkyukyu', NULL, NULL, NULL, NULL, NULL, 'yukyukyu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(23, NULL, NULL, 2, 'fhsrhbsz', NULL, NULL, NULL, NULL, NULL, 'rgzrhgz', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(24, NULL, NULL, 2, 'rhzrhzse', NULL, NULL, NULL, NULL, NULL, 'efzegzae', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(25, NULL, NULL, 2, 'gzegbzsregzreh', NULL, NULL, NULL, NULL, NULL, 'dfherherjnher', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(26, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'REVISION_INCOMPLETE', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(27, NULL, NULL, 2, 'tesbdfbdfb', NULL, NULL, NULL, NULL, NULL, 'nndfcncgfn,cf', NULL, 'SOUMISSION_INCOMPLETE', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(28, NULL, 1, 2, 'Intégration des télécommunications dans les systèmes bancaires', '<p><strong>Lorem ipsum represents a long-held tradition.</strong></p>\r\n\r\n<blockquote>\r\n<p>Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.</p>\r\n</blockquote>\r\n\r\n<p>Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.</p>\r\n\r\n<ul>\r\n	<li>Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.</li>\r\n	<li>Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.</li>\r\n	<li>Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.</li>\r\n</ul>\r\n\r\n<p>Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.</p>\r\n\r\n<blockquote>\r\n<p>Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.</p>\r\n</blockquote>\r\n\r\n<p>Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.</p>', NULL, NULL, '2016-09-28 22:32:46', NULL, 'Rendre flexible la gestion des opérations financières pas l''intégration des télécommunications dans les systèmes bancaires', NULL, 'SOUMISSION_INCOMPLETE', 1, 1, 1, 1, 1, 1, 1, NULL, 1, NULL, 1, 0, 'Science;ICT;Chemistry;Geography;History;Politic;Computer;Phone;Internet;Social media', NULL, NULL, 'Comment', 1, NULL),
(29, NULL, 23, 2, 'sdgsg', NULL, NULL, NULL, '2016-09-29 11:30:34', NULL, 'sgsgs', NULL, 'SOUMISSION_INCOMPLETE', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(30, NULL, 1, 1, 'Parallel programming', NULL, NULL, NULL, '2016-10-31 21:37:25', NULL, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia enim in laoreet. Donec sit amet sapien id diam dictum aliquam.', NULL, 'SOUMISSION_INCOMPLETE', 1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 1, NULL),
(31, NULL, 1, 2, NULL, NULL, NULL, NULL, '2016-11-02 21:46:33', NULL, NULL, NULL, 'SOUMISSION_INCOMPLETE', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 1, NULL),
(32, NULL, 1, 2, 'Métier dévelopeur', NULL, NULL, NULL, '2016-11-21 21:00:43', NULL, 'Métier développeur, kit de survie', NULL, 'SOUMISSION_INCOMPLETE', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(33, NULL, 1, 2, 'test', NULL, NULL, NULL, '2017-02-15 18:13:29', NULL, 'szesdvsd', NULL, 'SOUMISSION_INCOMPLETE', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(34, NULL, 1, 1, NULL, NULL, NULL, NULL, '2017-03-04 17:59:21', NULL, NULL, NULL, 'SOUMISSION_INCOMPLETE', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(35, NULL, 1, 1, NULL, NULL, NULL, NULL, '2017-03-04 18:00:28', NULL, NULL, NULL, 'SOUMISSION_INCOMPLETE', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(36, NULL, 1, 1, NULL, NULL, NULL, NULL, '2017-03-04 18:00:42', NULL, NULL, NULL, 'SOUMISSION_INCOMPLETE', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(37, NULL, 1, 1, 'Titre court', NULL, NULL, NULL, '2017-03-04 18:01:07', NULL, 'Titre complet', NULL, 'SOUMISSION_INCOMPLETE', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(38, NULL, 1, 1, 'Titre test', NULL, NULL, NULL, '2017-03-04 18:02:40', NULL, 'Titre complet test', NULL, 'SOUMISSION_INCOMPLETE', 1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `article_reviewer`
--

DROP TABLE IF EXISTS `article_reviewer`;
CREATE TABLE IF NOT EXISTS `article_reviewer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `opposed_art_id` int(11) DEFAULT NULL,
  `suggested_art_id` int(11) DEFAULT NULL,
  `rev_id` int(11) DEFAULT NULL,
  `reason` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `opposed` tinyint(1) DEFAULT NULL,
  `suggested` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_article_reviewer_reviewer` (`rev_id`),
  KEY `FK_opposed_reviewer_article` (`opposed_art_id`),
  KEY `FK_suggested_reviewer_article` (`suggested_art_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `article_reviewer`
--

INSERT INTO `article_reviewer` (`id`, `opposed_art_id`, `suggested_art_id`, `rev_id`, `reason`, `opposed`, `suggested`) VALUES
(5, NULL, 1, 5, 'Reason', NULL, 1),
(7, 1, NULL, 7, 'article_reviewer[reason]', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `auteur`
--

DROP TABLE IF EXISTS `auteur`;
CREATE TABLE IF NOT EXISTS `auteur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pers_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_auteur_peut_etre_personne` (`pers_id`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auteur`
--

INSERT INTO `auteur` (`id`, `pers_id`) VALUES
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 9),
(9, 10),
(10, 11),
(11, 12),
(12, 13),
(13, 14),
(14, 15),
(15, 16),
(16, 17),
(17, 18),
(18, 19),
(19, 20),
(20, 21),
(21, 22),
(22, 23),
(23, 1),
(24, 1),
(25, 32),
(26, 33),
(27, 34),
(28, 35),
(29, 1),
(30, 36),
(31, 37),
(32, 38),
(33, 39),
(34, 1),
(35, 1),
(36, 1),
(37, 1),
(38, 1);

-- --------------------------------------------------------

--
-- Table structure for table `avoir_categorie`
--

DROP TABLE IF EXISTS `avoir_categorie`;
CREATE TABLE IF NOT EXISTS `avoir_categorie` (
  `art_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  PRIMARY KEY (`art_id`,`cat_id`),
  KEY `IDX_E3E6C8808C25E51A` (`art_id`),
  KEY `IDX_E3E6C880E6ADA943` (`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `avoir_categorie`
--

INSERT INTO `avoir_categorie` (`art_id`, `cat_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(28, 1),
(28, 2),
(28, 3),
(28, 4),
(28, 5),
(28, 6),
(28, 7),
(28, 8);

-- --------------------------------------------------------

--
-- Table structure for table `avoir_role`
--

DROP TABLE IF EXISTS `avoir_role`;
CREATE TABLE IF NOT EXISTS `avoir_role` (
  `rol_id` int(11) NOT NULL,
  `uti_id` int(11) NOT NULL,
  PRIMARY KEY (`rol_id`,`uti_id`),
  KEY `IDX_C377A7E04BAB96C` (`rol_id`),
  KEY `IDX_C377A7E03951DF75` (`uti_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `avoir_role`
--

INSERT INTO `avoir_role` (`rol_id`, `uti_id`) VALUES
(1, 1),
(1, 33),
(1, 34),
(1, 35),
(1, 36),
(1, 37),
(1, 38),
(1, 39),
(1, 40),
(1, 41),
(1, 42),
(1, 43),
(1, 44),
(1, 45),
(2, 1),
(3, 1),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 33),
(4, 34),
(4, 35),
(4, 36),
(4, 37),
(4, 38),
(4, 39),
(4, 40),
(4, 41),
(4, 42),
(4, 43),
(4, 44),
(4, 45),
(7, 1),
(8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `intitule` varchar(254) DEFAULT NULL,
  `description` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categorie`
--

INSERT INTO `categorie` (`id`, `intitule`, `description`) VALUES
(1, 'Sciences et techniqueS', 'Description'),
(2, 'Geographie', 'Description geographie'),
(3, 'Histoire', NULL),
(4, 'Langues vivantes', NULL),
(5, 'Chimie organique', NULL),
(6, 'Pharmacologie', NULL),
(7, 'Biologie végétale', NULL),
(8, 'Biologie animale', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `coauteur`
--

DROP TABLE IF EXISTS `coauteur`;
CREATE TABLE IF NOT EXISTS `coauteur` (
  `aut_id` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `art_id` int(11) DEFAULT NULL,
  `principal` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_coauteur_auteur` (`aut_id`),
  KEY `FK_coauteur_article` (`art_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coauteur`
--

INSERT INTO `coauteur` (`aut_id`, `id`, `art_id`, `principal`) VALUES
(23, 1, 31, 1),
(24, 2, 32, 1),
(25, 3, NULL, 0),
(26, 4, NULL, 0),
(27, 5, 28, 0),
(28, 6, 28, 0),
(29, 7, 33, 1),
(34, 12, 34, 1),
(31, 9, 1, 0),
(32, 10, 1, 1),
(33, 11, 1, 0),
(35, 13, 35, 1),
(36, 14, 36, 1),
(37, 15, 37, 1),
(38, 16, 38, 1);

-- --------------------------------------------------------

--
-- Table structure for table `fichier`
--

DROP TABLE IF EXISTS `fichier`;
CREATE TABLE IF NOT EXISTS `fichier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rev_id` int(11) DEFAULT NULL,
  `typ_id` int(11) DEFAULT NULL,
  `art_id` int(11) DEFAULT NULL,
  `url` varchar(254) DEFAULT NULL,
  `description` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_fichiers_joint` (`art_id`),
  KEY `FK_fichier_avoir_type` (`typ_id`),
  KEY `FK_fichier_commentaire` (`rev_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fichier`
--

INSERT INTO `fichier` (`id`, `rev_id`, `typ_id`, `art_id`, `url`, `description`) VALUES
(1, NULL, 2, 1, 'uploads/images/fichiers/1/1.pdf', 'Description'),
(2, NULL, 1, 28, 'uploads/images/fichiers/2/1.pdf', 'Abstract description'),
(3, NULL, 2, 28, NULL, 'Maniscript description'),
(4, NULL, 2, NULL, NULL, 'vqsvqe');

-- --------------------------------------------------------

--
-- Table structure for table `funding`
--

DROP TABLE IF EXISTS `funding`;
CREATE TABLE IF NOT EXISTS `funding` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `art_id` int(11) DEFAULT NULL,
  `institution` varchar(254) COLLATE utf8_unicode_ci DEFAULT NULL,
  `number` varchar(254) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_funding_article` (`art_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `funding`
--

INSERT INTO `funding` (`id`, `art_id`, `institution`, `number`) VALUES
(1, 1, 'Institution', 'Number'),
(2, 28, 'Funding institution', '12365');

-- --------------------------------------------------------

--
-- Table structure for table `migration_versions`
--

DROP TABLE IF EXISTS `migration_versions`;
CREATE TABLE IF NOT EXISTS `migration_versions` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migration_versions`
--

INSERT INTO `migration_versions` (`version`) VALUES
('20160825210830'),
('20160825211945'),
('20160825212038'),
('20160825212221'),
('20160825212557'),
('20160825213133'),
('20160825222934'),
('20160825223258'),
('20160825223326'),
('20160906220925'),
('20160914210529'),
('20160927082655'),
('20161101204822'),
('20161102213527'),
('20170216132640'),
('20170218114353'),
('20170223174831'),
('20170301080226'),
('20170303124634'),
('20170303125056'),
('20170401221718');

-- --------------------------------------------------------

--
-- Table structure for table `numero_journal`
--

DROP TABLE IF EXISTS `numero_journal`;
CREATE TABLE IF NOT EXISTS `numero_journal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `editor_id` int(11) DEFAULT NULL,
  `date_pub` datetime DEFAULT NULL,
  `date_creation` datetime DEFAULT NULL,
  `date_validation` datetime DEFAULT NULL,
  `description` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `numero` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `published` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_7F3F9EC6995AC4C` (`editor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `numero_journal`
--

INSERT INTO `numero_journal` (`id`, `editor_id`, `date_pub`, `date_creation`, `date_validation`, `description`, `numero`, `status`, `published`) VALUES
(1, NULL, NULL, NULL, NULL, 'Description Moldifie', 'NUMERO1', NULL, NULL),
(2, NULL, NULL, NULL, NULL, 'Description 2', 'Numero 2', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personne`
--

DROP TABLE IF EXISTS `personne`;
CREATE TABLE IF NOT EXISTS `personne` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(254) DEFAULT NULL,
  `nom` varchar(254) DEFAULT NULL,
  `prenom` varchar(254) DEFAULT NULL,
  `email` varchar(254) DEFAULT NULL,
  `telephone` varchar(254) DEFAULT NULL,
  `adresse` varchar(254) DEFAULT NULL,
  `ville` varchar(254) DEFAULT NULL,
  `code_postale` varchar(254) DEFAULT NULL,
  `etat` varchar(254) DEFAULT NULL,
  `pays` varchar(254) DEFAULT NULL,
  `affiliation` varchar(254) DEFAULT NULL,
  `institution` varchar(254) DEFAULT NULL,
  `departement` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `personne`
--

INSERT INTO `personne` (`id`, `titre`, `nom`, `prenom`, `email`, `telephone`, `adresse`, `ville`, `code_postale`, `etat`, `pays`, `affiliation`, `institution`, `departement`) VALUES
(1, 'Mr.', 'Administrateur', 'First Name', 'admin@gmail.com', '+237677354920', 'qsvqvaz', NULL, NULL, NULL, 'AF', 'Affiliation', 'Institution', 'Department'),
(2, 'Mr.', 'sdfdfsd', 'sdfsdf', 'magloiredjatio@gmail.com', 'sdsdfvsd', 'sdfsdf', 'qdfsdf', 'sdfsdfd', 'sdfsd', 'AF', 'Affiliation', 'Institution', 'Department'),
(3, 'Madame', 'sdfdfsd', 'sdfsdf', 'magloiredjatio@gmail.com', 'sdsdfvsd', 'sdfsdf', 'qdfsdf', 'sdfsdfd', 'sdfsd', 'AF', 'Affiliation', 'Institution', 'Department'),
(4, 'Madame', 'sdfdfsd', 'sdfsdf', 'magloiredjatio@gmail.com', 'sdsdfvsd', 'sdfsdf', 'qdfsdf', 'sdfsdfd', 'sdfsd', 'AF', 'Affiliation', 'Institution', 'Department'),
(5, 'Madame', 'sdfdfsd', 'sdfsdf', 'magloiredjatio@gmail.com', 'sdsdfvsd', 'sdfsdf', 'qdfsdf', 'sdfsdfd', 'sdfsd', 'AF', 'Affiliation', 'Institution', 'Department'),
(6, 'Madame', 'sdfdfsd', 'sdfsdf', 'magloiredjatio@gmail.com', 'sdsdfvsd', 'sdfsdf', 'qdfsdf', 'sdfsdfd', 'sdfsd', 'AF', 'Affiliation', 'Institution', 'Department'),
(7, 'Madame', 'sdfdfsd', 'sdfsdf', 'magloiredjatio@gmail.com', 'sdsdfvsd', 'sdfsdf', 'qdfsdf', 'sdfsdfd', 'sdfsd', 'AF', 'Affiliation', 'Institution', 'Department'),
(8, 'Madame', 'sdfdfsd', 'sdfsdf', 'magloiredjatio@gmail.com', 'sdsdfvsd', 'sdfsdf', 'qdfsdf', 'sdfsdfd', 'sdfsd', 'AF', 'Affiliation', 'Institution', 'Department'),
(9, 'Madame', 'sdfdfsd', 'sdfsdf', 'magloiredjatio@gmail.com', 'sdsdfvsd', 'sdfsdf', 'qdfsdf', 'sdfsdfd', 'sdfsd', 'AF', 'Affiliation', 'Institution', 'Department'),
(10, 'Madame', 'sdfdfsd', 'sdfsdf', 'magloiredjatio@gmail.com', 'sdsdfvsd', 'sdfsdf', 'qdfsdf', 'sdfsdfd', 'sdfsd', 'AF', 'Affiliation', 'Institution', 'Department'),
(11, 'Madame', 'sdfdfsd', 'sdfsdf', 'magloiredjatio@gmail.com', 'sdsdfvsd', 'sdfsdf', 'qdfsdf', 'sdfsdfd', 'sdfsd', 'AF', 'Affiliation', 'Institution', 'Department'),
(12, 'Madame', 'sdfdfsd', 'sdfsdf', 'magloiredjatio@gmail.com', 'sdsdfvsd', 'sdfsdf', 'qdfsdf', 'sdfsdfd', 'sdfsd', 'AF', 'Affiliation', 'Institution', 'Department'),
(13, 'Madame', 'sdfdfsd', 'sdfsdf', 'magloiredjatio@gmail.com', 'sdsdfvsd', 'sdfsdf', 'qdfsdf', 'sdfsdfd', 'sdfsd', 'AF', 'Affiliation', 'Institution', 'Department'),
(14, 'Madame', 'sdfdfsd', 'sdfsdf', 'magloiredjatio@gmail.com', 'sdsdfvsd', 'sdfsdf', 'qdfsdf', 'sdfsdfd', 'sdfsd', 'AF', 'Affiliation', 'Institution', 'Department'),
(15, 'Madame', 'xcvsdv', 'sdvsdv', 'magloiredjatio@gmail.com', 'qssfq', 'qsdq', 'qsfqs', 'qsdq', 'qsdf', 'AF', 'Affiliation', 'Institution', 'Department'),
(16, 'Docteur', 'qsqsdq', 'qsdqs', 'magloiredjatio@gmail.com', 'qsdqs', 'qsdqsd', 'qsdqs', 'qsdqs', 'qsdqs', 'AF', 'Affiliation', 'Institution', 'Department'),
(17, 'Madame', 'DJATIO', 'Magloire', 'magloiredjatio22@gmail.com', '2375641258', 'Dschang', 'Dschang', '00150', 'Ouest', 'CM', 'Affiliation', 'Institution', 'Department'),
(18, 'Docteur', 'Test Nom', 'Test Prenom', 'testnom@gmail.com', '2375485241', 'Adresse', 'Douala', '215478', 'Ouest', 'AD', 'Affiliation', 'Institution', 'Department'),
(19, 'Madame', 'Test Nom 2', 'Test Prenom 1', 'testnom2@gmail.com', '495956456456', 'sdfzdsfvds', NULL, NULL, NULL, 'AL', 'Affiliation', 'Institution', 'Department'),
(20, 'Madame', 'Test Nom 2', 'Test Prenom 1', 'testnom2@gmail.com', '495956456456', 'sdfzdsfvds', NULL, NULL, NULL, 'AL', 'Affiliation', 'Institution', 'Department'),
(21, 'Madame', 'Test Nom 2', 'Test Prenom 1', 'testnom2@gmail.com', '495956456456', 'sdfzdsfvds', NULL, NULL, NULL, 'AL', 'Affiliation', 'Institution', 'Department'),
(22, 'Madame', 'Test Nom 2', 'Test Prenom 1', 'testnom2@gmail.com', '495956456456', 'sdfzdsfvds', NULL, NULL, NULL, 'AL', 'Affiliation', 'Institution', 'Department'),
(23, 'Madame', 'Test Nom 2', 'Test Prenom 1', 'testnom2@gmail.com', '495956456456', 'sdfzdsfvds', NULL, NULL, NULL, 'AL', 'Affiliation', 'Institution', 'Department'),
(24, 'Madame', 'Test Nom 2', 'Test Prenom 1', 'testnom2@gmail.com', '495956456456', 'sdfzdsfvds', NULL, NULL, NULL, 'AL', 'Affiliation', 'Institution', 'Department'),
(25, 'Madame', 'Test Nom 2', 'Test Prenom 1', 'testnom2@gmail.com', '495956456456', 'sdfzdsfvds', NULL, NULL, NULL, 'AL', 'Affiliation', 'Institution', 'Department'),
(26, 'Madame', 'Test Nom 2', 'Test Prenom 1', 'testnom2@gmail.com', '495956456456', 'sdfzdsfvds', NULL, NULL, NULL, 'AL', 'Affiliation', 'Institution', 'Department'),
(27, 'Madame', 'Test Nom 2', 'Test Prenom 1', 'testnom2@gmail.com', '495956456456', 'sdfzdsfvds', NULL, NULL, NULL, 'AL', 'Affiliation', 'Institution', 'Department'),
(28, 'Madame', 'Test Nom 2', 'Test Prenom 1', 'testnom2@gmail.com', '495956456456', 'sdfzdsfvds', NULL, NULL, NULL, 'AL', 'Affiliation', 'Institution', 'Department'),
(29, 'Madame', 'Test Nom 2', 'Test Prenom 1', 'testnom2@gmail.com', '495956456456', 'sdfzdsfvds', NULL, NULL, NULL, 'AL', 'Affiliation', 'Institution', 'Department'),
(30, 'Madame', 'Fopa', 'Guy', 'guyfopa@gmail.com', '54656565', 'Adresse', 'Douala', '6556', 'Litorral', 'AL', 'Affiliation', 'Institution', 'Department'),
(31, 'Madame', 'Kuete', 'Victor', 'vk@gmail.com', '552452555', 'adresse', 'Dschang', '1252', 'Ouest', 'AR', 'Affiliation', 'Institution', 'Department'),
(32, 'Mr.', 'sdfsdf', 'fghr', 'sdfsdfds@gmail.com', 'sdfsd', 'sdgsgs', NULL, NULL, NULL, 'AF', 'sdgsdgds', 'sdgsdgs', 'sdgsdgfds'),
(33, 'Mr.', 'DOUANLA', 'Magloire', 'magloiredjatio@gmail.com', '677354920', 'Address', 'Dschang', '00150', 'State', 'CM', 'Affiliation', 'Institution', 'Departement'),
(34, 'Ms.', 'Ngouffo', 'First Name2', 'email@gmail.com', '123654789', 'Address', 'Town', '00150', 'State', 'AZ', 'Affiliation', 'Institution', 'Department'),
(35, 'Mr.', 'scqsq', 'qscqsc', 'qscqscsq@gmail.com', '5454545', 'sergfze', 'sefqe', 'zregfze', 'sgvfeq', 'AF', 'sszrgfze', 'srgze', 'sefgze'),
(36, 'Mr.', 'rbhzrghbae', 'aeefaz', 'faefaze@gmail.com', 'dzeveaz', 'sdvsd', 'vze', 'sdvsd', 'sdvz', 'AF', 'sdvsd', 'sdvsd', 'sdvsd'),
(37, 'Mr.', 'Douanla', 'Magloire', 'magloiredjatio@gmail.com', 'sdvdsvzed', 'Dschang', 'Dschang', '00150', '- Aucun -', 'CM', 'Chef de département', 'Université de Dschang', 'Sciences'),
(38, 'Ms.', 'Fomena22', 'Jeanne', 'magloiredjatio@gmail.com', 'qdvsdv', 'Dschang', 'Dschang', '00150', '- Aucun -', 'CM', 'Test', 'Université de Buéa', 'Lettres'),
(39, 'Dr.', 'Kuete', 'Victor', 'magloiredjatio@gmail.com', '45214', 'Dschang', 'Dschang', '00150', '- Aucun -', 'CM', 'Afficliation', 'Université de Dschang', 'Sciences'),
(40, 'Dr.', 'Suggested', 'Reviewer', 'suggested@gmail.com', '57946445', 'Addresse', 'Ville', '1254', 'State', 'AF', 'Affilliation', 'Institution', 'Departement'),
(41, 'Mr.', 'article_reviewer[reviewer][personne][nom]', 'article_reviewer[reviewer][personne][prenom]', 'example@example.com', '1234567890', 'article_reviewer[reviewer][personne][adresse]', 'article_reviewer[reviewer][personne][ville]', 'article_reviewer[reviewer][personne][codePostale]', 'article_reviewer[reviewer][personne][etat]', 'AF', 'article_reviewer[reviewer][personne][affiliation]', 'article_reviewer[reviewer][personne][institution]', 'article_reviewer[reviewer][personne][departement]'),
(42, 'Mr.', 'article_reviewer[reviewer][personne][nom]', 'article_reviewer[reviewer][personne][prenom]', 'example@example.com', '1234567890', 'article_reviewer[reviewer][personne][adresse]', 'article_reviewer[reviewer][personne][ville]', 'article_reviewer[reviewer][personne][codePostale]', 'article_reviewer[reviewer][personne][etat]', 'AF', 'article_reviewer[reviewer][personne][affiliation]', 'article_reviewer[reviewer][personne][institution]', 'article_reviewer[reviewer][personne][departement]'),
(43, 'Mr.', 'Suggested', 'Reviewer', 'example@example.com', '1234567890', 'article_reviewer[reviewer][personne][adresse]', 'article_reviewer[reviewer][personne][ville]', 'article_reviewer[reviewer][personne][codePostale]', 'article_reviewer[reviewer][personne][etat]', 'AF', 'article_reviewer[reviewer][personne][affiliation]', 'Université de Dschang', 'article_reviewer[reviewer][personne][departement]'),
(44, 'Pr.', 'Suggested', 'Reviewer', 'suggested@gmail.com', '21564623', 'zrgzrg', 'qsdvzevze', 'zeggzeg', 'sdfzef"e', 'AF', 'zrgzeg', 'Université de Buéa', 'zrgzer'),
(45, 'Mr.', 'Opposed', 'Reviewer', 'example@example.com', '1234567890', 'article_reviewer[reviewer][personne][adresse]', 'article_reviewer[reviewer][personne][ville]', 'article_reviewer[reviewer][personne][codePostale]', 'article_reviewer[reviewer][personne][etat]', 'AF', 'article_reviewer[reviewer][personne][affiliation]', 'Université de Yaoundé 1', 'article_reviewer[reviewer][personne][departement]'),
(46, 'Mr.', 'Opposed', 'Reviewer', 'example@example.com', '1234567890', 'article_reviewer[reviewer][personne][adresse]', 'article_reviewer[reviewer][personne][ville]', 'article_reviewer[reviewer][personne][codePostale]', 'article_reviewer[reviewer][personne][etat]', 'AF', 'article_reviewer[reviewer][personne][affiliation]', 'Université de Ngaoundéré', 'article_reviewer[reviewer][personne][departement]'),
(47, 'Mr.', 'utilisateur[personne][nom]', 'utilisateur[personne][prenom]', 'example@example.com', '1234567890', 'utilisateur[personne][adresse]', 'utilisateur[personne][ville]', 'utilisateur[personne][codePostale]', 'utilisateur[personne][etat]', 'AF', 'utilisateur[personne][affiliation]', 'utilisateur[personne][institution]', 'utilisateur[personne][departement]'),
(48, 'Mr.', 'utilisateur[personne][nom]', 'utilisateur[personne][prenom]', 'example@example.com', '1234567890', 'utilisateur[personne][adresse]', 'utilisateur[personne][ville]', 'utilisateur[personne][codePostale]', 'utilisateur[personne][etat]', 'AF', 'utilisateur[personne][affiliation]', 'utilisateur[personne][institution]', 'utilisateur[personne][departement]'),
(49, 'Mr.', 'utilisateur[personne][nom]', 'utilisateur[personne][prenom]', 'example@example.com', '1234567890', 'utilisateur[personne][adresse]', 'utilisateur[personne][ville]', 'utilisateur[personne][codePostale]', 'utilisateur[personne][etat]', 'AF', 'utilisateur[personne][affiliation]', 'utilisateur[personne][institution]', 'utilisateur[personne][departement]'),
(50, 'Mr.', 'utilisateur[personne][nom]', 'utilisateur[personne][prenom]', 'example@example.com', '1234567890', 'utilisateur[personne][adresse]', 'utilisateur[personne][ville]', 'utilisateur[personne][codePostale]', 'utilisateur[personne][etat]', 'AF', 'utilisateur[personne][affiliation]', 'utilisateur[personne][institution]', 'utilisateur[personne][departement]'),
(51, 'Mr.', 'utilisateur[personne][nom]', 'utilisateur[personne][prenom]', 'example@example.com', '1234567890', 'utilisateur[personne][adresse]', 'utilisateur[personne][ville]', 'utilisateur[personne][codePostale]', 'utilisateur[personne][etat]', 'AF', 'utilisateur[personne][affiliation]', 'utilisateur[personne][institution]', 'utilisateur[personne][departement]'),
(52, 'Mr.', 'utilisateur[personne][nom]', 'utilisateur[personne][prenom]', 'example@example.com', '1234567890', 'utilisateur[personne][adresse]', 'utilisateur[personne][ville]', 'utilisateur[personne][codePostale]', 'utilisateur[personne][etat]', 'AF', 'utilisateur[personne][affiliation]', 'utilisateur[personne][institution]', 'utilisateur[personne][departement]'),
(53, 'Mr.', 'utilisateur[personne][nom]', 'utilisateur[personne][prenom]', 'example@example.com', '1234567890', 'utilisateur[personne][adresse]', 'utilisateur[personne][ville]', 'utilisateur[personne][codePostale]', 'utilisateur[personne][etat]', 'AF', 'utilisateur[personne][affiliation]', 'utilisateur[personne][institution]', 'utilisateur[personne][departement]'),
(54, 'Mr.', 'utilisateur[personne][nom]', 'utilisateur[personne][prenom]', 'example@example.com', '1234567890', 'utilisateur[personne][adresse]', 'utilisateur[personne][ville]', 'utilisateur[personne][codePostale]', 'utilisateur[personne][etat]', 'AF', 'utilisateur[personne][affiliation]', 'utilisateur[personne][institution]', 'utilisateur[personne][departement]'),
(55, 'Mr.', 'utilisateur[personne][nom]', 'utilisateur[personne][prenom]', 'example@example.com', '1234567890', 'utilisateur[personne][adresse]', 'utilisateur[personne][ville]', 'utilisateur[personne][codePostale]', 'utilisateur[personne][etat]', 'AF', 'utilisateur[personne][affiliation]', 'utilisateur[personne][institution]', 'utilisateur[personne][departement]'),
(56, 'Mr.', 'utilisateur[personne][nom]', 'utilisateur[personne][prenom]', 'example@example.com', '1234567890', 'utilisateur[personne][adresse]', 'utilisateur[personne][ville]', 'utilisateur[personne][codePostale]', 'utilisateur[personne][etat]', 'AF', 'utilisateur[personne][affiliation]', 'utilisateur[personne][institution]', 'utilisateur[personne][departement]'),
(57, 'Mr.', 'DJATIO', 'Magloire', 'magloiredjatio@gmail.com', '677354920', 'Address', 'Dschang', '00150', 'Ouest', 'CM', 'Docteur', 'Université de Picardie Jules Verne', 'Sciences'),
(58, 'Mr.', 'DJATIO', 'Magloire', 'magloiredjatio@gmail.com', '677354920', 'Address', 'Dschang', '00150', 'Ouest', 'CM', 'Docteur', 'Université de Picardie Jules Verne', 'Sciences'),
(59, 'Mr.', 'DJATIO', 'Magloire', 'magloiredjatio@yahoo.fr', '677354920', 'Address', 'Dschang', '00150', 'Ouest', 'CM', 'Docteur', 'Université de Picardie Jules Verne', 'Sciences'),
(60, 'Ms.', 'Tientchieu', 'Thierry', 'thierry@gmail.com', '677354920', 'Address', 'Douala', '00150', 'Littoral', 'CM', 'Affiliation', 'Institution', 'Département'),
(61, 'Ms.', 'Tchio', 'Ismaelle', 'ismaelle@gmail.com', '5484556', 'Address', 'Town', '152', 'state', 'AM', 'Affiliation', 'Institution', 'Department'),
(62, 'Mr.', 'registration[personne][nom]', 'registration[personne][prenom]', 'example@example.com', '1234567890', 'registration[personne][adresse]', 'registration[personne][ville]', 'registration[personne][codePostale]', 'registration[personne][etat]', 'AF', 'registration[personne][affiliation]', 'registration[personne][institution]', 'registration[personne][departement]'),
(63, 'Mr.', 'registration[personne][nom]', 'registration[personne][prenom]', 'example2@example.com', '1234567890', 'registration[personne][adresse]', 'registration[personne][ville]', 'registration[personne][codePostale]', 'registration[personne][etat]', 'AF', 'registration[personne][affiliation]', 'registration[personne][institution]', 'registration[personne][departement]'),
(64, 'Mr.', 'registration[personne][nom]', 'registration[personne][prenom]', 'example3@example.com', '1234567890', 'registration[personne][adresse]', 'registration[personne][ville]', 'registration[personne][codePostale]', 'registration[personne][etat]', 'AF', 'registration[personne][affiliation]', 'registration[personne][institution]', 'registration[personne][departement]'),
(65, 'Mr.', 'registration[personne][nom]', 'registration[personne][prenom]', 'example4@example.com', '1234567890', 'registration[personne][adresse]', 'registration[personne][ville]', 'registration[personne][codePostale]', 'registration[personne][etat]', 'AF', 'registration[personne][affiliation]', 'registration[personne][institution]', 'registration[personne][departement]'),
(66, 'Mr.', 'registration[personne][nom]', 'registration[personne][prenom]', 'example5@example.com', '1234567890', 'registration[personne][adresse]', 'registration[personne][ville]', 'registration[personne][codePostale]', 'registration[personne][etat]', 'AF', 'registration[personne][affiliation]', 'registration[personne][institution]', 'registration[personne][departement]'),
(67, 'Mr.', 'registration[personne][nom]', 'registration[personne][prenom]', 'example6@example.com', '1234567890', 'registration[personne][adresse]', 'registration[personne][ville]', 'registration[personne][codePostale]', 'registration[personne][etat]', 'AF', 'registration[personne][affiliation]', 'registration[personne][institution]', 'registration[personne][departement]'),
(68, 'Mr.', 'registration[personne][nom]', 'registration[personne][prenom]', 'example7@example.com', '1234567890', 'registration[personne][adresse]', 'registration[personne][ville]', 'registration[personne][codePostale]', 'registration[personne][etat]', 'AF', 'registration[personne][affiliation]', 'registration[personne][institution]', 'registration[personne][departement]'),
(69, 'Mr.', 'registration[personne][nom]', 'registration[personne][prenom]', 'example8@example.com', '1234567890', 'registration[personne][adresse]', 'registration[personne][ville]', 'registration[personne][codePostale]', 'registration[personne][etat]', 'AF', 'registration[personne][affiliation]', 'registration[personne][institution]', 'registration[personne][departement]'),
(70, 'Mr.', 'registration[personne][nom]', 'registration[personne][prenom]', 'example9@example.com', '1234567890', 'registration[personne][adresse]', 'registration[personne][ville]', 'registration[personne][codePostale]', 'registration[personne][etat]', 'AF', 'registration[personne][affiliation]', 'registration[personne][institution]', 'registration[personne][departement]'),
(71, 'Mr.', 'article_reviewer[reviewer][personne][nom]', 'article_reviewer[reviewer][personne][prenom]', 'example10@example.com', '1234567890', 'article_reviewer[reviewer][personne][adresse]', 'article_reviewer[reviewer][personne][ville]', 'article_reviewer[reviewer][personne][codePostale]', 'article_reviewer[reviewer][personne][etat]', 'AF', 'article_reviewer[reviewer][personne][affiliation]', 'article_reviewer[reviewer][personne][institution]', 'article_reviewer[reviewer][personne][departement]');

-- --------------------------------------------------------

--
-- Table structure for table `publication`
--

DROP TABLE IF EXISTS `publication`;
CREATE TABLE IF NOT EXISTS `publication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fic_id` int(11) DEFAULT NULL,
  `uti_id` int(11) DEFAULT NULL,
  `art_id` int(11) DEFAULT NULL,
  `datePub` datetime DEFAULT NULL,
  `commentaires` varchar(254) DEFAULT NULL,
  `article` varchar(254) DEFAULT NULL,
  `etat` varchar(254) DEFAULT NULL,
  `numjournal_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_utilisateur_publier` (`uti_id`),
  KEY `FK_fichier_publie` (`fic_id`),
  KEY `FK_publication_article` (`art_id`),
  KEY `IDX_AF3C677978CC5DC3` (`numjournal_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
CREATE TABLE IF NOT EXISTS `review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rev_id` int(11) DEFAULT NULL,
  `art_id` int(11) DEFAULT NULL,
  `titre` varchar(254) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` varchar(254) COLLATE utf8_unicode_ci DEFAULT NULL,
  `appreciation` varchar(254) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date_commentaire` int(11) DEFAULT NULL,
  `statut` varchar(254) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_commentaire_article` (`art_id`),
  KEY `FK_commenter` (`rev_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `rev_id`, `art_id`, `titre`, `content`, `appreciation`, `date_commentaire`, `statut`) VALUES
(1, 1, 28, 'review title modifié', 'Review content', 'FAIR', NULL, 'REVIEW_IN_PROGRESS'),
(2, 1, 30, NULL, NULL, NULL, NULL, 'REVIEW_IN_PROGRESS');

-- --------------------------------------------------------

--
-- Table structure for table `reviewer`
--

DROP TABLE IF EXISTS `reviewer`;
CREATE TABLE IF NOT EXISTS `reviewer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pers_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_reviewer_peut_etre_personne` (`pers_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `reviewer`
--

INSERT INTO `reviewer` (`id`, `pers_id`) VALUES
(1, 40),
(2, 41),
(3, 42),
(4, 43),
(5, 44),
(6, 45),
(7, 46),
(8, 71);

-- --------------------------------------------------------

--
-- Table structure for table `review_manuscript`
--

DROP TABLE IF EXISTS `review_manuscript`;
CREATE TABLE IF NOT EXISTS `review_manuscript` (
  `art_id` int(11) NOT NULL,
  `reviewer_id` int(11) NOT NULL,
  PRIMARY KEY (`art_id`,`reviewer_id`),
  KEY `IDX_2D69D8C08C25E51A` (`art_id`),
  KEY `IDX_2D69D8C070574616` (`reviewer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review_request`
--

DROP TABLE IF EXISTS `review_request`;
CREATE TABLE IF NOT EXISTS `review_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `art_id` int(11) DEFAULT NULL,
  `rev_id` int(11) DEFAULT NULL,
  `accepted` tinyint(1) DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_review_request_reviewer` (`rev_id`),
  KEY `FK_review_request_article` (`art_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `review_request`
--

INSERT INTO `review_request` (`id`, `art_id`, `rev_id`, `accepted`, `comment`, `status`) VALUES
(1, 28, 1, 1, NULL, 'HANDLE'),
(2, 30, 1, 0, NULL, 'HANDLE'),
(3, 28, 2, NULL, NULL, 'NOT_HANDLE'),
(4, 30, 2, NULL, NULL, 'NOT_HANDLE');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(254) DEFAULT NULL,
  `description` varchar(254) DEFAULT NULL,
  `code` varchar(254) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_57698A6A77153098` (`code`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `libelle`, `description`, `code`) VALUES
(1, 'Author', 'Author', 'ROLE_JS_AUTHOR'),
(2, 'Editor', 'Editor', 'ROLE_JS_EDITOR'),
(3, 'Administrator', 'Administrator', 'ROLE_JS_SUPER_ADMIN'),
(4, 'Reviewer', 'Reviewer', 'ROLE_JS_REVIEWER'),
(6, 'Public User', 'Public User', 'ROLE_JS_PUBLIC'),
(7, 'Publisher', 'Publisher', 'ROLE_JS_PUBLISHER'),
(8, 'Main Editor', 'Main Editor', 'ROLE_JS_MAIN_EDITOR');

-- --------------------------------------------------------

--
-- Table structure for table `typefichier`
--

DROP TABLE IF EXISTS `typefichier`;
CREATE TABLE IF NOT EXISTS `typefichier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `intitule` varchar(254) DEFAULT NULL,
  `inclure` tinyint(1) DEFAULT NULL,
  `rang` int(11) DEFAULT NULL,
  `obligatoire` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `typefichier`
--

INSERT INTO `typefichier` (`id`, `intitule`, `inclure`, `rang`, `obligatoire`) VALUES
(1, 'Abstract', 1, 1, 1),
(2, 'Manuscrit', 1, 2, 1),
(3, 'Table of content', 1, 3, 1),
(4, 'References', 1, 4, 0),
(5, 'Test add attachement', 1, 1, 1),
(6, 'Test add attachement edited', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `type_article`
--

DROP TABLE IF EXISTS `type_article`;
CREATE TABLE IF NOT EXISTS `type_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(254) DEFAULT NULL,
  `description` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `type_article`
--

INSERT INTO `type_article` (`id`, `libelle`, `description`) VALUES
(1, 'Article de recherche', 'Description'),
(2, 'Rapport de stage', NULL),
(3, 'Recherche clinique', 'Recherche clinique');

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `per_id` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(254) NOT NULL,
  `mot_de_passe` varchar(254) NOT NULL,
  `salt` varchar(254) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_1D1C63B3F85E0677` (`username`),
  KEY `FK_Generalisation_5` (`per_id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`per_id`, `id`, `username`, `mot_de_passe`, `salt`, `active`) VALUES
(1, 1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', NULL, 1),
(2, 2, 'sdfsd', 'test', NULL, 0),
(4, 3, 'sdfsdsdf', 'test', NULL, 0),
(5, 4, 'test', 'test', NULL, 0),
(6, 5, 'test1', 'test', NULL, 0),
(7, 6, 'test2', 'test', NULL, 0),
(8, 7, 'test3', 'test', NULL, 0),
(13, 8, 'test4', 'test', NULL, 0),
(14, 9, 'test5', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', NULL, 0),
(15, 10, 'test7', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', NULL, 0),
(16, 11, 'test8', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', NULL, 0),
(17, 12, 'genoud6', '63649dabe68c2efe0f002567740121c85ef1ac19', NULL, 1),
(18, 13, 'testnom', '1ee11d77b3b1722d42b695b2b9dec2bec1f0e91a', NULL, 1),
(19, 14, 'testnom2', '150211a22b7a6643848956495c8cf5fbe86ccab7', NULL, 1),
(21, 15, 'testnom21', '150211a22b7a6643848956495c8cf5fbe86ccab7', NULL, 1),
(22, 16, 'testnom22', '150211a22b7a6643848956495c8cf5fbe86ccab7', NULL, 1),
(24, 17, 'testnom23', '150211a22b7a6643848956495c8cf5fbe86ccab7', NULL, 1),
(26, 18, 'testnom24', '150211a22b7a6643848956495c8cf5fbe86ccab7', NULL, 1),
(27, 19, 'testnom25', '150211a22b7a6643848956495c8cf5fbe86ccab7', NULL, 1),
(28, 20, 'testnom26', '150211a22b7a6643848956495c8cf5fbe86ccab7', NULL, 1),
(29, 21, 'testnom3', '539c96c151861ec44183f658b25e051f695e0576', NULL, 1),
(30, 22, 'guy', 'b5cd271b521acc9a180d5ff625e8f9a71c235729', NULL, 1),
(31, 23, 'victor', '88fa846e5f8aa198848be76e1abdcb7d7a42d292', NULL, 1),
(47, 24, 'utilisateur[username]', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', NULL, 1),
(49, 25, 'test123', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', NULL, 1),
(50, 26, 'test123456', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', NULL, 1),
(51, 27, 'testlogin1', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', NULL, 1),
(52, 28, 'testlogin2', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', NULL, 1),
(53, 29, 'testlogin3', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', NULL, 1),
(54, 30, 'testlogin4', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', NULL, 1),
(55, 31, 'testlogin5', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', NULL, 1),
(56, 32, 'testlogin6', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', NULL, 1),
(57, 33, 'magloiredjatio@gmail.com', '63a6fdb26d4b2c92a8854105c925e9796f1741cc', NULL, 1),
(59, 34, 'magloiredjatio@yahoo.fr', 'b070a96384b6f95dcf0d3577b3a1dc41692d4d42', NULL, 1),
(60, 35, 'thierry@gmail.com', '0e92e0812840bb7d34165b10584a61af44c510ee', NULL, 1),
(61, 36, 'ismaelle@gmail.com', 'cb1d178287bd7dce914dc888e8d68b3f4fc2f660', NULL, 1),
(62, 37, 'example@example.com', 'df202a9d76b68f651050633e773336248019fc59', NULL, 1),
(63, 38, 'example2@example.com', '78281712a836fd6fddf9dad73ba3bf2dd4ddc79d', NULL, 1),
(64, 39, 'example3@example.com', '084694e44e44aef0b412e1edbb1531ec45dfe958', NULL, 1),
(65, 40, 'example4@example.com', 'f779360c7cf3dd63a5b5fe9bc9e47485fb8b9acd', NULL, 1),
(66, 41, 'example5@example.com', 'fce65f896523d5f2600ccd8d7108bb2dafc7efb7', NULL, 1),
(67, 42, 'example6@example.com', '63fa351f015b09a9151b8a903bae93c0aa1a1d64', NULL, 1),
(68, 43, 'example7@example.com', 'c75ba767be09b130a9517296fea5c13e6772d02a', NULL, 1),
(69, 44, 'example8@example.com', 'e196245fe283629b1b9330056fb6996c6976958b', NULL, 1),
(70, 45, 'example9@example.com', 'f36d411a4e511db2cef915e21e9e6f8e86dc55aa', NULL, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
