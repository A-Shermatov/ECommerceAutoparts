$(document).ready(() => {
    const purchase_id = window.location.pathname.split("/")[2];
    const data = {purchase_id: purchase_id};
    let user_id = "";
    $.ajax({
        url: "/purchases/purchase_info",
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
                                <td>Цена покупки:</td>
                                <td>${data.product.price}</td>
                            </tr>
                            <tr>
                                <td>Дата покупки:</td>
                                <td>${data.purchase.purchase_date.split("T")[0]}</td>
                            </tr>
                            <tr>
                                <td>Дата добавления товара:</td>
                                <td>${data.product.added_date.split("T")[0]}</td>
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
                    <p id="buy_message">Заказ можно отменить в течении 7 дней после покупки</p>
                </div>
            </div>`);
            const seller_id = data.product.seller_id.toString();
            main_content.append(`<a class="edit_product_button" id="delete_product">Отменить заказ</a>`);
        }
        
    })
    $("#main_content").on('click', '#delete_product', async (event) => {
        const buy_message = $("#buy_message");
        $.ajax({
            url: `/purchases/delete/${purchase_id}`,
            method: "GET",
            error: (data) => {
                alert(data.responseJSON.error);
            },
            success: (data) => {
                alert("Заказ успешно отменен");
                window.location = document.referrer;
            }
        })
    })
});