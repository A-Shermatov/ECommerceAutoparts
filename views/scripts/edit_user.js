
$(document).ready(() => {

  
    const signupError = $("#signup_error");
    const user_id = window.location.pathname.split("/")[3]
    $.ajax({
      url: `/users/user_info/${user_id}`,
      method: "GET",
      error: (data) => {
          console.log(data)
      },
      success: (data) => {
        console.log(data.user.fname)
        $("#fname").val(data.user.fname)
        $("#sname").val(data.user.sname)
        $("#phone").val(data.user.phone)
        // $("#fname").attr("placeholder", data.user.fname)
      }
    })
    $("#form").on('click', '#signup_button', async (event) => {
      event.preventDefault();
      const form = $("#form");
      const dat = form.serializeArray();
      var data = {};
      for (var i = 0; i < dat.length; i++){
        data[dat[i]['name']] = dat[i]['value'];
      }
      data["user_id"] = user_id;
      $.ajax({
        url: "/users",
        method: "PATCH",
        data: data,
        error: (data) => {
          signupError.html(data.error);
        },
        success: (data) => {
          window.location = document.referrer;
        }
      })
      
    })
})