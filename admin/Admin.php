<?php

defined('ABSPATH') or die('NO!');

define('AF2_MAIN_MENU_SLUG', 'af2_dashboard');

/**
 * Controll all Actions for the Administrator Backend
 * -> Creating the Menus
 *
 * INFO: Adding a new Folder to the Menu, and filling it with the right content,
 *       will cause an automatic construction of that submenu
 *
 */
class AF2_Admin {

    private $cont;  //Class of Menu Instance

    function __construct() {
        
        add_action('init', array($this, 'af2_register_post_types'));
        add_action('init', array($this, 'af2_register_folder'));
        
        add_action('admin_menu', array($this, 'af2_register_menus'));
        
        add_action('admin_init', array($this, 'af2_pro_redirect'));
        
        add_action('admin_head', array($this, 'af2_pro_target'));
    }

    public function af2_register_post_types() {
        $cpt_labels = array('name' => __('Fragen', 'Post type general name', 'textdomain'),
            'singular_name' => __('Frage', 'Post type singular name', 'textdomain'));

        $cpt_args = array('label' => 'Fragen',
            'labels' => $cpt_labels,
            'public' => true,
            'show_ui' => false,
            'show_in_menu' => false,
            'has_archive' => true);

        $slug = 'af2_anfrage';


        register_post_type($slug, $cpt_args);

        $cpt_args = array('label' => 'Fragen',
            'labels' => $cpt_labels,
            'public' => true,
            'show_ui' => false,
            'show_in_menu' => false,
            'has_archive' => true);

        $slug = 'af2_request';


        register_post_type($slug, $cpt_args);
    }

    /**
     * Register all folders and create an instance of the Menu Classes
     */
    function af2_register_folder() {
        //Read all Menus and generate the Instances
        $file = scandir(AF2_PLUGIN_DIR . '/admin/menus');
        for ($i = 2; $i < sizeof($file); $i++) {
            $pagestr = $file[$i];
            $class = 'AF2_'.substr($pagestr, 3, strlen($pagestr) - 7);

            require_once AF2_PLUGIN_DIR . '/admin/menus/' . $pagestr;

            $this->cont[$i - 2] = new $class();
        }

        //Add all custom_post_types from the instances
        $this->af2_add_post_types();
    }

    /**
     * Adding a Custom Post Type from the content variable
     */
    public function af2_add_post_types() {
        //Iterating content
        for ($i = 0; $i < sizeof($this->cont); $i++) {
            //looks if the custom post type is available
            if (method_exists($this->cont[$i], 'get_cpt_data')) {
                //Retrieving the Data
                $cpt_data = $this->cont[$i]->get_cpt_data();
                $slug = $this->cont[$i]->get_slug();

                register_post_type($slug, $cpt_data);
            }
        }
    }

    /**
     * Adding all menus
     */
    public function af2_register_menus() {
        
        $slug = AF2_MAIN_MENU_SLUG;

        $icon_url = plugins_url("/res/menu_icon.png", AF2_PLUGIN);
        
        //Adding the Main Admin Menu Page
        add_menu_page('Anfrageformular 2.0', 'Anfrageformular', 'manage_options', $slug, '', $icon_url, 26);

        // register submenus
        $this->af2_add_submenu_pages();
        
        // add go pro page menu
        add_submenu_page(AF2_MAIN_MENU_SLUG, 'Entscheide dich für Pro', '<span style="color: #ff4081;font-weight: 700;">Entscheide dich für Pro</span>', 'manage_options', 'af2_go_pro', array($this, 'af2_pro_redirect'));
        
    }

    public function af2_pro_redirect() {
        
        if (empty($_GET['page'])) {
            return;
        }

        if ('af2_go_pro' === sanitize_key($_GET['page'])) {
            wp_redirect(AF2_GO_PRO_URL);
        }
    }

    public function af2_pro_target(){
        ?>
            <script>
                jQuery(function(){
                    jQuery("a[href='admin.php?page=af2_go_pro']").attr("target","__blank");
                })
            </script>
        <?php
    }
    /**
     * Generator for the Submenu Pages
     */
    function af2_add_submenu_pages() {
        
        //Iterating the menu classes
        for ($i = 0; $i < sizeof($this->cont); $i++) {
            
            $submenu_obj = $this->cont[$i];
            
            //Retrieving data
            $submenu_data = $submenu_obj->get_submenu_data();
            
            // register submenu
            add_submenu_page($submenu_data[0], $submenu_data[1], $submenu_data[2], $submenu_data[3], $submenu_data[4], array($submenu_obj,'get_content'));
            
        }
        
    }

}

new AF2_Admin();