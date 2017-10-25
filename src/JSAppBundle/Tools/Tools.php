<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace JSAppBundle\Tools;

/**
 * Description of Tools
 *
 * @author magloire
 */
class Tools {

    public static function random($car) {
        $string = "";
        $chaine = "abcdefghijklmnpqrstuvwxyz";
        srand((double) microtime() * 1000000);
        for ($i = 0; $i < $car; $i++) {
            $string .= $chaine[rand() % strlen($chaine)];
        }
        return $string;
    }

    /**
     * Génère un code numérique aléatoire avec un nombre de caractère fixé
     * @param $car
     * @return string
     */
    public static function randomNumber($car) {
        $string = "";
        $chaine = "9854763210";
        srand((double) microtime() * 1000000);
        for ($i = 0; $i < $car; $i++) {
            $string .= $chaine[rand() % strlen($chaine)];
        }
        return $string;
    }

    public static function randomUpperLower($car) {
        $string = "";
        $chaine = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        srand((double) microtime() * 1000000);
        for ($i = 0; $i < $car; $i++) {
            $string .= $chaine[rand() % strlen($chaine)];
        }
        return $string;
    }

    public static function randomWithSpecialCar($car) {
        $string = "";
        $chaine = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ&%$#@§/?.*+-";
        srand((double) microtime() * 1000000);
        for ($i = 0; $i < $car; $i++) {
            $string .= $chaine[rand() % strlen($chaine)];
        }
        return $string;
    }

    public static function randomWithNumbers($car) {
        $string = "";
        $chaine = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        srand((double) microtime() * 1000000);
        for ($i = 0; $i < $car; $i++) {
            $string .= $chaine[rand() % strlen($chaine)];
        }
        return $string;
    }

    public static function is_DateTime($date) {
        $reflexObj = new \ReflectionObject($date);
        return $className = $reflexObj->getName() == "DateTime";
    }


    /**
     * Retourne le chemin absolu pour l'acè à un fichier
     * @param string $path
     * @return string
     */
    public static function getAbsolutePath($path) {
        return null === $path ? null : static::getUploadRootDir() . '/' . $path;
    }

    public static function getWebPath($path) {
        return null === $path ? null : static::getUploadWebDir() . '/' . $path;
    }

    public static function getUploadRootDir() {
// le chemin absolu du répertoire où les documents uploadés doivent êtresauvegardé
        return __DIR__ . DIRECTORY_SEPARATOR . '..' .
                DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' .
                DIRECTORY_SEPARATOR . 'web' . DIRECTORY_SEPARATOR . static::getUploadDir();
    }

    public static function getWebRootDir() {
// le chemin absolu du répertoire où les documents uploadés doivent êtresauvegardé
        return __DIR__ . DIRECTORY_SEPARATOR . '..' .
        DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' .
        DIRECTORY_SEPARATOR . 'web';
    }

    public static function getAllTemplateFiles($baseUrl, $appDir=null ) {
// le chemin absolu du répertoire où les documents uploadés doivent êtresauvegardé
        $res=array();

        $dirArray=array();
        if(!isset($appDir)){
            $appDir= __DIR__ . DIRECTORY_SEPARATOR . '..' .
                DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' .
                DIRECTORY_SEPARATOR . 'web' . DIRECTORY_SEPARATOR . 'bundles/u2gaxtincalerating';

            $xfrDir= __DIR__ . DIRECTORY_SEPARATOR . '..' .
                DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' .
                DIRECTORY_SEPARATOR . 'web' . DIRECTORY_SEPARATOR . 'resources/vendor/xfr/src';

            $dirArray[]=$appDir;
            $dirArray[]=$xfrDir;
        }
        else{
            $dirArray[]=$appDir;
        }

        foreach ($dirArray as $dir) {
            $webRootDir=self::getWebRootDir();
            $files = glob($dir . DIRECTORY_SEPARATOR . "*");
            if($files && count($files)>0){
                foreach ($files as $file) {

                    if(is_dir($file)){
                        $subFiles=self::getAllTemplateFiles($baseUrl, $file);
                        $res=array_merge($res, $subFiles);
                    }
                    else if(is_file($file)){

                        if(fnmatch("*.tpl", $file)){

                            $relativePath=substr($file, strlen($webRootDir));
                            $relativePath=str_replace(DIRECTORY_SEPARATOR, "/", $relativePath);

                            $relativePath=$baseUrl."".$relativePath;
                            $content=file_get_contents($file);

                            $res[$relativePath]=json_encode($content) ;
                            $res[$relativePath]=$content ;

//                        $content = preg_replace('/\s+/', '', $content);
//                        echo $content;

                        }

                    }

                }
            }
        }



//        var_dump($res) ;
        return $res;

    }

    public static function getUploadDir() {
// on se débarrasse de « __DIR__ » afin de ne pas avoir de problème lorsqu'onaffiche
// le document/image dans la vue.
        return 'uploads' . DIRECTORY_SEPARATOR . 'images';
    }

    public static function getUploadWebDir() {
// on se débarrasse de « __DIR__ » afin de ne pas avoir de problème lorsqu'onaffiche
// le document/image dans la vue.
        return 'uploads/images';
    }

    public static function deleteFiles($directory) {

        $files = glob($directory . DIRECTORY_SEPARATOR . "*.*");
        if($files && count($files)>0){
            foreach ($files as $file) {
                //echo $file;
                unlink($file);
            }
        }
        return true;
    }

    public static function countFileInDir($path) {
        $files = glob($path . DIRECTORY_SEPARATOR . "*.*");
        $compteur=0;
        if($files){
            $compteur = count($files);
        }
        /* Variable $compteur pour compter (count) les fichiers lister ($files) dans le dossier */
        return $compteur;
    }

    public static function createDir($rootDir, $classDir, $objectDir) {

        $classDir = $rootDir . DIRECTORY_SEPARATOR . $classDir;
        if (!file_exists($classDir)) {
            $created = mkdir($classDir);
            if (!$created) {
                throw new \Exception("Unable to create the file directory " . $classDir);
            } else {
                $objectDir = $classDir . DIRECTORY_SEPARATOR . $objectDir;
                $created = mkdir($objectDir);
                if (!$created) {
                    throw new \Exception("Unable to create the file directory " . $objectDir);
                }
            }
        } else {
            $objectDir = $classDir . DIRECTORY_SEPARATOR . $objectDir;
            if (!file_exists($objectDir)) {
                $created = mkdir($objectDir);
                if (!$created) {
                    throw new \Exception("Unable to create the file directory " . $objectDir);
                }
            }
        }
        return $objectDir;
    }

    public static function getFilesWebPath($objectDir, $absolutPath) {
        $files = glob($absolutPath . DIRECTORY_SEPARATOR . "*.*");
        $webDir = static::getWebPath($objectDir);
        $toreturn = array();
        foreach ($files as $file) {
            $parts = explode(DIRECTORY_SEPARATOR, $file);
            $fileName = $parts[count($parts) - 1];
            $toreturn[] = $webDir . DIRECTORY_SEPARATOR . $fileName;
        }
        return $toreturn;
    }


    public static function randomDate($max, $min) {
        $date = new \DateTime();
        return $date->setTimestamp(mt_rand(strtotime($min), strtotime($max)));
    }

}
