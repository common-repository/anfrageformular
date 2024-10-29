let drag_element;
$ = jQuery;
jQuery(document).ready(($) => {

    $(document).on('load_empty', () => {
        af2_throw_event('af2_update', [{"arg":"callback", "content":af2_update_contactform_title}],$('.af2_whole'));
    });

    /** When customize sidebar getting closed **/
    $('.af2_sidebar').on('close', (ev) => {
        if(ev.id === 'af2_customize_sidebar')
        {
            af2_activate_new_step();

            $(document).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', '.af2_sidebar', () => {
                $(document).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', '.af2_sidebar');
                af2_clear_editable_content();
                af2_sidebar_clear_content('af2_customize_sidebar');
            });
        }
    });

    /** Unfocusing Content **/
    $('#af2_customize_sidebar').on('unfocus_content', () => {
        af2_sidebar_selection_clear('af2_customize_sidebar');
        //af2_activate_new_step();
    });

    /** Click into Nothing **/
    $('.af2_content').on('click', () => {
        if($('.af2_editable_content:hover')[0] === undefined)
        {
            af2_close_sidebar('af2_customize_sidebar');
        }
    });

    /** DO on Object **/
    $(document).on('do_content', '.af2_editable_content', (ev) => {
        let target = undefined;
        if($(ev.currentTarget) === undefined)
        {
            $.when(af2_kfb_switch_view()).done(() => {
                target = $(ev.selector);

                $(target).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', () => {
                    $(target).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd');
                    $(target).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', () => {
                        $(target).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd');
                        af2_remove_mark(target);
                    });
                    af2_unmark_content(target);
                });

                af2_mark_content(target);
            });
        }
        else
        {
            target = ev.currentTarget;
            $(target).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', () => {
                $(target).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd');
                $(target).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', () => {
                    $(target).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd');
                    af2_remove_mark(target);
                });
                af2_unmark_content(target);
            });

            af2_mark_content(target);
        }
    });

    /**
     * WHEN REDO OR UNDO
     */
    $('.af2_whole').on('do', () => {
        af2_sidebar_clear_content('af2_customize_sidebar');
        af2_close_sidebar('af2_customize_sidebar');
    });

    $(document).on('draggable_select', '.af2_draggable', (ev) => {

        if($(ev.currentTarget).hasClass('af2_sidebar_content'))
        {
            let dragobj = $($('#'+$(ev.currentTarget).attr('id') + ' .icon_cont')[0]).clone();
            $(dragobj).addClass('af2_drag_object');
            $(dragobj).addClass('hide');
            drag_element = ev.currentTarget;

            $.when(af2_dnd_set_element_position(dragobj, ev)).done(() => {
                $('.af2_whole').append(dragobj);
            });

            $(document).on('mouseenter', '.af2_input_margs', (ev) => {
                $(ev.currentTarget).addClass('af2_drop_container');
                $(ev.currentTarget).addClass('dotter_border');
                $(ev.currentTarget).addClass('hover');
            });

            $(document).on('mouseleave', '.af2_input_margs', (ev) => {
                $(ev.currentTarget).removeClass('af2_drop_container');
                $(ev.currentTarget).removeClass('dotter_border');
                $(ev.currentTarget).removeClass('hover');
            });
        }
        else {
            let dragobj = $(ev.currentTarget).clone();
            $(dragobj).addClass('af2_drag_object');
            $(dragobj).addClass('hide');
            $(dragobj).removeClass('deleteable');
            $(dragobj).removeClass('draggable');
            drag_element = ev.currentTarget;

            $.when(af2_dnd_set_element_position(dragobj, ev)).done(() => {
                $('.af2_whole').append(dragobj);
            });

            $(document).on('mouseenter', '.af2_input_margs', (ev) => {
                $(ev.currentTarget).addClass('af2_drop_container');
                $(ev.currentTarget).addClass('dotter_border');
                $(ev.currentTarget).addClass('hover');
            });

            $(document).on('mouseleave', '.af2_input_margs', (ev) => {
                $(ev.currentTarget).removeClass('af2_drop_container');
                $(ev.currentTarget).removeClass('dotter_border');
                $(ev.currentTarget).removeClass('hover');
            });
        }
    });


    $(document).on('first_drag', '.af2_drag_object', (ev) => {

        if($(drag_element).hasClass('af2_sidebar_content'))
        {
            $.when(af2_dnd_set_element_position(ev.currentTarget, ev)).done(() => {
                $(ev.currentTarget).removeClass('hide');
            });
        }
        else
        {
            $(drag_element).addClass('getting_dragged');
            $($(drag_element).prev('.af2_input_margs')).addClass('hide');
            $.when(af2_dnd_set_element_position(ev.currentTarget, ev)).done(() => {
                $(ev.currentTarget).removeClass('hide');
            });
        }


    });

    $(document).on('drag', '.af2_drag_object', (ev) => {
        af2_dnd_set_element_position(ev.currentTarget, ev);
    });

    $(document).on('drop', '.af2_drag_object', (ev) => {
        $(document).off('mouseenter', '.af2_input_margs');
        $(document).off('mouseleave', '.af2_input_margs');

        $(ev.currentTarget).remove();
        if(!($(ev.currentTarget).hasClass('af2_sidebar_content')))
        {
            $(drag_element).removeClass('getting_dragged');
        }
        drag_element = undefined;

        $('.af2_input_margs.hide').each((i, el) => {
            $(el).removeClass('hide');
        });

        $('.af2_input_margs.af2_drop_container').each((i, el) => {
            $(el).removeClass('af2_drop_container');
        });

        $('.af2_input_margs.dotter_border').each((i, el) => {
            $(el).removeClass('dotter_border');
            $(el).removeClass('hover');
        });
    });

    $(document).on('drop_into', '.af2_drag_object', (ev) => {
        $(document).off('mouseenter', '.af2_input_margs');
        $(document).off('mouseleave', '.af2_input_margs');

        $(ev.currentTarget).remove();
        if(!($(ev.currentTarget).hasClass('af2_sidebar_content')))
        {
            $(drag_element).removeClass('getting_dragged');
        }

        $('.af2_input_margs.hide').each((i, el) => {
            $(el).removeClass('hide');
        });

        $('.af2_input_margs.af2_drop_container').each((i, el) => {
            $(el).removeClass('af2_drop_container');
        });

        $('.af2_input_margs.dotter_border').each((i, el) => {
            $(el).removeClass('dotter_border');
            $(el).removeClass('hover');
        });

        let containerpos = $(ev.into).attr('id');

        let dragelpos = null;

        if(!($(drag_element).hasClass('af2_sidebar_content')))
        {
            dragelpos = $(drag_element).attr('id').substr(13);
            if(dragelpos < containerpos)
            {
                containerpos--;
            }
        }
        if(containerpos !== dragelpos)
        {
            af2_throw_event('dropped_into_container', [{"arg":'containerpos', "content":containerpos},
                {"arg":"dragelpos", "content":dragelpos}, {"arg":"el_type", "content":drag_element.id}], '.af2_whole');
        }

        drag_element = undefined;
    });
});

/**
 * Updating the ContactForm
 */
const af2_update_contactform_title = () => {
    let selector = $('#af2_contactformtitle');
    if(selector[0] === undefined)
    {
        $('.af2_content').html(af2_create_cfb_title());
        selector = $('#af2_contactformtitle');
    }
    let cont;
    if(af2_jsonobj.cftitle === undefined || af2_jsonobj.cftitle.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.cftitle;
    }
    selector.html(cont);
};

const af2_update_questions = () => {
    $(af2_jsonobj.questions).each((i) => {
        af2_update_question(i);
    });

    while(af2_jsonobj.questions.length < $('.af2_content .af2_question.af2_editable_content').length)
    {
        let selector = $('.af2_question');
        let position = selector.length-1;
        selector[position].remove();
        selector = $('.af2_input_margs');
        position = selector.length-1;
        selector[position].remove();
    }

    if($('.af2_question').length === 0)
    {
        if($('.af2_input_margs').length === 0)
        {
            $('#af2_question_container').append('<div id="0" class="af2_input_margs"></div>');
        }
    }
};

const af2_update_question = (questionid) => {
    const selector = '#af2_question_'+questionid;
    const type = af2_jsonobj.questions[questionid].typ;

    if($(selector)[0] === undefined && questionid >= $('.af2_question').length-1)
    {
        const inner = af2_create_inner_question_content(questionid);
        const whole = af2_create_question_content(questionid, inner, type);
        $('#af2_question_container').append(whole);
    }

    const realtype = $($(selector)[0]).data('type');
    const newtype = af2_jsonobj.questions[questionid].typ;
    if(realtype !== newtype)
    {
        $($(selector)[0]).html(af2_create_inner_question_content(questionid));
        $($(selector)[0]).data('type', newtype);
        $($(selector)[0]).removeClass(realtype);
        $($(selector)[0]).addClass(newtype);
    }

    switch(type)
    {

        case 'text_type_plain':
        {
            const actualLabel = af2_jsonobj.questions[questionid].label;
            const actualPlaceholder = af2_jsonobj.questions[questionid].placeholder;

            let insertLabel = actualLabel === undefined || actualLabel.trim() === '' ? $(selector + ' .af2_label').data('basetext') : actualLabel;
            const insertPlaceholder = actualPlaceholder === undefined || actualPlaceholder.trim() === '' ?
                $(selector + ' .af2_text_input').data('baseplaceholder') : actualPlaceholder;

            if(af2_jsonobj.questions[questionid].required === true)
            {
                if(!insertLabel.includes(' *'))
                {
                    if(!(insertLabel === undefined || insertLabel.trim() === ''))
                    {
                        insertLabel += ' *';
                    }

                }
            }
            else if(af2_jsonobj.questions[questionid].required === false)
            {
                if(insertLabel.includes(' *'))
                {
                    insertLabel = insertLabel.substr(0, insertLabel.length-2);
                }
            }

            $(selector + ' .af2_label').html(insertLabel);
            $(selector + ' .af2_text_input').attr('placeholder', insertPlaceholder);
            $(selector + ' .af2_id_l').html(af2_jsonobj.questions[questionid].id);
            break;
        }
        case 'text_type_name':
        {
            const actualLabel = af2_jsonobj.questions[questionid].label;
            const actualPlaceholder = af2_jsonobj.questions[questionid].placeholder;

            let insertLabel = actualLabel === undefined || actualLabel.trim() === '' ? $(selector + ' .af2_label').data('basetext') : actualLabel;
            const insertPlaceholder = actualPlaceholder === undefined || actualPlaceholder.trim() === '' ?
                $(selector + ' .af2_text_input').data('baseplaceholder') : actualPlaceholder;

            if(af2_jsonobj.questions[questionid].required === true)
            {
                if(!insertLabel.includes(' *'))
                {
                    if(!(insertLabel === undefined || insertLabel.trim() === ''))
                    {
                        insertLabel += ' *';
                    }

                }
            }
            else if(af2_jsonobj.questions[questionid].required === false)
            {
                if(insertLabel.includes(' *'))
                {
                    insertLabel = insertLabel.substr(0, insertLabel.length-2);
                }
            }

            $(selector + ' .af2_label').html(insertLabel);
            $(selector + ' .af2_text_input').attr('placeholder', insertPlaceholder);
            $(selector + ' .af2_id_l').html(af2_jsonobj.questions[questionid].id);
            break;
        }
        case 'text_type_mail':
        {
            const actualLabel = af2_jsonobj.questions[questionid].label;
            const actualPlaceholder = af2_jsonobj.questions[questionid].placeholder;

            let insertLabel = actualLabel === undefined || actualLabel.trim() === '' ? $(selector + ' .af2_label').data('basetext') : actualLabel;
            const insertPlaceholder = actualPlaceholder === undefined || actualPlaceholder.trim() === '' ?
                $(selector + ' .af2_text_input').data('baseplaceholder') : actualPlaceholder;

            if(af2_jsonobj.questions[questionid].required === true)
            {
                if(!insertLabel.includes(' *'))
                {
                    if(!(insertLabel === undefined || insertLabel.trim() === ''))
                    {
                        insertLabel += ' *';
                    }

                }
            }
            else if(af2_jsonobj.questions[questionid].required === false)
            {
                if(insertLabel.includes(' *'))
                {
                    insertLabel = insertLabel.substr(0, insertLabel.length-2);
                }
            }

            $(selector + ' .af2_label').html(insertLabel);
            $(selector + ' .af2_text_input').attr('placeholder', insertPlaceholder);

            break;
        }
        case 'text_type_phone':
        {
            const actualLabel = af2_jsonobj.questions[questionid].label;
            const actualPlaceholder = af2_jsonobj.questions[questionid].placeholder;

            let insertLabel = actualLabel === undefined || actualLabel.trim() === '' ? $(selector + ' .af2_label').data('basetext') : actualLabel;
            const insertPlaceholder = actualPlaceholder === undefined || actualPlaceholder.trim() === '' ?
                $(selector + ' .af2_text_input').data('baseplaceholder') : actualPlaceholder;

            if(af2_jsonobj.questions[questionid].required === true)
            {
                if(!insertLabel.includes(' *'))
                {
                    if(!(insertLabel === undefined || insertLabel.trim() === ''))
                    {
                        insertLabel += ' *';
                    }

                }
            }
            else if(af2_jsonobj.questions[questionid].required === false)
            {
                if(insertLabel.includes(' *'))
                {
                    insertLabel = insertLabel.substr(0, insertLabel.length-2);
                }
            }

            $(selector + ' .af2_label').html(insertLabel);
            $(selector + ' .af2_text_input').attr('placeholder', insertPlaceholder);

            break;
        }
        case 'checkbox_type':
        {
            const actualLabel = af2_jsonobj.questions[questionid].text;

            let insertLabel = actualLabel === undefined || actualLabel.trim() === '' ? $('#af2_question_'+questionid + ' .af2_checkbox_label').data('basetext') : actualLabel;

            if(af2_jsonobj.questions[questionid].required === true)
            {
                if(!insertLabel.includes(' *'))
                {
                    if(!(insertLabel === undefined || insertLabel.trim() === ''))
                    {
                        insertLabel += ' *';
                    }

                }
            }
            else if(af2_jsonobj.questions[questionid].required === false)
            {
                if(insertLabel.includes(' *'))
                {
                    insertLabel = insertLabel.substr(0, insertLabel.length-2);
                }
            }

            $(selector+' .af2_checkbox_label').html(insertLabel);

            break;
        }
        
        case 'google_recaptcha':
        {
            const insertLabel = 'reCAPTCHA v2';
            const sel = $(selector+' .af2_checkbox_label');
            sel.html(insertLabel);

            break;
        }
    }
};

/**
 * Creating an Answer content
 *
 * @param questionid
 * @param inner
 * @param type
 */
const af2_create_question_content = (questionid, inner, type) => {

    let cont = '';
    cont += '<div id="af2_question_'+questionid+'" class="'+type+' af2_question af2_editable_content af2_draggable deleteable" data-type="'+type+'">';
    cont += inner;
    cont += '</div>';
    cont += '<div id="'+(questionid+1)+'" class="af2_input_margs"></div>';
    return cont;
};

const af2_create_inner_question_content = (questionid) => {
    const type = af2_jsonobj.questions[questionid].typ;

    let cont = '';

    switch(type)
    {
        case 'text_type_plain':
        {
            cont += '<div id="af2_question_id_'+questionid+'" style="display:none" class="af2_id_l af2_changeable" data-basetext=""></div>';
            cont += '<div id="af2_question_label_'+questionid+'" class="af2_label af2_changeable" data-basetext=""></div>';
            cont += '<input id="af2_question_text_input_'+questionid+'" class="af2_text_input form-control inpute af2_changeable" data-baseplaceholder="" placeholder="" type="text" disabled/>';
            break;
        }
        case 'text_type_name':
        {
            cont += '<div id="af2_question_id_'+questionid+'" style="display:none" class="af2_id_l af2_changeable" data-basetext=""></div>';
            cont += '<div id="af2_question_label_'+questionid+'" class="af2_label af2_changeable" data-basetext=""></div>';
            cont += '<input id="af2_question_text_input_'+questionid+'" class="af2_text_input form-control inpute af2_changeable" data-baseplaceholder="" placeholder="" type="text" disabled/>';
            break;
        }
        case 'text_type_phone':
        {
            cont += '<div id="af2_question_id_'+questionid+'" style="display:none" class="af2_id_l af2_changeable" data-basetext=""></div>';
            cont += '<div id="af2_question_label_'+questionid+'" class="af2_label af2_changeable" data-basetext=""></div>';
            cont += '<input id="af2_question_text_input_'+questionid+'" class="af2_text_input form-control inpute af2_changeable" data-baseplaceholder="" placeholder="" type="text" disabled/>';
            break;
        }
        case 'text_type_mail':
        {
            cont += '<div id="af2_question_id_'+questionid+'" style="display:none" class="af2_id_l af2_changeable" data-basetext=""></div>';
            cont += '<div id="af2_question_label_'+questionid+'" class="af2_label af2_changeable" data-basetext=""></div>';
            cont += '<input id="af2_question_text_input_'+questionid+'" class="af2_text_input form-control inpute af2_changeable" data-baseplaceholder="" placeholder="" type="text" disabled/>';
            break;
        }
        case 'checkbox_type':
        {
            cont += '<div id="af2_question_id_'+questionid+'" style="display:none" class="af2_id_l af2_changeable" data-basetext=""></div>';
            cont += '<input class="af2_checkbox form-check-input inpute" type="checkbox" disabled/>';
            cont += '<div id="af2_question_checkbox_label_'+questionid+'" class="af2_checkbox_label af2_changeable" data-basetext="Ihre Informationen" data-title="Checkbox-Text" data-placeholder="Text..."></div>';
            break;
        }
        case 'google_recaptcha':
        {
            cont += '<div id="af2_question_id_'+questionid+'" style="display:none" class="af2_id_l af2_google_recaptcha af2_changeable" data-basetext=""></div>';
            cont += '<div id="af2_question_site_key_'+questionid+'" style="display:none" class="af2_changeable" data-basetext=""></div>';
            cont += '<div id="af2_question_site_secret_'+questionid+'" style="display:none" class="af2_changeable" data-basetext=""></div>';
            cont += '<input class="af2_checkbox recaptcha_checkbox form-check-input inpute" type="checkbox" disabled/>';
            cont += '<div id="af2_question_checkbox_label_'+questionid+'" class="af2_checkbox_label"></div>';
            
            break;
        }
    }

    return cont;
};

const af2_load_kfb_settings = () => {
    af2_update_kfb_settings();
};


const af2_update_kfb_settings = () => {
    if($('#af2_kfb_title')[0] === undefined)
    {
        create_af2_kfb_settings();
    }

    af2_update_kfb_title();
    af2_update_kfb_mailfrom();
    af2_update_kfb_mailto();
    af2_update_kfb_mailsubject();
    af2_update_kfb_mailtext();
    af2_update_kfb_from_name();
    af2_update_kfb_mailcc();
    af2_update_kfb_mailbcc();

    let show = 'block';
    let check = true;
    if(af2_jsonobj.use_smtp)
    {

    }
    else
    {
        show = 'none';
        check = false;
    }

    let show_r = 'block';
    let check_r = true;
    if(af2_jsonobj.use_autorespond)
    {

    }
    else
    {
        show_r = 'none';
        check_r = false;
    }

    let check_w = true;
    if(af2_jsonobj.use_wp_mail)
    {

    }
    else
    {
        check_w = false;
    }

    $('#af2_use_wp_mail').prop('checked', check_w);

    $('#af2_use_smtp').prop('checked', check);
    $('.use_smtp').each((i, el) => {
        $(el).css('display', show);
    });

    $('#af2_use_autoresponder').prop('checked', check_r);
    $('.use_autorespond').each((i, el) => {
        $(el).css('display', show_r);
    });

    let check1 = false;
    let check2 = false;

    if(af2_jsonobj.smtp_type === 'ssl')
    {
        check1 = true;
    }
    else if(af2_jsonobj.smtp_type === 'tls')
    {
        check2 = true;
    }

    $('#af2_kfb_smtp_ssl').prop('checked', check1);
    $('#af2_kfb_smtp_tls').prop('checked', check2);


    af2_update_kfb_smtp_username();
    af2_update_kfb_smtp_host();
    af2_update_kfb_smtp_password();
    af2_update_kfb_smtp_port();

    af2_update_kfb_autoresponder_field();
    af2_update_kfb_autoresponder_nachricht();
    af2_update_kfb_autoresponder_subject();
};

const af2_update_kfb_title = () => {
    let selector = $($('#af2_kfb_title')[0]);
    let cont;
    if(af2_jsonobj.name === undefined || af2_jsonobj.name.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.name;
    }

    $('#af2_kfb_title').html(cont)
};

const af2_update_kfb_mailcc = () => {
    let selector = $($('#af2_kfb_mailcc')[0]);
    let cont;
    if(af2_jsonobj.mailcc === undefined || af2_jsonobj.mailcc.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.mailcc;
    }

    $('#af2_kfb_mailcc').html(cont);
};

const af2_update_kfb_mailbcc = () => {
    let selector = $($('#af2_kfb_mailbcc')[0]);
    let cont;
    if(af2_jsonobj.mailbcc === undefined || af2_jsonobj.mailbcc.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.mailbcc;
    }

    $('#af2_kfb_mailbcc').html(cont);
};

const create_af2_kfb_settings = () => {


    let cont = '';
    cont += '<div id="af2_kfb_title" class="af2_content_title af2_editable_content af2_changeable" data-type="text" data-placeholder="Name des Formulares..." data-title="Name" data-basetext="Fügen Sie hier den Namen des Kontaktformulares ein!"></div>';

    cont += '<div class="af2_box">';
        cont += '<div class="af2_contact_box">';
            cont += '<div class="af2_contact_card">';
                cont += '<h4 class="af2_contact_card_heading">Benachrichtigungsmail</h4>';
                cont += '<div class="af2_c_cf_wrapper"><i class="iclass far fa-user mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label">Absender Name</div><div id="af2_kfb_mailfrom_name" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="Name..." data-title="Absendername" data-basetext="..."></div></div></div>';
                cont += '<div class="af2_c_cf_wrapper"><i class="iclass fas fa-envelope mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label">Absender E-Mail</div><div id="af2_kfb_mailfrom" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="E-Mail..." data-title="Absender E-Mail" data-basetext="..."></div></div></div>';

                cont += '<div style="width: 100%; height: 20px"></div>';

                cont += '<div class="af2_c_cf_wrapper"><i class="iclass fas fa-envelope mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label">Empfänger E-Mail</div><div id="af2_kfb_mailto" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="E-Mail..." data-title="Empfänger" data-basetext="..."></div></div></div>';
                cont += '<div class="af2_c_cf_wrapper"><i class="iclass fas fa-envelope mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label">CC Empfänger (mit Komma getrennt)</div><div id="af2_kfb_mailcc" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="CC..." data-title="CC" data-basetext="..."></div></div></div>';
                cont += '<div class="af2_c_cf_wrapper"><i class="iclass fas fa-envelope mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label">BCC Empfänger (mit Komma getrennt)</div><div id="af2_kfb_mailbcc" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="BCC..." data-title="BCC" data-basetext="..."></div></div></div>';

                cont += '<div style="width: 100%; height: 20px"></div>';

                cont += '<div class="af2_c_cf_wrapper"><i class="iclass fas fa-align-left mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label">Betreff</div><div id="af2_kfb_mailsubject" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="Betreff..." data-title="Betreff der Mail" data-basetext="..."></div></div></div>';
                cont += '<div class="af2_c_cf_wrapper c_text"><i class="iclass fas fa-comments mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label">Nachricht - folgende Platzhalter können eingefügt werden: <div class="mail_shortcodes_wrap"><span>[antworten]</span><div class="mail_shortcodes"></div></div></div><div id="af2_kfb_mailtext" class="cont_left af2_editable_content af2_changeable" data-type="textarea_type" data-placeholder="E-Mail Text..." data-title="Nachricht" data-basetext="..."></div></div></div>';

                cont += '<div class="testnachricht_wrapper"><button id="af2_smtp_testnachricht" class="btn btn-primary">TESTNACHRICHT SENDEN <i class="fas fa-paper-plane ml-2"></i></button> </div>';
            cont += '</div>';
        cont += '</div>';
        cont += '<div class="af2_contact_box">';
            cont += '<div class="af2_contact_card">';
                cont += '<div style="display: flex; align-items: center;">';
                    cont += '<h4 class="af2_contact_card_heading">Kontaktformular Einstellungen</h4>';
                cont += '</div>';
                cont += '<div class="cf_extra_settings">';
                    let checked = 'checked';
                    if(!af2_jsonobj.show_bottombar)
                    {
                        checked = '';
                    }
                    cont += '<input id="af2_show_bottombar" type="checkbox" class="mt-3" '+checked+'><label class="af2_sb_lbl" for="af2_show_bottombar">Aktiviere dieses Kontrollkästchen, um die Fortschrittsbar auf dem Kontaktformular anzuzeigen</label>';
                cont += '</div>';
            cont += '</div>';
            cont += '<div class="af2_contact_card">';
                cont += '<div style="display: flex; align-items: center;">';
                    cont += '<h4 class="af2_contact_card_heading">Autoresponder</h4>';
                    cont += '<input id="af2_use_autoresponder" class="ml-3" type="checkbox">';
                cont += '</div>';
                cont += '<div class="use_autorespond">';
                    cont += '<div class="af2_c_cf_wrapper"><i class="iclass fas fa-envelope mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label">Empfänger E-Mail (fügen Sie die E-Mail mit der [ID] des Empfängers ein)</div><div id="af2_kfb_autoresponder_field" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="E-Mail-Adressfeld..." data-title="E-Mail-Adressfeld" data-basetext="..."></div></div></div>';
                    cont += '<div class="af2_c_cf_wrapper"><i class="iclass fas fa-align-left mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label">Betreff</div><div id="af2_kfb_autoresponder_subject" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="Betreff..." data-title="Betreff" data-basetext="..."></div></div></div>';
                    cont += '<div class="af2_c_cf_wrapper c_text"><i class="iclass fas fa-comments mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label">Nachricht - folgende Platzhalter können eingefügt werden: <div class="mail_shortcodes_wrap"><span>[antworten]</span><div class="mail_shortcodes"></div></div></div><div id="af2_kfb_autoresponder_nachricht" class="cont_left af2_editable_content af2_changeable" data-type="textarea_type" data-placeholder="E-Mail Text..." data-title="Text der E-Mail" data-basetext="..."></div></div></div>';
                cont += '</div>';
            cont += '</div>';
            cont += '<div class="af2_contact_card">';
                cont += '<div style="display: flex; align-items: center;">';
                    cont += '<h4 class="af2_contact_card_heading">SMTP Server (Manuell eintragen)</h4>';
                    cont += '<input id="af2_use_smtp" class="ml-3" type="checkbox">';
                    cont += '<h4 class="af2_contact_card_heading ml-5">WP Mail</h4>';
                    cont += '<input id="af2_use_wp_mail" class="ml-3" type="checkbox">';
                cont += '</div>';
                cont += '<div class="use_smtp">';
                    cont += '<div class="af2_c_cf_wrapper"><i class="iclass fas fa-network-wired mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label">SMTP Server</div><div id="af2_kfb_smtp_host" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="SMTP Server" data-title="Host" data-basetext="..."></div></div></div>';
                    cont += '<div class="af2_c_cf_wrapper"><i class="iclass far fa-user mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label">SMTP Benutzername</div><div id="af2_kfb_smtp_username" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="SMTP Benutzername" data-title="Benutzername" data-basetext="..."></div></div></div>';
                    cont += '<div class="af2_c_cf_wrapper"><i class="iclass fas fa-lock mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label">SMTP Passwort</div><div id="af2_kfb_smtp_password" class="cont_left af2_editable_content af2_changeable" data-type="text_hidden" data-placeholder="SMTP Passwort" data-title="Passwort" data-basetext="..."></div></div></div>';
                    cont += '<div class="af2_c_cf_wrapper"><i class="iclass fas fa-arrows-alt-v mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label">SMTP Port</div><div id="af2_kfb_smtp_port" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="SMTP Port" data-title="Port" data-basetext="..."></div></div></div>';
                    cont += '<div class="af2_c_cf_wrapper"><i class="iclass fas fa-key mr-2"></i><div class="af2_cfield_wrapper"><div class="cfield_label"></div><div id="af2_smtp_t" class="cont_left" style="display:flex; align-items: center;">SSL<input id="af2_kfb_smtp_ssl" class="af2_smtp_type ml-2" type="checkbox"><div style="width: 10px;"></div>TLS<input class="ml-2 af2_smtp_type" id="af2_kfb_smtp_tls" type="checkbox"></div></div></div>';
                cont += '</div>';
            cont += '</div>';
        cont += '</div>';
    cont += '</div>';

    /**
    cont += '<div class="af2_left_container">';
        cont += '<div class="af2_cont_box fix">';
            cont += '<div class="af2_bold cont_left">Nutze SMTP:</div>';
            cont += '<div class="use_smtp">';
                cont += '<div class="af2_bold cont_left">SMTP Server:</div>';
                cont += '<div class="af2_bold cont_left">SMTP Benutzername:</div>';
                cont += '<div class="af2_bold cont_left">SMTP Passwort:</div>';
                cont += '<div class="af2_bold cont_left">Verschlüsselungsart:</div>';
                cont += '<div class="af2_bold cont_left">SMTP Port:</div>';
            cont += '</div>';
            cont += '<div class="af2_bold cont_left">Sender E-Mail:</div>';
            cont += '<div class="af2_bold cont_left">Sendername:</div>';
            cont += '<div class="af2_bold cont_left">Empfänger E-Mail:</div>';
            cont += '<div class="af2_bold cont_left">CC:</div>';
            cont += '<div class="af2_bold cont_left">BCC:</div>';
            cont += '<div class="af2_bold cont_left">Betreff:</div>';
            cont += '<div class="af2_bold cont_left">Nachricht:</div>';
        cont += '</div>';
        cont += '<div class="af2_cont_box">';
            cont += '<div class="cont_left"><input id="af2_use_smtp" type="checkbox"></div>';
            cont += '<div class="use_smtp">';
            cont += '<div id="af2_kfb_smtp_host" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="Host..." data-title="Host" data-basetext="Host..."></div>';
            cont += '<div id="af2_kfb_smtp_username" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="Username..." data-title="Benutzername" data-basetext="Username..."></div>';
            cont += '<div id="af2_kfb_smtp_password" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="Passwort..." data-title="Passwort" data-basetext="Passwort..."></div>';
            cont += '<div id="af2_smtp_t" class="cont_left" style="display:flex;">SSL<input id="af2_kfb_smtp_ssl" class="af2_smtp_type" type="checkbox"> TLS<input class="af2_smtp_type" id="af2_kfb_smtp_tls" type="checkbox"></div>';
            cont += '<div id="af2_kfb_smtp_port" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="Port..." data-title="Port" data-basetext="Port..."></div>';
            cont += '</div>';
            cont += '<div id="af2_kfb_mailfrom" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="E-Mail..." data-title="Absender" data-basetext="wordpress@'+window.location.hostname+'"></div>';
            cont += '<div id="af2_kfb_mailfrom_name" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="Von Name..." data-title="Von Name" data-basetext="Von Name..."></div>';
            cont += '<div id="af2_kfb_mailto" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="E-Mail..." data-title="Empfänger" data-basetext="Fügen Sie hier die Empfänger - E-Mail Adresse ein."></div>';
            cont += '<div id="af2_kfb_mailcc" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="CC..." data-title="CC" data-basetext="Fügen Sie hier die CCs (mit Komma getrennt) ein."></div>';
            cont += '<div id="af2_kfb_mailbcc" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="BCC..." data-title="BCC" data-basetext="Fügen Sie hier die BCCs (mit Komma getrennt) ein."></div>';
            cont += '<div id="af2_kfb_mailsubject" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="Betreff..." data-title="Betreff der Mail" data-basetext="Fügen Sie hier den Betreff der Mail ein."></div>';
            cont += '<div id="af2_kfb_mailtext" class="cont_left af2_editable_content af2_changeable" data-type="textarea_type" data-placeholder="E-Mail Text..." data-title="Text der Mail" data-basetext="Fügen Sie hier den zu sendenden Text mit [antworten] ein. Und Fügen Sie die Antwort IDs mit [ID] ein!"></div>';
            cont += '<button id="af2_smtp_testnachricht" class="btn btn-primary">Testnachricht senden</button>';
        cont += '</div>';
    cont += '</div>';
    cont += '<div class="af2_left_container">';
        cont += '<div class="af2_cont_box fix">';
            cont += '<div class="af2_bold cont_left">Nutze Autoresponder:</div>';
            cont += '<div class="use_autorespond">';
            cont += '<div class="af2_bold cont_left">Autoresponder Feld:</div>';
            cont += '<div class="af2_bold cont_left">Autoresponder Betreff:</div>';
            cont += '<div class="af2_bold cont_left">Autoresponder Nachricht:</div>';
            cont += '</div>';
        cont += '</div>';
        cont += '<div class="af2_cont_box">';
            cont += '<div class="cont_left"><input id="af2_use_autoresponder" type="checkbox"></div>';
            cont += '<div class="use_autorespond">';
            cont += '<div id="af2_kfb_autoresponder_field" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="E-Mail-Adressfeld..." data-title="E-Mail-Adressfeld" data-basetext="Fügen Sie hier das [FELD] des E-Mail Empfängers ein."></div>';
            cont += '<div id="af2_kfb_autoresponder_subject" class="cont_left af2_editable_content af2_changeable" data-type="text" data-placeholder="Betreff..." data-title="Betreff" data-basetext="Fügen Sie hier den Betreff ein!"></div>';
            cont += '<div id="af2_kfb_autoresponder_nachricht" class="cont_left af2_editable_content af2_changeable" data-type="textarea_type" data-placeholder="E-Mail Text..." data-title="Text der Autoresponder Mail" data-basetext="Fügen Sie hier den zu sendenden Text mit [antworten] ein. Und Fügen Sie die Antwort IDs mit [ID] ein!"></div>';
            cont += '</div>';
        cont += '</div>';
    cont += '</div>';**/
    $('.af2_content').html(cont);
};

const af2_create_cfb_title = () => {
 return '<div id="af2_contactformtitle" class="af2_content_title af2_editable_content af2_changeable" data-type="text" data-placeholder="Titel des Formulares..." data-title="Kontaktformulartitel" data-basetext="Fügen Sie den Titel des Kontaktformulares ein!"></div>';
};


const af2_update_kfb_from_name = () => {
    let selector = $($('#af2_kfb_mailfrom_name')[0]);
    let cont;
    if(af2_jsonobj.mailfrom_name === undefined || af2_jsonobj.mailfrom_name.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.mailfrom_name;
    }

    $('#af2_kfb_mailfrom_name').html(cont);
};

const af2_update_kfb_smtp_username = () => {
    let selector = $($('#af2_kfb_smtp_username')[0]);
    let cont;
    if(af2_jsonobj.smtp_username === undefined || af2_jsonobj.smtp_username.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.smtp_username;
    }

    $('#af2_kfb_smtp_username').html(cont);
};
const af2_update_kfb_smtp_host = () => {
    let selector = $($('#af2_kfb_smtp_host')[0]);
    let cont;
    if(af2_jsonobj.smtp_host === undefined || af2_jsonobj.smtp_host.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.smtp_host;
    }

    $('#af2_kfb_smtp_host').html(cont);
};
const af2_update_kfb_smtp_password = () => {
    let selector = $($('#af2_kfb_smtp_password')[0]);
    let cont;
    if(af2_jsonobj.smtp_password === undefined || af2_jsonobj.smtp_password.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = replaceToStar(af2_jsonobj.smtp_password.length, '');
    }

    $('#af2_kfb_smtp_password').html(cont);
};

const replaceToStar = (x, cont) => {
    cont += '*';
    if(x === 1)
    {
        return cont;
    }
    return replaceToStar(x-1, cont);
};

const af2_update_kfb_smtp_port = () => {
    let selector = $($('#af2_kfb_smtp_port')[0]);
    let cont;
    if(af2_jsonobj.smtp_port === undefined || af2_jsonobj.smtp_port.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.smtp_port;
    }

    $('#af2_kfb_smtp_port').html(cont);
};

const af2_update_kfb_mailfrom = () => {
    let selector = $($('#af2_kfb_mailfrom')[0]);
    let cont;
    if(af2_jsonobj.mailfrom === undefined || af2_jsonobj.mailfrom.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.mailfrom;
    }

    $('#af2_kfb_mailfrom').html(cont);
};

const af2_update_kfb_mailto = () => {
    let selector = $($('#af2_kfb_mailto')[0]);
    let cont;
    if(af2_jsonobj.mailto === undefined || af2_jsonobj.mailto.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.mailto;
    }

    $('#af2_kfb_mailto').html(cont);
};

const af2_update_kfb_mailsubject = () => {
    let selector = $($('#af2_kfb_mailsubject')[0]);
    let cont;
    if(af2_jsonobj.mailsubject === undefined || af2_jsonobj.mailsubject.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.mailsubject;
    }
    $('#af2_kfb_mailsubject').html(cont);
};

const af2_update_kfb_mailtext = () => {
    
    let selector = $($('#af2_kfb_mailtext')[0]);
    let cont;
    
    if(af2_jsonobj.mailtext === undefined || af2_jsonobj.mailtext.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.mailtext;
    }
    
    // append dynamic shortcodes
    if(af2_jsonobj.questions.length > 0){
        let shortcode_html = '';
        $.each(af2_jsonobj.questions,function(i,t){
            shortcode_html +='<span>['+t.id+']</span>'; 
        });
        $(".mail_shortcodes").html(shortcode_html);
    }
    cont = cont.replace(/\n/g, "<br />");
    $('#af2_kfb_mailtext').html(cont);
};

const af2_update_kfb_autoresponder_nachricht = () => {
    let selector = $($('#af2_kfb_autoresponder_nachricht')[0]);
    let cont;
    if(af2_jsonobj.autoresponder_nachricht === undefined || af2_jsonobj.autoresponder_nachricht.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.autoresponder_nachricht;
    }

    cont = cont.replace(/\n/g, "<br />");
    $('#af2_kfb_autoresponder_nachricht').html(cont);
};

const af2_update_kfb_autoresponder_subject = () => {
    let selector = $($('#af2_kfb_autoresponder_subject')[0]);
    let cont;
    if(af2_jsonobj.autoresponder_subject === undefined || af2_jsonobj.autoresponder_subject.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.autoresponder_subject;
    }
    $('#af2_kfb_autoresponder_subject').html(cont);
};

const af2_update_kfb_autoresponder_field = () => {
    let selector = $($('#af2_kfb_autoresponder_field')[0]);
    let cont;
    if(af2_jsonobj.autoresponder_field === undefined || af2_jsonobj.autoresponder_field.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.autoresponder_field;
    }
    $('#af2_kfb_autoresponder_field').html(cont);
};

const af2_update_send_button = () => {
    let selector = $($('#af2_send_button')[0]);
    let cont;
    if(af2_jsonobj.send_button === undefined || af2_jsonobj.send_button.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.send_button;
    }
    $($('#af2_send_button')[0]).attr('value', cont);
};

const af2_update_show_bottombar = () => {
    let selector = $($('#af2_show_bottombar')[0]);
    let cont;
    if(af2_jsonobj.show_bottombar === undefined)
    {
        af2_jsonobj.show_bottombar = true;
    }

    if(af2_jsonobj.show_bottombar === false)
    {
        selector.prop('checked', false);
    }
    else
    {
        selector.prop('checked', true);
    }
}