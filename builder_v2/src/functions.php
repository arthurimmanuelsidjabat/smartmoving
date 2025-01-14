<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
$composer_autoload = __DIR__ . '/../vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if ( ! class_exists( 'Timber' ) ) {

	add_action(
		'admin_notices',
		function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function( $template ) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;

/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_theme_support( 'post-formats', array( 'aside', 'chat', 'gallery', 'image', 'link', 'quote', 'status', 'video', 'audio','post-thumbnails' ) );
		add_theme_support( 'title-tag' );
		add_theme_support('menus');
		add_theme_support( 'post-thumbnails' ); 
		add_theme_support('widgets');
		add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'editor-styles'));
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter('timber_context', array($this, 'add_to_context'));
		add_filter('timber_context',  array($this, 'global_info'));
		add_filter('timber_context',  array($this, 'areas'));
		add_action('init', array($this, 'register_post_types'));
		add_action('init', array($this, 'register_taxonomies'));
		add_filter('screen_options_show_screen', '__return_true');
		parent::__construct();
	}
	
	/** This is where you can register custom post types. */
	public function register_post_types() {
	}
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {
	}
	function areas( $context ) {
		$context['areas'] = get_posts('areas');
		return $context;
	}
	function global_info( $context ) {
		$context['global'] = get_fields('option');
		$context['topbar'] = get_fields('option');
		$context['header'] = get_fields('option');
		$context['footer'] = get_fields('option');
		return $context;
	}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$context['primary'] = get_field('global.color_scheme.colors[0].color.color_value');
		//adding global option page
		$context['global'] = get_field('global', 'options'); //adding global option page
		$context['topbar'] = get_field('topbar', 'options'); //adding topbar option page
		$context['header'] = get_field('header', 'options'); //adding header option page
		$context['company_info'] = get_field('company_info', 'options'); //adding company info option page
		$context['footer'] = get_field('footer', 'options'); //adding footer option page
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::context();';
		$context['menu']  = new Timber\Menu('Main menu');
		$context['site']  = $this;
		return $context;
	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );
		$twig->addFilter( new Twig\TwigFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		return $twig;
	}
}

new StarterSite();

// WP HEAD CLEANOUT
//Remove RSD Link
remove_action( 'wp_head', 'rsd_link' );
//Remove generator
remove_action( 'wp_head', 'wp_generator' );
//Remove REST API link tag
remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
//Remove oEmbed links
remove_action( 'wp_head', 'wp_oembed_add_discovery_links', 10 );
//Remove REST API in HTTP Headers
remove_action( 'template_redirect', 'rest_output_link_header', 11, 0 );
//Remove WLW Manifest
remove_action( 'wp_head', 'wlwmanifest_link' );
//Remove shortlink
remove_action( 'wp_head', 'wp_shortlink_wp_head');
add_filter('emoji_svg_url', '__return_false');
function disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );	
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );	
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );	
	// Remove from TinyMCE
	add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
}
add_action( 'init', 'disable_emojis' );

/**
 * Filter out the tinymce emoji plugin.
 */
function disable_emojis_tinymce( $plugins ) {
	if ( is_array( $plugins ) ) {
		return array_diff( $plugins, array( 'wpemoji' ) );
	} else {
		return array();
	}
}

// Allow SVG
function enable_svg_upload( $upload_mimes ) {
    $upload_mimes['svg'] = 'image/svg+xml';
    $upload_mimes['svgz'] = 'image/svg+xml';
    return $upload_mimes;
}
add_filter( 'upload_mimes', 'enable_svg_upload', 10, 1 );
// Adding Screen Option to Admin Dashboard
add_filter('set-screen-option', 'myFilterScreenOption', 11, 3);
function myFilterScreenOption($keep, $option, $value) {
    if ($option === 'myitem_per_page') {
        if ($value < 0) {
            $value = 0;
        } elseif ($value > 100) {
            $value = 100;
        }
    }
    return $value;
}

// GLOBAL ACF SETTINGS
//adding acf funtions for Company info settings
if (function_exists('acf_add_options_page')) {
	acf_add_options_page(array(
		'page_title' => 'Global',
		'menu_title' => 'Global settings',
		'menu_slug' => 'global-settings',
		'icon_url' => 'dashicons-admin-generic',
		'capability' => 'edit_posts',
		'redirect' => false
	));
			acf_add_options_sub_page(array(
				'page_title' => 'Topbar',
				'menu_title' => 'Topbar',
				'menu_slug' => 'topbar-settings',
				'icon_url' => 'dashicons-table-row-before',
				'capability' => 'edit_posts',
				'parent_slug'   => 'global-settings',
				'redirect' => false
			));
			acf_add_options_sub_page(array(
				'page_title' => 'Header',
				'menu_title' => 'Header',
				'menu_slug' => 'header-settings',
				'icon_url' => 'dashicons-menu',
				'capability' => 'edit_posts',
				'parent_slug'   => 'global-settings',
				'redirect' => false
			));
			acf_add_options_sub_page(array(
				'page_title' => 'Footer',
				'menu_title' => 'Footer',
				'menu_slug' => 'footer-settings',
				'icon_url' => 'dashicons-layout',
				'capability' => 'edit_posts',
				'parent_slug'   => 'global-settings',
				'redirect' => false
			));
}


// RESET ACF WYSYWIG P TAG INSERTING
function acf_wysiwyg_remove_wpautop() {
	// remove p tags //
	remove_filter ('the_content', 'wpautop');
remove_filter('the_content', 'wptexturize');
	// add line breaks before all newlines //
  }
  add_action('acf/init', 'acf_wysiwyg_remove_wpautop');
  
// Disable WP Compression
add_filter('jpeg_quality', function($arg){return 100;});


// CUSTOM SCRIPTS
function theme_custom_scripts() {
	wp_enqueue_script( 'main-scripts', get_template_directory_uri() . '/js/bundle.js', array('jquery'), '1.1.2', true);
	}
	add_action('wp_enqueue_scripts', 'theme_custom_scripts'); 

	
// Custom Login
function my_login_stylesheet() {
    wp_enqueue_style( 'custom-login', get_stylesheet_directory_uri() . '/css/bundle.css' );
}
add_action( 'login_enqueue_scripts', 'my_login_stylesheet' );

// Custom Login Logo Link
add_filter( 'login_headerurl', 'codecanal_loginlogo_url' ); 
function codecanal_loginlogo_url($url) 
{
  return home_url(); 
  /* User will be redirected to the site home page */
} 
/**
 * Registers support for editor styles & Enqueue it.
 */
function enqueuing_editor_styling(){
    wp_enqueue_style('gutenberg-styles', get_template_directory_uri().'/css/bundle.css'); 
}
add_action( 'enqueue_block_assets', 'enqueuing_editor_styling' );


/**
 *  This is the callback that displays the block.
 *
 * @param   array  $block      The block settings and attributes.
 * @param   string $content    The block content (emtpy string).
 * @param   bool   $is_preview True during AJAX preview.
 */
// blocks render
function firebase_blocks( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'firebase-blocks',
				'title' => __( 'Firebase Blocks' ),
			),
		)
	);
}

add_filter( 'block_categories_all', 'firebase_blocks', 10, 2);
function block_acf_init()
{
    $blocks = require(__DIR__.'/blocks.php');
    foreach($blocks as $block) {
        acf_register_block($block);
    }
}

add_action( 'acf/init', 'block_acf_init' );
function my_acf_block_render_callback( $block, $innerblock, $content = '', $is_preview = false ) {
    $context = Timber::context();
    // Store block values.
    $context['block'] = $block;
    // Store field values.
    $context['fields'] = get_fields();
    // Store $is_preview value.
    $context['is_preview'] = $is_preview;
    // Render the block.
    Timber::render( 'templates/blocks/' . str_replace(' ', '_', strtolower($block['title']))  . '.twig', $context );
}



// Erase Comment Menu
add_action( 'admin_init', 'my_remove_admin_menus' );
function my_remove_admin_menus() {
    remove_menu_page( 'edit-comments.php' );
}

// register custom thumbnail size
add_image_size( 'image-480', 480, 9999 );
add_image_size( 'image-640', 640, 9999 );
add_image_size( 'image-720', 720, 9999 );
add_image_size( 'image-960', 960, 9999 );
add_image_size( 'image-1168', 1168, 9999 );
add_image_size( 'image-1440', 1440, 9999 );
add_image_size( 'image-1920', 1920, 9999 );

// add custom thumbnail sizes to image sizes array to use in page builders
function my_custom_sizes( $sizes ) {
	return array_merge( $sizes, array(
		'image-480' => 'image-480',
		'image-640' => 'image-640',
		'image-720' => 'image-720',
		'image-960' => 'image-960',
		'image-1168' => 'image-1168',
		'image-1440' => 'image-1440',
		'image-1920' => 'image-1920',
	) );
}
add_filter( 'image_size_names_choose', 'my_custom_sizes' );

// Dashboard Menu Horizontal Separators Locations
add_action( 'admin_menu', 'set_admin_menu_separator' );
function set_admin_menu_separator() {
$position = 25;
global $menu;
$menu[$position] = array(
0   =>  '',
1   =>  'read',
2   =>  'separator' . $position,
3   =>  '',
4   =>  'wp-menu-separator'
);
}

// Defer js scripts
function defer_parsing_of_js( $url ) {
    if ( is_user_logged_in() ) return $url; //don't break WP Admin
    if ( FALSE === strpos( $url, '.js' ) ) return $url;
    if ( strpos( $url, 'jquery.js' ) ) return $url;
    return str_replace( ' src', ' defer src', $url );
}
add_filter( 'script_loader_tag', 'defer_parsing_of_js', 10 );