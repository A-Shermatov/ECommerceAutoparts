$(document).ready(() => {

    const loginMessage = $("#login_message");
  
    $("#form").on('click', '#login_button', async (event) => {
        event.preventDefault();
        const form = $("#form");
        const dat = form.serializeArray();
      
        $.ajax({
            url: "/login",
            method: "POST",
            data: dat,
            error: (data) => {
                loginMessage.html(data.responseJSON.error)

            },
            success: (data) => {
                window.location = document.referrer
                
            }
        })
      
    })
});