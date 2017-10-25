<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20170402182136 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE article (id INT AUTO_INCREMENT NOT NULL, art_id INT DEFAULT NULL, typ_id INT DEFAULT NULL, uti_id INT DEFAULT NULL, editor_id INT DEFAULT NULL, titre_court VARCHAR(254) DEFAULT NULL, abstract VARCHAR(5000) DEFAULT NULL, introduction VARCHAR(254) DEFAULT NULL, resume VARCHAR(254) DEFAULT NULL, date_creation DATETIME DEFAULT NULL, date_soummission DATETIME DEFAULT NULL, date_revision DATETIME DEFAULT NULL, titre_complet LONGTEXT DEFAULT NULL, etat INT DEFAULT NULL, statut VARCHAR(254) DEFAULT NULL, motscles VARCHAR(1000) DEFAULT NULL, accepted TINYINT(1) DEFAULT NULL, published TINYINT(1) DEFAULT NULL, refused TINYINT(1) DEFAULT NULL, step1 TINYINT(1) DEFAULT NULL, step2 TINYINT(1) DEFAULT NULL, step3 TINYINT(1) DEFAULT NULL, step4 TINYINT(1) DEFAULT NULL, step5 TINYINT(1) DEFAULT NULL, step6 TINYINT(1) DEFAULT NULL, step7 TINYINT(1) DEFAULT NULL, step8 TINYINT(1) DEFAULT NULL, step9 TINYINT(1) DEFAULT NULL, step10 TINYINT(1) DEFAULT NULL, step11 TINYINT(1) DEFAULT NULL, step12 TINYINT(1) DEFAULT NULL, additionalinfo1 VARCHAR(500) DEFAULT NULL, additionalinfo2 VARCHAR(500) DEFAULT NULL, comments VARCHAR(500) DEFAULT NULL, INDEX IDX_23A0E666995AC4C (editor_id), INDEX FK_article_type (typ_id), INDEX FK_creer (uti_id), INDEX FK_revision (art_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE review_manuscript (art_id INT NOT NULL, reviewer_id INT NOT NULL, INDEX IDX_2D69D8C08C25E51A (art_id), INDEX IDX_2D69D8C070574616 (reviewer_id), PRIMARY KEY(art_id, reviewer_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE avoir_categorie (art_id INT NOT NULL, cat_id INT NOT NULL, INDEX IDX_E3E6C8808C25E51A (art_id), INDEX IDX_E3E6C880E6ADA943 (cat_id), PRIMARY KEY(art_id, cat_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE article_reviewer (id INT AUTO_INCREMENT NOT NULL, opposed_art_id INT DEFAULT NULL, suggested_art_id INT DEFAULT NULL, rev_id INT DEFAULT NULL, reason VARCHAR(500) DEFAULT NULL, opposed TINYINT(1) DEFAULT NULL, suggested TINYINT(1) DEFAULT NULL, INDEX FK_article_reviewer_reviewer (rev_id), INDEX FK_opposed_reviewer_article (opposed_art_id), INDEX FK_suggested_reviewer_article (suggested_art_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE auteur (id INT AUTO_INCREMENT NOT NULL, pers_id INT DEFAULT NULL, INDEX FK_auteur_peut_etre_personne (pers_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categorie (id INT AUTO_INCREMENT NOT NULL, intitule VARCHAR(254) DEFAULT NULL, description VARCHAR(254) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE coauteur (id INT AUTO_INCREMENT NOT NULL, art_id INT DEFAULT NULL, aut_id INT DEFAULT NULL, principal TINYINT(1) DEFAULT NULL, INDEX FK_coauteur_auteur (aut_id), INDEX FK_coauteur_article (art_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE fichier (id INT AUTO_INCREMENT NOT NULL, art_id INT DEFAULT NULL, typ_id INT DEFAULT NULL, rev_id INT DEFAULT NULL, url VARCHAR(254) DEFAULT NULL, description VARCHAR(254) DEFAULT NULL, INDEX FK_fichier_avoir_type (typ_id), INDEX FK_fichier_commentaire (rev_id), INDEX FK_fichiers_joint (art_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE funding (id INT AUTO_INCREMENT NOT NULL, art_id INT DEFAULT NULL, institution VARCHAR(254) DEFAULT NULL, number VARCHAR(254) DEFAULT NULL, INDEX FK_funding_article (art_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE numero_journal (id INT AUTO_INCREMENT NOT NULL, editor_id INT DEFAULT NULL, date_pub DATETIME DEFAULT NULL, date_creation DATETIME DEFAULT NULL, date_validation DATETIME DEFAULT NULL, description VARCHAR(1000) DEFAULT NULL, numero VARCHAR(15) DEFAULT NULL, status VARCHAR(25) DEFAULT NULL, published TINYINT(1) DEFAULT NULL, INDEX IDX_7F3F9EC6995AC4C (editor_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE personne (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(254) DEFAULT NULL, nom VARCHAR(254) DEFAULT NULL, prenom VARCHAR(254) DEFAULT NULL, email VARCHAR(254) DEFAULT NULL, telephone VARCHAR(254) DEFAULT NULL, adresse VARCHAR(254) DEFAULT NULL, ville VARCHAR(254) DEFAULT NULL, code_postale VARCHAR(254) DEFAULT NULL, etat VARCHAR(254) DEFAULT NULL, pays VARCHAR(254) DEFAULT NULL, affiliation VARCHAR(254) DEFAULT NULL, institution VARCHAR(254) DEFAULT NULL, departement VARCHAR(254) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE publication (id INT AUTO_INCREMENT NOT NULL, uti_id INT DEFAULT NULL, fic_id INT DEFAULT NULL, art_id INT DEFAULT NULL, numjournal_id INT DEFAULT NULL, datePub DATETIME DEFAULT NULL, commentaires VARCHAR(254) DEFAULT NULL, article VARCHAR(254) DEFAULT NULL, etat VARCHAR(254) DEFAULT NULL, INDEX IDX_AF3C677978CC5DC3 (numjournal_id), INDEX FK_fichier_publie (fic_id), INDEX FK_publication_article (art_id), INDEX FK_utilisateur_publier (uti_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE review (id INT AUTO_INCREMENT NOT NULL, rev_id INT DEFAULT NULL, art_id INT DEFAULT NULL, titre VARCHAR(254) DEFAULT NULL, content VARCHAR(254) DEFAULT NULL, appreciation VARCHAR(254) DEFAULT NULL, date_commentaire INT DEFAULT NULL, statut VARCHAR(254) DEFAULT NULL, INDEX FK_commentaire_article (Art_id), INDEX FK_commenter (rev_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reviewer (id INT AUTO_INCREMENT NOT NULL, pers_id INT DEFAULT NULL, INDEX FK_reviewer_peut_etre_personne (pers_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE review_request (id INT AUTO_INCREMENT NOT NULL, art_id INT DEFAULT NULL, rev_id INT DEFAULT NULL, accepted TINYINT(1) DEFAULT NULL, status VARCHAR(255) DEFAULT NULL, comment VARCHAR(255) DEFAULT NULL, INDEX FK_review_request_reviewer (rev_id), INDEX FK_review_request_article (art_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE role (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(254) NOT NULL, libelle VARCHAR(254) DEFAULT NULL, description VARCHAR(254) DEFAULT NULL, UNIQUE INDEX UNIQ_57698A6A77153098 (code), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE type_article (id INT AUTO_INCREMENT NOT NULL, libelle VARCHAR(254) DEFAULT NULL, description VARCHAR(254) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE typefichier (id INT AUTO_INCREMENT NOT NULL, intitule VARCHAR(254) DEFAULT NULL, inclure TINYINT(1) DEFAULT NULL, rang INT DEFAULT NULL, obligatoire TINYINT(1) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE utilisateur (id INT AUTO_INCREMENT NOT NULL, per_id INT DEFAULT NULL, username VARCHAR(254) NOT NULL, mot_de_passe VARCHAR(254) NOT NULL, salt VARCHAR(254) DEFAULT NULL, active TINYINT(1) DEFAULT NULL, UNIQUE INDEX UNIQ_1D1C63B3F85E0677 (username), INDEX FK_Generalisation_5 (per_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE avoir_role (uti_id INT NOT NULL, rol_id INT NOT NULL, INDEX IDX_C377A7E03951DF75 (uti_id), INDEX IDX_C377A7E04BAB96C (rol_id), PRIMARY KEY(uti_id, rol_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE article ADD CONSTRAINT FK_23A0E668C25E51A FOREIGN KEY (art_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE article ADD CONSTRAINT FK_23A0E66278CD074 FOREIGN KEY (typ_id) REFERENCES type_article (id)');
        $this->addSql('ALTER TABLE article ADD CONSTRAINT FK_23A0E663951DF75 FOREIGN KEY (uti_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE article ADD CONSTRAINT FK_23A0E666995AC4C FOREIGN KEY (editor_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE review_manuscript ADD CONSTRAINT FK_2D69D8C08C25E51A FOREIGN KEY (art_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE review_manuscript ADD CONSTRAINT FK_2D69D8C070574616 FOREIGN KEY (reviewer_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE avoir_categorie ADD CONSTRAINT FK_E3E6C8808C25E51A FOREIGN KEY (art_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE avoir_categorie ADD CONSTRAINT FK_E3E6C880E6ADA943 FOREIGN KEY (cat_id) REFERENCES categorie (id)');
        $this->addSql('ALTER TABLE article_reviewer ADD CONSTRAINT FK_B5AFD35BE1315440 FOREIGN KEY (opposed_art_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE article_reviewer ADD CONSTRAINT FK_B5AFD35B37E26C33 FOREIGN KEY (suggested_art_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE article_reviewer ADD CONSTRAINT FK_B5AFD35B71AE1636 FOREIGN KEY (rev_id) REFERENCES reviewer (id)');
        $this->addSql('ALTER TABLE auteur ADD CONSTRAINT FK_55AB1404AA53143 FOREIGN KEY (pers_id) REFERENCES personne (id)');
        $this->addSql('ALTER TABLE coauteur ADD CONSTRAINT FK_F22054DE8C25E51A FOREIGN KEY (art_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE coauteur ADD CONSTRAINT FK_F22054DE3E05390A FOREIGN KEY (aut_id) REFERENCES auteur (id)');
        $this->addSql('ALTER TABLE fichier ADD CONSTRAINT FK_9B76551F8C25E51A FOREIGN KEY (art_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE fichier ADD CONSTRAINT FK_9B76551F278CD074 FOREIGN KEY (typ_id) REFERENCES typefichier (id)');
        $this->addSql('ALTER TABLE fichier ADD CONSTRAINT FK_9B76551F71AE1636 FOREIGN KEY (rev_id) REFERENCES review (id)');
        $this->addSql('ALTER TABLE funding ADD CONSTRAINT FK_D30DD1D68C25E51A FOREIGN KEY (art_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE numero_journal ADD CONSTRAINT FK_7F3F9EC6995AC4C FOREIGN KEY (editor_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE publication ADD CONSTRAINT FK_AF3C67793951DF75 FOREIGN KEY (uti_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE publication ADD CONSTRAINT FK_AF3C67794BDE1C17 FOREIGN KEY (fic_id) REFERENCES fichier (id)');
        $this->addSql('ALTER TABLE publication ADD CONSTRAINT FK_AF3C67798C25E51A FOREIGN KEY (art_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE publication ADD CONSTRAINT FK_AF3C677978CC5DC3 FOREIGN KEY (numjournal_id) REFERENCES numero_journal (id)');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C671AE1636 FOREIGN KEY (rev_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C68C25E51A FOREIGN KEY (art_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE reviewer ADD CONSTRAINT FK_E04727304AA53143 FOREIGN KEY (pers_id) REFERENCES personne (id)');
        $this->addSql('ALTER TABLE review_request ADD CONSTRAINT FK_A0793B688C25E51A FOREIGN KEY (art_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE review_request ADD CONSTRAINT FK_A0793B6871AE1636 FOREIGN KEY (rev_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE utilisateur ADD CONSTRAINT FK_1D1C63B3B304206A FOREIGN KEY (per_id) REFERENCES personne (id)');
        $this->addSql('ALTER TABLE avoir_role ADD CONSTRAINT FK_C377A7E03951DF75 FOREIGN KEY (uti_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE avoir_role ADD CONSTRAINT FK_C377A7E04BAB96C FOREIGN KEY (rol_id) REFERENCES role (id)');


        $this->addSql('INSERT INTO `personne` (`id`, `titre`, `nom`, `prenom`, `email`, `telephone`, `adresse`, `ville`, `code_postale`, `etat`, `pays`, `affiliation`, `institution`, `departement`) VALUES(1, \'Prof.\', \'Kuete\', \'Victor\', \'admin@gmail.com\', \'+237677354920\', \'qsvqvaz\', NULL, NULL, NULL, \'AF\', \'Affiliation\', \'Institution\', \'Department\')');
        $this->addSql('INSERT INTO `utilisateur` (`per_id`, `id`, `username`, `mot_de_passe`, `salt`, `active`) VALUES (1, 1, \'admin\', \'d033e22ae348aeb5660fc2140aec35850c4da997\', NULL, 1)');
        $this->addSql('INSERT INTO `role` (`id`, `libelle`, `description`, `code`) VALUES(1, \'Author\', \'Author\', \'ROLE_JS_AUTHOR\'),(2, \'Editor\', \'Editor\', \'ROLE_JS_EDITOR\'),(3, \'Administrator\', \'Administrator\', \'ROLE_JS_SUPER_ADMIN\'),(4, \'Reviewer\', \'Reviewer\', \'ROLE_JS_REVIEWER\'),(5, \'Public User\', \'Public User\', \'ROLE_JS_PUBLIC\'),(6, \'Publisher\', \'Publisher\', \'ROLE_JS_PUBLISHER\'),(7, \'Main Editor\', \'Main Editor\', \'ROLE_JS_MAIN_EDITOR\')');
        $this->addSql("INSERT INTO `avoir_role` (`rol_id`, `uti_id`) VALUES(1, 1),(2, 1),(3, 1),(4, 1),(6, 1),(7, 1)");
        $this->addSql("INSERT INTO `categorie` (`id`, `intitule`, `description`) VALUES(1, 'Sciences et techniqueS', 'Description'),(2, 'Geographie', 'Description geographie'),(3, 'Histoire', NULL),(4, 'Langues vivantes', NULL),(5, 'Chimie organique', NULL),(6, 'Pharmacologie', NULL),(7, 'Biologie végétale', NULL),(8, 'Biologie animale', NULL)");
        $this->addSql("INSERT INTO `typefichier` (`id`, `intitule`, `inclure`, `rang`, `obligatoire`) VALUES(1, 'Abstract', 1, 1, 1),(2, 'Manuscrit', 1, 2, 1),(3, 'Table of content', 1, 3, 1),(4, 'References', 1, 4, 0),(5, 'Test add attachement', 1, 1, 1),(6, 'Test add attachement edited', 1, 1, 1)");
        $this->addSql("INSERT INTO `type_article` (`id`, `libelle`, `description`) VALUES(1, 'Article de recherche', 'Description'),(2, 'Rapport de stage', NULL),(3, 'Recherche clinique', 'Recherche clinique')");

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE article DROP FOREIGN KEY FK_23A0E668C25E51A');
        $this->addSql('ALTER TABLE review_manuscript DROP FOREIGN KEY FK_2D69D8C08C25E51A');
        $this->addSql('ALTER TABLE avoir_categorie DROP FOREIGN KEY FK_E3E6C8808C25E51A');
        $this->addSql('ALTER TABLE article_reviewer DROP FOREIGN KEY FK_B5AFD35BE1315440');
        $this->addSql('ALTER TABLE article_reviewer DROP FOREIGN KEY FK_B5AFD35B37E26C33');
        $this->addSql('ALTER TABLE coauteur DROP FOREIGN KEY FK_F22054DE8C25E51A');
        $this->addSql('ALTER TABLE fichier DROP FOREIGN KEY FK_9B76551F8C25E51A');
        $this->addSql('ALTER TABLE funding DROP FOREIGN KEY FK_D30DD1D68C25E51A');
        $this->addSql('ALTER TABLE publication DROP FOREIGN KEY FK_AF3C67798C25E51A');
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C68C25E51A');
        $this->addSql('ALTER TABLE review_request DROP FOREIGN KEY FK_A0793B688C25E51A');
        $this->addSql('ALTER TABLE coauteur DROP FOREIGN KEY FK_F22054DE3E05390A');
        $this->addSql('ALTER TABLE avoir_categorie DROP FOREIGN KEY FK_E3E6C880E6ADA943');
        $this->addSql('ALTER TABLE publication DROP FOREIGN KEY FK_AF3C67794BDE1C17');
        $this->addSql('ALTER TABLE publication DROP FOREIGN KEY FK_AF3C677978CC5DC3');
        $this->addSql('ALTER TABLE auteur DROP FOREIGN KEY FK_55AB1404AA53143');
        $this->addSql('ALTER TABLE reviewer DROP FOREIGN KEY FK_E04727304AA53143');
        $this->addSql('ALTER TABLE utilisateur DROP FOREIGN KEY FK_1D1C63B3B304206A');
        $this->addSql('ALTER TABLE fichier DROP FOREIGN KEY FK_9B76551F71AE1636');
        $this->addSql('ALTER TABLE article_reviewer DROP FOREIGN KEY FK_B5AFD35B71AE1636');
        $this->addSql('ALTER TABLE avoir_role DROP FOREIGN KEY FK_C377A7E04BAB96C');
        $this->addSql('ALTER TABLE article DROP FOREIGN KEY FK_23A0E66278CD074');
        $this->addSql('ALTER TABLE fichier DROP FOREIGN KEY FK_9B76551F278CD074');
        $this->addSql('ALTER TABLE article DROP FOREIGN KEY FK_23A0E663951DF75');
        $this->addSql('ALTER TABLE article DROP FOREIGN KEY FK_23A0E666995AC4C');
        $this->addSql('ALTER TABLE review_manuscript DROP FOREIGN KEY FK_2D69D8C070574616');
        $this->addSql('ALTER TABLE numero_journal DROP FOREIGN KEY FK_7F3F9EC6995AC4C');
        $this->addSql('ALTER TABLE publication DROP FOREIGN KEY FK_AF3C67793951DF75');
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C671AE1636');
        $this->addSql('ALTER TABLE review_request DROP FOREIGN KEY FK_A0793B6871AE1636');
        $this->addSql('ALTER TABLE avoir_role DROP FOREIGN KEY FK_C377A7E03951DF75');
        $this->addSql('DROP TABLE article');
        $this->addSql('DROP TABLE review_manuscript');
        $this->addSql('DROP TABLE avoir_categorie');
        $this->addSql('DROP TABLE article_reviewer');
        $this->addSql('DROP TABLE auteur');
        $this->addSql('DROP TABLE categorie');
        $this->addSql('DROP TABLE coauteur');
        $this->addSql('DROP TABLE fichier');
        $this->addSql('DROP TABLE funding');
        $this->addSql('DROP TABLE numero_journal');
        $this->addSql('DROP TABLE personne');
        $this->addSql('DROP TABLE publication');
        $this->addSql('DROP TABLE review');
        $this->addSql('DROP TABLE reviewer');
        $this->addSql('DROP TABLE review_request');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE type_article');
        $this->addSql('DROP TABLE typefichier');
        $this->addSql('DROP TABLE utilisateur');
        $this->addSql('DROP TABLE avoir_role');
    }
}
