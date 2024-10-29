<?php

define('AF2_DEMO_IMP_SLUG', 'af2_demo_import');

class AF2_DemoImport {

    public function __construct() {
        require_once AF2_MENU_TOOLS_PATH;

        $this->submenu_data = array(AF2_MAIN_MENU_SLUG, 'Demo Import', 'Demo Import', 'manage_options', AF2_DEMO_IMP_SLUG);
    }

    public function get_submenu_data() {
        return $this->submenu_data;
    }

    public function get_content() {
        wp_enqueue_style('bootstrap_min');
        wp_enqueue_style('font-awesome_min');
        wp_enqueue_style('materialize.min');
        wp_enqueue_style('m-style.min');
        wp_enqueue_style('materialize-custom');

        wp_enqueue_script('materialize');

        wp_enqueue_script('af2_demo_import_script');

        wp_localize_script('af2_demo_import_script', 'af2_BE_demo_import', array(
            'ajax_url' => admin_url('admin-ajax.php'), 'nonce' => wp_create_nonce('af2_BE_demo_d_import')
        ));

        $free_demo = array('.', '..', 'Webagentur-Demo.txt');

        $demos = scandir(AF2_PLUGIN_DIR . '/res/descriptions');

        $pending_demos = array_merge($free_demo, array_diff($demos, $free_demo));

        $c = '';
        $c .= '<div class="container_bt">';
        $c .= '<div class="row_bt">';

        $y = 0;
        for ($i = 2; $i < sizeof($pending_demos); $i++) {
            $demostr = substr($pending_demos[$i], 0, strlen($pending_demos[$i]) - 4);

            $description = file_get_contents(AF2_PLUGIN_DIR . '/res/descriptions/' . $demostr . '.txt');

            //af2_demo_import( $file );
            if ($y > 2 && $y % 3 === 0) {
                $c .= '</div>';
                $c .= '<div class="row_bt">';
            }
            if ($i == 2)
                $c .= '<div id="' . $demostr . '" class="col-sm_bt af2_card af2_card_active">';
            else {
                $c .= '<div class="col-sm_bt af2_card af2_disabled af2_badge_wrapper">';
                $c .= '<div class="badge pro-badge"><i class="fa fa-star"></i> Pro</div>';
            }

            $c .= '<div class="af2_demo_path" style="display:none;">' . $demostr . '</div>';
            $c .= '<div class="af2_card_inner_demo">';
            $c .= '<div class="demo_heading">' . $demostr . '</div>';
            $c .= '<div class="demo_subheading">' . $description . '</div>';
            $c .= '</div>';
            $c .= '</div>';

            $y++;
        }

        $c .= '</div>';
        $c .= '</div>';



        $content = af2_get_cpt_content_no('Demo Import', $c);

        echo $content;
    }

}

function af2_demo_import() {

    if (!( check_ajax_referer('af2_BE_demo_d_import') )) {
        die();
    }

    $filename = sanitize_file_name($_GET['filename']);

    $demo_path = AF2_PLUGIN_DIR . '/res/demos/' . $filename . '/';

    try {

        $jsonFile = file_get_contents($demo_path . 'a2f_export.json');

        $image_files = $demo_path . 'images';

        if ($jsonFile) {

            $toImport = json_decode($jsonFile);

            if (is_array($toImport) && !empty($toImport)) {

                // Move files to the latest media folder.
                if (is_dir($image_files)) {
                    if ($dh = opendir($image_files)) {

                        while (( $file = readdir($dh) ) !== false) {
                            if ($file != '.' && $file != '..') {
                                $full_img_path = $image_files . '/' . $file;
                                $new_file_path = $upload_dir['path'] . '/' . $file;

                                if (rename($full_img_path, $new_file_path)) {
                                    $new_file_mime = mime_content_type($new_file_path);
                                    $upload_id = wp_insert_attachment(array(
                                        'guid' => $new_file_path,
                                        'post_mime_type' => $new_file_mime,
                                        'post_title' => preg_replace('/\.[^.]+$/', '', $file),
                                        'post_content' => '',
                                        'post_status' => 'inherit'
                                            ), $new_file_path);

                                    require_once( ABSPATH . 'wp-admin/includes/image.php' );

                                    wp_update_attachment_metadata($upload_id, wp_generate_attachment_metadata($upload_id, $new_file_path));
                                }
                            }
                        }
                        closedir($dh);
                    }

                    unlink($image_files);
                }

                // Insert data to database.
                $new_ids = [];
                foreach ($toImport as $data) {
                    $old_id = $data->ID;
                    unset($data->ID); // To create a new post in db.

                    if ('af2_formular' !== $data->post_type) {

                        // for Fragen
                        if ('af2_frage' === $data->post_type) {
                            $hasContent = isset($data->post_content->answers) ? $data->post_content->answers : [];
                            foreach ($hasContent as $answer) :
                                $img_name = explode('/', $answer->img);
                                if (count($img_name) > 1) {
                                    $img_name = end($img_name);

                                    // Fix the image path to match the current server.
                                    $answer->img = $upload_dir['url'] . '/' . $img_name;
                                }

                                $answer->text = htmlentities($answer->text);
                            endforeach;
                        }

                        $data->post_content = json_encode($data->post_content, JSON_UNESCAPED_UNICODE);
                        $data->post_content = str_replace('\\', '\\\\', $data->post_content);
                        $new_ids[$old_id] = wp_insert_post($data);
                    }
                }

                if (!empty($new_ids)) {
                    foreach ($toImport as $data) {
                        unset($data->ID, $data->guid);

                        // for Formular
                        if ('af2_formular' === $data->post_type) {
                            $sections_data = $data->post_content;

                            foreach ($sections_data->sections as $section_content) {
                                foreach ($section_content->contents as $s_content) {
                                    if (array_key_exists($s_content->data, $new_ids)) {
                                        $s_content->data = (string) $new_ids[$s_content->data]; // new id here;
                                    }
                                }
                            }

                            $data->post_content = json_encode($data->post_content, JSON_UNESCAPED_UNICODE);
                            $formular_id = wp_insert_post($data);

                            $updated_post_title = '[anfrageformular2 id="' . $formular_id . '"]';
                            $updated_post_name = 'anfrageformular2-id' . $formular_id;
                            $data->post_content = json_decode($data->post_content, true);

                            $data->post_content['title'] = $updated_post_title;

                            $data->post_content = json_encode($data->post_content, JSON_UNESCAPED_UNICODE);


                            $data->post_content = str_replace('\\', '\\\\', $data->post_content);

                            wp_update_post([
                                'ID' => $formular_id,
                                'post_title' => $updated_post_title,
                                'post_name' => $updated_post_name,
                                'post_content' => $data->post_content
                            ]);
                        }
                    }
                }

                $return = [
                    'type' => 'success',
                    'msg' => 'Daten erfolgreich importiert!',
                ];
            }
        } else {
            $return = [
                'type' => 'error',
                'msg' => 'Fehler im Input File!',
            ];
        }
    } catch (Exception $e) {
        $return = [
            'type' => 'error',
            'msg' => $e->getMessage(),
        ];
    }

    echo json_encode($return);
    wp_die();
}

add_action('wp_ajax_af2_demo_import', 'af2_demo_import');