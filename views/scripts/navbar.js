$(document).ready(() => {
    let navbar = $("#home_navbar");
    navbar.append(`
    <div id="logo_div"><a style="margin-left: 27px;cursor:pointer;" href="/" class="logo">
    <img src="/images/mainLogo.jpg" />
    </a></div>
    
    <div>
        <ul class="menu-items">
        
        <li>
            <a href="/" class="menu-item-1">Главная</a>
        </li>
        <li>
            <a href="/about" class="menu-item-3">О нас</a>
        </li>
        </ul>
    </div>
    <div class="search-div">
        <i id="search_icon_navbar" class="fa-solid fa-magnifying-glass"></i>
    
        <input
        type="text"
        placeholder="Поиск товара по VIN номеру или названию"
        id="search"
        />
    </div>
  
    <div class="nav-last">
        <div>
            <a href="">
            <i id="nav_icons" class="fa-solid fa-user"></i>
            </a>
    
            <div class="dropdown">
                <button class="dropbtn" id="userName">Профиль</button>
                <div id="dropdown-content">
                    <h3>Добро пожаловать</h3>
                    <hr class="hr1">
                    <p>Активизируйте свой аккаунт</p>
                    <button class="btn-redirect"> <a href="/login_page" id="login_btn">Вход</a> </button>
                    <hr class="hr2">
                    <a href="/login_page" class="menu-item-2">Связаться с нами</a>
                    <hr class="hr3">
                </div>
            </div>
        </div>
  
        <div id="count_div" style="display:none">
            <i  id="nav_icons" class="fa-solid fa-right-from-bracket"></i>
            <div>Выход</div>
        </div>
    </div>
    `);
    $( "#search" ).on( "change", () => {
        
        if ($("#search").val().length === 0) {
            $.ajax({
                url: `/products/`,
                method: "GET",
                error: (data) => {
                    // console.log(data)
                    if (data.responseJSON.error && data.responseJSON.error.message === "jwt expired" && data.responseJSON.redirect_url) {
                        window.location = data.responseJSON.redirect_url;
                    }
                },
                success: (data) => {
                    const main = $("#main_content");
                    main.html(`<div class = "product_list" id="product_list"></div>`);
                    product_list(main, data.products);
                }
            })
        } else {
            $.ajax({
                url: `/products/search/${$("#search").val()}`,
                method: "GET",
                error: (data) => {
                    // console.log(data)
                    if (data.responseJSON.error && data.responseJSON.error.message === "jwt expired" && data.responseJSON.redirect_url) {
                        window.location = data.responseJSON.redirect_url;
                    }
                },
                success: (data) => {
                    console.log(data);
                    const main = $("#main_content");
                    main.html(`<div class = "product_list" id="product_list"> <h2>Совпадения по названию товара или VIN номеру</h2> </div>`);
                    product_list(main, data.products);
                }
            })
        }
        
    });

    $.ajax({
        url: "/check_user",
        method: "GET",
        error: (data) => {
            // console.log(data)
            if (data.responseJSON.error && data.responseJSON.error.message === "jwt expired" && data.responseJSON.redirect_url) {
                window.location = data.responseJSON.redirect_url;
            }
        },
        success: (data) => {
            if (data.message === "Access is allowed") {
                $("#dropdown-content > .btn-redirect").remove();
                const btn = '<button class="btn-redirect"> <a href="/logout" id="login_btn">Выйти</a> </button>';
                $("#dropdown-content > .hr3").after(btn);
                $("#dropdown-content > h3").html("Ваш профиль")
                $("#dropdown-content > .hr1").after(`<a href="/users/edit_user_page/${data.user_id}" class="menu-item-1">Изменить профиль</a>`);
                $("#dropdown-content > .menu-item-1").after(`<a href="/purchases/my_purchases_page" class="menu-item-1">Мои покупки</a>`);
                $("#dropdown-content > p").remove()
            }
            if (data.role === "admin" || data.role === "seller") {
                const dropdown = $("#dropdown-content > .hr2").before('<a href="/products/my_products_page" class="menu-item-1">Мои продукты</a>');
            }
        }
    })
});



function product_list(main, products) {
    const productList = $("#product_list");
    if (!products || products.length === 0) {
        productList.attr("style", "text-align: center;")
        productList.append("<div> К сожалению, ничего не нашли :(</div>");
        return;
    }

    productList.append(`<div class = "product_grid" id="product_grid" ></div>`)
    const productGrid = $("#product_grid");

    products.map((product) => {
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
}