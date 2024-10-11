function sn_file_snd() {
    const form_data = new FormData();
    form_data.append('sn_file', document.getElementById('sn_file').files[0]);
    form_data.append('ajax_type', "integrate_tax_software_bs");
    form_data.append('first_row', $("#first_row").val());
    form_data.append('first_column', $("#prod_name").val());
    form_data.append('div_100', $("#div_100").val());
    //console.log(form_data);
    $("#span_load_data").html("<img src='css_include/images/loading.gif' alt='Loading ...'>Loading ... ");
    $.ajax({
        url: 'ajax_get.php', // point to server-side PHP script
        dataType: 'html',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(php_script_response){
            $("#span_load_data").html(php_script_response);
        }
    });
}