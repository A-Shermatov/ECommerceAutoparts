$(document).ready(() => {
    $("#main_content").html('<a href="/products/add_product_page" id="add_product_btn">Добавить продукт</a>');
    $.ajax({
        url: "/products/my_products",
        method: "GET",
        error: (data) => {
            // loginMessage.html(data.responseJSON.error)

        },
        success: (data) => {
            // window.location = data
            
            const main = $("#main_content");
            main.append(`<div class = "product_list" id="product_list"} ></div>`)
            const productList = $("#product_list");

            productList.append(`<div class = "product_grid" id="product_grid" ></div>`)
            const productGrid = $("#product_grid");
           
            data.products.map((product) => {
                productGrid.append(`<div class = "product_list_item" id="${product._id}" >
                        <a href="/products/${product._id}" class="product_item_link" id="product_item_link">
                            <div  class = "product_item" >
                                    <img src = ${product.img} alt = ${product.name} class = "product_image" />
                                    <div class="product_description" >
                                        <div class = "product_fact" >
                                            <p> <b>Названние продукта: ${product.name}</b> </p>
                                            <p> <i>VIN-номер: ${product.vin}</i> </p>
                                        </div>
                                        <p class ="product_fact" > <i>Цена: ${product.price}</i> </p>
                                    </div>
                            </div>
                        </a>
                    </div>`
                )
            })
            // main.append(productGrid)
        }
    })
});