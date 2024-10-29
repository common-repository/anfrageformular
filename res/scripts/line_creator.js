$ = jQuery;
function createLine(el1, el2, section, content, bonusClass, connector, to_sec, to_cont){
    var off1 =getElementProperty(el1);
    var off2 =getElementProperty(el2);
    // center of first point
    var dx1 = off1.left + off1.width/2;
    var dy1 = off1.top + off1.height/2;
    // center of second point
    var dx2 = off2.left + off2.width/2;
    var dy2 = off2.top + off1.height/2;
    // distance
    var length = Math.sqrt(((dx2-dx1) * (dx2-dx1)) + ((dy2-dy1) * (dy2-dy1)));
    // center
    var cx = ((dx1 + dx2) / 2) - (length / 2);
    var cy = ((dy1 + dy2) / 2) - (2	 / 2);
    // angle
    var angle = Math.atan2((dy1-dy2),(dx1-dx2))*(180/Math.PI);
    // draw line

    let cl = '';
    if(bonusClass !== undefined)
    {
       cl = bonusClass;
    }

    return  "<section data-tosec='"+to_sec+"' data-tocont='"+to_cont+"' data-sec='"+section+"' data-cont='"+content+"' data-connector='"+connector+"'  class='connectingLines "+cl+"' style='left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -webkit-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);'></section>";
};

function getElementProperty(el){
    var dx = 0;
    var dy = 0;
    var width = el.width()|0;
    var height = el.height()|0;

    let ol = 0;
    let ot = 0;

    if(el.offset() !== undefined)
    {
        ol = el.offset().left;
        ot = el.offset().top;
    }

    let scrollL = $('.af2_content').scrollLeft();
    let scrollT = $('.af2_content').scrollTop();

    if($(el).hasClass('phantom'))
    {
        scrollL = scrollL * zoom;
        scrollT = scrollT * zoom;
    }

    dx += (ol - $('.af2_content').offset().left + scrollL);
    dy += (ot - $('.af2_content').offset().top + scrollT);

    if($(el).hasClass('phantom'))
    {
        dx = dx / zoom;
        dy = dy / zoom;
    }

    return { top: dy, left: dx, width: width, height: height };
};