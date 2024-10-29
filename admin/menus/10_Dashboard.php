<?php

/**
 * The Dashboard
 */
class AF2_Dashboard {

    private $submenu_data; //Data for constructing the submenu

    /**
     * Dashboard constructor.
     * -> Filling the submenu_data
     */

    public function __construct() {
        require_once AF2_MENU_TOOLS_PATH;

        $this->submenu_data = array(AF2_MAIN_MENU_SLUG, 'Dashboard', 'Dashboard', 'manage_options', AF2_MAIN_MENU_SLUG);
    }

    /**
     * @return array -> submenu_data
     */
    public function get_submenu_data() {
        return $this->submenu_data;
    }

    /**
     * Content of the Adminpage
     */
    public function get_content() {

        wp_enqueue_style('materialize.min');
        wp_enqueue_style('m-style.min');
        wp_enqueue_style('materialize-custom');


        $currentyear = intval(date('Y'));
        $currentmonth = intval(date('m'));
        $month = date('F');
        switch ($month) {
            case 'January': {
                    $month = 'Januar';
                    break;
                }
            case 'February': {
                    $month = 'Februar';
                    break;
                }
            case 'March': {
                    $month = 'März';
                    break;
                }
            case 'April': {
                    $month = 'April';
                    break;
                }
            case 'May': {
                    $month = 'Mai';
                    break;
                }
            case 'June': {
                    $month = 'Juni';
                    break;
                }
            case 'July': {
                    $month = 'Juli';
                    break;
                }
            case 'August': {
                    $month = 'August';
                    break;
                }
            case 'September': {
                    $month = 'September';
                    break;
                }
            case 'October': {
                    $month = 'Oktober';
                    break;
                }
            case 'November': {
                    $month = 'November';
                    break;
                }
            case 'December': {
                    $month = 'Dezember';
                    break;
                }
        }

        $events = query_posts(
                array(
                    'post_type' => 'af2_request',
                    'posts_per_page' => -1,
                    'monthnum' => $currentmonth
        ));


        $cont = '<div class="row">';
        $cont .= ' 
           <div class="col s12 m6 l6 xl3">
             <div class="card gradient-45deg-light-blue-cyan gradient-shadow min-height-100 white-text animate fadeLeft">
                <div class="padding-4">
                   <div class="col s7 m7">
                      <i class="fas fa-eye background-round mt-5"></i>
                      <p>Impressionen</p>
                   </div>
                   <div class="col s5 m5 right-align af2_pad_0">
                      <h5 class="mb-0 white-text">0</h5>
                   </div>
                </div>
             </div>
          </div>
          <div class="col s12 m6 l6 xl3">
             <div class="card gradient-45deg-red-pink gradient-shadow min-height-100 white-text animate fadeLeft">
                <div class="padding-4">
                   <div class="col s7 m7">
                      <i class="far fa-comment background-round mt-5"></i>
                      <p>Conversions</p>
                   </div>
                   <div class="col s5 m5 right-align af2_pad_0">
                      <h5 class="mb-0 white-text">0</h5>
                   </div>
                </div>
             </div>
          </div>
          <div class="col s12 m6 l6 xl3">
             <div class="card gradient-45deg-amber-amber gradient-shadow min-height-100 white-text animate fadeRight">
                <div class="padding-4">
                   <div class="col s7 m7">
                      <i class="far fa-chart-bar background-round mt-5"></i>
                      <p>Conv. Rate</p>
                   </div>
                   <div class="col s5 m5 right-align af2_pad_0">
                      <h5 class="mb-0 white-text">0%</h5>
                   </div>
                </div>
             </div>
          </div>
          <div class="col s12 m6 l6 xl3">
             <div class="card gradient-45deg-green-teal gradient-shadow min-height-100 white-text animate fadeRight">
                <div class="padding-4">
                   <div class="col s7 m7">
                      <i class="fas fa-percentage background-round mt-5"></i>
                      <p>Impr./Conv.</p>
                   </div>
                   <div class="col s5 m5 right-align af2_pad_0">
                      <h5 class="mb-0 white-text">0</h5>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    </div>
    <div class="row">
        <div class="col s12 m8 l8">
        <div id="revenue-chart" class="card animate fadeUp">
            <div class="card-content">
               <h4 class="header mt-0">
                  ANFRAGEN IM ' . $month . '
                  <span class="purple-text small text-darken-1 ml-1">
                     <i class="material-icons"></i></span>
                  <!--<a class="waves-effect waves-light btn gradient-45deg-purple-deep-orange gradient-shadow right">Details</a>-->
               </h4>
               <div class="row">
                  <div class="col s12">
                     <div class="monthly-conversion-chart">
                        <canvas id="thisMonth" class="firstShadow chartjs-render-monitor" height="700" width="1350" style="display: block; height: 350px; width: 675px;"></canvas>
                        <!--<canvas id="lastMonth" height="700" width="1350" class="chartjs-render-monitor" style="display: block; height: 350px; width: 675px;"></canvas>!-->
                     </div>
                  </div>
               </div>
            </div>
         </div>
         </div>
         <div class="col s12 m4 l4">
         <div id="weekly-earning" class="card animate fadeUp">
            <div class="card-content"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
               <h4 class="header m-0">Conversions <i class="material-icons right grey-text lighten-3"></i></h4>
               <p class="no-margin grey-text lighten-3 medium-small">' . $month . '</p>
               <h3 class="header">0<i class="material-icons deep-orange-text text-accent-2"></i></h3>
               <canvas id="monthlyEarning" class="chartjs-render-monitor" height="152" width="308" style="display: block; height: 76px; width: 154px;"></canvas>
               <div class="center-align">
               </div>
            </div>
         </div>
        <!--<canvas id="lastYearRevenue" height="700" width="1350" class="chartjs-render-monitor" style="display: block; height: 350px; width: 675px;"></canvas> !-->
        
        ';


        $c = af2_get_cpt_content_pro('Dashboard', $cont);

        echo $c;

    }

}