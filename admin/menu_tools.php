<?php

/**
 * Delete all Drafts of a post_type
 *
 * @param $post_type -> The post type to delete the drafts of it
 */
function af2_delete_drafts($post_type) {
    $posts = get_posts([
        'post_type' => $post_type,
        'post_status' => 'draft',
        'numberposts' => -1,
        'order' => 'ASC'
    ]);

    for ($i = 0; $i < sizeof($posts) - 1; $i++) {
        $id = get_post_field('ID', $posts[$i]);
        wp_delete_post($id);
    }
}

/**
 * Prints the data div
 *
 * @param $datatypes -> All Data
 * @return string
 */
function af2_get_data_div($datatypes) {
    return "<div id='af2_req_div_data' " . af2_get_menu_page_data($datatypes) . "></div>";
}

/**
 * Prints a single datatype
 *
 * @param $datatypes -> all datatypes
 * @return string
 */
function af2_get_menu_page_data($datatypes) {
    $str = "";
    foreach ($datatypes as $datatype) {
        $data = explode(':', $datatype, 2);
        $str .= "data-" . $data[0] . "='" . $data[1] . "' ";
    }

    return $str;
}

/**
 * Prints a content for an Admin-Menu-Page
 *
 * @param $pre_sheet_content
 * @param $navbar_content
 * @param $content
 * @param $post_sheet_content
 * @return string
 */
function af2_get_admin_page_content($pre_sheet_content, $navbar_content, $content, $post_sheet_content, $dragscroll) {
    $ds = $dragscroll ? 'dragscroll' : '';
    return
            '<div class="clear"></div><div class="af2_whole">
            <div class="af2_bodyc">' .
            $pre_sheet_content .
            '<div class="af2_sheet">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light row">' .
            $navbar_content .
            '</nav>
                    <div class="af2_canvas">' .
            '<div class="af2_content ' . $ds . '" data-dragscroll="' . $dragscroll . '">' . //
            $content .
            '</div>
                    </div>
                </div>' .
            $post_sheet_content .
            '</div>
        </div>';
}

function af2_get_cpt_content($cpt_slug_pl, $table) {

    if ($cpt_slug_pl == 'Fragen') {
        $title = '<div class="col s10 m6 l6">
                    <h5 class="breadcrumbs-title mt-0 mb-0">' . $cpt_slug_pl . '</h5>
                  </div>
                  <div class="col s10 m6 l6">
                      <input type="text" placeholder="Suche" id="af2_fragen_list_search" class="fragen_list_search">
                  </div>';
    } else {
        $title = '<div class="col s10 m6 l6">
                    <h5 class="breadcrumbs-title mt-0 mb-0">' . $cpt_slug_pl . '</h5>
                  </div>';
    }
    return
            '<div id="main">
        <div class="row">
            <div class="content-wrapper-before color-primary"></div>
            <div class="pb-1 pt-4" id="breadcrumbs-wrapper">
              <div class="container">
                <div class="row">' . $title . '</div>
              </div>
            </div>
            <div class="col s12">
                <div class="container">
                    <div class="section section-data-tables">
                        <div class="af-wrap">
                            <div class="af-left-col">
                                <div class="container">
                                  <div class="card">
                                    <div class="card-content">
                                      <div class="row">
                                        <div class="col s12">' .$table .'</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                            <div class="af-right-col">'. af2_get_pro_sidebar_content().'</div>
                        </div>
                    </div>
                    <div class="fixed-action-btn fixed-float-btn">
                        <div id="af2_create_new_post" style="display: block;" class=""><a class="btn-floating btn-large btn-primary gradient-shadow"><i class="fas fa-plus"></i></a></div>
                        <div id="af2_copy_post" style="display: block;" class="hide"><a class="btn-floating btn-large btn-primary gradient-shadow"><i class="far fa-copy"></i></a></div>
                        <div id="af2_delete_post_button" style="display: block;" class="hide"><a class="btn-floating btn-large btn-primary gradient-shadow"><i class="far fa-trash-alt"></i></a></div>
                    </div>
                </div>
            </div>
        </div>
     </div>';
}

function af2_get_cpt_content_lead($cpt_slug_pl, $table) {
    return
            '<div id="main">
        <div class="row">
            <div class="content-wrapper-before color-primary"></div>
            <div class="pb-1 pt-4" id="breadcrumbs-wrapper">
              <div class="container">
                <div class="row">
                  <div class="col s10 m6 l6">
                    <h5 class="breadcrumbs-title mt-0 mb-0">' . $cpt_slug_pl . '</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="af-wrap">
                <div class="af-left-col">
                    <div class="container">
                        <div class="section section-data-tables">
                            <div class="row">
                                <div class="col s12">
                                  <div class="card">
                                    <div class="card-content">
                                      <div class="row">
                                        <div class="col s12">' .$table .'</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="af-right-col">'.af2_get_pro_sidebar_content().'</div>
            </div>
        </div>
     </div>';
}

function af2_get_pro_sidebar_content(){
    
    $af2_branding = get_option('af2_branding');
    $checked = (!empty($af2_branding))?'checked':'';
    
    return '
    <div class="container pro-sidebar-container">
        <div class="card af-blank-card">
            <div class="row">
            <div class="col s12 left-align px-4">
                <h5>Support</h5>
                <div class="switch">
                    <label class="af-switch-label">
                      <input type="checkbox" id="af2_branding" value="1" '.$checked.'>
                      <span class="lever"></span>
                      Unterstütze uns und erlaube ein Powered by Anfrageformular auf deiner Seite
                    </label>
                </div>
                <hr/>
            </div>
                <div class="col s12 p0"><a href="https://anfrageformular.com/quick-start-guide-free/" target="_blank"><img src="'.plugins_url( "/res/pro/video.png", AF2_PLUGIN ).'"></a></div>
                <div class="col s12 p0"><a href="https://anfrageformular.com/preise/" target="_blank"><img src="'.plugins_url( "/res/pro/gopro.png", AF2_PLUGIN ).'" class="mb0"></a></div>
            </div>
        </div>
    </div>';
}
function af2_get_cpt_content_no($cpt_slug_pl, $table) {
    return
            '<div id="main">
        <div class="row">
            <div class="content-wrapper-before color-primary"></div>
            <div class="pb-1 pt-4" id="breadcrumbs-wrapper">
              <div class="container">
                <div class="row">
                  <div class="col s10 m6 l6">
                    <h5 class="breadcrumbs-title mt-0 mb-0">' . $cpt_slug_pl . '</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col s12">
                <div class="container">
                    <div class="section section-data-tables">
                        <div class="row">
                            <div class="col s12">

                                <div class="card-content">
                                  <div class="row">
                                    <div class="col s12">' .
            $table .
            '</div>
                                  </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>';
}

function af2_get_cpt_content_pro($cpt_slug_pl, $table) {
    return
            '<div id="main">
        <div class="row">
            <div class="content-wrapper-before color-primary"></div>
            <div class="pb-1 pt-4" id="breadcrumbs-wrapper">
              <div class="container">
                <div class="row">
                  <div class="col s10 m6 l6">
                    <h5 class="breadcrumbs-title mt-0 mb-0">' . $cpt_slug_pl . '</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col s12">
                <div class="af2-pro-badge">
                    <h1>Jetzt Pro Version freischalten</h1>
                    <p><a href="https://anfrageformular.com/preise/" target="_blank" class="waves-effect waves-light btn">Upgrade to pro version</a></p>
                </div>
                <div class="container af2-pro-bg">
                    <div class="section section-data-tables">
                        <div class="row">
                            <div class="col s12">
                                <div class="card-content">
                                  <div class="row">
                                    <div class="col s12">' . $table . '</div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>';
}

/**
 * Prints the standard cpt table
 *
 * @param $name
 * @param $title
 * @param $generated_content
 * @return string
 */
function af2_get_cpt_table($name, $title, $generated_content) {
    $str = '<table id="multi-select" class="display">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" class="af2_checkbox filled-in af2_select_all" />
                <span></span>
              </label>
            </th>
            <th></th>
            <th>' . $name . '</th>
			<th>' . $title . '</th>';
    if ('Formulartitel' === $name) :
        $str .= '<th>Externer Einbettungscode</th>';
    endif;
    $str .= '<th>Autor</th>
            <th>zul. geändert</th>
          </tr>
        </thead>
        <tbody>' .
            $generated_content .
            '</tbody>
		</table>';

    return $str;
}

/**
 * Prints the standard cpt table
 *
 * @param $name
 * @param $title
 * @param $generated_content
 * @return string
 */
function af2_get_cpt_lead_table($name, $generated_content) {
    $str = '<table id="multi-select" class="display">
        <thead>
          <tr>
            <th></th>
            <th>' . $name . '</th>
			<th>' . '</th>' .
            '</tr>
        </thead>
        <tbody>' .
            $generated_content .
            '</tbody>
		</table>';

    return $str;
}

/**
 * Prints the standard cpt table
 *
 * @param $name
 * @param $title
 * @param $generated_content
 * @return string
 */
function af2_get_cpt_lead_detail_table($generated_content) {
    $str = '<table id="multi-select" class="display">
        <thead>
          <tr>
            <th></th>
			<th>' . '</th>' .
            '</tr>
        </thead>
        <tbody>' .
            $generated_content .
            '</tbody>
		</table>';

    return $str;
}

/**
 * Prints the ctp table content
 *
 * @param $post_type
 * @return string
 */
function af2_get_cpt_table_content($post_type) {
    $posts = get_posts([
        'post_type' => $post_type,
        'post_status' => 'privat',
        'numberposts' => -1,
        'order' => 'ASC'
    ]);

    $content = '';

    $number = 1;

    foreach ($posts as $post) {
        $name = json_decode(get_post_field('post_content', $post));

        if (get_post_field('post_content', $post) != '{}') {

            $err = '';

            if ($name->error == true) {
                $err = 'error';
            }

            $typ = $name->typ;
            $typ = ucfirst(substr($typ, 4));

            $content .= '<tr class="af2_pt_row ' . $err . '">
                    <th><label><input id="' . $post->ID . '" type="checkbox" class="af2_checkbox cont filled-in" /><span></span></label></th>
                    <td>' . $number . '</td>
                    <td class="af2_edit_post pointer link" data-id="' . $post->ID . '">' . $name->name . '</td>
                    <td>' . $typ . '</td>
                    <td>' . get_the_author_meta('display_name', get_post_field('post_author', $post)) . '</td>
                    <td>' . get_post_field('post_modified', $post) . '</td>
                    </tr>';


            $number++;
        }
    }
    return $content;
}

/**
 * Prints the ctp table content
 *
 * @param $post_type
 * @return string
 */
function af2_get_cpt_lead_table_content($post_type) {
    $posts = get_posts([
        'post_type' => $post_type,
        'post_status' => 'privat',
        'numberposts' => -1,
        'order' => 'ASC'
    ]);

    $content = '';

    $number = 1;

    foreach ($posts as $post) {
        $date = get_post_field('post_date', $post);
        $path = get_admin_url() . 'admin.php?page=af2_lead_details&action=load&id=' . get_post_field('ID', $post);

        $err = '';

        $content .= '<tr class="af2_pt_row ' . $err . '">
                    <td>' . $number . '</td>
                    <td class="af2_edit_post pointer link" data-id="' . $post->ID . '"><a href="' . $path . '">' . 'Lead vom ' . $date . '</td></a>
                    <td>' . '</td>
                    <td>' . '</td>
                    <td>' . '</td>
                    </tr>';


        $number++;
    }
    return $content;
}

function af2_get_cpt_lead_detail_table_content($post_type, $id) {
    $posts = get_post($id);
    $post_content = json_decode(get_post_field('post_content', $posts));

    $answers = array_merge($post_content->questions, $post_content->contact_form);

    $content = '';

    $number = 1;

    foreach ($answers as $answer) {
        $err = '';

        $val1 = '';
        $val2 = '';

        if (array_key_exists('frage', $answer))
            $val1 = $answer->frage;
        else
            $val1 = $answer->id;

        if (array_key_exists('antwort', $answer))
            $val2 = $answer->antwort;
        else if (array_key_exists('antworten', $answer))
            $val2 = $answer->antworten;
        else
            $val2 = $answer->input;

        if (is_array($val2)) {
            $values = $val2;
            $val2 = '';
            foreach ($values as $val) {
                $val2 .= $val . ', ';
            }
            $val2 = substr($val2, 0, strlen($val2) - 2);
        }

        $content .= '<tr class="af2_pt_row ' . $err . '">
                    <td>' . $val1 . '</td>
                    <td>' . $val2 . '</td>
                    </tr>';


        $number++;
    }
    return $content;
}

function af2_get_cpt_table_content_c($post_type) {
    $posts = get_posts([
        'post_type' => $post_type,
        'post_status' => 'privat',
        'numberposts' => -1,
        'order' => 'ASC'
    ]);

    $content = '';

    $number = 1;

    foreach ($posts as $post) {
        $name = json_decode(get_post_field('post_content', $post));

        if (get_post_field('post_content', $post) != '{}') {

            $err = '';

            if ($name->error == true) {
                $err = 'error';
            }

            $content .= '<tr class="af2_pt_row ' . $err . '">
                    <th><label><input id="' . $post->ID . '" type="checkbox" class="af2_checkbox cont filled-in" /><span></span></label></th>
                    <td>' . $number . '</td>
                    <td class="af2_edit_post pointer link" data-id="' . $post->ID . '">' . $name->name . '</td>
                    <td>' . $name->cftitle . '</td>
                    <td>' . get_the_author_meta('display_name', get_post_field('post_author', $post)) . '</td>
                    <td>' . get_post_field('post_modified', $post) . '</td>
                    </tr>';

            $number++;
        }
    }
    return $content;
}

function af2_get_cpt_table_content_dependency($post_type) {
    $posts = get_posts([
        'post_type' => $post_type,
        'post_status' => 'privat',
        'numberposts' => -1,
        'order' => 'ASC'
    ]);

    $content = '';

    $number = 1;

    foreach ($posts as $post) {
        $name = json_decode(get_post_field('post_content', $post));

        if (get_post_field('post_content', $post) !== '{}') {

            $err = '';

            if ($name->error == true) {
                $err = 'error';
            } else {
                for ($i = 0; $i < sizeof($name->sections); $i++) {
                    for ($j = 0; $j < sizeof($name->sections[$i]->contents); $j++) {
                        $dataid = $name->sections[$i]->contents[$j]->data;

                        if (strpos($dataid, 'redirect:') === false && strpos($dataid, 'dealsnprojects:')) {
                            $pos = get_post($dataid);
                            if ($pos == null) {
                                $err = 'error';
                            } else {
                                $cont = json_decode(get_post_field('post_content', $pos));

                                if ($cont->error == true) {
                                    $err = 'error';
                                }
                            }
                        }
                    }
                }
            }
            $content .= '<tr class="af2_pt_row ' . $err . '">
                    <th><label><input id="' . $post->ID . '" type="checkbox" class="af2_checkbox cont filled-in" /><span></span></label></th>
                    <td>' . $number . '</td>
                    <td class="af2_edit_post pointer link" data-id="' . $post->ID . '">' . $name->name . '</td>
                    <td>' . get_post_field('post_title', $post) . '</td>
                    <td class="pro-button">
                        <div class="af2_badge_wrapper">
                            <div class="badge pro-badge"><i class="fa fa-star"></i> Pro</div>
                            <button type="button" class="btn disabled">Code anzeigen </button>
                        </div>
                    </td>
                    <td>' . get_the_author_meta('display_name', get_post_field('post_author', $post)) . '</td>
                    <td>' . get_post_field('post_modified', $post) . '</td>
                    </tr>';

            $number++;
        }
    }
    return $content;
}

/**
 * Printing a sidebar
 *
 * @param $id
 * @param $sidebar_heading
 * @param $sidebar_content
 * @return string
 */
function af2_get_sidebar($id, $sidebar_heading, $sidebar_content, $hide, $right, $unfocus, $static) {
    $hiding = '';
    $rightattr = '';

    if ($hide) {
        $hiding = 'hide';
    }
    if ($sidebar_heading == "Inhalte:") {
        $builder_class = 'builder_question';
        $heading = '<div class="col-10 af2_sidebar_heading">
                    <h4>' . $sidebar_heading . '</h4>
                    <input type="text" id="af2_fragen_search" placeholder="Suche">
                </div>';
    } else {
        $builder_class = '';
        $heading = '<div class="col-10 af2_sidebar_heading">
                    <h4>' . $sidebar_heading . '</h4>
                </div>';
    }


    $content = '';

    if ($static === 'false') {
        $content = '<div class="col-2 af2_sidebar_close_button">
                    <button type="button" class="btn btn-primary toggle_sidebar" data-id="' . $id . '" ><i class="fas fa-times"></i></button>
                </div>';
    }

    if ($right) {
        $content = $heading . $content;
        $rightattr = 'right';
    } else {
        $content = $content . $heading;
    }

    return
            '<nav id="' . $id . '" class="af2_sidebar ' . $rightattr . ' ' . $hiding . '" data-static="' . $static . '">
            <div class="af2_sidebar_header row">' .
            $content .
            '</div>
            <div class="af2_sidebar_content_wrapper ' . $builder_class . '">' .
            $sidebar_content .
            '</div>
            <div class="af2_sidebar_content_whitespace" data-unfocus="' . $unfocus . '"></div>
        </nav>';
}

/**
 * Standard builder navbar content
 *
 * @return string
 */
function af2_get_builder_navbar_content($sidebar_id, $title, $static_left, $switch, $icon) {
    $switch_button = '';
    if ($switch == true) {
        $switch_button = '<button id="af2_switch_view_button" type="button" class="btn btn-primary  ml-5"><i class="fas fa-cogs m-1"></i></button>';
    }
    $toggle_left = $static_left ? '' : '<button class="btn btn-primary toggle_sidebar hide mr-5" data-id="' . $sidebar_id . '">' . $icon . '</button>';
    return
            '<div class="col-4 ' . $sidebar_id . '_button_container">' .
            $toggle_left .
            '<button id="af2_undo_button" type="button" class="btn btn-primary" disabled><i class="fas fa-arrow-left m-1"></i></button>
        <button id="af2_redo_button" type="button" class="btn btn-primary" disabled><i class="fas fa-arrow-right m-1"></i></button>' .
            $switch_button .
            '</div>
    <div class="col-4 af2_navbar_title">
        <h3 class="mt-1 mb-0">' . $title . '</h3>
    </div>
    <div class="col-4 af2_navbar_button_container">
        <button id="af2_back_button" type="button" class="btn btn-primary"><i class="fas fa-ban mr-1"></i>Builder beenden</button>
        <button id="af2_save_button" type="button" class="btn btn-primary mt-1 mb-1"><i class="far fa-save mr-1"></i>Speichern</button>
    </div>';
}

function af2_get_builder_navbar_content_focus($sidebar_id, $title, $static_left, $switch, $icon) {
    $switch_button = '';
    if ($switch == true) {
        $switch_button = '<button id="af2_switch_view_button" type="button" class="btn btn-primary  ml-5">' . $icon . '</button>';
    }
    $toggle_left = $static_left ? '' : '<button class="btn btn-primary toggle_sidebar hide mr-5" data-id="' . $sidebar_id . '"><i class="fas fa-bars"></i></button>';
    return
            '<div class="col-5 ' . $sidebar_id . '_button_container">' .
            $toggle_left .
            '<button id="af2_zoom_out_button" type="button" class="btn btn-primary fix"><i class="fas fa-minus"></i></button>
        <button id="af2_zoom_in_button" type="button" class="btn btn-primary fix"><i class="fas fa-plus"></i></button>' .
            $switch_button .
            '</div>
    <div class="col-3 af2_navbar_title">
        <h3 class="mt-1 mb-0">' . $title . '</h3>
    </div>
    <div class="col-4 af2_navbar_button_container">
     	<button id="af2_back_button" type="button" class="btn btn-primary"><i class="fas fa-ban mr-1"></i>Builder beenden</button>
        <button id="af2_save_button" type="button" class="btn btn-primary mt-1 mb-1"><i class="far fa-save mr-1"></i>Speichern</button>
    </div>';
}

/**
 * Returns content for Sidebars
 *
 * @param $id
 * @param $heading
 * @param $icon_dir
 * @return string
 */
function af2_get_sidebar_generated_content($id, $heading, $icon, $icon_cont, $dots, $choosable, $draggable, $offset_y, $pro=false) {
    $heading = $dots ? $heading . ':' : $heading;
    $drag = $draggable ? 'af2_draggable' : '';
    $cont = $icon_cont ? $icon : '<img class="af2_sb_pic" draggable="false" alt="Select-Icon" src="' . $icon . '">';
    $off_y = $offset_y != false ? 'data-offsetY="' . $offset_y . '"' : 'data-offsetY="0"';
    if ($pro) {
        return '<div class="af2_pro_sidebar_content af2_disabled">
            <div class="badge pro-badge"><i class="fa fa-star"></i> Pro</div>
            <div class="af2_sb_text">
                <p class="af2_sb_p">' . $heading . '</p>
            </div>' .$cont .'</div>';
    } else {
        return '<div id="' . $id . '" class="af2_sidebar_content ' . $drag . '" data-choosable="' . $choosable . '" ' . $off_y . '>
        <div class="af2_sb_text">
            <p class="af2_sb_p">' . $heading . '</p>
        </div>' .$cont .'</div>';
    }
}

function af2_get_sidebar_generated_pro_content($id, $heading, $icon, $icon_cont, $dots, $choosable, $draggable, $offset_y) {
    $heading = $dots ? $heading . ':' : $heading;
    $drag = $draggable ? 'af2_draggable' : '';
    $cont = $icon_cont ? $icon : '<img class="af2_sb_pic" draggable="false" alt="Select-Icon" src="' . $icon . '">';
    $off_y = $offset_y != false ? 'data-offsetY="' . $offset_y . '"' : 'data-offsetY="0"';
    return
            '<div class="af2_sidebar_content af2_disabled">
        <div class="badge pro-badge"><i class="fa fa-star"></i> Pro</div>
        <div class="af2_sb_text">
            <p class="af2_sb_p">' . $heading . '</p>
        </div>' .
            $cont .
            '</div>';
}

function af2_get_sidebar_generated_content_w_data($id, $heading, $icon, $icon_cont, $dots, $choosable, $draggable, $offset_y, $datacontent, $pos) {
    $heading = $dots ? $heading . ':' : $heading;
    $drag = $draggable ? 'af2_draggable' : '';
    $cont = $icon_cont ? $icon : '<img class="af2_sb_pic" draggable="false" alt="Select-Icon" src="' . $icon . '">';
    $off_y = $offset_y != false ? 'data-offsetY="' . $offset_y . '"' : 'data-offsetY="0"';
    return
            '<div id="' . $id . '" class="af2_sidebar_content ' . $drag . '" data-choosable="' . $choosable . '" ' . $off_y . '>
        <div class="af2_sb_text">
            <p class="af2_sb_p">' . $heading . '</p>
        </div>' .
            $cont .
            '<div id="' . $pos . '" class="af2_content_information" style="display:none;">' . $datacontent . '</div>
        </div>';
}

function af2_get_sidebar_generated_content_w_n_data($id, $heading, $icon, $icon_cont, $dots, $choosable, $draggable, $offset_y, $datacontent, $pos) {
    $heading = $dots ? $heading . ':' : $heading;
    $drag = $draggable ? 'af2_draggable' : '';
    $cont = $icon_cont ? $icon : '<img class="af2_sb_pic" draggable="false" alt="Select-Icon" src="' . $icon . '">';
    $off_y = $offset_y != false ? 'data-offsetY="' . $offset_y . '"' : 'data-offsetY="0"';
    return
            '<div id="' . $id . '" class="af2_sidebar_content ' . $drag . '" data-choosable="' . $choosable . '" ' . $off_y . '>
        <div class="af2_sb_text">
            <p class="af2_sb_p">' . $heading . '</p>
        </div>' .
            $cont .
            '<div id="' . $pos . '" class="af2_contact_form_information" style="display:none;">' . $datacontent . '</div>
        </div>';
}

add_action('wp_ajax_update_branding_options','af2_update_branding_options');

function af2_update_branding_options(){
    if(isset($_POST['action']) && sanitize_key($_POST['action']) == 'update_branding_options'){
        $show_branding = (!empty($_POST['show_branding']))?1:0;
        update_option("af2_branding",$show_branding);
    }
    echo 'Branding updated';
    die();
}