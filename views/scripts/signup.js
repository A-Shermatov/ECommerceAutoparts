$(document).ready(() => {

  
  const signupError = $("signup_error");

  $("#form").on('click', '#signup_button', async (event) => {
    event.preventDefault();
    const form = $("#form");
    const dat = form.serializeArray();
    
    $.ajax({
      url: "/signup",
      method: "POST",
      data: dat,
      error: (data) => {
        signupError.html(data.error);
      },
      success: (data) => {
        window.location = data;
      }
    })
  })
})

