<?php

class AF2_FrontendView {

    private $frontend_id = 0;

    /**
     * FrontendView constructor
     */
    public function __construct() {
        //...
    }

    /**
     * The function to generate the base construct of the frontend
     *
     * @param $atts
     * @return string
     */
    function af2_generate_frontend($atts) {
        $content = '';                         // Content to draw

        $loading_path = plugins_url(AF2_LOADING_GIF, AF2_PLUGIN);

        /** Fetching Data from the given "Formular" * */
        $dataid = $atts['id'];                                                            // The Dataid of the Formular
        $base_post = get_post($dataid);                                                   // The post of it out of DB
        $base_structure = get_post_field('post_content', $base_post);          // The json String
        $base_json = json_decode($base_structure);                                  // The json-Object of it

        if ($base_json != null) {
            $size = sizeof($base_json->sections);                  // The maximum amount of steps

            /** If there are special fields -> the size will be one less * */
            if (strpos($base_json->sections[$size - 1]->contents[0]->data, 'redirect:') !== false || strpos($base_json->sections[$size - 1]->contents[0]->data, 'dealsnprojects:') !== false || strpos($base_json->sections[$size - 1]->contents[0]->data, 'activecampaign:') !== false || strpos($base_json->sections[$size - 1]->contents[0]->data, 'klicktipp:') !== false
            ) {
                $size--;
            }

            /** Getting the Frontend-Title * */
            /*
             * INCOMING -> Build migration!
             * $fe_title = --> access_database -> get( $dataid ) -> get_frontend_name
             */
            $fe_title = $base_json->styling->fe_title;                 // Frontent-Title of Formular

            $loader_color = !empty($base_json->styling->form_loader_color) ? $base_json->styling->form_loader_color : 'rgba(0, 0, 0, 1)';

            /** Getting the Preload-Part * */
            /*
             * INCOMING -> Build migration!
             *
             */
            $preload = 2;

            /** Building Content * */
            $content .= '<div id="af2_form_' . $this->frontend_id . '" class="af2_form_wrapper"
								data-preload="' . $preload . '" data-size="' . $size . '" data-num="' . $this->frontend_id . '"
								data-did="' . $dataid . '">';

            $content .= '<div class="af2_loading_overlay">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:transparent;display:block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
 <g transform="translate(50 50)">  <g transform="translate(-19 -19) scale(0.6)"> <g transform="rotate(22.5612)">
<animateTransform attributeName="transform" type="rotate" values="0;45" keyTimes="0;1" dur="0.2s" begin="0s" repeatCount="indefinite"></animateTransform><path style="fill:' . $loader_color . '" d="M31.359972760794346 21.46047782418268 L38.431040572659825 28.531545636048154 L28.531545636048154 38.431040572659825 L21.46047782418268 31.359972760794346 A38 38 0 0 1 7.0000000000000036 37.3496987939662 L7.0000000000000036 37.3496987939662 L7.000000000000004 47.3496987939662 L-6.999999999999999 47.3496987939662 L-7 37.3496987939662 A38 38 0 0 1 -21.46047782418268 31.35997276079435 L-21.46047782418268 31.35997276079435 L-28.531545636048154 38.431040572659825 L-38.43104057265982 28.531545636048158 L-31.359972760794346 21.460477824182682 A38 38 0 0 1 -37.3496987939662 7.000000000000007 L-37.3496987939662 7.000000000000007 L-47.3496987939662 7.000000000000008 L-47.3496987939662 -6.9999999999999964 L-37.3496987939662 -6.999999999999997 A38 38 0 0 1 -31.35997276079435 -21.460477824182675 L-31.35997276079435 -21.460477824182675 L-38.431040572659825 -28.531545636048147 L-28.53154563604818 -38.4310405726598 L-21.4604778241827 -31.35997276079433 A38 38 0 0 1 -6.999999999999992 -37.3496987939662 L-6.999999999999992 -37.3496987939662 L-6.999999999999994 -47.3496987939662 L6.999999999999977 -47.3496987939662 L6.999999999999979 -37.3496987939662 A38 38 0 0 1 21.460477824182686 -31.359972760794342 L21.460477824182686 -31.359972760794342 L28.531545636048158 -38.43104057265982 L38.4310405726598 -28.53154563604818 L31.35997276079433 -21.4604778241827 A38 38 0 0 1 37.3496987939662 -6.999999999999995 L37.3496987939662 -6.999999999999995 L47.3496987939662 -6.999999999999997 L47.349698793966205 6.999999999999973 L37.349698793966205 6.999999999999976 A38 38 0 0 1 31.359972760794346 21.460477824182686 M0 -23A23 23 0 1 0 0 23 A23 23 0 1 0 0 -23" fill="#070707"></path></g></g> <g transform="translate(19 19) scale(0.6)"> <g transform="rotate(44.9388)">
<animateTransform attributeName="transform" type="rotate" values="45;0" keyTimes="0;1" dur="0.2s" begin="-0.1s" repeatCount="indefinite"></animateTransform><path style="fill:' . $loader_color . '" d="M-31.35997276079435 -21.460477824182675 L-38.431040572659825 -28.531545636048147 L-28.53154563604818 -38.4310405726598 L-21.4604778241827 -31.35997276079433 A38 38 0 0 1 -6.999999999999992 -37.3496987939662 L-6.999999999999992 -37.3496987939662 L-6.999999999999994 -47.3496987939662 L6.999999999999977 -47.3496987939662 L6.999999999999979 -37.3496987939662 A38 38 0 0 1 21.460477824182686 -31.359972760794342 L21.460477824182686 -31.359972760794342 L28.531545636048158 -38.43104057265982 L38.4310405726598 -28.53154563604818 L31.35997276079433 -21.4604778241827 A38 38 0 0 1 37.3496987939662 -6.999999999999995 L37.3496987939662 -6.999999999999995 L47.3496987939662 -6.999999999999997 L47.349698793966205 6.999999999999973 L37.349698793966205 6.999999999999976 A38 38 0 0 1 31.359972760794346 21.460477824182686 L31.359972760794346 21.460477824182686 L38.431040572659825 28.531545636048158 L28.53154563604818 38.4310405726598 L21.460477824182703 31.35997276079433 A38 38 0 0 1 6.9999999999999964 37.3496987939662 L6.9999999999999964 37.3496987939662 L6.999999999999995 47.3496987939662 L-7.000000000000009 47.3496987939662 L-7.000000000000007 37.3496987939662 A38 38 0 0 1 -21.46047782418263 31.359972760794385 L-21.46047782418263 31.359972760794385 L-28.531545636048097 38.43104057265987 L-38.431040572659796 28.531545636048186 L-31.35997276079433 21.460477824182703 A38 38 0 0 1 -37.34969879396619 7.000000000000032 L-37.34969879396619 7.000000000000032 L-47.34969879396619 7.0000000000000355 L-47.3496987939662 -7.000000000000002 L-37.3496987939662 -7.000000000000005 A38 38 0 0 1 -31.359972760794346 -21.46047782418268 M0 -23A23 23 0 1 0 0 23 A23 23 0 1 0 0 -23" fill="#000000"></path></g></g></g>
</svg>
                        </div>';

            $content .= '<div class="af2_form" style="display: none;">';
            $content .= '<div class="af2_form_heading_wrapper">';
            $content .= '<h3 class="af2_form_heading desktop">' . $fe_title . '</h3>';
            $content .= '<h3 class="af2_form_heading af2_mobile">' . $fe_title . '</h3>';
            $content .= '</div>';
            $content .= '<div class="af2_form_carousel">';
            $content .= '</div>';
            $content .= '<div class="af2_form_bottombar">';
            $content .= '<button class="af2_form_back_button af2_form_button af2_disabled af2_mobile"><i class="fas fa-long-arrow-alt-left fa-lg">';
            $content .= '</i></button>';
            $content .= '<button class="af2_form_back_button af2_form_button af2_disabled desktop"><i class="fas fa-long-arrow-alt-left fa-lg">';
            $content .= '</i></button>';
            //$content .= '<div class="af2_form_progress_bar_wrapper">';
            $content .= '<div class="af2_form_progress_bar"><div class="af2_form_progress"></div></div>';
            //$content .= '<div class="af2_form_percentage_triangle"></div>';
            //$content .= '<div class="af2_form_percentage">0%</div>';
            //$content .= '</div>';
            $content .= '<button class="af2_form_foward_button af2_form_button af2_disabled af2_mobile"><i class="fas fa-long-arrow-alt-right fa-lg">';
            $content .= '</i></button>';
            $content .= '<button class="af2_form_foward_button af2_form_button af2_disabled desktop"><i class="fas fa-long-arrow-alt-right fa-lg">';
            $content .= '</i></button>';
            $content .= '</div>';
            $content .= '</div>';
            
            $af2_branding = get_option('af2_branding');
            if(!empty($af2_branding)){
                $content .= '<div class="af2_powered_by"><span>Powered by <a href="https://anfrageformular.com/" target="_blank" rel="nofollow">Anfrageformular</a></span> </div>';
            }
            
            $content .= '</div>';

            // Update the Impressions in the Database
            update_option('af2_impressions', intval(get_option('af2_impressions')) + 1);
        }
        /** RETURNING * */
        $this->frontend_id++;
        return $content;
    }

    /**
     * Getting all data for the frontend to work with
     */
    function af2_get_data() {
        if (!( check_ajax_referer('af2_FE_nonce', '_ajax_nonce') )) {
            echo 'ERROR';
            die();
        }

        /** Check that all attributes are sent * */
        if (!isset($_GET['ids'])) {
            echo 'ERROR';
            die();
        }

        /** Get all attributes * */
        $dataids = !empty($_GET['ids'])?array_map('absint',$_GET['ids']):array();                      // The Array of Dataids

        /** Checking for bad input and fetching posts * */
        $base_posts = array();                       // The post of it out of DB
        $x = 0;                           // Loop
        foreach ($dataids as $dataid) {
            if (af2_sql_check_it($dataid) === 'ERROR') {
                echo 'ERROR';
                die();
            }

            $base_posts[$x] = $this->af2_check_params_for_getting_content($dataid);

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
            $check = $this->af2_check_for_errors($base_jsons[$x]);
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
                        $new_jsons->$data = $this->af2_clean_frage_json($base_jsons[$x]);
                        break;
                    }
                case 'af2_kontaktformular': {
                        $new_jsons->$data = $this->af2_clean_kontaktformular_json($base_jsons[$x]);
                        break;
                    }
                case 'af2_formular': {
                        $new_jsons->$data = $this->af2_clean_formular_json($base_jsons[$x]);
                        break;
                    }
            }

            $x++;
        }

        $jsons = json_encode($new_jsons, JSON_UNESCAPED_UNICODE);              // Json to return

        echo $jsons;
        wp_die();
    }

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
        $new_json->type_specifics = $this->af2_process_type_specifics($base_json);
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
        $new_json->sections = $this->af2_process_connections($base_json->sections);/** TODO ERRORS * */
        $new_json->styling = $this->af2_process_styling($base_json->styling);/** TODO ERRORS * */
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
                if ($this->af2_check_data_type($content->data) === 'interface') {
                    /** SAFE THE OTHER ONES * */
                    /** Iterating all Contents * */
                    for ($z = sizeof($section->contents) - 1; $z >= 0; $z--) {
                        if ($z > $y) {
                            if ($this->af2_check_data_type($base_array[$x]->contents[$z]) === 'redirect') {
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
                    if ($this->af2_check_data_type($to_dataid) === 'undefined') {
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
                    $new_json->answers = $this->af2_process_answers($base_json->answers);
                    break;
                }
            case 'af2_multiselect': {
                    $new_json->answers = $this->af2_process_answers($base_json->answers);
                    $new_json->condition = $base_json->condition;
                    break;
                }
            case 'af2_textfeld': {
                    $new_json->placeholder = $base_json->textfeld;
                    $new_json->mandatory = $base_json->textfield_mandatory;
                    break;
                }
            case 'af2_textbereich': {
                    $new_json->placeholder = $base_json->textarea;
                    $new_json->mandatory = $base_json->textarea_mandatory;
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
     * INCOMING -> DELEt´TEABLE METHOD, WHEN ITS DONE IN BACKEND PERFECTLY
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
        /* // Main Color of the whole Formular
          $buffer_main_color 				= json_decode( '{"attribute": "color",
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
          "value":"'.$base_json->main_color.'"}' ); */


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

        $form_box_shadow_color = json_decode('{"attribute": "box-shadow","value":" 0 0 6px ' . $base_json->form_box_shadow_color . '", "special_state":"focus"}');

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
								 						 	"value":"' . $base_json->form_text_input_text_weight . '"}');
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
																		"value":"0 ' . $base_json->form_contact_form_input_padding_left_right . 'px"}');

        /** Append them into the json * */
        $new_json->af2_answer_card = array($form_answer_card_icon_color, $form_answer_card_background_color,
            $form_answer_card_border_radius);
        $new_json->af2_form_heading = array($form_heading_color,
            $form_heading_size_desktop, $form_heading_size_mobile, $form_heading_weight, $form_heading_line_height_desktop, $form_heading_line_height_mobile);
        $new_json->af2_question_heading = array($form_question_heading_color,
            $form_question_heading_size_desktop, $form_question_heading_size_mobile, $form_question_heading_weight, $form_question_heading_line_height_desktop, $form_question_heading_line_height_mobile);
        $new_json->af2_question_description = array($form_question_description_color,
            $form_question_description_size_desktop, $form_question_description_size_mobile, $form_question_description_weight, $form_question_description_line_height_desktop, $form_question_description_line_height_mobile);
        $new_json->af2_answer_text = array($form_answer_card_text_color,
            $form_answer_card_text_size_desktop, $form_answer_card_text_size_mobile, $form_answer_card_text_weight, $form_answer_card_text_line_height_desktop, $form_answer_card_text_line_height_mobile);
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

        $new_json->af2_text_type = array($form_contact_form_input_padding_left_right, $form_box_shadow_color, $form_border_color, $form_input_background_color, $form_contact_form_input_size, $form_contact_form_input_weight, $form_contact_form_input_height, $form_contact_form_input_border_radius);
        $new_json->af2_slider_frage = array($form_box_shadow_color, $form_slider_frage_thumb_background_color, $form_slider_frage_thumb_background_color2);
        $new_json->af2_slider_frage_bullet = array($form_slider_frage_bullet_color);

        // 2.0.9.2
        $new_json->af2_question_label = array($form_contact_form_label_size, $form_contact_form_label_weight);
        $new_json->af2_submit_button = array($form_contact_form_button_color, $form_contact_form_button_size, $form_contact_form_button_weight, $form_contact_form_button_padding_top_bottom, $form_contact_form_button_border_radius, $form_contact_form_button_background_color);
        $new_json->af2_question_cb_label = array($form_contact_form_cb_size, $form_contact_form_cb_weight);

        // 2.1.2
        $new_json->af2_form_loader = array($form_loader_color);

        //$new_json->af2_form_percentage 	= array( $buffer_main_background_color );
        /*         * }
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
    private function af2_check_data_type($dataid) {
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
    private function af2_check_params_for_getting_content($dataid) {
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
    private function af2_check_for_errors($json) {
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

}

$frontend_view = new AF2_FrontendView();

add_shortcode('anfrageformular2', array($frontend_view, 'af2_generate_frontend'));/** SHORTCODE -> Generate Frontend */
add_action('wp_ajax_nopriv_af2_request_data', array($frontend_view, 'af2_get_data'));/** ACTION -> Getting Data */
add_action('wp_ajax_af2_request_data', array($frontend_view, 'af2_get_data'));

/**
 * Load all Resources needed for the frontend
 */
function af2_load_frontend_resources() {
    /**
     * TODO final paths, to easy rearrange the structure!
     */
    wp_enqueue_style('font-awesome_min', 'https://use.fontawesome.com/releases/v5.11.2/css/all.css');  // Fontawesome
    // wp_enqueue_style('jquery-ui', '//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');  // Fontawesome
    wp_enqueue_script('jquery-ui-datepicker');

    wp_enqueue_style('af2_frontend_css', // Frontend Stylesheet
            plugins_url('res/frontend/styles/af2_frontendcss.css', AF2_PLUGIN), array(), '2.1.1');
    wp_register_script('af2_frontend_js', // Frontend Script
            plugins_url('res/frontend/scripts/af2_frontendjs.js', AF2_PLUGIN), array('jquery'), '2.1.1');   // Needs JQuery to work

    wp_localize_script('af2_frontend_js', 'af2_frontend_ajax', // Localizing the Script to use ajax loading
            array('ajax_url' => admin_url('admin-ajax.php'), 'nonce' => wp_create_nonce('af2_FE_nonce')
    ));

    wp_enqueue_script('af2_frontend_js');
}

add_action('wp_enqueue_scripts', 'af2_load_frontend_resources');/** ACTION -> Load the Resources for the Frontend on Script enqueueing */

/**
 * Function to do a check, if an sql injection is getting done;
 *
 * @param $var
 * @return string
 */
function af2_sql_check_it($var) {
    if (is_array($var)) {
        foreach ($var as $el) {
            if (af2_sql_check_it($el) === 'ERROR') {
                return 'ERROR';
            }
        }

        return '';
    }
    if (strpos(strtolower(strval($var)), 'select') !== false) {
        return 'ERROR';
    } else if (strpos(strtolower(strval($var)), 'update') !== false) {
        return 'ERROR';
    } else if (strpos(strtolower(strval($var)), 'insert') !== false) {
        return 'ERROR';
    } else if (strpos(strtolower(strval($var)), 'drop') !== false) {
        return 'ERROR';
    } else if (strpos(strtolower(strval($var)), 'delete') !== false) {
        return 'ERROR';
    }

    return '';
}

function af2_sanitize_answers($ans){
    if(is_array($ans)){
       foreach ( $ans as &$value ) {
           $value = af2_sanitize_answers($value);
       }
    }else{
       $ans = sanitize_text_field($ans);
    }
    return $ans;
}

function af2_send_mail() {
    if (!( check_ajax_referer('af2_FE_nonce', '_ajax_nonce') )) {
        die();
    }

    $sec = sanitize_key($_GET['sec']);
    $cont = sanitize_key($_GET['cont']);
    $dataid = sanitize_key($_GET['dataid']);
    $answers = array_map('af2_sanitize_answers',$_GET['answers']);
 
    // SQL CHECKS
    $var = af2_sql_check_it($sec);
    $var2 = af2_sql_check_it($cont);
    $var3 = af2_sql_check_it($dataid);
    $var4 = af2_sql_check_it($answers);

    if ($var === 'ERROR' || $var2 === 'ERROR' || $var3 === 'ERROR' || $var4 === 'ERROR') {
        echo 'ERROR';
        die();
    }

    // VALIDATE THE NUMERICS
    if (!(is_numeric($sec) && is_numeric($cont) && is_numeric($dataid) )) {
        echo 'ERROR';
        die();
    } else {
        $base_post_structure = get_post($dataid);
        $structure_base_json = get_post_field('post_content', $base_post_structure);
        $jsonm = json_decode($structure_base_json);

        $formular_id = $dataid;

        // CHECKING THAT POST IS A FORMULAR
        if ($base_post_structure == null) {
            echo 'ERROR';
            die();
        }
        if (get_post_field('post_type', $base_post_structure) != 'af2_formular') {
            echo 'ERROR';
            die();
        }

        $form_id = $jsonm->sections[$sec]->contents[$cont]->data;
        $form_post = get_post($form_id);
        $form_content = json_decode(get_post_field('post_content', $form_post));


        $i = 0;
        foreach ($answers as $answer) {
            if ($i < sizeof($answers) - 1) {
                if (is_array($answer)) {
                    foreach ($answer as $a) {
                        if (!is_numeric($a)) {
                            echo 'ERROR';
                            die();
                        }
                    }
                }
            } else {
                // VALIDATING CONTACT FORM CONTENTS
                // VALIDATING REQUIREDS

                $form_questions = $form_content->questions;
                $answer_block = $answers[sizeof($answers) - 1];
                $x = 0;
                foreach ($form_questions as $form_question) {
                    if ($form_question->required == true) {
                        if (is_numeric(strpos($form_question->typ, 'text_type_'))) {
                            if (trim($answer_block[$x]) == '') {
                                echo '<div class="af2_response_error" data-id="' . $x . '">Dieses Feld ist ein Pflichtfeld.</div>';

                                die();
                            }
                        } else {
                            if (strval($answer_block[$x]) == 'false') {
                                echo '<div class="af2_response_error" data-id="' . $x . '">Sie müssen die Checkbox aktivieren!</div>';

                                die();
                            }
                        }
                    }

                    //VALIDATE PHONE
                    if ($form_question->typ == 'text_type_phone') {
                        if (!filter_var($answer_block[$x], FILTER_SANITIZE_NUMBER_INT) && trim($answer_block[$x]) != '') {
                            echo '<div class="af2_response_error" data-id="' . $x . '">Geben Sie eine gültige Telefonnummer an!</div>';

                            die();
                        }
                    }

                    //VALIDATE EMAIL
                    if ($form_question->typ == 'text_type_mail') {
                        if (!filter_var($answer_block[$x], FILTER_VALIDATE_EMAIL) && trim($answer_block[$x]) != '') {
                            echo '<div class="af2_response_error" data-id="' . $x . '">Geben Sie eine gültige E-Mail Adresse an!</div>';

                            die();
                        }
                    }

                    $x++;
                }
            }

            $i++;
        }

        // BUILD UP ANSWERS AND PROECESS
        $m_answers = '';
        $m_answers = af2_create_answers($m_answers, 0, 0, 0, $answers, $jsonm);

        $zapier_json = json_decode('{"form_id":"' . $formular_id . '", "questions":[], "contact_form":[]}');
        $zapier_json = af2_create_answers_json($zapier_json, 0, 0, 0, $answers, $jsonm, -1);
        /**
         * WICHTIG: ER MUSS HIER NUN WIE BEI FRAGEN VORGEHEN UND DIE ANTWORTEN MATCHEN UND REINPACKEN!
         */
        $zapier_json = af2_create_cf_json($zapier_json, $answers[sizeof($answers) - 1], $form_content);

        //finished zapier_json
        // CHECK FOR DNP INTERACE
        // BUILDING UP DNP INTERFACE
        // CHECK FOR REDIRECT
        // BUILD UP REDIRECT
        $redirect = 'false';
        $blank = 'false';
        $dnp_do = 'false';
        $dnp_mail = 'false';
        $dnp_telefon = 'false';
        $dnp_name = 'false';
        $dnp_organisation = 'false';
        $dnp_vorname = 'false';
        $dnp_stadt = 'false';
        $dnp_plz = 'false';
        $dnp_strasse = 'false';
        $dnp_bezeichnung = 'false';
        $contact_create = 'false';
        $deal_create = 'false';

        $ac_do = 'false';
        $ac_mail = 'false';
        $ac_telefon = 'false';
        $ac_name = 'false';
        $ac_vorname = 'false';
        $ac_liste = 'false';

        $klicktipp_mail = 'false';
        $klicktipp_name = 'false';
        $klicktipp_vorname = 'false';
        $klicktipp_telefon = 'false';
        $klicktipp_firma = 'false';
        $klicktipp_tag = 'false';
        $klicktipp_process = 'false';
        $klicktipp_do = 'false';

        $conns = $jsonm->sections[$sec]->contents[$cont]->connections;
        foreach ($conns as $conn) {
            $to_sec = $conn->to_section;
            $to_cont = $conn->to_content;

            $dat = $jsonm->sections[$to_sec]->contents[$to_cont]->data;
            if (strpos($dat, 'redirect:') !== false) {
                $redirect = $dat;
                $blank = strval($jsonm->sections[$to_sec]->contents[$to_cont]->newtab);
            }
        }

        // SAVE DATA
        /**
          $save_json = json_decode('{"questions":[]}');
          $save_json = af2_save_contact( $save_json, 0, 0, 0, $answers, $jsonm );
          $save_json = json_encode( $save_json, JSON_UNESCAPED_UNICODE ); */
        $save_json = json_encode($zapier_json, JSON_UNESCAPED_UNICODE);

        wp_insert_post(array('post_content' => $save_json, 'post_type' => 'af2_request', 'post_status' => 'privat'));

        // CHECK FOR MAIL
        // BUILD UP MAIL
        $mailto = $form_content->mailto;
        $mailfrom = $form_content->mailfrom;
        $mailsubject = $form_content->mailsubject;
        $mailtext = $form_content->mailtext;
        $mailfrom_name = $form_content->mailfrom_name;
        $mailcc = $form_content->mailcc;
        $mailbcc = $form_content->mailbcc;

        $use_autoresponder = $form_content->use_autorespond;
        $autoresponder_field = '';
        $autoresponder_text = '';
        $autoresponder_subject = '';

        if ($use_autoresponder === true || $use_autoresponder === 'true') {
            $autoresponder_field = $form_content->autoresponder_field;
            $autoresponder_text = $form_content->autoresponder_nachricht;
            $autoresponder_text = str_replace('[antworten]', $m_answers, $autoresponder_text);
            $autoresponder_subject = $form_content->autoresponder_subject;
        }

        $mailtext = str_replace('[antworten]', $m_answers, $mailtext);


        $smtp_do = $form_content->use_smtp;
        $wp_mail_do = $form_content->use_wp_mail;

        $smtp_host = '';
        $smtp_username = '';
        $smtp_password = '';
        $smtp_port = '';
        $smtp_from_name = '';
        $smtp_type = '';

        if ($smtp_do === true || $smtp_do === 'true') {
            $smtp_host = $form_content->smtp_host;
            $smtp_username = $form_content->smtp_username;
            $smtp_password = $form_content->smtp_password;
            $smtp_port = $form_content->smtp_port;
            $smtp_type = $form_content->smtp_type;
        }

        if ($smtp_host === '' || $smtp_username === '' || $smtp_password === '' || $smtp_port === '' || $smtp_type === '') {
            $smtp_do = false;
        }

        $autoresponder_to = '';

        $x = 0;
        foreach ($form_questions as $form_question) {
            $mailtext = str_replace('[' . $form_question->id . ']', $answer_block[$x], $mailtext);

            if ($use_autoresponder === true || $use_autoresponder === 'true') {
                if ('[' . $form_question->id . ']' === $autoresponder_field) {
                    $autoresponder_to = $answer_block[$x];
                }
                $autoresponder_text = str_replace('[' . $form_question->id . ']', $answer_block[$x], $autoresponder_text);
            }

            $x++;
        }

        $headers = 'From: ' . $mailfrom_name . ' <' . $mailfrom . '>' . "\r\n";
        $headers .= 'CC: ' . $mailcc . "\r\n";
        $headers .= 'BCC: ' . $mailbcc . "\r\n";

        //check if the email address is invalid $secure_check
        $secure_check = af2_sanitize_my_email($mailfrom);
        if ($secure_check == false) {
            echo '<div class="af2_response_error">Es sind Fehler aufgetreten!</div>';

            die();
        } else { // SEND EMAIL
            $messag = 'Eine E-Mail wurde versendet!';

            if ($smtp_do === true || $smtp_do === 'true') {
                $cc_list = explode(',', $mailcc);
                $bcc_list = explode(',', $mailbcc);
                $res = af2_smtp_mail($smtp_host, $smtp_username, $smtp_password, $smtp_port, $smtp_type, $mailto, $mailfrom, $mailfrom_name, $mailsubject, $mailtext, $cc_list, $bcc_list);

                if ($res->status != 'Success') {
                    $messag = 'Es sind Fehler aufgetreten.';
                }
            } else {

                if ($wp_mail_do === true || $wp_mail_do === 'true') {
                    $m = wp_mail($mailto, $mailsubject, $mailtext, $headers);
                } else {
                    $m = mail($mailto, $mailsubject, $mailtext, $headers);
                }
            }

            if ($use_autoresponder === true || $use_autoresponder === 'true') {
                if ($smtp_do === true || $smtp_do === 'true') {
                    $res = af2_smtp_mail2($smtp_host, $smtp_username, $smtp_password, $smtp_port, $smtp_type, $autoresponder_to, $mailfrom, $mailfrom_name, $autoresponder_subject, $autoresponder_text);

                    if ($res->status != 'Success') {
                        $messag = 'Es sind Fehler aufgetreten!';
                    }
                } else {
                    $autoresponder_headers = 'From: ' . $mailfrom_name . ' <' . $mailfrom . '>';
                    $m = mail($autoresponder_to, $autoresponder_subject, $autoresponder_text, $autoresponder_headers);
                }
            }
            
            echo '<div class="af2_response_success" data-redirect="' . $redirect . '" data-bl="' . $blank . '">' . $messag . '</div>';
            die();
        }
    }

    wp_die();
}

function af2_save_contact($save_json, $section, $content, $answers, $answer_block, $jsonm) {
    $sel = $jsonm->sections[$section]->contents[$content];
    $post_cont = get_post($sel->data);
    $post_json = json_decode(get_post_field('post_content', $post_cont));
    if ($post_json->error == false) {
        if ($post_json->answers != null) {
            $save_json->questions[$answers]->name = $post_json->name;
            $save_json->questions[$answers]->answers = [];
            if ($post_json->typ == 'af2_select') {
                $save_json->questions[$answers]->answers[0]->text = $post_json->answers[$answer_block[$answers]]->text;
            } else {
                $i = 0;
                foreach ($answer_block[$answers] as $ans) {
                    $save_json->questions[$answers]->answers[$i]->text = $post_json->answers[$ans]->text . "\n";
                    $i++;
                }
            }
        }

        if ($answers == sizeof($answer_block) - 2) {
            return $save_json;
        } else {
            $pos = false;
            $sec = false;
            $cont = false;
            if ($post_json->typ == 'af2_select') {
                $conns = $jsonm->sections[$section]->contents[$content]->connections;

                for ($i = 0; $i < sizeof($conns); $i++) {
                    if (strval($conns[$i]->from) == strval($answer_block[$answers])) {
                        $sec = $conns[$i]->to_section;
                        $cont = $conns[$i]->to_content;
                    } else if ($conns[$i]->from == '-1' || $conns[$i]->from == -1) {
                        $pos = $i;
                    }
                }

                if ($sec == false) {
                    $sec = $conns[$pos]->to_section;
                    $cont = $conns[$pos]->to_content;
                }
            } else {
                $sec = $jsonm->sections[$section]->contents[$content]->connections[0]->to_section;
                $cont = $jsonm->sections[$section]->contents[$content]->connections[0]->to_content;
            }

            return af2_save_contact($save_json, $sec, $cont, $answers + 1, $answer_block, $jsonm);
        }
    } else {
        echo '<div class="af2_response_error">Ein Fehler ist aufgetreten!</div>';
        die();
    }
}

function af2_create_cf_json($zapier_json, $array, $cf_json) {
    $i = 0;

    foreach ($array as $answer) {
        $zapier_json->contact_form[$i] = json_decode('{"id":"", "input":""}');
        $zapier_json->contact_form[$i]->id = $cf_json->questions[$i]->id;
        $zapier_json->contact_form[$i]->input = $answer;

        $i++;
    }

    return $zapier_json;
}

function af2_create_answers_json($answer_text, $section, $content, $answers, $answer_block, $jsonm, $z) {
    $z++;
    $sel = $jsonm->sections[$section]->contents[$content];
    $post_cont = get_post($sel->data);
    $post_json = json_decode(get_post_field('post_content', $post_cont));
    if ($post_json->error == false) {
        /**
         * ER MUSS ERKENNEN, OB FRAGE ODER KONTAKTFORMULAR -> TRIGGERT NUR BEI FRAGE
         */
        if (!isset($post_json->use_autorespond)) {
            if ($post_json->typ == 'af2_select') {
                $answer_text->questions[$z] = json_decode('{"frage":"", "antwort":""}');
                $answer_text->questions[$z]->frage = strip_tags($post_json->name);
                $answer_text->questions[$z]->antwort = $post_json->answers[$answer_block[$answers]]->text;
            } else if ($post_json->typ == 'af2_textfeld') {
                $answer_text->questions[$z] = json_decode('{"frage":"", "antwort":""}');
                $answer_text->questions[$z]->frage = strip_tags($post_json->name);
                $answer_text->questions[$z]->antwort = $answer_block[$answers];
            } else if ($post_json->typ == 'af2_textbereich') {
                $answer_text->questions[$z] = json_decode('{"frage":"", "antwort":""}');
                $answer_text->questions[$z]->frage = strip_tags($post_json->name);
                $ans = str_replace("\n", "<br>", $answer_block[$answers]);
                $answer_text->questions[$z]->antwort = $ans;
            } else if ($post_json->typ == 'af2_datum') {
                $answer_text->questions[$z] = json_decode('{"frage":"", "antwort":""}');
                $answer_text->questions[$z]->frage = strip_tags($post_json->name);
                $answer_text->questions[$z]->antwort = $answer_block[$answers];
            } else if ($post_json->typ == 'af2_slider') {
                $answer_text->questions[$z] = json_decode('{"frage":"", "antwort":""}');
                $answer_text->questions[$z]->frage = strip_tags($post_json->name);
                $answer_text->questions[$z]->antwort = $answer_block[$answers];
            } else if ($post_json->typ == 'af2_content') {
                
            } else if ($post_json->typ == 'af2_multiselect') {
                $answer_text->questions[$z] = $answer_text->questions[$z] = json_decode('{"frage":"", "antwort":[]}');
                $answer_text->questions[$z]->frage = strip_tags($post_json->name);
                $y = 0;
                foreach ($answer_block[$answers] as $ans) {
                    array_push($answer_text->questions[$z]->antwort, $post_json->answers[$ans]->text);
                    $y++;
                }
            }
        }
        if ($answers == sizeof($answer_block) - 2) {
            return $answer_text;
        } else {
            $pos = false;
            $sec = false;
            $cont = false;
            if ($post_json->typ == 'af2_select') {
                $conns = $jsonm->sections[$section]->contents[$content]->connections;

                for ($i = 0; $i < sizeof($conns); $i++) {
                    if (strval($conns[$i]->from) == strval($answer_block[$answers])) {
                        $sec = $conns[$i]->to_section;
                        $cont = $conns[$i]->to_content;
                    } else if ($conns[$i]->from == '-1' || $conns[$i]->from == -1) {
                        $pos = $i;
                    }
                }

                if ($sec == false) {
                    $sec = $conns[$pos]->to_section;
                    $cont = $conns[$pos]->to_content;
                }
            }
            //Slider conditions
            else if ($post_json->typ == 'af2_slider') {
                $conns = $jsonm->sections[$section]->contents[$content]->connections; //Getting connections
                //Loop through all connections
                for ($i = 0; $i < sizeof($conns); $i++) {
                    if (strval($conns[$i]->from) == '-1') {    //Allgemein - SET
                        if ($sec === false) {                    //If nothing else found until yet
                            //Set contents
                            $sec = $conns[$i]->to_section;
                            $cont = $conns[$i]->to_content;
                            continue;
                        }
                    }



                    //Check that they are defined
                    if (isset($conns[$i]->operator) && isset($conns[$i]->value)) {
                        //Get Operators and values
                        $operator = $conns[$i]->operator;
                        $value = $conns[$i]->value;
                        //Switch the operator and fill all cases
                        switch ($operator) {
                            case '<': {
                                    if (intval($answer_block[$answers]) < intval($value)) {
                                        $sec = $conns[$i]->to_section;
                                        $cont = $conns[$i]->to_content;
                                    }
                                    break;
                                }
                            case '>': {
                                    if (intval($answer_block[$answers]) > intval($value)) {
                                        $sec = $conns[$i]->to_section;
                                        $cont = $conns[$i]->to_content;
                                    }
                                    break;
                                }
                            case '=': {
                                    if (intval($answer_block[$answers]) == intval($value)) {
                                        $sec = $conns[$i]->to_section;
                                        $cont = $conns[$i]->to_content;
                                    }
                                    break;
                                }
                        }
                    }
                }
            } else {
                $sec = $jsonm->sections[$section]->contents[$content]->connections[0]->to_section;
                $cont = $jsonm->sections[$section]->contents[$content]->connections[0]->to_content;
            }

            return af2_create_answers_json($answer_text, $sec, $cont, $answers + 1, $answer_block, $jsonm, $z);
        }
    } else {
        echo '<div class="af2_response_error">Ein Fehler ist aufgetreten!</div>';
        die();
    }
}

function af2_create_answers($answer_text, $section, $content, $answers, $answer_block, $jsonm) {
    $sel = $jsonm->sections[$section]->contents[$content];
    $post_cont = get_post($sel->data);
    $post_json = json_decode(get_post_field('post_content', $post_cont));
    /**
     * TO DO CHECK FOR CF
     */
    if ($post_json->error == false) {
        if (!isset($post_json->use_autorespond)) {
            $answer_text .= $post_json->name . "\n";
            if ($post_json->typ == 'af2_select') {
                $answer_text .= $post_json->answers[$answer_block[$answers]]->text . "\n";
            } else if ($post_json->typ == 'af2_textfeld') {
                $answer_text .= $answer_block[$answers] . "\n";
            } else if ($post_json->typ == 'af2_textbereich') {
                $answer_text .= $answer_block[$answers] . "\n";
            } else if ($post_json->typ == 'af2_datum') {
                $answer_text .= $answer_block[$answers] . "\n";
            } else if ($post_json->typ == 'af2_slider') {
                $answer_text .= $answer_block[$answers] . "\n";
            } else if ($post_json->typ == 'af2_content') {
                
            } else if ($post_json->typ == 'af2_multiselect') {
                foreach ($answer_block[$answers] as $ans) {
                    $answer_text .= $post_json->answers[$ans]->text . "\n";
                }
            }
        }
        $answer_text .= "\n";

        if ($answers == sizeof($answer_block) - 2) {
            return $answer_text;
        } else {
            $pos = false;
            $sec = false;
            $cont = false;
            if ($post_json->typ == 'af2_select') {
                $conns = $jsonm->sections[$section]->contents[$content]->connections;

                for ($i = 0; $i < sizeof($conns); $i++) {
                    if (strval($conns[$i]->from) == strval($answer_block[$answers])) {
                        $sec = $conns[$i]->to_section;
                        $cont = $conns[$i]->to_content;
                    } else if ($conns[$i]->from == '-1' || $conns[$i]->from == -1) {
                        $pos = $i;
                    }
                }

                if ($sec == false) {
                    $sec = $conns[$pos]->to_section;
                    $cont = $conns[$pos]->to_content;
                }
            }
            //Slider conditions
            else if ($post_json->typ == 'af2_slider') {
                $conns = $jsonm->sections[$section]->contents[$content]->connections; //Getting connections
                //Loop through all connections
                for ($i = 0; $i < sizeof($conns); $i++) {
                    if (strval($conns[$i]->from) == '-1') { //Allgemein - SET
                        if ($sec === false) {     //If nothing else found until yet
                            //Set contents
                            $sec = $conns[$i]->to_section;
                            $cont = $conns[$i]->to_content;
                            continue;
                        }
                    }



                    //Check that they are defined
                    if (isset($conns[$i]->operator) && isset($conns[$i]->value)) {
                        //Get Operators and values
                        $operator = $conns[$i]->operator;
                        $value = $conns[$i]->value;
                        //Switch the operator and fill all cases
                        switch ($operator) {
                            case '<': {
                                    if (intval($answer_block[$answers]) < intval($value)) {
                                        $sec = $conns[$i]->to_section;
                                        $cont = $conns[$i]->to_content;
                                    }
                                    break;
                                }
                            case '>': {
                                    if (intval($answer_block[$answers]) > intval($value)) {
                                        $sec = $conns[$i]->to_section;
                                        $cont = $conns[$i]->to_content;
                                    }
                                    break;
                                }
                            case '=': {
                                    if (intval($answer_block[$answers]) == intval($value)) {
                                        $sec = $conns[$i]->to_section;
                                        $cont = $conns[$i]->to_content;
                                    }
                                    break;
                                }
                        }
                    }
                }
            } else {
                $sec = $jsonm->sections[$section]->contents[$content]->connections[0]->to_section;
                $cont = $jsonm->sections[$section]->contents[$content]->connections[0]->to_content;
            }

            return af2_create_answers($answer_text, $sec, $cont, $answers + 1, $answer_block, $jsonm);
        }
    } else {
        echo '<div class="af2_response_error">Ein Fehler ist aufgetreten!</div>';
        die();
    }
}

function af2_sanitize_my_email($field) {
    $field = filter_var($field, FILTER_SANITIZE_EMAIL);
    if (filter_var($field, FILTER_VALIDATE_EMAIL)) {
        return true;
    } else {
        return false;
    }
}

add_action('wp_ajax_nopriv_af2_send_mail', 'af2_send_mail');
add_action('wp_ajax_af2_send_mail', 'af2_send_mail');

function af2_smtp_mail($host, $user, $password, $port, $type, $to, $from, $from_nam, $subject, $body, $cc, $bcc) {
   
    $errors = '';

    //$swpsmtp_options = get_option('twm_smtp_options');

    require_once( ABSPATH . WPINC . '/class-phpmailer.php' );
    $mail = new \PHPMailer();

    $charset = get_bloginfo('charset');
    $mail->CharSet = $charset;
    $mail->Timeout = 10;

    $from_name = $from_nam;
    $from_email = $from;

    $mail->IsSMTP();

    $mail->SMTPAuth = true;
    $mail->Username = $user;
    $mail->Password = $password;

    $mail->SMTPSecure = $type;

    /* PHPMailer 5.2.10 introduced this option. However, this might cause issues if the server is advertising TLS with an invalid certificate. */
    $mail->SMTPAutoTLS = false;

    /* Set the other options */
    $mail->Host = $host;
    $mail->Port = $port;

    $mail->SetFrom($from_email, $from_name);
    $mail->isHTML(false);
    $mail->Subject = $subject;
    //$mail->MsgHTML($body);
    $mail->Body = $body;
    $mail->AddAddress($to);

    foreach ($cc as $c) {
        $c = trim($c);

        $mail->addCC($c);
    }

    foreach ($bcc as $bc) {
        $bc = trim($bc);

        $mail->addBCC($bc);
    }

    global $debugMSG;
    $debugMSG = '';
    $mail->Debugoutput = function($str, $level) {
        global $debugMSG;
        $debugMSG .= $str;
    };
    $mail->SMTPDebug = 4;

    /* Send mail and return result */

    //$error = $mail->Send();

    if (!$mail->Send())
        $errors = $mail->ErrorInfo;

    $mail->ClearAddresses();
    $mail->ClearAllRecipients();
    $mail->clearCCs();
    $mail->clearBCCs();

    $cl = new \stdClass();
    $cl->debug = $debugMSG;

    if (!empty($errors)) {
        $cl->msg = $errors;
        $cl->status = 'Fail';
    } else {
        $cl->msg = 'Test mail was sent';
        $cl->status = 'Success';
    }

    return $cl;

    //return $error;
}

function af2_smtp_mail2($host, $user, $password, $port, $type, $to, $from, $from_nam, $subject, $body) {
    
    $errors = '';

    //$swpsmtp_options = get_option('twm_smtp_options');

    require_once( ABSPATH . WPINC . '/class-phpmailer.php' );
    $mail = new \PHPMailer();

    $charset = get_bloginfo('charset');
    $mail->CharSet = $charset;
    $mail->Timeout = 10;

    $from_name = $from_nam;
    $from_email = $from;

    $mail->IsSMTP();

    $mail->SMTPAuth = true;
    $mail->Username = $user;
    $mail->Password = $password;

    $mail->SMTPSecure = $type;

    /* PHPMailer 5.2.10 introduced this option. However, this might cause issues if the server is advertising TLS with an invalid certificate. */
    $mail->SMTPAutoTLS = false;

    /* Set the other options */
    $mail->Host = $host;
    $mail->Port = $port;

    $mail->SetFrom($from_email, $from_name);
    $mail->isHTML(false);
    $mail->Subject = $subject;
    //$mail->MsgHTML($body);
    $mail->Body = $body;
    $mail->AddAddress($to);

    global $debugMSG;
    $debugMSG = '';
    $mail->Debugoutput = function($str, $level) {
        global $debugMSG;
        $debugMSG .= $str;
    };
    $mail->SMTPDebug = 4;

    /* Send mail and return result */

    //$error = $mail->Send();

    if (!$mail->Send())
        $errors = $mail->ErrorInfo;

    $mail->ClearAddresses();
    $mail->ClearAllRecipients();
    $mail->clearCCs();
    $mail->clearBCCs();

    $cl = new \stdClass();
    $cl->debug = $debugMSG;

    if (!empty($errors)) {
        $cl->msg = $errors;
        $cl->status = 'Fail';
    } else {
        $cl->msg = 'Test mail was sent';
        $cl->status = 'Success';
    }

    return $cl;

    //return $error;
}