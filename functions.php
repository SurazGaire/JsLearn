<?php
    function university_files(){
        wp_enqueue_script( 'university_main_js', get_theme_file_uri('/build/index.js'),array('jquery'),'1.0',true);
        wp_enqueue_style( 'university_main_styles', get_theme_file_uri('/build/style-index.css'));
        wp_enqueue_style( 'university_extra_styles', get_theme_file_uri('/build/index.css'));
        wp_enqueue_style( 'font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
        wp_enqueue_style( 'google-font', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    }
    add_action( 'wp_enqueue_scripts','university_files');
function university_features(){
    add_theme_support( 'title-tag');
}

    add_action( 'after_setup_theme', 'university_features');

    //Page Slug Body Class
function add_slug_body_class( $classes ) {
	global $post;
	if ( isset( $post ) ) {
		$classes[] = $post->post_type . '-' . $post->post_name;
	}
	return $classes;
	}
add_filter( 'body_class', 'add_slug_body_class' );


// Research Post Type
function aaf_post_types() {
    register_post_type('research', array(
        'public' => true,
        'label' => array(
            'name' => 'Research',
            'add_new_item' => 'Add new Research',
            'edit_item' => 'Edit Research',
            'all_items' => 'All Researchs',
            'singular_name' => 'Research'
        ),
        'menu-icon' => 'dashicons-media-document'

    ));
}
add_action('init','aaf_post_types');
?>
