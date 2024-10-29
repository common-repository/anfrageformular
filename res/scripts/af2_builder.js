let af2_jsonobj = {};

let af2_page = '';
let af2_backpage = '';
let af2_content = '';
let af2_id = '';
let af2_title = '';

let origin = '';

let zoom = 1.0;

jQuery(document).ready(($) => {
    //Getting Contents
    const req_div = $('#af2_req_div_data');
    af2_page = req_div.data('page');
    af2_backpage = req_div.data('backpage');
    af2_content = req_div.data('content');
    af2_id = req_div.data('id');
    origin = window.location.origin;

    const cont = JSON.stringify(af2_content);


    /** On Update doing the callback save method **/
    $('.af2_whole').on('af2_update', (ev) => {
        if(ev.content_after !== undefined && ev.content_before !== undefined && ev.method !== undefined)
        {
            const content_before = {"arg": "content_before", "content": ev.content_before};     // CONTENT BEFORE
            const content_after = {"arg": "content_after", "content": ev.content_after};        // CONTENT AFTER
            const method = {"arg": "method", "content": ev.method};                             // METHOD IN MODEL
            const callback = {"arg":"callback", "content": ev.callback};                        // METHOD IN VIEW
            const special = {"arg": "special", "content":ev.special};                           // CREATE NEW
            const obj = {"arg": "obj", "content":ev.obj};                                       // Highlight object
            const callbackarg = {"arg":"callbackarg", "content":ev.callbackarg};                // arguments for callback
            af2_throw_event('save_state_change', [callbackarg, obj, special, callback, content_before, content_after, method], '.af2_whole');
        }
        //Standard Callback
        const cb = ev.callback;
        const param = ev.callbackarg;
        if(param === undefined || param === null)
        {
            cb();
        }
        else
        {
            cb(param);
        }
    });

    /** Save Button clicked **/
    $('#af2_save_button').on('click', () => {
        af2_throw_event('save', [], '.af2_whole');
    });

    /** Back Button clicked **/
    $('#af2_back_button').on('click', () => {
        af2_throw_event('back', [], '.af2_whole');
    });

    /** Selected an Editable Content **/
    $(document).on('click', '.af2_editable_content', (ev) => {
        evaluate_multiple_click_on_editable_content(ev.currentTarget);
    });

    /** Input Content Changing **/
    $(document).on('input', '.content_change', (ev) => {
        const editid = $(ev.currentTarget).data('editid');
        const content = $(ev.currentTarget).val();
        af2_throw_event('input_content_change', [{"arg":"content", "content":content}], '#'+editid);
    });


    $(document).on('click', '.iconpicker-item', () => {
        const selector = $('#af2_icon_picker');
        const new_value = selector.val();
        af2_throw_event('icon_selected', [{"arg":"id", "content":selector.data('editid')},
            {"arg":"val", "content":new_value}], '#'+selector.data('editid'));
    });

    $(document).on('click', '.af2_choose_img', (ev) => {
        mediaUploaderStart($(ev.currentTarget).data('editid'));
    });

    $(document).on('mouseenter', '.af2_editable_content.deleteable', (ev) => {
        $(ev.currentTarget).append('<div class="af2_delete_button"><i class="far fa-trash-alt"></i></div>');
    });
    $(document).on('mouseleave', '.af2_editable_content.deleteable', (ev) => {
        $('.af2_delete_button').each((i, el) => {
            $(el).remove();
        });
    });

    $(document).on('click', '.af2_delete_button', (ev) => {
        const selector = $(ev.currentTarget).parent();
        af2_throw_event('delete', [], selector);
    });

    /** CONTENT LOAD **/
    if(cont !== '' && cont !== '{}')
    {
        af2_throw_event('load_content', [{"arg":"content", "content":af2_content}], document);
    }
    else
    {
        af2_throw_event('load_empty', [], document);
    }


    $(document).on('click', '#close_now', () => {
        window.location.replace(window.location.origin+window.location.pathname+"?page="+af2_backpage);
    });

    $(document).on('change', '.content_change_cb', (ev) => {
        const editid = $(ev.currentTarget).data('editid');

        const content = $(ev.currentTarget).is(':checked');
        af2_throw_event('input_content_cb_change', [{"arg":"content", "content":content}], '#'+editid);
    });
});

const af2_save = () => {
    $.ajax({
        url: af2_BE_save.ajax_url,
        type: "POST",
        data: {
            page: af2_page,
            id: af2_id,
            content: JSON.stringify(af2_jsonobj).replace(/'/g, '\\"'),
            title: af2_title,
            action: 'af2_save_content',
            _ajax_nonce: af2_BE_save.nonce
        },
        success: (cont) =>
        {
            af2_throw_toast('success', 'Speichern erfolgreich');
        },
        error: () =>
        {
            af2_throw_toast('error', 'Frage konnte aufgrund von Verbindungsproblemen nicht gespeichert werden. Sollten Sie eine Internetverbindung haben, melden Sie sich bitte beim Support!');

        }
    });
};

const af2_throw_toast = (type, text) => {
    M.toast({html: text, displayLength: 4000, classes: type});

    if($('.af2_canvas #toast-container')[0] === undefined)
    {
        const el = $('#toast-container').detach();
        $('.af2_canvas').append(el);
    }
};

/** Marking a Content */
const af2_mark_content = (target) => {
    $(target).addClass('marked');
};

/** unmarking a content */
const af2_unmark_content = (target) => {
    $(target).removeClass('marked');
    $(target).addClass('unmarked');
};

/** deleting the mark */
const af2_remove_mark = (target) => {
    $(target).removeClass('unmarked')
};

/**
 * Method for Throwing events!
 *
 * @param title
 * @param args
 * @param trigger
 */
const af2_throw_event = (title, args, trigger) => {
    let event = jQuery.Event(title);
    $(args).each((i, arg) => {
        event[arg.arg] = arg.content;
    });
    $(trigger).trigger(event);
};


/** ************************************************************************ **/
/**                            CUSTOMIZE CONTENT                             **/
/** ************************************************************************ **/

/**
 * Generating the Customize Content
 *
 * @param target
 * @param callback
 * @returns {string}
 */
const af2_generate_customize_content = (target, callback) => {
    const type = $(target).data('type');
    return af2_validate_ect(type, target, callback);
};

/**
 * Validating the ECT
 * @param type
 * @param target
 * @param callback
 * @returns {string}
 */
const af2_validate_ect = (type, target, callback) => {
    const data = callback($(target).attr('id'));
    switch(type)
    {
        case 'text':
        {
            const content1 = af2_sidebar_create_text_content($(target).attr('id')+'_', null, $(target).data('title'), $(target).data('placeholder'),
                $(target).attr('id'), data, true, true);
            return content1;
        }
        case 'text_mandatory':{
            const content1 = af2_sidebar_create_text_content($(target).attr('id')+'_', null, $(target).data('title'), $(target).data('placeholder'),$(target).attr('id'), data[0], true, true);
            const content2 = af2_sidebar_create_checkbox_content($(target).attr('id')+'_mandatory', 'Pflichtfeld', data[1], false, $(target).attr('id')+'_mandatory_');
            return content1 + content2;
        }
        case 'text_content':
        {
            const content1 = af2_sidebar_create_text_content($(target).attr('id')+'_', null, $(target).data('title'), $(target).data('placeholder'),
                $(target).attr('id'), data[0], true, true);
            const content2 = af2_sidebar_create_checkbox_content($(target).attr('id')+'_cb_', 'Button zum weiterklicken', data[1], false, $(target).attr('id'));
            const content3 = af2_sidebar_create_text_content($(target).attr('id')+'_wait_', null, 'Wartezeit (in Millisekunden)', '3000', $(target).attr('id')+'_wait_', data[2], true, true);
            return content1 + content2 + content3;
        }
        case 'text_hidden':
        {
            const content1 = af2_sidebar_create_text_hidden_content($(target).attr('id')+'_', null, $(target).data('title'), $(target).data('placeholder'),
                $(target).attr('id'), data, true, true);
            return content1;
        }
        case 'datum':
        {
            const content1 = af2_sidebar_create_text_content($(target).attr('id')+'_', null, $(target).data('title'), $(target).data('placeholder'),$(target).attr('id'), data[0], true, true);
            
            const content2 = af2_sidebar_create_date_format_content($(target).attr('id')+'_format', null, "Datumsformat",$(target).attr('id')+'_format_', data[1], true);
            
            return content1 + content2;
        }
        case 'slider':
        {
            const content1 = af2_sidebar_create_text_content($(target).attr('id')+'_label', null, "Label", "Label...",
                $(target).attr('id')+'_label_', data[0], true, true);
            const content2 = af2_sidebar_create_text_content($(target).attr('id')+'_min', null, "Minimaler Wert", "Min...",
                $(target).attr('id')+'_min_', data[1], true, true);
            const content3 = af2_sidebar_create_text_content($(target).attr('id')+'_max', null, "Maximaler Wert", "Max...",
                $(target).attr('id')+'_max_', data[2], true, true);
            const content4 = af2_sidebar_create_text_content($(target).attr('id')+'_steps', null, "Schrittgröße", "Schrittgröße...",
                $(target).attr('id')+'_steps_', data[3], true, true);
            const content5 = af2_sidebar_create_text_content($(target).attr('id')+'_start', null, "Vorausgewählter Wert", "Start...",
                $(target).attr('id')+'_start_', data[4], true, true);
            const content6 = af2_sidebar_create_checkbox_content($(target).attr('id')+'_thousand', 'Tausendertrennzeichen', data[5], false, $(target).attr('id')+'_thousand_');
            const content7 = af2_sidebar_create_checkbox_content($(target).attr('id')+'_lab', 'Label vor der Zahl anzeigen', data[6], false, $(target).attr('id')+'_lab_');
            
            return content1 + content7 + content2 + content3 + content4 + content5 + content6;
        }
        case 'answer':
        {
            let edit = $(target).attr('id');
            const pos = edit.substr(11);
            const editid = edit.substr(0, 10)+'_p_'+pos;
            const editid2 = edit.substr(0, 10)+'_pic_'+pos;
            const content1 = af2_sidebar_create_text_content(editid+'_', null, $(target).data('titletext'), 'Ihre Antwort...',
                editid, data[0], true, true);
            const content2 = af2_sidebar_create_image_choose_content(editid2+'_img', null, $(target).data('titleimg'), editid2, data[1], true);

            return content1 + content2;
        }
        case 'google_recaptcha':
		{
			let edit = $(target).attr('id');
			const pos = edit.substr(13);
			const editid = edit.substr(0, 12)+'_id_'+pos;
			const editid2 = edit.substr(0, 12)+'_site_key_'+pos;
			const editid3 = edit.substr(0, 12)+'_site_secret_'+pos;

			content1 = af2_sidebar_create_text_content($(target).attr('id')+'_id_', null, 'ID', 'Die ID', editid, data[0], true, true);
			content2 = af2_sidebar_create_text_content($(target).attr('id')+'_site_key_', null, 'Site Key', 'Site Key', editid2, data[1], true, true);
            content3 = af2_sidebar_create_text_content($(target).attr('id')+'_site_secret_', null, 'Site Secret', 'Site Secret', editid3, data[2], true, true);

			return content1 + content2 + content3
		}
        case 'text_type_plain':
        {
            let edit = $(target).attr('id');
            const pos = edit.substr(13);
            const editid = edit.substr(0, 12)+'_id_'+pos;
            const editid2 = edit.substr(0, 12)+'_label_'+pos;
            const editid3 = edit.substr(0, 12)+'_text_input_'+pos;

            content1 = af2_sidebar_create_text_content($(target).attr('id')+'_id_', null, 'ID', 'Die ID',
                editid, data[0], true, true);
            content2 = af2_sidebar_create_text_content($(target).attr('id')+'_', null, 'Label', 'Das Label...',
                editid2, data[1], true, false);
            content3 = af2_sidebar_create_text_content($(target).attr('id')+'_ph_', null, 'Placeholder', 'Der Placeholder...',
                editid3, data[2], true, false);
            content4 = af2_sidebar_create_checkbox_content($(target).attr('id')+'_cb_', 'Pflichtfeld', data[3], false, $(target).attr('id'));
            return content1 + content2 + content3 + content4;
        }
        case 'text_type_name':
        {
            let edit = $(target).attr('id');
            const pos = edit.substr(13);
            const editid = edit.substr(0, 12)+'_id_'+pos;
            const editid2 = edit.substr(0, 12)+'_label_'+pos;
            const editid3 = edit.substr(0, 12)+'_text_input_'+pos;

            content1 = af2_sidebar_create_text_content($(target).attr('id')+'_id_', null, 'ID', 'Die ID',
                editid, data[0], true, true);
            content2 = af2_sidebar_create_text_content($(target).attr('id')+'_', null, 'Label', 'Das Label...',
                editid2, data[1], true, false);
            content3 = af2_sidebar_create_text_content($(target).attr('id')+'_ph_', null, 'Placeholder', 'Der Placeholder...',
                editid3, data[2], true, false);
            content4 = af2_sidebar_create_checkbox_content($(target).attr('id')+'_cb_', 'Pflichtfeld', data[3], false, $(target).attr('id'));
            return content1 + content2 + content3 + content4;
        }
        case 'text_type_mail':
        {
            let edit = $(target).attr('id');
            const pos = edit.substr(13);
            const editid = edit.substr(0, 12)+'_id_'+pos;
            const editid2 = edit.substr(0, 12)+'_label_'+pos;
            const editid3 = edit.substr(0, 12)+'_text_input_'+pos;

            content1 = af2_sidebar_create_text_content($(target).attr('id')+'_id_', null, 'ID', 'Die ID',
                editid, data[0], true, true);
            content2 = af2_sidebar_create_text_content($(target).attr('id')+'_', null, 'Label', 'Das Label...',
                editid2, data[1], true, false);
            content3 = af2_sidebar_create_text_content($(target).attr('id')+'_ph_', null, 'Placeholder', 'Der Placeholder...',
                editid3, data[2], true, false);
            content4 = af2_sidebar_create_checkbox_content($(target).attr('id')+'_cb_', 'Pflichtfeld', data[3], false, $(target).attr('id'));
            return content1 + content2 + content3 + content4;
        }
        case 'text_type_phone':
        {
            let edit = $(target).attr('id');
            const pos = edit.substr(13);
            const editid = edit.substr(0, 12)+'_id_'+pos;
            const editid2 = edit.substr(0, 12)+'_label_'+pos;
            const editid3 = edit.substr(0, 12)+'_text_input_'+pos;

            content1 = af2_sidebar_create_text_content($(target).attr('id')+'_id_', null, 'ID', 'Die ID',
                editid, data[0], true, true);
            content2 = af2_sidebar_create_text_content($(target).attr('id')+'_', null, 'Label', 'Das Label...',
                editid2, data[1], true, false);
            content3 = af2_sidebar_create_text_content($(target).attr('id')+'_ph_', null, 'Placeholder', 'Der Placeholder...',
                editid3, data[2], true, false);
            content4 = af2_sidebar_create_checkbox_content($(target).attr('id')+'_cb_', 'Pflichtfeld', data[3], false, $(target).attr('id'));
            return content1 + content2 + content3 + content4;
        }
        case 'checkbox_type':
        {
            let edit = $(target).attr('id');
            const pos = edit.substr(13);
            const editid = edit.substr(0, 12)+'_id_'+pos;
            const editid2 = edit.substr(0, 12)+'_checkbox_label_'+pos;
            content1 = af2_sidebar_create_text_content($(target).attr('id')+'_id_', null, 'ID', 'Die ID',
                editid, data[0], true, true);
            content2 = af2_sidebar_create_textarea_content($(target).attr('id')+'_', null, 'Text - (bei Links kein "target" nutzen!)', 'Text der Checkbox...',
                editid2, data[1], true, 5, true);
            content3 = af2_sidebar_create_checkbox_content($(target).attr('id')+'_cb_', 'Pflichtfeld', data[2], false, $(target).attr('id'));
            return content1 + content2 + content3;
        }
        case 'textarea_type':
        {
            let edit = $(target).attr('id');
            const editid = edit;
            const content1 = af2_sidebar_create_textarea_content($(target).attr('id')+'_', null, $(target).data('title'), $(target).data('placeholder'),
                editid, data, true, 8, true);

            return content1;
        }
        case 'border_picker_choose':
        {
            const content1 = af2_sidebar_create_text_content($(target).attr('id')+'_form_answer_card_border_radius', null, "Antworten Border-Radius (ohne px angeben)", "border-radius...",
                '_form_answer_card_border_radius_', data[0], true, true);
            const content2 = af2_sidebar_create_text_content($(target).attr('id')+'_form_text_input_border_radius', null, "Textfragen Border-Radius (ohne px angeben)", "border-radius...",
                '_form_text_input_border_radius_', data[1], true, true);

            return content1 + content2;
        }
        case 'contact_form_picker_choose':
        {
            const content1 = af2_sidebar_create_text_content($(target).attr('id')+'_form_contact_form_label_size', null,                                "Label-Größe (ohne px angeben)",         "...", '_form_contact_form_label_size_',                data[0], true, true);
            const content2 = af2_sidebar_create_text_content($(target).attr('id')+'_form_contact_form_label_weight', null,                              "Label-Dicke",         "...", '_form_contact_form_label_weight_',              data[1], true, true);
            const content3 = af2_sidebar_create_text_content($(target).attr('id')+'_form_contact_form_input_size', null,                                "Textfeld-Größe (ohne px angeben)",         "...", '_form_contact_form_input_size_',                data[2], true, true);
            const content4 = af2_sidebar_create_text_content($(target).attr('id')+'_form_contact_form_input_weight', null,                              "Textfeld-Dicke",         "...", '_form_contact_form_input_weight_',              data[3], true, true);
            const content5 = af2_sidebar_create_text_content($(target).attr('id')+'_form_contact_form_button_size', null,                               "Button-Textgröße (ohne px angeben)",         "...", '_form_contact_form_button_size_',               data[4], true, true);
            const content6 = af2_sidebar_create_text_content($(target).attr('id')+'_form_contact_form_button_weight', null,                             "Button-Textdicke",         "...", '_form_contact_form_button_weight_',             data[5], true, true);
            const content7 = af2_sidebar_create_text_content($(target).attr('id')+'_form_contact_form_button_padding_top_bottom', null,                 "Button Padding oben und unten (ohne px angeben)",         "...", '_form_contact_form_button_padding_top_bottom_', data[6], true, true);
            const content8 = af2_sidebar_create_text_content($(target).attr('id')+'_form_contact_form_cb_size', null,                                   "Checkbox-Textgröße (ohne px angeben)",         "...", '_form_contact_form_cb_size_',                   data[7], true, true);
            const content9 = af2_sidebar_create_text_content($(target).attr('id')+'_form_contact_form_cb_weight', null,                                 "Checkbox-Textdicke",         "...", '_form_contact_form_cb_weight_',                 data[8], true, true);
           const content10 = af2_sidebar_create_text_content($(target).attr('id')+'_form_contact_form_input_height', null,                              "Textfeld-Höhe (ohne px angeben)",         "...", '_form_contact_form_input_height_',              data[9], true, true);
           const content11 = af2_sidebar_create_text_content($(target).attr('id')+'_form_contact_form_input_border_radius', null,                       "Textfeld Border-Radius (ohne px angeben)",         "...", '_form_contact_form_input_border_radius_',       data[10], true, true);
           const content12 = af2_sidebar_create_text_content($(target).attr('id')+'_form_contact_form_button_border_radius', null,                      "Button Border-Radius (ohne px angeben)",         "...", '_form_contact_form_button_border_radius_',      data[11], true, true);
           const content13 = af2_create_color_picker($(target).attr('id')+'_form_contact_form_button_background_color', '<i class="fas fa-tint"></i>', 'Button Farbe Wählen', data[12]);
            const content14 = af2_create_color_picker($(target).attr('id')+'_form_contact_form_button_color', '<i class="fas fa-tint"></i>', 'Button Textfarbe Wählen', data[13]);
            const content15 = af2_sidebar_create_text_content($(target).attr('id')+'_form_contact_form_input_padding_left_right', null,                      "Input Padding links und rechts(ohne px angeben)",         "...", '_form_contact_form_input_padding_left_right_',      data[14], true, true);
            
            return content13 + content1 + content2 + content3 + content4 + content5 + content6 + content7 + content8 + content9 + content10 + content11 + content12+ content14 + content15;
        }
        case 'text_picker_choose':
        {
            const content1 = af2_sidebar_create_text_content($(target).attr('id')+'_form_heading_size_desktop',         null,               "Überschrift-Desktop Größe (ohne px angeben)",          "...", '_form_heading_size_desktop_',                   data[0], true, true);
            const content2 = af2_sidebar_create_text_content($(target).attr('id')+'_form_heading_size_mobile',          null,               "Überschrift-Mobil Größe (ohne px angeben)",            "...", '_form_heading_size_mobile_',                    data[1], true, true);
            const content3 = af2_sidebar_create_text_content($(target).attr('id')+'_form_heading_weight',               null,               "Überschrift-Dicke",                                    "...", '_form_heading_weight_',                         data[2], true, true);
            const content4 = af2_sidebar_create_text_content($(target).attr('id')+'_form_heading_line_height_desktop',  null,               "Überschrift-Desktop Zeilenhöhe (ohne px angeben)",    "...", '_form_heading_line_height_desktop_',            data[3], true, true);
            const content5 = af2_sidebar_create_text_content($(target).attr('id')+'_form_heading_line_height_mobile',   null,               "Überschrift-Mobil Zeilenhöhe (ohne px angeben)",      "...", '_form_heading_line_height_mobile_',             data[4], true, true)
            const content6 = af2_sidebar_create_text_content($(target).attr('id')+'_form_question_heading_size_desktop',null,               "Fragentitel-Desktop Größe (ohne px angeben)",          "...", '_form_question_heading_size_desktop_',          data[5], true, true);
            const content7 = af2_sidebar_create_text_content($(target).attr('id')+'_form_question_heading_size_mobile', null,               "Fragentitel-Mobil Größe (ohne px angeben)",            "...", '_form_question_heading_size_mobile_',           data[6], true, true);
            const content8 = af2_sidebar_create_text_content($(target).attr('id')+'_form_question_heading_weight',      null,               "Fragentitel-Dicke",                                    "...", '_form_question_heading_weight_',                data[7], true, true);
            const content9 = af2_sidebar_create_text_content($(target).attr('id')+'_form_question_heading_line_height_desktop',null,        "Fragentitel-Desktop Zeilenhöhe (ohne px angeben)",    "...", '_form_question_heading_line_height_desktop_',   data[8], true, true);
           const content10 = af2_sidebar_create_text_content($(target).attr('id')+'_form_question_heading_line_height_mobile', null,        "Fragentitel-Mobil Zeilenhöhe (ohne px angeben)",      "...", '_form_question_heading_line_height_mobile_',    data[9], true, true);
        const content21 = af2_sidebar_create_text_content($(target).attr('id')+'_form_question_description_size_desktop',null,               "Fragenbeschreibung-Desktop Größe (ohne px angeben)",          "...", '_form_question_description_size_desktop_',          data[20], true, true);
        const content22 = af2_sidebar_create_text_content($(target).attr('id')+'_form_question_description_size_mobile', null,               "Fragenbeschreibung-Mobil Größe (ohne px angeben)",            "...", '_form_question_description_size_mobile_',           data[21], true, true);
        const content23 = af2_sidebar_create_text_content($(target).attr('id')+'_form_question_description_weight',      null,               "Fragenbeschreibung-Dicke",                                    "...", '_form_question_description_weight_',                data[22], true, true);
        const content24 = af2_sidebar_create_text_content($(target).attr('id')+'_form_question_description_line_height_desktop',null,        "Fragenbeschreibung-Desktop Zeilenhöhe (ohne px angeben)",    "...", '_form_question_description_line_height_desktop_',   data[23], true, true);
        const content25 = af2_sidebar_create_text_content($(target).attr('id')+'_form_question_description_line_height_mobile', null,        "Fragenbeschreibung-Mobil Zeilenhöhe (ohne px angeben)",      "...", '_form_question_description_line_height_mobile_',    data[24], true, true);
           const content11 = af2_sidebar_create_text_content($(target).attr('id')+'_form_answer_card_text_size_desktop',       null,        "Antworttext-Desktop Größe (ohne px angeben)",          "...", '_form_answer_card_text_size_desktop_',          data[10], true, true);
           const content12 = af2_sidebar_create_text_content($(target).attr('id')+'_form_answer_card_text_size_mobile',        null,        "Antworttext-Mobil Größe (ohne px angeben)",            "...", '_form_answer_card_text_size_mobile_',           data[11], true, true);
           const content13 = af2_sidebar_create_text_content($(target).attr('id')+'_form_answer_card_text_weight',             null,        "Antworttext-Dicke",                                    "...", '_form_answer_card_text_weight_',                data[12], true, true);
           const content14 = af2_sidebar_create_text_content($(target).attr('id')+'_form_answer_card_text_line_height_desktop',null,        "Antworttext-Desktop Zeilenhöhe (ohne px angeben)",    "...", '_form_answer_card_text_line_height_desktop_',   data[13], true, true);
           const content15 = af2_sidebar_create_text_content($(target).attr('id')+'_form_answer_card_text_line_height_mobile', null,        "Antworttext-Mobil Zeilenhöhe (ohne px angeben)",      "...", '_form_answer_card_text_line_height_mobile_',    data[14], true, true)
           const content16 = af2_sidebar_create_text_content($(target).attr('id')+'_form_text_input_size_desktop',      null,               "Textfeldschrift-Desktop Größe (ohne px angeben)",      "...", '_form_text_input_size_desktop_',                data[15], true, true);
           const content17 = af2_sidebar_create_text_content($(target).attr('id')+'_form_text_input_size_mobile',       null,               "Textfeldschrift-Mobil Größe (ohne px angeben)",        "...", '_form_text_input_size_mobile_',                 data[16], true, true);
           const content18 = af2_sidebar_create_text_content($(target).attr('id')+'_form_text_input_text_weight',       null,               "Textfeldschrift-Dicke",                                "...", '_form_text_input_text_weight_',                 data[17], true, true);
           const content19 = af2_sidebar_create_text_content($(target).attr('id')+'_form_text_input_line_height_desktop',null,              "Textfeldschrift-Desktop Zeilenhöhe (ohne px angeben)","...", '_form_text_input_line_height_desktop_',         data[18], true, true);
           const content20 = af2_sidebar_create_text_content($(target).attr('id')+'_form_text_input_line_height_mobile', null,              "Textfeldschrift-Mobil Zeilenhöhe (ohne px angeben)",  "...", '_form_text_input_line_height_mobile_',          data[19], true, true);



            return content1 + content2 + content3 + content4 + content5 +
                    content6 + content7 + content8 + content9 + content10 +
                    content11 + content12 + content13 + content14 + content15 +
                    content16 + content17 + content18 + content19 + content20 +
                    content21 + content22 + content23 + content24 + content25 ;
        }
        case 'color_picker':
        {
            const content1 = af2_create_color_picker($(target).attr('id')+'_main', '<i class="fas fa-tint"></i>', 'Hauptfarbe Wählen', data[0]);
            const content2 = af2_create_color_picker($(target).attr('id')+'_bg', '<i class="fas fa-tint"></i>', 'Hintergrundfarbe Wählen', data[1]);
            const content3 = af2_create_color_picker($(target).attr('id')+'_card', '<i class="fas fa-tint"></i>', 'Kartenfarbe Wählen', data[2]);
            const content4 = af2_create_color_picker($(target).attr('id')+'_text', '<i class="fas fa-tint"></i>', 'Textfarbe Wählen', data[3]);

            return content1 + content2 + content3 + content4;
        }
        case 'color_picker_global':
        {
            const content1 = af2_create_color_picker($(target).attr('id')+'_global_main_color', '<i class="fas fa-tint"></i>', 'Hauptfarbe Wählen', data[0]);
            const content2 = af2_create_color_picker($(target).attr('id')+'_global_main_background_color', '<i class="fas fa-tint"></i>', 'Haupthintergrundfarbe Wählen', data[1]);

            return content1 + content2;
        }
        case 'color_picker_choose':
        {
            const content1 = af2_create_color_picker($(target).attr('id')+'_form_heading_color', '<i class="fas fa-tint"></i>', 'Formular-Überschriftfarbe', data[0]);
            const content2 = af2_create_color_picker($(target).attr('id')+'_form_question_heading_color', '<i class="fas fa-tint"></i>', 'Fragen-Überschriffarbe', data[1]);
            const content16 = af2_create_color_picker($(target).attr('id')+'_form_question_description_color', '<i class="fas fa-tint"></i>', 'Fragen-Beschreibungsfarbe', data[15]);
            const content3 = af2_create_color_picker($(target).attr('id')+'_form_answer_card_text_color', '<i class="fas fa-tint"></i>', 'Antwort-Textfarbe', data[2]);
            const content4 = af2_create_color_picker($(target).attr('id')+'_form_answer_card_icon_color', '<i class="fas fa-tint"></i>', 'Antwort-Iconfarbe', data[3]);
            const content5 = af2_create_color_picker($(target).attr('id')+'_form_background_color', '<i class="fas fa-tint"></i>', 'Formular-Hintergrundfarbe', data[4]);
            const content6 = af2_create_color_picker($(target).attr('id')+'_form_answer_card_background_color', '<i class="fas fa-tint"></i>', 'Antwort-Hintergrundfarbe', data[5]);
            const content7 = af2_create_color_picker($(target).attr('id')+'_form_button_background_color', '<i class="fas fa-tint"></i>', 'Buttonfarbe', data[6]);
            const content8 = af2_create_color_picker($(target).attr('id')+'_form_button_disabled_background_color', '<i class="fas fa-tint"></i>', 'Button-Deaktiviertfarbe', data[7]);
            const content9 = af2_create_color_picker($(target).attr('id')+'_form_box_shadow_color', '<i class="fas fa-tint"></i>', 'Schattenfarbe', data[8]);
           const content10 = af2_create_color_picker($(target).attr('id')+'_form_border_color', '<i class="fas fa-tint"></i>', 'Rahmenfarbe', data[9]);
           const content11 = af2_create_color_picker($(target).attr('id')+'_form_progress_bar_color', '<i class="fas fa-tint"></i>', 'Fortschritt Farbe', data[10]);
           const content12 = af2_create_color_picker($(target).attr('id')+'_form_progress_bar_unfilled_background_color', '<i class="fas fa-tint"></i>', 'Fortschritt-Ungefüllt Farbe', data[11]);
           const content13 = af2_create_color_picker($(target).attr('id')+'_form_slider_frage_bullet_color', '<i class="fas fa-tint"></i>', 'Slider-Zahlenfarbe', data[12]);
           const content14 = af2_create_color_picker($(target).attr('id')+'_form_slider_frage_thumb_background_color', '<i class="fas fa-tint"></i>', 'Slider-Schiebereglerfarbe', data[13]);
           const content15 = af2_create_color_picker($(target).attr('id')+'_form_input_background_color', '<i class="fas fa-tint"></i>', 'Textfeld-Hintergrundfarbe', data[14]);
           const content17 = af2_create_color_picker($(target).attr('id')+'_form_loader_color', '<i class="fas fa-tint"></i>', 'Ladeanimation', data[16]);
           
            return content1 + content2 + content16 + content3 + content4 +
             content17 + content5 + content6 + content7 + content8 +
             content9 + content10 + content11 + content12 +
             content13  + content14 + content15;
        }
    }
};

const af2_create_color_picker = (id, icon, title, color) => {

    let src = '<input id="'+id+'" type="text" class="form-control color-picker content_change" data-color="'+color+'">';

    return af2_sidebar_create_content(id, false, icon, title, src, false);
};

/**
 * Creating a Textcontent
 *
 * @param id
 * @param icondata
 * @param titledata
 * @param placeholderdata
 * @param editid
 * @param value
 * @param focusdata
 * @returns {string}
 */
const af2_sidebar_create_text_content = (id , icondata, titledata, placeholderdata, editid, value, focusdata, must) => {
    const icondat = icondata === null ? 'fas fa-tag mr-1' : icondata;
    const icon = '<i class="'+icondat+'"></i>';
    const title = titledata+':';
    const placeholder = placeholderdata === null ? 'Text...' : placeholderdata;
    const focus = focusdata ? 'af2_focus' : '';
    const src = '<input id="'+id+'" type="text" class="choose_sb_content form-control content_change '+focus+'" value="'+value+'" placeholder="'+placeholder+'" data-editid="'+editid+'">';
    return af2_sidebar_create_content(id, false, icon, title, src, must);
};
const af2_sidebar_create_text_hidden_content = (id , icondata, titledata, placeholderdata, editid, value, focusdata, must) => {
    const icondat = icondata === null ? 'fas fa-tag mr-1' : icondata;
    const icon = '<i class="'+icondat+'"></i>';
    const title = titledata+':';
    const placeholder = placeholderdata === null ? 'Text...' : placeholderdata;
    const focus = focusdata ? 'af2_focus' : '';
    const src = '<input id="'+id+'" type="password" class="choose_sb_content form-control content_change '+focus+'" value="'+value+'" placeholder="'+placeholder+'" data-editid="'+editid+'">';
    return af2_sidebar_create_content(id, false, icon, title, src, must);
};

const af2_sidebar_create_textarea_content = (id, icondata, titledata, placeholderdata, editid, value, focusdata, rows, must) => {
    const icondat = icondata === null ? 'fas fa-tag mr-1' : icondata;
    const icon = '<i class="'+icondat+'"></i>';
    const title = titledata+':';
    const placeholder = placeholderdata === null ? 'Text...' : placeholderdata;
    const focus = focusdata ? 'af2_focus' : '';
    const src = '<textarea id="'+id+'" class="choose_sb_content form-control content_change '+focus+'" placeholder="'+placeholder+'" data-editid="'+editid+'" rows ="'+rows+'">'+value+'</textarea>';
    return af2_sidebar_create_content(id, false, icon, title, src, must);
};

/*
 * create content for 
 */
const af2_sidebar_create_date_format_content = (id, icondata, titledata, editid, value, must) => {
    const icondat = icondata === null ? 'fas fa-calendar mr-1' : icondata;
    const icon = '<i class="'+icondat+'"></i>';
    const title = titledata+':';
    
    let options = {'dd.mm.yy':'dd.mm.yy','mm.dd.yy':'mm.dd.yy','yy.mm.dd':'yy.mm.dd','dd-mm-yy':'dd-mm-yy','mm-dd-yy':'mm-dd-yy','yy-mm-dd':'yy-mm-dd','dd/mm/yy':'dd/mm/yy','mm/dd/yy':'mm/dd/yy','yy/mm/dd':'yy/mm/dd'};
    let src = '<select id="'+id+'" class="choose_sb_content form-control content_change" value="'+value+'" data-editid="'+editid+'">';
    $.each(options,function(i,t){
        if(value == i){
            src +='<option value='+i+' selected>'+t+'</option>';
        }else{
            src +='<option value='+i+'>'+t+'</option>';
        }
        
    })
    src +='</select>';
    return af2_sidebar_create_content(id, false, icon, title, src, must);
};
/**
 * Creating an Image Chooser Content
 *
 * @param id
 * @param icondata
 * @param titledata
 * @param editid
 * @param value
 * @returns {string}
 */
const af2_sidebar_create_image_choose_content = (id, icondata, titledata, editid, value, must) => {
    const icondat = icondata === null ? 'fas fa-image mr-1' : icondata;
    const icon = '<i class="'+icondat+'"></i>';
    const title = titledata+':';
    let src = '';
    src += '<button class="choose_sb_content btn btn-primary m-2 af2_choose_img full" data-editid="'+editid+'">Bild auswählen</button>';
    src += '<div class="btn-group choose_icon">';

    src += '<button data-selected="graduation-cap" type="button" class="choose_sb_content icp demo btn btn-primary dropdown-toggle iconpicker-component full" data-toggle="dropdown">';
    src += 'Icon auswählen: <i id="af2_icon_picer_show" class="fa fa-fw"></i>\n';
    src += '<span class="caret"></span>';
    src += '</button>';
    src += '<div class="dropdown-menu"></div>';
    src += '</div>';
    src += '<input id="af2_icon_picker" class="icp demo content_change" value="fa-anchor" type="hidden" data-editid="'+editid+'">';
    src += '<div style="line-height: 23px;" class="af2_hint">Empfohlene Bildgröße:<br />150 x 150px</div>';

    return af2_sidebar_create_content(id, false, icon, title, src, must);
};

const af2_sidebar_create_checkbox_content = (id, titledata, value, must, editid) => {
    let checked = '';
    if(value === true)
    {
        checked = 'checked';
    }
    const icon = '';
    const title = '';
    let src = '';
    src += '<div class="form-check form-check-inline">';
    src += '<label class="form-check-label af2_sb_p"> <input class="form-check-input content_change_cb" type="checkbox" id="'+id+'" '+checked+' data-editid="'+editid+'"> '+titledata+'</label>';
    src += '</div>';
    return af2_sidebar_create_content(id, false, icon, title, src, must);
};


/** ************************************************************************ **/
/**                            EDITABLE CONTENT                              **/
/** ************************************************************************ **/

/**
 *
 * Event for multiple or non multiple click
 *
 * @param target
 */
const evaluate_multiple_click_on_editable_content = (target) => {
    let multiple = false;
    $('.af2_editable_content.selected').each((i, el) => {
        if($(el).attr('id') === $(target).attr('id') || $(el) === $(target))
        {
            multiple = true;
        }
    }).promise().done(() => {
        af2_throw_event('select', [{"arg":"multiple", "content":multiple}], target);
    });
};

/**
 * Clearing Editable Content
 */
const af2_clear_editable_content = () => {
    $('.af2_editable_content.selected').each((i, el) => {
        $(el).removeClass('selected');
    })
};

/**
 * Selecting Editable Content
 *
 * @param target
 */
const af2_select_editable_content = (target) => {
    $(target).addClass('selected');
};

/**
 * unselect an editable content
 */
const af2_unselect_editable_content = (target) => {
    $(target).removeClass('selected');
};

/**
 * clearing the content
  */
const af2_clear_content = () => {
    $('.af2_content').html('');
};

/**
 * Starting the Customize Sidebar
 *
 * @param target
 */
 const af2_start_customize_sidebar = (target) => {
    af2_open_sidebar('af2_customize_sidebar');
    $.when(af2_sidebar_append_content('af2_customize_sidebar', af2_generate_customize_content(target, af2_get_data))).done(() => {
        try
        {
            $('.demo').iconpicker();
        }
        catch(e)
        {

        }
        try
        {
            $(af2_colorPicker).each((i, el) => {
                $(af2_colorPicker[i]).off('change');
            }).promise().done(() => {
                af2_colorPicker = [];
                $('.colorpicker').each((i, el) => {
                    $(el).remove();
                }).promise().done(() => {
                    $('.color-picker').each((i, el) => {
                        let setcolor = $(el).data('color');
                        let id = $(el).attr('id');
                        let safe = new ColorPicker.Default("#"+id, {
                            color: setcolor,
                            placement: 'left'
                        });

                        af2_colorPicker.push(safe);

                        af2_colorPicker[af2_colorPicker.length-1].on('change', (ev) => {
                            af2_color_change_validate(ev.rgba, id);
                            $($('#'+id)[0]).css('background-color', ev.rgba);
                        });
                    });
                });
            });
        }
        catch(e)
        {

        }
    });
};