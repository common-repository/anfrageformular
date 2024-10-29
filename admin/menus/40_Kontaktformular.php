<?php

define( 'AF2_KONTAKTFORMULAR_SLUG', 'af2_kontaktformulare' );
define( 'AF2_KONTAKTFORMULAR_POST_TYPE', 'af2_kontaktformular' );
define( 'AF2_KONTAKTFORMULAR_PATH', 'admin/menus/40_kontaktformular' );

/**
 * The Contactforms
 */
class AF2_Kontaktformular {
    
    private $submenu_data; //Data for constructing the submenu
    private $cpt_labels;    //Labels for the Custom-Post-Type
    private $cpt_args;      //Arguments of the Custom-Post-Types

    /**
     * Dashboard constructor.
     * -> Filling the submenu_data
     */
	public function __construct()
	{
	    require_once AF2_MENU_TOOLS_PATH;

            $this->submenu_data = array(AF2_MAIN_MENU_SLUG, 'Kontaktformulare', 'Kontaktformulare', 'manage_options', AF2_KONTAKTFORMULAR_SLUG );

            $this->cpt_labels = array( 'name'                  => __( 'Kontaktformulare', 'Post type general name', 'textdomain' ),
                                   'singular_name'         => __( 'Kontaktformular', 'Post type singular name', 'textdomain' ) );

            $this->cpt_args = array( 'label'			  => 'Kontaktformulare',
                                 'labels'             => $this->cpt_labels,
                                 'public'             => true,
                                 'show_ui'            => true,
                                 'show_in_menu'       => AF2_FRAGE_SLUG,
                                 'has_archive'        => true );
	}


    /**
     * @return array -> submenu_data
     */
	public function get_submenu_data()
	{
		return $this->submenu_data;
	}

    /**
     * @return array ->cpt data
     */
    public function get_cpt_data()
    {
        return $this->cpt_args;
    }

    /**
     * @return string -> Slug for the cpt
     */
    public function get_slug()
    {
        return AF2_KONTAKTFORMULAR_POST_TYPE;
    }

    /**
     * Content of the Adminpage
     */
    public function get_content()
    {
        wp_enqueue_style( 'bootstrap_min' );
        wp_enqueue_style( 'font-awesome_min' );
        wp_enqueue_style( 'materialize.min' );
        wp_enqueue_style( 'm-style.min' );
        wp_enqueue_style( 'materialize-custom' );

        wp_enqueue_script( 'materialize' );
        wp_enqueue_script( 'cpt_script' );
        wp_enqueue_script( 'af2_branding' );

        af2_delete_drafts( AF2_KONTAKTFORMULAR_POST_TYPE );

        echo af2_get_data_div( array( 'page:'.AF2_KONTAKTFORMULAR_SLUG, 'builder:'.AF2_KONTAKTFORMULARBUILDER_SLUG ) );

        $table_content = af2_get_cpt_table_content_c( AF2_KONTAKTFORMULAR_POST_TYPE );
        $table = af2_get_cpt_table( 'Kontaktformularname', 'Frontendtitel', $table_content );

        echo af2_get_cpt_content( 'Kontaktformulare', $table );
    }
}