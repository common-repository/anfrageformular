<?php

define( 'AF2_LEAD_SLUG', 'af2_leads' );

/**
 * The Questions
 */
class AF2_Leads {
    private $submenu_data; //Data for constructing the submenu

    /**
     * Dashboard constructor.
     * -> Filling the submenu_data
     */
    public function __construct()
    {
        require_once AF2_MENU_TOOLS_PATH;

            $this->submenu_data = array(AF2_MAIN_MENU_SLUG, 'Leads', 'Leads', 'manage_options', AF2_LEAD_SLUG );
    }
    
    /**
     * @return array -> submenu_data
     */
    public function get_submenu_data()
    {
            return $this->submenu_data;
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
        wp_enqueue_script( 'af2_branding' );

        echo af2_get_data_div( array( 'page:'.AF2_LEAD_SLUG, 'details:'.'af2_lead_details' ) );

        $table_content = af2_get_cpt_lead_table_content( 'af2_request' );
        $table = af2_get_cpt_lead_table( 'Lead vom...', $table_content );

        echo af2_get_cpt_content_lead( 'Leads', $table );
    }
}