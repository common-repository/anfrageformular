let af2_view = 0;
$ = jQuery;
jQuery(document).ready(($) => {
    af2_jsonobj = {};
    af2_jsonobj['cftitle'] = '';
    af2_jsonobj['name'] = 'Kontaktformular Titel';
    af2_jsonobj['questions'] = [];
    af2_jsonobj['title'] = '';
    af2_jsonobj.mailfrom = '';
    af2_jsonobj.mailsubject = '';
    af2_jsonobj.mailto = '';
    af2_jsonobj.mailtext = '[antworten]';
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
});

/**
 * Returning Data for the Input on Customize Sidebar
 *
 * @param id
 * @returns {string|*}
 */
const af2_get_data = (id) => {
    if(id === 'af2_contactformtitle')
    {
        return af2_jsonobj['cftitle'];
    }
    if(id.includes('af2_question'))
    {
        const pos = id.substr(13);

        if(af2_jsonobj.questions[pos].typ === 'checkbox_type')
        {
            return [af2_jsonobj.questions[pos].id, af2_jsonobj.questions[pos].text, af2_jsonobj.questions[pos].required];
        }
        else if ( af2_jsonobj.questions[pos].typ === 'google_recaptcha' )
        {
            return [af2_jsonobj.questions[pos].id, af2_jsonobj.questions[pos].site_key, af2_jsonobj.questions[pos].site_secret];
        }
        else
        {
            let cont = af2_jsonobj.questions[pos].label;

            cont = cont.replace(new RegExp('\"', 'g'), '&quot;');

            return [af2_jsonobj.questions[pos].id, cont, af2_jsonobj.questions[pos].placeholder, af2_jsonobj.questions[pos].required];
        }
    }
    if(id === 'af2_kfb_title')
    {
        return af2_jsonobj.name;
    }
    if(id === 'af2_kfb_mailfrom')
    {
        return af2_jsonobj.mailfrom;
    }
    if(id === 'af2_kfb_mailto')
    {
        return af2_jsonobj.mailto;
    }
    if(id === 'af2_kfb_mailtext')
    {
        console.log(af2_jsonobj.mailtext);
        return af2_jsonobj.mailtext;
    }
    if(id === 'af2_kfb_mailsubject')
    {
        return af2_jsonobj.mailsubject;
    }
    if(id === 'af2_send_button')
    {
        return af2_jsonobj.send_button;
    }
    if(id === 'af2_kfb_smtp_host')
    {
        return af2_jsonobj.smtp_host;
    }
    if(id === 'af2_kfb_smtp_username')
    {
        return af2_jsonobj.smtp_username;
    }
    if(id === 'af2_kfb_smtp_password')
    {
        return af2_jsonobj.smtp_password;
    }
    if(id === 'af2_kfb_smtp_port')
    {
        return af2_jsonobj.smtp_port;
    }
    if(id === 'af2_kfb_mailcc')
    {
        return af2_jsonobj.mailcc;
    }
    if(id === 'af2_kfb_mailbcc')
    {
        return af2_jsonobj.mailbcc;
    }
    if(id === 'af2_kfb_autoresponder_field')
    {
        return af2_jsonobj.autoresponder_field;
    }
    if(id === 'af2_kfb_autoresponder_nachricht')
    {
        return af2_jsonobj.autoresponder_nachricht;
    }
    if(id === 'af2_kfb_autoresponder_subject')
    {
        return af2_jsonobj.autoresponder_subject;
    }
    if(id === 'af2_kfb_mailfrom_name')
    {
        return af2_jsonobj.mailfrom_name;
    }
};

/**
 * Saving the ContactForm Title
 *
 * @param content
 */
const af2_save_contactform_title = (content) => {
    af2_jsonobj['cftitle'] = content;
    af2_jsonobj['title'] = content;
    af2_title = content;
};

/**
* Saving Question
*
* @param content
*/
const af2_save_question = (content) => {
    const count = content.count;
    const del = content.delete;
    if(del === true)
    {
        af2_jsonobj.questions.splice(count,1);
    }
    else
    {
        const move = content.move;
        if(move === true)
        {
            const newpos = content.newpos;
            const obj = af2_jsonobj.questions[count];
            af2_jsonobj.questions.splice(count, 1);
            af2_jsonobj.questions.splice(newpos, 0, obj);
        }
        else
        {
            const insert = content.insert;
            const cont = content.content;
            if(insert === true)
            {
                af2_jsonobj.questions.splice(count, 0, cont);
                switch(cont.typ)
                {
                    case 'text_type_plain':
                    {
                        if(cont.label === undefined || cont.placeholder === undefined)
                        {
                            af2_jsonobj.questions[count].label = '';
                            af2_jsonobj.questions[count].placeholder = 'Ihr Text...';
                            af2_jsonobj.questions[count].required = false;
                            af2_jsonobj.questions[count].id = '';
                        }
                        break;
                    }
                    case 'text_type_name':
                    {
                        if(cont.label === undefined || cont.placeholder === undefined)
                        {
                            af2_jsonobj.questions[count].label = '';
                            af2_jsonobj.questions[count].placeholder = 'Ihr Name...';
                            af2_jsonobj.questions[count].required = false;
                            af2_jsonobj.questions[count].id = '';
                        }
                        break;
                    }
                    case 'text_type_phone':
                    {
                        if(cont.label === undefined || cont.placeholder === undefined)
                        {
                            af2_jsonobj.questions[count].label = '';
                            af2_jsonobj.questions[count].placeholder = 'Ihre Telefonnummer';
                            af2_jsonobj.questions[count].required = false;
                            af2_jsonobj.questions[count].id = '';
                        }
                        break;
                    }
                    case 'text_type_mail':
                    {
                        if(cont.label === undefined || cont.placeholder === undefined)
                        {
                            af2_jsonobj.questions[count].label = '';
                            af2_jsonobj.questions[count].placeholder = 'Ihre E-Mail';
                            af2_jsonobj.questions[count].required = false;
                            af2_jsonobj.questions[count].id = '';
                        }
                        break;
                    }
                    case 'checkbox_type':
                    {
                        if(cont.text === undefined)
                        {
                            af2_jsonobj.questions[count].text = '';
                            af2_jsonobj.questions[count].required = true;
                            af2_jsonobj.questions[count].id = '';
                        }

                        break;
                    }
                    
                    case 'google_recaptcha':
                    {
                        if(cont.text === undefined)
                        {
                            af2_jsonobj.questions[count].site_key = '';
                            af2_jsonobj.questions[count].site_secret = '';
                            af2_jsonobj.questions[count].id = '';
                        }

                        break;
                    }
                }
            }
            else
            {
                af2_jsonobj.questions[count] = cont;
            }
        }
    }
};

const af2_save_kfb_title = (title) => {
    af2_jsonobj.name = title;
};

const af2_save_kfb_mailfrom = (mail) => {
    af2_jsonobj.mailfrom = mail;
};

const af2_save_kfb_mailto = (mail) => {
    af2_jsonobj.mailto = mail;
};

const af2_save_kfb_mailtext = (mail) => {
    af2_jsonobj.mailtext = mail;
};

const af2_save_kfb_mailsubject = (mail) => {
    af2_jsonobj.mailsubject = mail;
};

const af2_save_send_button = (cont) => {
    af2_jsonobj.send_button = cont;
};

const af2_save_question_id = (cont) => {
    af2_jsonobj.questions[cont.pos].id = cont.id;
};

const af2_save_kfb_smtp_host = (cont) => {
    af2_jsonobj.smtp_host = cont;
};

const af2_save_kfb_smtp_username = (cont) => {
    af2_jsonobj.smtp_username = cont;
};

const af2_save_kfb_smtp_password = (cont) => {
    af2_jsonobj.smtp_password = cont;
};

const af2_save_kfb_smtp_port = (cont) => {
    af2_jsonobj.smtp_port = cont;
};

const af2_use_smtp_save = (cont) => {
    af2_jsonobj.use_smtp = cont;

    if(cont === true)
    {
        af2_jsonobj.use_wp_mail = false;
    }
};
const af2_save_kfb_from_name = (cont) => {
    af2_jsonobj.mailfrom_name = cont;
};
const af2_save_kfb_smtp_type = (cont) => {
    af2_jsonobj.smtp_type = cont;
};

const af2_save_kfb_mailcc = (cont) => {
    af2_jsonobj.mailcc = cont;
};
const af2_save_kfb_mailbcc = (cont) => {
    af2_jsonobj.mailbcc = cont;
};

const af2_use_autorespond_save = (cont) => {
    af2_jsonobj.use_autorespond = cont;
};

const af2_save_kfb_autoreponder_field = (cont) => {
    af2_jsonobj.autoresponder_field = cont;
};

const af2_save_kfb_autoresponder_nachricht = (cont) => {
    af2_jsonobj.autoresponder_nachricht = cont;
};

const af2_save_kfb_autoresponder_subject = (cont) => {
    af2_jsonobj.autoresponder_subject = cont;
};

const af2_use_wp_mail_save = (cont) => {
    af2_jsonobj.use_wp_mail = cont;

    if(cont === true)
    {
        af2_jsonobj.use_smtp = false;
    }
};

const af2_save_show_bottombar = (cont) => {
    af2_jsonobj.show_bottombar = cont;
};

const af2_save_captcha_key = (cont) => {
    af2_jsonobj.questions[cont.pos].site_key = cont.content;
}

const af2_save_captcha_secret = (cont) => {
    af2_jsonobj.questions[cont.pos].site_secret = cont.content;
}