let drag_element = undefined;
let af2_exists = false;
let af2_colorPicker = [];

let af2_gotContent = undefined;
let af2_gotContent1 = undefined;

let af2_first_dragged = false;

let af2_req_dat = undefined;

let af2_forms = [];                                                                                                         // All Forms
let af2_datas = [];                                                                                                         // All Data contents
let af2Styles = {};
$ = jQuery;
jQuery(document).ready(($) => {

    $(document).on('click', '.af2_dnp_choosable', (ev) => {
        const par = $($(ev.currentTarget).parent()).parent();
        let ex = false;
        if ($('#' + $(par).attr('id') + ' .af2_dnp_chooser.show')[0] !== undefined)
        {
            ex = true;
        }

        $('.af2_dnp_chooser').each((i, el) => {
            $(el).removeClass('show');
        }).promise().done(() => {
            if (ex === true)
            {

            } else
            {
                $('#' + $(par).attr('id') + ' .af2_dnp_chooser').addClass('show');
            }
        });
    });
    $(document).on('click', '.af2_ac_choosable', (ev) => {
        const par = $($(ev.currentTarget).parent()).parent();
        let ex = false;
        if ($('#' + $(par).attr('id') + ' .af2_ac_chooser.show')[0] !== undefined)
        {
            ex = true;
        }

        $('.af2_ac_chooser').each((i, el) => {
            $(el).removeClass('show');
        }).promise().done(() => {
            if (ex === true)
            {

            } else
            {
                $('#' + $(par).attr('id') + ' .af2_ac_chooser').addClass('show');
            }
        });
    });
    $(document).on('click', '.af2_klicktipp_choosable', (ev) => {
        const par = $($(ev.currentTarget).parent()).parent();
        let ex = false;
        if ($('#' + $(par).attr('id') + ' .af2_klicktipp_chooser.show')[0] !== undefined)
        {
            ex = true;
        }

        $('.af2_ac_chooser').each((i, el) => {
            $(el).removeClass('show');
        }).promise().done(() => {
            if (ex === true)
            {

            } else
            {
                $('#' + $(par).attr('id') + ' .af2_klicktipp_chooser').addClass('show');
            }
        });
    });

    /** When customize sidebar getting closed **/
    $('.af2_sidebar').on('close', (ev) => {
        if (ev.id === 'af2_customize_sidebar')
        {
            af2_activate_new_step();

            $(document).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', '.af2_sidebar', () => {
                $(document).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', '.af2_sidebar');
                af2_clear_editable_content();
                af2_sidebar_clear_content('af2_customize_sidebar');
            });
        }
    });

    $('.af2_content').addClass('full');

    /** Click into Nothing **/
    $('.af2_content').on('click', () => {

        if ($('.af2_editable_content:hover')[0] === undefined)
        {
            af2_close_sidebar('af2_customize_sidebar');
        }
    });

    $('#af2_zoom_in_button').on('click', (ev) => {
        if ($('#af2_form_section_content_marg_0')[0] !== undefined)
        {
            if (zoom < 1.10)
            {
                $('.af2_content').animate({'zoom': zoom += .1}, 'fast').promise().done(() => {
                    af2_update_connections();
                });
            }
        }
    });

    $('#af2_zoom_out_button').on('click', (ev) => {
        if ($('#af2_form_section_content_marg_0')[0] !== undefined)
        {
            if (zoom > 0.30)
            {
                $('.af2_content').animate({'zoom': zoom -= .1}, 'fast').promise().done(() => {
                    af2_update_connections();
                });

            }
        }
    });

    $('.af2_content').on('mousewheel', (ev) => {
        if ($('#af2_form_section_content_marg_0')[0] !== undefined)
        {
            ev.preventDefault();
            if (ev.originalEvent.deltaY > 0)
            {
                if (zoom > 0.30)
                {
                    $('.af2_content').animate({'zoom': zoom -= .1}, 'fast').promise().done(() => {
                        af2_update_connections();
                    });

                }
            } else
            {
                if (zoom < 1.10)
                {
                    $('.af2_content').animate({'zoom': zoom += .1}, 'fast').promise().done(() => {
                        af2_update_connections();
                    });
                }
            }
        }
    });

    // question search
    $('#af2_fragen_search').on('keyup', () => {
        var search_text = $('#af2_fragen_search').val().toLowerCase();
        $(".builder_question .af2_sb_text .af2_sb_p").each(function () {
            var s = $(this).text().toLowerCase();
            if (s.search(search_text) != -1) {
                $(this).parents('.af2_sidebar_content').show();
            } else {
                $(this).parents('.af2_sidebar_content').hide();
            }
        });
    })
    /**
     * WHEN REDO OR UNDO
     */
    $('.af2_whole').on('do', () => {
        af2_sidebar_clear_content('af2_customize_sidebar');
        af2_close_sidebar('af2_customize_sidebar');
    });


    /** DO on Object **/
    $(document).on('do_content', '.af2_editable_content', (ev) => {
        $(ev.currentTarget, ).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', () => {
            $(ev.currentTarget, ).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd');
            $(ev.currentTarget, ).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', () => {
                $(ev.currentTarget, ).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd');
                af2_remove_mark(ev.currentTarget);
            });
            af2_unmark_content(ev.currentTarget);
        });

        af2_mark_content(ev.currentTarget);
    });

    $.when(af2_update_sections()).done(() => {
        af2_update_connections();
    });


    $(document).on('click', '#af2_focus_button', (ev) => {
        if (af2_focus === 0)
        {
            af2_focus = 1;
            $('#af2_focus_button').html('<i class="fas fa-backward mr-1"></i>Zurück zur Ansicht');

            $('.af2_content').html('');
            $.when(af2_init_fe_edit()).done(() => {
                $.when(af2_fe_request('-1', af2_work_edit)).done(() => {
                });
            });

            af2_deactivateHooks();


        } else
        {
            af2_focus = 0;
            $('#af2_focus_button').html('<i class="far fa-edit mr-1"></i>Auswählen');

            af2_close_sidebar('af2_content_sidebar');
            af2_view = 1;
            af2_focus = 0;
            $('#af2_focus_button').removeClass('hide');
            $('.af2_content ').html('');
            $('.af2_content').removeClass('dragscroll');
            $('.af2_content').removeClass('full');
            $.when(af2_load_fb_settings()).done(() => {
            });
            af2_activateHooks();
        }
    });


    $(document).on('draggable_select', '.af2_draggable', (ev) => {
        if (drag_element === undefined)
        {
            drag_element = ev.currentTarget;
            let dragobj = {};

            if ($(ev.currentTarget).hasClass('af2_connector'))
            {
                dragobj = '<div class="phantom af2_drag_object"></div>';
                $.when(af2_dnd_set_element_position(dragobj, ev)).done(() => {
                    $('.af2_content').append(dragobj);
                });
            } else
            {
                if ($(ev.currentTarget).hasClass('af2_sidebar_content')) {
                    const id = $(ev.currentTarget).attr('id');
                    dragobj = $($('#' + id + ' .af2_sb_text')[0]).clone();
                    let bonus = $('#' + id + ' .af2_content_information').attr('id');
                    if (bonus === undefined) {
                        bonus = $(drag_element).attr('id').substr(12);
                    }
                    $(dragobj).attr('id', 'cont_' + bonus);
                } else
                {
                    dragobj = $(ev.currentTarget).clone();

                }

                $(dragobj).addClass('af2_drag_object');
                $(dragobj).addClass('hide');

                $.when(af2_dnd_set_element_position(dragobj, ev)).done(() => {
                    $('.af2_whole').append(dragobj);
                });
            }
        }

    });


    $(document).on('first_drag', '.af2_drag_object', (ev) => {


        //ADD DRAG ON BORDER
        window.addEventListener("mousemove", handleMousemove, false);

        af2_first_dragged = true;

        if (!($(drag_element).hasClass('af2_connector')))
        {
            $(document).on('mouseenter', '.af2_form_section_content_marg', (ev) => {
                $(ev.currentTarget).addClass('hover');
            });

            $(document).on('mouseleave', '.af2_form_section_content_marg', (ev) => {
                $(ev.currentTarget).removeClass('hover');
            });

            $.when(af2_dnd_set_element_position(ev.currentTarget, ev)).done(() => {
                $(ev.currentTarget).removeClass('hide');
            });

            $('.af2_form_section_content_marg').each((i, el) => {
                $(el).addClass('af2_drop_container');
                $(el).addClass('dotter_border');
            });
            $('.marg_pro').each((i, el) => {
                $(el).addClass('af2_pro_drop_container');
            });

            if (!($(drag_element).hasClass('af2_sidebar_content'))) {
                $(drag_element).addClass('getting_dragged');
                $($(drag_element).prev('.af2_form_section_content_marg')).addClass('hide');

                if ($('#af2_form_section_' + $(drag_element).data('section') + ' .af2_form_section_content').length === 1)
                {
                    $($(drag_element).parent()).addClass('hide');
                    $($('#af2_form_section_marg_' + $(drag_element).data('section'))).addClass('hide');
                }
            }

            $.when(af2_update_connections()).done(() => {
                if (!($(drag_element).hasClass('af2_sidebar_content'))) {
                    if (!($(drag_element).hasClass('af2_connector'))) {

                        $('.connectingLines').each((i, el) => {
                            if ($(el).data('sec').toString() === $(drag_element).data('section').toString())
                            {
                                if ($(el).data('cont').toString() === $(drag_element).attr('id').substr(25).toString())
                                {
                                    $(el).remove();
                                }
                            } else if ($(el).data('tosec').toString() === $(drag_element).data('section').toString())
                            {
                                if ($(el).data('tocont').toString() === $(drag_element).attr('id').substr(25).toString())
                                {
                                    $(el).remove();
                                }
                            }
                        });

                    }
                }
            });
        } else
        {
            let parent = $($($(drag_element).parent()).parent());
            if ($(parent).hasClass('af2_question_content_answer_block'))
            {
                parent = $(parent).parent();
            }



            $('.connectingLines').each((i, el) => {

                if ($(el).data('sec').toString() === parent.data('section').toString())
                {
                    if ($(el).data('cont').toString() === parent.attr('id').substr(25).toString())
                    {

                        let value = -1;

                        if (!($($(drag_element).parent()).hasClass('af2_question_content_question')))
                        {
                            value = $($(drag_element).parent()).attr('id').substr(28);
                        }

                        if ($(el).data('connector').toString() === value.toString())
                        {
                            $(el).remove();
                            af2_exists = true;
                        }
                    }
                }

            }).promise().done(() => {
                af2_dnd_set_element_position_without_offs(ev.currentTarget, ev);
                $('.af2_content').append(createLine($(drag_element), $(ev.currentTarget), null, null, 'visual', undefined, null, null));

                $('.af2_form_section_content').each((i, el) => {
                    if ($(el).data('section') > parent.data('section'))
                    {

                        $(el).addClass('af2_drop_container');

                        $(document).on('mouseenter', '#af2_form_section_' + $(el).data('section') + '#' + $(el).attr('id'), (ev) => {
                            $(el).addClass('hover');
                        });

                        $(document).on('mouseleave', '#af2_form_section_' + $(el).data('section') + '#' + $(el).attr('id'), (ev) => {
                            $(el).removeClass('hover');
                        });
                    }
                });
            });
        }

    });

    $(document).on('drag', '.af2_drag_object', (ev) => {

        if ($(drag_element).hasClass('af2_connector'))
        {
            af2_dnd_set_element_position_without_offs(ev.currentTarget, ev);
            $('.connectingLines.visual').each((i, el) => {
                $(el).remove();
            });
            $('.af2_content').append(createLine($(drag_element), $(ev.currentTarget), null, null, 'visual', undefined, null, null));
        } else
        {
            af2_dnd_set_element_position(ev.currentTarget, ev);

        }
    });

    $(document).on('drop', '.af2_drag_object', (ev) => {

        window.removeEventListener("mousemove", handleMousemove, false);

        $('.connectingLines.visual').each((i, el) => {
            $(el).remove();
        });
        $(ev.currentTarget).remove();

        if (!($(ev.currentTarget).hasClass('af2_sidebar_content')))
        {
            $(drag_element).removeClass('getting_dragged');
        }

        $('.af2_form_section_content_marg').each((i, el) => {
            $(el).removeClass('af2_drop_container');
            $(el).removeClass('dotter_border');
            $(el).removeClass('hover');
            $(el).removeClass('hide');
        });
        $('.marg_pro').each((i, el) => {
            $(el).removeClass('af2_pro_drop_container');
        });

        $('.af2_form_section.hide').each((i, el) => {
            $(el).removeClass('hide');
        });
        $('.af2_form_section_marg.hide').each((i, el) => {
            $(el).removeClass('hide');
        });

        $('.hover').each((i, el) => {
            $(el).removeClass('hover');
        });

        if ($(drag_element).hasClass('af2_connector'))
        {
            let parent = $($($(drag_element).parent()).parent());
            if ($(parent).hasClass('af2_question_content_answer_block'))
            {
                parent = $(parent).parent();
            }
            $('.af2_drop_container').each((i, el) => {
                $(el).removeClass('af2_drop_container');
                $(el).removeClass('hover');
            });

            $('.marg_pro').each((i, el) => {
                $(el).removeClass('af2_pro_drop_container');
            });

            $('.af2_form_section_content').each((i, el) => {
                if ($(el).data('section') > parent.data('section'))
                {
                    $(el).addClass('af2_drop_container');

                    $(document).off('mouseenter', '#af2_form_section_' + $(el).data('section') + '#' + $(el).attr('id'));

                    $(document).off('mouseleave', '#af2_form_section_' + $(el).data('section') + '#' + $(el).attr('id'));
                }
            });

            $('.marg_pro').each((i, el) => {
                $(el).addClass('af2_pro_drop_container');
            });


            if (af2_exists === true)
            {
                let parent = $($($(drag_element).parent()).parent());
                if ($(parent).hasClass('af2_question_content_answer_block'))
                {
                    parent = $(parent).parent();
                }
                const containerfrom = $(parent).attr('id').substr(25);
                const sectionfrom = $(parent).data('section');

                let connector = '';

                if ($($(drag_element).parent()).hasClass('af2_question_content_answer'))
                {
                    connector = $($(drag_element).parent()).attr('id').substr(28);
                } else
                {
                    connector = -1;
                }

                const arr = [{"arg": "typ", "content": "delete"},
                    {"arg": "containerfrom", "content": containerfrom}, {"arg": "sectionfrom", "content": sectionfrom},
                    {"arg": "connector", "content": connector}];

                af2_throw_event('dropped_connection', arr, '.af2_whole');
            }
        }

        af2_exists = false;
        drag_element = undefined;

        af2_update_connections();
    });

    $(document).on('drop_into', '.af2_drag_object', (ev) => {

        window.removeEventListener("mousemove", handleMousemove, false);

        $('.connectingLines.visual').each((i, el) => {
            $(el).remove();
        });
        $('.af2_content').addClass('dragscroll');
        $(ev.currentTarget).remove();

        if (!($(drag_element).hasClass('af2_sidebar_content')))
        {
            $(drag_element).removeClass('getting_dragged');
        }

        $('.af2_form_section_content_marg').each((i, el) => {
            $(el).removeClass('af2_drop_container');
            $(el).removeClass('dotter_border');
            $(el).removeClass('hover');
            $(el).removeClass('hide');
        });

        $('.marg_pro').each((i, el) => {
            $(el).removeClass('af2_pro_drop_container');
        });

        $('.hover').each((i, el) => {
            $(el).removeClass('hover');
        });

        $('.af2_form_section.hide').each((i, el) => {
            $(el).removeClass('hide');
        });

        $('.af2_form_section_marg.hide').each((i, el) => {
            $(el).removeClass('hide');
        });

        $('.af2_drop_container').each((i, el) => {
            $(el).removeClass('af2_drop_container');
        });

        const cont = ev.into;

        if ($(drag_element).hasClass('af2_connector'))
        {
            const container = $(cont).attr('id').substr(25);
            const section = $(cont).data('section');
            let parent = $($($(drag_element).parent()).parent());
            if ($(parent).hasClass('af2_question_content_answer_block'))
            {
                parent = $(parent).parent();
            }

            $('.af2_form_section_content').each((i, el) => {
                if ($(el).data('section') > parent.data('section'))
                {
                    $(el).removeClass('af2_drop_container');

                    $(document).off('mouseenter', '#af2_form_section_' + $(el).data('section') + '#' + $(el).attr('id'));

                    $(document).off('mouseleave', '#af2_form_section_' + $(el).data('section') + '#' + $(el).attr('id'));
                }
            });

            const containerfrom = $(parent).attr('id').substr(25);
            const sectionfrom = $(parent).data('section');

            let connector = '';

            if ($($(drag_element).parent()).hasClass('af2_question_content_answer'))
            {
                connector = $($(drag_element).parent()).attr('id').substr(28);
            } else
            {
                connector = -1;
            }
            const arr = [{"arg": "typ", "content": "insert"}, {"arg": "container", "content": container}, {"arg": "section", "content": section},
                {"arg": "containerfrom", "content": containerfrom}, {"arg": "sectionfrom", "content": sectionfrom},
                {"arg": "connector", "content": connector}];
            af2_throw_event('dropped_connection', arr, '.af2_whole');
        } else
        {
            if ($(drag_element).hasClass('af2_sidebar_content'))
            {
                const container = $(cont).attr('id').substr(30);
                const section = $(cont).data('section');
                let dataid = $(ev.currentTarget).attr('id').substr(5);

                if (dataid === undefined || dataid.trim() === '')
                {
                    if ($(drag_element).attr('id') === 'sb_ac')
                    {
                        dataid = "activecampaign:";
                    }
                    if ($(drag_element).attr('id') === 'sb_dnp')
                    {
                        dataid = "dealsnprojects:";
                    }
                    if ($(drag_element).attr('id') === 'sb_redirect')
                    {
                        dataid = "redirect:";
                    }
                    if ($(drag_element).attr('id') === 'sb_klicktipp')
                    {
                        dataid = "klicktipp:";
                    }
                }

                let typ = '';
                if ($($(ev.into).parent()).hasClass('af2_form_section_marg'))
                {
                    typ = 'from_sb_into_marg';
                } else
                {
                    typ = 'from_sb_into_section';
                }
                const arr = [{"arg": "container", "content": container}, {"arg": "section", "content": section},
                    {"arg": "typ", "content": typ}, {"arg": "dataid", "content": dataid}];
                af2_throw_event('dropped_into_container', arr, '.af2_whole');
            } else
            {
                const container = $(cont).attr('id').substr(30);
                const section = $(cont).data('section');
                const containerfrom = $(drag_element).attr('id').substr(25);
                const sectionfrom = $(drag_element).data('section');
                let typ = '';
                if ($($(ev.into).parent()).hasClass('af2_form_section_marg'))
                {
                    typ = 'from_content_into_marg';
                } else
                {
                    typ = 'from_content_into_section';
                }
                const arr = [{"arg": "container", "content": container}, {"arg": "section", "content": section},
                    {"arg": "typ", "content": typ}, {"arg": "containerfrom", "content": containerfrom}, {"arg": "sectionfrom", "content": sectionfrom}];
                af2_throw_event('dropped_into_container', arr, '.af2_whole');
            }
        }



        af2_exists = false;
        drag_element = undefined;


    });





    let sec = 0;
    let cont = 0;
    let from_stack = [];
    let type_stack = [];
    let actualType = undefined;
    let dataid = af2_id;
    let answer_stack = [];
    let size = 0;
});

const af2_activateHooks = () => {
    $(document).on('mouseenter', '.af2_answer_card', (ev) => {
        $(ev.currentTarget).css('border', '3px solid ' + af2_jsonobj.styling.main_color);
    });
    $(document).on('mouseleave', '.af2_answer_card', (ev) => {
        if (!($(ev.currentTarget).hasClass('selected')))
        {
            $(ev.currentTarget).css('border', '3px solid rgba(0,0,0,0)');
        }
    });

    $(document).on('click', '.af2_back_button', (ev) => {
        af2_back_request();
    });

    $(document).on('click', '.af2_answer_wrapper', (ev) => {

        if (type_stack[type_stack.length - 1] === 'af2_multiselect')
        {
            $('#' + $(ev.currentTarget).attr('id') + ' .af2_answer_card').toggleClass('selected');
            if ($('#' + $(ev.currentTarget).attr('id') + ' .af2_answer_card').hasClass('selected'))
            {
                $('#' + $(ev.currentTarget).attr('id') + ' .af2_answer_card').css('border', '3px solid ' + af2_jsonobj.styling.main_color);
            } else
            {
                $('#' + $(ev.currentTarget).attr('id') + ' .af2_answer_card').css('border', '3px solid rgba(0,0,0,0)');
            }

            if ($('.af2_answer_card.selected').length > 0)
            {
                $('.af2_foward_button').removeClass('disabled');
            } else
            {
                $('.af2_foward_button').addClass('disabled');
            }
        } else
        {
            const clicked = $(ev.currentTarget).data('answer');

            af2_fe_request(clicked, af2_work);

            $('.af2_foward_button').addClass('disabled');
        }
    });

    $(document).on('click', '.af2_foward_button', (ev) => {
        af2_fe_request('multi', af2_work);

        $('.af2_foward_button').addClass('disabled');
    });
};

const af2_deactivateHooks = () => {
    $(document).off('click', '.af2_back_button');
    $(document).off('click', '.af2_answer_wrapper');
    $(document).off('click', '.af2_foward_button');
    $(document).off('mouseenter', '.af2_answer_card');
    $(document).off('mouseleave', '.af2_answer_card');
};

const af2_update_sections = () => {

    let x = 0;
    $(af2_jsonobj.sections).each((i) => {
        af2_update_section(i);
        x++;
    }).promise().done(() => {

        if ($('.af2_form_section').length > af2_jsonobj.sections.length)
        {
            if ($('.af2_form_section_marg.full')[0] !== undefined)
            {
                $('.af2_form_section_marg.full').remove();
            }
            while ($('.af2_form_section').length > af2_jsonobj.sections.length)
            {
                $('.af2_form_section')[($('.af2_form_section').length) - 1].remove();
                $('.af2_form_section_marg')[($('.af2_form_section_marg').length) - 1].remove();
            }
        }
        if ($('#af2_form_section_marg_' + x + '.full')[0] === undefined)
        {
            $('.af2_content').append(af2_create_empty_section_marg(x, true));
        }


        af2_update_connections();

        af2_restric_max_count();
    });
};

const af2_update_section = (pos) => {
    if ($('#af2_form_section_' + pos)[0] === undefined)
    {
        if ($('.af2_form_section_marg.full')[0] !== undefined)
        {
            $($('.af2_form_section_marg.full')[0]).removeClass('full');
        } else
        {
            $('.af2_content').append(af2_create_empty_section_marg(pos, false));
        }

        $('.af2_content').append(af2_create_empty_section(pos));
    }

    af2_update_contents(pos);
};

const af2_update_contents = (pos) => {
    let y = 0;
    $(af2_jsonobj.sections[pos].contents).each((i) => {
        af2_update_content(i, pos);
        y++;
    }).promise().done(() => {
        const selector = '#af2_form_section_' + pos;
        if ($(selector + ' .af2_form_section_content').length > af2_jsonobj.sections[pos].contents.length)
        {
            if ($(selector + ' .af2_form_section_content_marg.full')[0] !== undefined)
            {
                $(selector + ' .af2_form_section_content_marg.full').remove();
            }
            while ($(selector + ' .af2_form_section_content').length > af2_jsonobj.sections[pos].contents.length)
            {
                $(selector + ' .af2_form_section_content')[($(selector + ' .af2_form_section_content').length) - 1].remove();
                $(selector + ' .af2_form_section_content_marg')[($(selector + ' .af2_form_section_content_marg').length) - 1].remove();
            }
        }
        if ($('#af2_form_section_' + pos + ' #af2_form_section_content_marg_' + y)[0] === undefined)
        {
            $('#af2_form_section_' + pos).append(af2_create_empty_section_content_marg(y, pos, true));
        }
    });
};

const af2_update_content = (i, pos) => {
    const section_selector = '#af2_form_section_' + pos;

    const contentid = af2_jsonobj.sections[pos].contents[i].data;

    if ($(section_selector + ' #af2_form_section_content_' + i)[0] === undefined)
    {
        if ($(section_selector + ' .af2_form_section_content_marg.full')[0] !== undefined)
        {
            $($(section_selector + ' .af2_form_section_content_marg.full')[0]).removeClass('full');
        } else
        {
            $(section_selector).append(af2_create_empty_section_content_marg(i, pos, false));
        }

        $(section_selector).append(af2_create_empty_section_content(i, pos, -10));
    }

    if (af2_jsonobj.sections[pos].contents[i].data.includes('redirect:') ||
            af2_jsonobj.sections[pos].contents[i].data.includes('dealsnprojects:') ||
            af2_jsonobj.sections[pos].contents[i].data.includes('klicktipp:') ||
            af2_jsonobj.sections[pos].contents[i].data.includes('activecampaign:'))
    {
        $($(section_selector + ' #af2_form_section_content_' + i)[0]).attr('data-contentid', contentid);
        $.when(af2_generate_section_content(i, pos, 1)).done(() => {
            $(section_selector + ' #af2_form_section_content_' + i).html(af2_gotContent1[0]);

            if (af2_gotContent1[1] !== undefined)
            {
                $(section_selector + ' #af2_form_section_content_' + i + ' #inline_got').append(af2_gotContent1[1]);

                if (af2_gotContent1[2] !== undefined)
                {
                    $(section_selector + ' #af2_form_section_content_' + i).append(af2_gotContent1[2]);
                }
            }
        });
    } else if (contentid !== $($(section_selector + ' #af2_form_section_content_' + i)[0]).attr('data-contentid') ||
            $('#af2_content_' + contentid + ' .af2_content_information')[0] === undefined ||
            JSON.parse($('#af2_content_' + contentid + ' .af2_content_information').html()).typ === 'af2_slider')
    {
        $($(section_selector + ' #af2_form_section_content_' + i)[0]).attr('data-contentid', contentid);

        $.when(af2_generate_section_content(i, pos, 0)).done(() => {
            $(section_selector + ' #af2_form_section_content_' + i).html(af2_gotContent[0]);

            if (af2_gotContent[1] !== undefined)
            {
                $(section_selector + ' #af2_form_section_content_' + i + ' #inline_got').append(af2_gotContent[1]);

                if (af2_gotContent[2] !== undefined)
                {
                    $(section_selector + ' #af2_form_section_content_' + i).append(af2_gotContent[2]);
                }
            }
        });


    }

    if (af2_jsonobj.sections[pos].contents[i].hide)
    {
        $(section_selector + ' #af2_form_section_content_' + i + ' .af2_question_content_answer_block').addClass('hide');
    } else
    {
        $(section_selector + ' #af2_form_section_content_' + i + ' .af2_question_content_answer_block').removeClass('hide');
    }
};

const af2_restric_max_count = () => {
    /*
     * check the existing elemenet count in cavas
     * IF existing element has reached max count (5) then disable adding more elements
     */

    let existing_length = $(".af2_form_section_marg").length;
    if (existing_length >= 6) {
        $(".af2_form_section_marg").addClass("marg_pro");
        $(".af2_form_section_marg").find("div").removeClass("af2_form_section_content_marg");
    } else {
        $(".af2_form_section_marg").removeClass("marg_pro");
        $(".af2_form_section_marg").find("div").addClass("af2_form_section_content_marg");
    }
}

const af2_update_connections = () => {
    $('.connectingLines').each((i, el) => {
        $(el).remove();
    }).promise().done(() => {
        $(af2_jsonobj.sections).each((i, el) => {
            af2_update_connection_section(i, false);
        });
    });
};

const af2_update_connection_section = (pos, del) => {
    if (del === true)
    {
        $('.connectingLines').each((a, el) => {
            if ($(el).data('sec') === pos)
            {
                $(el).remove();
            }
        });
    }

    $(af2_jsonobj.sections[pos].contents).each((y, e) => {
        af2_update_connection_content(y, pos, false);
    });
};

const af2_update_connection_content = (i, pos, del) => {
    if (del === true)
    {
        $('.connectingLines').each((a, el) => {
            if ($(el).data('sec') === pos && $(el).data('cont') === i)
            {
                $(el).remove();
            }
        });
    }

    let section;
    let container;

    const e = af2_jsonobj.sections[pos].contents[i];
    if (e.connections !== undefined)
    {
        $(e.connections).each((z, elem) => {

            const from = elem.from;
            section = elem['to_section'];
            container = elem['to_content'];

            if (section !== '' && container !== '')
            {
                let element1 = $('#af2_form_section_' + pos + ' #af2_form_section_content_' + i + ' #af2_question_content_answer_' + from + ' .af2_connector');
                if (from === -1)
                {
                    element1 = $('#af2_form_section_' + pos + ' #af2_form_section_content_' + i + ' .af2_question_content_question .af2_connector');
                }
                if (e.hide === true && $('#af2_form_section_' + pos + ' #af2_form_section_content_' + i + ' .af2_add_connection_button')[0] === undefined)
                {
                    element1 = $('#af2_form_section_' + pos + ' #af2_form_section_content_' + i + ' .af2_question_content_question .af2_connector');
                }
                let element2 = $('#af2_form_section_' + section + ' #af2_form_section_content_' + container + ' .af2_question_content_question .af2_docer');
                if ($(element2)[0] === undefined)
                {
                    element2 = $('#af2_form_section_' + section + ' #af2_form_section_content_' + container + ' .af2_docer');
                }

                const connector = from;

                $('.af2_content').append(createLine(element1, element2, pos, i, '', connector, elem['to_section'], elem['to_content']));
            }
        });
    }
};
const af2_create_empty_section_marg = (id, full) => {
    const wide = full ? 'full' : '';
    return '<div id="af2_form_section_marg_' + id + '" class="af2_form_section_marg ' + wide + '">' +
            '<div id="af2_form_section_content_marg_0" class="af2_form_section_content_marg full" data-section="' + id + '"></div></div>';
};

const af2_create_empty_section = (id) => {
    return '<div id="af2_form_section_' + id + '" class="af2_form_section">' +
            '<div id="af2_form_section_content_marg_0" class="af2_form_section_content_marg full" data-section="' + id + '"></div></div>';
};

const af2_create_empty_section_content_marg = (id, pos, full) => {
    const wide = full ? 'full' : '';
    return '<div id="af2_form_section_content_marg_' + id + '" class="af2_form_section_content_marg ' + wide + '" data-section="' + pos + '">';
};

const af2_create_empty_section_content = (id, pos, cont) => {
    return '<div id="af2_form_section_content_' + id + '" class="af2_form_section_content af2_editable_content af2_draggable deleteable" data-section="' + pos + '" data-contentid="' + cont + '"></div>';
};

const af2_generate_section_content = (id, pos, got) => {
    const dataid = af2_jsonobj.sections[pos].contents[id].data;
    let content = '';


    if (dataid.includes('redirect:'))
    {
        content += '<div id="inline_got" class="af2_redirect_element" style="display: flex; align-items: center">';
        content += '<div class="af2_docer"></div>';
        content += '<div class="af2_sb_text">';
        content += '<p class="af2_sb_p">';
        content += '<i class="fas fa-external-link-alt mr-2"></i>Redirect:';
        content += '</p></div>';
        content += '</div>';
        content += '<div class="af2_question_content_answer_block">';
        let v = '';
        if (dataid !== 'redirect:')
        {
            v = dataid.substr('9');
        }
        let pro = '';
        if (af2_jsonobj.sections[pos].contents[id].newtab === undefined)
        {

        } else
        {
            if (af2_jsonobj.sections[pos].contents[id].newtab === true)
            {
                pro = 'checked';
            } else
            {

            }
        }
        content += '<input class="af2_redirect_content form-control" type="text" placeholder="Redirect-Page" value="' + v + '">';
        // content += '<input class="af2_redirect_checkbox" type="checkbox" '+pro+' ><div>In neuem Tab öffnen!</div>';
        content += '</div>';


        if (got === 0)
        {
            af2_gotContent = [content];
        } else
        {
            af2_gotContent1 = [content];
        }
        return null;
    } else if (dataid.includes('klicktipp:'))
    {
        content += '<div id="inline_got" class="af2_klicktipp_element" style="display: flex; align-items: center">';
        content += '<div class="af2_docer"></div>';
        content += '<div class="af2_sb_text">';
        content += '<p class="af2_sb_p">';
        content += '<i class="fas fa-rocket mr-2"></i>KlickTipp:';
        content += '</p></div>';
        content += '</div>';
        content += '<div class="af2_question_content_answer_block">';


        if (af2_jsonobj.sections[pos].contents[id].incoming_connections !== undefined && af2_jsonobj.sections[pos].contents[id].incoming_connections.length === 1) {
            const s = af2_jsonobj.sections[pos].contents[id].incoming_connections[0];
            const fs = s.from_section;
            const fc = s.from_content;
            const dat = af2_jsonobj.sections[fs].contents[fc].data;

            if ($('#af2_content_' + dat + ' .af2_content_information')[0] === undefined) {
                let obj = $('#' + dat + '.af2_contact_form_information').html();
                obj = obj.replace("/\\/g", "\\\\");
                obj = JSON.parse(obj);
                let questions = obj.questions;

                const klicktippdata = af2_jsonobj.sections[pos].contents[id].klicktipp_data;
                const mail = klicktippdata.mail.trim() !== '' ? '[' + questions[klicktippdata.mail].id + ']' : 'Auswählen...';
                let tag = 'Auswählen...';

                if (klicktippdata.tag.trim() !== '')
                {
                    tag = klicktipp_tag_array[klicktippdata.tag];
                }

                let process = 'Auswählen...';

                if (klicktippdata.process.trim() !== '')
                {
                    process = klicktipp_field_array[klicktippdata.process];

                    if (process === '')
                    {
                        process = 'Vordefinierter Prozess';
                    }
                }

                const vorname = klicktippdata.vorname.trim() !== '' ? '[' + questions[klicktippdata.vorname].id + ']' : 'Auswählen...';
                const name = klicktippdata.name.trim() !== '' ? '[' + questions[klicktippdata.name].id + ']' : 'Auswählen...';
                const firma = klicktippdata.firma.trim() !== '' ? '[' + questions[klicktippdata.firma].id + ']' : 'Auswählen...';
                const telefon = klicktippdata.telefon.trim() !== '' ? '[' + questions[klicktippdata.telefon].id + ']' : 'Auswählen...';



                content += '<div class="af2_fob_subheading">Kontaktdaten:</div>';
                content += '<div class="af2_seperator"></div>';
                content += '<div id = "af2_klicktipp_mail" class="marg-bot">';
                content += '<div style="display:flex; align-items: center;">';
                content += 'Mail: *<div id="klicktipp_mail_click" class="af2_klicktipp_choosable btn btn-primary">' + mail + '</div>';
                content += '</div>';
                content += '<div class="af2_klicktipp_chooser">';
                content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                $(questions).each((i, el) => {
                    content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                }).promise().done(() => {
                    content += '</div></div>';

                    content += '<div id = "af2_klicktipp_tag" class="marg-bot">';
                    content += '<div style="display:flex; align-items: center;">';
                    content += 'Tag: <div id="klicktipp_tag_click" class="af2_klicktipp_choosable btn btn-primary free-height">' + tag + '</div>';
                    content += '</div>';
                    content += '<div class="af2_klicktipp_chooser">';
                    content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';

                    let keys = Object.keys(klicktipp_tag_array);

                    $(keys).each((i, el) => {
                        content += '<div id="' + el + '" class="af2_chooser">[' + klicktipp_tag_array[el] + ']</div>';
                    }).promise().done(() => {
                        content += '</div></div>';

                        content += '<div id = "af2_klicktipp_process" class="marg-bot">';
                        content += '<div style="display:flex; align-items: center;">';
                        content += 'Double-Opt-In: <div id="klicktipp_process_click" class="af2_klicktipp_choosable btn btn-primary free-height">' + process + '</div>';
                        content += '</div>';
                        content += '<div class="af2_klicktipp_chooser">';
                        content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';

                        let keys = Object.keys(klicktipp_field_array);

                        $(keys).each((i, el) => {
                            content += '<div id="' + el + '" class="af2_chooser">[' + klicktipp_field_array[el] + ']</div>';
                        }).promise().done(() => {
                            content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
                            content += '<div class="af2_fob_subheading">Custom Felder:</div>';
                            content += '<div class="af2_seperator"></div>';

                            content += '<div id = "af2_klicktipp_name" class="marg-bot">';
                            content += '<div style="display:flex; align-items: center;">';
                            content += 'Name: <div id="klicktipp_name_click" class="af2_klicktipp_choosable btn btn-primary">' + name + '</div>';
                            content += '</div>';
                            content += '<div class="af2_klicktipp_chooser">';
                            content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                            $(questions).each((i, el) => {
                                content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                            }).promise().done(() => {
                                content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////

                                content += '<div id = "af2_klicktipp_vorname" class="marg-bot">';
                                content += '<div style="display:flex; align-items: center;">';
                                content += 'Vorname: <div id="klicktipp_vorname_click" class="af2_klicktipp_choosable btn btn-primary">' + vorname + '</div>';
                                content += '</div>';
                                content += '<div class="af2_klicktipp_chooser">';
                                content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                                $(questions).each((i, el) => {
                                    content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                                }).promise().done(() => {
                                    content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////

                                    content += '<div id = "af2_klicktipp_telefon" class="marg-bot">';
                                    content += '<div style="display:flex; align-items: center;">';
                                    content += 'Telefon: <div id="klicktipp_telefon_click" class="af2_klicktipp_choosable btn btn-primary">' + telefon + '</div>';
                                    content += '</div>';
                                    content += '<div class="af2_klicktipp_chooser">';
                                    content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                                    $(questions).each((i, el) => {
                                        content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                                    }).promise().done(() => {
                                        content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////

                                        content += '<div id = "af2_klicktipp_firma" class="marg-bot">';
                                        content += '<div style="display:flex; align-items: center;">';
                                        content += 'Firma: <div id="klicktipp_firma_click" class="af2_klicktipp_choosable btn btn-primary">' + firma + '</div>';
                                        content += '</div>';
                                        content += '<div class="af2_klicktipp_chooser">';
                                        content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                                        $(questions).each((i, el) => {
                                            content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                                        }).promise().done(() => {
                                            content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////

                                            content += '</div>';

                                            content += '</div>';

                                            if (got === 0) {
                                                af2_gotContent = [content];
                                            } else {
                                                af2_gotContent1 = [content];
                                            }
                                            return null;

                                        });

                                    });

                                });

                            });


                        });


                    });
                });
                /**
                 $(questions).each((i, el) => {
                 content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                 }).promise().done(() => { **/

                /**});**/

            }
        } else
        {
            content += '</div>';

            if (got === 0) {
                af2_gotContent = [content];
            } else {
                af2_gotContent1 = [content];
            }
            return null;
        }
    } else if (dataid.includes('activecampaign:'))
    {
        content += '<div id="inline_got" class="af2_ac_element" style="display: flex; align-items: center">';
        content += '<div class="af2_docer"></div>';
        content += '<div class="af2_sb_text">';
        content += '<p class="af2_sb_p">';
        content += '<i class="fas fa-rocket mr-2"></i>ActiveCampaign:';
        content += '</p></div>';
        content += '</div>';
        content += '<div class="af2_question_content_answer_block">';


        if (af2_jsonobj.sections[pos].contents[id].incoming_connections !== undefined && af2_jsonobj.sections[pos].contents[id].incoming_connections.length === 1) {
            const s = af2_jsonobj.sections[pos].contents[id].incoming_connections[0];
            const fs = s.from_section;
            const fc = s.from_content;
            const dat = af2_jsonobj.sections[fs].contents[fc].data;

            if ($('#af2_content_' + dat + ' .af2_content_information')[0] === undefined) {
                let obj = $('#' + dat + '.af2_contact_form_information').html();
                obj = obj.replace("/\\/g", "\\\\");
                obj = JSON.parse(obj);
                let questions = obj.questions;

                const acdata = af2_jsonobj.sections[pos].contents[id].ac_data;
                const vorname = acdata.vorname.trim() !== '' ? '[' + questions[acdata.vorname].id + ']' : 'Auswählen...';
                const name = acdata.name.trim() !== '' ? '[' + questions[acdata.name].id + ']' : 'Auswählen...';
                const telefon = acdata.telefon.trim() !== '' ? '[' + questions[acdata.telefon].id + ']' : 'Auswählen...';
                const mail = acdata.mail.trim() !== '' ? '[' + questions[acdata.mail].id + ']' : 'Auswählen...';
                let listitem = 'Auswählen...';
                if (acdata.liste.trim() !== '')
                {
                    listitem = idlist[acdata.liste];
                }

                content += '<div class="af2_fob_subheading">Kontaktdaten:</div>';
                content += '<div class="af2_seperator"></div>';
                content += '<div id = "af2_ac_vorname" class="marg-bot">';
                content += '<div style="display:flex; align-items: center;">';
                content += 'Vorname: <div id="ac_vorname_click" class="af2_ac_choosable btn btn-primary">' + vorname + '</div>';
                content += '</div>';
                content += '<div class="af2_ac_chooser">';
                content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                $(questions).each((i, el) => {
                    content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                }).promise().done(() => {
                    content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////
                    content += '<div id = "af2_ac_name" class="marg-bot">';
                    content += '<div style="display:flex; align-items: center;">';
                    content += 'Name: <div id="ac_name_click" class="af2_ac_choosable btn btn-primary">' + name + '</div>';
                    content += '</div>';
                    content += '<div class="af2_ac_chooser">';
                    content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                    $(questions).each((i, el) => {
                        content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                    }).promise().done(() => {
                        content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////
                        content += '<div id = "af2_ac_telefon" class="marg-bot">';
                        content += '<div style="display:flex; align-items: center;">';
                        content += 'Telefon: <div id="ac_telefon_click" class="af2_ac_choosable btn btn-primary">' + telefon + '</div>';
                        content += '</div>';
                        content += '<div class="af2_ac_chooser">';
                        content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                        $(questions).each((i, el) => {
                            content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                        }).promise().done(() => {
                            content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////
                            content += '<div id = "af2_ac_mail" class="marg-bot">';
                            content += '<div style="display:flex; align-items: center;">';
                            content += 'E-Mail: * <div id="ac_mail_click" class="af2_ac_choosable btn btn-primary">' + mail + '</div>';
                            content += '</div>';
                            content += '<div class="af2_ac_chooser">';
                            content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                            $(questions).each((i, el) => {
                                content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                            }).promise().done(() => {
                                content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////

                                content += '<div class="af2_fob_subheading mt-4">Listendaten:</div>';
                                content += '<div class="af2_seperator"></div>';

                                content += '<div id = "af2_ac_liste" class="marg-bot">';
                                content += '<div style="display:flex; align-items: center;">';
                                content += 'Liste: * <div id="ac_licte_click" class="af2_ac_choosable btn btn-primary free-height">' + listitem + '</div>';
                                content += '</div>';
                                content += '<div class="af2_ac_chooser">';
                                content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';

                                /** Lists api request **/


                                $(Object.keys(idlist)).each((i, el) => {
                                    content += '<div id="' + el + '" class="af2_chooser">' + idlist[el] + '</div>';
                                }).promise().done(() => {
                                    content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////

                                    content += '</div>';

                                    content += '</div>';

                                    if (got === 0) {
                                        af2_gotContent = [content];
                                    } else {
                                        af2_gotContent1 = [content];
                                    }
                                    return null;
                                });
                                /**
                                 $(questions).each((i, el) => {
                                 content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                                 }).promise().done(() => { **/

                                /**});**/
                            });
                        });
                    });
                });
            }
        } else
        {
            content += '</div>';

            if (got === 0) {
                af2_gotContent = [content];
            } else {
                af2_gotContent1 = [content];
            }
            return null;
        }
    } else if (dataid.includes('dealsnprojects:'))
    {
        content += '<div id="inline_got" class="af2_dnp_element" style="display: flex; align-items: center">';
        content += '<div class="af2_docer"></div>';
        content += '<div class="af2_sb_text">';
        content += '<p class="af2_sb_p">';
        content += '<i class="fas fa-rocket mr-2"></i>Deals & Projects:';
        content += '</p></div>';
        content += '</div>';
        content += '<div class="af2_question_content_answer_block">';


        if (af2_jsonobj.sections[pos].contents[id].incoming_connections !== undefined && af2_jsonobj.sections[pos].contents[id].incoming_connections.length === 1)
        {
            const s = af2_jsonobj.sections[pos].contents[id].incoming_connections[0];
            const fs = s.from_section;
            const fc = s.from_content;
            const dat = af2_jsonobj.sections[fs].contents[fc].data;

            if ($('#af2_content_' + dat + ' .af2_content_information')[0] === undefined)
            {
                let obj = $('#' + dat + '.af2_contact_form_information').html();
                obj = obj.replace("/\\/g", "\\\\");
                obj = JSON.parse(obj);
                let questions = obj.questions;

                const dnpdata = af2_jsonobj.sections[pos].contents[id].dnp_data;

                const bezeichnung = dnpdata.bezeichnung.trim();

                const vorname = dnpdata.vorname.trim() !== '' ? '[' + questions[dnpdata.vorname].id + ']' : 'Auswählen...';
                const name = dnpdata.name.trim() !== '' ? '[' + questions[dnpdata.name].id + ']' : 'Auswählen...';
                const organisation = dnpdata.organisation.trim() !== '' ? '[' + questions[dnpdata.organisation].id + ']' : 'Auswählen...';
                const telefon = dnpdata.telefon.trim() !== '' ? '[' + questions[dnpdata.telefon].id + ']' : 'Auswählen...';
                const mail = dnpdata.mail.trim() !== '' ? '[' + questions[dnpdata.mail].id + ']' : 'Auswählen...';
                const strasse = dnpdata.strasse.trim() !== '' ? '[' + questions[dnpdata.strasse].id + ']' : 'Auswählen...';
                const plz = dnpdata.plz.trim() !== '' ? '[' + questions[dnpdata.plz].id + ']' : 'Auswählen...';
                const stadt = dnpdata.stadt.trim() !== '' ? '[' + questions[dnpdata.stadt].id + ']' : 'Auswählen...';


                content += '<div class="af2_fob_subheading">Kontaktdaten:</div>';
                content += '<div class="af2_seperator"></div>';
                content += '<div id = "af2_dnp_vorname" class="marg-bot">';
                content += '<div style="display:flex; align-items: center;">';
                content += 'Vorname: <div id="dnp_vorname_click" class="af2_dnp_choosable btn btn-primary">' + vorname + '</div>';
                content += '</div>';
                content += '<div class="af2_dnp_chooser">';
                content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                $(questions).each((i, el) => {
                    content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                }).promise().done(() => {
                    content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////
                    content += '<div id = "af2_dnp_name" class="marg-bot">';
                    content += '<div style="display:flex; align-items: center;">';
                    content += 'Name: * <div id="dnp_name_click" class="af2_dnp_choosable btn btn-primary">' + name + '</div>';
                    content += '</div>';
                    content += '<div class="af2_dnp_chooser">';
                    content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                    $(questions).each((i, el) => {
                        content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                    }).promise().done(() => {
                        content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////
                        content += '<div id = "af2_dnp_organisation" class="marg-bot">';
                        content += '<div style="display:flex; align-items: center;">';
                        content += 'Firma: * <div id="dnp_organisation_click" class="af2_dnp_choosable btn btn-primary">' + organisation + '</div>';
                        content += '</div>';
                        content += '<div class="af2_dnp_chooser">';
                        content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                        $(questions).each((i, el) => {
                            content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                        }).promise().done(() => {
                            content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////
                            content += '<div id = "af2_dnp_telefon" class="marg-bot">';
                            content += '<div style="display:flex; align-items: center;">';
                            content += 'Telefon: <div id="dnp_telefon_click" class="af2_dnp_choosable btn btn-primary">' + telefon + '</div>';
                            content += '</div>';
                            content += '<div class="af2_dnp_chooser">';
                            content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                            $(questions).each((i, el) => {
                                content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                            }).promise().done(() => {
                                content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////
                                content += '<div id = "af2_dnp_mail" class="marg-bot">';
                                content += '<div style="display:flex; align-items: center;">';
                                content += 'Mail: <div id="dnp_mail_click" class="af2_dnp_choosable btn btn-primary">' + mail + '</div>';
                                content += '</div>';
                                content += '<div class="af2_dnp_chooser">';
                                content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                                $(questions).each((i, el) => {
                                    content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                                }).promise().done(() => {
                                    content += '</div></div>';
/////////////////////////////////////////////////////////////////////////////
                                    content += '<div id = "af2_dnp_strasse" class="marg-bot">';
                                    content += '<div style="display:flex; align-items: center;">';
                                    content += 'Strasse: <div id="dnp_strasse_click" class="af2_dnp_choosable btn btn-primary">' + strasse + '</div>';
                                    content += '</div>';
                                    content += '<div class="af2_dnp_chooser">';
                                    content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                                    $(questions).each((i, el) => {
                                        content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                                    }).promise().done(() => {
                                        content += '</div></div>';
                                        /////////////////////////////////////////////////////////////////////////////
                                        content += '<div id = "af2_dnp_plz" class="marg-bot">';
                                        content += '<div style="display:flex; align-items: center;">';
                                        content += 'PLZ: <div id="dnp_plz_click" class="af2_dnp_choosable btn btn-primary">' + plz + '</div>';
                                        content += '</div>';
                                        content += '<div class="af2_dnp_chooser">';
                                        content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                                        $(questions).each((i, el) => {
                                            content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                                        }).promise().done(() => {
                                            content += '</div></div>';
                                            /////////////////////////////////////////////////////////////////////////////
                                            content += '<div id = "af2_dnp_stadt" class="marg-bot">';
                                            content += '<div style="display: flex; align-items: center;">';
                                            content += 'Stadt: <div id="dnp_stadt_click" class="af2_dnp_choosable btn btn-primary">' + stadt + '</div>';
                                            content += '</div>';
                                            content += '<div class="af2_dnp_chooser">';
                                            content += '<div id="' + '" class="af2_chooser">[Auswählen...]</div>';
                                            $(questions).each((i, el) => {
                                                content += '<div id="' + i + '" class="af2_chooser">[' + el.id + ']</div>';
                                            }).promise().done(() => {
                                                content += '</div></div>';
                                                /////////////////////////////////////////////////////////////////////////////

                                                content += '<div class="af2_fob_subheading mt-4">Deal Daten:</div>';
                                                content += '<div class="af2_seperator"></div>';

                                                content += '<div id = "af2_dnp_bezeichnung" class="marg-bot">';
                                                content += '<div style="align-items: center;">';
                                                content += 'Bezeichnung: * <input class="af2_dnp_bezeichnung" type="text" value="' + bezeichnung + '">';
                                                content += '</div>';

                                                content += '</div>';


                                                content += '</div>';
                                                if (got === 0) {
                                                    af2_gotContent = [content];
                                                } else {
                                                    af2_gotContent1 = [content];
                                                }
                                                return null;
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
        } else
        {
            content += '</div>';
            if (got === 0)
            {
                af2_gotContent = [content];
            } else
            {
                af2_gotContent1 = [content];
            }
            return null;
        }
        /**
         let v = '';
         if(dataid !== 'redirect:')
         {
         v = dataid.substr('9');
         }
         content += '<input class="af2_redirect_content form-control" type="text" placeholder="Redirect-Page" value="'+v+'">';
         **/
    } else
    {
        let obj = $('#' + dataid + '.af2_content_information').html();
        if (obj === undefined || obj.trim() === '')
        {
            if ($('#af2_content_' + dataid)[0] !== undefined)
            {
                let cont = '';
                let ccont = $($('#af2_content_' + dataid + ' .af2_sb_text')[0]).clone();
                cont += '<div id="inline_got" style="display: flex; align-items: center">';
                cont += '<div class="af2_docer"></div>';
                cont += '</div>';
                let cont3 = '';
                $(af2_jsonobj.sections[pos].contents[id].connections).each((i, el) => {
                    cont3 += '<div id="af2_question_content_answer_' + i + '" class="af2_question_content_answer">';
                    cont3 += '<button class="af2_remove_connection_button btn btn-primary af2_padd"><i class="far fa-minus-square mr-2"></i> Anbindung löschen</button>';
                    cont3 += '<div class="af2_connector af2_draggable"><i class="af2_connector far fa-circle fa-lg"></i></div>';
                    cont3 += '</div>'
                }).promise().done(() => {
                    cont3 += '<button class="af2_add_connection_button btn btn-primary af2_padd"><i class="far fa-plus-square mr-2"></i>Anbindung hinzufügen</button>';

                    if (got === 0)
                    {
                        af2_gotContent = [cont, ccont, cont3];
                    } else
                    {
                        af2_gotContent1 = [cont, ccont, cont3];
                    }
                    return null;
                });
            } else
            {
                if (got === 0)
                {
                    af2_gotContent = ['<h4 style="color: red">ERROR</h4>'];
                } else
                {
                    af2_gotContent1 = ['<h4 style="color: red">ERROR</h4>'];
                }
                return null;
            }
        } else
        {
            obj = JSON.parse(obj);



            content += '<div class="af2_question_content_question">';
            content += '<div class="af2_docer"></div>';
            content += obj.name;
            content += '<div class="af2_connector af2_draggable"><i class="af2_connector far fa-circle fa-lg"></i></div>';
            content += '</div>';

            content += '<div class="af2_question_content_answer_block">';
            $(obj.answers).each((i) => {
                content += '<div id="af2_question_content_answer_' + i + '" class="af2_question_content_answer">' + obj.answers[i].text;
                if (obj.typ === 'af2_select')
                {
                    content += '<div class="af2_connector af2_draggable"><i class="af2_connector far fa-circle fa-lg"></i></div>';
                }
                content += '</div>';
            });

            if (obj.typ === 'af2_slider')
            {
                let x = 0;
                $(af2_jsonobj.sections[pos].contents[id].connections).each((i, el) => {
                    if (af2_jsonobj.sections[pos].contents[id].connections[i].from != '-1')
                    {
                        const op = af2_jsonobj.sections[pos].contents[id].connections[i].operator;
                        const num = af2_jsonobj.sections[pos].contents[id].connections[i].number;

                        const sel1 = af2_jsonobj.sections[pos].contents[id].connections[i].operator === '>' ? 'selected' : '';
                        const sel2 = af2_jsonobj.sections[pos].contents[id].connections[i].operator === '<' ? 'selected' : '';
                        const sel3 = af2_jsonobj.sections[pos].contents[id].connections[i].operator === '=' ? 'selected' : '';
                        const sel4 = af2_jsonobj.sections[pos].contents[id].connections[i].operator === '' ? 'selected' : '';

                        content += '<div id="af2_question_content_answer_' + x + '" class="af2_question_content_answer">';
                        content += '<button class="af2_remove_slider_connection_button mr-2 btn btn-primary af2_padd"><i class="far fa-minus-square mr-2"></i></button>'
                        content += '<select name="operators" class="af2_slide_operator mr-1">';
                        content += '<option value="' + '' + '"' + sel4 + '>' + '...' + '</option>';
                        content += '<option value="' + '>' + '"' + sel1 + '>' + '>' + '</option>';
                        content += '<option value="' + '<' + '"' + sel2 + '>' + '<' + '</option>';
                        content += '<option value="' + '=' + '"' + sel3 + '>' + '=' + '</option>';
                        content += '</select>';
                        content += '<input type="text" class="af2_slide_number" value="' + num + '" placeholder="zahl">';
                        content += '<div class="af2_connector af2_draggable"><i class="af2_connector far fa-circle fa-lg"></i></div>';
                        content += '</div>'
                        x++;
                    }
                });
                content += '<button class="mt-3 af2_add_slider_connection_button btn btn-primary af2_padd"><i class="far fa-plus-square mr-2"></i>Kondition hinzufügen</button>';
            }

            content += '</div>';



            if (got === 0)
            {
                af2_gotContent = [content];
            } else
            {
                af2_gotContent1 = [content];
            }
            return null;
        }
    }
};

const af2_load_fb_settings = () => {
    af2_update_fb_settings();

    sec = 0;
    cont = 0;
    from_stack = [];
    type_stack = [];
    actualType = undefined;
    dataid = af2_id;
    answer_stack = [];
    size = af2_jsonobj.sections.length;

    $.when(af2_init_fe()).done(() => {
        af2_fe_request('-1', af2_work);
    });



};

const af2_init_fe = () => {
    let content = '<div class="whole_form marg">';
    content += '<div class="af2_form">';
    content += '<h4 class="af2_heading af2_main_color af2_col">' + af2_jsonobj.styling.fe_title + '</h4>';
    content += '<div class="af2_switch_content">';

    content += '</div>';

    content += '<div class="af2_bottombar"><div class="af2_back_button af2_main_color af2_bg disabled"><div class="af2_button_overlay"><i class="fas fa-long-arrow-alt-left fa-lg"></i></div></div><div class="af2_bar"><div class="af2_bar_con"></div></div><div class="af2_foward_button af2_main_color af2_bg disabled"><div class="af2_button_overlay"><i class="fas fa-long-arrow-alt-right fa-lg"></i></div></div></div>';
    content += '<div class="af2_bar mob"><div class="af2_bar_con mob"></div></div>';
    content += '</div>';
    content += '</div>';

    $('.af2_content').append(content);
};

const af2_init_fe_edit = () => {
    let content = '';

    content += '<div class="button_bar">';
    content += '<button id="af2_colors" class="btn btn-primary af2_editable_content af2_changeable" data-type="color_picker"><i class="fas fa-globe"></i></button>';
    content += '</div>';
    content += '<div class="whole_form marg">';
    content += '<div class="af2_form">';
    content += '<h4 id="af2_fe_title" class="af2_heading af2_editable_content af2_changeable af2_main_color af2_col" data-type="text" data-placeholder="Frontend-Titel des Formulares" data-title="Name" data-basetext="Frontend-Überschrift - (leer für auslassen)"></h4>';
    content += '<div class="af2_switch_content">';

    content += '</div>';

    content += '<div class="af2_bottombar"><div class="af2_back_button af2_main_color af2_bg disabled"><div class="af2_button_overlay"><i class="fas fa-long-arrow-alt-left fa-lg"></i></div></div><div class="af2_bar"><div class="af2_bar_con"></div></div><div class="af2_foward_button af2_main_color af2_bg disabled"><div class="af2_button_overlay"><i class="fas fa-long-arrow-alt-right fa-lg"></i></div></div></div>';
    content += '<div class="af2_bar mob"><div class="af2_bar_con mob"></div></div>';
    content += '</div>';
    content += '</div>';

    $('.af2_content').append(content);
};

const af2_update_fb_settings = () => {
    if ($('#af2_fb_title')[0] === undefined)
    {
        create_af2_fb_settings();
    }

    af2_update_fb_title();
};

const create_af2_fb_settings = () => {
    let cont = '';

    cont += '<div id="af2_fb_title" class="af2_content_title af2_editable_content af2_changeable" data-type="text" data-placeholder="Name der Formularstruktur..." data-title="Name" data-basetext="Fügen Sie hier den Backend-Namen der Formularstruktur ein!"></div>';

    $('.af2_content').html(cont);
};

const af2_update_fb_title = () => {
    let selector = $($('#af2_fb_title')[0]);
    let cont;
    if (af2_jsonobj.name === undefined || af2_jsonobj.name.trim() === '')
    {
        cont = selector.data('basetext');
    } else
    {
        cont = af2_jsonobj.name;
    }

    $('#af2_fb_title').html(cont);
};

const af2_update_stylings = () => {
    af2_update_fe_title();
    af2_update_styling_colors();
};

const af2_update_fe_title = () => {
    let selector = $($('#af2_fe_title')[0]);
    let cont;
    if (af2_jsonobj.styling.fe_title === undefined || af2_jsonobj.styling.fe_title.trim() === '')
    {
        cont = selector.data('basetext');
    } else
    {
        cont = af2_jsonobj.styling.fe_title;
    }

    $('#af2_fe_title').html(cont);
};

const af2_update_styling_colors = () => {
    $('.af2_main_color').each((i, el) => {
        if ($(el).hasClass('af2_col'))
        {
            $(el).css('color', af2_jsonobj.styling.main_color);
        } else if ($(el).hasClass('af2_bg'))
        {
            $(el).css('background-color', af2_jsonobj.styling.main_color);
        }
    });

    $($('.af2_form')[0]).css('background-color', af2_jsonobj.styling.background_color);
    $('.af2_answer_card').each((i, el) => {
        $(el).css('background-color', af2_jsonobj.styling.card_color);
    });

    $('.af2_questionheading').css('color', af2_jsonobj.styling.text_color);
    $('.af2_answer_text_main').css('color', af2_jsonobj.styling.text_color);
};


// -----------------------------  FRONTEND ----------------------------- //

const af2_actual_section = (answer) => {
    sec = answer.sec;
    cont = answer.cont;
    if (answer.from !== undefined && answer.from !== null && answer.from !== 'null' && answer.from.toString().trim() !== '')
    {
        from_stack.push(answer.from);
    } else if (answer.from === null)
    {
        from_stack.push({"section": 0, "content": 0});
    }
};

const af2_generate_edit_content = (obj) => {
    if (obj.name !== undefined)
    {
        actualType = 'q';

        type_stack.push(obj.typ);

        $('.af2_foward_button').addClass('disabled');


        $.when(af2_generate_question(obj)).done(() => {
            af2_trans('foward');
            af2_update_stylings();
        });
    } else if (obj.cftitle !== undefined)
    {
        actualType = 'cf';

        type_stack.push('cf');
        $.when(af2_generate_contact_form(obj)).done(() => {
            af2_trans('foward');
            af2_update_stylings();
        });
    }
};

const af2_generate_content = (obj) => {
    if (obj.name !== undefined)
    {
        actualType = 'q';

        type_stack.push(obj.typ);

        $('.af2_foward_button').addClass('disabled');


        $.when(af2_generate_question(obj)).done(() => {
            af2_trans('foward');
            af2_update_stylings();
        });
    } else if (obj.cftitle !== undefined)
    {
        actualType = 'cf';

        type_stack.push('cf');
        $.when(af2_generate_contact_form(obj)).done(() => {
            af2_trans('foward');
            af2_update_stylings();
        });
    }
};

const af2_trans = (direction) => {
    if (direction === 'foward')
    {
        if (answer_stack.length > 0 && from_stack.length >= 0)
        {
            const cont1 = $($('.switch_cont')[($('.switch_cont').length) - 2]);

            let perc = 100 / ((size - 1) / sec) + '%';
            $('.af2_bar_con').css('width', perc);
            cont1.css('margin-left', '-100%');
        }
    } else if (direction === 'backwards')
    {
        if (answer_stack.length > 0)
        {
            $('.af2_back_button').addClass('disabled');
            $(document).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
                    '.switch_cont', () => {
                $(document).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', '.switch_cont');
                $($('.switch_cont')[($('.switch_cont').length) - 1]).remove();
                $('.af2_back_button').removeClass('disabled');
            });

            let perc = 100 / ((size - 1) / sec) + '%';
            $('.af2_bar_con').css('width', perc);
            $($('.switch_cont')[($('.switch_cont').length) - 2]).css('margin-left', 0);
        }
    }
};

const af2_generate_question = (obj) => {
    let cont = '';
    cont += '<div class="switch_cont">';
    cont += '<p class="af2_questionheading">' + obj.name + '</p>';
    cont += '<div class="af2_questionwrapper">';
    $(obj.answers).each((i, el) => {

        cont += '<div id="af2_answer_pos_' + i + '" class="af2_answer_wrapper af2_main_color af2_col" data-answer="' + i + '">';
        cont += '<div class="af2_answer_card af2_clickable_c">';

        let img = '';
        if (el.img.includes('http:') || el.img.includes('https:'))
        {
            img = '<div class="q_img"><img src="' + el.img + '" alt="image" /></div>';
        } else
        {
            img = '<div class="q_img"><i class="' + el.img + ' fa-5x"></i></div>';
        }

        cont += img;
        cont += '<p class="af2_answer_text_m">' + el.text + '</p>';
        cont += '</div>';
        cont += '<p class="af2_answer_text_main">' + el.text + '</p>';
        cont += '</div>';

    });
    cont += '</div>';
    cont += '</div>';
    $($('.af2_switch_content')[0]).append(cont);
};

const af2_generate_contact_form = (obj) => {
    let cont = '';
    cont += '<div class="switch_cont">';
    cont += '<p class="af2_questionheading">' + obj.cftitle + '</p>';
    cont += '<div class="af2_cfwrapper">';
    $(obj.questions).each((i, el) => {

        cont += '<div class="af2_question" data-required="' + el.required + '">';

        if (el.typ.includes('text_type'))
        {
            cont += '<p class="af2_q_label">' + el.label + '</p><input type="text" placeholder="' + el.placeholder + '" class="">';
        } else if (el.typ === 'checkbox_type')
        {
            cont += '<div class="af2_CB_cont"><input type="checkbox" class="af2_fe_checkbox"><p class="af2_q_cbtext">' + el.text + '</p></div>';
        }

        cont += '</div>';

    });

    cont += '<input type="submit" value="' + obj.send_button + '" class="af2_send_button">';


    cont += '</div>';
    cont += '</div>';
    $($('.af2_switch_content')[0]).append(cont);
};

const af2_work = (answer) => {
    const jsonobj = JSON.parse(answer);
    af2_actual_section(jsonobj);
    af2_generate_content(jsonobj.jsonpart);
};

const af2_work_edit = (answer) => {
    const jsonobj = JSON.parse(answer);
    af2_generate_edit_content(jsonobj.jsonpart);
};



const af2_fe_request = (clicked, sucess) => {
    $.ajax({
        url: af2_backend_ajax.ajax_url,
        type: "GET",
        data: {
            action: 'af2_fe_req',
            _ajax_nonce: af2_backend_ajax.nonce,
            dataid: parseInt(dataid.toString()),
            clicked: clicked,
            sec: sec,
            cont: cont
        },
        success: (answer) => {

            if (answer === 'error')
            {

            } else if (JSON.parse(answer).jsonpart === null)
            {

            } else
            {
                if (clicked !== '-1')
                {
                    if (clicked === 'multi')
                    {
                        let arr = [];
                        $('.af2_answer_card.selected').each((i, el) => {
                            arr.push($($(el).parent()).data('answer'));
                        }).promise().done(() => {
                            answer_stack.push(arr);
                            sucess(answer);
                        });
                    } else
                    {
                        answer_stack.push(clicked);
                        sucess(answer);
                    }
                    $('.af2_back_button').removeClass('disabled');
                } else
                {
                    sucess(answer);
                }
            }
        },
        error: (e) => {
            console.log('ERROR - Bitte wenden Sie sich an den Support');
            if (clicked !== -1)
            {
                answer_stack.push(clicked);
            }
        }
    });
};

const af2_back_request = () => {
    if (answer_stack.length > 0 && from_stack.length > 0)
    {

    } else
    {
        $('.af2_back_button').addClass('disabled');
    }
    if (answer_stack.length > 0 && from_stack.length > 0)
    {
        sec = from_stack[from_stack.length - 1].section;
        cont = from_stack[from_stack.length - 1].content;
        from_stack.pop();
        type_stack.pop();
        af2_trans('backwards');
    }
    if (type_stack[type_stack.length - 1] === 'af2_multiselect')
    {
        $('.af2_foward_button').removeClass('disabled');
    } else
    {
        $('.af2_foward_button').addClass('disabled');
    }
};



/***************** FRONTEND ***********************/
const af2_load_frontend_emulation = () => {

    /** DO PHP CONTENT **/

    let cb = '';

    cb += '<div style="margin: 20px 0; display: flex; " class="af2_btn_wrap">';

    cb += '<div style="">';
    cb += '<button id="af2_global_colors" class="af2_chooser_button af2_global_colors btn btn-primary af2_editable_content af2_changeable" data-type="color_picker_global"><span style="margin-bottom: 10px; font-weight: 600; font-size: 17px;">Globale Farben</span><i class="fas fa-globe"></i></button>';
    cb += '</div>';

    cb += '<div style="">';
    cb += '<button id="af2_colors_choose" class="af2_chooser_button af2_colors_choose btn btn-primary af2_editable_content af2_changeable" data-type="color_picker_choose"><span style="margin-bottom: 10px; font-weight: 600; font-size: 17px;">Individuelle Farben</span><i class="fas fa-fill-drip"></i></button>';
    cb += '</div>';

    cb += '<div style="">';
    cb += '<button id="af2_text_choose" class="af2_chooser_button af2_colors_choose btn btn-primary af2_editable_content af2_changeable" data-type="text_picker_choose"><span style="margin-bottom: 10px; font-weight: 600; font-size: 17px;">Textgrößen</span><i class="fas fa-text-height"></i></button>';
    cb += '</div>';

    cb += '<div style="">';
    cb += '<button id="af2_borders_choose" class="af2_chooser_button af2_borders_choose btn btn-primary af2_editable_content af2_changeable" data-type="border_picker_choose"><span style="margin-bottom: 10px; font-weight: 600; font-size: 17px;">Rahmen</span><i class="fas fa-border-style"></i></button>';
    cb += '</div>';

    cb += '<div style="">';
    cb += '<button id="af2_contact_form_choose" class="af2_chooser_button af2_borders_choose btn btn-primary af2_editable_content af2_changeable" data-type="contact_form_picker_choose"><span style="margin-bottom: 10px; font-weight: 600; font-size: 17px;">Kontaktformular</span><i class="fas fa-align-justify"></i></button>';
    cb += '</div>';

    /** CONTENTS TO EDIT **/
    cb += '<div id="_form_answer_card_border_radius_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_text_input_border_radius_" class="af2_editable_content af2_changeable"></div>';

    cb += '<div id="_form_heading_size_desktop_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_heading_size_mobile_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_heading_weight_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_heading_line_height_desktop_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_heading_line_height_mobile_" class="af2_editable_content af2_changeable"></div>';

    cb += '<div id="_form_question_heading_size_desktop_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_question_heading_size_mobile_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_question_heading_weight_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_question_heading_line_height_desktop_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_question_heading_line_height_mobile_" class="af2_editable_content af2_changeable"></div>';

    cb += '<div id="_form_question_description_size_desktop_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_question_description_size_mobile_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_question_description_weight_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_question_description_line_height_desktop_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_question_description_line_height_mobile_" class="af2_editable_content af2_changeable"></div>';

    cb += '<div id="_form_answer_card_text_size_desktop_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_answer_card_text_size_mobile_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_answer_card_text_weight_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_answer_card_text_line_height_desktop_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_answer_card_text_line_height_mobile_" class="af2_editable_content af2_changeable"></div>';

    cb += '<div id="_form_text_input_size_desktop_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_text_input_size_mobile_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_text_input_text_weight_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_text_input_line_height_desktop_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_text_input_line_height_mobile_" class="af2_editable_content af2_changeable"></div>';

    cb += '<div id="_form_contact_form_label_size_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_contact_form_label_weight_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_contact_form_input_size_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_contact_form_input_weight_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_contact_form_button_size_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_contact_form_button_weight_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_contact_form_button_padding_top_bottom_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_contact_form_button_padding_left_right_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_contact_form_cb_size_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_contact_form_cb_weight_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_contact_form_input_height_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_contact_form_input_border_radius_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_contact_form_button_border_radius_" class="af2_editable_content af2_changeable"></div>';
    cb += '<div id="_form_contact_form_input_padding_left_right_" class="af2_editable_content af2_changeable"></div>';

    cb += '<div>';

    $('.af2_content').html(cb);
    $('.af2_content').append('<div id="af2_fb_title" class="af2_content_title af2_editable_content af2_changeable" data-type="text" data-placeholder="Name der Formularstruktur..." data-title="Name" data-basetext="Fügen Sie hier den Backend-Namen der Formularstruktur ein!"></div>');


    let content = '';																									// Content to draw

    /** Check if license is active **/
    /** Fetching Data from the given "Formular" **/
    let dataid = af2_id;                                                    								// The Dataid of the Formular
    const base_json = af2_jsonobj;                        										// The json-Object of it

    let size = base_json.sections.length; 																	// The maximum amount of steps

    /** If there are special fields -> the size will be one less **/
    if (base_json.sections[ size - 1 ].contents[ 0 ].data.includes('redirect:') !== false
            || base_json.sections[ size - 1 ].contents[ 0 ].data.includes('dealsnprojects:') !== false
            || base_json.sections[ size - 1 ].contents[ 0 ].data.includes('activecampaign:') !== false
            || base_json.sections[ size - 1 ].contents[ 0 ].data.includes('klicktipp:') !== false
            )
    {
        size--;
    }

    /** Getting the Frontend-Title **/
    /*
     * INCOMING -> Build migration!
     * $fe_title = --> access_database -> get( $dataid ) -> get_frontend_name
     */
    const fe_title = base_json.name;																	// Frontent-Title of Formular

    /** Getting the Preload-Part **/
    /*
     * INCOMING -> Build migration!
     *
     */
    const preload = 2;
    /** Building Content **/
    content += '<div id="af2_form_0" class="af2_form_wrapper" data-preload="' + preload + '" data-size="' + size + '" data-num="0" data-did="' + dataid + '">';
    content += '<div class="af2_form">';
    content += '<div class="af2_form_heading_wrapper">';
    content += '<h3 id="af2_fe_title" class="af2_form_heading desktop af2_editable_content af2_changeable af2_col" data-type="text" data-placeholder="Frontend-Titel des Formulares" data-title="Name" data-basetext="Frontend-Überschrift - (leer für auslassen)"></h3>';
    content += '<h3 id="af2_fe_title" class="af2_form_heading af2_mobile af2_editable_content af2_changeable af2_col" data-type="text" data-placeholder="Frontend-Titel des Formulares" data-title="Name" data-basetext="Frontend-Überschrift - (leer für auslassen)"></h3>';
    content += '</div>';
    content += '<div class="af2_form_carousel"></div>';
    content += '<div class="af2_form_bottombar">';
    content += '<button class="af2_form_back_button af2_form_button af2_disabled af2_mobile"><i class="fas fa-long-arrow-alt-left fa-lg">';
    content += '</i></button>';
    content += '<button class="af2_form_back_button af2_form_button af2_disabled desktop"><i class="fas fa-long-arrow-alt-left fa-lg">';
    content += '</i></button>';
    //$conten+ .= '<div class="af2_form_progress_bar_wrapper">';
    content += '<div class="af2_form_progress_bar"><div class="af2_form_progress"></div></div>';
    //$conten+ .= '<div class="af2_form_percentage_triangle"></div>';
    //$conten+ .= '<div class="af2_form_percentage">0%</div>';
    //$conten+ .= '</div>';
    content += '<button class="af2_form_foward_button af2_form_button af2_disabled af2_mobile"><i class="fas fa-long-arrow-alt-right fa-lg">';
    content += '</i></button>';
    content += '<button class="af2_form_foward_button af2_form_button af2_disabled desktop"><i class="fas fa-long-arrow-alt-right fa-lg">';
    content += '</i></button>';
    content += '</div>';
    content += '</div>';
    content += '</div>';

    $('.af2_content').append(content);

    af2_update_fb_title();
    af2_update_fe_title();


    /** FILL VARIABLES WE NEED **/
    af2_forms = [];                                                                                                         // All Forms
    af2_datas = [];                                                                                                         // All Data contents
    af2Styles = // The basic styling
            {
                "af2_answer_":
                        [
                            {
                                "attribute": "width",
                                "value": "200px",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "width",
                                "value": "100%",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "margin",
                                "value": "20px",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "margin",
                                "value": "7px 15px",
                                "special_class": "af2_mobile"
                            }
                        ],
                "af2_form_carousel":
                        [
                            {
                                "attribute": "margin",
                                "value": "0 0 30px 0",
                            }
                        ],
                "af2_answer_card_":
                        [
                            {
                                "attribute": "height",
                                "value": "150px",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "height",
                                "value": "52px",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "border-radius",
                                "value": "15px"
                            },
                            {
                                "attribute": "color",
                                "value": ""
                            },
                            {
                                "attribute": "background-color",
                                "value": "rgba(0, 0, 0, 0)"
                            }
                        ],
                "af2_form_heading_wrapper":
                        [
                            {
                                "attribute": "margin",
                                "value": "0 0 65px 0"
                            }
                        ],
                "af2_form_heading":
                        [
                            {
                                "attribute": "color",
                                "value": ""
                            },
                            {
                                "attribute": "font-size",
                                "value": "",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "font-size",
                                "value": "",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "font-weight",
                                "value": ""
                            },
                            {
                                "attribute": "line-height",
                                "value": "",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "line-height",
                                "value": "",
                                "special_class": "af2_mobile"
                            }
                        ],
                "af2_question_heading_wrapper":
                        [
                            {
                                "attribute": "margin",
                                "value": "0 0 55px"
                            }
                        ],
                "af2_question_description":
                        [
                            {
                                "attribute": "color",
                                "value": ""
                            },
                            {
                                "attribute": "font-size",
                                "value": "20px",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "font-size",
                                "value": "18px",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "font-weight",
                                "value": "",
                            },
                            {
                                "attribute": "line-height",
                                "value": "",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "line-height",
                                "value": "",
                                "special_class": "af2_mobile"
                            }
                        ],
                "af2_question_heading":
                        [
                            {
                                "attribute": "color",
                                "value": ""
                            },
                            {
                                "attribute": "font-size",
                                "value": "32px",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "font-size",
                                "value": "24px",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "font-weight",
                                "value": "",
                            },
                            {
                                "attribute": "line-height",
                                "value": "",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "line-height",
                                "value": "",
                                "special_class": "af2_mobile"
                            }
                        ],
                "af2_answer_image_wrapper":
                        [
                            {
                                "attribute": "padding",
                                "value": "0 7px"
                            },
                            {
                                "attribute": "width",
                                "value": "70px",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "margin-right",
                                "value": "10px",
                                "special_class": "af2_mobile"
                            }
                        ],
                "af2_answer_text":
                        [
                            {
                                "attribute": "color",
                                "value": ""
                            },
                            {
                                "attribute": "margin-left",
                                "value": "15px",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "font-size",
                                "value": "16px",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "line-height",
                                "value": "24px",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "line-height",
                                "value": "20px",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "font-size",
                                "value": "18px",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "font-weight",
                                "value": "",
                            }
                        ],
                "af2_form":
                        [
                            {
                                "attribute": "background-color",
                                "value": "rgba(255, 255, 255, 1)"
                            },
                            {
                                "attribute": "padding",
                                "value": "7px"
                            }
                        ],
                "af2_form_button":
                        [
                            {
                                "attribute": "background-color",
                                "value": ""
                            },
                            {
                                "attribute": "border-radius",
                                "value": "7px"
                            },
                            {
                                "attribute": "border",
                                "value": "none"
                            },
                            {
                                "attribute": "min-width",
                                "value": "50px",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "max-width",
                                "value": "50px",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "min-height",
                                "value": "50px",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "max-height",
                                "value": "50px",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "color",
                                "value": "rgba(255, 255, 255, 1)"
                            },
                            {
                                "attribute": "background-color",
                                "value": "#d7d7d7",
                                "special_class": "af2_disabled"
                            },
                            {
                                "attribute": "min-width",
                                "value": "40px",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "max-width",
                                "value": "40px",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "min-height",
                                "value": "40px",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "max-height",
                                "value": "40px",
                                "special_class": "af2_mobile"
                            }
                        ],
                "af2_form_bottombar":
                        [
                            {
                                "attribute": "padding",
                                "value": "0 15px"
                            }
                        ],
                "af2_form_wrapper":
                        [
                            {
                                "attribute": "width",
                                "value": "100%"
                            },
                            {
                                "attribute": "max-width",
                                "value": "1250px"
                            }
                        ],
                "af2_textfeld_frage":
                        [
                            {
                                "attribute": "width",
                                "value": "90%"
                            },
                            {
                                "attribute": "margin",
                                "value": "0 auto 50px auto !important"
                            },
                            {
                                "attribute": "border-radius",
                                "value": "7px"
                            },
                            {
                                "attribute": "height",
                                "value": "62px"
                            },
                            {
                                "attribute": "box-shadow",
                                "value": "0 0 6px",
                                "special_state": "focus"
                            },
                            {
                                "attribute": "font-size",
                                "value": "",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "font-size",
                                "value": "",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "font-weight",
                                "value": ""
                            },
                            {
                                "attribute": "line-height",
                                "value": "",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "line-height",
                                "value": "",
                                "special_class": "af2_mobile"
                            }
                        ],
                "af2_datum_frage":
                        [
                            {
                                "attribute": "width",
                                "value": "90%"
                            },
                            {
                                "attribute": "margin",
                                "value": "0 auto 50px auto !important"
                            },
                            {
                                "attribute": "border-radius",
                                "value": "7px"
                            },
                            {
                                "attribute": "height",
                                "value": "62px"
                            },
                            {
                                "attribute": "box-shadow",
                                "value": "0 0 6px",
                                "special_state": "focus"
                            },
                            {
                                "attribute": "font-size",
                                "value": "",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "font-size",
                                "value": "",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "font-weight",
                                "value": ""
                            },
                            {
                                "attribute": "line-height",
                                "value": "",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "line-height",
                                "value": "",
                                "special_class": "af2_mobile"
                            }
                        ],
                "af2_slider_frage_wrapper":
                        [
                            {
                                "attribute": "width",
                                "value": "90%"
                            }
                        ],
                "af2_slider_frage_bullet":
                        [
                            {
                                "attribute": "margin",
                                "value": "0 auto 20px auto"
                            },
                            {
                                "attribute": "color",
                                "value": "#333"
                            },
                            {
                                "attribute": "font-weight",
                                "value": "600"
                            },
                            {
                                "attribute": "font-size",
                                "value": "32px",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "font-size",
                                "value": "24px",
                                "special_class": "af2_mobile"
                            }
                        ],
                "af2_slider_frage":
                        [
                            {
                                "attribute": "margin",
                                "value": "0 auto 15px auto !important"
                            },
                            {
                                "attribute": "border-radius",
                                "value": "7px"
                            },
                            {
                                "attribute": "height",
                                "value": "15px"
                            },
                            {
                                "attribute": "box-shadow",
                                "value": "0 0 6px",
                                "special_state": "focus"
                            },
                            {
                                "attribute": "background-color",
                                "value": "#333",
                                "special_extra": "-webkit-slider-thumb"
                            },
                            {
                                "attribute": "background-color",
                                "value": "#333",
                                "special_extra": "-moz-range-thumb"
                            }
                        ],
                "af2_textbereich_frage":
                        [
                            {
                                "attribute": "width",
                                "value": "90%"
                            },
                            {
                                "attribute": "margin",
                                "value": "0 auto 50px auto !important"
                            },
                            {
                                "attribute": "border-radius",
                                "value": "7px"
                            },
                            {
                                "attribute": "height",
                                "value": "150px"
                            },
                            {
                                "attribute": "box-shadow",
                                "value": "0 0 6px",
                                "special_state": "focus"
                            },
                            {
                                "attribute": "font-size",
                                "value": "",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "font-size",
                                "value": "",
                                "special_class": "af2_mobile"
                            },
                            {
                                "attribute": "font-weight",
                                "value": ""
                            },
                            {
                                "attribute": "line-height",
                                "value": "",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "line-height",
                                "value": "",
                                "special_class": "af2_mobile"
                            }
                        ],
                "af2_question_wrapper":
                        [
                            {
                                "attribute": "width",
                                "value": "90%"
                            },
                            {
                                "attribute": "margin",
                                "value": "0 auto 30px !important"
                            }
                        ],
                "af2_text_type":
                        [
                            {
                                "attribute": "border-radius",
                                "value": "7px"
                            },
                            {
                                "attribute": "height",
                                "value": "47px"
                            },
                            {
                                "attribute": "box-shadow",
                                "value": "0 0 6px",
                                "special_state": "focus"
                            },
                            {
                                "attribute": "border",
                                "value": "1px solid",
                                "special_state": "focus"
                            },
                            {
                                "attribute": "font-size",
                                "value": ""
                            },
                            {
                                "attribute": "font-weight",
                                "value": ""
                            },
                            {
                                "attribute": "padding",
                                "value": ""
                            }
                        ],
                "af2_checkbox_type":
                        [
                            {
                                "attribute": "margin-right",
                                "value": "15px"
                            }
                        ],
                "af2_answer_.selected_item .af2_answer_card_":
                        [
                            {
                                "attribute": "box-shadow",
                                "value": "0 0 6px"
                            }
                        ],
                "af2_form_progress_bar":
                        [
                            {
                                "attribute": "width",
                                "value": "100%"
                            },
                            {
                                "attribute": "height",
                                "value": "8px"
                            },
                            {
                                "attribute": "border-radius",
                                "value": "15px"
                            },
                            {
                                "attribute": "border",
                                "value": ""
                            },
                            {
                                "attribute": "background-color",
                                "value": "white"
                            },
                            {
                                "attribute": "margin",
                                "value": "21px"
                            }
                        ],
                "af2_form_progress_bar_wrapper":
                        [
                            {
                                "attribute": "margin",
                                "value": "0 15px"
                            },
                            {
                                "attribute": "width",
                                "value": "100%"
                            }
                        ],
                "af2_form_progress":
                        [
                            {
                                "attribute": "border-radius",
                                "value": "15px"
                            },
                            {
                                "attribute": "background-color",
                                "value": ""
                            }
                        ],
                "af2_form_percentage":
                        [
                            {
                                "attribute": "width",
                                "value": "50px"
                            },
                            {
                                "attribute": "height",
                                "value": "25px"
                            },
                            {
                                "attribute": "background-color",
                                "value": ""
                            },
                            {
                                "attribute": "color",
                                "value": "#ffffff"
                            }
                        ],
                "af2_form_percentage_triangle":
                        [
                            {
                                "attribute": "border-color",
                                "value": ""
                            }
                        ],
                "af2_multiselect_style":
                        [
                            {
                                "attribute": "font-size",
                                "value": "24px",
                                "special_class": "desktop"
                            },
                            {
                                "attribute": "font-size",
                                "value": "20px",
                                "special_class": "af2_mobile"
                            }
                        ],
                "af2_question_label":
                        [
                            {
                                "attribute": "font-size",
                                "value": ""
                            },
                            {
                                "attribute": "font-weight",
                                "value": ""
                            }
                        ],
                "af2_submit_button":
                        [
                            {
                                "attribute": "font-size",
                                "value": ""
                            },
                            {
                                "attribute": "font-weight",
                                "value": ""
                            },
                            {
                                "attribute": "padding",
                                "value": ""
                            },
                            {
                                "attribute": "padding-left",
                                "value": ""
                            },
                            {
                                "attribute": "padding-right",
                                "value": ""
                            },
                            {
                                "attribute": "border-radius",
                                "value": ""
                            },
                            {
                                "attribute": "background-color",
                                "value": ""
                            },
                            {
                                "attribute": "outline",
                                "value": "none",
                                "special_state": "focus"
                            },
                            {
                                "attribute": "border",
                                "value": "none"
                            },
                            {
                                "attribute": "transition",
                                "value": "all 400ms ease-out"
                            },
                            {
                                "attribute": "color",
                                "value": ""
                            },
                            {
                                "attribute": "margin",
                                "value": '20px 0 0 0'
                            },
                            {
                                "attribute": "white-space",
                                "value": 'normal'
                            }
                        ],
                "af2_question_cb_label":
                        [
                            {
                                "attribute": "font-size",
                                "value": ""
                            },
                            {
                                "attribute": "font-weight",
                                "value": ""
                            }
                        ],
                "af2_datepicker_header":
                        [
                            {
                                "attribute": "background-color",
                                "value": "",
                                "special_class": "af2_datepicker",
                                "sub_class": "ui-datepicker-title"
                            },
                            {
                                "attribute": "color",
                                "value": "",
                                "special_class": "af2_datepicker",
                                "sub_class": "ui-datepicker-title"
                            }
                        ],
                "af2_datepicker_active":
                        [
                            {
                                "attribute": "background-color",
                                "value": "",
                                "special_class": "af2_datepicker",
                                "sub_class": "ui-datepicker-current-day"
                            },
                            {
                                "attribute": "color",
                                "value": "",
                                "special_class": "af2_datepicker",
                                "sub_class": "ui-state-active"
                            }
                        ],
                "af2_datepicker_buttons":
                        [
                            {
                                "attribute": "background-color",
                                "value": "#fff",
                                "special_class": "af2_datepicker",
                                "sub_class": "ui-datepicker-prev"
                            },
                            {
                                "attribute": "color",
                                "value": "#3a3a3a",
                                "special_class": "af2_datepicker",
                                "sub_class": "ui-datepicker-prev"
                            },
                            {
                                "attribute": "background-color",
                                "value": "#fff",
                                "special_class": "af2_datepicker",
                                "sub_class": "ui-datepicker-next"
                            },
                            {
                                "attribute": "color",
                                "value": "#3a3a3a",
                                "special_class": "af2_datepicker",
                                "sub_class": "ui-datepicker-next"
                            }
                        ]
            };


    /**
     * NOW INIT ALL!!!!
     */

    af2_init($);
};


/**
 * The Initialize Method
 */
const af2_init = ($) => {

    /** Filling the Forms with all Forms on the Screen **/
    $('.af2_form_wrapper').each((i, el) => {
        const id = $(el).data('did');
        const num = $(el).data('num');
        const preload = $(el).data('preload');
        const size = $(el).data('size');

        af2_forms[num] = new Form($, id, num, preload, size);
    });

};

/**
 * For multiple forms on the screen
 *
 * @param $
 * @param id
 * @param num
 * @param preload
 * @param size
 * @constructor
 */
function Form($, id, num, preload, size) {
    this.$ = $;                                                                                                         // The jQuery operator
    this.id = id;                                                                                                       // Dataid
    this.num = num;                                                                                                     // Key of the element To call
    this.preload = preload;                                                                                             // Amount of preloads
    this.size = size;                                                                                                   // Max size (amount of sections)
    this.formSelector = '#af2_form_' + this.num;                                                                        // Selector for everything within this form
    this.actualSection = 0;                                                                                             // Section the Form is actually in
    this.actualContent = 0;                                                                                             // Content the Form is actually showing
    this.neededContent = undefined;                                                                                     // The neededContent to draw
    this.actualData = undefined;                                                                                        // The actual Dataid
    this.actualCarouselItem = 0;
    this.beforeSection = [];
    this.beforeContent = [];
    this.needsDraw = true;
    this.answers = [];
    this.set = false;

    if (this.preload > this.size - 1)
        this.preload = this.size - 1;

    /**
     * When Loaded the Content for the Form
     */
    this.$(this.formSelector).on('loadedData', (ev) => {
        af2CompareAttributeInArray(this.$, this.id, ev.dataids).done(() => {
            af2LoadStyling(this.$, this.id, this.formSelector);
            this.loadContent();
        });
    });

    this.$(this.formSelector + ' .af2_form_carousel').on('loadedData', (ev) => {
        if (this.neededContent !== undefined)
        {
            af2CompareAttributeInArray(this.$, this.neededContent, ev.dataids).done(() => {
                this.initDraw();
            });
        }
    });

    /** Load the Form's Content **/
    if (af2_datas[id] === undefined) // When Dataid is not already set
    {
        af2_datas[id] = true;

        af2HandleRequest($, this.formSelector, '.af2_form_wrapper', [this.id]);
    }

    /**
     * Verify and load the new Content
     */
    this.loadContent = () => {
        const prom = $.Deferred();

        this.neededContent = af2_datas[this.id].sections[this.actualSection].contents[this.actualContent].data;
        /** Check the redirect **/
        if (this.neededContent.includes('redirect'))
        {
            window.location.replace(this.neededContent.substr(9));
            prom.reject();
        } else
        {
            this.iteratePreloads().done((dataids) => {
                if (dataids.length > 0)
                {
                    af2HandleRequest($, this.formSelector, '.af2_form_carousel', dataids);
                }
            });
            if (af2_datas[this.neededContent] !== undefined && af2_datas[this.neededContent] !== true)
            {
                this.initDraw();
            }
            prom.resolve();
        }

        return prom.promise();
    };

    this.initDraw = () => {
        if (this.needsDraw === true)
            af2DrawCarouselContent(this.$, this.neededContent, this.formSelector, this.actualCarouselItem);
        this.actualData = this.neededContent;
        this.neededContent = undefined;
        const height = $(this.formSelector + ' .af2_form_carousel #' + this.actualCarouselItem + ' .af2_carousel_content').height();
        $(this.formSelector + ' .af2_form_carousel').css('height');
        $(this.formSelector + ' .af2_form_carousel').css('height', height);
        this.setTriggers();

        if (af2_datas[this.actualData].typ !== undefined &&
                (af2_datas[this.actualData].typ === 'af2_slider' || af2_datas[this.actualData].typ === 'af2_content'))
        {
            $(this.formSelector + ' .af2_form_foward_button').removeClass('af2_disabled');
        } else
        {
            $(this.formSelector + ' .af2_form_foward_button').addClass('af2_disabled');
        }

        $(this.formSelector + ' .af2_form_bottombar').css('opacity', 1);

        if (af2_datas[this.actualData].typ === 'af2_content')
        {
            if (af2_datas[this.actualData].type_specifics.content_button == true)
            {

                $(this.formSelector + ' .af2_form_bottombar').css('opacity', 0);

            }
            if (af2_datas[this.actualData].type_specifics.content_wait_time !== undefined && $.isNumeric(af2_datas[this.actualData].type_specifics.content_wait_time))
            {
                //blend out everything
                if (af2_datas[this.actualData].type_specifics.content_button == true)
                {
                    $(this.formSelector + ' .af2_submit_wrapper input.af2_submit_button.no_send').css('opacity', 0);
                } else
                {
                    $(this.formSelector + ' .af2_form_bottombar').css('opacity', 0);
                }


                //timer
                setTimeout(() => {
                    if (af2_datas[this.actualData].type_specifics.content_button == true)
                    {
                        $(this.formSelector + ' .af2_submit_wrapper input.af2_submit_button.no_send').css('opacity', 1);
                    } else
                    {
                        $(this.formSelector + ' .af2_form_bottombar').css('opacity', 1);
                    }
                    this.af2Move("", 'next');
                }, af2_datas[this.actualData].type_specifics.content_wait_time);
            }
        }
    };

    /**
     * Get all Needed preloads
     *
     * @returns {*}
     */
    this.iteratePreloads = () => {
        const prom = this.$.Deferred();
        let dataIds = [];

        /** Check neededContent first **/
        if (af2_datas[this.neededContent] === undefined)
        {
            dataIds.push(this.neededContent);
            af2_datas[this.neededContent] = true;
        }

        if (af2_datas[this.id].sections[this.actualSection].contents[this.actualContent].connections !== undefined)
        {
            /** Iterate the first part **/
            $(af2_datas[this.id].sections[this.actualSection].contents[this.actualContent].connections).each((i, el) => {
                const toSection = el.to_section;
                const toContent = el.to_content;

                /** Check the Data **/
                if (af2_datas[el.to_dataid] === undefined && !el.to_dataid.includes('redirect'))
                {
                    dataIds.push(el.to_dataid);
                    af2_datas[el.to_dataid] = true;

                    if (af2_datas[this.id].sections[toSection].contents[toContent].connections !== undefined)
                    {
                        $.each(af2_datas[this.id].sections[toSection].contents[toContent].connections, (j, e) => {

                            /** Check the Data **/
                            if (af2_datas[e.to_dataid] === undefined && !e.to_dataid.includes('redirect')) {
                                dataIds.push(e.to_dataid);
                                af2_datas[e.to_dataid] = true;
                            }
                        });
                    }
                }


                if (i === af2_datas[this.id].sections[this.actualSection].contents[this.actualContent].connections.length - 1)
                {
                    prom.resolve(dataIds);
                }
            });
        }

        return prom.promise();
    };

    /**
     * Setting all Triggers you need
     */
    this.setTriggers = () => {
        $(document).on('keypress', (ev) => {
            const keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {

                if (!$(this.formSelector + ' .af2_form_foward_button').hasClass('af2_disabled'))
                {
                    if (af2_datas[this.actualData].typ === 'af2_multiselect')
                    {
                        let arr = [];
                        $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer_.selected_item').each((i, el) => {
                            arr.push($(el).attr('id'));
                        }).promise().done(() => {
                            this.af2Move(arr, 'next');
                        });
                    } else if (af2_datas[this.actualData].typ === 'af2_textfeld')
                    {
                        this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textfeld_frage').val(), 'next');
                    } else if (af2_datas[this.actualData].typ === 'af2_datum')
                    {
                        this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_datum_frage').val(), 'next');
                    }
                }

            }
        });

        this.$(document).on('mouseenter', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer_', (ev) => {
            $(ev.currentTarget).addClass('hover');
        });
        this.$(document).on('mouseleave', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer_', (ev) => {
            $(ev.currentTarget).removeClass('hover');
        });


        this.$(document).on('click', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer_', (ev) => {
            if (af2_datas[this.actualData].typ === 'af2_multiselect')
            {
                $(ev.currentTarget).toggleClass('selected_item');

                const len = $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer_.selected_item').length;
                if (len > 0)
                {
                    $(this.formSelector + ' .af2_form_foward_button').removeClass('af2_disabled');

                    const cond = af2_datas[this.actualData].type_specifics.condition;
                    if (cond !== undefined && cond !== '' && $.isNumeric(cond) && cond > 1)
                    {
                        if (len >= cond)
                        {
                            let arr = [];
                            $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer_.selected_item').each((i, el) => {
                                arr.push($(el).attr('id'));
                            }).promise().done(() => {
                                this.af2Move(arr, 'next');
                            });
                        }
                    }
                } else
                {
                    $(this.formSelector + ' .af2_form_foward_button').addClass('af2_disabled');
                }
            } else
            {
                const id = parseInt($(ev.currentTarget).attr('id'));
                this.af2Move(id, 'next');
            }
        });

        this.$(document).on('input', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textfeld_frage', (ev) => {
            if ($(ev.currentTarget).val().trim() !== '')
            {
                $(this.formSelector + ' .af2_form_foward_button').removeClass('af2_disabled');
            } else
            {
                $(this.formSelector + ' .af2_form_foward_button').addClass('af2_disabled');
            }
        });
        this.$(document).on('input', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textbereich_frage', (ev) => {
            if ($(ev.currentTarget).val().trim() !== '')
            {
                $(this.formSelector + ' .af2_form_foward_button').removeClass('af2_disabled');
            } else
            {
                $(this.formSelector + ' .af2_form_foward_button').addClass('af2_disabled');
            }
        });

        this.$(document).on('input', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_datum_frage', (ev) => {
            if ($(ev.currentTarget).val().trim() !== '')
            {
                $(this.formSelector + ' .af2_form_foward_button').removeClass('af2_disabled');
            } else
            {
                $(this.formSelector + ' .af2_form_foward_button').addClass('af2_disabled');
            }
        });


        this.$(document).on('click', this.formSelector + ' .af2_form_back_button', (ev) => {
            if (!$(ev.currentTarget).hasClass('af2_disabled'))
            {
                this.set = false;

                $(this.formSelector + ' .af2_form_button').each((i, el) => {
                    $(el).addClass('af2_disabled');
                });

                this.af2Move(-1, 'before');
            }
        });

        this.$(document).on('click', this.formSelector + ' .af2_form_foward_button', (ev) => {
            if (!$(ev.currentTarget).hasClass('af2_disabled'))
            {
                if (af2_datas[this.actualData].typ === 'af2_multiselect')
                {
                    let arr = [];
                    $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer_.selected_item').each((i, el) => {
                        arr.push($(el).attr('id'));
                    }).promise().done(() => {
                        this.af2Move(arr, 'next');
                    });
                } else if (af2_datas[this.actualData].typ === 'af2_textfeld')
                {
                    this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textfeld_frage').val(), 'next');
                } else if (af2_datas[this.actualData].typ === 'af2_textbereich')
                {
                    this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textbereich_frage').val(), 'next');
                } else if (af2_datas[this.actualData].typ === 'af2_datum')
                {
                    this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_datum_frage').val(), 'next');
                } else if (af2_datas[this.actualData].typ === 'af2_slider')
                {
                    this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_slider_frage').val(), 'next');
                } else if (af2_datas[this.actualData].typ === 'af2_content')
                {
                    this.af2Move("", 'next');
                }
            }
        });
        this.$(document).on('click', this.formSelector + ' .af2_submit_button.no_send', (ev) => {
            if (!$(ev.currentTarget).hasClass('af2_disabled'))
            {
                if (af2_datas[this.actualData].typ === 'af2_multiselect')
                {
                    let arr = [];
                    $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer.selected_item').each((i, el) => {
                        arr.push($(el).attr('id'));
                    }).promise().done(() => {
                        this.af2Move(arr, 'next');
                    });
                } else if (af2_datas[this.actualData].typ === 'af2_textfeld')
                {
                    this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textfeld_frage').val(), 'next');
                } else if (af2_datas[this.actualData].typ === 'af2_textbereich')
                {
                    this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textbereich_frage').val(), 'next');
                } else if (af2_datas[this.actualData].typ === 'af2_datum')
                {
                    this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_datum_frage').val(), 'next');
                } else if (af2_datas[this.actualData].typ === 'af2_slider')
                {
                    this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_slider_frage').val(), 'next');
                } else if (af2_datas[this.actualData].typ === 'af2_content')
                {
                    this.af2Move("", 'next');
                }
            }
        });

        this.$(document).on('click', this.formSelector + ' .af2_submit_button', (ev) => {
            
        });

        this.$(document).on('input', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_slider_frage', (ev) => {
            const sliderSelector = $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_slider_frage');
            const sliderBulletSelector = $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_slider_frage_bullet');
            af2AdjustSliderBullet(sliderSelector, sliderBulletSelector, af2_datas[this.actualData], this.$);
        });
    };

    /**
     * Removing all Triggers
     */
    this.removeTriggers = () => {
        $(document).off('keypress');

        this.$(document).off('mouseenter', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer_');
        this.$(document).off('mouseleave', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer_');

        this.$(document).off('click', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer_');
        this.$(document).off('input', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textfeld_frage');
        this.$(document).off('input', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textbereich_frage');
        this.$(document).off('input', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_datum_frage');
        this.$(document).off('input', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_slider_frage');


        this.$(document).off('click', this.formSelector + ' .af2_form_back_button');
        this.$(document).off('click', this.formSelector + ' .af2_form_foward_button');
        this.$(document).off('click', this.formSelector + ' .af2_submit_button.no_send');

        this.$(document).off('click', this.formSelector + ' .af2_submit_button');
    };

    /**
     * Moves the Carousel
     *
     * @param connectionFrom
     * @param type
     */
    this.af2Move = (connectionFrom, type) => {

        /** Remove all Hooks**/
        this.removeTriggers();

        if (type === 'next')
        {
            $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer_').each((i, el) => {
                $(el).removeClass('selected_item');
                $(el).removeClass('hover');
            });

            this.answers.push(connectionFrom);

            this.needsDraw = true;
            this.af2GoNext(connectionFrom).done((cont) => {
                this.beforeSection.push(cont[0]);
                this.beforeContent.push(cont[1]);

                if (this.beforeSection.length > 0)
                {
                    $(this.formSelector + ' .af2_form_back_button').removeClass('af2_disabled');
                } else
                {
                    $(this.formSelector + ' .af2_form_back_button').addClass('af2_disabled');
                }
            });
        } else if (type === 'before')
        {
            this.answers.pop();

            this.needsDraw = false;
            this.af2GoBefore().done(() => {
                this.beforeSection.pop();
                this.beforeContent.pop();

                if (this.beforeSection.length > 0)
                {
                    $(this.formSelector + ' .af2_form_back_button').removeClass('af2_disabled');
                } else
                {
                    $(this.formSelector + ' .af2_form_back_button').addClass('af2_disabled');
                }
            });
        }
    };

    /**
     * Going to the one before
     */
    this.af2GoBefore = () => {
        const prom = this.$.Deferred();

        this.actualSection = this.beforeSection[this.beforeSection.length - 1];
        this.actualContent = this.beforeContent[this.beforeContent.length - 1];

        this.actualCarouselItem--;

        /** Loading Content **/
        this.loadContent().done(() => {
            /** Move to the next **/

            $(document).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
                    this.formSelector + ' #' + (this.actualCarouselItem) + '.af2_carousel_item', () => {
                $(document).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
                        this.formSelector + ' #' + (this.actualCarouselItem) + '.af2_carousel_item');
                $(this.formSelector + ' #' + (this.actualCarouselItem + 1) + '.af2_carousel_item').remove();
                prom.resolve();
            });
            $(this.formSelector + ' #' + (this.actualCarouselItem)).css('transform');
            $(this.formSelector + ' #' + (this.actualCarouselItem) + '.af2_carousel_item').removeClass('left_marg');

            const newPercent = (this.actualSection / (this.size - 1)) * 100;
            $(this.formSelector + ' .af2_form_progress').css('width');
            $(this.formSelector + ' .af2_form_progress').css('width', newPercent + '%');

            //this.af2SetPercentage(parseInt($(this.formSelector + ' .af2_form_percentage').html()), newPercent, 500, 'down');

        });

        return prom.promise();
    };

    /**
     * Going to the next one
     */
    this.af2GoNext = (connectionFrom) => {
        const prom = this.$.Deferred();

        /** Set new Content **/
        const buffer = af2FindNew(this.$, af2_datas[this.id].sections[this.actualSection].contents[this.actualContent].connections, connectionFrom);

        const sec = this.actualSection;
        const cont = this.actualContent;

        this.actualSection = buffer[0];
        this.actualContent = buffer[1];

        this.actualCarouselItem++;

        /** Loading Content **/
        this.loadContent().done(() => {
            /** Move to the next **/
            $(document).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
                    this.formSelector + ' #' + (this.actualCarouselItem - 1) + '.af2_carousel_item', () => {
                $(document).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
                        this.formSelector + ' #' + (this.actualCarouselItem - 1) + '.af2_carousel_item');

                if (af2_datas[this.actualData].typ === 'af2_textfeld')
                {
                    $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textfeld_frage').each((i, el) => {
                        if ($(el).css('display') === 'none')
                        {

                        } else
                        {
                            $(el).focus();
                        }
                    });
                }

                if (af2_datas[this.actualData].typ === 'af2_textbereich')
                {
                    $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textbereich_frage').each((i, el) => {
                        if ($(el).css('display') === 'none')
                        {

                        } else
                        {
                            $(el).focus();
                        }
                    });
                }
            });

            $(this.formSelector + ' #' + (this.actualCarouselItem - 1)).css('transform');
            $(this.formSelector + ' #' + (this.actualCarouselItem - 1) + '.af2_carousel_item').addClass('left_marg');

            const newPercent = (this.actualSection / (this.size - 1)) * 100;
            $(this.formSelector + ' .af2_form_progress').css('width');
            $(this.formSelector + ' .af2_form_progress').css('width', newPercent + '%');

            prom.resolve([sec, cont]);

            //this.af2SetPercentage(parseInt($(this.formSelector + ' .af2_form_percentage').html()), newPercent, 500, 'up');
        });

        return prom.promise();
    };

    this.af2SetPercentage = (oldPercentage, newPercentage, interv, way) => {

        let difference = newPercentage - oldPercentage;
        let actPercentage = oldPercentage + 1;

        if (way === 'down')
        {
            difference = oldPercentage - newPercentage;
            actPercentage = oldPercentage - 1;
        }


        if (difference === 0)
        {
            return null;
        }

        let interval = interv / difference;

        setTimeout(() => {
            $(this.formSelector + ' .af2_form_percentage').html(actPercentage + '%');
            this.af2SetPercentage(actPercentage, newPercentage, interv - interval, way);
        }, interval);

    };
}

const af2AdjustSliderBullet = (sliderSelector, sliderBulletSelector, json, $) => {
    let val = sliderSelector.val();
    const min = sliderSelector.attr('min');
    const max = sliderSelector.attr('max');
    const width = sliderSelector.width();
    const thumbWidth = 25;
    const offset = 19;

    let cont = val;

    let bulletPercentage = ((val - min) / (max - min));
    let bulletPosition = bulletPercentage * (width - thumbWidth) - offset;

    putInThousands(json, cont).done((ret) => {
        cont = ret;

        const labelBefore = json.type_specifics.labelBefore;
        const label = json.type_specifics.label;
        if (label !== undefined && label !== null && label.trim() !== '')
        {
            if (labelBefore == false || labelBefore === undefined)
            {
                cont += label;
            } else if (labelBefore == true)
            {
                cont = label + cont;
            }
        }

        //sliderBulletSelector.css('left', bulletPosition + 'px');
        sliderBulletSelector.each((i, el) => {
            $(el).html(cont);
        });
    });
};

/**
 * Finding new contents
 *
 * @param $
 * @param iterator
 * @param from
 */
const af2FindNew = ($, iterator, from) => {
    let newSection = undefined;
    let newContent = undefined;

    let found = false;
    $.each(iterator, (i, el) => {
        if (el.operator === undefined)
        {
            if (newSection === undefined)
            {
                if (el.from === -1)
                {
                    if (found === false)
                    {
                        newSection = el.to_section;
                        newContent = el.to_content;
                    }
                } else if (el.from === from)
                {
                    newSection = el.to_section;
                    newContent = el.to_content;
                    found = true;
                }
            }
        } else
        {
            switch (el.operator)
            {
                case '<':
                {
                    if (parseInt(from) < parseInt(el.number))
                    {
                        newSection = el.to_section;
                        newContent = el.to_content;
                    }
                    break;
                }
                case '<=':
                {
                    if (parseInt(from) <= parseInt(el.number))
                    {
                        newSection = el.to_section;
                        newContent = el.to_content;
                    }
                    break;
                }
                case '>':
                {
                    if (parseInt(from) > parseInt(el.number))
                    {
                        newSection = el.to_section;
                        newContent = el.to_content;
                    }
                    break;
                }
                case '>=':
                {
                    if (parseInt(from) >= parseInt(el.number))
                    {
                        newSection = el.to_section;
                        newContent = el.to_content;
                    }
                    break;
                }
                case '=':
                {
                    if (parseInt(from) == parseInt(el.number))
                    {
                        newSection = el.to_section;
                        newContent = el.to_content;
                    }
                    break;
                }
                case '!=':
                {
                    if (parseInt(from) != parseInt(el.number))
                    {
                        newSection = el.to_section;
                        newContent = el.to_content;
                    }
                    break;
                }
            }
        }
    });

    return [newSection, newContent];
};

/**
 * Draws out the content into the carousel
 *
 * @param $
 * @param dataid
 * @param formSelector
 * @param carouselNum
 */
const af2DrawCarouselContent = ($, dataid, formSelector, carouselNum) => {

    if ($(formSelector + ' .af2_form_carousel').html() === "")
    {
        $(formSelector + ' .af2_form_carousel').css('max-width', $(formSelector + ' .af2_form_carousel').width());
        $(formSelector + ' .af2_form_carousel').css('min-width', $(formSelector + ' .af2_form_carousel').width());
    }

    /** Check out which type it is **/
    const type = af2_datas[dataid].af2_type;                                                                                // The type of the Content to draw
    let content = '';

    /** Build wrapper **/
    content += '<div id="' + carouselNum + '" class="af2_carousel_item">';
    content += '<div class="af2_carousel_content">';

    let json = undefined;
    /** Validate the type **/
    if (type === 'frage')
    {
        content += af2DrawFrage($, af2_datas[dataid], formSelector);
        json = af2_datas[dataid];
    } else if (type === 'kontaktformular')
    {
        content += af2DrawKontaktformular($, af2_datas[dataid]);
    }

    /** Close wrapper **/
    content += '</div>';
    content += '</div>';

    /** Print out **/
    $(formSelector + ' .af2_form_carousel').append(content);

    if (json !== undefined && json.typ === 'af2_slider')
    {
        const af2SliderFrageSelector = $(formSelector + ' #' + carouselNum + '.af2_carousel_item .af2_slider_frage');
        const af2SliderFrageBulletSelector = $(formSelector + ' #' + carouselNum + '.af2_carousel_item .af2_slider_frage_bullet');
        af2AdjustSliderBullet(af2SliderFrageSelector, af2SliderFrageBulletSelector, json, $);
    }

    // initalize datepicker
    if (json !== undefined && json.typ === 'af2_datum') {

        let ele = $(formSelector + ' #' + carouselNum + ' div[data-fragen="date"]');
        let date_input = $(formSelector + ' #' + carouselNum + ' input.af2_datum_frage');
        let format = (ele.data("format") != 'undefined' && typeof ele.data("format") != 'undefined') ? ele.data("format") : 'dd.mm.yy';

        ele.datepicker({
            dateFormat: format,
            onSelect: (date) => {
                $(formSelector + ' .af2_form_foward_button').removeClass('af2_disabled');
                date_input.val(date);
            }
        });
    }

};

/**
 * Draws the content of a question
 *
 * @param $
 * @param json
 * @returns {string}
 */
const af2DrawFrage = ($, json, formSelector) => {
    let content = '';


    /** Validate Questiontype **/
    if (json.typ === 'af2_select')
    {
        content += '<div class="af2_question_heading_wrapper desktop"><h4 class="af2_question_heading desktop">' + json.frontend_name + '</h4><h4 class="af2_question_description desktop">' + json.frontend_description + '</h4></div>';
        content += '<div class="af2_question_heading_wrapper af2_mobile"><h4 class="af2_question_heading af2_mobile">' + json.frontend_name + '</h4><h4 class="af2_question_description af2_mobile">' + json.frontend_description + '</h4></div>';
        content += '<div class="af2_answer_container">';
        content += af2ProcessAnswers($, json.type_specifics.answers);
        content += '<div>';
    } else if (json.typ === 'af2_multiselect')
    {
        let cond = '(Mehrfachauswahl möglich)';
        if (json.type_specifics.condition !== '' && $.isNumeric(json.type_specifics.condition) && json.type_specifics.condition > 1)
        {
            cond = '(Bis zu ' + json.type_specifics.condition + ' Antworten möglich)';
        }
        content += '<div class="af2_question_heading_wrapper desktop"><h4 class="af2_question_heading desktop">' + json.frontend_name + '</h4><h4 class="af2_question_description desktop">' + json.frontend_description + '</h4></div>';
        content += '<div class="af2_question_heading_wrapper af2_mobile"><h4 class="af2_question_heading af2_mobile">' + json.frontend_name + '</h4><h4 class="af2_question_description af2_mobile">' + json.frontend_description + '</h4></div>';
        content += '<div class="af2_answer_container">';
        content += af2ProcessAnswers($, json.type_specifics.answers);
        content += '<div>';
    } else if (json.typ === 'af2_textfeld')
    {
        content += '<div class="af2_question_heading_wrapper desktop"><h4 class="af2_question_heading desktop">' + json.frontend_name + '</h4><h4 class="af2_question_description desktop">' + json.frontend_description + '</h4></div>';
        content += '<div class="af2_question_heading_wrapper af2_mobile"><h4 class="af2_question_heading af2_mobile">' + json.frontend_name + '</h4><h4 class="af2_question_description af2_mobile">' + json.frontend_description + '</h4></div>';
        content += '<input type="text" class="af2_textfeld_frage desktop" placeholder="' + json.type_specifics.placeholder + '">';
        content += '<input type="text" class="af2_textfeld_frage af2_mobile" placeholder="' + json.type_specifics.placeholder + '">';
    } else if (json.typ === 'af2_textbereich')
    {
        content += '<div class="af2_question_heading_wrapper desktop"><h4 class="af2_question_heading desktop">' + json.frontend_name + '</h4><h4 class="af2_question_description desktop">' + json.frontend_description + '</h4></div>';
        content += '<div class="af2_question_heading_wrapper af2_mobile"><h4 class="af2_question_heading af2_mobile">' + json.frontend_name + '</h4><h4 class="af2_question_description af2_mobile">' + json.frontend_description + '</h4></div>';
        content += '<textarea class="af2_textbereich_frage desktop" placeholder="' + json.type_specifics.placeholder + '"></textarea>';
        content += '<textarea class="af2_textbereich_frage af2_mobile" placeholder="' + json.type_specifics.placeholder + '"></textarea>';
    } else if (json.typ === 'af2_datum')
    {
        content += '<div class="af2_question_heading_wrapper desktop"><h4 class="af2_question_heading desktop">' + json.frontend_name + '</h4><h4 class="af2_question_description desktop">' + json.frontend_description + '</h4></div>';
        content += '<div class="af2_question_heading_wrapper af2_mobile"><h4 class="af2_question_heading af2_mobile">' + json.frontend_name + '</h4><h4 class="af2_question_description af2_mobile">' + json.frontend_description + '</h4></div>';
        content += '<input type="text" class="af2_datum_frage desktop" placeholder="' + json.type_specifics.placeholder + '">';
        content += '<input type="text" class="af2_datum_frage af2_mobile" placeholder="' + json.type_specifics.placeholder + '">';
        content += '<div class="af2-datepicker af2_datepicker desktop" data-fragen="date" data-format="' + json.type_specifics.format + '"></div>';
        content += '<div class="af2-datepicker af2_datepicker af2_mobile" data-fragen="date" data-format="' + json.type_specifics.format + '"></div>';
    } else if (json.typ === 'af2_content')
    {
        content += '<div class="af2_question_heading_wrapper desktop"><h4 class="af2_question_heading desktop">' + json.frontend_name + '</h4><h4 class="af2_question_description desktop">' + json.frontend_description + '</h4></div>';
        content += '<div class="af2_question_heading_wrapper af2_mobile"><h4 class="af2_question_heading af2_mobile">' + json.frontend_name + '</h4><h4 class="af2_question_description af2_mobile">' + json.frontend_description + '</h4></div>';
        content += '<div class="af2_content_frage">' + json.type_specifics.content + '</div>';

        if (json.type_specifics.content_button == true)
        {
            content += '<div class="af2_submit_wrapper"><input class="af2_submit_button no_send" value="' + json.type_specifics.content_button_text + '" type="submit"></div>';
        }
    } else if (json.typ === 'af2_slider')
    {
        $(formSelector + ' .af2_form_bottombar').css('opacity', 1);
        let min = json.type_specifics.min;
        let max = json.type_specifics.max;
        let label = json.type_specifics.label;
        let labelBefore = json.type_specifics.labelBefore;

        putInThousands(json, min).done((ret) => {
            min = ret;

            putInThousands(json, max).done((ret) => {
                max = ret;

                if (label !== undefined && label !== null && label.trim() !== '')
                {
                    if (labelBefore == false || labelBefore === undefined)
                    {
                        min += label;
                        max += label;
                    } else if (labelBefore == true)
                    {
                        min = label + min;
                        max = label + max;
                    }
                }

                let val = '';

                if (json.type_specifics.start !== undefined)
                {
                    val = 'value="' + parseInt(json.type_specifics.start) + '"';
                }


                content += '<div class="af2_question_heading_wrapper desktop"><h4 class="af2_question_heading desktop">' + json.frontend_name + '</h4><h4 class="af2_question_description desktop">' + json.frontend_description + '</h4></div>';
                content += '<div class="af2_question_heading_wrapper af2_mobile"><h4 class="af2_question_heading af2_mobile">' + json.frontend_name + '</h4><h4 class="af2_question_description af2_mobile">' + json.frontend_description + '</h4></div>';

                content += '<div class="af2_slider_frage_wrapper">';
                content += '<div class="af2_slider_frage_bullet desktop"></div>';
                content += '<div class="af2_slider_frage_bullet af2_mobile"></div>';
                content += '<input class="af2_slider_frage" ' + val + ' type="range" min="' + json.type_specifics.min + '" max="' + json.type_specifics.max + '" step="' + json.type_specifics.step + '">';
                content += '<div class="af2_slider_frage_minmax"><p>' + min + '</p><p>' + max + '</p></div>';
                content += '</div>';
            });
        });

    }

    return content;
};

const putInThousands = (json, cont) => {
    let len = cont.length;
    let prom = $.Deferred();

    let ret = '';

    let times = parseInt(len / 3);

    if (json.type_specifics.thousand == true)
    {
        if (len > 3)
        {
            let mod = len % 3;
            if (len % 3 === 0)
            {
                times--;
            }

            if (mod === 0)
            {
                mod = 3;
            }

            let schritt = 0;
            for (schritt = 1; schritt <= times; schritt++)
            {
                ret = '.' + cont.substr(cont.length - schritt * 3, 3) + ret;

                if (schritt === times)
                {
                    ret = cont.substr(0, mod) + ret
                    return prom.resolve(ret);
                }
            }
        } else
        {
            return prom.resolve(cont);
        }
    } else
    {
        return prom.resolve(cont);
    }



    return prom.promise();
};


/**
 * Draws the content of a Kontaktformular
 *
 * @param $
 * @param json
 */
const af2DrawKontaktformular = ($, json) => {
    let content = '';

    content += '<div class="af2_question_heading_wrapper desktop"><h4 class="af2_question_heading desktop">' + json.frontend_name + '</h4></div>';
    content += '<div class="af2_question_heading_wrapper af2_mobile"><h4 class="af2_question_heading af2_mobile">' + json.frontend_name + '</h4></div>';

    $.each(json.questions, (i, el) => {
        let required = '';
        if (el.required === true)
        {
            required = ' *';
        }
        content += '<div id="' + i + '" class="af2_question">';

        if (el.typ.includes('text_type_'))
        {
            if (el.typ.includes('_name'))
            {
                content += '<div class="af2_question_text_type_wrapper af2_question_wrapper">';
                content += '<div class="af2_question_text"><p class="af2_question_label">' + el.label + required + '</p></div>';
                content += '<input type="text" class="af2_text_type" placeholder="' + el.placeholder + '" autofill="name">';
                content += '</div>';
            } else if (el.typ.includes('_mail'))
            {
                content += '<div class="af2_question_text_type_wrapper af2_question_wrapper">';
                content += '<div class="af2_question_text"><p class="af2_question_label">' + el.label + required + '</p></div>';
                content += '<input type="text" autofill="email" class="af2_text_type" placeholder="' + el.placeholder + '">';
                content += '</div>';
            } else if (el.typ.includes('_phone'))
            {
                content += '<div class="af2_question_text_type_wrapper af2_question_wrapper">';
                content += '<div class="af2_question_text"><p class="af2_question_label">' + el.label + required + '</p></div>';
                content += '<input type="text" autofill="tel" class="af2_text_type" placeholder="' + el.placeholder + '">';
                content += '</div>';
            } else
            {
                content += '<div class="af2_question_text_type_wrapper af2_question_wrapper">';
                content += '<div class="af2_question_text"><p class="af2_question_label">' + el.label + required + '</p></div>';
                content += '<input type="text" class="af2_text_type" placeholder="' + el.placeholder + '">';
                content += '</div>';
            }
        } else if (el.typ.includes('checkbox'))
        {
            content += '<div class="af2_question_wrapper">';
            content += '<div class="af2_question_checkbox_type_wrapper">';
            content += '<input type="checkbox" class="af2_checkbox_type"><div class="af2_question_text"><p class="af2_question_cb_label">' + el.text + required + '</p></div>';
            content += '</div>';
            content += '</div>';
        } else if (el.typ.includes('google_recaptcha'))
        {
            if (el.site_key.length > 0 && el.site_key != '') {
                content += '<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>';
                content += '<div class="af2_question_wrapper">';
                content += '<div id="' + el.id + '"></div>';
                content += '<script type="text/javascript">var onloadCallback=function() {let _e = document.querySelector(".af2_form_carousel").style.height;const _h = parseInt(_e) + 80; document.querySelector(".af2_form_carousel").style.height= _h + "px"; grecaptcha.render("' + el.id + '",{"sitekey" : "' + el.site_key + '","callback":callback});document.querySelector(".af2_submit_button").setAttribute("disabled", true)};var callback=function() {document.querySelector(".af2_submit_button").removeAttribute("disabled")}</script>';
                content += '</div>';
            }
        }

        content += '</div>';
    });

    content += '<div class="af2_question_wrapper">';
    content += '<div class="af2_submit_wrapper"><input class="af2_submit_button" value="' + json.sendButtonLabel + '" type="submit"></div>';
    content += '</div>';

    return content;
};

/**
 * Process Answers for a question
 *
 * @param $
 * @param answers
 * @returns {string}
 */
const af2ProcessAnswers = ($, answers) => {
    let content = '';

    $.each(answers, (i, el) => {
        let answer_img = '';
        if (el.icon_type === 'url')
        {
            answer_img = '<div class="af2_answer_card_ desktop"><div class="af2_answer_image_wrapper"><img class="af2_answer_image pic" src="' + el.icon + '" alt="answer_image"></div></div>';
            answer_img += '<div class="af2_answer_card_ af2_mobile"><div class="af2_answer_image_wrapper af2_mobile"><img class="af2_answer_image pic" src="' + el.icon + '" alt="answer_image"></div><div class="af2_answer_text af2_mobile">' + el.text + '</div></div>';
        } else if (el.icon_type === 'font-awesome')
        {
            answer_img = '<div class="af2_answer_card_ desktop"><div class="af2_answer_image_wrapper"><i class="' + el.icon + ' fa-5x"></i></div></div>';
            answer_img += '<div class="af2_answer_card_ af2_mobile"><div class="af2_answer_image_wrapper af2_mobile"><i class="' + el.icon + ' fa-2x"></i></div><div class="af2_answer_text af2_mobile">' + el.text + '</div></div>';
        }

        content += '<div id="' + i + '" class="af2_answer_ desktop">';
        content += answer_img;
        content += '<div class="af2_answer_text desktop">' + el.text + '</div>';
        content += '</div>';

        content += '<div id="' + i + '" class="af2_answer_ af2_mobile">';
        content += answer_img;
        content += '</div>';
    });

    return content;
};


/**
 * Performing and handling a Data-request
 *
 * @param $
 * @param formSelector
 * @param selector
 * @param dataids
 */
const af2HandleRequest = ($, formSelector, selector, dataids) => {
    const result = requestData($, dataids);

    /**
     * When it had no error -> Throw the Event and set the data into the Array
     */
    result.done((json) => {

        /** Setting up Data **/
        const keys = Object.keys(json);

        $.each(keys, (i, el) => {
            af2_datas[el] = json[el];
        });

        /** Throwing out event **/
        let finishedEvent = jQuery.Event('loadedData');
        finishedEvent.dataids = dataids;
        $(selector).trigger(finishedEvent);
    });
    /**
     * When it has an Error -> just send the Error out and fill the data with 'ERROR'
     */
    result.fail((error) => {
        af2ThrowError($, $(formSelector), error);
    });
};

/**
 * Request all data needet to process the Formular in future
 */
const requestData = ($, dataids) => {
    const prom = $.Deferred();
    $.ajax({
        url: af2_backend_ajax.ajax_url,
        type: "GET",
        data: {
            _ajax_nonce: af2_backend_ajax.nonce,
            action: 'af2_request_data_content',
            ids: dataids
        },
        success: (answer) => {
            if (answer === 'ERROR')
            {
                prom.reject('Es ist ein Fehler aufgetreten!');
            } else
            {
                let answerJson = JSON.parse(answer);
                prom.resolve(answerJson);
            }
        },
        error: () => {
            prom.reject('Es ist ein Fehler aufgetreten.');
        }
    });

    return prom.promise();
};

/**
 * Find out if this attribute is in the array
 *
 * @param $
 * @param attribute
 * @param arr
 */
const af2CompareAttributeInArray = ($, attribute, arr) => {
    const prom = $.Deferred();

    $(arr).each((i, el) => {
        if (el === attribute)
        {
            prom.resolve();
        }
    });

    return prom.promise();
};

/**
 * Function to append stylings
 */
const af2LoadStyling = ($, id, formSelector) => {
    /** Overwrite styling **/
    af2OverwriteStylings($, af2_datas[id].styling).done((styling) => {
        /** Generate the styling **/
        af2GenerateStylingContent($, formSelector, styling).done((style) => {
            $('head').append(style);
        });
    });
};

/**
 * Merges the new Styling with the basic one
 *
 * @param $
 * @param styling
 * @returns json
 */
const af2OverwriteStylings = ($, styling) => {
    const prom = $.Deferred();
    let newStyling = af2Styles;                                                                                         // Copy of the basic styling

    const keys = Object.keys(styling);

    $(keys).each((i, e) => {
        $.each(styling[e], (j, el) => {
            $.each(newStyling[e], (k, ele) => {
                if (ele.Tattribute === 'background-color' && el.attribute === 'background-color')
                {
                    styling;
                    newStyling;
                }
                if (ele.attribute === el.attribute)
                {
                    if (ele.special_class === el.special_class && ele.special_state === el.special_state)
                    {
                        newStyling[e][k].value = styling[e][j].value;
                    }
                    
                }
            });
        });

        if (i === keys.length - 1)
        {
            prom.resolve(newStyling);
        }
    });

    return prom.promise();
};

/**
 * Generate the content for the styling
 *
 * @param $
 * @param formSelector
 * @param styling
 * @returns {*}
 */
const af2GenerateStylingContent = ($, formSelector, styling) => {
    const prom = $.Deferred();
    let content = '';

    /** Create wrapper **/
    content += '<style id="af2_styling_here">';

    const keys = Object.keys(styling);

    $(keys).each((i) => {
        let desktopList = [];
        let mobileList = [];
        let dateList = [];
        let af2DisabledList = [];
        let focusList = [];
        let wtList = [];
        let mtList = [];
        content += formSelector + ' .' + keys[i] + '{';

        $.each(styling[keys[i]], (j, e) => {
            if (e.special_class !== undefined)
            {
                if (e.special_class === "desktop")
                    desktopList.push(e);
                else if (e.special_class === "af2_mobile")
                    mobileList.push(e);
                else if (e.special_class === "af2_disabled")
                    af2DisabledList.push(e);
                else if (e.special_class === "af2_datepicker")
                    dateList.push(e);
            } else if (e.special_state !== undefined)
            {
                if (e.special_state === "focus")
                    focusList.push(e);
            } else if (e.special_extra !== undefined)
            {
                if (e.special_extra === "-webkit-slider-thumb")
                    wtList.push(e);
                else if (e.special_extra === "-moz-range-thumb")
                    mtList.push(e);
            } else
            {
                content += e.attribute + ':' + e.value + ';';
            }
        });

        content += '}';

        /** Desktop **/
        if (desktopList.length > 0)
        {
            content += formSelector + ' .' + keys[i] + '.desktop {';
        }
        $.each(desktopList, (j, e) => {
            content += e.attribute + ':' + e.value + ';';
        });
        if (desktopList.length > 0)
        {
            content += '}';
        }

        /** Mobile **/
        if (mobileList.length > 0)
        {
            content += formSelector + ' .' + keys[i] + '.af2_mobile {';
        }
        $.each(mobileList, (j, e) => {
            content += e.attribute + ':' + e.value + ';';
        });
        if (mobileList.length > 0)
        {
            content += '}';
        }

        /** af2Disabled **/
        if (af2DisabledList.length > 0)
        {
            content += formSelector + ' .' + keys[i] + '.af2_disabled {';
        }
        $.each(af2DisabledList, (j, e) => {
            content += e.attribute + ':' + e.value + ';';
        });
        if (af2DisabledList.length > 0)
        {
            content += '}';
        }

        /** Datepciker styling **/
        if (dateList.length > 0)
        {
            $.each(dateList, (j, e) => {
                content += formSelector + ' .af2-datepicker .' + e.sub_class + ' {';
                content += e.attribute + ':' + e.value + ';';
                content += '}';
            });
        }

        /** :focus **/
        if (focusList.length > 0)
        {
            content += formSelector + ' .' + keys[i] + ':focus {';
        }
        $.each(focusList, (j, e) => {
            content += e.attribute + ':' + e.value + ';';
        });
        if (focusList.length > 0)
        {
            content += '}';
        }

        /** moz **/
        if (mtList.length > 0)
        {
            content += formSelector + ' .' + keys[i] + '::-moz-range-thumb {';
        }
        $.each(mtList, (j, e) => {
            content += e.attribute + ':' + e.value + ';';
        });
        if (mtList.length > 0)
        {
            content += '}';
        }

        /** web **/
        if (wtList.length > 0)
        {
            content += formSelector + ' .' + keys[i] + '::-webkit-slider-thumb {';
        }
        $.each(wtList, (j, e) => {
            content += e.attribute + ':' + e.value + ';';
        });
        if (wtList.length > 0)
        {
            content += '}';
        }

        if (i === keys.length - 1)
        {
            prom.resolve(content);
        }
    });

    /** Close wrapper **/
    content += '</style>';

    return prom.promise();
};

/**
 * Throw an Error to the given Selector
 *
 * @param $
 * @param selector
 * @param errortext
 */
const af2ThrowError = ($, selector, errortext) => {
    selector.after('<p class="af2_loading_error">' + errortext + '</p>');
};


const af2ThrowLoadingSuccess = ($, selector, html) => {
    selector.append(html);
};
const af2ThrowLoadingError = ($, selector, html) => {
    selector.append(html);
};

const af2_update_styling = () => {
    //$('head style').html();

    $('style#af2_styling_here').remove();

    $.when(af2GenerateStylingContent($, '#af2_form_0', af2Styles)).done((style) => {
        $('head').append(style);
    });
};