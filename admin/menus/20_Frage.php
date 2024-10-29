<?php

define('AF2_FRAGE_SLUG', 'af2_fragen');
define('AF2_FRAGE_POST_TYPE', 'af2_frage');
define('AF2_FRAGE_PATH', 'admin/menus/20_Frage');

/**
 * The Questions
 */
class AF2_Frage {

    private $submenu_data; //Data for constructing the submenu
    private $cpt_labels;    //Labels for the Custom-Post-Type
    private $cpt_args;      //Arguments of the Custom-Post-Types

    /**
     * Dashboard constructor.
     * -> Filling the submenu_data
     */

    public function __construct() {
        require_once AF2_MENU_TOOLS_PATH;

        $this->submenu_data = array(AF2_MAIN_MENU_SLUG, 'Fragen', 'Fragen', 'manage_options', AF2_FRAGE_SLUG);

        $this->cpt_labels = array('name' => __('Fragen', 'Post type general name', 'textdomain'),
            'singular_name' => __('Frage', 'Post type singular name', 'textdomain'));

        $this->cpt_args = array('label' => 'Fragen',
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
        return AF2_FRAGE_POST_TYPE;
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

        wp_enqueue_script('materialize');
        wp_enqueue_script('cpt_script');
        wp_enqueue_script('af2_branding');

        af2_delete_drafts(AF2_FRAGE_POST_TYPE);

        echo af2_get_data_div(array('page:' . AF2_FRAGE_SLUG, 'builder:' . AF2_FRAGENBUILDER_SLUG, 'slug:question'));

        $table_content = af2_get_cpt_table_content(AF2_FRAGE_POST_TYPE);
        $table = af2_get_cpt_table('Fragentitel', 'Typ', $table_content);

        echo af2_get_cpt_content('Fragen', $table);
    }
}