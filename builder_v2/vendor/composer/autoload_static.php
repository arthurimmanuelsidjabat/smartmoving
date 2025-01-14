<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitf27574dfb5c3ea4dbf90108da099ffc1
{
    public static $files = array (
        '320cde22f66dd4f5d3fd621d3e88b98f' => __DIR__ . '/..' . '/symfony/polyfill-ctype/bootstrap.php',
        '0e6d7bf4a5811bfa5cf40c5ccd6fae6a' => __DIR__ . '/..' . '/symfony/polyfill-mbstring/bootstrap.php',
    );

    public static $prefixLengthsPsr4 = array (
        'T' => 
        array (
            'Twig\\CacheExtension\\' => 20,
            'Twig\\' => 5,
            'Timber\\' => 7,
        ),
        'S' => 
        array (
            'Symfony\\Polyfill\\Mbstring\\' => 26,
            'Symfony\\Polyfill\\Ctype\\' => 23,
        ),
        'C' => 
        array (
            'Composer\\Installers\\' => 20,
        ),
        'A' => 
        array (
            'Arthur\\BuilderV2Main\\' => 21,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Twig\\CacheExtension\\' => 
        array (
            0 => __DIR__ . '/..' . '/twig/cache-extension/lib',
        ),
        'Twig\\' => 
        array (
            0 => __DIR__ . '/..' . '/twig/twig/src',
        ),
        'Timber\\' => 
        array (
            0 => __DIR__ . '/..' . '/timber/timber/lib',
        ),
        'Symfony\\Polyfill\\Mbstring\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-mbstring',
        ),
        'Symfony\\Polyfill\\Ctype\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-ctype',
        ),
        'Composer\\Installers\\' => 
        array (
            0 => __DIR__ . '/..' . '/composer/installers/src/Composer/Installers',
        ),
        'Arthur\\BuilderV2Main\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'T' => 
        array (
            'Twig_' => 
            array (
                0 => __DIR__ . '/..' . '/twig/twig/lib',
            ),
        ),
        'R' => 
        array (
            'Routes' => 
            array (
                0 => __DIR__ . '/..' . '/upstatement/routes',
            ),
        ),
    );

    public static $classMap = array (
        'AltoRouter' => __DIR__ . '/..' . '/altorouter/altorouter/AltoRouter.php',
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitf27574dfb5c3ea4dbf90108da099ffc1::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitf27574dfb5c3ea4dbf90108da099ffc1::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInitf27574dfb5c3ea4dbf90108da099ffc1::$prefixesPsr0;
            $loader->classMap = ComposerStaticInitf27574dfb5c3ea4dbf90108da099ffc1::$classMap;

        }, null, ClassLoader::class);
    }
}
