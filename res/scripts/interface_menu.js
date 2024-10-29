$ = jQuery;
jQuery(document).ready(($) => {
    $('.af2_interface').on('click', (ev) => {


        if($('#'+$(ev.currentTarget).attr('id')+' .af2_content:hover')[0] === undefined)
        {
            $('#'+$(ev.currentTarget).attr('id')+' .af2_content').toggleClass('af2_hidden');
        }



    });

    $('#af2_dnp_save_button').on('click', (ev) => {

        let mail = $('#dnp_mail').val();
        let api = $('#dnp_api').val();

        $.ajax({
            url: af2_BE_ajax_IM.ajax_url,
            type: 'POST',
            data: {action: 'af2_dnp_interface', _ajax_nonce: af2_BE_ajax_IM.nonce, mail:mail, api:api},
            success: (code) => {
                af2_throw_toast('success', 'Deals & Projects Anbindungsdaten gespeichert!');
            },
            error: ()  => {
                //throw_msg('Das Erstellen ist im Moment nicht möglich!', true)
            }});
    });

    $('#af2_ac_save_button').on('click', (ev) => {

        let url = $('#ac_url').val();
        let key = $('#ac_key').val();

        $.ajax({
            url: af2_BE_ajax_IM.ajax_url,
            type: 'POST',
            data: {action: 'af2_ac_interface', _ajax_nonce: af2_BE_ajax_IM.nonce, url:url, key:key},
            success: (code) => {
                af2_throw_toast('success', 'ActiveCampaign Anbindungsdaten gespeichert!');
            },
            error: ()  => {
                //throw_msg('Das Erstellen ist im Moment nicht möglich!', true)
            }});
    });

    $('#af2_klicktipp_save_button').on('click', (ev) => {

        let user = $('#klicktipp_user').val();
        let pw = $('#klicktipp_pw').val();

        $.ajax({
            url: af2_BE_ajax_IM.ajax_url,
            type: 'POST',
            data: {action: 'af2_klicktipp_interface', _ajax_nonce: af2_BE_ajax_IM.nonce, user:user, pw:pw},
            success: (code) => {
                af2_throw_toast('success', 'Klicktipp Anbindungsdaten gespeichert!');
            },
            error: ()  => {
                //throw_msg('Das Erstellen ist im Moment nicht möglich!', true)
            }});
    });
    $('#af2_zapier_save_button').on('click', (ev) => {

        let pw = $('#zapier_pw').val();

        $.ajax({
            url: af2_BE_ajax_IM.ajax_url,
            type: 'POST',
            data: {action: 'af2_zapier_interface', _ajax_nonce: af2_BE_ajax_IM.nonce, pw:pw},
            success: (code) => {
                af2_throw_toast('success', 'Zapier Passwort geändert!');
            },
            error: ()  => {
                //throw_msg('Das Erstellen ist im Moment nicht möglich!', true)
            }});
    });
});



const af2_throw_toast = (type, text) => {
    M.toast({html: text, displayLength: 4000, classes: type});

    if($('#toast-container')[0] === undefined)
    {
        const el = $('#toast-container').detach();
        $('body').append(el);
    }
};