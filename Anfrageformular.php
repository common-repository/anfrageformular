<?php
/*
  Plugin Name: Anfrageformular
  Description: Mit dem Anfrageformular erstellst du einfach hübsche WordPress Formulare! Verbessere deine Leadgenerierung, erhalte mehr Kunden sowie eine bessere Struktur! Erstelle mit wenigen Klicks hochwertige Formulare per Drag & Drop, ohne eine Zeile Code anzufassen und führe deine Website Besucher intuitiv durch ein verkaufsstarken Prozess, der mehr Anfragen für dich generiert.
  Author: Anfrageformular
  Author URI: https://anfrageformular.com/
  Author E-Mail: support@anfrageformular.com
  Version: 1.2
 */

 
if ( ! function_exists( 'anf_fs' ) ) {
    // Create a helper function for easy SDK access.
    function anf_fs() {
        global $anf_fs;

        if ( ! isset( $anf_fs ) ) {
            // Include Freemius SDK.
            require_once dirname(__FILE__) . '/freemius/start.php';

            $anf_fs = fs_dynamic_init( array(
                'id'                  => '6733',
                'slug'                => 'anfrageformular',
                'type'                => 'plugin',
                'public_key'          => 'pk_49a4c71f1208ebfee3a0de3afc827',
                'is_premium'          => false,
                'has_addons'          => false,
                'has_paid_plans'      => false,
                'menu'                => array(
                    'slug'           => 'af2_dashboard',
                    'account'        => false,
                    'contact'        => false,
                    'support'        => false,
                ),
            ) );
        }

        return $anf_fs;
    }

    // Init Freemius.
    anf_fs();
    // Signal that SDK was initiated.
    do_action( 'anf_fs_loaded' );
}
defined('ABSPATH') or die('NO!');
///Throw out if unallowed access
//Plugin DIRS
define('AF2_PLUGIN', __FILE__);
define('AF2_PLUGIN_DIR', untrailingslashit(dirname(AF2_PLUGIN)));

//Paths
define('AF2_SETTINGS_PATH', AF2_PLUGIN_DIR . '/settings.php');
define('AF2_ADMIN_PATH', AF2_PLUGIN_DIR . '/admin/Admin.php');
define('AF2_FRONTEND_PATH', AF2_PLUGIN_DIR . '/frontend/frontend_view.php');
define('AF2_MENU_TOOLS_PATH', AF2_PLUGIN_DIR . '/admin/menu_tools.php');
define('AF2_LOADING_GIF', '/res/af2_loading.gif');

define('AF2_GO_PRO_URL','https://anfrageformular.com/gopro/');

define('AF2_PLUGIN_BASE',plugin_basename(AF2_PLUGIN));

require_once AF2_SETTINGS_PATH;

/**
* Plugin action links.
*
* Adds action links to the plugin list table
*
* Fired by `plugin_action_links` filter.
*
* @param array $links An array of plugin action links.
* @return array An array of plugin action links.
*/

add_filter('plugin_action_links_' . AF2_PLUGIN_BASE, 'af2_plugin_action_links');

function af2_plugin_action_links($links) {

    $links['go_pro'] = sprintf('<a href="%1$s" target="_blank" style="color: #d30c5c;text-shadow: 1px 1px 1px #eee;font-weight: 700;">%2$s</a>', 'https://anfrageformular.com/preise/', 'Entscheide dich für Pro');

    return $links;
}

/**
 * Plugin row meta.
 * Adds row meta links to the plugin list table
 * Fired by `plugin_row_meta` filter.
 * 
 * @param array  $plugin_meta An array of the plugin's metadata, including the version, author, author URI, and plugin URI.
 * @param string $plugin_file Path to the plugin file, relative to the plugins directory.
 *
 * @return array An array of plugin row meta links.
 */
add_filter('plugin_row_meta', 'af2_plugin_row_meta', 11, 2);

function af2_plugin_row_meta($plugin_meta, $plugin_file) {
    if (AF2_PLUGIN_BASE === $plugin_file) {
        $plugin_meta[] = '<a href="https://help.anfrageformular.com/" aria-label="Help Center - Tutorials" target="_blank">Help Center - Tutorials</a>';
    }

    return $plugin_meta;
}