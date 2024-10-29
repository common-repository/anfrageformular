let af2_view = 0;
let af2_focus = 0;
$ = jQuery;
const empty_section = () => {
    return {"contents":[]};
};

jQuery(document).ready(($) => {
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

    /**
    af2_jsonobj.styling.main_color = 'rgba(0, 173, 239, 1)';
    af2_jsonobj.styling.background_color = 'rgba(255, 255, 255, 1)';
    af2_jsonobj.styling.card_color = 'rgba(255, 255, 255, 1)';
    af2_jsonobj.styling.text_color = 'rgba(51, 51, 51, 1)';
**/

    $(document).on('input', '.af2_dnp_bezeichnung', (ev) => {
        const par = $($(ev.currentTarget).parent()).parent();

        const ob = $($(par).parent()).parent();
        const sec = $(ob).data('section');
        const cont = $(ob).attr('id').substr('25');

        af2_jsonobj.sections[sec].contents[cont].dnp_data.bezeichnung = $(ev.currentTarget).val();
    });


    $(document).on('click', '.af2_chooser', (ev) => {
        const par = $($(ev.currentTarget).parent()).parent();

        const ob = $($(par).parent()).parent();
        const sec = $(ob).data('section');
        const cont = $(ob).attr('id').substr('25');

        switch($(par).attr('id'))
        {
            case 'af2_dnp_vorname':
            {
                af2_jsonobj.sections[sec].contents[cont].dnp_data.vorname = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_dnp_name':
            {
                af2_jsonobj.sections[sec].contents[cont].dnp_data.name = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_dnp_organisation':
            {
                af2_jsonobj.sections[sec].contents[cont].dnp_data.organisation = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_dnp_telefon':
            {
                af2_jsonobj.sections[sec].contents[cont].dnp_data.telefon = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_dnp_mail':
            {
                af2_jsonobj.sections[sec].contents[cont].dnp_data.mail = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_dnp_strasse':
            {
                af2_jsonobj.sections[sec].contents[cont].dnp_data.strasse = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_dnp_plz':
            {
                af2_jsonobj.sections[sec].contents[cont].dnp_data.plz = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_dnp_stadt':
            {
                af2_jsonobj.sections[sec].contents[cont].dnp_data.stadt = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_ac_vorname':
            {
                af2_jsonobj.sections[sec].contents[cont].ac_data.vorname = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_ac_name':
            {
                af2_jsonobj.sections[sec].contents[cont].ac_data.name = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_ac_mail':
            {
                af2_jsonobj.sections[sec].contents[cont].ac_data.mail = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_ac_telefon':
            {
                af2_jsonobj.sections[sec].contents[cont].ac_data.telefon = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_ac_liste':
            {
                af2_jsonobj.sections[sec].contents[cont].ac_data.liste = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_klicktipp_mail':
            {
                af2_jsonobj.sections[sec].contents[cont].klicktipp_data.mail = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_klicktipp_tag':
            {
                af2_jsonobj.sections[sec].contents[cont].klicktipp_data.tag = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_klicktipp_vorname':
            {
                af2_jsonobj.sections[sec].contents[cont].klicktipp_data.vorname = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_klicktipp_name':
            {
                af2_jsonobj.sections[sec].contents[cont].klicktipp_data.name = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_klicktipp_telefon':
            {
                af2_jsonobj.sections[sec].contents[cont].klicktipp_data.telefon = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_klicktipp_firma':
            {
                af2_jsonobj.sections[sec].contents[cont].klicktipp_data.firma = $(ev.currentTarget).attr('id');
                break;
            }
            case 'af2_klicktipp_process':
            {
                af2_jsonobj.sections[sec].contents[cont].klicktipp_data.process = $(ev.currentTarget).attr('id');
                break;
            }
        }

        $($(ev.currentTarget).parent()).removeClass('show');

        af2_update_content(cont, sec);
    });


    $(document).on('click', '.af2_form_section_content', (ev) => {
        try
        {
            if($('#af2_form_section_'+$(ev.currentTarget).data('section')+' #'+$(ev.currentTarget).attr('id')+' .af2_redirect_element')[0] !== undefined
            || $('#af2_form_section_'+$(ev.currentTarget).data('section')+' #'+$(ev.currentTarget).attr('id')+' .af2_dnp_element')[0] !== undefined
                || $('#af2_form_section_'+$(ev.currentTarget).data('section')+' #'+$(ev.currentTarget).attr('id')+' .af2_ac_element')[0] !== undefined
                || $('#af2_form_section_'+$(ev.currentTarget).data('section')+' #'+$(ev.currentTarget).attr('id')+' .af2_klicktipp_element')[0] !== undefined)
            {

            }
            else
            {
                const id = $(ev.currentTarget).data('contentid');
                const j = JSON.parse( $('#'+id+'.af2_content_information').html() );
                if( j.typ === 'af2_slider' )
                {

                }
                else
                {
                    $(ev.currentTarget).find('.af2_question_content_answer_block').toggleClass('hide');
                const cont = $(ev.currentTarget).attr('id').substr(25);
                const section = $(ev.currentTarget).data('section');

                if(af2_jsonobj.sections[section].contents[cont].hide === true)
                {
                    af2_jsonobj.sections[section].contents[cont].hide = false;
                }
                else if(af2_jsonobj.sections[section].contents[cont].hide === false)
                {
                    af2_jsonobj.sections[section].contents[cont].hide = true;
                }

                af2_update_connection_section(section, true);
                }
            }
        }
        catch(e)
        {

        }
    });
});

const af2_get_data = (id) => {
    if(id === 'af2_fb_title')
    {
        return af2_jsonobj.name;
    }
    if(id === 'af2_fe_title')
    {
        return af2_jsonobj.styling.fe_title;
    }
    if(id === 'af2_colors')
    {
        return [af2_jsonobj.styling.main_color, af2_jsonobj.styling.background_color, af2_jsonobj.styling.card_color, af2_jsonobj.styling.text_color];
    }
    if(id === 'af2_global_colors')
    {
        return [af2_jsonobj.styling.global_main_color, af2_jsonobj.styling.global_main_background_color];
    }
    if(id === 'af2_colors_choose')
    {
        return [af2_jsonobj.styling.form_heading_color ,
                af2_jsonobj.styling.form_question_heading_color,
                af2_jsonobj.styling.form_answer_card_text_color,
                af2_jsonobj.styling.form_answer_card_icon_color,
                af2_jsonobj.styling.form_background_color ,
                af2_jsonobj.styling.form_answer_card_background_color ,
                af2_jsonobj.styling.form_button_background_color,
                af2_jsonobj.styling.form_button_disabled_background_color,
                af2_jsonobj.styling.form_box_shadow_color,
                af2_jsonobj.styling.form_border_color ,
                af2_jsonobj.styling.form_progress_bar_color,
                af2_jsonobj.styling.form_progress_bar_unfilled_background_color,
                af2_jsonobj.styling.form_slider_frage_bullet_color,
                af2_jsonobj.styling.form_slider_frage_thumb_background_color,
                af2_jsonobj.styling.form_input_background_color,
                af2_jsonobj.styling.form_question_description_color,
                af2_jsonobj.styling.form_loader_color];
    }
    if(id === 'af2_borders_choose')
    {
        return [af2_jsonobj.styling.form_answer_card_border_radius ,
                af2_jsonobj.styling.form_text_input_border_radius];
    }
    if(id === 'af2_text_choose')
    {
        return [af2_jsonobj.styling.form_heading_size_desktop	                ,
                af2_jsonobj.styling.form_heading_size_mobile		                 ,
                af2_jsonobj.styling.form_heading_weight			                 ,
                af2_jsonobj.styling.form_heading_line_height_desktop             ,
                af2_jsonobj.styling.form_heading_line_height_mobile              ,

                af2_jsonobj.styling.form_question_heading_size_desktop		      ,
                af2_jsonobj.styling.form_question_heading_size_mobile		        ,
                af2_jsonobj.styling.form_question_heading_weight				    ,
                af2_jsonobj.styling.form_question_heading_line_height_desktop        ,
                af2_jsonobj.styling.form_question_heading_line_height_mobile	    ,

                af2_jsonobj.styling.form_answer_card_text_size_desktop		            ,
                af2_jsonobj.styling.form_answer_card_text_size_mobile		        ,
                af2_jsonobj.styling.form_answer_card_text_weight				    ,
                af2_jsonobj.styling.form_answer_card_text_line_height_desktop       ,
                af2_jsonobj.styling.form_answer_card_text_line_height_mobile	    ,

                af2_jsonobj.styling.form_text_input_size_desktop			        ,
                af2_jsonobj.styling.form_text_input_size_mobile			            ,
                af2_jsonobj.styling.form_text_input_text_weight			            ,
                af2_jsonobj.styling.form_text_input_line_height_desktop	               ,
                af2_jsonobj.styling.form_text_input_line_height_mobile,

                af2_jsonobj.styling.form_question_description_size_desktop		      ,
                af2_jsonobj.styling.form_question_description_size_mobile		        ,
                af2_jsonobj.styling.form_question_description_weight				    ,
                af2_jsonobj.styling.form_question_description_line_height_desktop        ,
                af2_jsonobj.styling.form_question_description_line_height_mobile	    
        ];
    }
    if(id === 'af2_contact_form_choose')
    {
        return [
            af2_jsonobj.styling.form_contact_form_label_size,
            af2_jsonobj.styling.form_contact_form_label_weight,
            af2_jsonobj.styling.form_contact_form_input_size,
            af2_jsonobj.styling.form_contact_form_input_weight,
            af2_jsonobj.styling.form_contact_form_button_size,
            af2_jsonobj.styling.form_contact_form_button_weight,
            af2_jsonobj.styling.form_contact_form_button_padding_top_bottom,
            af2_jsonobj.styling.form_contact_form_cb_size,
            af2_jsonobj.styling.form_contact_form_cb_weight,
            af2_jsonobj.styling.form_contact_form_input_height,
            af2_jsonobj.styling.form_contact_form_input_border_radius,
            af2_jsonobj.styling.form_contact_form_button_border_radius,
            af2_jsonobj.styling.form_contact_form_button_background_color,
            af2_jsonobj.styling.form_contact_form_button_color,
            af2_jsonobj.styling.form_contact_form_input_padding_left_right
        ];
    }
};

const af2_save_sections = (content) => {

    let section = content.section;
    let container = content.container;

    const del = content.delete;

    if(del === true)
    {
        af2_save_section_delete(section, container);
    }
    else
    {
        const move = content.move;
        const insert_section = content.insert_section;

        if(move === true)
        {

            let sectionfrom = content.sectionfrom;
            let containerfrom = content.containerfrom;
            let sel = af2_jsonobj.sections[sectionfrom].contents[containerfrom];
            const cont = {"data":sel.data, "hide":sel.hide, "connections": [], "incoming_connections":[]};
            let dele = false;
            if(af2_jsonobj.sections[sectionfrom].contents.length === 1)
            {
                dele = true;
            }
            $.when(af2_save_section_delete(sectionfrom, containerfrom)).done(() => {
                if(dele === true)
                {
                    if(section > sectionfrom)
                    {
                        section--;
                    }
                }
                $.when(af2_save_section_insert_new_section(section, container, insert_section)).done(() => {
                    af2_save_section_insert(section, container, cont);
                });
            });
        }
        else
        {
            const insert = content.insert;

            if(insert === true)
            {
                const cont = content.content;
                $.when(af2_save_section_insert_new_section(section, container, insert_section)).done(() => {
                    af2_save_section_insert(section, container, cont);
                });
            }
        }
    }
};

const af2_save_section_delete = (section, container) => {
    $.when(af2_delete_all_from_content(section, container)).done(() => {
        //Wenn Section mit gelöscht wird!
        if(af2_jsonobj.sections[section].contents.length === 1)
        {
            $.when(af2_connection_save_delete_section(section)).done(() => {
                af2_jsonobj.sections.splice(section, 1);
            });
        }
        else
        {
            $.when(af2_connection_save_delete_cont(section, container)).done(() => {
                af2_jsonobj.sections[section].contents.splice(container, 1);
            });
        }
    });
};

const af2_save_section_insert_new_section = (section, container, insert_section) => {
    if(insert_section === true)
    {
        $.when(af2_connection_save_insert_sec(section)).done(() => {
            af2_jsonobj.sections.splice(section, 0, empty_section());
        });

    }
};

const af2_save_section_insert = (section, container, cont) => {
    //Inserting a new Content!!!
    $.when(af2_connection_save_insert_cont(section, container)).done(() => {
        cont.connections = [];
        cont.incoming_connections = [];
        af2_jsonobj.sections[section].contents.splice(container, 0, cont);
    });
};



/**
 * Deleting all incoming and outgoing connections from a content
 * @param section
 * @param container
 */
const af2_delete_all_from_content = (section, container) => {
    //select
    const sel = af2_jsonobj.sections[section].contents[container];

    if (sel.incoming_connections !== undefined) {
        $(sel.incoming_connections).each((i, el) => {
            const s = af2_jsonobj.sections[el.from_section].contents[el.from_content];

            $(s.connections).each((y, ele) => {
                if (ele.to_section.toString() === section.toString() && ele.to_content.toString() === container.toString()) {
                    af2_jsonobj.sections[el.from_section].contents[el.from_content].connections.splice(y, 1);

                    if($('#af2_content_' + af2_jsonobj.sections[el.from_section].contents[el.from_content].data
                        + ' .af2_content_information')[0] === undefined)
                    {
                        $(af2_jsonobj.sections[el.from_section].contents[el.from_content].connections).each((b, elx) => {
                            af2_jsonobj.sections[el.from_section].contents[el.from_content].connections[b].from = b;
                        });
                    }
                }
            });
        });
    }
    if (sel.connections !== undefined) {
        $(sel.connections).each((j, elem) => {
            if(elem.to_section === '' || elem.to_content === '')
            {

            }
            else
            {
                const s = af2_jsonobj.sections[elem.to_section].contents[elem.to_content];

                $(s.incoming_connections).each((z, ell) => {
                    if (ell.from_section.toString() === section.toString() && ell.from_content.toString() === container.toString()) {
                        af2_jsonobj.sections[elem.to_section].contents[elem.to_content].incoming_connections.splice(z, 1);
                    }
                });
            }

        });
    }
};

/**
 * deleting a section out of the structure -> adjusting the connections
 * @param section
 */
const af2_connection_save_delete_section = (section) => {
    $(af2_jsonobj.sections).each((i, el) => {
        $(af2_jsonobj.sections[i].contents).each((j, ele) => {
            if(af2_jsonobj.sections[i].contents[j].connections !== undefined)
            {
                $(af2_jsonobj.sections[i].contents[j].connections).each((z, elem) => {
                    if(elem.to_section === '' || elem.to_content === '')
                    {

                    }
                    else
                    {
                        if(parseInt(elem.to_section.toString()) > parseInt(section.toString()))
                        {
                            af2_jsonobj.sections[i].contents[j].connections[z].to_section = parseInt(elem.to_section.toString())-1;
                        }
                    }

                });
            }
            if(af2_jsonobj.sections[i].contents[j].incoming_connections !== undefined)
            {
                $(af2_jsonobj.sections[i].contents[j].incoming_connections).each((x, eleme) => {
                    if(parseInt(eleme.from_section.toString()) > parseInt(section.toString()))
                    {
                        af2_jsonobj.sections[i].contents[j].incoming_connections[x].from_section = parseInt(eleme.from_section.toString())-1;
                    }
                });
            }
        });
    });
};

/**
 * Deleting a content -> adjusting the connections
 * @param section
 * @param container
 */
const af2_connection_save_delete_cont = (section, container) => {
    $(af2_jsonobj.sections[section].contents).each((j, ele) => {
        if(j > container)
        {
            if(af2_jsonobj.sections[section].contents[j].connections !== undefined)
            {
                $(af2_jsonobj.sections[section].contents[j].connections).each((z, elem) => {
                    if(elem.to_section === '' || elem.to_content === '')
                    {

                    }
                    else
                    {
                        const sel = af2_jsonobj.sections[elem.to_section].contents[elem.to_content];
                        $(sel.incoming_connections).each((a, e) => {
                            if(e.from_section.toString() === section.toString() && e.from_content.toString() === j.toString())
                            {
                                af2_jsonobj.sections[elem.to_section].contents[elem.to_content].incoming_connections[a].from_content = parseInt(e.from_content.toString()) - 1;
                            }
                        });
                    }

                });
            }
            if(af2_jsonobj.sections[section].contents[j].incoming_connections !== undefined)
            {
                $(af2_jsonobj.sections[section].contents[j].incoming_connections).each((y, eleme) => {
                    const sel = af2_jsonobj.sections[eleme.from_section].contents[eleme.from_content];
                    $(sel.connections).each((b, em) => {
                        if(em.to_section.toString() === section.toString() && em.to_content.toString() === j.toString())
                        {
                            af2_jsonobj.sections[eleme.from_section].contents[eleme.from_content].connections[b].to_content = parseInt(em.to_content.toString()) - 1;
                        }
                    });
                });
            }
        }
    });
};

/**
 * Connection saves inserting of a section
 * @param section
 */
const af2_connection_save_insert_sec = (section) => {
    $(af2_jsonobj.sections).each((i, el) => {
        if(i < section)
        {
            $(el.contents).each((j, ele) => {
                if(ele.connections !== undefined)
                {
                    $(ele.connections).each((a, ell) => {
                        if(ell.to_section === '')
                        {

                        }
                        else
                        {
                            if(parseInt(ell.to_section.toString()) >= section)
                            {
                                af2_jsonobj.sections[i].contents[j].connections[a].to_section = parseInt(ell.to_section.toString())+1;
                            }
                        }

                    });
                }
            });
        }
        else
        {
            $(el.contents).each((k, elem) => {
                if(elem.connections !== undefined)
                {
                    $(elem.connections).each((b, elle) => {
                        if(elle.to_section === '')
                        {

                        }
                        else
                        {
                            af2_jsonobj.sections[i].contents[k].connections[b].to_section = parseInt(elle.to_section.toString())+1;
                        }

                    });
                }
                if(elem.incoming_connections !== undefined)
                {
                    $(elem.incoming_connections).each((c, ellem) => {
                        if(ellem.from_section >= section)
                        {
                            af2_jsonobj.sections[i].contents[k].incoming_connections[c].from_section = parseInt(ellem.from_section.toString())+1;
                        }
                    });
                }
            });
        }
    });
};


/**
 * Savely inserting content
 * @param section
 * @param container
 */
const af2_connection_save_insert_cont = (section, container) => {
    $(af2_jsonobj.sections[section].contents).each((i, el) => {
        if(i >= container)
        {
            if(el.connections !== undefined)
            {
                $(el.connections).each((x, ele) => {
                    if(ele.to_section === '' ||ele.to_content === '')
                    {

                    }
                    else
                    {
                        const sel = af2_jsonobj.sections[ele.to_section].contents[ele.to_content];

                        $(sel.incoming_connections).each((a, elemm) => {
                            if(elemm.from_section.toString() === section.toString() && elemm.from_content.toString() === container.toString())
                            {
                                af2_jsonobj.sections[ele.to_section].contents[ele.to_content].incoming_connections[a].from_content = parseInt(elemm.from_content.toString())+1;
                            }
                        });
                    }

                });
            }
            if(el.incoming_connections !== undefined)
            {
                $(el.incoming_connections).each((y, e) => {
                    const sel = af2_jsonobj.sections[e.from_section].contents[e.from_content];

                    $(sel.connections).each((b, elemme) => {
                        if(elemme.to_section.toString() === section.toString() && elemme.to_content.toString() === container.toString())
                        {
                            af2_jsonobj.sections[e.from_section].contents[e.from_content].connections[b].to_content = parseInt(elemme.to_content.toString())+1;
                        }
                    });
                });
            }
        }
    });
};

const af2_save_connections = (content) => {

    const sectionfrom = content.sectionfrom;
    const containerfrom = content.containerfrom;
    const connector = content.connector;

    if(af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections === undefined)
    {
        af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections = [];
    }

    const conns = af2_jsonobj.sections[sectionfrom].contents[containerfrom];

    const del = content.delete;

    if(del === true)
    {
        $(conns.connections).each((i, el) => {
            if(el.from === connector)
            {
                const sec = af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections[i].to_section;
                const cont = af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections[i].to_content;

                if(af2_jsonobj.sections[sectionfrom].contents[containerfrom].data.includes('redirect:') ||
                    af2_jsonobj.sections[sectionfrom].contents[containerfrom].data.includes('dealsnprojects:') ||
                    af2_jsonobj.sections[sectionfrom].contents[containerfrom].data.includes('klicktipp:') ||
                    af2_jsonobj.sections[sectionfrom].contents[containerfrom].data.includes('activecampaign:'))
                {
                    af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections[i].to_section = '';
                    af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections[i].to_content = '';
                }
                else
                {
                    af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections.splice(i, 1);
                }


                const conns = af2_jsonobj.sections[sec].contents[cont].incoming_connections;

                $(conns).each((y, ele) => {
                    if(ele.from_section === sectionfrom && ele.from_content === containerfrom)
                    {
                        af2_jsonobj.sections[sec].contents[cont].incoming_connections.splice(y, 1);
                    }
                });

                if(af2_jsonobj.sections[sec].contents[cont].data.includes('dealsnprojects:'))
                {
                    af2_update_dnp_data(sec, cont);
                }
                if(af2_jsonobj.sections[sec].contents[cont].data.includes('activecampaign:'))
                {
                    af2_update_ac_data(sec, cont);
                }
                if(af2_jsonobj.sections[sec].contents[cont].data.includes('klicktipp:'))
                {
                    af2_update_klicktipp_data(sec, cont);
                }
            }
        });
    }
    else
    {

        const insert = content.insert;

        if(insert === true)
        {
            let af2_exists = false;
            let place = conns.connections.length;
            let old_to_section = undefined;
            let old_to_content = undefined;

            const section = content.section;
            const container = content.container;


            if(af2_jsonobj.sections[section].contents[container].data.includes('dealsnprojects:'))
            {
                af2_jsonobj.sections[section].contents[container].incoming_connections = [];
            }
            if(af2_jsonobj.sections[section].contents[container].data.includes('activecampaign:'))
            {
                af2_jsonobj.sections[section].contents[container].incoming_connections = [];
            }
            if(af2_jsonobj.sections[section].contents[container].data.includes('klicktipp:'))
            {
                af2_jsonobj.sections[section].contents[container].incoming_connections = [];
            }


            $(conns.connections).each((i, el) => {
                if(el.from.toString() === connector.toString())
                {
                    af2_exists = true;
                    place = i;

                    old_to_section = af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections[i].to_section;
                    old_to_content = af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections[i].to_content;
                }
            }).promise().done(() => {

                if(af2_exists === true)
                {
                    af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections[place].to_section = section;
                    af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections[place].to_content = container;


                    if(old_to_section !== '' && old_to_content !== '')
                    {
                        const conns = af2_jsonobj.sections[old_to_section].contents[old_to_content].incoming_connections;

                        $(conns).each((y, ele) => {
                            if(ele.from_section === sectionfrom && ele.from_content === containerfrom)
                            {
                                af2_jsonobj.sections[old_to_section].contents[old_to_content].incoming_connections.splice(y, 1);
                            }
                        });
                    }


                    if(af2_jsonobj.sections[section].contents[container].incoming_connections === undefined)
                    {
                        af2_jsonobj.sections[section].contents[container].incoming_connections = [];
                    }

                    af2_jsonobj.sections[section].contents[container].incoming_connections.push({"from_section":sectionfrom,
                        "from_content":containerfrom});

                }
                else
                {
                    af2_jsonobj.sections[sectionfrom].contents[containerfrom].connections.push({"from":connector,
                        "to_section":section, "to_content":container});

                    if(af2_jsonobj.sections[section].contents[container].incoming_connections === undefined)
                    {
                        af2_jsonobj.sections[section].contents[container].incoming_connections = [];
                    }

                    af2_jsonobj.sections[section].contents[container].incoming_connections.push({"from_section":sectionfrom,
                        "from_content":containerfrom});
                }



                if(af2_jsonobj.sections[section].contents[container].data.includes('dealsnprojects:'))
                {
                    af2_update_dnp_data(section, container);
                }
                if(af2_jsonobj.sections[section].contents[container].data.includes('activecampaign:'))
                {
                    af2_update_ac_data(section, container);
                }
                if(af2_jsonobj.sections[section].contents[container].data.includes('klicktipp:'))
                {
                    af2_update_klicktipp_data(section, container);
                }
            });
        }
    }
};

const af2_update_dnp_data = (section, container) => {

    af2_jsonobj.sections[section].contents[container].dnp_data = {"vorname":'', "name":'', "organisation":'', "telefon":'', "mail":'', "strasse":'', "plz":'', "stadt":'', "bezeichnung":'',};

    af2_update_content(container, section);
};

const af2_update_ac_data = (section, container) => {

    af2_jsonobj.sections[section].contents[container].ac_data = {"mail":'',"vorname":'',"name":'',"telefon":'', "liste":''};

    af2_update_content(container, section);
};

const af2_update_klicktipp_data = (section, container) => {

    af2_jsonobj.sections[section].contents[container].klicktipp_data = {"mail":'', "tag":'', "vorname":'', "name":'', "telefon":'', "firma":'', "process":''};

    af2_update_content(container, section);
};

const af2_save_fb_title = (title) => {
    af2_jsonobj.name = title;
};

const af2_save_fe_title = (title) => {
    af2_jsonobj.styling.fe_title = title;
};


const af2_save_main_color = (color) => {
    af2_jsonobj.styling.main_color = color;
};
const af2_save_bg_color = (color) => {
    af2_jsonobj.styling.background_color = color;
};
const af2_save_card_color = (color) => {
    af2_jsonobj.styling.card_color = color;
};
const af2_save_text_color = (color) => {
    af2_jsonobj.styling.text_color = color;
};

const af2_save_redirect = (content) => {
    const section = content.section;
    const container = content.container;
    const cont = content.content;

    af2_jsonobj.sections[section].contents[container].data = 'redirect:'+cont;
};

const af2_save_new_connection = (section, container) => {
    let sel = af2_jsonobj.sections[section].contents[container].connections;
    af2_jsonobj.sections[section].contents[container].connections.push({"from":sel.length, "to_section":'', "to_content":''});
};
const af2_save_new_connection_ = (section, container) => {
    let sel = af2_jsonobj.sections[section].contents[container].connections;
    af2_jsonobj.sections[section].contents[container].connections.push({"from":sel.length, "to_section":'', "to_content":'', "operator":'', "number":''});
};

const af2_save_operator = (section, content, conn, val) => {
    $(af2_jsonobj.sections[section].contents[content].connections).each((i, el) => {
        if(el.from == conn)
        {
            af2_jsonobj.sections[section].contents[content].connections[i].operator = val;
        }
    });
};
const af2_save_sl_number = (section, content, conn, val) => {
    $(af2_jsonobj.sections[section].contents[content].connections).each((i, el) => {
        if(el.from == conn)
        {
            af2_jsonobj.sections[section].contents[content].connections[i].number = val;
        }
    });
};



const af2_save_delete_connection = (section, container, from) => {
    let sel = af2_jsonobj.sections[section].contents[container].connections;

    const sec = sel[from].to_section;
    const cont = sel[from].to_content;

    if( sec === '' || sec === undefined || cont === '' || cont === undefined )
    {
        af2_jsonobj.sections[section].contents[container].connections.splice(from, 1);
        $(sel).each((i, el) => {
            el.from = i;
        });
    }
    else
    {
        let conns = af2_jsonobj.sections[sec].contents[cont].incoming_connections;

        $(conns).each((i, el) => {
            if(el.from_section.toString() === section.toString() && el.from_content.toString() === container.toString())
            {
                af2_jsonobj.sections[sec].contents[cont].incoming_connections.splice(i);
            }
        }).promise().done(() => {
            af2_jsonobj.sections[section].contents[container].connections.splice(from, 1);

            sel = af2_jsonobj.sections[section].contents[container].connections;

            $(sel).each((i, el) => {
                el.from = i;
            });
        });
    }
};

const af2_save_delete_connection_ = (section, container, from) => {
    let sel = af2_jsonobj.sections[section].contents[container].connections;

    let x = 0;

    $(sel).each((i, el) => {
        if(el.from == from)
        {
            x = i;
        }
    }).promise().done(() => {
        const sec = sel[x].to_section;
        const cont = sel[x].to_content;
    
        if( sec === '' || sec === undefined || cont === '' || cont === undefined )
        {
            af2_jsonobj.sections[section].contents[container].connections.splice(from, 1);
            $(sel).each((i, el) => {
                el.from = i;
            });
        }
        else
        {
            let conns = af2_jsonobj.sections[sec].contents[cont].incoming_connections;
    
            $(conns).each((i, el) => {
                if(el.from_section.toString() === section.toString() && el.from_content.toString() === container.toString())
                {
                    af2_jsonobj.sections[sec].contents[cont].incoming_connections.splice(i);
                }
            }).promise().done(() => {
                af2_jsonobj.sections[section].contents[container].connections.splice(x, 1);
    
                sel = af2_jsonobj.sections[section].contents[container].connections;
    
                $(sel).each((i, el) => {
                    el.from = i;
                });
            });
        }
    });
};

const af2_save_global_main_color = (cont) => {
    af2_jsonobj.styling.global_main_color = cont;

    af2_save_form_heading_color(cont);
    af2_save_form_answer_card_icon_color(cont);
    af2_save_form_button_background_color(cont);
    af2_save_form_box_shadow_color(cont);
    af2_save_form_border_color(cont);
    af2_save_form_progress_bar_color(cont);
    af2_save_form_slider_frage_bullet_color(cont);
    af2_save_form_slider_frage_thumb_background_color(cont);
    af2_save_form_loader_color(cont);
};
const af2_save_global_main_background_color = (cont) => {
    af2_jsonobj.styling.global_main_background_color = cont;

    af2_save_form_background_color(cont);
};

const af2_save_form_heading_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_heading_color = cont;
    $.when(af2OverwriteStylings($, {"af2_form_heading":[{"attribute": "color",
        "value":cont}]})).done((style) => {
            af2Styles = style;
            prom.resolve();
    });

    return prom.promise();
};
const af2_save_form_question_heading_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_question_heading_color = cont;
    $.when(af2OverwriteStylings($, {"af2_question_heading":[{"attribute": "color",
            "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_question_description_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_question_description_color = cont;
    $.when(af2OverwriteStylings($, {"af2_question_description":[{"attribute": "color",
            "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_answer_card_text_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_answer_card_text_color = cont;
    $.when(af2OverwriteStylings($, {"af2_answer_text":[{"attribute": "color",
            "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_answer_card_icon_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_answer_card_icon_color = cont;
    $.when(af2OverwriteStylings($, {"af2_answer_card_":[{"attribute": "color",
            "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_background_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_background_color = cont;
    $.when(af2OverwriteStylings($, {"af2_form":[{"attribute": "background-color",
            "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_answer_card_background_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_answer_card_background_color = cont;
    $.when(af2OverwriteStylings($, {"af2_answer_card_":[{"attribute": "background-color",
            "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_button_background_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_button_background_color = cont;
    $.when(af2OverwriteStylings($, {"af2_form_button":[{"attribute": "background-color",
            "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_button_disabled_background_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_button_disabled_background_color = cont;
    $.when(af2OverwriteStylings($, {"af2_form_button":[{"attribute": "background-color",
            "value":cont, "special_class":"af2_disabled"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_box_shadow_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_box_shadow_color = cont;
    $.when(af2OverwriteStylings($, {"af2_textfeld_frage":[{"attribute": "box-shadow",
            "value":"0 0 6px "+cont, "special_state": "focus"}],
                                    "af2_textbereich_frage":[{"attribute": "box-shadow",
            "value":"0 0 6px "+cont, "special_state": "focus"}],
                                    "af2_text_type":[{"attribute": "box-shadow",
            "value":"0 0 6px "+cont, "special_state": "focus"}],
                                    "af2_slider_frage":[{"attribute": "box-shadow",
            "value":"0 0 6px "+cont, "special_state": "focus"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_border_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_border_color = cont;
    $.when(af2OverwriteStylings($, {"af2_text_type":[{"attribute": "border",
            "value":"1px solid "+cont, "special_state":"focus"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_progress_bar_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_progress_bar_color = cont;
    $.when(af2OverwriteStylings($, {"af2_form_progress":[{"attribute": "background-color",
            "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });

};
const af2_save_form_progress_bar_unfilled_background_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_progress_bar_unfilled_background_color = cont;
    $.when(af2OverwriteStylings($, {"af2_form_progress_bar":[{"attribute": "background-color",
            "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_slider_frage_bullet_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_slider_frage_bullet_color = cont;
    $.when(af2OverwriteStylings($, {"af2_slider_frage_bullet":[{"attribute": "color",
            "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_slider_frage_thumb_background_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_slider_frage_thumb_background_color = cont;
    $.when(af2OverwriteStylings($, {"af2_slider_frage":[{"attribute": "background-color",
            "value":cont, "special_extra":"-moz-range-thumb"},
                                                        {"attribute": "background-color",
            "value":cont, "special_extra":"-webkit-slider-thumb"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_input_background_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_input_background_color = cont;
    $.when(af2OverwriteStylings($, {"af2_textfeld_frage":[{"attribute": "background-color",
            "value":cont}],         "af2_textbereich_frage":[{"attribute": "background-color",
            "value":cont}],         "af2_text_type":[{"attribute": "background-color",
            "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_loader_color = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_loader_color = cont;
    $.when(af2OverwriteStylings($, {"af2_form_loader":[{"attribute": "color",
        "value":cont}]})).done((style) => {
            af2Styles = style;
            prom.resolve();
    });

    return prom.promise();
};
const af2_save_form_answer_card_border_radius = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_answer_card_border_radius = cont;
    $.when(af2OverwriteStylings($, {"af2_answer_card_":[{"attribute": "border-radius",
            "value":cont+"px"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_text_input_border_radius = (cont) => {
    const prom = $.Deferred();

    af2_jsonobj.styling.form_text_input_border_radius = cont;
    $.when(af2OverwriteStylings($, {"af2_textfeld_frage":[{"attribute": "border-radius",
            "value":cont+"px"}], "af2_textbereich_frage":[{"attribute": "border-radius",
            "value":cont+"px"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};

const af2_save_form_heading_size_desktop = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_heading_size_desktop = cont;
    $.when(af2OverwriteStylings($, {"af2_form_heading":[{"attribute":"font-size", "value":cont+"px", "special_class":"desktop"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_heading_size_mobile = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_heading_size_mobile = cont;
    $.when(af2OverwriteStylings($, {"af2_form_heading":[{"attribute":"font-size", "value":cont+"px", "special_class":"af2_mobile"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_heading_weight = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_heading_weight = cont;
    $.when(af2OverwriteStylings($, {"af2_form_heading":[{"attribute":"font-weight", "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_heading_line_height_desktop = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_heading_line_height_desktop = cont;
    $.when(af2OverwriteStylings($, {"af2_form_heading":[{"attribute":"line-height", "value":cont+"px", "special_class":"desktop"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_heading_line_height_mobile = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_heading_line_height_mobile = cont;
    $.when(af2OverwriteStylings($, {"af2_form_heading":[{"attribute":"line-height", "value":cont+"px", "special_class":"af2_mobile"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};

const af2_save_form_question_heading_size_desktop = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_question_heading_size_desktop = cont;
    $.when(af2OverwriteStylings($, {"af2_question_heading":[{"attribute":"font-size", "value":cont+"px", "special_class":"desktop"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};

const af2_save_form_question_description_size_desktop = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_question_description_size_desktop = cont;
    $.when(af2OverwriteStylings($, {"af2_question_description":[{"attribute":"font-size", "value":cont+"px", "special_class":"desktop"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_question_heading_size_mobile = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_question_heading_size_mobile = cont;
    $.when(af2OverwriteStylings($, {"af2_question_heading":[{"attribute":"font-size", "value":cont+"px", "special_class":"af2_mobile"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_question_description_size_mobile = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_question_description_size_mobile = cont;
    $.when(af2OverwriteStylings($, {"af2_question_description":[{"attribute":"font-size", "value":cont+"px", "special_class":"af2_mobile"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_question_heading_weight = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_question_heading_weight = cont;
    $.when(af2OverwriteStylings($, {"af2_question_heading":[{"attribute":"font-weight", "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_question_description_weight = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_question_description_weight = cont;
    $.when(af2OverwriteStylings($, {"af2_question_description":[{"attribute":"font-weight", "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_question_heading_line_height_desktop = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_question_heading_line_height_desktop = cont;
    $.when(af2OverwriteStylings($, {"af2_question_heading":[{"attribute":"line-height", "value":cont+"px", "special_class":"desktop"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_question_description_line_height_desktop = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_question_description_line_height_desktop = cont;
    $.when(af2OverwriteStylings($, {"af2_question_description":[{"attribute":"line-height", "value":cont+"px", "special_class":"desktop"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_question_heading_line_height_mobile = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_question_heading_line_height_mobile = cont;
    $.when(af2OverwriteStylings($, {"af2_question_heading":[{"attribute":"line-height", "value":cont+"px", "special_class":"af2_mobile"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_question_description_line_height_mobile = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_question_description_line_height_mobile = cont;
    $.when(af2OverwriteStylings($, {"af2_question_description":[{"attribute":"line-height", "value":cont+"px", "special_class":"af2_mobile"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};

const af2_save_form_answer_card_text_size_desktop = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_answer_card_text_size_desktop = cont;
    $.when(af2OverwriteStylings($, {"af2_answer_text":[{"attribute":"font-size", "value":cont+"px", "special_class":"desktop"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_answer_card_text_size_mobile = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_answer_card_text_size_mobile = cont;
    $.when(af2OverwriteStylings($, {"af2_answer_text":[{"attribute":"font-size", "value":cont+"px", "special_class":"af2_mobile"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_answer_card_text_weight = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_answer_card_text_weight = cont;
    $.when(af2OverwriteStylings($, {"af2_answer_text":[{"attribute":"font-weight", "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_answer_card_text_line_height_desktop = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_answer_card_text_line_height_desktop = cont;
    $.when(af2OverwriteStylings($, {"af2_answer_text":[{"attribute":"line-height", "value":cont+"px", "special_class":"desktop"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_answer_card_text_line_height_mobile = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_answer_card_text_line_height_mobile = cont;
    $.when(af2OverwriteStylings($, {"af2_answer_text":[{"attribute":"line-height", "value":cont+"px", "special_class":"af2_mobile"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};

const af2_save_form_text_input_size_desktop = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_text_input_size_desktop = cont;
    $.when(af2OverwriteStylings($, {"af2_textfeld_frage":[{"attribute":"font-size", "value":cont+"px", "special_class":"desktop"}], "af2_textbereich_frage":[{"attribute":"font-size", "value":cont+"px", "special_class":"desktop"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_text_input_size_mobile = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_text_input_size_mobile = cont;
    $.when(af2OverwriteStylings($, {"af2_textfeld_frage":[{"attribute":"font-size", "value":cont+"px", "special_class":"af2_mobile"}], "af2_textbereich_frage":[{"attribute":"font-size", "value":cont+"px", "special_class":"af2_mobile"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_text_input_text_weight = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_text_input_text_weight = cont;
    $.when(af2OverwriteStylings($, {"af2_textfeld_frage":[{"attribute":"font-weight", "value":cont}], "af2_textbereich_frage":[{"attribute":"font-weight", "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_text_input_line_height_desktop = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_text_input_line_height_desktop = cont;
    $.when(af2OverwriteStylings($, {"af2_textfeld_frage":[{"attribute":"line-height", "value":cont+"px", "special_class":"desktop"}], "af2_textbereich_frage":[{"attribute":"line-height", "value":cont+"px", "special_class":"desktop"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};
const af2_save_form_text_input_line_height_mobile = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_text_input_line_height_mobile = cont;
    $.when(af2OverwriteStylings($, {"af2_textfeld_frage":[{"attribute":"line-height", "value":cont+"px", "special_class":"af2_mobile"}], "af2_textbereich_frage":[{"attribute":"line-height", "value":cont+"px", "special_class":"af2_mobile"}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    });
};


const af2_save_form_contact_form_label_size = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_label_size = cont;
    $.when(af2OverwriteStylings($, {"af2_question_label":[{"attribute":"font-size", "value":cont+'px'}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}
const af2_save_form_contact_form_label_weight = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_label_weight = cont;
    $.when(af2OverwriteStylings($, {"af2_question_label":[{"attribute":"font-weight", "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}
const af2_save_form_contact_form_input_size = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_input_size = cont;
    $.when(af2OverwriteStylings($, {"af2_text_type":[{"attribute":"font-size", "value":cont+'px'}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}
const af2_save_form_contact_form_input_weight = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_input_weight = cont;
    $.when(af2OverwriteStylings($, {"af2_text_type":[{"attribute":"font-weight", "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}
const af2_save_form_contact_form_button_size = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_button_size = cont;
    $.when(af2OverwriteStylings($, {"af2_submit_button":[{"attribute":"font-size", "value":cont+'px'}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}
const af2_save_form_contact_form_button_weight = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_button_weight = cont;
    $.when(af2OverwriteStylings($, {"af2_submit_button":[{"attribute":"font-weight", "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}
const af2_save_form_contact_form_button_padding_top_bottom = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_button_padding_top_bottom = cont;
    $.when(af2OverwriteStylings($, {"af2_submit_button":[{"attribute":"padding", "value":cont+'px 0'}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}
const af2_save_form_contact_form_cb_size = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_cb_size = cont;
    $.when(af2OverwriteStylings($, {"af2_question_cb_label":[{"attribute":"font-size", "value":cont+'px'}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}
const af2_save_form_contact_form_cb_weight = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_cb_weight = cont;
    $.when(af2OverwriteStylings($, {"af2_question_cb_label":[{"attribute":"font-weight", "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}
const af2_save_form_contact_form_input_height = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_input_height = cont;
    $.when(af2OverwriteStylings($, {"af2_text_type":[{"attribute":"height", "value":cont+'px'}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}
const af2_save_form_contact_form_input_border_radius = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_input_border_radius = cont;
    $.when(af2OverwriteStylings($, {"af2_text_type":[{"attribute":"border-radius", "value":cont+'px'}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}
const af2_save_form_contact_form_button_border_radius = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_button_border_radius = cont;
    $.when(af2OverwriteStylings($, {"af2_submit_button":[{"attribute":"border-radius", "value":cont+'px'}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}
const af2_save_form_contact_form_button_background_color = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_button_background_color = cont;
    $.when(af2OverwriteStylings($, {"af2_submit_button":[{"attribute":"background-color", "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}
const af2_save_form_contact_form_button_color = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_button_color = cont;
    $.when(af2OverwriteStylings($, {"af2_submit_button":[{"attribute":"color", "value":cont}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}
const af2_save_form_contact_form_input_padding_left_right = (cont) => {
    const prom = $.Deferred();
    af2_jsonobj.styling.form_contact_form_input_padding_left_right = cont;
    $.when(af2OverwriteStylings($, {"af2_text_type":[{"attribute":"padding", "value":'0 '+cont+'px'}]})).done((style) => {
        af2Styles = style;
        prom.resolve();
    })
}