let af2_save_stack = [];
let af2_save_step = 0;
let af2_new_step = false;
$ = jQuery;
jQuery(document).ready(($) => {
    $('.af2_whole').on('save_state_change', (ev) => {
        const thecont = {"content_before": ev.content_before, "content_after":ev.content_after,
            "method": ev.method, "callback": ev.callback, "obj": ev.obj, "callbackarg":ev.callbackarg};
        const newwish = ev.special !== undefined && ev.special === true ? ev.special : false;

        //FIRST TIME
        if(af2_save_stack[af2_save_step] !== undefined && af2_save_step > -1)
        {
            let content_before = thecont.content_before;
            let content_after = af2_save_stack[af2_save_step].content_after;

            if(content_before !== content_after)
            {
                try
                {
                    if(JSON.stringify(content_before) === JSON.stringify(content_after))
                    {
                        content_before = JSON.stringify(content_before);
                        content_after = JSON.stringify(content_after);
                    }
                } catch(e) {

                }
            }
            //OTHER ONE, OR NEW WISHED
            if(af2_save_stack[af2_save_step].method === thecont.method &&
                content_before === content_after &&
                thecont.callback === af2_save_stack[af2_save_step].callback && !af2_new_step && newwish === false)
            {
                af2_save_stack[af2_save_step].content_after = thecont.content_after;
            }
            else //ELSE
            {
                af2_new_step = false;
                if(af2_save_stack.length === 29)
                {
                    af2_save_stack.shift();
                }
                else
                {
                    af2_save_step++;
                }
                af2_save_stack[af2_save_step] = thecont;
            }
        }
        else
        {
            if(af2_save_step === -1)
            {
                af2_save_step = 0;
            }
            af2_save_stack[af2_save_step] = thecont;
        }

        //POP THEN CHECK BUTTONS
        $.when(af2_save_pop_top()).done(() => {af2_check_save_stack_buttons()});
    });

    /** Undo Button Listener **/
    $('#af2_undo_button').on('click', () => {
        af2_undo();
    });

    /** Redo Button Listener **/
    $('#af2_redo_button').on('click', () => {
        af2_redo();
    });
});

/**
 * Activating new Step
 */
const af2_activate_new_step = () => {
    if(af2_save_stack.length > 0)
    {
        af2_new_step = true;
    }

    af2_check_save_stack_buttons();
};

/**
 * Popping unneccesarry top parts
 */
const af2_save_pop_top = () => {
    for(let i = af2_save_stack.length - 1; i >= 0; i--)
    {
        if(af2_save_step === i)
        {
            break;
        }
        else {
            af2_save_stack.pop();
        }
    }
};

/**
 * Undo!
 */
const af2_undo = () => {
    const obj = af2_save_stack[af2_save_step];
    const content = obj.content_before;
    af2_do(obj, content);
        af2_save_step--;

    af2_check_save_stack_buttons();
};

/**
 * Redo!
 */
const af2_redo = () => {
    af2_save_step++;
    const obj = af2_save_stack[af2_save_step];
    const content = obj.content_after;
    af2_do(obj, content);

    af2_check_save_stack_buttons();
};

/**
 * Do Action
 *
 * @param obj
 * @param content
 */
const af2_do = (obj, content) => {

    af2_throw_event('do', [], $('.af2_whole'));

    const method = obj.method;
    const callback = obj.callback;

    if($('#'+obj.obj) !== undefined && $('#'+obj.obj)[0] !== undefined)
    {
        af2_throw_event('do_content', [{"arg":"selector", "content":'#'+obj.obj}], $('#'+obj.obj));
    }

    const adjusts = method(content);
    if(adjusts !== undefined || adjusts !== null || adjusts.length > 0)
    {
        $.when(af2_do_adjusts(adjusts)).done(() => {
            if(obj.callbackarg !== undefined && obj.callbackarg !== null)
            {
                callback(obj.callbackarg);
            }
            else
            {
                callback();
            }
        });
    }
    else
    {
        if(obj.callbackarg !== undefined && obj.callbackarg !== null)
        {
            callback(obj.callbackarg);
        }
        else
        {
            callback();
        }
    }
};

/**
 * Doing adjusts if an object is not here atm, that it gets back!
 *
 * @param adjusts
 */
const af2_do_adjusts = (adjusts) =>
{
    $(adjusts).each((i, el) => {
        af2_jsonobj[el.arg] = el.content;
    });
};

/**
 * Check for States of the Buttons
 */
const af2_check_save_stack_buttons = () => {
    if(!$('#af2_undo_button').hasClass('fix')) {
        if (af2_save_step >= 0) {
            $('#af2_undo_button').prop('disabled', false);
        } else {

            $('#af2_undo_button').prop('disabled', true);
        }
    }
    if(!$('#af2_redo_button').hasClass('fix')) {

        if (af2_save_stack.length - 1 > af2_save_step) {
            $('#af2_redo_button').prop('disabled', false);
        } else {

            $('#af2_redo_button').prop('disabled', true);
        }
    }
};