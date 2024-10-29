$ = jQuery;
jQuery(document).ready(($) => {
    /** toggle_sidebar clicked **/
    $(document).on('click', '.toggle_sidebar', (ev) => {
        const target = ev.currentTarget;
        if(!($(target).data('static')))
        {
            af2_toggle_sidebar($(target).data('id'));
        }
    });

    /** Sidebar_Content clicked **/
    $(document).on('click', '.af2_sidebar_content', (ev) => {
        if($(ev.currentTarget).data('choosable'))
        {
            af2_sidebar_content_choose(ev.currentTarget);
        }
    });

    /** Clicking in an Sidebar Content object, that triggers **/
    $(document).on('click', '.choose_sb_content', (ev) => {
        let parent = $(ev.currentTarget).parent();
        while(!parent.hasClass('af2_sidebar_content'))
        {
            parent = $(parent).parent();
        }
        af2_sidebar_content_choose(parent);
    });

    /** Clicking in the Sidebar-Content whitespace **/
    $(document).on('click', '.af2_sidebar_content_whitespace', (ev) => {
        if($(ev.currentTarget).data('unfocus'))
        {
            const parent = $(ev.currentTarget).parent();
            af2_throw_event('unfocus_content', [], parent);
        }
    });
});


/** ************************************************************************ **/
/**                        SHOWING AND DISAPPEARING                          **/
/** ************************************************************************ **/

/**
 * Toggling sidebar
 *
 * @param id
 */
const af2_toggle_sidebar = (id) => {
    if($('#'+id)[0] !== undefined)
    {
        if(!($('#'+id).data('static')))
        {
            let action;
            //Sidebar is not already Closed
            if($('#'+id+'.hide')[0] !== undefined)
            {
                action = 'open';
                af2_open_sidebar(id);
            }
            else
            {
                action = 'close';
                af2_close_sidebar(id);
            }

            af2_throw_event('toggle', [{"arg":"id", "content":id}, {"arg":"action", "content":action}], $('#'+id)[0]);
        }
    }
};

/**
 * Opening a Sidebar if she is not already opened
 *
 * @param id
 */
const af2_open_sidebar = (id) => {
    if($('#'+id+'.hide')[0] !== undefined)
    {
        //if(!($('#'+id+'.hide').data('static')))
        //{
            const selector = $('#'+id)[0];
            $(selector).removeClass('hide');
            const btcs = $('.' + id + '_button_container .toggle_sidebar');
            if (btcs[0] !== undefined)
            {
                btcs.addClass('hide');
            }

            af2_throw_event('open', [{"arg":"id", "content":id}], selector);
        //}
    }
};

/**
 * Closing a sidebar if she is not already closed
 *
 * @param id
 */
const af2_close_sidebar = (id) => {
    if($('#'+id+'.hide')[0] === undefined)
    {
        //if(!($('#'+id).data('static')))
        //{
            const selector = $('#'+id)[0];
            $(selector).addClass('hide');
            const btcs = $('.' + id + '_button_container .toggle_sidebar');
            if (btcs[0] !== undefined)
            {
                btcs.removeClass('hide');
            }

            af2_throw_event('close', [{"arg":"id", "content":id}], selector);
        //}
    }
};


/** ************************************************************************ **/
/**                            SELECTION BASED                               **/
/** ************************************************************************ **/

/**
 * Choosing something in sidebar
 *
 * @param target
 */
const af2_sidebar_content_choose = (target) => {
    const parent = $($(target).parent()).parent();
    let multiple = false;
    const parentid = $(parent).attr('id');

    $('#'+parentid+' .selected').each((i, el) => {
        if($(target).attr('id') === $(el).attr('id') || $(target) === $(el))
        {
            multiple = true;
        }
    }).promise().done(() => {
        af2_throw_event('choose', [{"arg":"sidebar", "content":parent}, {"arg":"multiple", "content":multiple}], target);
    });
};

/**
 * Clearing the actual Sidebar Selection
 *
 * @param id
 */
const af2_sidebar_selection_clear = (id) => {
    $('#'+id+' .selected').each((i, el) => {
        $(el).removeClass('selected');
    }).promise().done(() => {
        af2_throw_event("clear", [], $('#'+id)[0]);
    });
};

/**
 * Marking a Sidebar Element as selected
 *
 * @param target
 */
const af2_sidebar_select = (target) => {
    $(target).addClass('selected');
    af2_throw_event("select", [], target);
};


/** ************************************************************************ **/
/**                               CONTENT BASED                              **/
/** ************************************************************************ **/

/**
 * Clears Sidebar Content
 *
 * @param id
 */
const af2_sidebar_clear_content = (id) => {
    $('#'+id+' .af2_sidebar_content_wrapper').html('');
    af2_throw_event("clear", [], $('#'+id)[0]);
};

/**
 * Creating a Sidebar content
 *
 * @param choosable
 * @param icon
 * @param label
 * @param source
 * @returns {string}
 */
const af2_sidebar_create_content = (id, choosable, icon, label, source, must) => {
    const star = must === true ? ' *' : '';
    let cont = '';
    cont += '<div id="'+id+'" class="af2_sidebar_content" data-choosable="'+choosable+'">';
    cont += '<div class="af2_sb_text">';
    cont += '<p class="af2_sb_p">'+icon+label+''+star+'</p>';
    cont += '</div>';
    cont += source;
    cont += '</div>';
    return cont;
};

/**
 * Appends Content
 *
 * @param id
 * @param content
 */
const af2_sidebar_append_content = (id, content) => {
    $('#'+id+' .af2_sidebar_content_wrapper').append(content);
};

/**
 * Sets the Input Focus
 *
 * @param target
 */
const af2_set_input_focus = (target) => {
    $(document).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', '.af2_sidebar');

    if(!$(target).hasClass('hide'))
    {
        return;
    }
    $(document).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', '.af2_sidebar', () => {
        $(document).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', '.af2_sidebar');
        let obj = '';
        $('.af2_focus').each((i, el) => {
            if (obj === '')
            {
                if ($(el).val() === '')
                {
                        obj = el;
                }
            }
        }).promise().done(() => {
            if (obj === '') {
                obj = $('.af2_focus')[0];
            }

            try
            {
                $(obj).focus();
                $($(obj).parent()).addClass('selected');
            } catch(e){

            }
        });
    });
};