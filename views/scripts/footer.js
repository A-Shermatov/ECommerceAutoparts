$(document).ready(function() {
  let footer = $("#footer");
  footer.append(`
        <section id="section_1">
          <div id="left">
            <div>
              <h4>Онлайн покупки</h4>
              <p>Масло</p>
              <p>Кузов</p>
              <p>Шина</p>
              <p>Бензонасос</p>
              <p>...</p>
            </div>
            <div>
              <i class="fa-brands fa fa-android"></i>
              <i class="fa-brands fa fa-apple"></i>
              <h4 id="social_connect">Мы в социальных сетях</h4>
              <div>
                <i class="fa-brands fa-facebook-square"></i>
                <i class="fa-brands fa-twitter-square"></i>
                <i class="fa-brands fa-youtube"></i>
                <i class="fa-brands fa-instagram"></i>
              </div>
            </div>
          </div>
          <div id="right">
            <div>
              <p>
                <span>100% Оригинал</span> даем гаранитию на все товары
              </p>
            </div>
            <div>
              <p><span>Возврат в течении 7 дней</span> после покупки</p>
            </div>
          </div>
        </section>
        <section id="section_2">
          <p>В случае необходимости <a href="/about"> свяжитесь с нами</a></p>
          <p>&#169; 2024 www.foobarbaz.com. Все права защищены.</p>
        </section>
        <hr />`
      );
});
