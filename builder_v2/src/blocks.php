<?php
 // Register a new block.
      $banner = array(
        'name'            => 'banner',
        'title'           => __( 'Banner', 'firebase' ),
        'description'     => __( 'A custom banner.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'money',
        'keywords'        => array( 'banner' ),
      );
      $blog = array(
        'name'            => 'blog',
        'title'           => __( 'Blog', 'firebase' ),
        'description'     => __( 'Blog section.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'welcome-write-blog',
        'keywords'        => array( 'map' ),
      );
      $counter = array(
        'name'            => 'counter',
        'title'           => __( 'Counter', 'firebase' ),
        'description'     => __( 'Basic Counter Section.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'backup',
        'keywords'        => array( 'counter' ),
      );
      $cta = array(
        'name'            => 'cta',
        'title'           => __( 'Cta', 'firebase' ),
        'description'     => __( 'A custom call to action section.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'table-row-before',
        'keywords'        => array( 'Cta' ),
      );
      $faq = array(
        'name'            => 'faq',
        'title'           => __( 'Faq', 'firebase' ),
        'description'     => __( 'A custom faq section.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'editor-ul',
        'keywords'        => array( 'faq' ),
      );
      $html = array(
        'name'            => 'html',
        'title'           => __( 'Html', 'firebase' ),
        'description'     => __( 'Custom HTML section.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'html',
        'keywords'        => array( 'html code' ),
      );
      $iconboxaside = array(
        'name'            => 'iconboxaside',
        'title'           => __( 'Icon Box Aside', 'firebase' ),
        'description'     => __( 'A grid section with icon boxes.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'align-left',
        'keywords'        => array( 'icon box aside' ),
      );
      $iconbox = array(
        'name'            => 'iconbox',
        'title'           => __( 'Icon Box Grid', 'firebase' ),
        'description'     => __( 'A grid section with icon boxes.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'grid-view',
        'keywords'        => array( 'icon box' ),
      );
      $iconlist = array(
        'name'            => 'iconlist',
        'title'           => __( 'Icon List', 'firebase' ),
        'description'     => __( 'Icon List section.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'editor-ul',
        'keywords'        => array( 'icon list' ),
      );
      $imagebox = array(
        'name'            => 'imagebox',
        'title'           => __( 'Image Box Grid', 'firebase' ),
        'description'     => __( 'A grid section with icon boxes.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'format-image',
        'keywords'        => array( 'image box' ),
      );
      $imagegridtext = array(
        'name'            => 'imagegridtext',
        'title'           => __( 'Image Grid Text', 'firebase' ),
        'description'     => __( 'An icon grid section with text.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'editor-table',
        'keywords'        => array( 'image grid text' ),
      );
      $imageiconlist = array(
        'name'            => 'imageiconlist',
        'title'           => __( 'Image Icon List', 'firebase' ),
        'description'     => __( 'Icon List with Image section.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'table-col-before',
        'keywords'        => array( 'icon list' ),
      );
      $imageprogress = array(
        'name'            => 'imageprogress',
        'title'           => __( 'Image Progress Steps', 'firebase' ),
        'description'     => __( 'Image Progress Steps Section.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'backup',
        'keywords'        => array( 'progress' ),
      );
      $logos = array(
        'name'            => 'Logos',
        'title'           => __( 'Logos', 'firebase' ),
        'description'     => __( 'A custom logos section.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'podio',
        'keywords'        => array( 'logos' ),
      );
      $mainform = array(
        'name'            => 'mainform',
        'title'           => __( 'Mainform', 'firebase' ),
        'description'     => __( 'Main form custom section.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'email',
        'keywords'        => array( 'form' ),
      );
      $mapaside = array(
        'name'            => 'mapaside',
        'title'           => __( 'Map Aside', 'firebase' ),
        'description'     => __( 'Map with Content section.', 'rotatedigital.com' ),
        'render_callback' => 'my_acf_block_render_callback',
        'category'        => 'firebase-blocks',
        'icon'            => 'location-alt',
        'keywords'        => array( 'map' ),
    );
    $map = array(
      'name'            => 'map',
      'title'           => __( 'Map', 'firebase' ),
      'description'     => __( 'Map section.', 'rotatedigital.com' ),
      'render_callback' => 'my_acf_block_render_callback',
      'category'        => 'firebase-blocks',
      'icon'            => 'location',
      'keywords'        => array( 'map' ),
    );
    $progress = array(
      'name'            => 'progress',
      'title'           => __( 'Progress Steps', 'firebase' ),
      'description'     => __( 'Progress Steps Section.', 'rotatedigital.com' ),
      'render_callback' => 'my_acf_block_render_callback',
      'category'        => 'firebase-blocks',
      'icon'            => 'clock',
      'keywords'        => array( 'progress' ),
    );
    $sidebaraside = array(
      'name'            => 'sidebaraside',
      'title'           => __( 'Sidebaraside', 'firebase' ),
      'description'     => __( 'A custom section with sidebar.', 'rotatedigital.com' ),
      'render_callback' => 'my_acf_block_render_callback',
      'category'        => 'firebase-blocks',
      'icon'            => 'align-left',
      'keywords'        => array( 'sidebar aside' ),
    );
    $simplecontent = array(
      'name'            => 'simplecontent',
      'title'           => __( 'Simplecontent', 'firebase' ),
      'description'     => __( 'A custom simple content section.', 'rotatedigital.com' ),
      'render_callback' => 'my_acf_block_render_callback',
      'category'        => 'firebase-blocks',
      'icon'            => 'editor-alignleft', 
      'keywords'        => array( 'Simple Content' ),
    );
    $slider = array(
      'name'            => 'slider',
      'title'           => __( 'Slider', 'firebase' ),
      'description'     => __( 'A custom slider section.', 'rotatedigital.com' ),
      'render_callback' => 'my_acf_block_render_callback',
      'category'        => 'firebase-blocks',
      'icon'            => 'leftright',
      'keywords'        => array( 'slider' ),
    );
    $testimonials = array(
      'name'            => 'testomonials',
      'title'           => __( 'Testimonials Slider', 'firebase' ),
      'description'     => __( 'A custom testimonial section.', 'rotatedigital.com' ),
      'render_callback' => 'my_acf_block_render_callback',
      'category'        => 'firebase-blocks',
      'icon'            => 'list-view',
      'keywords'        => array( 'testimonials' ),
    );
    $textimage = array(
      'name'            => 'textimage',
      'title'           => __( 'Text with image', 'firebase' ),
      'description'     => __( 'A custom text with image.', 'rotatedigital.com' ),
    'render_callback' => 'my_acf_block_render_callback',
      'category'        => 'firebase-blocks',
      'icon'            => 'table-col-before',
      'keywords'        => array( 'text image' ),
    );
    $columntext = array(
      'name'            => 'columntext',
      'title'           => __( 'Two Column Text', 'firebase' ),
      'description'     => __( 'A text on two columns layouts.', 'rotatedigital.com' ),
    'render_callback' => 'my_acf_block_render_callback',
      'category'        => 'firebase-blocks',
      'icon'            => 'columns',
      'keywords'        => array( 'Column text' ),
    );
    $privacypolicy = array(
      'name'            => 'privacypolicy',
      'title'           => __( 'Privacy Policy', 'firebase' ),
      'description'     => __( 'A preformated Privacy policy block', 'rotatedigital.com' ),
    'render_callback' => 'my_acf_block_render_callback',
      'category'        => 'firebase-blocks',
      'icon'            => 'list-view',
      'keywords'        => array( 'Column text' ),
    );
    $terms = array(
      'name'            => 'terms',
      'title'           => __( 'Terms', 'firebase' ),
      'description'     => __( 'A preformated Terms block', 'rotatedigital.com' ),
    'render_callback' => 'my_acf_block_render_callback',
      'category'        => 'firebase-blocks',
      'icon'            => 'list-view',
      'keywords'        => array( 'Column text' ),
    );
    $customsitemap = array(
      'name'            => 'sitemap_custom',
      'title'           => __( 'Custom Sitemap', 'firebase' ),
      'description'     => __( 'A preformated Sitemap', 'rotatedigital.com' ),
    'render_callback' => 'my_acf_block_render_callback',
      'category'        => 'firebase-blocks',
      'icon'            => 'list-view',
      'keywords'        => array( 'Column text' ),
    );
    $accessibility = array(
      'name'            => 'accessibility',
      'title'           => __( 'Accessibility', 'firebase' ),
      'description'     => __( 'A preformated Accessibility Block', 'rotatedigital.com' ),
    'render_callback' => 'my_acf_block_render_callback',
      'category'        => 'firebase-blocks',
      'icon'            => 'list-view',
      'keywords'        => array( 'Column text' ),
    );
    $disclaimer = array(
      'name'            => 'disclaimer',
      'title'           => __( 'Disclaimer', 'firebase' ),
      'description'     => __( 'A preformated Disclaimer Block', 'rotatedigital.com' ),
    'render_callback' => 'my_acf_block_render_callback',
      'category'        => 'firebase-blocks',
      'icon'            => 'list-view',
      'keywords'        => array( 'Column text' ),
    );
    $video = array(
      'name'            => 'Video',
      'title'           => __( 'Video', 'firebase' ),
      'description'     => __( 'A custom video section.', 'rotatedigital.com' ),
      'render_callback' => 'my_acf_block_render_callback',
      'category'        => 'firebase-blocks',
      'icon'            => 'video-alt',
      'keywords'        => array( 'video' ),
    );

  
  $blocks = [
    $banner,
    $accessibility,
    $blog,
    $counter,
    $customsitemap,
    $cta,
    $disclaimer,
    $faq,
    $html,
    $iconboxaside,
    $iconbox,
    $iconlist,
    $imagebox,
    $imagegridtext,
    $imageiconlist,
    $imageprogress,
    $logos,
    $mainform,
    $mapaside,
    $map,
    $progress,
    $privacypolicy,
    $sidebaraside,
    $simplecontent,
    $slider,
    $terms,
    $testimonials,
    $textimage,
    $columntext,
    $video,
  ];
  return $blocks;