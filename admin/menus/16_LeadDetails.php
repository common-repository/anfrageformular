<?php

define('AF2_LEADDETAILS_SLUG', 'af2_lead_details');

/**
 * Leads
 */
class AF2_LeadDetails {

    private $submenu_data;  //Data of the submenu
    static $id = 0;

    /**
     * Fragenbuilder constructor
     * -> Filling all Data to evaluate later
     */
    public function __construct() {
        require_once AF2_MENU_TOOLS_PATH;

        $this->submenu_data = array(AF2_LEAD_SLUG, 'LeadDetails', 'LeadDetails', 'manage_options', AF2_LEADDETAILS_SLUG);
    }

    /**
     * @return array -> Data to create submenu
     */
    public function get_submenu_data() {
        return $this->submenu_data;
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

        if (self::$id != 0) {
            if (get_post(self::$id) == null) {
                echo '<h2>ERROR</h2>';
                return;
            }
        } else {
            echo '<h2>ERROR</h2>';
            return;
        }

        $date = get_post_field('post_date', get_post(self::$id));

        $table_content = af2_get_cpt_lead_detail_table_content('af2_request', self::$id);
        $table = af2_get_cpt_lead_detail_table($table_content);

        echo af2_get_cpt_content_lead('Lead vom ' . $date, $table);
    }

}

/**
 * Request handling
 */
AF2_LeadDetails::$id = 0;

if (isset($_GET['id'])) {
    $page = sanitize_key($_GET['page']);
    $action = sanitize_key($_GET['action']);
    if ($page == AF2_LEADDETAILS_SLUG) {
        //Loading content
        if ($action == 'load') {
            AF2_LeadDetails::$id = sanitize_key($_GET['id']);
        }
    }
}