let err = false;
let ac_list = undefined;
$ = jQuery;
jQuery(document).ready(() => {
    /** Loading the Content **/
    $(document).on('load_content', (ev) => {
        af2_fb_load_content(ev.content);
    });

    /** Choosed a Content in a sidebar **/
    $(document).on('choose', '.af2_sidebar_content', (ev) => {
        if(!ev.multiple)
        {
            af2_fb_choose_content_in_sidebar(ev.sidebar, ev.currentTarget);
        }
    });

    /** Selecting an Editable Content **/
     $(document).on('select', '.af2_editable_content', (ev) => {
        if(!ev.multiple)
        {
            af2_set_input_focus($('#af2_customize_sidebar')[0]);
            af2_sidebar_clear_content('af2_customize_sidebar');
            af2_start_customize_sidebar(ev.currentTarget);
            af2_clear_editable_content();
            af2_select_editable_content(ev.currentTarget);
        }
    });

    /** When Input content Changing **/
     $(document).on('input_content_change', '.af2_changeable', (ev) => {
        const id = $(ev.currentTarget).attr('id');
        af2_validate_input_change_object(id, ev.content);
    });

     /** CLICK ON ADDING ANSWER **/
     $(document).on('click', '.af2_add_answer', (ev) => {
         af2_choose_create_new_answer(ev.currentTarget);
     });

     $(document).on('image_picked', '.af2_answer_img', (ev) => {
         af2_validate_input_change_object($(ev.currentTarget).attr('id'), ev.value);
     });

     $(document).on('icon_selected', '.af2_answer_img', (ev) => {
         af2_validate_input_change_object(ev.id, ev.val);
     });

     $(document).on('delete', '.af2_answer', (ev) => {
         const id = $(ev.currentTarget).attr('id');
         const pos = id.substr(11);
         af2_choose_delete_answer(pos);
     });

    $('.af2_whole').on('dropped_into_container', (ev) => {
        af2_move_answer(ev.dragelpos, ev.containerpos);
    }) ;

    $('.af2_whole').on('save', () => {
        af2_fb_save();
    });

    $('.af2_whole').on('back', () => {
        af2_fb_close();
    });
});

const af2_fb_close = () => {
    af2_throw_toast('message', 'Möchten Sie wirklich beenden? Nicht gespeicherte Daten gehen verloren!'+
        '<button id="close_now" class="btn btn-primary ml-1 mt-2 p-1">Beenden</button>');
};

const af2_fb_save = () =>
{
    $.when(af2_fb_check()).done(() => {
        if(err === false)
        {
            af2_jsonobj['error'] = false;
            af2_save();
        }
        else if(err === true)
        {
            af2_jsonobj['error'] = true;
            af2_save();
        }
    });
};

const af2_fb_check = () => {
    let error = false;
    $('.af2_error').each((i, el) => {
        $(el).removeClass('af2_error');
    });
    //Prüfung ob ein valider Fragentyp vorhanden ist!
    if(af2_jsonobj['typ'] === 'af2_select' || af2_jsonobj['typ'] === 'af2_multiselect' ||af2_jsonobj['typ'] === 'af2_textfeld' || af2_jsonobj.typ === 'af2_textbereich' || af2_jsonobj.typ === 'af2_datum' || af2_jsonobj.typ === 'af2_slider' || af2_jsonobj.typ === 'af2_content' || af2_jsonobj.typ === 'af2_datum')
    {
        //Prüfung ob eine Frage angegeben ist
        if(af2_jsonobj.name === undefined || af2_jsonobj.name.trim() === '')
        {
            $('#af2_questiontitle').addClass('af2_error');
            error = true;
            af2_throw_toast('error', 'Keine Frage angegeben!');
        }
        //Prüfung nach einem Typen mit Antworten
        if(af2_jsonobj.typ === 'af2_select' || af2_jsonobj.typ === 'af2_multiselect')
        {
            if(af2_jsonobj.answers.length < 2)
            {
                error = true;
                af2_throw_toast('error', 'Sie müssen mindestens 2 Antworten angeben');
            }
            else
            {
                $(af2_jsonobj.answers).each((i, el) => {
                    const text = el.text;
                    const img = el.img;
                    if(text === undefined || text.trim() === '' || img === undefined || img.trim() === '')
                    {
                        error = true;
                        $('#af2_answer_'+i).addClass('af2_error');
                        af2_throw_toast('error', 'Die Inhalte der Antwort ' + (i+1) + ' sind unvollständig');
                    }
                });
            }
        }
        //Prüfung nach Konditionen!
        if(af2_jsonobj.typ === 'af2_multiselect')
        {
            if((!$.isNumeric(af2_jsonobj.condition) && af2_jsonobj.condition !== '') || ($.isNumeric(af2_jsonobj.condition) && af2_jsonobj.condition < 2))
            {
                error = true;
                $('#af2_condition').addClass('af2_error');
                af2_throw_toast('error', 'Die Maximale Anzahl muss ein numerischer Wert über 1 sein!');
            }
            else if((!$.isNumeric(af2_jsonobj.condition) && af2_jsonobj.condition !== '') || ($.isNumeric(af2_jsonobj.condition) && af2_jsonobj.condition >= af2_jsonobj.answers.length))
            {
                error = true;
                $('#af2_condition').addClass('af2_error');
                af2_throw_toast('error', 'Die Maximale Anzahl ist zu hoch (zu wenig Antwortmöglichkeiten)');
            }
        }
    }
    else
    {
        error = true;
        af2_open_sidebar('af2_content_sidebar');
        af2_throw_toast('error', 'Keinen Typ ausgewählt!');
    }

    err = error;

    return error;
};

/** ************************************************************************ **/
/**                               LOAD METHODS                               **/
/** ************************************************************************ **/

/**
 * Loading Content
 *
 * @param content
 */
const af2_fb_load_content = (content) => {
    af2_jsonobj = content;
    af2_answers = content.answers;
    if(content.description === undefined) af2_jsonobj.description = '';

    af2_update_question_type();
};


/** ************************************************************************ **/
/**                                 ACTIONS                                  **/
/** ************************************************************************ **/

/**
 * Choosing in Sidebar
 *
 * @param sidebar
 * @param target
 */
const af2_fb_choose_content_in_sidebar = (sidebar, target) => {
    const id = $(sidebar).attr('id');
    if(id === 'af2_content_sidebar')
    {
        const before = {"arg":"content_before", "content":af2_jsonobj.typ}; // BEFORE STATE
        const method = {"arg":"method", "content":af2_save_question_type};  // MODEL METHOD
        const callback = {"arg":"callback", "content":af2_update_question_type};  // VIEW METHOD
        const special = {"arg":"special", "content":true}; // new line thing
        $.when(af2_save_question_type($(target).attr('id'))).done(() => {
            const after = {"arg":"content_after", "content":af2_jsonobj.typ};  // CONTENT AFTER
            af2_throw_event('af2_update', [special, callback, before, after, method], $('.af2_whole'));
        });

    }
    else if(id === 'af2_customize_sidebar')
    {
        af2_sidebar_selection_clear(id);
        af2_sidebar_select(target);
    }
};

/**
 * Changing Input validation
 *
 * @param id
 * @param content
 */
 const af2_validate_input_change_object = (id, content) => {
    if(id === 'af2_questiontitle')
    {
        const before = {"arg":"content_before", "content":af2_jsonobj.name};
        const method = {"arg":"method", "content":af2_save_question_title};
        const callback = {"arg":"callback", "content":af2_update_question_title};
        const obj = {"arg":"obj", "content":'af2_questiontitle'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_question_title(content)).done(() => {
            const after = {"arg":"content_after", "content":af2_jsonobj.name};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    if(id === 'af2_questiondescription')
    {
        const before = {"arg":"content_before", "content":af2_jsonobj.description};
        const method = {"arg":"method", "content":af2_save_question_description};
        const callback = {"arg":"callback", "content":af2_update_question_description};
        const obj = {"arg":"obj", "content":'af2_questiondescription'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_question_description(content)).done(() => {
            const after = {"arg":"content_after", "content":af2_jsonobj.description};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    if(id === 'af2_condition')
    {
        const before = {"arg":"content_before", "content":af2_jsonobj.condition};
        const method = {"arg":"method", "content":af2_save_condition};
        const callback = {"arg":"callback", "content":af2_update_condition};
        const obj = {"arg":"obj", "content":'af2_questiontitle'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_condition(content)).done(() => {
            const after = {"arg":"content_after", "content":af2_jsonobj.condition};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }

    else if(id.includes('af2_slide_wrapper_min'))
    {
        const before = {"arg":"content_before", "content":af2_jsonobj.min};
        const method = {"arg":"method", "content":af2_save_min};
        const callback = {"arg":"callback", "content":af2_update_min};
        const obj = {"arg":"obj", "content":'af2_slide_wrapper'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_min(content)).done(() => {
            const after = {"arg":"content_after", "content":af2_jsonobj.min};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_slide_wrapper_label'))
    {
        const before = {"arg":"content_before", "content":af2_jsonobj.label};
        const method = {"arg":"method", "content":af2_save_label};
        const callback = {"arg":"callback", "content":af2_update_label};
        const obj = {"arg":"obj", "content":'af2_slide_wrapper'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_label(content)).done(() => {
            const after = {"arg":"content_after", "content":af2_jsonobj.label};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_slide_wrapper_max'))
    {
        const before = {"arg":"content_before", "content":af2_jsonobj.max};
        const method = {"arg":"method", "content":af2_save_max};
        const callback = {"arg":"callback", "content":af2_update_max};
        const obj = {"arg":"obj", "content":'af2_slide_wrapper'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_max(content)).done(() => {
            const after = {"arg":"content_after", "content":af2_jsonobj.max};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_slide_wrapper_step'))
    {
        const before = {"arg":"content_before", "content":af2_jsonobj.step};
        const method = {"arg":"method", "content":af2_save_steps};
        const callback = {"arg":"callback", "content":af2_update_steps};
        const obj = {"arg":"obj", "content":'af2_slide_wrapper'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_steps(content)).done(() => {
            const after = {"arg":"content_after", "content":af2_jsonobj.step};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_slide_wrapper_start'))
    {
        const before = {"arg":"content_before", "content":af2_jsonobj.start};
        const method = {"arg":"method", "content":af2_save_start};
        const callback = {"arg":"callback", "content":af2_update_start};
        const obj = {"arg":"obj", "content":'af2_slide_wrapper'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_start(content)).done(() => {
            const after = {"arg":"content_after", "content":af2_jsonobj.start};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_slide_wrapper_thousand'))
    {
        const before = {"arg":"content_before", "content":af2_jsonobj.thousand};
        const method = {"arg":"method", "content":af2_save_thousand};
        const callback = {"arg":"callback", "content":af2_update_thousand};
        const obj = {"arg":"obj", "content":'af2_slide_wrapper'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_thousand(content)).done(() => {
            const after = {"arg":"content_after", "content":af2_jsonobj.thousand};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_slide_wrapper_lab'))
    {
        const before = {"arg":"content_before", "content":af2_jsonobj.lab};
        const method = {"arg":"method", "content":af2_save_lab};
        const callback = {"arg":"callback", "content":af2_update_lab};
        const obj = {"arg":"obj", "content":'af2_slide_wrapper'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_lab(content)).done(() => {
            const after = {"arg":"content_after", "content":af2_jsonobj.lab};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_content_area_cb_'))
    {
        const before = {"arg":"content_before", "content":af2_jsonobj.content_button};
        const method = {"arg":"method", "content":af2_save_content_button};
        const callback = {"arg":"callback", "content":af2_update_content_button};
        const obj = {"arg":"obj", "content":'af2_slide_wrapper'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_content_button(content)).done(() => {
            const after = {"arg":"content_after", "content":af2_jsonobj.content_button};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_content_area_wait_'))
    {
        const before = {"arg":"content_before", "content":af2_jsonobj.content_wait};
        const method = {"arg":"method", "content":af2_save_content_wait};
        const callback = {"arg":"callback", "content":af2_update_content_wait};
        const obj = {"arg":"obj", "content":'af2_slide_wrapper'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_content_wait(content)).done(() => {
            const after = {"arg":"content_after", "content":af2_jsonobj.content_wait};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_content_button_text'))
    {
        const before = {"arg":"content_before", "content":af2_jsonobj.content_button_text};
        const method = {"arg":"method", "content":af2_save_content_button_text};
        const callback = {"arg":"callback", "content":af2_update_content_button_text};
        const obj = {"arg":"obj", "content":'af2_slide_wrapper'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_content_button_text(content)).done(() => {
            const after = {"arg":"content_after", "content":af2_jsonobj.content_button_text};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_answer_p_'))
    {
        const pos = id.substr(13);
        const ob = af2_jsonobj.answers[pos];
        const before = {"arg":"content_before", "content":{"count":pos,"delete":false, "text":ob.text, "img":ob.img, "insert":false}};
        const method = {"arg":"method", "content":af2_save_answer};
        const callback = {"arg":"callback", "content":af2_update_answer_text};
        const obj = {"arg":"obj", "content":'af2_answer_'+pos};   // OBJ TO CALL THE DO ON
        const cbarg = {"arg":"callbackarg", "content":pos};
        $.when(af2_save_answer({"count":pos,"delete":false, "text":content, "img":ob.img, "insert":false})).done(() => {
            const cafter = {"count":pos,"delete":false, "text":content, "img":ob.img, "insert":false};
            const after = {"arg":"content_after", "content":cafter};
            af2_throw_event('af2_update', [cbarg, callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_answer_pic_'))
    {
        const pos = id.substr(15);
        const ob = af2_jsonobj.answers[pos];
        const before = {"arg":"content_before", "content":{"count":pos,"delete":false, "text":ob.text, "img":ob.img, "insert":false}};
        const method = {"arg":"method", "content":af2_save_answer};
        const callback = {"arg":"callback", "content":af2_update_answer_pic};
        const obj = {"arg":"obj", "content":'af2_answer_'+pos};   // OBJ TO CALL THE DO ON
        const cbarg = {"arg":"callbackarg", "content":pos};
        const special = {"arg":"special", "content":true};
        $.when(af2_save_answer({"count":pos,"delete":false, "text":ob.text, "img":content})).done(() => {
            const cafter = {"count":pos,"delete":false, "text":ob.text, "img":content, "insert":false};
            const after = {"arg":"content_after", "content":cafter};
            af2_throw_event('af2_update', [special, cbarg, callback, before, after, method, obj], $('.af2_whole'));
        });
    }
};

/**
 * Creating a new Answer
 */
const af2_choose_create_new_answer = () => {
     const count = af2_answers.length;
     const content = {"count":count,"delete":false, "text":"", "img":"", "insert":true};
     const before = {"arg":"content_before", "content":{"count":count,"delete":true}};
     const method = {"arg":"method", "content":af2_save_answer};
     const callback = {"arg":"callback", "content":af2_update_answers};
     const special = {"arg":"special", "content":true};
     $.when(af2_save_answer(content)).done(() => {
         const ob = af2_jsonobj.answers[count];
         const contenta = {"count":count,"delete":false, "text":ob.text, "img":ob.img, "insert":true};
         const after = {"arg":"content_after", "content":contenta};
         af2_throw_event('af2_update', [special, callback, before, after, method], $('.af2_whole'));
     });
 };

const af2_choose_delete_answer = (pos) => {
    const ob = af2_jsonobj.answers[pos];
    const content = {"count":pos,"delete":true};
    const contentb = {"count":pos,"delete":false, "text":ob.text, "img":ob.img, "insert":true};
    const before = {"arg":"content_before", "content":contentb};
    const method = {"arg":"method", "content":af2_save_answer};
    const callback = {"arg":"callback", "content":af2_update_answers};
    const special = {"arg":"special", "content":true};
    $.when(af2_save_answer(content)).done(() => {
        const contenta = {"count":pos,"delete":true};
        const after = {"arg":"content_after", "content":contenta};
        af2_throw_event('af2_update', [special, callback, before, after, method], $('.af2_whole'));
    });
};

const af2_move_answer = (from, to) => {
    const content = {"count":from,"delete":false, "move":true, "newpos":to};
    const contentb = {"count":to,"delete":false, "move":true, "newpos":from};
    const before = {"arg":"content_before", "content":contentb};
    const method = {"arg":"method", "content":af2_save_answer};
    const callback = {"arg":"callback", "content":af2_update_answers};
    const special = {"arg":"special", "content":true};
    $.when(af2_save_answer(content)).done(() => {
        const contenta = {"count":from,"delete":false, "move":true, "newpos":to};
        const after = {"arg":"content_after", "content":contenta};
        af2_throw_event('af2_update', [special, callback, before, after, method], $('.af2_whole'));
    });
};