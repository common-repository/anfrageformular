<?php

define('AF2_FORMULAR_SLUG', 'af2_formulare');
define('AF2_FORMULAR_POST_TYPE', 'af2_formular');
define('AF2_FORMULAR_PATH', 'admin/menus/60_Formular');

/**
 * The Structures
 */
class AF2_Formular {

    private $submenu_data; //Data for constructing the submenu
    private $cpt_labels;    //Labels for the Custom-Post-Type
    private $cpt_args;      //Arguments of the Custom-Post-Types

    /**
     * Dashboard constructor.
     * -> Filling the submenu_data
     */

    public function __construct() {
        require_once AF2_MENU_TOOLS_PATH;

        $this->submenu_data = array(AF2_MAIN_MENU_SLUG, 'Formulare', 'Formulare', 'manage_options', AF2_FORMULAR_SLUG);

        $this->cpt_labels = array('name' => __('Formulare', 'Post type general name', 'textdomain'),
            'singular_name' => __('Formular', 'Post type singular name', 'textdomain'));

        $this->cpt_args = array('label' => 'Formulare',
            'labels' => $this->cpt_labels,
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => AF2_FRAGE_SLUG,
            'has_archive' => true);
    }

    /**
     * @return array -> submenu_data
     */
    public function get_submenu_data() {
        return $this->submenu_data;
    }

    /**
     * @return array ->cpt data
     */
    public function get_cpt_data() {
        return $this->cpt_args;
    }

    /**
     * @return string -> Slug for the cpt
     */
    public function get_slug() {
        return AF2_FORMULAR_POST_TYPE;
    }

    /**
     * Content of the Adminpage
     */
    public function get_content() {
        wp_enqueue_style('bootstrap_min');
        wp_enqueue_style('font-awesome_min');
        wp_enqueue_style('materialize.min');
        wp_enqueue_style('m-style.min');
        wp_enqueue_style('materialize-custom');
        wp_enqueue_style('af2_iframe_modal');

        wp_enqueue_script('materialize');
        wp_enqueue_script('cpt_script');
        wp_enqueue_script('af2_modals');
        wp_enqueue_script('af2_branding');

        af2_delete_drafts(AF2_FORMULAR_POST_TYPE);

        echo af2_get_data_div(array('page:' . AF2_FORMULAR_SLUG, 'builder:' . AF2_FORMULARBUILDER_SLUG));

        $table_content = af2_get_cpt_table_content_dependency(AF2_FORMULAR_POST_TYPE);
        $table = af2_get_cpt_table('Formulartitel', 'Interner WordPress Shortcode', $table_content);

        echo af2_get_cpt_content('Formulare', $table);
    }

}