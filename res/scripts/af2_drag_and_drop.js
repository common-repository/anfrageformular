let af2_mouse_down = false; // mouse is down
let af2_dragging = false;   // dragging
let af2_offsetX = 0;        // page offset
let af2_offsetY = 0;        // page offset
let af2_content_offsetX = 0;
let af2_content_offsetY = 0;
let af2_el_offsetX = 0;     // element offset
let af2_el_offsetY = 0;     // element offset
let mouseX = 0;
let mouseY = 0;

let stack = [];

jQuery(document).ready(($) => {
    if ($('.af2_whole')[0] !== undefined)
    {
        const offset = $('.af2_whole').offset();
        af2_offsetX = offset.left;
        af2_offsetY = offset.top;

        const content_offset = $('.af2_content').offset();
        af2_content_offsetX = content_offset.left;
        af2_content_offsetY = content_offset.top;

        $(document).on('click', (ev) => {

        });

        $(document).on('mousedown', '.af2_draggable', (ev) => {
            if (!af2_mouse_down)
            {
                mouseX = ev.pageX;
                mouseY = ev.pageY;
                stack.push(ev.currentTarget);
                if ($('.af2_content').data('dragscroll'))
                {
                    $('.af2_content').removeClass('dragscroll');
                    dragscroll.reset();
                }
                af2_dragging = false;
                af2_mouse_down = true;
                const offset = $(ev.currentTarget).offset();
                let zvar = zoom !== undefined ? zoom : 1;
                af2_el_offsetX = ev.pageX - (offset.left) * zvar;
                if ($(ev.currentTarget).data('offsety') > 0)
                {
                    af2_el_offsetY = ($(ev.currentTarget).data('offsety')) * zvar;
                } else
                {
                    af2_el_offsetY = (ev.pageY - offset.top) * zvar;
                }
                af2_create_drag_n_drop_event('draggable_select', ev.pageX, ev.pageY, {'left': af2_el_offsetX, 'top': af2_el_offsetY}, ev.currentTarget, ev.currentTarget, null);
            }
        });

        $(document).on('mousemove', (ev) => {
            if (af2_mouse_down)
            {
                if (ev.pageX !== mouseX || ev.pageY !== mouseY)
                {
                    const obj = $('.af2_drag_object')[0];
                    const offset = {"left": af2_el_offsetX, "top": af2_el_offsetY};

                    if (!af2_dragging)
                    {
                        af2_create_drag_n_drop_event('first_drag', ev.pageX, ev.pageY, offset, obj, obj, null);
                    } else if (af2_dragging)
                    {
                        af2_create_drag_n_drop_event('drag', ev.pageX, ev.pageY, offset, obj, obj, null);
                    }

                    if (!af2_dragging)
                    {
                        af2_dragging = true;
                    }
                }
            }
        });

        $(document).on('mouseup', (ev) => {
            stack = [];
            if (af2_mouse_down)
            {
                if ($('.af2_content').data('dragscroll'))
                {
                    $('.af2_content').addClass('dragscroll');
                    dragscroll.reset();
                }
                const obj = $('.af2_drag_object')[0];
                const offset = {"left": af2_el_offsetX, "top": af2_el_offsetY};
                af2_mouse_down = false;
                af2_el_offsetX = 0;
                af2_el_offsetY = 0;
                let dropper = false;
                $('.af2_drop_container').each((i, el) => {

                    if ($(el).is(':hover') || $(el).hasClass('hover'))
                    {
                        dropper = el;
                    }
                }).promise().done(() => {
                    if (dropper === false)
                    {
                        af2_create_drag_n_drop_event('drop', ev.pageX, ev.pageY, offset, obj, obj, null);
                    } else
                    {
                        af2_create_drag_n_drop_event('drop_into', ev.pageX, ev.pageY, offset, obj, obj, dropper);
                    }
                });
            }
        });

        $(document).on("mouseenter",".af2_form_section_content.af2_draggable",function(){
            $(this).addClass('hover');
        });

        $(document).on("mouseleave",".af2_form_section_content.af2_draggable",function(){
            $(this).removeClass('hover');
        });
    }


});

const af2_generate_position_args = (pageX, pageY, offset, target) => {
    let content = {};
    content.mousePosX = pageX;      //MOUSE POSITION ON PAGE
    content.mousePosY = pageY;      // MOUSE POSITION ON PAGE
    content.mousePosXinContent = pageX - af2_offsetX;       //mouse position in plugin
    content.mousePosYinContent = pageY - af2_offsetY;       //mouse position in plugin
    content.offsetX = offset.left;      //element offset
    content.offsetY = offset.top;       //element offset
    let marginl = 0;
    let margint = 0;
    try
    {
        marginl = $(target).css("margin-left").replace('px', '');
        margint = $(target).css("margin-top").replace('px', '');
    } catch (e)
    {

    }

    content.drawX = content.mousePosXinContent - content.offsetX - marginl;
    content.drawY = content.mousePosYinContent - content.offsetY - margint;

    return content;
};

/** Throwing drag n drop even **/
const af2_create_drag_n_drop_event = (eventname, pageX, pageY, offset, target, trigger, into) => {
    const content = af2_generate_position_args(pageX, pageY, offset, target);

    let eventargs = [];
    eventargs.push({"arg": "position", "content": content});
    eventargs.push({"arg": "into", "content": into});

    af2_throw_event(eventname, eventargs, trigger);
};

const af2_dnd_set_element_position = (el, ev) =>
        {
            $(el).css("left", ev.position.drawX);
            $(el).css("top", ev.position.drawY);
        };

const af2_dnd_set_element_position_without_offs = (el, ev) => {
    $(el).css("left", (ev.position.drawX + af2_offsetX - af2_content_offsetX + ev.position.offsetX - 11 + $('.af2_content').scrollLeft()));
    $(el).css("top", (ev.position.drawY + af2_offsetY - af2_content_offsetY + ev.position.offsetY - 11 + $('.af2_content').scrollTop()));
};