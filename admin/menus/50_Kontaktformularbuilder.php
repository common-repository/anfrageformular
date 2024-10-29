<?php

define('AF2_KONTAKTFORMULARBUILDER_SLUG', 'af2_kontaktformularbuilder');
define('AF2_KONTAKTFORMULARBUILDER_PATH', 'admin/menus/70_Kontaktformularbuilder');

/**
 * The Structure Builder
 */
class AF2_Kontaktformularbuilder {

    private $submenu_data;  //Data of the submenu
    static $id = 0;
    static $content = '';
    static $page = '';

    /**
     * Fragenbuilder constructor
     * -> Filling all Data to evaluate later
     */
    public function __construct() {
        require_once AF2_MENU_TOOLS_PATH;

        $this->submenu_data = array(AF2_KONTAKTFORMULAR_SLUG, 'Kontaktformularbuilder', 'Kontaktformularbuilder', 'manage_options', AF2_KONTAKTFORMULARBUILDER_SLUG);
    }

    /**
     * @return array -> Data to create submenu
     */
    public function get_submenu_data() {
        return $this->submenu_data;
    }

    /**
     * Generating the contact form types
     */
    public function generate_types() {
        $content = '';
        $ic = '';

        $ic = '<div class="icon_cont"><h6 style="white-space: nowrap;" class="mr-2 mb-0">Ihr Text:</h6><input type="text" class="inpute form-control" placeholder="Name..." disabled></div>';
        $content .= af2_get_sidebar_generated_content('text_type_name', 'Namensfeld', $ic, true, true, false, true, '25');

        $ic = '<div class="icon_cont"><h6 style="white-space: nowrap;" class="mr-2 mb-0">Ihre E-Mail:</h6><input type="text" class="inpute form-control" placeholder="E-Mail..." disabled></div>';
        $content .= af2_get_sidebar_generated_content('text_type_mail', 'E-Mail', $ic, true, true, false, true, '25');

        $ic = '<div class="icon_cont"><h6 style="white-space: nowrap;" class="mr-2 mb-0">Ihre Telefonnummer:</h6><input type="text" class="inpute form-control" placeholder="Tel..." disabled></div>';
        $content .= af2_get_sidebar_generated_content('text_type_phone', 'Telefon', $ic, true, true, false, true, '25');

        $ic = '<div class="icon_cont"><h6 style="white-space: nowrap;" class="mr-2 mb-0">Ihr Text:</h6><input type="text" class="inpute form-control" placeholder="Plain-Text..." disabled></div>';
        $content .= af2_get_sidebar_generated_content('text_type_plain', 'Textfeld', $ic, true, true, false, true, '25');

        $ic = '<div class="icon_cont"><input type="checkbox" class="form-check-input inpute" checked disabled> <h6 class="ml-2">Ihr Text</h6></div>';
        $content .= af2_get_sidebar_generated_content('checkbox_type', 'Checkbox', $ic, true, true, false, true, 22);


        $ic = '<div class="icon_cont"><h6 style="white-space: nowrap;" class="mr-2 mb-0">Google reCaptcha v2</h6></div>';
        $content .= af2_get_sidebar_generated_content('google_recaptcha', 'Google reCaptcha', $ic, true, true, false, true, 22);

        return $content;
    }

    /**
     * Content of the Adminpage
     */
    public function get_content() {
        wp_enqueue_style('bootstrap_min');
        wp_enqueue_style('font-awesome_min');
        wp_enqueue_style('af2_admin_style');

        wp_enqueue_script('materialize');
        wp_enqueue_Script('af2_save_state');
        wp_enqueue_script('af2_drag_and_drop');
        wp_enqueue_script('af2_sidebar');
        wp_enqueue_script('af2_kontaktformularbuilder_m');
        wp_enqueue_script('af2_kontaktformularbuilder_v');
        wp_enqueue_script('af2_kontaktformularbuilder_c');
        wp_enqueue_script('af2_builder');

        wp_localize_script('af2_kontaktformularbuilder_c', 'af2_BE_valid_mail', array(
            'ajax_url' => admin_url('admin-ajax.php'), 'nonce' => wp_create_nonce('af2_BE_CM_NONCE')
        ));

        if (self::$id != 0) {
            if (get_post(self::$id) == null || self::$content == '' || self::$page != AF2_KONTAKTFORMULARBUILDER_SLUG) {
                echo '<h2>ERROR</h2>';
                return;
            }
        } else {
            echo '<h2>ERROR</h2>';
            return;
        }

        echo af2_get_data_div(array('id:' . self::$id, 'page:' . self::$page, 'content:' . self::$content, 'backpage:' . AF2_KONTAKTFORMULAR_SLUG));

        $pre_sheet_content = af2_get_sidebar('af2_content_sidebar', 'Elemente:', $this->generate_types(), false, false, false, 'true');
        $navbar_content = af2_get_builder_navbar_content('af2_content_sidebar', 'Kontaktformularbuilder', true, true, '<i class="fas fa-bars"></i>');
        $post_sheet_content = af2_get_sidebar('af2_customize_sidebar', 'Anpassen', '', true, true, true, 'false');
        $content = '<div id="af2_contactformtitle" class="af2_content_title af2_editable_content af2_changeable" data-type="text" data-placeholder="Titel des Formulares..." data-title="Kontaktformulartitel" data-basetext="Fügen Sie den Titel des Kontaktformulares ein!"></div>';
        $content .= '<div id="af2_question_container">';
        $content .= '<div id="0" class="af2_input_margs"></div>';
        $content .= '</div>';
        $content .= '<div class="af2_send_dummy_button_container">';
        $content .= '<input id="af2_send_button" type="submit" value="" class="af2_send_dummy_button btn btn-primary af2_editable_content af2_changeable" data-type="text" data-placeholder="Inhalt des Buttons..." data-title="Senden Button" data-basetext="[Senden Button]">';
        $content .= '</div>';
        echo af2_get_admin_page_content($pre_sheet_content, $navbar_content, $content, $post_sheet_content, false);
    }

}

AF2_Kontaktformularbuilder::$id = 0;
AF2_Kontaktformularbuilder::$page = '';
AF2_Kontaktformularbuilder::$content = '';

if (isset($_GET['id']) && isset($_GET['page']) && isset($_GET['action'])) {
    $page = sanitize_key($_GET['page']);
    $action = sanitize_key($_GET['action']);
    if ($page == AF2_KONTAKTFORMULARBUILDER_SLUG) {
        //Loading content
        if ($action == 'load') {
            AF2_Kontaktformularbuilder::$id = sanitize_key($_GET['id']);
            AF2_Kontaktformularbuilder::$content = get_post_field('post_content', AF2_Kontaktformularbuilder::$id);
            AF2_Kontaktformularbuilder::$page = $page;
        }
    }
}