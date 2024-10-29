let drag_element;
$ = jQuery;
jQuery(document).ready(($) => {
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
         $(ev.currentTarget,).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', () => {
             $(ev.currentTarget,).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd');
             $(ev.currentTarget,).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', () => {
                 $(ev.currentTarget,).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd');
                 af2_remove_mark(ev.currentTarget);
             });
             af2_unmark_content(ev.currentTarget);
         });

         af2_mark_content(ev.currentTarget);
     });

    /**
     * WHEN REDO OR UNDO
     */
    $('.af2_whole').on('do', () => {
         af2_sidebar_clear_content('af2_customize_sidebar');
         af2_close_sidebar('af2_customize_sidebar');
     });


    $(document).on('draggable_select', '.af2_draggable', (ev) => {
        let dragobj = $(ev.currentTarget).clone();
        $(dragobj).addClass('af2_drag_object');
        $(dragobj).addClass('hide');
        $(dragobj).removeClass('deleteable');
        $(dragobj).removeClass('draggable');
        drag_element = ev.currentTarget;

        $.when(af2_dnd_set_element_position(dragobj, ev)).done(() => {
            $('.af2_whole').append(dragobj);
        });

        $(document).on('mouseenter', '.af2_answer_margs', (ev) => {
            $(ev.currentTarget).addClass('af2_drop_container');
            $(ev.currentTarget).addClass('dotter_border');
            $(ev.currentTarget).addClass('hover');
        });

        $(document).on('mouseleave', '.af2_answer_margs', (ev) => {
            $(ev.currentTarget).removeClass('af2_drop_container');
            $(ev.currentTarget).removeClass('dotter_border');
            $(ev.currentTarget).removeClass('hover');
        });
    });

    $(document).on('first_drag', '.af2_drag_object', (ev) => {
        $($(drag_element).prev('.af2_answer_margs')).addClass('hide');

        $.when(af2_dnd_set_element_position(ev.currentTarget, ev)).done(() => {
            $(drag_element).addClass('getting_dragged');
            $(ev.currentTarget).removeClass('hide');
        });
    });

    $(document).on('drag', '.af2_drag_object', (ev) => {
        af2_dnd_set_element_position(ev.currentTarget, ev);
    });

    $(document).on('drop', '.af2_drag_object', (ev) => {
        $(document).off('mouseenter', '.af2_answer_margs');
        $(document).off('mouseleave', '.af2_answer_margs');

        $(ev.currentTarget).remove();
        $(drag_element).removeClass('getting_dragged');
        drag_element = undefined;

        $('.af2_answer_margs.hide').each((i, el) => {
            $(el).removeClass('hide');
        });

        $('.af2_answer_margs.af2_drop_container').each((i, el) => {
            $(el).removeClass('af2_drop_container');
        })

        $('.af2_answer_margs.dotter_border').each((i, el) => {
            $(el).removeClass('dotter_border');
            $(el).removeClass('hover');
        });
    });

    $(document).on('drop_into', '.af2_drag_object', (ev) => {
        $(document).off('mouseenter', '.af2_answer_margs');
        $(document).off('mouseleave', '.af2_answer_margs');

        $(ev.currentTarget).remove();
        $(drag_element).removeClass('getting_dragged');


        $('.af2_answer_margs.hide').each((i, el) => {
            $(el).removeClass('hide');
        });

        $('.af2_answer_margs.af2_drop_container').each((i, el) => {
            $(el).removeClass('af2_drop_container');
        });

        $('.af2_answer_margs.dotter_border').each((i, el) => {
            $(el).removeClass('dotter_border');
            $(el).removeClass('hover');
        });

        const containerpos = $(ev.into).attr('id');
        const dragelid = $(drag_element).attr('id');
        const dragelpos = dragelid.substr(11);

        if(containerpos !== dragelpos)
        {
            af2_throw_event('dropped_into_container', [{"arg":'containerpos', "content":containerpos},
                {"arg":"dragelpos", "content":dragelpos}], '.af2_whole');
        }

        drag_element = undefined;
    });
});

/**
 * Updating the UI that the new Question type is visible
 */
const af2_update_question_type = () => {
    const type = af2_jsonobj.typ;
    let content;
    switch(type)
    {
        case 'af2_select':
        {
            content = af2_select_html();
            af2_sidebar_selection_clear('af2_content_sidebar');
            af2_sidebar_select($('#af2_select'));
            break;
        }
        case 'af2_multiselect':
        {
            content = af2_multiselect_html();
            af2_sidebar_selection_clear('af2_content_sidebar');
            af2_sidebar_select($('#af2_multiselect'));
            break;
        }
        default:
        {
            content = '';
            af2_sidebar_selection_clear('af2_content_sidebar');
            af2_clear_content();
            return;
        }
    }

    $.when($('.af2_content').html(content)).done(() => {
        af2_throw_event('af2_update', [{"arg":"callback", "content":af2_update_fb_content}], $('.af2_whole'));
    });
};

/**
 * Updating everything in Content
 */
const af2_update_fb_content = () => {
    const selector = $('.af2_whole');
    af2_throw_event('af2_update', [{"arg":"callback", "content":af2_update_question_title}], selector);
    af2_throw_event('af2_update', [{"arg":"callback", "content":af2_update_question_description}], selector);
    af2_throw_event('af2_update', [{"arg":"callback", "content":af2_update_answers}], selector);

    if(af2_jsonobj.typ === 'af2_multiselect')
    {
        af2_update_condition();
    }
};

/**
 * Updating the Questiontitle
 */
const af2_update_question_title = () => {
    const selector = $('#af2_questiontitle');
    let cont;
    if(af2_jsonobj.name === undefined || af2_jsonobj.name.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.name;
    }
    selector.html(cont);
};
/**
 * Updating the Questiontitle
 */
const af2_update_question_description = () => {
    const selector = $('#af2_questiondescription');
    let cont;
    if(af2_jsonobj.description === undefined || af2_jsonobj.description.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.description;
    }
    selector.html(cont);
};
const af2_update_content_button_text = () => {
    const selector = $('#af2_content_button_text');
    let cont;
    if(af2_jsonobj.content_button_text === undefined || af2_jsonobj.content_button_text.trim() === '')
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = af2_jsonobj.content_button_text;
    }
    selector.html(cont);
};
const af2_update_condition = () => {
    const selector = $('#af2_condition');
    let cont;
    if(af2_jsonobj.condition === undefined || af2_jsonobj.condition.trim() === '' || !$.isNumeric(af2_jsonobj.condition))
    {
        cont  = selector.data('basetext');
    }
    else
    {
        cont = 'Maximale Anzahl: ' + af2_jsonobj.condition;
    }
    selector.html(cont);
};

/**
 * Updating the Answers
 */
const af2_update_answers = () => {
    $(af2_jsonobj.answers).each((i) => {
        af2_update_answer(i);
    });

    while(af2_jsonobj.answers.length < $('.af2_answer_container .af2_answer.af2_editable_content').length)
    {
        let selector = $('.af2_answer');
        let position = selector.length-2;
        selector[position].remove();
        selector = $('.af2_answer_margs');
        position = selector.length-1;
        selector[position].remove();
        if($('.af2_answer_margs').length === 2)
        {
            selector[position].remove();
        }
    }
};

/**
 * Update Answer
 */
const af2_update_answer = (answerid) => {
    if($('#af2_answer_'+answerid)[0] === undefined && answerid >= $('.af2_answer').length-1)
    {
        af2_create_answer_content(answerid);
    }
    af2_update_answer_text(answerid);
    af2_update_answer_pic(answerid);
};

/**
 * Updating the Answertext
 *
 * @param answerid
 */
const af2_update_answer_text = (answerid) => {
    const selector = $('#af2_answer_p_'+answerid);
    let cont = af2_jsonobj.answers[answerid].text;
    if(cont === undefined || cont.trim() === '')
    {
        cont = selector.data('basetext');
    }
    selector.html(cont);
};

/**
 * Updating the Answerpic
 *
 * @param answerid
 */
const af2_update_answer_pic = (answerid) => {
    const selector = $('#af2_answer_pic_'+answerid);
    let cont = af2_jsonobj.answers[answerid].img;
    if(cont === undefined || cont.trim() === '')
    {
        cont = ""
    }
    else if(cont.includes('http'))
    {
        cont = '<img class="af2_answer_pic" src="'+cont+'" alt="answerimg" />';
    }
    else
    {
        cont = '<i class="'+cont+' fa-5x"></i>';
    }

    selector.html(cont);

};


/**
 * Creating an Answer content
 *
 * @param answerid
 */
const af2_create_answer_content = (answerid) => {
    $($('.af2_add_answer')[0]).remove();
    const selector = $('.af2_answer_container');
    let cont = '';
    if(answerid === 1)
    {
        selector.prepend('<div id="0" class="af2_answer_margs"></div>');
    }
    cont += '<div id="af2_answer_'+answerid+'" class="af2_answer af2_editable_content af2_draggable deleteable" data-type="answer" data-titletext="Antworttext" data-titleimg="Bild">';
    cont += '<div id="af2_answer_pic_'+answerid+'" class="af2_answer_img af2_changeable vertical_centering"></div>';
    cont += '<div id="af2_answer_p_'+answerid+'" class="af2_answer_p af2_changeable vertical_centering" data-basetext="Ihre Antwort"></div>';
    cont += '</div>';
    cont += '<div id="'+(answerid+1)+'" class="af2_answer_margs"></div>';
    cont += '<div class="af2_answer af2_add_answer"><i class="fas fa-plus fa-3x"></i></div>';
    selector.append(cont);
};


/** ************************************************************************ **/
/**                           ANSWER TYPE CREATION                           **/
/** ************************************************************************ **/

/**
 * Pushing Select Parts
 *
 * @returns {string}
 */
const af2_select_html = () => {
    let cont = '';
    cont += '<div id="af2_questiontitle" class="af2_content_title af2_editable_content af2_changeable" data-type="text" data-placeholder="Ihre Frage..." data-title="Fragentitel" data-basetext="Fügen Sie hier Ihren Fragentitel ein!"></div>';
    cont += '<div id="af2_questiondescription" class="af2_content_description af2_editable_content af2_changeable" data-type="text" data-placeholder="Ihre Beschreibung..." data-title="Beischreibung (optional)" data-basetext="Beschreibung (optional)"></div>';
    cont += '<div class="af2_answer_container">';
    cont += '<div class="af2_answer af2_add_answer"><i class="fas fa-plus fa-3x"></i></div>';
    cont += '</div>';
    return cont;
};

/**
 * Pushing Multiselect Parts
 * @returns {string}
 */
const af2_multiselect_html = () => {
    let cont = '';
    cont += '<div id="af2_questiontitle" class="af2_content_title af2_editable_content af2_changeable" data-type="text" data-title="Fragentitel" data-placeholder="Ihre Frage..." data-basetext="Fügen Sie hier Ihren Fragentitel ein!"></div>';
    cont += '<div id="af2_questiondescription" class="af2_content_description af2_editable_content af2_changeable" data-type="text" data-placeholder="Ihre Beschreibung..." data-title="Beischreibung (optional)" data-basetext="Beschreibung (optional)"></div>';
    cont += '<div id="af2_condition" class="af2_condition af2_editable_content af2_changeable" data-type="text" data-title="Maximale Anzahl" data-placeholder="Anzahl..." data-basetext="Maximale Anzahl an wählbaren Antworten (wenn leer - dann unbegrenzt)"></div>';
    //cont += '<div id="af2_condition" class="af2_condition af2_editable_content af2_changeable" data-type="text">2 von XY</div>';
    cont += '<div class="af2_answer_container">';
    cont += '<div class="af2_answer af2_add_answer"><i class="fas fa-plus fa-3x"></i></div>';
    cont += '</div>';
    return cont;
};

const af2_update_content_wait = () => {

};



const af2_update_content_button = () => {
    if(af2_jsonobj.content_button == true)
    {
        $('#af2_content_button_text').css('display', 'unset');
    }
    else if(af2_jsonobj.content_button == false)
    {
        $('#af2_content_button_text').css('display', 'none');
    }

    af2_update_content_button_text();
};


const af2_update_min = () => {
    const selector = $('#af2_slide_wrapper_min_');

    let cont = '';
    if(af2_jsonobj.min !== undefined && $.isNumeric(af2_jsonobj.min))
    {
        cont = af2_jsonobj.min;

        if(af2_jsonobj.max !== undefined && $.isNumeric(af2_jsonobj.max) && parseInt(af2_jsonobj.min) < parseInt(af2_jsonobj.max) && $.isNumeric(af2_jsonobj.step))
        {
            $('#af2_slide').remove();
            const slider = '<input id="af2_slide" class="af2_slide" type="range" min="'+af2_jsonobj.min+'" max="'+af2_jsonobj.max+'" step="'+af2_jsonobj.step+'">';
            $('.slide_wrapper').html(slider);
        }
    }
    af2_update_bullet();

    putInThousands(cont).done((ret) => {
        cont = ret;

        if(af2_jsonobj.label !== undefined && af2_jsonobj.label.trim() !== '')
        {
            if(af2_jsonobj.lab == false || af2_jsonobj.lab === undefined)
            {
                cont += af2_jsonobj.label;
            }
            else if(af2_jsonobj.lab == true)
            {
                cont = af2_jsonobj.label + cont;
            }
        }

        selector.html(cont);
    });
};
const af2_update_max = () => {
    const selector = $('#af2_slide_wrapper_max_');

    let cont = '';
    if(af2_jsonobj.max !== undefined && $.isNumeric(af2_jsonobj.max))
    {
        cont = af2_jsonobj.max;

        if(af2_jsonobj.min !== undefined && $.isNumeric(af2_jsonobj.min) && af2_jsonobj.min < af2_jsonobj.max && $.isNumeric(af2_jsonobj.step))
        {
            $('#af2_slide').remove();
            const slider = '<input id="af2_slide" class="af2_slide" type="range" min="'+af2_jsonobj.min+'" max="'+af2_jsonobj.max+'" step="'+af2_jsonobj.step+'">';
            $('.slide_wrapper').html(slider);
        }
    }

    af2_update_bullet();

    putInThousands(cont).done((ret) => {
        cont = ret;

        if(af2_jsonobj.label !== undefined && af2_jsonobj.label.trim() !== '')
        {
            if(af2_jsonobj.lab == false || af2_jsonobj.lab === undefined)
            {
                cont += af2_jsonobj.label;
            }
            else if(af2_jsonobj.lab == true)
            {
                cont = af2_jsonobj.label + cont;
            }
        }
    
        selector.html(cont);
    });
};
const af2_update_steps = () => {
    if(af2_jsonobj.step !== undefined && $.isNumeric(af2_jsonobj.step) && $.isNumeric(af2_jsonobj.max) && $.isNumeric(af2_jsonobj.min))
    {
        $('#af2_slide').remove();
        const slider = '<input id="af2_slide" class="af2_slide" type="range" min="'+af2_jsonobj.min+'" max="'+af2_jsonobj.max+'" step="'+af2_jsonobj.step+'">';
        $('.slide_wrapper').html(slider);
    }

    af2_update_bullet();
};
const af2_update_thousand = () => {
    af2_update_min();
    af2_update_max();
    af2_update_bullet();
};
const af2_update_start = () => {
    af2_update_bullet();
};
const af2_update_label = () => {
    af2_update_min();
    af2_update_max();
    af2_update_bullet();
};
const af2_update_lab = () => {
    af2_update_min();
    af2_update_max();
    af2_update_bullet();
};

const af2_update_bullet = () => {
    if($.isNumeric(af2_jsonobj.step) && $.isNumeric(af2_jsonobj.max) && $.isNumeric(af2_jsonobj.min))
    {
        const val = $('#af2_slide').val();
        const max = $('#af2_slide').attr('max');
        const min = $('#af2_slide').attr('min');
        const width = $('#af2_slide').width();
        const thumbWidth = 25;
        const offset = 27;

        let cont = val;

        $('.af2_slide::-webkit-slider-thumb');

        let bulletPercentage = ((val-min)/(max-min));
        let bulletPosition = bulletPercentage*(width-thumbWidth)-offset;
        //$('.slider_bullet').css('left', bulletPosition + 'px');

        putInThousands(cont).done((ret) => {
            cont = ret;

            if(af2_jsonobj.label !== undefined && af2_jsonobj.label.trim() !== '')
            {
                if(af2_jsonobj.lab == false || af2_jsonobj.lab === undefined)
                {
                    cont += af2_jsonobj.label;
                }
                else if(af2_jsonobj.lab == true)
                {
                    cont = af2_jsonobj.label + cont;
                }
            }

            $('.slider_bullet').html(cont);
        });
    }
};

const putInThousands = (cont) => {
    let len = cont.length;
    let prom = $.Deferred();

    let ret = '';

    let times = parseInt(len / 3);

    if(af2_jsonobj.thousand == true)
    {
        if(len > 3)
        {
            let mod = len % 3;
            if(len % 3 === 0)
            {
                times--;
            }

            if(mod === 0)
            {
                mod=3;
            }

            let schritt = 0;
            for(schritt = 1; schritt <= times; schritt++)
            {
                ret = '.'+cont.substr(cont.length - schritt*3, 3) + ret;

                if(schritt === times)
                {
                    ret = cont.substr(0, mod) + ret
                    return prom.resolve(ret);
                }
            }
        }
        else
        {
            return prom.resolve(cont);
        }
    }
    else
    {
        return prom.resolve(cont);
    }

    

    return prom.promise();
};