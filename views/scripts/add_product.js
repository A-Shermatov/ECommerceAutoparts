$(document).ready(() => {

  
    const addProductError = $("add_product_error");
  
    $("#form").submit(async (event) => {
      event.preventDefault();
      
      const form_data = new FormData();
      form_data.append('name', $("#name").val());
      form_data.append('vin', $("#vin").val());
      form_data.append('description', $("#description").val());
      form_data.append('price', $("#price").val());

      form_data.append('img_path', document.getElementById("img_path").files[0]);
  
      $.ajax({
        url: "/products",
        method: "POST",
        data: form_data,
        processData: false,
        contentType: false,
        error: (data) => {
            addProductError.html(data.error);
        },
        success: (data) => {
          window.location = document.referrer;
        }
      })
    })
})