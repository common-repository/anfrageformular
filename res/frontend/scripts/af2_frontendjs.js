let forms = [];                                                                                                         // All Forms
let datas = [];                                                                                                         // All Data contents
let af2Styles = // The basic styling
        {
            "af2_answer":
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
            "af2_answer_card":
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
                        "value": "0 auto 20px auto !important"
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
                        "attribute": "text-align",
                        "value": "center"
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
            "af2_answer.selected_item .af2_answer_card":
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
                            "special_class":"af2_datepicker",
                            "sub_class":"ui-datepicker-title"
                        },
                        {
                            "attribute": "color",
                            "value": "",
                            "special_class":"af2_datepicker",
                            "sub_class":"ui-datepicker-title"
                        }
                    ],
                    "af2_datepicker_active":
                    [
                        {
                            "attribute": "background-color",
                            "value": "",
                            "special_class":"af2_datepicker",
                            "sub_class":"ui-datepicker-current-day"
                        },
                        {
                            "attribute": "color",
                            "value": "",
                            "special_class":"af2_datepicker",
                            "sub_class":"ui-state-active"
                        }
                    ],
                    "af2_datepicker_buttons":
                    [
                        {
                            "attribute": "background-color",
                            "value": "",
                            "special_class":"af2_datepicker",
                            "sub_class":"ui-datepicker-prev"
                        },
                        {
                            "attribute": "background-color",
                            "value": "",
                            "special_class":"af2_datepicker",
                            "sub_class":"ui-datepicker-next"
                        }
                    ]
        };

jQuery(document).ready(($) => {

    af2_init($);

});


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

        forms[num] = new Form($, id, num, preload, size);
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
    this.af2_is_send_allowed = false;

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
    if (datas[id] === undefined) // When Dataid is not already set
    {
        datas[id] = true;

        af2HandleRequest($, this.formSelector, '.af2_form_wrapper', [this.id]);
    }

    /**
     * Verify and load the new Content
     */
    this.loadContent = () => {
        const prom = $.Deferred();

        this.neededContent = datas[this.id].sections[this.actualSection].contents[this.actualContent].data;
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
            if (datas[this.neededContent] !== undefined && datas[this.neededContent] !== true)
            {
                this.initDraw();
            }
            prom.resolve();
        }

        return prom.promise();
    };

    this.initDraw = () => {
        if (this.needsDraw === true)
            af2DrawCarouselContent(this.$, this, this.neededContent, this.formSelector, this.actualCarouselItem);
        this.actualData = this.neededContent;
        this.neededContent = undefined;
        const height = $(this.formSelector + ' .af2_form_carousel #' + this.actualCarouselItem + ' .af2_carousel_content').height();
        $(this.formSelector + ' .af2_form_carousel').css('height');
        $(this.formSelector + ' .af2_form_carousel').css('height', height);
        this.setTriggers();

        if (datas[this.actualData].typ !== undefined &&
                (datas[this.actualData].typ === 'af2_slider' || datas[this.actualData].typ === 'af2_content'))
        {
            $(this.formSelector + ' .af2_form_foward_button').removeClass('af2_disabled');
        } else
        {
            $(this.formSelector + ' .af2_form_foward_button').addClass('af2_disabled');
        }

        $(this.formSelector + ' .af2_form_bottombar').css('opacity', 1);

        if (datas[this.actualData].typ === 'af2_content')
        {
            if (datas[this.actualData].type_specifics.content_button == true)
            {

                $(this.formSelector + ' .af2_form_bottombar').css('opacity', 0);

                getAllImagesDonePromise($, this.formSelector).done(() => {
                    const height = $(this.formSelector + ' .af2_form_carousel #' + this.actualCarouselItem + ' .af2_carousel_content').height();
                    $(this.formSelector + ' .af2_form_carousel').css('height');
                    $(this.formSelector + ' .af2_form_carousel').css('height', height);

                });
            }

            if (datas[this.actualData].type_specifics.content_wait_time !== undefined && $.isNumeric(datas[this.actualData].type_specifics.content_wait_time))
            {
                //blend out everything
                if (datas[this.actualData].type_specifics.content_button == true)
                {
                    $(this.formSelector + ' .af2_submit_wrapper input.af2_submit_button.no_send').css('opacity', 0);
                } else
                {
                    $(this.formSelector + ' .af2_form_bottombar').css('opacity', 0);
                }


                //timer
                setTimeout(() => {
                    if (datas[this.actualData].type_specifics.content_button == true)
                    {
                        $(this.formSelector + ' .af2_submit_wrapper input.af2_submit_button.no_send').css('opacity', 1);
                    } else
                    {
                        $(this.formSelector + ' .af2_form_bottombar').css('opacity', 1);
                    }
                    this.af2Move("", 'next');
                }, datas[this.actualData].type_specifics.content_wait_time);
            }
        }

        if (datas[this.actualData].show_bottombar !== undefined && datas[this.actualData].show_bottombar === false)
        {
            $(this.formSelector + ' .af2_form_bottombar').css('opacity', 0);
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
        if (datas[this.neededContent] === undefined)
        {
            dataIds.push(this.neededContent);
            datas[this.neededContent] = true;
        }

        if (datas[this.id].sections[this.actualSection].contents[this.actualContent].connections !== undefined)
        {
            /** Iterate the first part **/
            $(datas[this.id].sections[this.actualSection].contents[this.actualContent].connections).each((i, el) => {
                const toSection = el.to_section;
                const toContent = el.to_content;

                /** Check the Data **/
                if (datas[el.to_dataid] === undefined && !el.to_dataid.includes('redirect'))
                {
                    dataIds.push(el.to_dataid);
                    datas[el.to_dataid] = true;

                    if (datas[this.id].sections[toSection].contents[toContent].connections !== undefined)
                    {
                        $.each(datas[this.id].sections[toSection].contents[toContent].connections, (j, e) => {

                            /** Check the Data **/
                            if (datas[e.to_dataid] === undefined && !e.to_dataid.includes('redirect')) {
                                dataIds.push(e.to_dataid);
                                datas[e.to_dataid] = true;
                            }
                        });
                    }
                }


                if (i === datas[this.id].sections[this.actualSection].contents[this.actualContent].connections.length - 1)
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
                    if (datas[this.actualData].typ === 'af2_multiselect')
                    {
                        let arr = [];
                        $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer.selected_item').each((i, el) => {
                            arr.push($(el).attr('id'));
                        }).promise().done(() => {
                            this.af2Move(arr, 'next');
                        });
                    } else if (datas[this.actualData].typ === 'af2_textfeld')
                    {
                        if(isMobile()){
                            this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textfeld_frage.af2_mobile').val(), 'next');
                        }else{
                            this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textfeld_frage').val(), 'next');
                        }
                    }
                    else if (datas[this.actualData].typ === 'af2_datum')
                    {
                        if(isMobile()){
                            this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_datum_frage.af2_mobile').val(), 'next');
                        }else{
                            this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_datum_frage').val(), 'next');
                        }
                    }
                }

            }
        });
        
        this.$(document).on('mouseenter', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer', (ev) => {
            $(ev.currentTarget).addClass('hover');
        });
        this.$(document).on('mouseleave', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer', (ev) => {
            $(ev.currentTarget).removeClass('hover');
        });


        this.$(document).on('click', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer', (ev) => {
            if (datas[this.actualData].typ === 'af2_multiselect')
            {
                $(ev.currentTarget).toggleClass('selected_item');

                const len = $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer.selected_item').length;
                if (len > 0)
                {
                    $(this.formSelector + ' .af2_form_foward_button').removeClass('af2_disabled');

                    const cond = datas[this.actualData].type_specifics.condition;
                    if (cond !== undefined && cond !== '' && $.isNumeric(cond) && cond > 1)
                    {
                        if (len >= cond)
                        {
                            let arr = [];
                            $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer.selected_item').each((i, el) => {
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

            if ($(ev.currentTarget).val().trim() !== ''){
                $(this.formSelector + ' .af2_form_foward_button').removeClass('af2_disabled');
            } else {
                if ($(ev.currentTarget).data("mandatory") === true) {
                    $(this.formSelector + ' .af2_form_foward_button').addClass('af2_disabled');
                } else {
                    $(this.formSelector + ' .af2_form_foward_button').removeClass('af2_disabled');
                }

            }
        });
        this.$(document).on('input', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textbereich_frage', (ev) => {
            if ($(ev.currentTarget).val().trim() !== ''){
                $(this.formSelector + ' .af2_form_foward_button').removeClass('af2_disabled');
            } else {
                if ($(ev.currentTarget).data("mandatory") === true) {
                    $(this.formSelector + ' .af2_form_foward_button').addClass('af2_disabled');
                } else {
                    $(this.formSelector + ' .af2_form_foward_button').removeClass('af2_disabled');
                }
            }
        });

        this.$(document).on('input', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_datum_frage', (ev) => {

            if ($(ev.currentTarget).val().trim() !== ''){
                $(this.formSelector + ' .af2_form_foward_button').removeClass('af2_disabled');
            } else {
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
                if (datas[this.actualData].typ === 'af2_multiselect')
                {
                    let arr = [];
                    $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer.selected_item').each((i, el) => {
                        arr.push($(el).attr('id'));
                    }).promise().done(() => {
                        this.af2Move(arr, 'next');
                    });
                } else if (datas[this.actualData].typ === 'af2_textfeld') {
                    if(isMobile()){
                        this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textfeld_frage.af2_mobile').val(), 'next');
                    }else{
                        this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textfeld_frage').val(), 'next');
                    }
                    
                } else if (datas[this.actualData].typ === 'af2_textbereich') {
                    if(isMobile()){
                        this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textbereich_frage.af2_mobile').val(), 'next');
                    }else{
                        this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textbereich_frage').val(), 'next');
                    }
                } else if (datas[this.actualData].typ === 'af2_datum') {
                    if(isMobile()){
                        this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_datum_frage.af2_mobile').val(), 'next');
                    }else{
                        this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_datum_frage').val(), 'next');
                    }
                    
                } else if (datas[this.actualData].typ === 'af2_slider') {
                    this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_slider_frage').val(), 'next');
                } else if (datas[this.actualData].typ === 'af2_content') {
                    this.af2Move("", 'next');
                }
            }
        });
        this.$(document).on('click', this.formSelector + ' .af2_submit_button.no_send', (ev) => {
            if (!$(ev.currentTarget).hasClass('af2_disabled'))
            {
                if (datas[this.actualData].typ === 'af2_multiselect')
                {
                    let arr = [];
                    $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer.selected_item').each((i, el) => {
                        arr.push($(el).attr('id'));
                    }).promise().done(() => {
                        this.af2Move(arr, 'next');
                    });
                } else if (datas[this.actualData].typ === 'af2_textfeld') {
                    if(isMobile()){
                        this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textfeld_frage.af2_mobile').val(), 'next');
                    }else{
                        this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textfeld_frage').val(), 'next');
                    }
                    
                } else if (datas[this.actualData].typ === 'af2_textbereich') {
                    if(isMobile()){
                        this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textbereich_frage.af2_mobile').val(), 'next');
                    }else{
                        this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textbereich_frage').val(), 'next');
                    }
                    
                } else if (datas[this.actualData].typ === 'af2_datum') {
                    if(isMobile()){
                        this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_datum_frage.af2_mobile').val(), 'next');
                    }else{
                        this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_datum_frage').val(), 'next');
                    }
                    
                } else if (datas[this.actualData].typ === 'af2_slider') {
                    this.af2Move($(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_slider_frage').val(), 'next');
                } else if (datas[this.actualData].typ === 'af2_content') {
                    $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item video').each((i, el) => {
                        $(el).stop();
                    });
                    this.af2Move("", 'next');
                }
            }
        });


        this.$(document).on('click', this.formSelector + ' .af2_submit_button', (ev) => {
            if (this.af2_is_send_allowed)
            {

                if ($(ev.currentTarget).hasClass('no_send'))
                {

                } else
                {
                    this.af2_is_send_allowed = false;
                    $(this.formSelector + ' .af2_response_success').each((i, el) => {
                        $(el).remove();
                    });
                    $(this.formSelector + ' .af2_response_error').each((i, el) => {
                        $(el).remove();
                    });

                    let arr = [];
                    $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_question input').each((i, el) => {
                        
                        if ($(el).attr('type') === 'checkbox')
                        {
                            arr.push($(el).prop('checked'));
                        } else
                        {
                            arr.push($(el).val());
                        }
                    }).promise().done(() => {
                        if (this.set === true)
                        {
                            this.answers.pop();
                        }
                        this.answers.push(arr);

                        this.set = true;

                        $.ajax({
                            url: af2_frontend_ajax.ajax_url,
                            type: "GET",
                            data: {
                                _ajax_nonce: af2_frontend_ajax.nonce,
                                action: 'af2_send_mail',
                                sec: this.actualSection,
                                cont: this.actualContent,
                                dataid: this.id,
                                answers: this.answers
                            },
                            success: (answer) => {
                                if (answer === 'ERROR' || answer === undefined)
                                {
                                    this.af2_is_send_allowed = true;
                                    af2ThrowError(this.$, $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_submit_button'), 'Es ist ein Fehler aufgetreten!');
                                    const height = $(this.formSelector + ' .af2_form_carousel #' + this.actualCarouselItem + ' .af2_carousel_content').height();
                                    $(this.formSelector + ' .af2_form_carousel').css('height');
                                    $(this.formSelector + ' .af2_form_carousel').css('height', height);
                                } else
                                {
                                    const code = $($.parseHTML(answer));
                                    let error = code.filter('.af2_response_error')[0];

                                    if (error !== undefined)
                                    {
                                        this.af2_is_send_allowed = true;
                                        error = $(error);
                                        const sel = $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_question .af2_question_wrapper')[error.data('id')];

                                        af2ThrowLoadingError(this.$, sel, error[0]);
                                        const height = $(this.formSelector + ' .af2_form_carousel #' + this.actualCarouselItem + ' .af2_carousel_content').height();
                                        $(this.formSelector + ' .af2_form_carousel').css('height');
                                        $(this.formSelector + ' .af2_form_carousel').css('height', height);
                                    } else
                                    {
                                        const success = $(code.filter('.af2_response_success')[0]);
                                        af2ThrowLoadingSuccess(this.$, $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_submit_wrapper'), success[0]);
                                        const height = $(this.formSelector + ' .af2_form_carousel #' + this.actualCarouselItem + ' .af2_carousel_content').height();
                                        $(this.formSelector + ' .af2_form_carousel').css('height');
                                        $(this.formSelector + ' .af2_form_carousel').css('height', height);

                                        if (success.data('redirect') !== "" && success.data('redirect') !== false)
                                        {
                                            window.location.replace(success.data('redirect').substr(9));
                                        }
                                    }
                                }
                            },
                            error: () => {
                                this.af2_is_send_allowed = true;
                                af2ThrowError(this.$, $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_submit_button'), 'Es ist ein Fehler aufgetreten!');
                                const height = $(this.formSelector + ' .af2_form_carousel #' + this.actualCarouselItem + ' .af2_carousel_content').height();
                                $(this.formSelector + ' .af2_form_carousel').css('height');
                                $(this.formSelector + ' .af2_form_carousel').css('height', height);
                            }
                        });
                    });
                }
            }


        });

        this.$(document).on('input', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_slider_frage', (ev) => {
            const sliderSelector = $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_slider_frage');
            const sliderBulletSelector = $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_slider_frage_bullet');
            af2AdjustSliderBullet(sliderSelector, sliderBulletSelector, datas[this.actualData], this.$);
        });
    };

    /**
     * Removing all Triggers
     */
    this.removeTriggers = () => {
        $(document).off('keypress');

        this.$(document).off('mouseenter', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer');
        this.$(document).off('mouseleave', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer');

        this.$(document).off('click', this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer');
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

        this.scroll_to_anchor(this.formSelector, this.$);

        if (type === 'next')
        {
            $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_answer').each((i, el) => {
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

    this.scroll_to_anchor = (anchor_id, $) => {
        if (isMobile())
        {
            var tag = $(anchor_id + "");
            $('html,body').animate({scrollTop: tag.offset().top});
        }
    }




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
                if (datas[this.actualData].typ === 'af2_textfeld' || datas[this.actualData].typ === 'af2_textbereich') {
                    if (datas[this.actualData].type_specifics.mandatory !== true) {
                        $(this.formSelector + ' .af2_form_foward_button').removeClass("af2_disabled");
                    }
                }
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
        const buffer = af2FindNew(this.$, datas[this.id].sections[this.actualSection].contents[this.actualContent].connections, connectionFrom);

        const sec = this.actualSection;
        const cont = this.actualContent;

        this.actualSection = buffer[0];
        this.actualContent = buffer[1];

        this.actualCarouselItem++;

        /** Loading Content **/
        this.loadContent().done(() => {
            $(document).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
                    this.formSelector + ' #' + (this.actualCarouselItem - 1) + '.af2_carousel_item', () => {
                $(document).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
                        this.formSelector + ' #' + (this.actualCarouselItem - 1) + '.af2_carousel_item');

                if (datas[this.actualData].typ === 'af2_textfeld')
                {
                    let is_mandatory = datas[this.actualData].type_specifics.mandatory;
                    if (is_mandatory !== true) {
                        $(this.formSelector + ' .af2_form_foward_button').removeClass("af2_disabled");
                    }

                    $(this.formSelector + ' #' + this.actualCarouselItem + '.af2_carousel_item .af2_textfeld_frage').each((i, el) => {
                        if ($(el).css('display') === 'none')
                        {

                        } else
                        {
                            $(el).focus();
                        }
                    });
                }

                if (datas[this.actualData].typ === 'af2_textbereich')
                {
                    let is_mandatory = datas[this.actualData].type_specifics.mandatory;
                    if (is_mandatory !== true) {
                        $(this.formSelector + ' .af2_form_foward_button').removeClass("af2_disabled");
                    }

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

            /** Move to the next **/
            $(this.formSelector + ' #' + (this.actualCarouselItem - 1)).css('transform');
            $(this.formSelector + ' #' + (this.actualCarouselItem - 1) + '.af2_carousel_item').addClass('left_marg');

            const newPercent = (this.actualSection / (this.size - 1)) * 100;
            $(this.formSelector + ' .af2_form_progress').css('width');
            $(this.formSelector + ' .af2_form_progress').css('width', newPercent + '%');

            prom.resolve([sec, cont]);

//            if(datas[this.actualData].typ === 'af2_textbereich')

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

const getAllImagesDonePromise = ($, formSelector) => {
    // A jQuery-style promise we'll resolve
    var d = $.Deferred();

    // Get all images to start with (even complete ones)
    var imgs = $(formSelector + " img");

    // Add a one-time event handler for the load and error events on them
    imgs.one("load.allimages error.allimages", function () {
        // This one completed, remove it
        imgs = imgs.not(this);
        if (imgs.length == 0) {
            // It was the last, resolve
            d.resolve();
        }
    });

    // Find the completed ones
    var complete = imgs.filter(function () {
        return this.complete;
    });

    // Remove our handler from completed ones, remove them from our list
    complete.off(".allimages");
    imgs = imgs.not(complete);
    complete = undefined; // Don't need it anymore

    // If none left, resolve; otherwise wait for events
    if (imgs.length == 0) {
        d.resolve();
    }

    // Return the promise for our deferred
    return d.promise();
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

    putInThousands(json, cont, $).done((ret) => {
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
 * Finding new contents
 *
 * @param $
 * @param iterator
 * @param from
 *
 const af2FindNew = ($, iterator, from) => {
 let newSection = undefined;
 let newContent = undefined;
 
 let found = false;
 $.each(iterator, (i, el) => {
 if(el.from === -1)
 {
 if(found === false)
 {
 newSection = el.to_section;
 newContent = el.to_content;
 }
 }
 else if(el.from === from)
 {
 newSection = el.to_section;
 newContent = el.to_content;
 found = true;
 }
 });
 
 return [newSection, newContent];
 };*/

/**
 * Draws out the content into the carousel
 *
 * @param $
 * @param dataid
 * @param formSelector
 * @param carouselNum
 */
const af2DrawCarouselContent = ($, form, dataid, formSelector, carouselNum) => {

    if ($(formSelector + ' .af2_form_carousel').width() !== 0)
    {
        $(formSelector + ' .af2_form_carousel').css('max-width', $(formSelector + ' .af2_form_carousel').width());
        $(formSelector + ' .af2_form_carousel').css('min-width', $(formSelector + ' .af2_form_carousel').width());
    }

    /** Check out which type it is **/
    const type = datas[dataid].af2_type;                                                                                // The type of the Content to draw
    let content = '';

    /** Build wrapper **/
    content += '<div id="' + carouselNum + '" class="af2_carousel_item">';
    content += '<div class="af2_carousel_content">';

    let json = undefined;
    /** Validate the type **/
    if (type === 'frage')
    {
        content += af2DrawFrage($, datas[dataid], formSelector);
        json = datas[dataid];
    } else if (type === 'kontaktformular')
    {
        content += af2DrawKontaktformular($, datas[dataid]);
        form.af2_is_send_allowed = true;
    }

    /** Close wrapper **/
    content += '</div>';
    content += '</div>';

    /** Print out **/
    $(formSelector + ' .af2_loading_overlay').css('opacity', 0);
    $(formSelector + ' .af2_loading_overlay').css('width', '0px');
    $(formSelector + ' .af2_loading_overlay').css('height', '0px');
    $(formSelector + ' .af2_form').css('display', 'block');


    $(formSelector + ' .af2_form_carousel').append(content);

    adjustTargetBlanks($, formSelector);

    if (json !== undefined && json.typ === 'af2_slider')
    {
        const af2SliderFrageSelector = $(formSelector + ' #' + carouselNum + '.af2_carousel_item .af2_slider_frage');
        const af2SliderFrageBulletSelector = $(formSelector + ' #' + carouselNum + '.af2_carousel_item .af2_slider_frage_bullet');
        af2AdjustSliderBullet(af2SliderFrageSelector, af2SliderFrageBulletSelector, json, $);
    }
    
    // initalize datepicker
    if (json !== undefined && json.typ === 'af2_datum'){
        
        let ele = $(formSelector + ' #' + carouselNum + ' div[data-fragen="date"]');
        let date_input = $(formSelector + ' #' + carouselNum + ' input.af2_datum_frage');
        let format = (ele.data("format") !='undefined' && typeof ele.data("format") != 'undefined')?ele.data("format"):'dd.mm.yy';
            
        ele.datepicker({
              dateFormat: format,
              onSelect:(date) => {
                  $(formSelector + ' .af2_form_foward_button').removeClass('af2_disabled');
                  date_input.val(date);
              }
        });
    }
};

const adjustTargetBlanks = ($, formSelector) => {
    $(formSelector + ' .af2_question a').each((i, el) => {
        $(el).attr('target', '_blank');
    });
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
        /**let cond = '(Mehrfachauswahl möglich)';
         if(json.type_specifics.condition !== '' && $.isNumeric(json.type_specifics.condition) && json.type_specifics.condition > 1)
         {
         cond = '(Bis zu '+json.type_specifics.condition+' Antworten möglich)';
         }**/
        content += '<div class="af2_question_heading_wrapper desktop"><h4 class="af2_question_heading desktop">' + json.frontend_name + '</h4><h4 class="af2_question_description desktop">' + json.frontend_description + '</h4></div>';
        content += '<div class="af2_question_heading_wrapper af2_mobile"><h4 class="af2_question_heading af2_mobile">' + json.frontend_name + '</h4><h4 class="af2_question_description af2_mobile">' + json.frontend_description + '</h4></div>';
        content += '<div class="af2_answer_container">';
        content += af2ProcessAnswers($, json.type_specifics.answers);
        content += '<div>';
    } else if (json.typ === 'af2_textfeld')
    {
        content += '<div class="af2_question_heading_wrapper desktop"><h4 class="af2_question_heading desktop">' + json.frontend_name + '</h4><h4 class="af2_question_description desktop">' + json.frontend_description + '</h4></div>';
        content += '<div class="af2_question_heading_wrapper af2_mobile"><h4 class="af2_question_heading af2_mobile">' + json.frontend_name + '</h4><h4 class="af2_question_description af2_mobile">' + json.frontend_description + '</h4></div>';
        content += '<input type="text" class="af2_textfeld_frage desktop" data-mandatory="' + json.type_specifics.mandatory + '" placeholder="' + json.type_specifics.placeholder + '">';
        content += '<input type="text" class="af2_textfeld_frage af2_mobile" data-mandatory="' + json.type_specifics.mandatory + '" placeholder="' + json.type_specifics.placeholder + '">';
    } else if (json.typ === 'af2_textbereich')
    {
        content += '<div class="af2_question_heading_wrapper desktop"><h4 class="af2_question_heading desktop">' + json.frontend_name + '</h4><h4 class="af2_question_description desktop">' + json.frontend_description + '</h4></div>';
        content += '<div class="af2_question_heading_wrapper af2_mobile"><h4 class="af2_question_heading af2_mobile">' + json.frontend_name + '</h4><h4 class="af2_question_description af2_mobile">' + json.frontend_description + '</h4></div>';
        content += '<textarea class="af2_textbereich_frage desktop" data-mandatory="' + json.type_specifics.mandatory + '"  placeholder="' + json.type_specifics.placeholder + '"></textarea>';
        content += '<textarea class="af2_textbereich_frage af2_mobile" data-mandatory="' + json.type_specifics.mandatory + '"  placeholder="' + json.type_specifics.placeholder + '"></textarea>';
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

        putInThousands(json, min, $).done((ret) => {
            min = ret;

            putInThousands(json, max, $).done((ret) => {
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

const putInThousands = (json, cont, $) => {
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
            content += '<input type="checkbox" id="af2_checkbox_'+i+'" class="af2_checkbox_type"><div class="af2_question_text"><label for="af2_checkbox_'+i+'" class="af2_question_cb_label">' + el.text + required + '</label></div>';
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

const isMobile = () => {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}

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
            answer_img = '<div class="af2_answer_card desktop"><div class="af2_answer_image_wrapper"><img class="af2_answer_image pic" src="' + el.icon + '" alt="answer_image"></div></div>';
            answer_img += '<div class="af2_answer_card af2_mobile"><div class="af2_answer_image_wrapper af2_mobile"><img class="af2_answer_image pic" src="' + el.icon + '" alt="answer_image"></div><div class="af2_answer_text af2_mobile">' + el.text + '</div></div>';
        } else if (el.icon_type === 'font-awesome')
        {
            answer_img = '<div class="af2_answer_card desktop"><div class="af2_answer_image_wrapper"><i class="' + el.icon + ' fa-5x"></i></div></div>';
            answer_img += '<div class="af2_answer_card af2_mobile"><div class="af2_answer_image_wrapper af2_mobile"><i class="' + el.icon + ' fa-2x"></i></div><div class="af2_answer_text af2_mobile">' + el.text + '</div></div>';
        }

        content += '<div id="' + i + '" class="af2_answer desktop">';
        content += answer_img;
        content += '<div class="af2_answer_text desktop">' + el.text + '</div>';
        content += '</div>';

        content += '<div id="' + i + '" class="af2_answer af2_mobile">';
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
            datas[el] = json[el];
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
        url: af2_frontend_ajax.ajax_url,
        type: "GET",
        data: {
            _ajax_nonce: af2_frontend_ajax.nonce,
            action: 'af2_request_data',
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
    af2OverwriteStylings($, datas[id].styling).done((styling) => {
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
                if (ele.attribute === el.attribute)
                {
                    if (ele.special_class === el.special_class && ele.special_state === el.special_state)
                    {
                        newStyling[e][k].value = styling[e][j].value;
                    }
                    /**
                     if(ele.special_class === el.special_class)
                     {
                     if(ele.special_state === undefined && el.special_class === undefined)
                     {
                     newStyling[e][k].value = styling[e][j].value;
                     }
                     }
                     else if(ele.special_state === el.special_state)
                     {
                     if(ele.special_class === undefined && el.special_class === undefined)
                     {
                     newStyling[e][k].value = styling[e][j].value;
                     }
                     }**/
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
    content += '<style>';

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
                content += formSelector + ' .af2-datepicker .'+e.sub_class+' {';
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