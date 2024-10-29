//CREATES A NEW POST
$ = jQuery;
jQuery(document).ready(($) => {
    try
    {
        let fb_page = $('#af2_req_div_data').data('page');
        let fb_builder = $('#af2_req_div_data').data('builder');

        let origin = window.location.origin;
        let pathname = window.location.pathname;
        const url = origin + pathname;
        $('#af2_create_new_post').on('click', () => {
            $.ajax({
                url: af2_BE_ajax.ajax_url,
                type: 'GET',
                data: {action: 'af2_create_post', _ajax_nonce: af2_BE_ajax.nonce, page: fb_page},
                success: (code) => {
                    //throw_msg('Erstellen....', false);

                    let id = $($.parseHTML(code)).filter('#af2_response').data('id');

                    window.location.replace(url + "?page=" + fb_builder + "&id=" + id + "&action=load");
                },
                error: () => {
                    //throw_msg('Das Erstellen ist im Moment nicht möglich!', true)
                }});
        });

        $('.af2_edit_post').on('click', (ev) => {
            const id = $(ev.currentTarget).data('id');
            window.location.replace(url + "?page=" + fb_builder + "&id=" + id + "&action=load");
        });

    } catch (e)
    {

    }


    $('.af2_checkbox').on('click', (ev) => {

        if ($(ev.currentTarget).hasClass('af2_select_all')) {
            if ($(ev.currentTarget).prop('checked') === true) {
                $('.af2_checkbox').each((i, el) => {
                    if ($(el).prop('checked') === false) {
                        $(el).prop('checked', true);
                    }
                });
            } else {
                $('.af2_checkbox').each((i, el) => {
                    if ($(el).prop('checked') === true) {
                        $(el).prop('checked', false);
                    }
                });
            }
        } else
        {
            $($('.af2_checkbox.af2_select_all')[0]).prop('checked', false);
        }
    });

    $('.af2_checkbox').on('change', (ev) => {
        let check = false;
        $('.af2_checkbox').each((i, el) => {
            if ($(el).prop('checked') === true)
            {
                check = true;
            }
        }).promise().done(() => {

            if (check === true)
            {
                $('#af2_delete_post_button').removeClass('hide');
                $('#af2_copy_post').removeClass('hide');
            } else
            {
                $('#af2_delete_post_button').addClass('hide');
                $('#af2_copy_post').addClass('hide');
            }

        });
    });


    const url = window.location.origin + window.location.pathname;
    let fb_page = $('#af2_req_div_data').data('page');

    let posts = [];


    $(document).on('click', '#af2_delete_post_button', (ev) => {

        posts = [];

        $('.af2_checkbox.cont').each((i, el) => {
            if ($(el).prop('checked') === true)
            {
                posts.push($(el).attr('id'));
            }
        }).promise().done(() => {
            if (posts.length > 0)
            {
                af2_throw_toast('message', 'Möchten Sie diese Elemente wirklich Löschen?' +
                        '<button id="delete_now" class="btn btn-primary ml-1 mt-2 p-1">Löschen</button>');
            }
        });
    });

    $(document).on('click', '#af2_copy_post', (ev) => {

        posts = [];

        $('.af2_checkbox.cont').each((i, el) => {
            if ($(el).prop('checked') === true)
            {
                posts.push($(el).attr('id'));
            }
        }).promise().done(() => {
            if (posts.length > 0)
            {
                af2_copy_posts(posts);
            }
        });
    });

    $(document).on('click', '#delete_now', (ev) => {

        $.ajax({
            url: af2_BE_ajax.ajax_url,
            type: 'GET',
            data: {action: 'af2_delete_posts', _ajax_nonce: af2_BE_ajax.nonce, page: fb_page, posts: posts},
            success: (code) => {
                //throw_msg('Erstellen....', false);
                if (posts.length > 1)
                {
                    af2_throw_toast('success', 'Elemente gelöscht!');
                } else if (posts.length === 1)
                {
                    af2_throw_toast('success', 'Element gelöscht!');
                }

                window.location.reload(true);
            },
            error: () => {
                //throw_msg('Das Erstellen ist im Moment nicht möglich!', true)
            }
        });
    });

    $(document).on("keyup", "#af2_fragen_list_search", function () {
        console.log("question search trigger");
        var search_text = $(this).val().toLowerCase();
        $("#multi-select td.af2_edit_post").each(function () {
            var s = $(this).text().toLowerCase();
            if (s.search(search_text) != -1) {
                $(this).parent('tr').show();
            } else {
                $(this).parent('tr').hide();
            }
        });
    })
});

const af2_copy_posts = (posts) => {
    $.ajax({
        url: af2_BE_ajax.ajax_url,
        type: 'POST',
        data: {
            action: 'af2_copy_posts',
            _ajax_nonce: af2_BE_ajax.nonce,
            posts: posts
        },
        success: (message) => {
            if (posts.length > 1)
            {
                af2_throw_toast('success', 'Elemente kopiert!');
            } else if (posts.length === 1)
            {
                af2_throw_toast('success', 'Element kopiert!');
            }

            window.location.reload(true);
        },
        error: () => {

        }
    });
};

const af2_throw_toast = (type, text) => {
    M.toast({html: text, displayLength: 4000, classes: type});

    if ($('#toast-container')[0] === undefined)
    {
        const el = $('#toast-container').detach();
        $('body').append(el);
    }
};