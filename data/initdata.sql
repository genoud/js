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


--
-- Dumping data for table `personne`
--

INSERT INTO `personne` (`id`, `titre`, `nom`, `prenom`, `email`, `telephone`, `adresse`, `ville`, `code_postale`, `etat`, `pays`, `affiliation`, `institution`, `departement`) VALUES
(1, 'Prof.', 'Kuete', 'Victor', 'admin@gmail.com', '+237677354920', 'qsvqvaz', NULL, NULL, NULL, 'AF', 'Affiliation', 'Institution', 'Department');

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`per_id`, `id`, `username`, `mot_de_passe`, `salt`, `active`) VALUES
(1, 1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', NULL, 1);



--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `libelle`, `description`, `code`) VALUES(1, 'Author', 'Author', 'ROLE_JS_AUTHOR'),(2, 'Editor', 'Editor', 'ROLE_JS_EDITOR'),(3, 'Administrator', 'Administrator', 'ROLE_JS_SUPER_ADMIN'),(4, 'Reviewer', 'Reviewer', 'ROLE_JS_REVIEWER'),(5, 'Public User', 'Public User', 'ROLE_JS_PUBLIC'),(6, 'Publisher', 'Publisher', 'ROLE_JS_PUBLISHER'),(7, 'Main Editor', 'Main Editor', 'ROLE_JS_MAIN_EDITOR');

--
-- Dumping data for table `avoir_role`
--

INSERT INTO `avoir_role` (`rol_id`, `uti_id`) VALUES(1, 1),(2, 1),(3, 1),(4, 1),(6, 1),(7, 1);


--
-- Dumping data for table `categorie`
--

INSERT INTO `categorie` (`id`, `intitule`, `description`) VALUES(1, 'Sciences et techniqueS', 'Description'),(2, 'Geographie', 'Description geographie'),(3, 'Histoire', NULL),(4, 'Langues vivantes', NULL),(5, 'Chimie organique', NULL),(6, 'Pharmacologie', NULL),(7, 'Biologie végétale', NULL),(8, 'Biologie animale', NULL);

-- --------------------------------------------------------





-- --------------------------------------------------------

--
-- Dumping data for table `typefichier`
--

INSERT INTO `typefichier` (`id`, `intitule`, `inclure`, `rang`, `obligatoire`) VALUES(1, 'Abstract', 1, 1, 1),(2, 'Manuscrit', 1, 2, 1),(3, 'Table of content', 1, 3, 1),(4, 'References', 1, 4, 0),(5, 'Test add attachement', 1, 1, 1),(6, 'Test add attachement edited', 1, 1, 1);

-- --------------------------------------------------------


--
-- Dumping data for table `type_article`
--

INSERT INTO `type_article` (`id`, `libelle`, `description`) VALUES(1, 'Article de recherche', 'Description'),(2, 'Rapport de stage', NULL),(3, 'Recherche clinique', 'Recherche clinique');

-- --------------------------------------------------------
