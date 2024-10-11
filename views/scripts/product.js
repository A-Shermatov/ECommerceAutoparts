$(document).ready(() => {
    const product_id = window.location.pathname.split("/")[2];
    const data = {product_id: product_id};
    let user_id = "";
    $.ajax({
        url: "/products/product_info",
        method: "POST",
        data: data,
        error: (data) => {
            console.log(data)
        },
        success: (data) => {
            const main_content = $("#main_content");
            const date_dmy = data.product.added_date;
            main_content.html(`<img src=${data.product.img} alt="${data.product.name}" class="image" /><div id="table_container"><div>
                    <table>
                        <thead>
                            <tr>
                                <th colspan=2 style="text-align: center">Основная информация</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Название продукта:</td>
                                <td>${data.product.name}</td>
                            </tr>
                            <tr>
                                <td>VIN номер:</td>
                                <td>${data.product.vin}</td>
                            </tr>
                            <tr>
                                <td>Цена:</td>
                                <td>${data.product.price}</td>
                            </tr>
                            <tr>
                                <td>Дата добавления:</td>
                                <td>${date_dmy.split("T")[0]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th colspan=2 style="text-align: center">Дополнительная информация</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Имя продавца:</td>
                                <td>${data.user.fname}</td>
                            </tr>
                            <tr>
                                <td>Фамилия:</td>
                                <td>${data.user.sname}</td>
                            </tr>
                            <tr>
                                <td>Телефон:</td>
                                <td>${data.user.phone}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2>Описание</h2>
                    <div class="description">${data.product.description}</div>
                    <p id="buy_message"></p>
                </div>
            </div>`);
            const seller_id = data.product.seller_id.toString();
            $.ajax({
                url: "/check_user",
                method: "GET",
                error: (data) => {
                    if (data.responseJSON.error && data.responseJSON.error.message === "jwt expired" && data.responseJSON.redirect_url) {
                        window.location = data.responseJSON.redirect_url;
                    }
                },
                success: (data) => {
                    user_id = data.user_id.toString();
                    if (user_id === seller_id) {
                        main_content.append(`<a href="/products/edit_product_page/${product_id}" class="edit_product_button" id="edit_product">Изменить</a>`);
                    } else {
                        main_content.append('<a class="edit_product_button" id="buy_product">Купить</a>');
                    }
                }
            })
            
        }
        
    })
    $("#main_content").on('click', '#buy_product', async (event) => {
        const data = {product_id: product_id, buyer_id: user_id}
        const buy_message = $("#buy_message");
        $.ajax({
            url: "/purchases/add_purchases",
            method: "POST",
            data: data,
            error: (data) => {
                buy_message.html(data.error)
            },
            success: (data) => {
                alert("Товар успешно куплен");
            }
        })
    })
});