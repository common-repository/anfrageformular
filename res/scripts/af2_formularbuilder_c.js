let err = false;
let ac_list = undefined;
let idlist = {};

let klicktipp_field_array = [];
let klicktipp_tag_array = [];
$ = jQuery;
jQuery(document).ready(($) => {

    $(document).on('load_content', (ev) => {
        af2_jsonobj = {};
        af2_jsonobj['sections'] = [];
        af2_jsonobj['title'] = '[anfrageformular2 id="'+af2_id+'"]';
        af2_title = af2_jsonobj['title'];
        af2_jsonobj['name'] = '';
        af2_jsonobj.styling = {};
        af2_jsonobj.styling.fe_title = '';

        /** COLORS **/
        af2_jsonobj.styling.global_main_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.global_main_background_color = 'rgba(255, 255, 255, 1)';

        af2_jsonobj.styling.form_heading_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_question_heading_color = 'rgba(51, 51, 51, 1)';
        af2_jsonobj.styling.form_question_description_color = 'rgba(51, 51, 51, 1)';
        af2_jsonobj.styling.form_answer_card_text_color = 'rgba(51, 51, 51, 1)';
        af2_jsonobj.styling.form_answer_card_icon_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_background_color = 'rgba(255, 255, 255, 1)';
        af2_jsonobj.styling.form_answer_card_background_color = 'rgba(255, 255, 255, 1)';
        af2_jsonobj.styling.form_button_background_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_button_disabled_background_color = 'rgba(215, 215, 215, 1)';
        af2_jsonobj.styling.form_box_shadow_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_border_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_progress_bar_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_progress_bar_unfilled_background_color = 'rgba(255, 255, 255, 1)';
        af2_jsonobj.styling.form_slider_frage_bullet_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_slider_frage_thumb_background_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_input_background_color = 'rgba(253, 253, 253, 1)';
        af2_jsonobj.styling.form_loader_color = 'rgba(0, 0, 0, 1)';

        /** TEXT THINGS **/
        //form heading
        af2_jsonobj.styling.form_heading_size_desktop				    = '40';
        af2_jsonobj.styling.form_heading_size_mobile					= '28';
        af2_jsonobj.styling.form_heading_weight						    = '600';
        af2_jsonobj.styling.form_heading_line_height_desktop			= '50';
        af2_jsonobj.styling.form_heading_line_height_mobile			    = '38';

        //question heading
        af2_jsonobj.styling.form_question_heading_size_desktop		    = '32';
        af2_jsonobj.styling.form_question_heading_size_mobile		    = '24';
        af2_jsonobj.styling.form_question_heading_line_height_desktop   = '42';
        af2_jsonobj.styling.form_question_heading_line_height_mobile	= '34';
        af2_jsonobj.styling.form_question_heading_weight				= '600';

        //question description
        af2_jsonobj.styling.form_question_description_size_desktop		    = '20';
        af2_jsonobj.styling.form_question_description_size_mobile		    = '18';
        af2_jsonobj.styling.form_question_description_line_height_desktop   = '30';
        af2_jsonobj.styling.form_question_description_line_height_mobile	= '20';
        af2_jsonobj.styling.form_question_description_weight				= '600';

        //answers
        af2_jsonobj.styling.form_answer_card_text_size_desktop		    = '18';
        af2_jsonobj.styling.form_answer_card_text_size_mobile		    = '16';
        af2_jsonobj.styling.form_answer_card_text_weight				= '500';
        af2_jsonobj.styling.form_answer_card_text_line_height_desktop   = '24';
        af2_jsonobj.styling.form_answer_card_text_line_height_mobile	= '20';

        //input text sizes
        af2_jsonobj.styling.form_text_input_size_desktop				= '25';
        af2_jsonobj.styling.form_text_input_size_mobile				    = '20';
        af2_jsonobj.styling.form_text_input_text_weight				    = '500';
        af2_jsonobj.styling.form_text_input_line_height_desktop		    = '35';
        af2_jsonobj.styling.form_text_input_line_height_mobile		    = '30';

        /** BORDER RADIUS **/
        af2_jsonobj.styling.form_answer_card_border_radius			    = '15';
        af2_jsonobj.styling.form_text_input_border_radius			    = '7';

        // CONTACT FORM
        af2_jsonobj.styling.form_contact_form_label_size                     = '18';
        af2_jsonobj.styling.form_contact_form_label_weight                   = '500';
        af2_jsonobj.styling.form_contact_form_input_size                     = '15';
        af2_jsonobj.styling.form_contact_form_input_weight                   = '400';
        af2_jsonobj.styling.form_contact_form_button_size                    = '18';
        af2_jsonobj.styling.form_contact_form_button_weight                  = '500';
        af2_jsonobj.styling.form_contact_form_button_padding_top_bottom      = '14';
        af2_jsonobj.styling.form_contact_form_cb_size                        = '13';
        af2_jsonobj.styling.form_contact_form_cb_weight                      = '300';
        af2_jsonobj.styling.form_contact_form_input_height                   = '47';
        af2_jsonobj.styling.form_contact_form_input_border_radius            = '7';
        af2_jsonobj.styling.form_contact_form_button_border_radius           = '7';
        af2_jsonobj.styling.form_contact_form_button_background_color        = 'rgba(0, 173, 239, 1)';

        af2_jsonobj.styling.form_contact_form_button_color              = 'rgba(51, 51, 51, 1)';
        af2_jsonobj.styling.form_contact_form_input_padding_left_right              = '7';

        af2_forb_load_content(ev.content);
    });

    $(document).on('load_empty', (ev) => {
        af2_jsonobj = {};
        af2_jsonobj['sections'] = [];
        af2_jsonobj['title'] = '[anfrageformular2 id="'+af2_id+'"]';
        af2_title = af2_jsonobj['title'];
        af2_jsonobj['name'] = 'Backend Formular Titel';
        af2_jsonobj.styling = {};
        af2_jsonobj.styling.fe_title = '';

        /** COLORS **/
        af2_jsonobj.styling.global_main_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.global_main_background_color = 'rgba(255, 255, 255, 1)';

        af2_jsonobj.styling.form_heading_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_question_heading_color = 'rgba(51, 51, 51, 1)';
        af2_jsonobj.styling.form_question_description_color = 'rgba(51, 51, 51, 1)';
        af2_jsonobj.styling.form_answer_card_text_color = 'rgba(51, 51, 51, 1)';
        af2_jsonobj.styling.form_answer_card_icon_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_background_color = 'rgba(255, 255, 255, 1)';
        af2_jsonobj.styling.form_answer_card_background_color = 'rgba(255, 255, 255, 1)';
        af2_jsonobj.styling.form_button_background_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_button_disabled_background_color = 'rgba(215, 215, 215, 1)';
        af2_jsonobj.styling.form_box_shadow_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_border_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_progress_bar_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_progress_bar_unfilled_background_color = 'rgba(255, 255, 255, 1)';
        af2_jsonobj.styling.form_slider_frage_bullet_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_slider_frage_thumb_background_color = 'rgba(0, 173, 239, 1)';
        af2_jsonobj.styling.form_input_background_color = 'rgba(253, 253, 253, 1)';
        af2_jsonobj.styling.form_loader_color = 'rgba(0, 0, 0, 1)';
        
        /** TEXT THINGS **/
        //form heading
        af2_jsonobj.styling.form_heading_size_desktop				    = '40';
        af2_jsonobj.styling.form_heading_size_mobile					= '28';
        af2_jsonobj.styling.form_heading_weight						    = '600';
        af2_jsonobj.styling.form_heading_line_height_desktop			= '50';
        af2_jsonobj.styling.form_heading_line_height_mobile			    = '38';

        //question heading
        af2_jsonobj.styling.form_question_heading_size_desktop		    = '32';
        af2_jsonobj.styling.form_question_heading_size_mobile		    = '24';
        af2_jsonobj.styling.form_question_heading_line_height_desktop   = '42';
        af2_jsonobj.styling.form_question_heading_line_height_mobile	= '34';
        af2_jsonobj.styling.form_question_heading_weight				= '600';

        //question description
        af2_jsonobj.styling.form_question_description_size_desktop		   = '20';
        af2_jsonobj.styling.form_question_description_size_mobile		   = '18';
        af2_jsonobj.styling.form_question_description_line_height_desktop  = '30';
        af2_jsonobj.styling.form_question_description_line_height_mobile	= '20';
        af2_jsonobj.styling.form_question_description_weight				= '600';

        //answers
        af2_jsonobj.styling.form_answer_card_text_size_desktop		    = '18';
        af2_jsonobj.styling.form_answer_card_text_size_mobile		    = '16';
        af2_jsonobj.styling.form_answer_card_text_weight				= '500';
        af2_jsonobj.styling.form_answer_card_text_line_height_desktop   = '24';
        af2_jsonobj.styling.form_answer_card_text_line_height_mobile	= '20';

        //input text sizes
        af2_jsonobj.styling.form_text_input_size_desktop				= '25';
        af2_jsonobj.styling.form_text_input_size_mobile				    = '20';
        af2_jsonobj.styling.form_text_input_text_weight				    = '500';
        af2_jsonobj.styling.form_text_input_line_height_desktop		    = '35';
        af2_jsonobj.styling.form_text_input_line_height_mobile		    = '30';

        /** BORDER RADIUS **/
        af2_jsonobj.styling.form_answer_card_border_radius			    = '15';
        af2_jsonobj.styling.form_text_input_border_radius			    = '7';

        // CONTACT FORM
        af2_jsonobj.styling.form_contact_form_label_size                     = '18';
        af2_jsonobj.styling.form_contact_form_label_weight                   = '500';
        af2_jsonobj.styling.form_contact_form_input_size                     = '15';
        af2_jsonobj.styling.form_contact_form_input_weight                   = '400';
        af2_jsonobj.styling.form_contact_form_button_size                    = '18';
        af2_jsonobj.styling.form_contact_form_button_weight                  = '500';
        af2_jsonobj.styling.form_contact_form_button_padding_top_bottom      = '14';
        af2_jsonobj.styling.form_contact_form_cb_size                        = '13';
        af2_jsonobj.styling.form_contact_form_cb_weight                      = '300';
        af2_jsonobj.styling.form_contact_form_input_height                   = '47';
        af2_jsonobj.styling.form_contact_form_input_border_radius            = '7';
        af2_jsonobj.styling.form_contact_form_button_border_radius           = '7';
        af2_jsonobj.styling.form_contact_form_button_background_color        = 'rgba(0, 173, 239, 1)';
        

        af2_jsonobj.styling.form_contact_form_button_color              = 'rgba(51, 51, 51, 1)';
        af2_jsonobj.styling.form_contact_form_input_padding_left_right              = '7';
    });

    $(document).on('input', '.af2_redirect_content', (ev) => {
        const par = $($(ev.currentTarget).parent()).parent();
        const section = $(par).data('section');
        const cont = $(par).attr('id').substr(25);
        const content = $(ev.currentTarget).val();
        af2_redirect_content_change(section, cont, content);
    });
    $(document).on('click', '.af2_redirect_content', (ev) => {
        $(ev.currentTarget).focus();
    });


    /** WORK AT **/

    $(document).on('click', '.af2_dnp_bezeichnung', (ev) => {
        $(ev.currentTarget).focus();
    });

    $(document).on('click', '.af2_content', (ev) => {

        if($('.af2_redirect_content:hover')[0] === undefined)
        {
            let focused = $(':focus')[0];
            if($(focused).hasClass('af2_redirect_content'))
            {
                $(focused).blur();
            }
        }
        if($('.af2_dnp_bezeichnung:hover')[0] === undefined)
        {
            let focused = $(':focus')[0];
            if($(focused).hasClass('af2_dnp_bezeichnung'))
            {
                $(focused).blur();
            }
        }
    });

    $('#af2_switch_view_button').on('click', (ev) => {
        af2_fb_switch_view();
    });

    /** Selecting an Editable Content **/
    $(document).on('select', '.af2_editable_content', (ev) => {
        if (!ev.multiple) {
            if(af2_view === 1)
            {
                af2_set_input_focus($('#af2_customize_sidebar')[0]);
                af2_sidebar_clear_content('af2_customize_sidebar');
                af2_start_customize_sidebar(ev.currentTarget);
                af2_clear_editable_content();
                af2_select_editable_content(ev.currentTarget);
            }
        }
    });

    $(document).on('click', '.af2_redirect_checkbox', (ev) => {

        let parent = $($(ev.currentTarget).parent()).parent();

        let section = $(parent).data('section');
        let content = $(parent).attr('id').substr(25);

        let vari = $(ev.currentTarget).prop('checked');

        af2_jsonobj.sections[section].contents[content].newtab = vari;
    });

    $(document).on('input_content_change', '.af2_changeable', (ev) => {
        const id = $(ev.currentTarget).attr('id');
        af2_fb_validate_input_change_object(id, ev.content);
    });

    $(document).on('delete', '.af2_form_section_content', (ev) => {
        af2_delete_content($(ev.currentTarget).data('section'), $(ev.currentTarget).attr('id').substr(25));
    });

    $(document).on('click', '.af2_add_connection_button', (ev) => {
        const par = $(ev.currentTarget).parent();
        $.when(af2_save_new_connection($(par).data('section'), $(par).attr('id').substr('25'))).done(() => {
            af2_update_sections();
        });
    });

    $(document).on('input', '.af2_slide_operator', (ev) => {
        const par = $(ev.currentTarget).parent();
        const uParent = $($($(ev.currentTarget).parent()).parent()).parent();
        af2_save_operator($(uParent).data('section'), $(uParent).attr('id').substr('25'), $(par).attr('id').substr('28'), $(ev.currentTarget).val());
    });
    $(document).on('input', '.af2_slide_number', (ev) => {
        const par = $(ev.currentTarget).parent();
        const uParent = $($($(ev.currentTarget).parent()).parent()).parent();
        af2_save_sl_number($(uParent).data('section'), $(uParent).attr('id').substr('25'), $(par).attr('id').substr('28'), $(ev.currentTarget).val());
    });

    $(document).on('click', '.af2_add_slider_connection_button', (ev) => {
        const par = $($(ev.currentTarget).parent()).parent();
        $.when(af2_save_new_connection_($(par).data('section'), $(par).attr('id').substr('25'))).done(() => {
            af2_update_sections();
        });
    });

    $(document).on('click', '.af2_remove_connection_button', (ev) => {
        const par = $($(ev.currentTarget).parent()).parent();
        const i = $($(ev.currentTarget).parent()).attr('id').substr('28');
        $.when(af2_save_delete_connection($(par).data('section'), $(par).attr('id').substr('25'), i)).done(() => {
            af2_update_sections();
        });
    });

    $(document).on('click', '.af2_remove_slider_connection_button', (ev) => {
        const par = $($($(ev.currentTarget).parent()).parent()).parent();
        const i = $($(ev.currentTarget).parent()).attr('id').substr('28');
        $.when(af2_save_delete_connection_($(par).data('section'), $(par).attr('id').substr('25'), i)).done(() => {
            af2_update_sections();
        });
    });

    $('.af2_whole').on('dropped_into_container', (ev) => {
        switch(ev.typ)
        {
            case 'from_sb_into_section':
            {
                af2_insert_from_sb_into_section(ev.section, ev.container, ev.dataid);
                break;
            }
            case 'from_sb_into_marg':
            {
                af2_insert_from_sb_into_marg(ev.section, ev.container, ev.dataid);
                break;
            }
            case 'from_content_into_section':
            {
                af2_insert_from_content_into_section(ev.section, ev.container, ev.sectionfrom, ev.containerfrom);
                break;
            }
            case 'from_content_into_marg':
            {
                af2_insert_from_content_into_marg(ev.section, ev.container, ev.sectionfrom, ev.containerfrom);
                break;
            }
            default:
            {
                break;
            }
        }
    });

    $('.af2_whole').on('dropped_connection', (ev) => {

        if(ev.typ === 'insert')
        {
            af2_insert_connection(ev.section, ev.container, ev.sectionfrom, ev.containerfrom, ev.connector);
        }
        else if(ev.typ === 'delete')
        {
            af2_delete_connection(ev.sectionfrom, ev.containerfrom, ev.connector);
        }
    });

    $('.af2_whole').on('save', () => {
        af2_jsonobj['title'] = '[anfrageformular2 id="'+af2_id+'"]';
        af2_title = af2_jsonobj['title'];
        af2_forb_save();
    });

    $('.af2_whole').on('back', () => {
        af2_forb_close();
    });
});

const af2_color_change_validate = (color, id) => {
    let m = undefined;
    let b = undefined;
    let c = undefined;

    if(id.includes('_global_main_color'))
    {
        b = af2_jsonobj.styling.global_main_color;
        m = af2_save_global_main_color;
        c = af2_update_styling;
    }
    if(id.includes('_global_main_background_color'))
    {
        b = af2_jsonobj.styling.global_main_background_color;
        m = af2_save_global_main_background_color;
        c = af2_update_styling;
    }

    if(id.includes('_form_heading_color'))
    {
        b = af2_jsonobj.styling.form_heading_color;
        m = af2_save_form_heading_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_question_heading_color'))
    {
        b = af2_jsonobj.styling.form_question_heading_color;
        m = af2_save_form_question_heading_color;
        c = af2_update_styling;
    }
    
    if(id.includes('_form_question_description_color'))
    {
        b = af2_jsonobj.styling.form_question_description_color;
        m = af2_save_form_question_description_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_answer_card_text_color'))
    {
        b = af2_jsonobj.styling.form_answer_card_text_color;
        m = af2_save_form_answer_card_text_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_answer_card_icon_color'))
    {
        b = af2_jsonobj.styling.form_answer_card_icon_color;
        m = af2_save_form_answer_card_icon_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_background_color'))
    {
        b = af2_jsonobj.styling.form_background_color;
        m = af2_save_form_background_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_answer_card_background_color'))
    {
        b = af2_jsonobj.styling.form_answer_card_background_color;
        m = af2_save_form_answer_card_background_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_button_background_color'))
    {
        b = af2_jsonobj.styling.form_button_background_color;
        m = af2_save_form_button_background_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_button_disabled_background_color'))
    {
        b = af2_jsonobj.styling.form_button_disabled_background_color;
        m = af2_save_form_button_disabled_background_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_box_shadow_color'))
    {
        b = af2_jsonobj.styling.form_box_shadow_color;
        m = af2_save_form_box_shadow_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_border_color'))
    {
        b = af2_jsonobj.styling.form_border_color;
        m = af2_save_form_border_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_progress_bar_color'))
    {
        b = af2_jsonobj.styling.form_progress_bar_color;
        m = af2_save_form_progress_bar_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_progress_bar_unfilled_background_color'))
    {
        b = af2_jsonobj.styling.form_progress_bar_unfilled_background_color;
        m = af2_save_form_progress_bar_unfilled_background_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_slider_frage_bullet_color'))
    {
        b = af2_jsonobj.styling.form_slider_frage_bullet_color;
        m = af2_save_form_slider_frage_bullet_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_slider_frage_thumb_background_color'))
    {
        b = af2_jsonobj.styling.form_slider_frage_thumb_background_color;
        m = af2_save_form_slider_frage_thumb_background_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_input_background_color'))
    {
        b = af2_jsonobj.styling.form_input_background_color;
        m = af2_save_form_input_background_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_contact_form_button_background_color'))
    {
        b = af2_jsonobj.styling.form_contact_form_button_background_color;
        m = af2_save_form_contact_form_button_background_color;
        c = af2_update_styling;
    }
    if(id.includes('_form_contact_form_button_color'))
    {
        b = af2_jsonobj.styling.form_contact_form_button_color;
        m = af2_save_form_contact_form_button_color;
        c = af2_update_styling;
    }
    
    if(id.includes('_form_loader_color'))
    {
        b = af2_jsonobj.styling.form_loader_color;
        m = af2_save_form_loader_color;
        c = af2_update_styling;
    }
    
    /**
    if(id.includes('_main'))
    {
        b = af2_jsonobj.styling.main_color;
        m = af2_save_main_color;
    }
    else if(id.includes('_bg'))
    {
        b = af2_jsonobj.styling.background_color;
        m = af2_save_bg_color;
    }
    else if(id.includes('_card'))
    {
        b = af2_jsonobj.styling.card_color;
        m = af2_save_card_color;
    }
    else if(id.includes('_text'))
    {
        b = af2_jsonobj.styling.text_color;
        m = af2_save_text_color;
    }**/

    const before = {"arg": "content_before", "content": b};
    const method = {"arg": "method", "content": m};
    const callback = {"arg": "callback", "content": c};
    $.when(m(color)).done(() => {
        const after = {"arg": "content_after", "content": b};
        af2_throw_event('af2_update', [callback, before, after, method], $('.af2_whole'));
    });
};

const af2_fb_validate_input_change_object = (id, content) => {
    if(id === 'af2_fb_title')
    {
        const before = {"arg": "content_before", "content": af2_jsonobj['name']};
        const method = {"arg": "method", "content": af2_save_fb_title};
        const callback = {"arg": "callback", "content": af2_update_fb_title};
        const obj = {"arg": "obj", "content": 'af2_fb_title'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_fb_title(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj['name']};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    if(id.includes('_form_answer_card_border_radius'))
    {
        const before = {"arg": "content_before", "content": af2_jsonobj.styling.form_answer_card_border_radius};
        const method = {"arg": "method", "content": af2_save_form_answer_card_border_radius};
        const callback = {"arg": "callback", "content": af2_update_styling};
        const obj = {"arg": "obj", "content": 'af2_fb_title'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_form_answer_card_border_radius(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj.styling.form_answer_card_border_radius};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    if(id.includes('_form_text_input_border_radius'))
    {
        const before = {"arg": "content_before", "content": af2_jsonobj.styling.form_text_input_border_radius};
        const method = {"arg": "method", "content": af2_save_form_text_input_border_radius};
        const callback = {"arg": "callback", "content": af2_update_styling};
        const obj = {"arg": "obj", "content": 'af2_fb_title'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_form_text_input_border_radius(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj.styling.form_text_input_border_radius};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else if(id === 'af2_fe_title')
    {
        const before = {"arg": "content_before", "content": af2_jsonobj.styling.fe_title};
        const method = {"arg": "method", "content": af2_save_fe_title};
        const callback = {"arg": "callback", "content": af2_update_fe_title};
        const obj = {"arg": "obj", "content": 'af2_fe_title'};   // OBJ TO CALL THE DO ON
        $.when(af2_save_fe_title(content)).done(() => {
            const after = {"arg": "content_after", "content": af2_jsonobj.styling.fe_title};
            af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
        });
    }
    else
    {
        let c = undefined;
        let b = undefined;
        let d = undefined;


        if(id.includes('_form_heading_size_desktop'))                   {d = af2_update_styling;   b = af2_save_form_heading_size_desktop;                 c = af2_jsonobj.styling.form_heading_size_desktop;}
        if(id.includes('_form_heading_size_mobile'))                    {d = af2_update_styling;   b = af2_save_form_heading_size_mobile;                  c = af2_jsonobj.styling.form_heading_size_mobile;}
        if(id.includes('_form_heading_weight'))                         {d = af2_update_styling;   b = af2_save_form_heading_weight;                       c = af2_jsonobj.styling.form_heading_weight;}
        if(id.includes('_form_heading_line_height_desktop'))            {d = af2_update_styling;   b = af2_save_form_heading_line_height_desktop;          c = af2_jsonobj.styling.form_heading_line_height_desktop;}
        if(id.includes('_form_heading_line_height_mobile'))             {d = af2_update_styling;   b = af2_save_form_heading_line_height_mobile;           c = af2_jsonobj.styling.form_heading_line_height_mobile;}
        if(id.includes('_form_question_heading_size_desktop'))          {d = af2_update_styling;   b = af2_save_form_question_heading_size_desktop;        c = af2_jsonobj.styling.form_question_heading_size_desktop;}
        if(id.includes('_form_question_heading_size_mobile'))           {d = af2_update_styling;   b = af2_save_form_question_heading_size_mobile;         c = af2_jsonobj.styling.form_question_heading_size_mobile;}
        if(id.includes('_form_question_heading_weight'))                {d = af2_update_styling;   b = af2_save_form_question_heading_weight;              c = af2_jsonobj.styling.form_question_heading_weight;}
        if(id.includes('_form_question_heading_line_height_desktop'))   {d = af2_update_styling;   b = af2_save_form_question_heading_line_height_desktop; c = af2_jsonobj.styling.form_question_heading_line_height_desktop;}
        if(id.includes('_form_question_heading_line_height_mobile'))    {d = af2_update_styling;   b = af2_save_form_question_heading_line_height_mobile;  c = af2_jsonobj.styling.form_question_heading_line_height_mobile;}
        if(id.includes('_form_question_description_size_desktop'))          {d = af2_update_styling;   b = af2_save_form_question_description_size_desktop;        c = af2_jsonobj.styling.form_question_description_size_desktop;}
        if(id.includes('_form_question_description_size_mobile'))           {d = af2_update_styling;   b = af2_save_form_question_description_size_mobile;         c = af2_jsonobj.styling.form_question_description_size_mobile;}
        if(id.includes('_form_question_description_weight'))                {d = af2_update_styling;   b = af2_save_form_question_description_weight;              c = af2_jsonobj.styling.form_question_description_weight;}
        if(id.includes('_form_question_description_line_height_desktop'))   {d = af2_update_styling;   b = af2_save_form_question_description_line_height_desktop; c = af2_jsonobj.styling.form_question_description_line_height_desktop;}
        if(id.includes('_form_question_description_line_height_mobile'))    {d = af2_update_styling;   b = af2_save_form_question_description_line_height_mobile;  c = af2_jsonobj.styling.form_question_description_line_height_mobile;}
        if(id.includes('_form_answer_card_text_size_desktop'))          {d = af2_update_styling;   b = af2_save_form_answer_card_text_size_desktop;        c = af2_jsonobj.styling.form_answer_card_text_size_desktop;}
        if(id.includes('_form_answer_card_text_size_mobile'))           {d = af2_update_styling;   b = af2_save_form_answer_card_text_size_mobile;         c = af2_jsonobj.styling.form_answer_card_text_size_mobile;}
        if(id.includes('_form_answer_card_text_weight'))                {d = af2_update_styling;   b = af2_save_form_answer_card_text_weight;              c = af2_jsonobj.styling.form_answer_card_text_weight;}
        if(id.includes('_form_answer_card_text_line_height_desktop'))   {d = af2_update_styling;   b = af2_save_form_answer_card_text_line_height_desktop; c = af2_jsonobj.styling.form_answer_card_text_line_height_desktop;}
        if(id.includes('_form_answer_card_text_line_height_mobile'))    {d = af2_update_styling;   b = af2_save_form_answer_card_text_line_height_mobile;  c = af2_jsonobj.styling.form_answer_card_text_line_height_mobile;}
        if(id.includes('_form_text_input_size_desktop'))                {d = af2_update_styling;   b = af2_save_form_text_input_size_desktop;              c = af2_jsonobj.styling.form_text_input_size_desktop;}
        if(id.includes('_form_text_input_size_mobile'))                 {d = af2_update_styling;   b = af2_save_form_text_input_size_mobile;               c = af2_jsonobj.styling.form_text_input_size_mobile;}
        if(id.includes('_form_text_input_text_weight'))                 {d = af2_update_styling;   b = af2_save_form_text_input_text_weight;               c = af2_jsonobj.styling.form_text_input_text_weight;}
        if(id.includes('_form_text_input_line_height_desktop'))         {d = af2_update_styling;   b = af2_save_form_text_input_line_height_desktop;       c = af2_jsonobj.styling.form_text_input_line_height_desktop;}
        if(id.includes('_form_text_input_line_height_mobile'))          {d = af2_update_styling;   b = af2_save_form_text_input_line_height_mobile;        c = af2_jsonobj.styling.form_text_input_line_height_mobile;}
        if(id.includes('_form_contact_form_label_size'))               {d = af2_update_styling;   b = af2_save_form_contact_form_label_size;                   c = af2_jsonobj.styling.form_contact_form_label_size;}
        if(id.includes('_form_contact_form_label_weight'))             {d = af2_update_styling;   b = af2_save_form_contact_form_label_weight;                 c = af2_jsonobj.styling.form_contact_form_label_weight;}
        if(id.includes('_form_contact_form_input_size'))               {d = af2_update_styling;   b = af2_save_form_contact_form_input_size;                   c = af2_jsonobj.styling.form_contact_form_input_size;}
        if(id.includes('_form_contact_form_input_weight'))             {d = af2_update_styling;   b = af2_save_form_contact_form_input_weight;                 c = af2_jsonobj.styling.form_contact_form_input_weight;}
        if(id.includes('_form_contact_form_button_size'))              {d = af2_update_styling;   b = af2_save_form_contact_form_button_size;                  c = af2_jsonobj.styling.form_contact_form_button_size;}
        if(id.includes('_form_contact_form_button_weight'))            {d = af2_update_styling;   b = af2_save_form_contact_form_button_weight;                c = af2_jsonobj.styling.form_contact_form_button_weight;}
        if(id.includes('_form_contact_form_button_padding_top_bottom')){d = af2_update_styling;   b = af2_save_form_contact_form_button_padding_top_bottom;    c = af2_jsonobj.styling.form_contact_form_button_padding_top_bottom;}
        if(id.includes('_form_contact_form_cb_size'))                  {d = af2_update_styling;   b = af2_save_form_contact_form_cb_size;                      c = af2_jsonobj.styling.form_contact_form_cb_size;}
        if(id.includes('_form_contact_form_cb_weight'))                {d = af2_update_styling;   b = af2_save_form_contact_form_cb_weight;                    c = af2_jsonobj.styling.form_contact_form_cb_weight;}
        if(id.includes('_form_contact_form_input_height'))             {d = af2_update_styling;   b = af2_save_form_contact_form_input_height;                 c = af2_jsonobj.styling.form_contact_form_input_height;}
        if(id.includes('_form_contact_form_input_border_radius'))      {d = af2_update_styling;   b = af2_save_form_contact_form_input_border_radius;          c = af2_jsonobj.styling.form_contact_form_input_border_radius;}
        if(id.includes('_form_contact_form_button_border_radius'))     {d = af2_update_styling;   b = af2_save_form_contact_form_button_border_radius;         c = af2_jsonobj.styling.form_contact_form_button_border_radius;}
        if(id.includes('_form_contact_form_input_padding_left_right'))     {d = af2_update_styling;   b = af2_save_form_contact_form_input_padding_left_right;         c = af2_jsonobj.styling.form_contact_form_input_padding_left_right;}


        if(b !== undefined)
        {
            const before = {"arg": "content_before", "content": c};
            const method = {"arg": "method", "content": b};
            const callback = {"arg": "callback", "content": d};
            const obj = {"arg": "obj", "content": 'af2_fe_title'};   // OBJ TO CALL THE DO ON
            $.when(b(content)).done(() => {
                const after = {"arg": "content_after", "content": c};
                af2_throw_event('af2_update', [callback, before, after, method, obj], $('.af2_whole'));
            });
        }

    }
};


const af2_fb_switch_view = () =>
{
    zoom = 1;
    $('.af2_content').animate({ 'zoom': zoom});
    af2_close_sidebar('af2_customize_sidebar');
    if($('#af2_form_section_content_marg_0')[0] === undefined)
    {

        af2_save();
        af2_open_sidebar('af2_content_sidebar');
        af2_view = 0;
        af2_focus = 0;
        $('#af2_focus_button').addClass('hide');

        $('.af2_content ').html('');
        $('.af2_content').addClass('dragscroll');
        $('.af2_content').addClass('full');

        $.when(af2_update_sections()).done(() => {
            af2_update_connections();
        });
        //af2_deactivateHooks();
    }
    else
    {
        af2_close_sidebar('af2_content_sidebar');
        af2_view = 1;
        af2_focus = 0;
        $('#af2_focus_button').html('<i class="far fa-edit mr-1"></i>Auswählen');
        $('#af2_focus_button').removeClass('hide');
        $('.af2_content ').html('');
        $('.af2_content').removeClass('dragscroll');
        $('.af2_content').removeClass('full');

        af2_load_frontend_emulation();


        /**$.when(af2_load_fb_settings()).done(() => {
        });
        af2_activateHooks();**/
    }
};

const af2_forb_save = () => {
    $.when(af2_forb_check()).done(() => {
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

const af2_forb_check = () => {
    let error = false;

    $('.af2_error').each((b, x) => {
        $(x).removeClass('af2_error');
    }).promise().done(() => {

        if(af2_jsonobj.name === undefined || af2_jsonobj.name.trim() === '')
        {
            let selector = '#af2_fb_title';
            if(af2_view === 0)
            {
                selector = '#af2_switch_view_button';
            }
            $(selector).addClass('af2_error');
            error = true;
            af2_throw_toast('error', 'Keinen "Backend" Namen für die Formularstruktur angegeben!');
        }

        //Es wird mindestens 1 Element benötigt
        if(af2_jsonobj.sections === undefined || af2_jsonobj.sections.length === 0)
        {
            error = true;

            af2_throw_toast('error', 'Es wird mindestens ein Element benötigt!');

            err = error;
            return error;
        }
        else
        {
            let ex = false;
            //Es muss geschaut werden, dass es nicht nur redirects: gibt.
            $(af2_jsonobj.sections).each((i, el) => {
                $(el.contents).each((j, ele) => {
                    if(!(af2_jsonobj.sections[i].contents[j].data.includes('redirect:')))
                    {
                        ex = true;
                    }
                    if(!(af2_jsonobj.sections[i].contents[j].data.includes('dealsnprojects:')))
                    {
                        ex = true;
                    }
                    if(!(af2_jsonobj.sections[i].contents[j].data.includes('activecampaign:')))
                    {
                        ex = true;
                    }
                    if(!(af2_jsonobj.sections[i].contents[j].data.includes('klicktipp:')))
                    {
                        ex = true;
                    }
                });
            }).promise().done(() => {
                if(ex === false)
                {
                    error = true;
                    af2_throw_toast('error', 'Es können nicht nur spezielle Elemente existieren!');
                }

                // ALLE LETZTEN SIND KONTAKTFORMULARE! -> alle bestizen mindestens 1 Connections (außer formulare)
                $(af2_jsonobj.sections).each((i, el) => {
                    $(el.contents).each((j, ele) => {

                        //Slider options
                        const did = $('#af2_form_section_'+i+' #af2_form_section_content_'+j).data('contentid');
                        if(did !== undefined && !did.toString().includes(':'))
                        {const ht = $('#'+did).html();
                        if(ht !== '' && ht !== undefined)
                        {
                            if( JSON.parse(ht).typ === 'af2_slider')
                            {
                                $(af2_jsonobj.sections[i].contents[j].connections).each((e, elm) => {
                                    if(elm.operator !== undefined)
                                    {
                                        if(elm.operator.trim() === '' || elm.number.trim() === '')
                                        {
                                            error = true;
                                            $('#af2_form_section_'+i+' #af2_form_section_content_'+j).addClass('af2_error');
                                            af2_throw_toast('error', 'Alle Sliderverbindungen müssen gefüllt sein!');
                                        }
                                        else
                                        {
                                            if(elm.operator !== '<' &&
                                               elm.operator !== '<=' &&
                                               elm.operator !== '>' &&
                                               elm.operator !== '>=' &&
                                               elm.operator !== '=' &&
                                               elm.operator !== '!=' )
                                            {
                                                error = true;
                                            $('#af2_form_section_'+i+' #af2_form_section_content_'+j).addClass('af2_error');
                                            af2_throw_toast('error', 'Alle Slider Verbindungsoperatoren müssen richtig gefüllt sein!');
                                            }
                                        }
                                    
                                    }
                                    if(elm.to_section === '' || elm.to_content === '')
                                    {
    
                                        error = true;
                                        $('#af2_form_section_'+i+' #af2_form_section_content_'+j).addClass('af2_error');
                                        af2_throw_toast('error', 'Alle Sliderverbindungen müssen verbunden werden!');
                                    }
                                });
                            }
                        }}
                        

                        //Es muss sichergestellt werden, dass redirects immer in der letzten Spalte sind
                        if(ele.data.includes('redirect:') || ele.data.includes('dealsnprojects:') ||
                            ele.data.includes('activecampaign:') || ele.data.includes('klicktipp:'))
                        {
                            //ZU JEDEN OBJEKT WIRKLICH NUR EINE CONNECTION (KONTAKTFORMULAR)!
                            let connects = af2_jsonobj.sections[i].contents[j].incoming_connections;

                            let st = [];
                            $(connects).each((x, e) => {
                                let s = e.from_section;
                                let c = e.from_content;

                                $(st).each((y, eel) => {

                                    if(eel[0] === s && eel[1] === c)
                                    {
                                        error = true;
                                        $('#af2_form_section_' + i + ' #af2_form_section_content_' + j).addClass('af2_error');
                                        af2_throw_toast('error', 'Ein Spezielles Element darf nicht mehrfach vom gleichen Formular angepeilt werden!');
                                    }

                                }).promise().done(() => {
                                    st.push([s, c]);
                                });


                            });

                            if(i !== af2_jsonobj.sections.length-1)
                            {
                                error = true;
                                $('#af2_form_section_' + i + ' #af2_form_section_content_' + j).addClass('af2_error');
                                af2_throw_toast('error', 'Jedes spezielle Element darf nur in der Letzten Spalte gelistet sein!');
                            }
                        }

                        //Es muss sichergestellt werden, dass docs an redirects NUR von Kontaktformularen sind!
                        $(ele.incoming_connections).each((b, elem) => {
                            if(ele.data.includes('dealsnprojects:') || ele.data.includes('activecampaign:') ||ele.data.includes('klicktipp:'))
                            {
                                if ($('#af2_content_' + af2_jsonobj.sections[elem.from_section].contents[elem.from_content].data
                                    + ' .af2_content_information')[0] !== undefined)
                                {
                                    error = true;
                                    $('#af2_form_section_' + i + ' #af2_form_section_content_' + j).addClass('af2_error');
                                    af2_throw_toast('error', 'Ein Schnittstellen-Element darf nur Verbindungen von einem Kontakformular aus haben!');
                                }
                            }
                        }).promise().done(() => {
                            if(!(ele.data.includes('redirect:') || ele.data.includes('dealsnprojects:') || ele.data.includes('activecampaign:') ||ele.data.includes('klicktipp:')))
                            {
                                if($('#af2_content_'+ele.data+' .af2_content_information')[0] !== undefined)
                                {
                                    if(ele.connections === undefined || ele.connections.length === 0)
                                    {
                                        error = true;
                                        $('#af2_form_section_'+i+' #af2_form_section_content_'+j).addClass('af2_error');
                                        af2_throw_toast('error', 'Jedes Fragenelement muss eine weiterführende Verbindung haben!');
                                    }
                                }
                            }

                        });

                    });
                }).promise().done(() => {
                    // Alle Formulare müssen in einer Section sein!!!! -> Formulare -> sections -> ALLE GLEICH!
                    let xy = undefined;
                    $(af2_jsonobj.sections).each((i, el) => {
                        $(el.contents).each((j, ele) => {
                            if(ele.data.includes('redirect:') || ele.data.includes('dealsnprojects:') || ele.data.includes('activecampaign:') || ele.data.includes('klicktipp'))
                            {

                            }
                            else if($('#af2_content_'+ele.data+' .af2_content_information')[0] === undefined)
                            {
                                //Kontaktformulare dürfen nur 1x zu einem redirect eine connection pflegen!
                                const cs = af2_jsonobj.sections[i].contents[j].connections;
                                let red = false;
                                let dnp = false;
                                let ac = false;
                                let klicktipp = false;
                                $(cs).each((g, elementt) => {
                                    const sectiont = elementt.to_section;
                                    const contentt = elementt.to_content;

                                    if(sectiont !== '' && contentt !== '')
                                    {
                                        if(af2_jsonobj.sections[sectiont].contents[contentt].data.includes('redirect:'))
                                        {
                                            if(red === true)
                                            {
                                                error = true;
                                                $('#af2_form_section_'+i+' #af2_form_section_content_'+j).addClass('af2_error');
                                                af2_throw_toast('error', 'Ein Kontaktformular darf nur 1x auf Redirects verweisen!');
                                            }
                                            else if(red === false)
                                            {
                                                red = true;
                                            }
                                        }
                                    }
                                    if(sectiont !== '' && contentt !== '')
                                    {
                                        if(af2_jsonobj.sections[sectiont].contents[contentt].data.includes('dealsnprojects:'))
                                        {
                                            if(dnp === true)
                                            {
                                                error = true;
                                                $('#af2_form_section_'+i+' #af2_form_section_content_'+j).addClass('af2_error');
                                                af2_throw_toast('error', 'Ein Kontaktformular darf nur 1x auf eine Schnittstelle verweisen!');
                                            }
                                            else if(dnp === false)
                                            {
                                                dnp = true;
                                            }
                                        }
                                        if(af2_jsonobj.sections[sectiont].contents[contentt].data.includes('activecampaign:'))
                                        {
                                            if(ac === true)
                                            {
                                                error = true;
                                                $('#af2_form_section_'+i+' #af2_form_section_content_'+j).addClass('af2_error');
                                                af2_throw_toast('error', 'Ein Kontaktformular darf nur 1x auf eine Schnittstelle verweisen!');
                                            }
                                            else if(ac === false)
                                            {
                                                ac = true;
                                            }
                                        }
                                        if(af2_jsonobj.sections[sectiont].contents[contentt].data.includes('klicktipp:'))
                                        {
                                            if(klicktipp === true)
                                            {
                                                error = true;
                                                $('#af2_form_section_'+i+' #af2_form_section_content_'+j).addClass('af2_error');
                                                af2_throw_toast('error', 'Ein Kontaktformular darf nur 1x auf eine Schnittstelle verweisen!');
                                            }
                                            else if(klicktipp === false)
                                            {
                                                klicktipp = true;
                                            }
                                        }
                                    }
                                });

                                //Kontaktformulare dürfen nur Verbindungen zu speziellen Elementen besitzen!
                                let conns = af2_jsonobj.sections[i].contents[j].connections;
                                $(conns).each((a, ellement) => {

                                    let se = ellement.to_section;
                                    let co = ellement.to_content;

                                    //ALLE KONTAKTFORMULARVERBINDUNGEN MÜSSEN HIER SEIN -> KEINE LEER!
                                    if(se === '' || co === '')
                                    {
                                        error = true;
                                        $('#af2_form_section_'+i+' #af2_form_section_content_'+j).addClass('af2_error');
                                        af2_throw_toast('error', 'Ein Kontaktformular darf keine leeren Verbindungen haben!');
                                    }
                                    else if(!(af2_jsonobj.sections[se].contents[co].data.includes('redirect:') ||
                                                af2_jsonobj.sections[se].contents[co].data.includes('dealsnprojects:')||
                                        af2_jsonobj.sections[se].contents[co].data.includes('activecampaign:') ||
                                        af2_jsonobj.sections[se].contents[co].data.includes('klicktipp:')
                                    ))
                                    {
                                        error = true;
                                        $('#af2_form_section_'+i+' #af2_form_section_content_'+j).addClass('af2_error');
                                        af2_throw_toast('error', 'Ein Kontaktformular darf nur Verbindungen zu speziellen Elementen haben!');
                                    }

                                }).promise().done(() => {

                                    if(xy === undefined)
                                    {
                                        xy = i;
                                    }
                                    else
                                    {
                                        if(xy !== i)
                                        {
                                            error = true;
                                            $('#af2_form_section_'+i+' #af2_form_section_content_'+j).addClass('af2_error');
                                            af2_throw_toast('error', 'Alle Kontaktformulare müssen sich in einer Spalte befinden!');
                                        }
                                    }
                                });
                            }
                        });
                    }).promise().done(() => {
                        // Wenn nicht -1 connection -> alle anderen MÜSSEN mit gegeben sein
                        $(af2_jsonobj.sections).each((i, el) => {
                            $(el.contents).each((j, ele) => {
                                if(ele.data.includes('redirect:') ||ele.data.includes('dealsnprojects:')|| ele.data.includes('activecampaign:') ||ele.data.includes('klicktipp:'))
                                {

                                }
                                else if($('#af2_content_'+ele.data+' .af2_content_information')[0] !== undefined)
                                {
                                    let from = false;
                                    $(ele.connections).each((k, elem) => {
                                        if(elem.from === '-1' || elem.from === -1)
                                        {
                                            from = true;
                                        }
                                    }).promise().done(() => {
                                        if(ele.connections !== undefined)
                                        {
                                            if(ele.data.includes('redirect:') || ele.data.includes('dealsnprojects:') ||ele.data.includes('activecampaign:')||ele.data.includes('klicktipp:'))
                                            {

                                            }
                                            else if(from === false && ele.connections.length <
                                                JSON.parse($('#af2_content_'+ele.data+' .af2_content_information').html()).answers.length)
                                            {
                                                error = true;
                                                $('#af2_form_section_'+i+' #af2_form_section_content_'+j).addClass('af2_error');
                                                af2_throw_toast('error', 'Wenn keine Allgemeine Verbindung hergestellt wurde, werden ALLE anderen benötigt!')
                                            }
                                        }

                                    });
                                }
                            });
                        }).promise().done(() => {

                            // Jedes Objekt (außer 0. Section) MUSS incoming connections haben
                            $(af2_jsonobj.sections).each((i, el) => {
                                if(i > 0)
                                {
                                    $(el.contents).each((j, ele) => {
                                        if(ele.incoming_connections === undefined || ele.incoming_connections.length === 0)
                                        {
                                            error = true;
                                            $('#af2_form_section_'+i+' #af2_form_section_content_'+j).addClass('af2_error');
                                            af2_throw_toast('error', 'Jedes benutzte Element muss eingebunden sein!');
                                        }
                                    });
                                }
                            }).promise().done(() => {

                                // 1. Section darf nur 1 Objekt besitzen!
                                if(af2_jsonobj.sections[0].contents.length > 1)
                                {
                                    error = true;
                                    af2_throw_toast('error', 'In der ersten Spalte darf sich nur ein Element befinden!');
                                }


                                //DNP GOT ONLY ONE CONNECTION!
                                    const s = af2_jsonobj.sections[af2_jsonobj.sections.length-1];

                                    $(s.contents).each((g, al) => {
                                        if(al.data.includes('dealsnprojects:')||al.data.includes('activecampaign:') || al.data.includes('klicktipp:'))
                                        {
                                            if(al.incoming_connections.length > 1)
                                            {
                                                error = true;
                                                $('#af2_form_section_'+(af2_jsonobj.sections.length-1)+' #af2_form_section_content_'+g).addClass('af2_error');
                                                af2_throw_toast('error', 'Eine Schnittstellen Anbindung kann nur von einem Element aus angepeilt werden!');
                                            }
                                            if(al.dnp_data !== undefined)
                                            {
                                                if(al.dnp_data.organisation.trim() === '' && al.dnp_data.name.trim() === '')
                                                {
                                                    error = true;
                                                    $('#af2_form_section_'+(af2_jsonobj.sections.length-1)+' #af2_form_section_content_'+g).addClass('af2_error');
                                                    af2_throw_toast('error', 'Eine Deals & Projects Anbindung muss mindestens den Namen, oder die Organisation beinhalten!');
                                                }
                                                if(al.dnp_data.bezeichnung.trim() === '')
                                                {
                                                    error = true;
                                                    $('#af2_form_section_'+(af2_jsonobj.sections.length-1)+' #af2_form_section_content_'+g).addClass('af2_error');
                                                    af2_throw_toast('error', 'Eine Deals & Projects Anbindung muss eine Bezeichung beinhalten');
                                                }
                                            }
                                            if(al.ac_data !== undefined)
                                            {
                                                if(al.ac_data.mail.trim() === '' || al.ac_data.liste.trim() === '')
                                                {
                                                    error = true;
                                                    $('#af2_form_section_'+(af2_jsonobj.sections.length-1)+' #af2_form_section_content_'+g).addClass('af2_error');
                                                    af2_throw_toast('error', 'Eine ActiveCampaign Anbindung muss mindestens eine E-Mail und eine Liste beinhalten!');
                                                }
                                            }
                                            if(al.klicktipp_data !== undefined)
                                            {
                                                if(al.klicktipp_data.mail.trim() === '')
                                                {
                                                    error = true;
                                                    $('#af2_form_section_'+(af2_jsonobj.sections.length-1)+' #af2_form_section_content_'+g).addClass('af2_error');
                                                    af2_throw_toast('error', 'Eine Klicktipp Anbindung muss mindestens eine E-Mail beinhalten!');
                                                }
                                            }

                                        }
                                    }).promise().done(() => {
                                        err = error;
                                        return error;
                                    });
                            });
                        });
                    });
                });

            });
        }


    });
};

const af2_forb_load_content = (content) => {
    l(content);
};

const l = (content) => {
    if(content !== undefined)
    {
        af2_jsonobj = content;

        if(content.styling !== undefined && content.styling.form_question_description_color === undefined) {
            
            af2_jsonobj.styling.form_question_description_color				    = 'rgba(0,0,0,1)';
            
            //question description
            af2_jsonobj.styling.form_question_description_size_desktop		= '20';
            af2_jsonobj.styling.form_question_description_size_mobile		= '18';
            af2_jsonobj.styling.form_question_description_weight				= '600';
            af2_jsonobj.styling.form_question_description_line_height_desktop= '30';
            af2_jsonobj.styling.form_question_description_line_height_mobile	= '20';
        }
        if(content.styling !== undefined && content.styling.form_answer_card_background_color === undefined)
        {
            /** SETTING NEW */
            /** COLORS **/

            af2_jsonobj.styling.global_main_color = content.styling.main_color;
            af2_jsonobj.styling.global_main_background_color = content.styling.background_color;

            af2_jsonobj.styling.form_heading_color						    = content.styling.main_color;
            af2_jsonobj.styling.form_question_heading_color				    = content.styling.text_color;
            af2_jsonobj.styling.form_answer_card_text_color				    = content.styling.text_color;
            af2_jsonobj.styling.form_answer_card_icon_color				    = content.styling.main_color;
            af2_jsonobj.styling.form_background_color					    = content.styling.background_color;
            af2_jsonobj.styling.form_answer_card_background_color		    = content.styling.card_color;
            af2_jsonobj.styling.form_button_background_color				= content.styling.main_color;
            af2_jsonobj.styling.form_button_disabled_background_color	    = 'rgba(215, 215, 215, 1)';
            af2_jsonobj.styling.form_box_shadow_color					    = content.styling.main_color;
            af2_jsonobj.styling.form_border_color						    = content.styling.main_color;
            af2_jsonobj.styling.form_progress_bar_color					    = content.styling.main_color;
            af2_jsonobj.styling.form_progress_bar_unfilled_background_color = 'rgba(255, 255, 255, 1)';
            af2_jsonobj.styling.form_slider_frage_bullet_color			    = content.styling.main_color;
            af2_jsonobj.styling.form_slider_frage_thumb_background_color    = content.styling.main_color;
            af2_jsonobj.styling.form_input_background_color 				= 'rgba(253, 253, 253, 1)';
            af2_jsonobj.styling.form_loader_color  = content.styling.main_color;
            
            /** TEXT THINGS **/
                //form heading
            af2_jsonobj.styling.form_heading_size_desktop				= '40';
            af2_jsonobj.styling.form_heading_size_mobile					= '28';
            af2_jsonobj.styling.form_heading_weight						= '600';
            af2_jsonobj.styling.form_heading_line_height_desktop			= '50';
            af2_jsonobj.styling.form_heading_line_height_mobile			= '38';

            //question heading
            af2_jsonobj.styling.form_question_heading_size_desktop		= '32';
            af2_jsonobj.styling.form_question_heading_size_mobile		= '24';
            af2_jsonobj.styling.form_question_heading_weight				= '600';
            af2_jsonobj.styling.form_question_heading_line_height_desktop= '42';
            af2_jsonobj.styling.form_question_heading_line_height_mobile	= '34';


            //answers
            af2_jsonobj.styling.form_answer_card_text_size_desktop		= '18';
            af2_jsonobj.styling.form_answer_card_text_size_mobile		= '16';
            af2_jsonobj.styling.form_answer_card_text_weight				= '500';
            af2_jsonobj.styling.form_answer_card_text_line_height_desktop= '24';
            af2_jsonobj.styling.form_answer_card_text_line_height_mobile	= '20';

            //input text sizes
            af2_jsonobj.styling.form_text_input_size_desktop				= '25';
            af2_jsonobj.styling.form_text_input_size_mobile				= '20';
            af2_jsonobj.styling.form_text_input_text_weight				= '500';
            af2_jsonobj.styling.form_text_input_line_height_desktop		= '35';
            af2_jsonobj.styling.form_text_input_line_height_mobile		= '30';

            /** BORDER RADIUS **/
            af2_jsonobj.styling.form_answer_card_border_radius			= '15';
            af2_jsonobj.styling.form_text_input_border_radius			= '7';
        }

        if(content.styling !== undefined && content.styling.form_contact_form_label_size === undefined)
        {
            // CONTACT FORM
            af2_jsonobj.styling.form_contact_form_label_size                     = '18';
            af2_jsonobj.styling.form_contact_form_label_weight                   = '500';
            af2_jsonobj.styling.form_contact_form_input_size                     = '15';
            af2_jsonobj.styling.form_contact_form_input_weight                   = '400';
            af2_jsonobj.styling.form_contact_form_button_size                    = '18';
            af2_jsonobj.styling.form_contact_form_button_weight                  = '500';
            af2_jsonobj.styling.form_contact_form_button_padding_top_bottom      = '14';
            af2_jsonobj.styling.form_contact_form_cb_size                        = '13';
            af2_jsonobj.styling.form_contact_form_cb_weight                      = '300';
            af2_jsonobj.styling.form_contact_form_input_height                   = '47';
            af2_jsonobj.styling.form_contact_form_input_border_radius            = '7';
            af2_jsonobj.styling.form_contact_form_button_border_radius           = '7';
            af2_jsonobj.styling.form_contact_form_button_background_color        = af2_jsonobj.styling.global_main_color;

            af2_jsonobj.styling.form_contact_form_button_color              = 'rgba(51, 51, 51, 1)';
            af2_jsonobj.styling.form_contact_form_input_padding_left_right              = '7';
        }
    }
    $.when(af2_update_sections()).done(() => {
        af2_update_connections();
    });
};

/**
 *
 */
 const af2_forb_close = () => {
    af2_throw_toast('message', 'Möchten Sie wirklich beenden? Nicht gespeicherte Daten gehen verloren!'+
        '<button id="close_now" class="btn btn-primary ml-1 mt-2 p-1">Beenden</button>');
};

/**
 * Insert NEW from sidebar into existing section
 *
 * @param section
 * @param container
 * @param datai
 */
const af2_insert_from_sb_into_section = (section, container, datai) => {
    let dataid = datai;
    const cbef = {"section":section, "container":container, "delete":true};
    const before = {"arg":"content_before", "content":cbef};
    const method = {"arg":"method", "content":af2_save_sections};
    const callback = {"arg":"callback", "content":af2_update_sections};
    const special = {"arg":"special", "content":true};
    const content = {"section":section, "container":container, "delete":false, "insert":true, "insert_section":false, "content":{"data":dataid, "hide":false, "connections":[], "incoming_connections":[]}};
    $.when(af2_save_sections(content)).done(() => {
        const cafter = content;
        const after = {"arg":"content_after", "content":cafter};
        af2_throw_event('af2_update', [special, callback, before, method, after], $('.af2_whole'));
    });
};

/**
 * Insert NEW from Sidebar into new section
 * @param section
 * @param container
 * @param datai
 */
const af2_insert_from_sb_into_marg = (section, container, datai) => {
    let dataid = datai;
    const cbef = {"section":section, "container":container, "delete":true};
    const before = {"arg":"content_before", "content":cbef};
    const method = {"arg":"method", "content":af2_save_sections};
    const callback = {"arg":"callback", "content":af2_update_sections};
    const special = {"arg":"special", "content":true};
    const content = {"section":section, "container":container, "delete":false, "insert":true, "insert_section":true, "content":{"data":dataid, "hide":false, "connections":[], "incoming_connections":[]}};
    $.when(af2_save_sections(content)).done(() => {
        const cafter = content;
        const after = {"arg":"content_after", "content":cafter};
        af2_throw_event('af2_update', [special, callback, before, method, after], $('.af2_whole'));
    });
};

/**
 * Moving from content into existing section
 *
 * @param section
 * @param container
 * @param sectionfrom
 * @param containerfrom
 */
const af2_insert_from_content_into_section = (section, container, sectionfrom, containerfrom) => {
    if(sectionfrom === section && container === containerfrom)
    {
        af2_update_sections();
    }
    else
    {
        let bs = section;
        let bis = false;
        if(af2_jsonobj.sections[sectionfrom].contents.length <= 1)
        {
            bis = true;
            if(section > sectionfrom)
            {
                bs = section-1;
            }
        }
        const cbef = {"section":sectionfrom, "container":containerfrom, "delete":false, "insert":false, "insert_section":bis, "move":true, "sectionfrom":bs, "containerfrom":container};
        const before = {"arg":"content_before", "content":cbef};
        const method = {"arg":"method", "content":af2_save_sections};
        const callback = {"arg":"callback", "content":af2_update_sections};
        const special = {"arg":"special", "content":true};
        const content = {"section":section, "container":container, "delete":false, "insert":false, "insert_section":false, "move":true, "sectionfrom":sectionfrom, "containerfrom":containerfrom};
        $.when(af2_save_sections(content)).done(() => {
            const cafter = content;
            const after = {"arg":"content_after", "content":cafter};
            af2_throw_event('af2_update', [special, callback, before, method, after], $('.af2_whole'));
        });
    }
};

/**
 * Moving from content into new section
 *
 * @param section
 * @param container
 * @param sectionfrom
 * @param containerfrom
 */
const af2_insert_from_content_into_marg = (section, container, sectionfrom, containerfrom) => {
    if(af2_jsonobj.sections[sectionfrom].contents.length === 1)
    {
        if(sectionfrom === section && container === containerfrom) {
            af2_update_sections();
        }
        else if(sectionfrom === section-1 && container === containerfrom)
        {
            af2_update_sections();
        }
        else
        {
            let bs = section;
            let bsf = sectionfrom;
            let bis = false;
            if (af2_jsonobj.sections[sectionfrom].contents.length <= 1) {
                bis = true;
                if (section - 1 === sectionfrom) {
                    return;
                }
                if (section > sectionfrom) {
                    bs = section - 1;
                } else if (section < sectionfrom) {
                    bsf = sectionfrom + 1;
                }
            }
            const cbef = {
                "section": bsf,
                "container": containerfrom,
                "delete": false,
                "insert": false,
                "insert_section": bis,
                "move": true,
                "sectionfrom": bs,
                "containerfrom": container
            };
            const before = {"arg": "content_before", "content": cbef};
            const method = {"arg": "method", "content": af2_save_sections};
            const callback = {"arg": "callback", "content": af2_update_sections};
            const special = {"arg": "special", "content": true};
            const content = {
                "section": section,
                "container": container,
                "delete": false,
                "insert": false,
                "insert_section": true,
                "move": true,
                "sectionfrom": sectionfrom,
                "containerfrom": containerfrom
            };
            $.when(af2_save_sections(content)).done(() => {
                const cafter = content;
                const after = {"arg": "content_after", "content": cafter};
                af2_throw_event('af2_update', [special, callback, before, method, after], $('.af2_whole'));
            });
        }
    }
    else
    {
        let bs = section;
        let bsf = sectionfrom;
        let bis = false;
        if (af2_jsonobj.sections[sectionfrom].contents.length <= 1) {
            bis = true;
            if (section - 1 === sectionfrom) {
                return;
            }
            if (section > sectionfrom) {
                bs = section - 1;
            } else if (section < sectionfrom) {
                bsf = sectionfrom + 1;
            }
        }
        const cbef = {
            "section": bsf,
            "container": containerfrom,
            "delete": false,
            "insert": false,
            "insert_section": bis,
            "move": true,
            "sectionfrom": bs,
            "containerfrom": container
        };
        const before = {"arg": "content_before", "content": cbef};
        const method = {"arg": "method", "content": af2_save_sections};
        const callback = {"arg": "callback", "content": af2_update_sections};
        const special = {"arg": "special", "content": true};
        const content = {
            "section": section,
            "container": container,
            "delete": false,
            "insert": false,
            "insert_section": true,
            "move": true,
            "sectionfrom": sectionfrom,
            "containerfrom": containerfrom
        };
        $.when(af2_save_sections(content)).done(() => {
            const cafter = content;
            const after = {"arg": "content_after", "content": cafter};
            af2_throw_event('af2_update', [special, callback, before, method, after], $('.af2_whole'));
        });
    }
};


const af2_insert_connection = (section, container, sectionfrom, containerfrom, connector) => {
    /**
    const cbef = {"delete":true, "sectionfrom":sectionfrom, "containerfrom":containerfrom, "connector":connector};
    const before = {"arg":"content_before", "content":cbef};
    const method = {"arg":"method", "content":af2_save_connections};
    const callback = {"arg":"callback", "content":af2_update_connections};
    const special = {"arg":"special", "content":true};*/
    const content = {"insert":true, "connector":connector, "container":container, "section":section, "sectionfrom":sectionfrom, "containerfrom":containerfrom};
    $.when(af2_save_connections(content)).done(() => {
        af2_update_connections();
        //const cafter = content;
        //const after = {"arg":"content_after", "content":cafter};
        //af2_throw_event('af2_update', [special, callback, before, method, after], $('.af2_whole'));
    });
};

const af2_delete_connection = (sectionfrom, containerfrom, connector) => {
/**
    const conns = af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections;
    let container = undefined;
    let section = undefined;


    $(conns).each((i, el) => {
        if(el.from.toString() === connector.toString())
        {
            container = af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections[i].to_content;
            section = af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections[i].to_section;
        }
    });

    const cbef = {"insert":true, "connector":connector, "container":container, "section":section, "sectionfrom":sectionfrom, "containerfrom":containerfrom};
    const before = {"arg":"content_before", "content":cbef};
    const method = {"arg":"method", "content":af2_save_connections};
    const callback = {"arg":"callback", "content":af2_update_connections};
    const special = {"arg":"special", "content":true};*/
    const content = {"delete":true, "sectionfrom":sectionfrom, "containerfrom":containerfrom, "connector":connector};
    $.when(af2_save_connections(content)).done(() => {
        af2_update_connections();
        //const cafter = content;
        //const after = {"arg":"content_after", "content":cafter};
        //af2_throw_event('af2_update', [special, callback, before, method, after], $('.af2_whole'));
    });
};


/**
 * DELETING CONTENT
 *
 * @param section
 * @param container
 */
const af2_delete_content = (section, container) => {
    let insert_sec = false;
    //section getting deleted
    if(af2_jsonobj.sections[section].contents.length === 1)
    {
        insert_sec = true;
    }
    const cbef = {"section":section, "container":container, "delete":false, "insert":true, "insert_section":insert_sec, "content":{"data":af2_jsonobj.sections[section].contents[container].data, "hide":false, "connections":[], "incoming_connections":[]}};
    const before = {"arg":"content_before", "content":cbef};
    const method = {"arg":"method", "content":af2_save_sections};
    const callback = {"arg":"callback", "content":af2_update_sections};
    const special = {"arg":"special", "content":true};
    const content = {"section":section, "container":container, "delete":true};
    $.when(af2_save_sections(content)).done(() => {
        const cafter = content;
        const after = {"arg":"content_after", "content":cafter};
        af2_throw_event('af2_update', [special, callback, before, method, after], $('.af2_whole'));
    });
};

const af2_redirect_content_change = (section, container, content) => {
    let selector = af2_jsonobj.sections[section].contents[container];
    const before = {"arg": "content_before", "content": {"section":section, "container":container, "content":selector.data.substr(9)}};
    const method = {"arg": "method", "content": af2_save_redirect};
    const callback = {"arg": "callback", "content": af2_dummy};
    const c = {"section":section, "container":container, "content":content};
    $.when(af2_save_redirect(c)).done(() => {
        const after = {"arg": "content_after", "content": {"section":section, "container":container, "content":selector.data.substr(9)}};
        af2_throw_event('af2_update', [callback, before, after, method], $('.af2_whole'));
    });
};

const af2_dummy = () => {

};