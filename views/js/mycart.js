$(document).ready(function () {
  getMyCart();
});

function postOrder() {
  $.ajax({
    type: 'POST',
    url: '/api/order',
    data: {},
  });
}

function getMyCart() {
  $.ajax({
    type: 'GET',
    url: '/api/cart',
    data: {},
    success: function (response) {
      let rows = response['0']['cart'];
      let totalPrice = 0;

      for (let i = 0; i < rows.length; i++) {
        let menuAmount = rows[i]['menuAmount'];
        let menuName = rows[i]['chickenMenu']['menuName'];
        let menuPrice = rows[i]['chickenMenu']['menuPrice'];

        totalPrice += menuPrice * menuAmount;

        let temp_html = `<hr class="col-12" />
        <!----추가된 메뉴----->
        <div class="mb-2 row">
          <label for="staticEmail" class="col-2 col-form-label"
            >${menuName}</label
          >
          <div class="col-6">
            <input type="number" min="1" name="amount" value="${menuAmount}" />
          </div>
          <div class="col-2">
            <button type="submit" class="btn btn-primary">수정</button>
          </div>
          <div class="col-2">
            <button type="submit" class="btn btn-primary">삭제</button>
          </div>
        </div>
        <!----추가된 메뉴----->
        `;
        $('#menuList').append(temp_html);
      }
      temp_html = `<div class="amount text-center fs-3">
      <p>총 : <span>${totalPrice}</span>원</p>
      </div>
      <div class="col-sm-10">
      </div>
      `;
      $('#totalPrice').append(temp_html);
    },
  });
}
