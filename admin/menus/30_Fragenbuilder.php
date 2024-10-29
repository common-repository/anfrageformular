<?php

define('AF2_FRAGENBUILDER_SLUG', 'af2_fragenbuilder');
define('AF2_FRAGENBUILDER_PATH', 'admin/menus/30_Fragenbuilder');

/**
 * The Questionbuilder
 */
class AF2_Fragenbuilder {

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

        $this->submenu_data = array(AF2_FRAGE_SLUG, 'Fragenbuilder', 'Fragenbuilder', 'manage_options', AF2_FRAGENBUILDER_SLUG);
    }

    /**
     * @return array -> Data to create submenu
     */
    public function get_submenu_data() {
        return $this->submenu_data;
    }

    /**
     * Generating a question_type
     */
    public function generate_question_types() {
        $folder = scandir(AF2_PLUGIN_DIR . '/question_types');

        $content = '';

        for ($i = 2; $i < sizeof($folder); $i++) {
            $icon_directory = plugins_url('question_types/' . $folder[$i] . '/icon.png', AF2_PLUGIN);
            $type = substr($folder[$i], 2);
            $id = strtolower('af2_' . $type);

            $content .= af2_get_sidebar_generated_content($id, $type, $icon_directory, false, true, true, false, false);
        }

        $pro_folder = scandir(AF2_PLUGIN_DIR . '/pro_qtypes');
        for ($i = 2; $i < sizeof($pro_folder); $i++) {
            $icon_directory = plugins_url('pro_qtypes/' . $pro_folder[$i] . '/icon.png', AF2_PLUGIN);
            $type = substr($pro_folder[$i], 2);
            $id = strtolower('af2_' . $type);

            $content .= af2_get_sidebar_generated_pro_content($id, $type, $icon_directory, false, true, true, false, false);
        }

        return $content;
    }

    /**
     * Content of the Adminpage
     */
    public function get_content() {
        wp_enqueue_style('bootstrap_min');
        wp_enqueue_style('font-awesome_min');
        wp_enqueue_style('af2_admin_style');
        wp_enqueue_style('fontawesome-iconpicker_style.min');

        wp_enqueue_media();
        wp_enqueue_script('media_script');
        wp_enqueue_script('fontawesome-iconpicker_script.min');
        wp_enqueue_script('materialize');
        wp_enqueue_Script('af2_save_state');
        wp_enqueue_script('af2_drag_and_drop');
        wp_enqueue_script('af2_sidebar');
        wp_enqueue_script('af2_fragenbuilder_m');
        wp_enqueue_script('af2_fragenbuilder_v');
        wp_enqueue_script('af2_fragenbuilder_c');
        wp_enqueue_script('af2_builder');

        if (self::$id != 0) {
            if (get_post(self::$id) == null || self::$content == '' || self::$page != AF2_FRAGENBUILDER_SLUG) {
                echo '<h2>ERROR</h2>';
                return;
            }
        } else {
            echo '<h2>ERROR</h2>';
            return;
        }

        echo af2_get_data_div(array('id:' . self::$id, 'page:' . self::$page, 'content:' . self::$content, 'backpage:' . AF2_FRAGE_SLUG));

        $pre_sheet_content = af2_get_sidebar('af2_content_sidebar', 'Elemente:', $this->generate_question_types(), false, false, false, 'true');
        $navbar_content = af2_get_builder_navbar_content('af2_content_sidebar', 'Fragenbuilder', true, false, '');
        $post_sheet_content = af2_get_sidebar('af2_customize_sidebar', 'Anpassen', '', true, true, true, 'false');

        echo af2_get_admin_page_content($pre_sheet_content, $navbar_content, '', $post_sheet_content, false);
    }

}

/**
 * Request handling
 */
AF2_Fragenbuilder::$id = 0;
AF2_Fragenbuilder::$page = '';
AF2_Fragenbuilder::$content = '';

if (isset($_GET['id']) && isset($_GET['page']) && isset($_GET['action'])) {
    $page = sanitize_key($_GET['page']);
    $action = sanitize_key($_GET['action']);
    if ($page == AF2_FRAGENBUILDER_SLUG) {
        //Loading content
        if ($action == 'load') {
            AF2_Fragenbuilder::$id = sanitize_key($_GET['id']);
            AF2_Fragenbuilder::$content = get_post_field('post_content', AF2_Fragenbuilder::$id);
            AF2_Fragenbuilder::$page = $page;
        }
    }
}