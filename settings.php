<?php

defined('ABSPATH') or die('NO');

/**
 * Load all resource Scripts and Styles
 */
function af2_load_resources() {
    af2_load_resource(AF2_PLUGIN_DIR . '/res/scripts', 'scripts');
    af2_load_resource(AF2_PLUGIN_DIR . '/res/styles', 'styles');

    wp_localize_script('cpt_script', 'af2_BE_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'), 'nonce' => wp_create_nonce('af2_BE_NONCE')
    ));
    wp_localize_script('af2_builder', 'af2_BE_save', array(
        'ajax_url' => admin_url('admin-ajax.php'), 'nonce' => wp_create_nonce('af2_BE_SAVE_NONCE')
    ));
}

/**
 * Loads the Resources of one type out of a special directory
 *
 * @param $dir -> The Directory
 * @param $type -> Script or Style?
 */
function af2_load_resource($dir, $type) {
    $files = scandir($dir);
    for ($i = 2; $i < sizeof($files); $i++) {
        $len = ( $type == 'scripts' ) ? 3 : 4;
        $name = substr($files[$i], 0, strlen($files[$i]) - $len);
        $path = 'res/' . $type . '/' . $files[$i];
        $resource = array($name, plugins_url($path, AF2_PLUGIN));

        if ($type == 'scripts') {
            wp_register_script($resource[0], $resource[1], '2.1.1');
        } else if ($type == 'styles') {
            wp_register_style($resource[0], $resource[1], array(), '2.1.1');
        }
    }

    af2_load_online_libraries();
}

function af2_load_online_libraries() {
    wp_register_style('font-awesome_min', 'https://use.fontawesome.com/releases/v5.11.2/css/all.css');
}

add_action('admin_enqueue_scripts', 'af2_load_resources');

if (!get_option('af2_version')) {
    add_option('af2_version', '2.1.1');
} else {
    if (get_option('af2_version') !== '2.0.9' && get_option('af2_version') !== '2.0.9.1' && get_option('af2_version') !== '2.0.9.2' && get_option('af2_version') !== '2.0.9.2.1' && get_option('af2_version') !== '2.0.9.3' && get_option('af2_version') !== '2.0.9.3.1' && get_option('af2_version') !== '2.0.9.4' && get_option('af2_version') !== '2.0.10' && get_option('af2_version') !== '2.0.10.1' && get_option('af2_version') !== '2.0.10.2' && get_option('af2_version') !== '2.0.11' && get_option('af2_version') !== '2.0.11.1' && get_option('af2_version') !== '2.0.11.2' && get_option('af2_version') !== '2.0.12' && get_option('af2_version') !== '2.0.12.1' && get_option('af2_version') !== '2.0.12.2' && get_option('af2_version') !== '2.1.0' && get_option('af2_version') !== '2.1.1') {
        //update_option( 'af2_version', '2.0.9.1' );

        $posts = get_posts([
            'post_type' => 'af2_formular',
            'post_status' => 'privat',
            'numberposts' => -1,
            'order' => 'ASC'
        ]);

        $content = '';

        $number = 1;

        foreach ($posts as $post) {
            $content = json_decode(get_post_field('post_content', $post));
            $id = get_post_field('ID', $post);

            /** OLD VARIABLES */
            $main_color = $content->styling->main_color;
            $background_color = $content->styling->background_color;
            $card_color = $content->styling->card_color;
            $text_color = $content->styling->text_color;

            /** SETTING NEW */
            /** COLORS * */
            $content->styling->global_main_color = $main_color;
            $content->styling->global_main_background_color = $background_color;

            $content->styling->form_heading_color = $main_color;
            $content->styling->form_question_heading_color = $text_color;
            $content->styling->form_question_description_color = $text_color;
            $content->styling->form_answer_card_text_color = $text_color;
            $content->styling->form_answer_card_icon_color = $main_color;
            $content->styling->form_background_color = $background_color;
            $content->styling->form_answer_card_background_color = $card_color;
            $content->styling->form_button_background_color = $main_color;
            $content->styling->form_button_disabled_background_color = 'rgba(215, 215, 215, 1)';
            $content->styling->form_box_shadow_color = $main_color;
            $content->styling->form_border_color = $main_color;
            $content->styling->form_progress_bar_color = $main_color;
            $content->styling->form_progress_bar_unfilled_background_color = 'rgba(255, 255, 255, 1)';
            $content->styling->form_slider_frage_bullet_color = $main_color;
            $content->styling->form_slider_frage_thumb_background_color = $main_color;
            $content->styling->form_input_background_color = 'rgba(253, 253, 253, 1)';
            $content->styling->form_loader_color = $main_color;

            /** TEXT THINGS * */
            //form heading
            $content->styling->form_heading_size_desktop = '40';
            $content->styling->form_heading_size_mobile = '28';
            $content->styling->form_heading_weight = '600';
            $content->styling->form_heading_line_height_desktop = '50';
            $content->styling->form_heading_line_height_mobile = '38';

            //question heading
            $content->styling->form_question_heading_size_desktop = '32';
            $content->styling->form_question_heading_size_mobile = '24';
            $content->styling->form_question_heading_weight = '600';
            $content->styling->form_question_heading_line_height_desktop = '42';
            $content->styling->form_question_heading_line_height_mobile = '34';

            //question description
            $content->styling->form_question_description_size_desktop = '20';
            $content->styling->form_question_description_size_mobile = '18';
            $content->styling->form_question_description_weight = '600';
            $content->styling->form_question_description_line_height_desktop = '30';
            $content->styling->form_question_description_line_height_mobile = '20';

            //answers
            $content->styling->form_answer_card_text_size_desktop = '18';
            $content->styling->form_answer_card_text_size_mobile = '16';
            $content->styling->form_answer_card_text_weight = '500';
            $content->styling->form_answer_card_text_line_height_desktop = '24';
            $content->styling->form_answer_card_text_line_height_mobile = '20';

            //input text sizes
            $content->styling->form_text_input_size_desktop = '25';
            $content->styling->form_text_input_size_mobile = '20';
            $content->styling->form_text_input_text_weight = '500';
            $content->styling->form_text_input_line_height_desktop = '35';
            $content->styling->form_text_input_line_height_mobile = '30';

            /** BORDER RADIUS * */
            $content->styling->form_answer_card_border_radius = '15';
            $content->styling->form_text_input_border_radius = '7';

            /** PUTTING IN */
            $content->updated = 'true';

            $new_post = get_post($post);

            $content = json_encode($content);

            $content = str_replace('\\', '\\\\', $content);

            $title = get_post_field('post_title', $post);

            wp_update_post(array('ID' => $id, 'post_status' => 'privat', 'post_title' => $title, 'post_content' => $content));
        }
    }
    if (get_option('af2_version') !== '2.0.9.2' && get_option('af2_version') !== '2.0.9.2.1' && get_option('af2_version') !== '2.0.9.3' && get_option('af2_version') !== '2.0.9.3.1' && get_option('af2_version') !== '2.0.9.4' && get_option('af2_version') !== '2.0.10' && get_option('af2_version') !== '2.0.10.1' && get_option('af2_version') !== '2.0.10.2' && get_option('af2_version') !== '2.0.11' && get_option('af2_version') !== '2.0.11.1' && get_option('af2_version') !== '2.0.11.2' && get_option('af2_version') !== '2.0.12' && get_option('af2_version') !== '2.0.12.1' && get_option('af2_version') !== '2.0.12.2' && get_option('af2_version') !== '2.1.0' && get_option('af2_version') !== '2.1.1') {
        $posts = get_posts([
            'post_type' => 'af2_formular',
            'post_status' => 'privat',
            'numberposts' => -1,
            'order' => 'ASC'
        ]);

        $content = '';

        $number = 1;

        foreach ($posts as $post) {
            $content = json_decode(get_post_field('post_content', $post));
            $id = get_post_field('ID', $post);

            /** OLD VARIABLES */
            $main_color = $content->styling->global_main_color;

            /** SETTING NEW */
            // CONTACT FORM 
            $content->styling->form_contact_form_label_size = '18';
            $content->styling->form_contact_form_label_weight = '500';
            $content->styling->form_contact_form_input_size = '15';
            $content->styling->form_contact_form_input_weight = '400';
            $content->styling->form_contact_form_button_size = '18';
            $content->styling->form_contact_form_button_weight = '500';
            $content->styling->form_contact_form_button_padding_top_bottom = '14';
            $content->styling->form_contact_form_cb_size = '13';
            $content->styling->form_contact_form_cb_weight = '300';
            $content->styling->form_contact_form_input_height = '47';
            $content->styling->form_contact_form_input_border_radius = '7';
            $content->styling->form_contact_form_button_border_radius = '7';
            $content->styling->form_contact_form_button_background_color = $main_color;

            $content->styling->form_contact_form_button_color = 'rgba(51, 51, 51, 1)';
            $content->styling->form_contact_form_input_padding_left_right = '7';


            /** PUTTING IN */
            $content->updated = 'true';

            $new_post = get_post($post);

            $content = json_encode($content);

            $content = str_replace('\\', '\\\\', $content);

            $title = get_post_field('post_title', $post);

            wp_update_post(array('ID' => $id, 'post_status' => 'privat', 'post_title' => $title, 'post_content' => $content));
        }
    }



    if (get_option('af2_version') !== '2.1.0' && get_option('af2_version') !== '2.1.1') {
        $posts = get_posts([
            'post_type' => 'af2_formular',
            'post_status' => 'privat',
            'numberposts' => -1,
            'order' => 'ASC'
        ]);

        $content = '';

        $number = 1;

        foreach ($posts as $post) {
            $content = json_decode(get_post_field('post_content', $post));
            $id = get_post_field('ID', $post);

            $content->styling->form_question_description_color = $content->styling->form_heading_color;

            //question description
            $content->styling->form_question_description_size_desktop = '20';
            $content->styling->form_question_description_size_mobile = '18';
            $content->styling->form_question_description_weight = '600';
            $content->styling->form_question_description_line_height_desktop = '30';
            $content->styling->form_question_description_line_height_mobile = '20';



            /** PUTTING IN */
            $content->updated = 'true';

            $new_post = get_post($post);

            $content = json_encode($content);

            $content = str_replace('\\', '\\\\', $content);

            $title = get_post_field('post_title', $post);

            wp_update_post(array('ID' => $id, 'post_status' => 'privat', 'post_title' => $title, 'post_content' => $content));
        }
        update_option('af2_version', '2.1.1');
    }
}


if (!get_option('af2_impressions')) {
    add_option('af2_impressions', '0');
}

require_once AF2_ADMIN_PATH;
require_once AF2_FRONTEND_PATH;

function af2_handle_cpt() {
    if (!( check_ajax_referer('af2_BE_NONCE') )) {
        die();
    }

    $action = null;
    /**
     * Request handling
     */
    if (isset($_GET['page']) && isset($_GET['action'])) {
        
        $page = sanitize_key($_GET['page']);
        $action = sanitize_key($_GET['action']);
        
        if ($page == AF2_FRAGE_SLUG) {
            //Creating a new Question
            if ($action == 'af2_create_post') {
                $post_id = wp_insert_post(array('post_content' => '{}', 'post_type' => AF2_FRAGE_POST_TYPE));
                echo '<div id="af2_response" style="display: none;" data-id="' . $post_id . '"></div>';
            } else if ($action == 'af2_delete_posts') {
                if (isset($_GET['posts'])) {
                    
                    $posts = array_map( 'absint', $_GET['posts']);

                    foreach ($posts AS $post) {
                        wp_delete_post($post);
                    }
                }
            }
        } else if ($page == AF2_KONTAKTFORMULAR_SLUG) {
            //Creating a new Question
            if ($action == 'af2_create_post') {
                $post_id = wp_insert_post(array('post_content' => '{}', 'post_type' => AF2_KONTAKTFORMULAR_POST_TYPE));
                echo '<div id="af2_response" style="display: none;" data-id="' . $post_id . '"></div>';
            } else if ($action == 'af2_delete_posts') {
                if (isset($_GET['posts'])) {
                    
                    $posts = array_map( 'absint', $_GET['posts']);

                    foreach ($posts AS $post) {
                        wp_delete_post($post);
                    }
                }
            }
        } else if ($page == AF2_FORMULAR_SLUG) {
            //Creating a new Question
            if ($action == 'af2_create_post') {
                $post_id = wp_insert_post(array('post_content' => '{}', 'post_type' => AF2_FORMULAR_POST_TYPE));
                echo '<div id="af2_response" style="display: none;" data-id="' . $post_id . '"></div>';
            } else if ($action == 'af2_delete_posts') {
                if (isset($_GET['posts'])) {
                    
                    $posts = array_map( 'absint', $_GET['posts']);
                    foreach ($posts AS $post) {
                        wp_delete_post($post);
                    }
                }
            }
        }
    }

    wp_die();
}

add_action('wp_ajax_af2_delete_posts', 'af2_handle_cpt');
add_action('wp_ajax_af2_create_post', 'af2_handle_cpt');

function af2_handle_save() {
    if (!( check_ajax_referer('af2_BE_SAVE_NONCE') )) {
        die();
    }

    /**
     * Request handling
     */
    if (isset($_POST['id']) && isset($_POST['page']) && isset($_POST['title']) &&
            isset($_POST['action']) && isset($_POST['content'])) {
        $page = sanitize_key($_POST['page']);
        $action = sanitize_key($_POST['action']);
        if ($page == AF2_KONTAKTFORMULARBUILDER_SLUG) {
            //Saving content
            if ($action == 'af2_save_content') {
                $id = sanitize_key($_POST['id']);
                $title = sanitize_text_field($_POST['title']);
                $content = af2_sanitize_contactform_data($_POST['content']);
                wp_update_post(array('ID' => $id, 'post_status' => 'privat', 'post_title' => $title, 'post_content' => $content));
            }
        }
    }

    if (isset($_POST['id']) && isset($_POST['page']) && isset($_POST['title']) &&
            isset($_POST['action']) && isset($_POST['content'])) {
        $page = sanitize_key($_POST['page']);
        $action = sanitize_key($_POST['action']);
        if ($page == AF2_FRAGENBUILDER_SLUG) {
            //Saving content
            if ($action == 'af2_save_content') {
                $id = sanitize_key($_POST['id']);
                $content = sanitize_textarea_field($_POST['content']);
                $title = sanitize_text_field($_POST['title']);

                wp_update_post(array('ID' => $id, 'post_status' => 'privat', 'post_title' => $title, 'post_content' => $content));
            }
        }
    }

    if (isset($_POST['id']) && isset($_POST['page']) && isset($_POST['title']) &&
            isset($_POST['action']) && isset($_POST['content'])) {
        $page = sanitize_key($_POST['page']);
        $action = sanitize_key($_POST['action']);
        if ($page == AF2_FORMULARBUILDER_SLUG) {
            //Saving content
            if ($action == 'af2_save_content') {
                $id = sanitize_key($_POST['id']);
                $content = sanitize_textarea_field($_POST['content']);
                $title = sanitize_text_field($_POST['title']);

                wp_update_post(array('ID' => $id, 'post_status' => 'privat', 'post_title' => $title, 'post_content' => $content));
            }
        }
    }

    wp_die();
}

add_action('wp_ajax_af2_save_content', 'af2_handle_save');

function af2_sanitize_contactform_data($content){
    
    $sanitize_content = $content;
    $content = json_decode(stripslashes($content));
    if(!empty($content)){
        foreach ($validate_content as $key=>$val){
            $sanitize_content[$key] = af2_sanitize_contactform_data_value($val);
        }
    }
    return $sanitize_content;
}

function af2_sanitize_contactform_data_value($val){
    if(is_array($val)){
       foreach ( $val as &$value ) {
           $value = af2_sanitize_contactform_data_value($value);
       }
    }else{
       $val = wp_kses_post($val);
    }
    return $val;
}

function af2_test_smtp() {
    
    if (!( check_ajax_referer('af2_BE_SAVE_NONCE') )) {
        die();
    }

    $smtp = !empty($_GET['use_smtp'])?sanitize_key($_GET['use_smtp']):0;
    $wp_mail = !empty($_GET['use_wp_mail'])?sanitize_key($_GET['use_wp_mail']):0;


    if ($smtp === true || $smtp === 'true') {
        $cc = sanitize_text_field($_GET['cc']);
        $bcc = sanitize_text_field($_GET['bcc']);

        $cc_list = explode(',', $cc);
        $bcc_list = explode(',', $bcc);

        $resp = af2_smtpmailer(
                sanitize_text_field($_GET['host']), 
                sanitize_text_field($_GET['username']), 
                sanitize_text_field($_GET['password']),  
                sanitize_text_field($_GET['port']), 
                sanitize_text_field($_GET['type']), 
                sanitize_email($_GET['to']), 
                sanitize_email($_GET['from']), 
                sanitize_text_field($_GET['from_name']), 
                'Testmail', 'Dies ist eine Testmail vom Anfrageformular 2.0 per SMTP', $cc_list, $bcc_list);

        $arr = [];

        if (!$resp)
            $arr = array('status' => 'Error', 'message' => "Please configure your SMTP credentials", 'resp' => $resp);

        $arr = array('status' => $resp->status, 'message' => ( $resp->status == 'Success' ? 'Mail successfully sent' : "Mail couldn't be sent successfully" ), 'resp' => $resp);

        echo $arr['status'] . ' : ' . $arr['message'];
    }
    else {
        $headers = 'From: ' . sanitize_text_field($_GET['from_name']) . ' <' . sanitize_text_field($_GET['from']) . '>' . "\r\n";
        $headers .= 'CC: ' . sanitize_text_field($_GET['cc']) . "\r\n";
        $headers .= 'BCC: ' . sanitize_text_field($_GET['bcc']) . "\r\n";

        if ($wp_mail === true || $wp_mail === 'true') {
            wp_mail(sanitize_text_field($_GET['to']), 'Testmail', 'Dies ist eine Testmail vom Anfrageformular 2.0', $headers);

            echo 'Testmail gesendet mit WP Mail. Bitte Überprüfe dein Postfach!';
        } else {
            mail(sanitize_text_field($_GET['to']), 'Testmail', 'Dies ist eine Testmail vom Anfrageformular 2.0', $headers);

            echo 'Testmail gesendet ohne SMTP. Bitte Überprüfe dein Postfach!';
        }
    }
    //echo $resp;

    wp_die();
}

function af2_smtpmailer($host, $user, $password, $port, $type, $to, $from, $from_nam, $subject, $body, $cc, $bcc) {
    
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
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->MsgHTML($body);
    $mail->AddAddress($to);

    foreach ($cc as $c) {
        $c = trim($c);

        $mail->addCC($c);
    }

    foreach ($bcc as $bc) {
        $bc = trim($bc);

        $mail->addBCC($bc);
    }

    $mail->SMTPDebug = 4;

    /* Send mail and return result */

    $error = $mail->Send();

    $mail->ClearAddresses();
    $mail->ClearAllRecipients();
    $mail->clearCCs();
    $mail->clearBCCs();
    
    return $error;
}

add_action('wp_ajax_af2_test_smtp', 'af2_test_smtp');

function af2_copy_posts() {
    if (!( check_ajax_referer('af2_BE_NONCE') )) {
        die();
    }

    $posts = !empty($_POST['posts'])?array_map( 'absint', $_POST['posts'] ):array();
    
    foreach ($posts as $post) {
        $new_post = get_post($post);

        $content = get_post_field('post_content', $new_post);
        $title = get_post_field('post_title', $new_post);
        $post_type = get_post_field('post_type', $new_post);

        $content = json_decode($content);

        $content->name .= ' - (Kopie)';

        $content = json_encode($content, JSON_UNESCAPED_UNICODE);

        $content = str_replace('\\', '\\\\', $content);

        $newp = wp_insert_post(array('post_content' => '{}', 'post_title' => $title, 'post_type' => $post_type, 'post_status' => 'privat'));
        wp_update_post(array('ID' => $newp, 'post_content' => $content, 'post_title' => $title, 'post_type' => $post_type, 'post_status' => 'privat'));
    }

    wp_die();
}

add_action('wp_ajax_af2_copy_posts', 'af2_copy_posts');

function af2_sql_check($var) {
    if (strpos(strtolower(strval($var)), 'select') !== false) {
        die('ERROR');
    } else if (strpos(strtolower(strval($var)), 'update') !== false) {
        die('ERROR');
    } else if (strpos(strtolower(strval($var)), 'insert') !== false) {
        die('ERROR');
    } else if (strpos(strtolower(strval($var)), 'drop') !== false) {
        die('ERROR');
    } else if (strpos(strtolower(strval($var)), 'delete') !== false) {
        die('ERROR');
    }
}

function af2_set_p_status() {
    $posts = af2_get_pu('af2_request');
    if (count($posts) > 0) {
        af2_iterate_pv($posts);
    }

    $posts = af2_get_pu('af2_anfrage');
    if (count($posts) > 0) {
        af2_iterate_pv($posts);
    }

    $posts = af2_get_pu('af2_formular');
    if (count($posts) > 0) {
        af2_iterate_pv($posts);
    }

    $posts = af2_get_pu('af2_kontaktformular');
    if (count($posts) > 0) {
        af2_iterate_pv($posts);
    }

    $posts = af2_get_pu('af2_frage');
    if (count($posts) > 0) {
        af2_iterate_pv($posts);
    }

    $posts = af2_get_pv('af2_request');
    if (count($posts) > 0) {
        af2_iterate_pv($posts);
    }

    $posts = af2_get_pv('af2_anfrage');
    if (count($posts) > 0) {
        af2_iterate_pv($posts);
    }

    $posts = af2_get_pv('af2_formular');
    if (count($posts) > 0) {
        af2_iterate_pv($posts);
    }

    $posts = af2_get_pv('af2_kontaktformular');
    if (count($posts) > 0) {
        af2_iterate_pv($posts);
    }

    $posts = af2_get_pv('af2_frage');
    if (count($posts) > 0) {
        af2_iterate_pv($posts);
    }
}

function af2_iterate_pv($posts) {
    foreach ($posts as $post) {
        $id = get_post_field('ID', $post);
        $post_status = get_post_field('post_status', $post);

        if ($post_status != 'privat') {
            wp_update_post(array('ID' => $id, 'post_status' => 'privat'));
        }
    }
}

function af2_get_pu($type) {
    return get_posts([
        'post_type' => $type,
        'post_status' => 'publish',
        'numberposts' => -1,
        'order' => 'ASC'
    ]);
}

function af2_get_pv($type) {
    return get_posts([
        'post_type' => $type,
        'post_status' => 'private',
        'numberposts' => -1,
        'order' => 'ASC'
    ]);
}

add_action('init', 'af2_set_p_status');