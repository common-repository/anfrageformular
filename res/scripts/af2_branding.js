jQuery(document).ready(($) => {
    $(document).on('click', '#af2_branding',function(){
        let show_branding = 0;
        if($(this).is(":checked")){
            show_branding = 1;
        }
        
        $.ajax({
             url:ajaxurl,
             method:"POST",
             data:{
                 action:'update_branding_options',
                 show_branding:show_branding,
             }
        });
    });
});