$ = jQuery;
jQuery(document).ready(($) => {

    $('div.af2_card_active').on('click', (ev) => {

        const filename = $('#'+$(ev.currentTarget).attr('id')+' .af2_demo_path').html();
        af2_throw_toast('message', 'Möchten Sie diese Demo importieren?'+
                    '<button id="import_now" class="btn btn-primary ml-1 mt-2 p-1" data-filename="'+filename+'">Import</button>');
        
    });

    $(document).on('click', '#import_now', (ev) => {
        const filename = $(ev.currentTarget).data('filename');

        $.ajax({
            url: af2_BE_demo_import.ajax_url,
            type: 'GET',
            data: {action: 'af2_demo_import', _ajax_nonce: af2_BE_demo_import.nonce, filename:filename},
            success: (code) => {
                af2_throw_toast('success', 'Import erfolgreich!');
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