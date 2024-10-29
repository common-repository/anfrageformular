let af2_answers = [];
$ = jQuery;
jQuery(document).ready(($) => {
    af2_answers = [];
    af2_jsonobj = {};
    af2_sync_json_with_answers();
    af2_jsonobj['typ'] = 'none';
    af2_jsonobj.name = '';
    af2_jsonobj.description = '';
});

/**
 * Syncing the jsonobj with the answers
 */
const af2_sync_json_with_answers = () => {
    af2_jsonobj['answers'] = af2_answers;
};

/**
 * Returning Data for the Input on Customize Sidebar
 *
 * @param id
 * @returns {string|*}
 */
 const af2_get_data = (id) => {
    if(id === 'af2_questiontitle')
    {
        let cont = af2_jsonobj.name;

        cont = cont.replace(new RegExp('\"', 'g'), '&quot;');
        return cont;
    }
    if(id === 'af2_questiondescription')
    {
        let cont = af2_jsonobj.description;

        cont = cont.replace(new RegExp('\"', 'g'), '&quot;');
        return cont;
    }
    else if(id.includes('af2_answer'))
    {
        const pos = id.substr(11);
        return [af2_jsonobj.answers[pos].text, af2_jsonobj.answers[pos].img];
    }
    else if(id === 'af2_content_button_text')
    {
        return af2_jsonobj.content_button_text;
    }
};


/**
 * Save Question Type
 *
 * @param type
 * @returns {Array}
 */
const af2_save_question_type = (type) => {
    af2_open_sidebar('af2_content_sidebar');
    af2_close_sidebar('af2_customize_sidebar');
    let adjconts = [];

    const before = af2_jsonobj.typ;
    const after = type;
    const clone = af2_jsonobj;

    af2_jsonobj = {};
    //af2_jsonobj.name = clone.question;
    //af2_jsonobj.description = clone.question;

    if(after === 'af2_select')
    {
        if(before === 'af2_multiselect')
        {
            adjconts.push({"arg":"condition", "content":af2_jsonobj.condition});

        }
        else if(before === 'af2_textfeld')
        {
            adjconts.push({"arg":"textfeld", "content":af2_jsonobj.textfeld});
        }
        af2_answers = clone.answers !== undefined ? clone.answers : [];
        af2_sync_json_with_answers();
    }
    if(after === 'af2_multiselect')
    {
        if(before === 'af2_textfeld')
        {
            adjconts.push({"arg":"textfeld", "content":af2_jsonobj.textfeld});
        }

        af2_answers = clone.answers !== undefined && clone.answers.length > 0? clone.answers : [];
        af2_sync_json_with_answers();
        af2_jsonobj.condition = clone.condition !== undefined ? clone.condition : '';
    }
    if(after === 'none')
    {
        af2_close_sidebar('af2_customize_sidebar');
        af2_sidebar_clear_content('af2_customize_sidebar');
    }

    af2_jsonobj['typ'] = after;
    af2_jsonobj['name'] = clone.name;
    af2_jsonobj['description'] = clone.description;
    af2_title =  after.substr(4,1).toUpperCase() + after.substr(5);

    return adjconts;
};

/**
 * Saving the Question Title
 *
 * @param content
 */
const af2_save_question_title = (content) => {
    af2_jsonobj['name'] = content;
};
const af2_save_question_description = (content) => {
    af2_jsonobj['description'] = content;
};

const af2_save_condition = (content) => {
    af2_jsonobj.condition = content;
};

/**
 * Saving Answer
 *
 * @param content
 */
const af2_save_answer = (content) => {
    const count = content.count;
    const del = content.delete;
    if(del === true)
    {
        af2_answers.splice(count,1);
    }
    else
    {
        const move = content.move;
        if(move === true)
        {
            const newpos = content.newpos;
            const pos = newpos > count ? newpos-1 : newpos;
            const obj = af2_answers[count];
            af2_answers.splice(count, 1);
            af2_answers.splice(pos, 0, obj);
        }
        else
        {
            const insert = content.insert;
            const text = content.text;
            const img = content.img;
            if(insert === true)
            {
                af2_answers.splice(count, 0, {"text":text, "img":img})
            }
            else
            {
                af2_answers[count] = {"text":text, "img":img};
            }
        }
    }

    af2_sync_json_with_answers();
};

const af2_save_content_button = (cont) => {
    af2_jsonobj.content_button = cont;
};
const af2_save_content_button_text = (cont) => {
    af2_jsonobj.content_button_text = cont;
};
const af2_save_content_wait = (cont) => {
    if(cont !== '')
    {
        af2_jsonobj.content_wait = parseInt(cont);
    }
    else
    {
        af2_jsonobj.content_wait = cont;
    }
};

const af2_save_lab = (cont) => {
    af2_jsonobj.lab = cont;
};