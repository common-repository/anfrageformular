let err = false;
$ = jQuery;
jQuery(document).ready(($) => {
    /** Loading the Content **/
    $(document).on('load_content', (ev) => {
        af2_jsonobj = {};
        af2_jsonobj['cftitle'] = '';
        af2_jsonobj['name'] = '';
        af2_jsonobj['questions'] = [];
        af2_jsonobj['title'] = '';
        af2_jsonobj.mailfrom = '';
        af2_jsonobj.mailsubject = '';
        af2_jsonobj.mailto = '';
        af2_jsonobj.mailtext = '';
        af2_jsonobj.send_button = '';
        af2_jsonobj.smtp_host = '';
        af2_jsonobj.smtp_username = '';
        af2_jsonobj.smtp_password = '';
        af2_jsonobj.smtp_port = '';
        af2_jsonobj.use_smtp = false;
        af2_jsonobj.smtp_type= 'ssl';
        af2_jsonobj.mailfrom_name = '';
        af2_jsonobj.mailcc = '';
        af2_jsonobj.mailbcc = '';
        af2_jsonobj.use_autorespond = false;
        af2_jsonobj.autoresponder_field = '';
        af2_jsonobj.autoresponder_nachricht = '';
        af2_jsonobj.autoresponder_subject = '';
        af2_jsonobj.use_wp_mail = '';
        af2_jsonobj.show_bottombar = true;
        af2_kfb_load_content(ev.content);
    });

    $('#af2_switch_view_button').on('click', (ev) => {
        af2_kfb_switch_view();
    });

    $(document).on('click', '#af2_use_smtp', (ev) => {
        af2_jsonobj.use_smtp = $(ev.currentTarget).prop('checked');



        const before = {"arg": "content_before", "content": !$(ev.currentTarget).prop('checked')};
        const method = {"arg": "method", "content": af2_use_smtp_save};
        const callback = {"arg": "callback", "content": af2_update_kfb_settings};
        const obj = {"arg": "obj", "content":('af2_use_smtp')};   // OBJ TO CALL THE DO ON
        const o = $(ev.currentTarget).prop('checked');
        $.when(af2_use_smtp_save(o)).done(() => {
            const after = {"arg": "content_after", "content": o};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    });
    $(document).on('click', '#af2_use_wp_mail', (ev) => {
        af2_jsonobj.use_wp_mail = $(ev.currentTarget).prop('checked');



        const before = {"arg": "content_before", "content": !$(ev.currentTarget).prop('checked')};
        const method = {"arg": "method", "content": af2_use_wp_mail_save};
        const callback = {"arg": "callback", "content": af2_update_kfb_settings};
        const obj = {"arg": "obj", "content":('af2_use_smtp')};   // OBJ TO CALL THE DO ON
        const o = $(ev.currentTarget).prop('checked');
        $.when(af2_use_wp_mail_save(o)).done(() => {
            const after = {"arg": "content_after", "content": o};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    });

    $(document).on('click', '#af2_show_bottombar', (ev) => {
        let checked = $(ev.currentTarget).prop('checked');

        const before = {"arg": "content_before", "content": !checked};
        const method = {"arg": "method", "content": af2_save_show_bottombar};
        const callback = {"arg": "callback", "content": af2_update_show_bottombar};
        const obj = {"arg": "obj", "content":('af2_show_bottombar')};   // OBJ TO CALL THE DO ON
        const o = $(ev.currentTarget).prop('checked');
        $.when(af2_save_show_bottombar(o)).done(() => {
            const after = {"arg": "content_after", "content": o};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    });

    $(document).on('click', '#af2_use_autoresponder', (ev) => {
        af2_jsonobj.use_autorespond = $(ev.currentTarget).prop('checked');


        const before = {"arg": "content_before", "content": !$(ev.currentTarget).prop('checked')};
        const method = {"arg": "method", "content": af2_use_autorespond_save};
        const callback = {"arg": "callback", "content": af2_update_kfb_settings};
        const obj = {"arg": "obj", "content":('af2_use_smtp')};   // OBJ TO CALL THE DO ON
        const o = $(ev.currentTarget).prop('checked');
        $.when(af2_use_autorespond_save(o)).done(() => {
            const after = {"arg": "content_after", "content": o};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    });

    $(document).on('click', '.af2_smtp_type', (ev) => {
        const id = $(ev.currentTarget).attr('id');
        let cont = '';
        if(id === 'af2_kfb_smtp_ssl')
        {
            if($(ev.currentTarget).prop('checked'))
            {
                cont = 'ssl';
            }
        }
        else if(id === 'af2_kfb_smtp_tls')
        {
            if($(ev.currentTarget).prop('checked'))
            {
                cont = 'tls';
            }
        }

        $('.af2_smtp_type').each((i, el) => {
            $(el).prop('checked', false);
        }).promise().done(() => {

            const before = {"arg": "content_before", "content": cont};
            const method = {"arg": "method", "content": af2_save_kfb_smtp_type};
            const callback = {"arg": "callback", "content": af2_update_kfb_settings};
            const obj = {"arg": "obj", "content":('af2_smtp_t')};   // OBJ TO CALL THE DO ON
            const o = cont;
            $.when(af2_save_kfb_smtp_type(o)).done(() => {
                const after = {"arg": "content_after", "content": o};
                af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
            });

        });

    });


    $(document).on('click', '#af2_smtp_testnachricht', (ev) => {

        $.ajax({
            url: af2_BE_save.ajax_url,
            type: "GET",
            data: {
                use_wp_mail: af2_jsonobj.use_wp_mail,
                use_smtp: af2_jsonobj.use_smtp,
                host: af2_jsonobj.smtp_host,
                username: af2_jsonobj.smtp_username,
                password: af2_jsonobj.smtp_password,
                port: af2_jsonobj.smtp_port,
                action: 'af2_test_smtp',
                from: af2_jsonobj.mailfrom,
                to: af2_jsonobj.mailto,
                type: af2_jsonobj.smtp_type,
                cc: af2_jsonobj.mailcc,
                bcc: af2_jsonobj.mailbcc,
                from_name: af2_jsonobj.mailfrom_name,
                _ajax_nonce: af2_BE_save.nonce
            },
            success: (cont) =>
            {
                af2_throw_toast('message', cont);
            },
            error: () =>
            {
                af2_throw_toast('error', 'Es ist ein Fehler aufgetreten');
            }
        });
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

    /** Choosed a Content in a sidebar **/
    $(document).on('choose', '.af2_sidebar_content', (ev) => {
        if(!ev.multiple)
        {
            $.when(af2_sidebar_selection_clear($(ev.sidebar).attr('id'))).done(() => {
                af2_sidebar_select(ev.currentTarget);
            });

        }
    });

    /** When Input content Changing **/
    $(document).on('input_content_change', '.af2_changeable', (ev) => {
        const id = $(ev.currentTarget).attr('id');
        af2_kfb_validate_input_change_object(id, ev.content);
    });

    $(document).on('input_content_cb_change', '.af2_editable_content', (ev) => {
        const id = $(ev.currentTarget).attr('id');
        af2_kfb_change_required(id, ev.content);
    });

    $('.af2_whole').on('dropped_into_container', (ev) => {
        if(ev.dragelpos === null)
        {
            af2_insert_question(ev.containerpos, ev.el_type);
        }
        else
        {
            af2_move_question(ev.dragelpos, ev.containerpos);
        }
    }) ;

    $(document).on('delete', '.af2_question', (ev) => {
        const id = $(ev.currentTarget).attr('id');
        const pos = id.substr(13);
        af2_choose_delete_question(pos);
        af2_close_sidebar('af2_customize_sidebar');
    });

    $('.af2_whole').on('save', () => {
        af2_kfb_save();
    });

    $('.af2_whole').on('back', () => {
        af2_kfb_close();
    });

    af2_update_send_button();
});

/**
 *
 */
const af2_kfb_close = () => {
    af2_throw_toast('message', 'Möchten Sie wirklich beenden? Nicht gespeicherte Daten gehen verloren!'+
        '<button id="close_now" class="btn btn-primary ml-1 mt-2 p-1">Beenden</button>');
};

const af2_kfb_save = () => {
    af2_jsonobj.error = false;
    $.when(af2_kfb_check()).done(() => {

    });
};

const af2_kfb_switch_view = () =>
{
    af2_close_sidebar('af2_customize_sidebar');
    if($('#af2_contactformtitle')[0] === undefined)
    {
        af2_open_sidebar('af2_content_sidebar');
        af2_view = 0;
        $('.af2_content ').html('');

        af2_update_contactform_title();

        let cont = '';

        cont += '<div id="af2_question_container">';

        cont += '</div>';
        cont += '<div class="af2_send_dummy_button_container">';
        cont += '<input id="af2_send_button" type="submit" value="" class="af2_send_dummy_button btn btn-primary af2_editable_content af2_changeable" data-type="text" data-placeholder="Inhalt des Buttons..." data-title="Senden Button" data-basetext="[Senden Button]">';
        cont += '</div>';

        $('.af2_content').append(cont);

        af2_update_questions();
        af2_update_send_button();
    }
    else
    {
        af2_close_sidebar('af2_content_sidebar');
        af2_view = 1;
        $('.af2_content ').html('');
        af2_load_kfb_settings();
    }
};

const af2_kfb_check = () => {
    let error = false;
    $('.af2_error').each((i, el) => {
        $(el).removeClass('af2_error');
    });
    if(af2_jsonobj.name === undefined || af2_jsonobj.name.trim() === '')
    {
        let selector = '#af2_kfb_title';
        if(af2_view === 0)
        {
            selector = '#af2_switch_view_button';
        }
        $(selector).addClass('af2_error');
        error = true;
        af2_throw_toast('error', 'Keinen "Backend" Namen für das Kontaktformular angegeben!');
    }
    if(af2_jsonobj.mailtext === undefined || af2_jsonobj.mailtext.trim() === '')
    {
        let selector = '#af2_kfb_mailtext';
        if(af2_view === 0)
        {
            selector = '#af2_switch_view_button';
        }
        $(selector).addClass('af2_error');
        error = true;
        af2_throw_toast('error', 'Keinen E-Mail Text angegeben');
    } else
    {
        if(!af2_jsonobj.mailtext.includes('[antworten]'))
        {
            let selector = '#af2_kfb_mailtext';
            if(af2_view === 0)
            {
                selector = '#af2_switch_view_button';
            }
            $(selector).addClass('af2_error');
            error = true;
            af2_throw_toast('error', 'Der Tag [antworten] ist nicht im E-Mail Text enthalten!');
        }
    }
    if(af2_jsonobj.use_autorespond === true)
    {
        if(af2_jsonobj.autoresponder_field === undefined || af2_jsonobj.autoresponder_field.trim() === '')
        {
            let selector = '#af2_kfb_autoresponder_field';
            if(af2_view === 0)
            {
                selector = '#af2_switch_view_button';
            }
            $(selector).addClass('af2_error');
            error = true;
            af2_throw_toast('error', 'Kein Autoresponder E-Mail Feld angegeben!');
        }
        if(af2_jsonobj.autoresponder_nachricht === undefined || af2_jsonobj.autoresponder_nachricht.trim() === '')
        {
            let selector = '#af2_kfb_autoresponder_nachricht';
            if(af2_view === 0)
            {
                selector = '#af2_switch_view_button';
            }
            $(selector).addClass('af2_error');
            error = true;
            af2_throw_toast('error', 'Keinen Autoresponder Text angegeben!');
        }
        if(af2_jsonobj.autoresponder_subject === undefined || af2_jsonobj.autoresponder_subject.trim() === '')
        {
            let selector = '#af2_kfb_autoresponder_subject';
            if(af2_view === 0)
            {
                selector = '#af2_switch_view_button';
            }
            $(selector).addClass('af2_error');
            error = true;
            af2_throw_toast('error', 'Keinen Autoresponder Betreff angegeben!');
        }
    }
    if(af2_jsonobj.use_smtp === true)
    {
        if(af2_jsonobj.smtp_host === undefined || af2_jsonobj.smtp_host.trim() === '')
        {
            let selector = '#af2_kfb_smtp_host';
            if(af2_view === 0)
            {
                selector = '#af2_switch_view_button';
            }
            $(selector).addClass('af2_error');
            error = true;
            af2_throw_toast('error', 'Keinen SMTP-Server angegeben!');
        }
        if(af2_jsonobj.smtp_username === undefined || af2_jsonobj.smtp_username.trim() === '')
        {
            let selector = '#af2_kfb_smtp_username';
            if(af2_view === 0)
            {
                selector = '#af2_switch_view_button';
            }
            $(selector).addClass('af2_error');
            error = true;
            af2_throw_toast('error', 'Keinen SMTP Username angegeben!');
        }
        if(af2_jsonobj.smtp_password === undefined || af2_jsonobj.smtp_password.trim() === '')
        {
            let selector = '#af2_kfb_smtp_password';
            if(af2_view === 0)
            {
                selector = '#af2_switch_view_button';
            }
            $(selector).addClass('af2_error');
            error = true;
            af2_throw_toast('error', 'Kein SMTP Passwort angegeben!');
        }
        if(af2_jsonobj.smtp_port === undefined || af2_jsonobj.smtp_port.trim() === '')
        {
            let selector = '#af2_kfb_smtp_port';
            if(af2_view === 0)
            {
                selector = '#af2_switch_view_button';
            }
            $(selector).addClass('af2_error');
            error = true;
            af2_throw_toast('error', 'Kein SMTP Port angegeben!');
        }
    }
    if(af2_jsonobj.mailsubject === undefined || af2_jsonobj.mailsubject.trim() === '')
    {
        let selector = '#af2_kfb_mailsubject';
        if(af2_view === 0)
        {
            selector = '#af2_switch_view_button';
        }
        $(selector).addClass('af2_error');
        error = true;
        af2_throw_toast('error', 'Keinen E-Mail Betreff angegeben!');
    }
    if(af2_jsonobj.mailto === undefined || af2_jsonobj.mailto.trim() === '')
    {
        let selector = '#af2_kfb_mailto';
        if(af2_view === 0)
        {
            selector = '#af2_switch_view_button';
        }
        $(selector).addClass('af2_error');
        error = true;
        af2_throw_toast('error', 'Keinen E-Mail Empfänger angegeben!');
    }
    if(af2_jsonobj.mailfrom === undefined || af2_jsonobj.mailfrom.trim() === '')
    {
        $('#af2_kfb_mailfrom').addClass('af2_error');
        error = true;
        af2_throw_toast('error', 'Keine Absender E-Mail angegeben!');
    }
    //Prüfung ob eine Frage angegeben ist
    if(af2_jsonobj.cftitle === undefined || af2_jsonobj.cftitle.trim() === '')
    {
        $('#af2_contactformtitle').addClass('af2_error');
        error = true;
        af2_throw_toast('error', 'Keinen Kontaktformulartitel angegeben!');
    }
    let hasLabel = false;
    if(af2_jsonobj.questions.length > 0)
    {
        $(af2_jsonobj.questions).each((i, el) => {
            if(el.typ.includes('text_type'))
            {
                if(el.label !== undefined && el.label.trim() !== '')
                {
                    hasLabel = true;
                }
            }
            if(el.id === undefined || el.id.trim() === '')
            {
                $('#af2_question_'+i).addClass('af2_error');
                error = true;
                af2_throw_toast('error', 'Alle Elemente müssen eine ID besitzen!');
            }
        }).promise().done(() => {
            $(af2_jsonobj.questions).each((i, el) => {
                if(el.typ.includes('text_type') && hasLabel === true)
                {
                    if(el.label === undefined || el.label.trim() === '')
                    {
                        $('#af2_question_'+i).addClass('af2_error');
                        error = true;
                        af2_throw_toast('error', 'Gibt es ein Label, müssen alle Elemente ein Label besitzen!');
                    }
                }
                else if(el.typ === 'checkbox_type')
                {
                    if(el.text.trim() === '' || el.text === undefined)
                    {
                        $('#af2_question_'+i).addClass('af2_error');
                        error = true;
                        af2_throw_toast('error', 'Im Element '+(i+1)+' fehlt der Text der Checkbox!');
                    }
                }
            }).promise().done(() => {




                if(!(af2_jsonobj.mailto === undefined || af2_jsonobj.mailto.trim() === '') && !(af2_jsonobj.mailfrom === undefined || af2_jsonobj.mailfrom.trim() === ''))
                {
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
                    return error;
                } else {
                    err = error;

                    if (err === false) {
                        af2_jsonobj['error'] = false;
                        af2_save();
                    } else if (err === true) {
                        af2_jsonobj['error'] = true;
                        af2_save();
                    }

                    return error;
                }
            });
        });
    }
    else
    {
        error = true;
        af2_throw_toast('error', 'Keine Elemente angegeben!');
        err = error;

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

        return error;
    }

};


/** ************************************************************************ **/
/**                               LOAD METHODS                               **/
/** ************************************************************************ **/

/**
 * Loading Content
 *
 * @param content
 */
const af2_kfb_load_content = (content) => {
    af2_jsonobj = content;
    if(content.questions === undefined)
    {
        af2_jsonobj = JSON.parse(content);
    }

    
    
    af2_update_contactform_title();
    af2_update_questions();
    af2_update_send_button();
    af2_update_show_bottombar();
};


/** ************************************************************************ **/
/**                                 ACTIONS                                  **/
/** ************************************************************************ **/

/**
 * Changing Input validation
 *
 * @param id
 * @param content
 */
const af2_kfb_validate_input_change_object = (id, content) => {
    if (id === 'af2_contactformtitle') {

        const before = {"arg": "content_before", "content": af2_jsonobj['cftitle']};
        const method = {"arg": "method", "content": af2_save_contactform_title};
        const callback = {"arg": "callback", "content": af2_update_contactform_title};
        const obj = {"arg": "obj", "content": 'af2_contactformtitle'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_contactform_title(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj['cftitle']};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_question_label'))
    {
        const pos = id.substr(19);
        const selector = af2_jsonobj.questions[pos];
        const before = {"arg": "content_before", "content": {"content":selector, "count": pos}};
        const method = {"arg": "method", "content": af2_save_question};
        const callback = {"arg": "callback", "content": af2_update_questions};
        const obj = {"arg": "obj", "content":('af2_question_'+pos)};   // OBJ TO CALL THE DO ON
        const o = {"typ":selector.typ, "label":content, "placeholder":selector.placeholder, "required":selector.required, "id":selector.id};
        $.when(af2_save_question({"content":o, "count": pos})).done(() => {
            const after = {"arg": "content_after", "content": {"content":o, "count": pos}};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_question_text_input'))
    {
        const pos = id.substr(24);
        const selector = af2_jsonobj.questions[pos];
        const before = {"arg": "content_before", "content": {"content":selector, "count": pos}};
        const method = {"arg": "method", "content": af2_save_question};
        const callback = {"arg": "callback", "content": af2_update_questions};
        const obj = {"arg": "obj", "content":('af2_question_'+pos)};   // OBJ TO CALL THE DO ON
        const o = {"typ":selector.typ, "label":selector.label, "placeholder":content, "required":selector.required, "id":selector.id};
        $.when(af2_save_question({"content":o, "count": pos})).done(() => {
            const after = {"arg": "content_after", "content": {"content":o, "count": pos}};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_question_checkbox_label'))
    {
        const pos = id.substr(28);
        const selector = af2_jsonobj.questions[pos];
        const before = {"arg": "content_before", "content": {"content":selector, "count": pos}};
        const method = {"arg": "method", "content": af2_save_question};
        const callback = {"arg": "callback", "content": af2_update_questions};
        const obj = {"arg": "obj", "content":('af2_question_'+pos)};   // OBJ TO CALL THE DO ON
        const o = {"typ":selector.typ, "text":content, "required":selector.required, "id":selector.id};
        $.when(af2_save_question({"content":o, "count": pos})).done(() => {
            const after = {"arg": "content_after", "content": {"content":o, "count": pos}};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id === 'af2_kfb_title')
    {
        const before = {"arg": "content_before", "content": af2_jsonobj['name']};
        const method = {"arg": "method", "content": af2_save_kfb_title};
        const callback = {"arg": "callback", "content": af2_update_kfb_title};
        const obj = {"arg": "obj", "content": 'af2_kfb_title'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_kfb_title(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj['name']};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id === 'af2_kfb_mailfrom')
    {
        const before = {"arg": "content_before", "content": af2_jsonobj['mailfrom']};
        const method = {"arg": "method", "content": af2_save_kfb_mailfrom};
        const callback = {"arg": "callback", "content": af2_update_kfb_mailfrom};
        const obj = {"arg": "obj", "content": 'af2_kfb_mailfrom'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_kfb_mailfrom(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj['mailfrom']};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id === 'af2_kfb_mailto')
    {
        const before = {"arg": "content_before", "content": af2_jsonobj['mailto']};
        const method = {"arg": "method", "content": af2_save_kfb_mailto};
        const callback = {"arg": "callback", "content": af2_update_kfb_mailto};
        const obj = {"arg": "obj", "content": 'af2_kfb_mailto'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_kfb_mailto(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj['mailto']};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id === 'af2_kfb_mailtext')
    {
        const before = {"arg": "content_before", "content": af2_jsonobj['mailtext']};
        const method = {"arg": "method", "content": af2_save_kfb_mailtext};
        const callback = {"arg": "callback", "content": af2_update_kfb_mailtext};
        const obj = {"arg": "obj", "content": 'af2_kfb_mailtext'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_kfb_mailtext(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj['mailtext']};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id === 'af2_kfb_autoresponder_subject' )
    {
        const before = {"arg": "content_before", "content": af2_jsonobj['autoresponder_subject']};
        const method = {"arg": "method", "content": af2_save_kfb_autoresponder_subject};
        const callback = {"arg": "callback", "content": af2_update_kfb_autoresponder_subject};
        const obj = {"arg": "obj", "content": 'af2_kfb_autoresponder_subject'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_kfb_autoresponder_subject(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj['autoresponder_subject']};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id === 'af2_kfb_autoresponder_field')
    {
        const before = {"arg": "content_before", "content": af2_jsonobj['autoresponder_field']};
        const method = {"arg": "method", "content": af2_save_kfb_autoreponder_field};
        const callback = {"arg": "callback", "content": af2_update_kfb_autoresponder_field};
        const obj = {"arg": "obj", "content": 'af2_kfb_autoresponder_field'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_kfb_autoreponder_field(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj['autoresponder_field']};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id === 'af2_kfb_autoresponder_nachricht')
    {
        const before = {"arg": "content_before", "content": af2_jsonobj['autoresponder_nachricht']};
        const method = {"arg": "method", "content": af2_save_kfb_autoresponder_nachricht};
        const callback = {"arg": "callback", "content": af2_update_kfb_autoresponder_nachricht};
        const obj = {"arg": "obj", "content": 'af2_kfb_autoresponder_nachricht'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_kfb_autoresponder_nachricht(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj['autoresponder_nachricht']};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id === 'af2_kfb_mailsubject')
    {
        const before = {"arg": "content_before", "content": af2_jsonobj['mailsubject']};
        const method = {"arg": "method", "content": af2_save_kfb_mailsubject};
        const callback = {"arg": "callback", "content": af2_update_kfb_mailsubject};
        const obj = {"arg": "obj", "content": 'af2_kfb_mailsubject'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_kfb_mailsubject(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj['mailsubject']};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id === 'af2_send_button')
    {
        const before = {"arg": "content_before", "content": af2_jsonobj.send_button};
        const method = {"arg": "method", "content": af2_save_send_button};
        const callback = {"arg": "callback", "content": af2_update_send_button};
        const obj = {"arg": "obj", "content": 'af2_send_button'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_send_button(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj.send_button};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_question_id'))
    {
        const pos = id.substr(16);
        const before = {"arg": "content_before", "content": {"id":af2_jsonobj.questions[pos].id, "pos":pos}};
        const method = {"arg": "method", "content": af2_save_question_id};
        const callback = {"arg": "callback", "content": af2_update_questions};
        const obj = {"arg": "obj", "content":('af2_question_'+pos)};   // OBJ TO CALL THE DO ON
        const cont = {"id":content, "pos":pos};
        $.when(af2_save_question_id(cont)).done(() => {
            const after = {"arg": "content_after", "content": {"id":af2_jsonobj.questions[pos].id, "pos":pos}};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_kfb_mailcc'))
    {
        const before = {"arg": "content_before", "content": af2_jsonobj['mailcc']};
        const method = {"arg": "method", "content": af2_save_kfb_mailcc};
        const callback = {"arg": "callback", "content": af2_update_kfb_mailcc};
        const obj = {"arg": "obj", "content": 'af2_kfb_mailtcc'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_kfb_mailcc(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj['mailcc']};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_kfb_mailbcc'))
    {
        const before = {"arg": "content_before", "content": af2_jsonobj['mailbcc']};
        const method = {"arg": "method", "content": af2_save_kfb_mailbcc};
        const callback = {"arg": "callback", "content": af2_update_kfb_mailbcc};
        const obj = {"arg": "obj", "content": 'af2_kfb_mailtbcc'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_kfb_mailbcc(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj['mailbcc']};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_kfb_mailfrom_name'))
    {
        const before = {"arg": "content_before", "content": af2_jsonobj['mailfrom_name']};
        const method = {"arg": "method", "content": af2_save_kfb_from_name};
        const callback = {"arg": "callback", "content": af2_update_kfb_from_name};
        const obj = {"arg": "obj", "content": 'af2_kfb_mailfrom_name'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_kfb_from_name(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj['mailfrom_name']};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_kfb_smtp'))
    {
        if(id.includes('af2_kfb_smtp_host'))
        {
            const before = {"arg": "content_before", "content": af2_jsonobj['smpt_host']};
            const method = {"arg": "method", "content": af2_save_kfb_smtp_host};
            const callback = {"arg": "callback", "content": af2_update_kfb_smtp_host};
            const obj = {"arg": "obj", "content": 'af2_kfb_smtp_host'};   // OBJ TO CALL THE DO ON
            $.when(af2_save_kfb_smtp_host(content)).done(() => {
                const after = {"arg": "content_after", "content": af2_jsonobj['smpt_host']};
                af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
            });
        }
        else if(id.includes('af2_kfb_smtp_username'))
        {
            const before = {"arg": "content_before", "content": af2_jsonobj['smtp_username']};
            const method = {"arg": "method", "content": af2_save_kfb_smtp_username};
            const callback = {"arg": "callback", "content": af2_update_kfb_smtp_username};
            const obj = {"arg": "obj", "content": 'af2_kfb_smtp_username'};   // OBJ TO CALL THE DO ON
            $.when(af2_save_kfb_smtp_username(content)).done(() => {
                const after = {"arg": "content_after", "content": af2_jsonobj['smtp_username']};
                af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
            });
        }
        else if(id.includes('af2_kfb_smtp_password'))
        {
            const before = {"arg": "content_before", "content": af2_jsonobj['smtp_password']};
            const method = {"arg": "method", "content": af2_save_kfb_smtp_password};
            const callback = {"arg": "callback", "content": af2_update_kfb_smtp_password};
            const obj = {"arg": "obj", "content": 'af2_kfb_smtp_password'};   // OBJ TO CALL THE DO ON
            $.when(af2_save_kfb_smtp_password(content)).done(() => {
                const after = {"arg": "content_after", "content": af2_jsonobj['smtp_password']};
                af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
            });
        }
        else if(id.includes('af2_kfb_smtp_port'))
        {
            const before = {"arg": "content_before", "content": af2_jsonobj['smtp_port']};
            const method = {"arg": "method", "content": af2_save_kfb_smtp_port};
            const callback = {"arg": "callback", "content": af2_update_kfb_smtp_port};
            const obj = {"arg": "obj", "content": 'af2_kfb_smtp_port'};   // OBJ TO CALL THE DO ON
            $.when(af2_save_kfb_smtp_port(content)).done(() => {
                const after = {"arg": "content_after", "content": af2_jsonobj['smtp_port']};
                af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
            });
        }
        
    }
    else if(id.includes('af2_question_site_key_'))
    {
        const pos = id.substr(22);
        const before = {"arg": "content_before", "content": {"id":af2_jsonobj.questions[pos].site_key, "pos":pos}};
        const method = {"arg": "method", "content": af2_save_captcha_key};
        const callback = {"arg": "callback", "content": af2_update_questions};
        const obj = {"arg": "obj", "content":('af2_question_'+pos)};   // OBJ TO CALL THE DO ON
        const cont = {"content":content, "pos":pos};
        $.when(af2_save_captcha_key(cont)).done(() => {
            const after = {"arg": "content_after", "content": {"id":af2_jsonobj.questions[pos].site_key, "pos":pos}};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id.includes('af2_question_site_secret_'))
    {
        const pos = id.substr(25);
        const before = {"arg": "content_before", "content": {"id":af2_jsonobj.questions[pos].site_secret, "pos":pos}};
        const method = {"arg": "method", "content": af2_save_captcha_secret};
        const callback = {"arg": "callback", "content": af2_update_questions};
        const obj = {"arg": "obj", "content":('af2_question_'+pos)};   // OBJ TO CALL THE DO ON
        const cont = {"content":content, "pos":pos};
        $.when(af2_save_captcha_secret(cont)).done(() => {
            const after = {"arg": "content_after", "content": {"id":af2_jsonobj.questions[pos].site_secret, "pos":pos}};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
};

const af2_insert_question = (pos, type) => {
    const cbef = {"count":pos,"delete":true};
    const before = {"arg":"content_before", "content":cbef};
    const method = {"arg":"method", "content":af2_save_question};
    const callback = {"arg":"callback", "content":af2_update_questions};
    const special = {"arg":"special", "content":true};
    $.when(af2_save_question({"count":pos,"delete":false, "insert":true, "content":{"typ":type}})).done(() => {
        const cafter = {"count":pos,"delete":false, "insert":true, "content":{"typ":type}};
        const after = {"arg":"content_after", "content":cafter};
        af2_throw_event('af2_update', [special, callback, before, after, method], $('.af2_whole'));
    });
};

const af2_move_question = (from, to) => {
    const content = {"count":from,"delete":false, "move":true, "newpos":to};
    const contentb = {"count":to,"delete":false, "move":true, "newpos":from};
    const before = {"arg":"content_before", "content":contentb};
    const method = {"arg":"method", "content":af2_save_question};
    const callback = {"arg":"callback", "content":af2_update_questions};
    const special = {"arg":"special", "content":true};
    $.when(af2_save_question(content)).done(() => {
        const contenta = {"count":from,"delete":false, "move":true, "newpos":to};
        const after = {"arg":"content_after", "content":contenta};
        af2_throw_event('af2_update', [special, callback, before, after, method], $('.af2_whole'));
    });
};

const af2_choose_delete_question = (pos) => {
    const ob = af2_jsonobj.questions[pos];
    const content = {"count":pos,"delete":true};
    const contentb = {"count":pos,"delete":false, "content":ob, "insert":true};
    const before = {"arg":"content_before", "content":contentb};
    const method = {"arg":"method", "content":af2_save_question};
    const callback = {"arg":"callback", "content":af2_update_questions};
    const special = {"arg":"special", "content":true};
    $.when(af2_save_question(content)).done(() => {
        const contenta = {"count":pos,"delete":true};
        const after = {"arg":"content_after", "content":contenta};
        af2_throw_event('af2_update', [special, callback, before, after, method], $('.af2_whole'));
    });
};

const af2_kfb_change_required = (id, content) => {
    const pos = id.substr(13);
    const selector = af2_jsonobj.questions[pos];
    const before = {"arg": "content_before", "content": {"content":selector, "count": pos}};
    const method = {"arg": "method", "content": af2_save_question};
    const callback = {"arg": "callback", "content": af2_update_questions};
    const obj = {"arg": "obj", "content":('af2_question_'+pos)};   // OBJ TO CALL THE DO ON

    let o = '';

    if(selector.typ === 'checkbox_type')
    {
        o = {"typ":selector.typ, "text":selector.text, "required":content, "id":selector.id};
    }
    else if(selector.typ.includes('text_type_'))
    {
        o = {"typ":selector.typ, "label":selector.label, "placeholder":selector.placeholder, "required":content, "id":selector.id};
    }

    $.when(af2_save_question({"content":o, "count": pos})).done(() => {
        const after = {"arg": "content_after", "content": {"content":o, "count": pos}};
        af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
    });
};