$(document).ready(() => {
    $.ajax({
        url: "/purchases/my_purchases",
        method: "GET",
        error: (data) => {
            // loginMessage.html(data.responseJSON.error)

        },
        success: (datas) => {
            // window.location = data
            
            const main = $("#main_content");
            main.html(`<div class = "product_list" id="product_list"} ></div>`);
            const productList = $("#product_list");

            productList.append(`<div class = "product_grid" id="product_grid" ></div>`);
            const productGrid = $("#product_grid");
           
            datas.map((data) => {
                productGrid.append(`<div class = "product_list_item" id="${data.product._id}" >
                        <a href="/purchases/${data.purchase._id}" class="product_item_link" id="product_item_link">
                            <div  class = "product_item" >
                                    <img src = ${data.product.img} alt = ${data.product.name} class = "product_image" />
                                    <div class = "product_fact" >
                                        <b>Названние продукта: </b><i>${data.product.name}</i>
                                    </div>
                                    <div class = "product_fact" >
                                        <i>Цена: ${data.product.price}</i>
                                    </div>
                                    
                                    <div class = "product_fact" >
                                        <i>Дата покупки: ${data.purchase.purchase_date.split("T")[0]}</i>
                                    </div>
                            </div>
                        </a>
                    </div>`
                )
            })
        }
    })
});