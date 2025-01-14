<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'database' );

/** Database username */
define( 'DB_USER', 'user' );

/** Database password */
define( 'DB_PASSWORD', 'password' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'e4):afD~-T&QIb YU@u6Q ZU|8/Hl{F:_-OH9NoXuCwiT)(w:|Vb_cO-%NJz,Yrf');
define('SECURE_AUTH_KEY',  'yO59-IVG2-Yw2vM(B6A3u9*%K6-uP?Q8:8#>FZkKg=nn1w9Vigc}7{RZ*jJ#-4BN');
define('LOGGED_IN_KEY',    '2SK-FWh@I~FO5~E5iD+uqzW9Po)C5|{1%gu_/#XCOKzIu3z>bHC-GgUjb?}hE2@4');
define('NONCE_KEY',        '|TA.h*?Xk,xo8p}:s6I-P|HW<5^_#Vb#_AE/|Rjy+6,j{C*+[?1$f?[B|^rqKar^');
define('AUTH_SALT',        '?&miHh?[1K0.&&7OD`J}XFs[ngZ<W=VQ r46lvH*2uHd-L=K(&jPF=0`*N:.qh]$');
define('SECURE_AUTH_SALT', 'QmX!@-@i |eK0.%jD{A[:>AHXZYyQ-(t wD,qf^5:|bRf2h7F*>=J|.&]NDjj<C+');
define('LOGGED_IN_SALT',   'tT2U%O*g#-Oo@DbXv!pMrByQ/+HWrd(1k}<iuHN]K@j!WT0zt<vO2}3=wE|=`<tm');
define('NONCE_SALT',       '&CK`cgcqF9rdK7-fwHqWI.08Uvix1>x#7eX3._hd!_NRc0lV:*V{A!Ml G}I`7(D');

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', true );
@ini_set('log_errors','on'); 
@ini_set('display_errors','on'); 
@ini_set('error_log','error.log');

/* Add any custom values between this line and the "stop editing" line. */

/** Disable Post Revisions */
define( 'WP_POST_REVISIONS', false );

/** Empty trash. */
define( 'EMPTY_TRASH_DAYS', 0 );

/** Disable Post Revision. */
define( 'AUTOSAVE_INTERVAL', 14400 );

/** Disable the Theme and Plugin Editors */
define( 'DISALLOW_FILE_EDIT', true );

/** FS Method */
define('FS_METHOD','direct');

/** Allow Repair */
define('WP_ALLOW_REPAIR', true);

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
