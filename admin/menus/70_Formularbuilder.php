<?php
define('AF2_FORMULARBUILDER_SLUG', 'af2_formularbuilder');
define('AF2_FORMULARBUILDER_PATH', 'admin/menus/70_Formularbuilder');

/**
 * The Structure Builder
 */
class AF2_Formularbuilder {

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

        $this->submenu_data = array(AF2_FORMULAR_SLUG, 'Formularbuilder', 'Formularbuilder', 'manage_options', AF2_FORMULARBUILDER_SLUG);
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
    public function generate_contents() {
        $posts = get_posts([
            'post_type' => AF2_FRAGE_POST_TYPE,
            'post_status' => 'privat',
            'numberposts' => -1,
            'order' => 'ASC'
        ]);

        $content = '';
        $icon_directory = '';
        $length = 0;
        for ($i = 0; $i < sizeof($posts); $i++) {
            if (get_post_field('post_content', $posts[$i]) !== '{}') {
                $type = substr(json_decode(get_post_field('post_content', $posts[$i]))->typ, 4);
                $z = get_post_field('ID', $posts[$i]);
                $folders = scandir(AF2_PLUGIN_DIR . '/question_types');
                for ($y = 2; $y < sizeof($folders); $y++) {
                    if (substr(strtolower($folders[$y]), 2) == strtolower($type)) {
                        $icon_directory = plugins_url('question_types/' . $folders[$y] . '/icon.png', AF2_PLUGIN);
                    }
                }
                $post_cont = json_decode(get_post_field('post_content', $posts[$i]));
                if (!$post_cont->error) {
                    $title = $post_cont->name;
                    $id = strtolower('af2_content_' . $z);
                    $post_cont = get_post_field('post_content', $posts[$i]);
                    $post_cont = htmlentities($post_cont);

                    $content .= af2_get_sidebar_generated_content_w_data($id, $title, $icon_directory, false, false, true, true, 20, $post_cont, $z);
                    $length++;
                }
            }
        }

        $posts = get_posts([
            'post_type' => AF2_KONTAKTFORMULAR_POST_TYPE,
            'post_status' => 'privat',
            'numberposts' => -1,
            'order' => 'ASC'
        ]);

        for ($i = 0; $i < sizeof($posts); $i++) {
            if (get_post_field('post_content', $posts[$i]) !== '{}') {
                $post_cont = json_decode(get_post_field('post_content', $posts[$i]));
                $z = get_post_field('ID', $posts[$i]);

                if (!$post_cont->error) {
                    $title = '<i class="fas fa-envelope mr-2"></i>' . $post_cont->name;
                    $id = strtolower('af2_content_' . $z);
                    $pf = get_post_field('post_content', $posts[$i]);

                    $pf = strip_tags($pf);

                    $content .= af2_get_sidebar_generated_content_w_n_data($id, $title, '', true, false, true, true, 20, $pf, $z);
                }
            }
        }

        $content .= af2_get_sidebar_generated_content('sb_redirect', '<i class="fas fa-external-link-alt mr-2"></i>Redirect', '', true, false, true, true, 20, true);
        return $content;
    }

    /**
     * Content of the Adminpage
     */
    public function get_content() {
        wp_enqueue_style('bootstrap_min');
        wp_enqueue_style('font-awesome_min');
        wp_enqueue_style('af2_admin_style');
        wp_enqueue_style('light.min');

        wp_enqueue_script('dragscroll');
        wp_enqueue_script('af2_scroll_on_border_hit');
        wp_enqueue_script('default-picker.min');
        wp_enqueue_script('line_creator');
        wp_enqueue_script('materialize');
        wp_enqueue_Script('af2_save_state');
        wp_enqueue_script('af2_drag_and_drop');
        wp_enqueue_script('af2_sidebar');
        wp_enqueue_script('af2_formularbuilder_m');
        wp_enqueue_script('af2_formularbuilder_v');
        wp_enqueue_script('af2_formularbuilder_c');
        wp_enqueue_script('af2_builder');

        wp_enqueue_script('jquery-ui-datepicker');

        wp_localize_script('af2_formularbuilder_v', 'af2_backend_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'), 'nonce' => wp_create_nonce('af2_BE_nonce')
        ));

        if (self::$id != 0) {
            if (get_post(self::$id) == null || self::$content == '' || self::$page != AF2_FORMULARBUILDER_SLUG) {
                echo '<h2>ERROR</h2>';
                return;
            }
        } else {
            echo '<h2>ERROR</h2>';
            return;
        }

        echo af2_get_data_div(array('id:' . self::$id, 'page:' . self::$page, 'content:' . self::$content, 'backpage:' . AF2_FORMULAR_SLUG));

        $pre_sheet_content = af2_get_sidebar('af2_content_sidebar', 'Inhalte:', $this->generate_contents(), false, false, false, 'true');
        $navbar_content = af2_get_builder_navbar_content_focus('af2_content_sidebar', 'Formularbuilder', true, true, 'Vorschau & Einstellungen');
        $post_sheet_content = af2_get_sidebar('af2_customize_sidebar', 'Anpassen', '', true, true, true, 'false');
        $content = '';

        echo af2_get_admin_page_content($pre_sheet_content, $navbar_content, $content, $post_sheet_content, true);
    }

}

/**
 * Request handling
 */
AF2_Formularbuilder::$id = 0;
AF2_Formularbuilder::$page = '';
AF2_Formularbuilder::$content = '';

if (isset($_GET['id']) && isset($_GET['page']) && isset($_GET['action'])) {
    $page = sanitize_key($_GET['page']);
    $action = sanitize_key($_GET['action']);
    if ($page == AF2_FORMULARBUILDER_SLUG) {
        //Loading content
        if ($action == 'load') {
            AF2_Formularbuilder::$id = sanitize_key($_GET['id']);
            AF2_Formularbuilder::$content = get_post_field('post_content', AF2_Formularbuilder::$id);
            AF2_Formularbuilder::$page = $page;
        }
    }
}

function af2_fe_req() {
    $json = null;

    if (!( check_ajax_referer('af2_BE_nonce') )) {
        die();
    }

    $base_post_structure = get_post(sanitize_key($_GET['dataid']));

    if ($base_post_structure == null) {
        echo 'error';
        die();
    }

    if (get_post_field('post_type', $base_post_structure) != 'af2_formular') {
        echo 'error';
        wp_die();
    }

    $clicked = isset($_GET['clicked'])?sanitize_key($_GET['clicked']):-1;
    $current_section = isset($_GET['sec'])?sanitize_key($_GET['sec']):0;
    $current_content = isset($_GET['cont'])?sanitize_key($_GET['cont']):0;

    $structure_base_json = get_post_field('post_content', $base_post_structure);

    $jsonm = json_decode($structure_base_json);



    if ($clicked == -1 || $clicked == '-1') {
        $base_post_data = $jsonm->sections[$current_section]->contents[$current_content]->data;
        $base_post = get_post($base_post_data);
        $base_post_content = json_decode(get_post_field('post_content', $base_post));

        $json->jsonpart = $base_post_content;
        $json->sec = 0;
        $json->cont = 0;
        $json->from = null;
    } else {
        $base_conns = $jsonm->sections[$current_section]->contents[$current_content]->connections;
        $index = false;

        for ($i = 0; $i < sizeof($base_conns); $i++) {
            if (strval($base_conns[$i]->from) == strval($clicked)) {
                $index = $i;
                break;
            } else if (strval($base_conns[$i]->from) == '-1') {
                if ($index == false) {
                    $index = $i;
                }
            }
        }

        $section_to = $base_conns[$index]->to_section;
        $content_to = $base_conns[$index]->to_content;


        $new_data = $jsonm->sections[$section_to]->contents[$content_to]->data;

        $new_post = get_post($new_data);
        $new_json = json_decode(get_post_field('post_content', $new_post));

        if (get_post_field('post_type', $new_post) == 'af2_kontaktformular') {
            $new_json->mailto = null;
            $new_json->mailfrom = null;
            $new_json->mailtext = null;
            $new_json->mailsubject = null;
        }



        $json->jsonpart = $new_json;
        $from = null;
        $from->section = $current_section;
        $from->content = $current_content;
        $json->from = $from;
        $json->sec = $section_to;
        $json->cont = $content_to;
    }

    $json = json_encode($json, JSON_UNESCAPED_UNICODE);
    echo $json;




    wp_die();
}

add_action('wp_ajax_af2_fe_req', 'af2_fe_req');

/**
 * Getting all data for the frontend to work with
 */
function af2_request_data_content() {
    if (!( check_ajax_referer('af2_BE_nonce') )) {
        echo 'ERROR';
        die();
    }

    /** Check that all attributes are sent * */
    if (!isset($_GET['ids'])) {
        echo 'ERROR';
        die();
    }

    /** Get all attributes * */
    $dataids = !empty($_GET['ids'])?array_map( 'absint', $_GET['ids'] ):array(); // The Array of Dataids

    foreach ($dataids as $dataid) {
        af2_sql_check($dataid);
    }

    /** Checking for bad input and fetching posts * */
    $base_posts = array();                       // The post of it out of DB
    $x = 0;                           // Loop
    foreach ($dataids as $dataid) {
        $base_posts[$x] = af2_check_params_for_getting_content($dataid);

        /** Checking that no Errors are given * */
        if ($base_posts[$x] === 'ERROR') {
            echo 'ERROR';
            die();
        }

        $x++;
    }

    /** Fetching content out of Database * */
    $base_structures = array();                      // The json Strings
    $base_jsons = array();                       // The json-Objects of it
    $post_types = array();                       // The Types of the post
    $x = 0;                           // Loop
    foreach ($base_posts as $base_post) {
        $base_structures[$x] = get_post_field('post_content', $base_post);
        $base_jsons[$x] = json_decode($base_structures[$x]);

        /** Checking that no Error is given * */
        $check = af2_check_for_errors($base_jsons[$x]);
        if ($check === 'ERROR') {
            echo 'ERROR';
            die();
        }

        $post_types[$x] = get_post_field('post_type', $base_post);

        $x++;
    }

    /** Cleaning the jsons for the frontend * */
    $new_jsons = json_decode('{}');                    // The clean Jsons
    $x = 0;                           // Loop
    foreach ($post_types as $post_type) {
        $data = strval($dataids[$x]);                   // Actual called Dataid
        switch ($post_type) {
            case 'af2_frage': {
                    $new_jsons->$data = af2_clean_frage_json($base_jsons[$x]);
                    break;
                }
            case 'af2_kontaktformular': {
                    $new_jsons->$data = af2_clean_kontaktformular_json($base_jsons[$x]);
                    break;
                }
            case 'af2_formular': {
                    $new_jsons->$data = af2_clean_formular_json($base_jsons[$x]);
                    break;
                }
        }

        $x++;
    }

    $jsons = json_encode($new_jsons, JSON_UNESCAPED_UNICODE);              // Json to return

    echo $jsons;
    wp_die();
}

add_action('wp_ajax_af2_request_data_content', 'af2_request_data_content');

/**
 * Making the json usable for the frontend
 *
 * @param $base_json
 * @return string
 */
function af2_clean_frage_json($base_json) {
    $new_json = json_decode('{}');

    /** Processing... * */
    $new_json->frontend_name = $base_json->name;
    $new_json->frontend_description = $base_json->description == null ? '' : $base_json->description;
    $new_json->typ = $base_json->typ;
    $new_json->type_specifics = af2_process_type_specifics($base_json);
    $new_json->af2_type = 'frage';

    return $new_json;
}

/**
 * Making the json usable for the frontend
 *
 * @param $base_json
 * @return string
 */
function af2_clean_kontaktformular_json($base_json) {
    $new_json = json_decode('{}');

    /** Processing... * */
    $new_json->frontend_name = $base_json->cftitle;
    $new_json->questions = $base_json->questions;
    $new_json->sendButtonLabel = $base_json->send_button;
    $new_json->af2_type = 'kontaktformular';
    $new_json->show_bottombar = $base_json->show_bottombar;

    return $new_json;
}

/**
 * Making the json usable for the frontend
 *
 * @param $base_json
 * @return string
 */
function af2_clean_formular_json($base_json) {
    $new_json = json_decode('{}');

    /** Processing... * */
    $new_json->sections = af2_process_connections($base_json->sections);/** TODO ERRORS * */
    $new_json->styling = af2_process_styling($base_json->styling);/** TODO ERRORS * */
    $new_json->af2_type = 'formular';

    return $new_json;
}

/*
 * INCOMING -> DELEDEABLE Part of the Method, WHEN ITS DONE IN BACKEND PERFECTLY
 */

/**
 * Building the dataids of following into the connections
 *
 * @param $base_array
 * @return mixed
 */
function af2_process_connections($base_array) {
    $new_json = json_decode('{}');
    $new_json->sections = $base_array;                    // Puffer

    /** Iterating all Sections * */
    for ($x = sizeof($new_json->sections) - 1; $x >= 0; $x--) {
        $section = $new_json->sections[$x];                  // ForEach object

        /** Iterating all Contents * */
        for ($y = sizeof($section->contents) - 1; $y >= 0; $y--) {
            $content = $section->contents[$y];                 // ForEach object

            /** Check if content should be deleted because its an interface * */
            if (af2_check_data_type($content->data) === 'interface') {
                /** SAFE THE OTHER ONES * */
                /** Iterating all Contents * */
                for ($z = sizeof($section->contents) - 1; $z >= 0; $z--) {
                    if ($z > $y) {
                        if (af2_check_data_type($base_array[$x]->contents[$z]) === 'redirect') {
                            foreach ($base_array[$x]->contents[$z]->incoming_connections as $inc) {
                                $from_section = $inc->from_section;
                                $from_content = $inc->from_content;

                                $a = 0;
                                foreach ($base_array[$from_section]->contents[$from_content]->connections as $con) {
                                    if ($con->to_section == $x && $con->to_content == $z) {
                                        $new_json->sections[$from_section]->contents[$from_content]->connections[$a]->to_content = $base_array[$from_section]->contents[$from_content]->connections[$a]->to_content - 1;
                                    }
                                    $a++;
                                }
                            }
                        }
                    }
                }

                array_splice($new_json->sections[$x]->contents, $y, 1);
                continue;
            }

            /** Iterating all Connections * */
            for ($z = sizeof($content->connections) - 1; $z >= 0; $z--) {
                $connection = $content->connections[$z];               // ForEach object

                $to_section = $connection->to_section;                // The Section to go on
                $to_content = $connection->to_content;                // The Content to go on
                $to_dataid = $base_array[$to_section]->contents[$to_content]->data;        // The Dataid to go on

                /** Check that dataid is an interface * */
                if (af2_check_data_type($to_dataid) === 'undefined') {
                    array_splice($new_json->sections[$x]->contents[$y]->connections, $z, 1);
                } else {
                    /** Correcting everything into numbers! * */
                    /*
                     * INCOMING -> DELETEABE, when its perfectly done in the backend!
                     */
                    $new_json->sections[$x]->contents[$y]->connections[$z]->from = intval($connection->from);
                    $new_json->sections[$x]->contents[$y]->connections[$z]->to_section = intval($connection->to_section);
                    $new_json->sections[$x]->contents[$y]->connections[$z]->to_content = intval($connection->to_content);

                    /** Adding the Dataid into the connections * */
                    $new_json->sections[$x]->contents[$y]->connections[$z]->to_dataid = $to_dataid;
                }
            } // ENDLOOP /** Iterating all Connections **/
            /** Iterating all incoming connections * */
            for ($z = sizeof($content->incoming_connections) - 1; $z >= 0; $z--) {
                $incoming_connection = $content->incoming_connections[$z];          // ForEach object
                /** Correcting everything into numbers! * */
                /*
                 * INCOMING -> DELETEABE, when its perfectly done in the backend!
                 */
                $new_json->sections[$x]->contents[$y]->incoming_connections[$z]->from_section = intval($incoming_connection->from_section);
                $new_json->sections[$x]->contents[$y]->incoming_connections[$z]->from_content = intval($incoming_connection->from_content);
            } // ENDLOOP /** Iterating all Connections **/
        } // ENDLOOP /** Iterating all Contents **/
    } // ENDLOOP /** Iterating all Sections **/

    return $new_json->sections;
}

/**
 * Process the specifics for every type
 *
 * @param $base_json
 * @return string
 */
function af2_process_type_specifics($base_json) {
    $new_json = json_decode('{}');

    $type = $base_json->typ;                      // Typ of the actual Frage

    switch ($type) {
        case 'af2_select': {
                $new_json->answers = af2_process_answers($base_json->answers);
                break;
            }
        case 'af2_multiselect': {
                $new_json->answers = af2_process_answers($base_json->answers);
                $new_json->condition = $base_json->condition;
                break;
            }
        case 'af2_textfeld': {
                $new_json->placeholder = $base_json->textfeld;
                break;
            }
        case 'af2_textbereich': {
                $new_json->placeholder = $base_json->textarea;
                break;
            }
        case 'af2_datum': {
                $new_json->placeholder = $base_json->datum;
                $new_json->format = $base_json->datum_format;
                break;
            }
        case 'af2_slider': {
                $new_json->min = $base_json->min;
                $new_json->max = $base_json->max;
                $new_json->step = $base_json->step;
                $new_json->label = $base_json->label;
                $new_json->start = $base_json->start;
                $new_json->thousand = $base_json->thousand;
                $new_json->labelBefore = $base_json->lab;
                break;
            }
        case 'af2_content': {
                $new_json->content = $base_json->content_area;
                $new_json->content_button = $base_json->content_button;
                $new_json->content_button_text = $base_json->content_button_text;
                $new_json->content_wait_time = $base_json->content_wait;
            }
    }

    return $new_json;
}

/**
 * Processing the answers, that all types in there are corredt
 *
 * @param $answers
 * @return array
 */
function af2_process_answers($answers) {
    $new_array = array();

    foreach ($answers as $answer) {
        $new_answer = json_decode('{}');                   // The new answer object
        $new_answer->text = $answer->text;                   // Text of the answer
        $new_answer->icon = $answer->img;                   // Actual Icon
        $new_answer->icon_type = '';                    // Type of the icon
        if (strpos($new_answer->icon, 'http') !== false) {
            $new_answer->icon_type = 'url';
        } else {
            $new_answer->icon_type = 'font-awesome';
        }

        array_push($new_array, $new_answer);
    }

    return $new_array;
}

/*
 * INCOMING -> DELEDEABLE METHOD, WHEN ITS DONE IN BACKEND PERFECTLY
 */

/**
 * Building the right styling for the frontend to use
 *
 * @param $base_json
 * @return string
 */
function af2_process_styling($base_json) {
    $new_json = json_decode('{}');

    /** TODO MAKE TO JSONS !!!!!!!!!!* */
    /** TODO ADD THE TYPE * */
    /** TODO GO OVER SELECTOR * */
    /** Get all stylings * */
    /** OLD VARIANT * */
    //if( $base_json->main_color !== null && $base_json->main_color !== "" )
    //{
    // Main Color of the whole Formular
    /*     * $buffer_main_color 				= json_decode( '{"attribute": "color",
      "value":"'.$base_json->main_color.'"}' );
      $buffer_main_background_color	= json_decode( '{"attribute": "background-color",
      "value":"'.$base_json->main_color.'"}' );
      $buffer_main_box_shadow			= json_decode( '{"attribute": "box-shadow",
      "value":" 0 0 6px '.$base_json->main_color.'",
      "special_state":"focus"}' );
      $buffer_main_border				= json_decode( '{"attribute": "border",
      "value":"1px solid '.$base_json->main_color.'",
      "special_state":"focus"}' );
      $buffer_main_border_color		= json_decode( '{"attribute": "border-color",
      "value":"transparent transparent '.$base_json->main_color.' transparent"' );

      // Background Color of the whole Formular
      $buffer_background_color 		= json_decode( '{"attribute": "background-color",
      "value":"'.$base_json->background_color.'"}' );

      // Card Color of the Answers
      $buffer_card_color		 		= json_decode( '{"attribute": "background-color",
      "value":"'.$base_json->card_color.'"}' );
      // Text Color of the answers
      $buffer_text_color		 		= json_decode( '{"attribute": "color",
      "value":"'.$base_json->text_color.'"}' );

      $buffer_main_shadow_color					= json_decode( '{"attribute": "box-shadow",
      "value":" 0 0 6px '.$base_json->main_color.'",
      "special_state":"focus"}' );
      $buffer_main_bg_color 			= json_decode( '{"attribute": "background-color",
      "value":"'.$base_json->main_color.'",
      "special_state":"-webkit-slider-thumb"}' );
      $buffer_main_bg_color2 			= json_decode( '{"attribute": "background-color",
      "value":"'.$base_json->main_color.'",
      "special_state":"-moz-range-thumb"}' );
      $af2_slider_frage_bullet		= json_decode( '{"attribute": "color",
      "value":"'.$base_json->main_color.'"}' );* */


    /** COLORS * */
    $form_heading_color = json_decode('{"attribute": "color","value":"' . $base_json->form_heading_color . '"}');

    $form_question_heading_color = json_decode('{"attribute": "color","value":"' . $base_json->form_question_heading_color . '"}');

    $form_question_description_color = json_decode('{"attribute": "color","value":"' . $base_json->form_question_description_color . '"}');

    $form_answer_card_text_color = json_decode('{"attribute": "color","value":"' . $base_json->form_answer_card_text_color . '"}');

    $form_answer_card_icon_color = json_decode('{"attribute": "color","value":"' . $base_json->form_answer_card_icon_color . '"}');

    $form_background_color = json_decode('{"attribute": "background-color","value":"' . $base_json->form_background_color . '"}');

    $form_answer_card_background_color = json_decode('{"attribute": "background-color","value":"' . $base_json->form_answer_card_background_color . '"}');

    $form_button_background_color = json_decode('{"attribute": "background-color","value":"' . $base_json->form_button_background_color . '"}');

    $form_button_disabled_background_color = json_decode('{"attribute":"background-color","value": "' . $base_json->form_button_disabled_background_color . '","special_class": "af2_disabled"}');

    $form_box_shadow_color = json_decode('{"attribute": "box-shadow","value":" 0 0 6px ' . $base_json->form_box_shadow_color . '","special_state":"focus"}');

    $form_progress_bar_color = json_decode('{"attribute": "background-color","value":"' . $base_json->form_progress_bar_color . '"}');

    $form_progress_bar_unfilled_background_color = json_decode('{"attribute": "background-color","value":"' . $base_json->form_progress_bar_unfilled_background_color . '"}');

    $form_border_color = json_decode('{"attribute": "border","value":"1px solid ' . $base_json->form_border_color . '","special_state":"focus"}');

    $form_slider_frage_bullet_color = json_decode('{"attribute": "color","value":"' . $base_json->form_slider_frage_bullet_color . '"}');

    $form_slider_frage_thumb_background_color = json_decode('{"attribute": "background-color","value":"' . $base_json->form_slider_frage_thumb_background_color . '","special_extra":"-moz-range-thumb"}');

    $form_slider_frage_thumb_background_color2 = json_decode('{"attribute": "background-color","value":"' . $base_json->form_slider_frage_thumb_background_color . '","special_extra":"-webkit-slider-thumb"}');

    $form_input_background_color = json_decode('{"attribute": "background-color","value":"' . $base_json->form_input_background_color . '"}');

    $form_loader_color = json_decode('{"attribute": "color","value":"' . $base_json->form_loader_color . '"}');

    /** TEXT THINGS * */
    //form heading
    $form_heading_size_desktop = json_decode('{"attribute": "font-size",
								 						 	"value":"' . $base_json->form_heading_size_desktop . 'px",
								 						 	"special_class":"desktop"}');
    $form_heading_size_mobile = json_decode('{"attribute": "font-size",
								 						 	"value":"' . $base_json->form_heading_size_mobile . 'px",
								 						 	"special_class":"af2_mobile"}');
    $form_heading_weight = json_decode('{"attribute": "font-weight",
								 						 	"value":"' . $base_json->form_heading_weight . '"}');
    $form_heading_line_height_desktop = json_decode('{"attribute": "line-height",
								 						 	"value":"' . $base_json->form_heading_line_height_desktop . 'px",
								 						 	"special_class":"desktop"}');
    $form_heading_line_height_mobile = json_decode('{"attribute": "line-height",
								 						 	"value":"' . $base_json->form_heading_line_height_mobile . 'px",
								 						 	"special_class":"af2_mobile"}');

    //question heading
    $form_question_heading_size_desktop = json_decode('{"attribute": "font-size",
								 						 	"value":"' . $base_json->form_question_heading_size_desktop . 'px",
								 						 	"special_class":"desktop"}');
    $form_question_heading_size_mobile = json_decode('{"attribute": "font-size",
								 						 	"value":"' . $base_json->form_question_heading_size_mobile . 'px",
								 						 	"special_class":"af2_mobile"}');
    $form_question_heading_weight = json_decode('{"attribute": "font-weight",
								 						 	"value":"' . $base_json->form_question_heading_weight . '"}');
    $form_question_heading_line_height_desktop = json_decode('{"attribute": "line-height",
								 						 	"value":"' . $base_json->form_question_heading_line_height_desktop . 'px",
								 						 	"special_class":"desktop"}');
    $form_question_heading_line_height_mobile = json_decode('{"attribute": "line-height",
								 						 	"value":"' . $base_json->form_question_heading_line_height_mobile . 'px",
															  "special_class":"af2_mobile"}');

    //question description
    $form_question_description_size_desktop = json_decode('{"attribute": "font-size",
		"value":"' . $base_json->form_question_description_size_desktop . 'px",
		"special_class":"desktop"}');
    $form_question_description_size_mobile = json_decode('{"attribute": "font-size",
					"value":"' . $base_json->form_question_description_size_mobile . 'px",
					"special_class":"af2_mobile"}');
    $form_question_description_weight = json_decode('{"attribute": "font-weight",
					"value":"' . $base_json->form_question_description_weight . '"}');
    $form_question_description_line_height_desktop = json_decode('{"attribute": "line-height",
					"value":"' . $base_json->form_question_description_line_height_desktop . 'px",
					"special_class":"desktop"}');
    $form_question_description_line_height_mobile = json_decode('{"attribute": "line-height",
					"value":"' . $base_json->form_question_description_line_height_mobile . 'px",
					"special_class":"af2_mobile"}');

    //answers
    $form_answer_card_text_size_desktop = json_decode('{"attribute": "font-size",
								 						 	"value":"' . $base_json->form_answer_card_text_size_desktop . 'px",
								 						 	"special_class":"desktop"}');
    $form_answer_card_text_size_mobile = json_decode('{"attribute": "font-size",
								 						 	"value":"' . $base_json->form_answer_card_text_size_mobile . 'px",
								 						 	"special_class":"af2_mobile"}');
    $form_answer_card_text_weight = json_decode('{"attribute": "font-weight",
								 						 	"value":"' . $base_json->form_answer_card_text_weight . '"}');
    $form_answer_card_text_line_height_desktop = json_decode('{"attribute": "line-height",
								 						 	"value":"' . $base_json->form_answer_card_text_line_height_desktop . 'px",
								 						 	"special_class":"desktop"}');
    $form_answer_card_text_line_height_mobile = json_decode('{"attribute": "line-height",
								 						 	"value":"' . $base_json->form_answer_card_text_line_height_mobile . 'px",
								 						 	"special_class":"af2_mobile"}');

    //input text sizes
    $form_text_input_size_desktop = json_decode('{"attribute": "font-size",
								 						 	"value":"' . $base_json->form_text_input_size_desktop . 'px",
								 						 	"special_class":"desktop"}');
    $form_text_input_size_mobile = json_decode('{"attribute": "font-size",
								 						 	"value":"' . $base_json->form_text_input_size_mobile . 'px",
								 						 	"special_class":"af2_mobile"}');
    $form_text_input_weight = json_decode('{"attribute": "font-weight",
								 						 	"value":"' . $base_json->form_text_input_weight . '"}');
    $form_text_input_line_height_desktop = json_decode('{"attribute": "line-height",
								 						 	"value":"' . $base_json->form_text_input_line_height_desktop . 'px",
								 						 	"special_class":"desktop"}');
    $form_text_input_line_height_mobile = json_decode('{"attribute": "line-height",
								 						 	"value":"' . $base_json->form_text_input_line_height_mobile . 'px",
								 						 	"special_class":"af2_mobile"}');

    /** BORDER RADIUS * */
    $form_answer_card_border_radius = json_decode('{"attribute": "border-radius",
			"value":"' . $base_json->form_answer_card_border_radius . 'px"}');
    $form_text_input_border_radius = json_decode('{"attribute": "border-radius",
			"value":"' . $base_json->form_text_input_border_radius . 'px"}');

    /** CONTACT FORM * */
    $form_contact_form_label_size = json_decode('{"attribute": "font-size",
		"value":"' . $base_json->form_contact_form_label_size . 'px"}');
    $form_contact_form_label_weight = json_decode('{"attribute": "font-weight",
		"value":"' . $base_json->form_contact_form_label_weight . '"}');
    $form_contact_form_input_size = json_decode('{"attribute": "font-size",
				"value":"' . $base_json->form_contact_form_input_size . 'px"}');
    $form_contact_form_input_weight = json_decode('{"attribute": "font-weight",
				"value":"' . $base_json->form_contact_form_input_weight . '"}');
    $form_contact_form_button_size = json_decode('{"attribute": "font-size",
				"value":"' . $base_json->form_contact_form_button_size . 'px"}');
    $form_contact_form_button_weight = json_decode('{"attribute": "font-weight",
				"value":"' . $base_json->form_contact_form_button_weight . '"}');
    $form_contact_form_button_padding_top_bottom = json_decode('{"attribute": "padding",
				"value":"' . $base_json->form_contact_form_button_padding_top_bottom . 'px 0"}');
    $form_contact_form_cb_size = json_decode('{"attribute": "font-size",
				"value":"' . $base_json->form_contact_form_cb_size . 'px"}');
    $form_contact_form_cb_weight = json_decode('{"attribute": "font-weight",
				"value":"' . $base_json->form_contact_form_cb_weight . '"}');
    $form_contact_form_input_height = json_decode('{"attribute": "height",
				"value":"' . $base_json->form_contact_form_input_height . 'px"}');
    $form_contact_form_input_border_radius = json_decode('{"attribute": "border-radius",
				"value":"' . $base_json->form_contact_form_input_border_radius . 'px"}');
    $form_contact_form_button_border_radius = json_decode('{"attribute": "border-radius",
				"value":"' . $base_json->form_contact_form_button_border_radius . 'px"}');
    $form_contact_form_button_background_color = json_decode('{"attribute": "background-color",
				"value":"' . $base_json->form_contact_form_button_background_color . '"}');
    $form_contact_form_button_color = json_decode('{"attribute": "color",
																	"value":"' . $base_json->form_contact_form_button_color . '"}');
    $form_contact_form_input_padding_left_right = json_decode('{"attribute": "padding",
																	"value":"0 ' . $base_json->form_contact_form_tinput_padding_left_right . 'px"}');

    /** Append them into the json * */
    $new_json->af2_answer_card_ = array($form_answer_card_icon_color, $form_answer_card_background_color,
        $form_answer_card_border_radius);

    $new_json->af2_form_heading = array($form_heading_color, $form_heading_size_desktop, $form_heading_size_mobile, $form_heading_weight, $form_heading_line_height_desktop, $form_heading_line_height_mobile);

    $new_json->af2_question_heading = array($form_question_heading_color, $form_question_heading_size_desktop, $form_question_heading_size_mobile, $form_question_heading_weight, $form_question_heading_line_height_desktop, $form_question_heading_line_height_mobile);

    $new_json->af2_question_description = array($form_question_description_color, $form_question_description_size_desktop, $form_question_description_size_mobile, $form_question_description_weight, $form_question_description_line_height_desktop, $form_question_description_line_height_mobile);

    $new_json->af2_answer_text = array($form_answer_card_text_color, $form_answer_card_text_size_desktop, $form_answer_card_text_size_mobile, $form_answer_card_text_weight, $form_answer_card_text_line_height_desktop, $form_answer_card_text_line_height_mobile);

    $new_json->af2_form = array($form_background_color);

    $new_json->af2_form_button = array($form_button_background_color, $form_button_disabled_background_color);

    $new_json->af2_form_progress = array($form_progress_bar_color);

    $new_json->af2_form_progress_bar = array($form_progress_bar_unfilled_background_color);

    $new_json->af2_textfeld_frage = array($form_box_shadow_color, $form_input_background_color,
        $form_text_input_size_desktop, $form_text_input_size_mobile, $form_text_input_weight, $form_text_input_line_height_desktop, $form_text_input_line_height_mobile,
        $form_text_input_border_radius);

    $new_json->af2_textbereich_frage = array($form_box_shadow_color, $form_input_background_color,
        $form_text_input_size_desktop, $form_text_input_size_mobile, $form_text_input_weight, $form_text_input_line_height_desktop, $form_text_input_line_height_mobile,
        $form_text_input_border_radius);

    $new_json->af2_text_type = array($form_contact_form_input_padding_left_right, $form_box_shadow_color, $form_border_color, $form_input_background_color, $form_contact_form_input_size, $form_contact_form_input_weight, $form_contact_form_input_height, $form_contact_form_input_border_radius);

    $new_json->af2_slider_frage = array($form_box_shadow_color, $form_slider_frage_thumb_background_color, $form_slider_frage_thumb_background_color2);

    $new_json->af2_slider_frage_bullet = array($form_slider_frage_bullet_color);

    // 2.0.9.2
    $new_json->af2_question_label = array($form_contact_form_label_size, $form_contact_form_label_weight);

    $new_json->af2_submit_button = array($form_contact_form_button_color, $form_contact_form_button_size, $form_contact_form_button_weight, $form_contact_form_button_padding_top_bottom, $form_contact_form_button_border_radius, $form_contact_form_button_background_color);

    $new_json->af2_question_cb_label = array($form_contact_form_cb_size, $form_contact_form_cb_weight);

    $new_json->af2_form_loader = array($form_loader_color);


    $new_json->af2_datum_frage = array($form_box_shadow_color, $form_input_background_color,
        $form_text_input_size_desktop, $form_text_input_size_mobile, $form_text_input_weight, $form_text_input_line_height_desktop, $form_text_input_line_height_mobile,
        $form_text_input_border_radius);

    // datepicker styling
    $datepicker_header_backgroud = json_decode('{"attribute": "background-color","value":"' . $base_json->form_contact_form_button_background_color . '", "special_class":"af2_datepicker","sub_class":"ui-datepicker-title"}');
    $datepicker_header_color = json_decode('{"attribute": "color","value":"' . $base_json->form_contact_form_button_color . '", "special_class":"af2_datepicker","sub_class":"ui-datepicker-title"}');
    $new_json->af2_datepicker_header = array($datepicker_header_backgroud, $datepicker_header_color);


    $datepicker_active_backgroud = json_decode('{"attribute": "background-color","value":"' . $base_json->form_contact_form_button_background_color . '", "special_class":"af2_datepicker","sub_class":"ui-datepicker-current-day"}');
    $datepicker_active_color = json_decode('{"attribute": "color","value":"' . $base_json->form_contact_form_button_color . '", "special_class":"af2_datepicker","sub_class":"ui-state-active"}');
    $new_json->af2_datepicker_active = array($datepicker_active_backgroud, $datepicker_active_color);


    $datepicker_prev_background_color = json_decode('{"attribute": "background-color","value":"' . $base_json->form_contact_form_button_color . '", "special_class":"af2_datepicker","sub_class":"ui-datepicker-prev"}');
    $datepicker_next_background_color = json_decode('{"attribute": "background-color","value":"' . $base_json->form_contact_form_button_color . '", "special_class":"af2_datepicker","sub_class":"ui-datepicker-next"}');
    $new_json->af2_datepicker_buttons = array($datepicker_prev_background_color, $datepicker_next_background_color);

    //$new_json->af2_form_percentage 	= array( $buffer_main_background_color );
    /*     * }
      /** NEW VARIANT **
      else
      {
      //DO ANYTHING
      } */

    return $new_json;
}

/**
 * Returns the type of the Dataid
 *
 * -> element = Frage / Kontaktformular
 * -> redirect = redirect
 * -> interface = klicktipp / Deals and Projects / ...
 *
 * @param $dataid
 * @return string
 */
function af2_check_data_type($dataid) {
    return $dataid === null ? 'undefined' : ( is_numeric($dataid) ? 'element' :
            ( strpos($dataid, 'redirect') === false ? 'interface' : 'redirect' ) );
}

/**
 * Checking all input, that there is nothing bad in it
 * 	And returning the post, to reuse it.
 *
 * @param $dataid
 * @return string/post
 */
function af2_check_params_for_getting_content($dataid) {
    /** Validate the Content * */
    if (!is_numeric($dataid)) {
        return 'ERROR';
    }

    /** SQL CHECK * */
    if (af2_sql_check_it($dataid) === 'ERROR') {
        echo 'ERROR';
        die();
    }

    /** Getting the Post * */
    $base_post = get_post($dataid);

    /** Check that the post exists * */
    if ($base_post == null) {
        return 'ERROR';
    }

    /** Check that the post is really a Frage, a Kontaktformular, or a Formular * */
    $post_type = get_post_field('post_type', $base_post);             // Type of the Post

    if (( $post_type != 'af2_frage' ) && ( $post_type != 'af2_kontaktformular' ) && ( $post_type != 'af2_formular' )) {
        return 'ERROR';
    }

    return $base_post;
}

/**
 * Checking, if any error is given
 *
 * @param $json
 * @return string
 */
function af2_check_for_errors($json) {
    /*
     * INCOMING
     *
     * READING OUT OF DB
     */
    if ($json->error == true) {
        return 'ERROR';
    }
    return '';
}