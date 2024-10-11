$(document).ready(() => {

  
    const editProductError = $("#edit_product_error");
    const product_id = window.location.pathname.split("/")[3]
    const data = {product_id: product_id};
    $.ajax({
        url: "/products/product_info",
        method: "POST",
        data: data,
      error: (data) => {
          console.log(data)
      },
      success: (data) => {
        $("#name").val(data.product.name)
        $("#vin").val(data.product.vin)
        $("#description").val(data.product.description)
        $("#price").val(data.product.price)
        // $("#fname").attr("placeholder", data.user.fname)
      }
    })

    $("#form").submit(async (event) => {
        event.preventDefault();
        
        const data = $("#form").serializeArray();
        data.push({"name": "product_id", "value": product_id});
    
        $.ajax({
          url: "/products/edit_product",
          method: "PATCH",
          data: data,
          error: (data) => {
            editProductError.html(data.error);
          },
          success: (data) => {
            window.location = document.referrer;
          }
        })
      })
})