var mediaUploader;
var t_id;

/**
 * Creates an mediauploader from wordpress
 * @param id
 */
const mediaUploaderStart = (id) => {
    t_id = id;

    if(mediaUploader) {
        mediaUploader.open();
        return;
    }

    mediaUploader = wp.media.frames.file_frame = wp.media({
       title: 'Wählen Sie ein Bild',
       button: {
           text: 'Wähle Sie ein Bild'
       },
        multiple: false
    });

    mediaUploader.on('select', () => {
        attachment = mediaUploader.state().get('selection').first().toJSON();
        let event = jQuery.Event('image_picked');
        event.value = attachment.url;
        $('#'+t_id).trigger(event);
    });

    mediaUploader.open();
};