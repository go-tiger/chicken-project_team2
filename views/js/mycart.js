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
      console.log(rows);

      for (let i = 0; i < rows.length; i++) {
        let menuId = rows[i]['id'];
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
            <input type="number" min="1" name="amount" id="menuAmount" value="${menuAmount}" />
          </div>
          <div class="col-2">
            <button type="button" class="btn btn-primary" onclick="cartMenuEdit(${menuId})">수정</button>
          </div>
          <div class="col-2">
            <button type="button" class="btn btn-primary" onclick="cartMenuDel(${menuId})">삭제</button>
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
      <button
          type="button"
          class="btn btn-dark"
          onclick="location.href='/order'"
        >
          확인
        </button>
        <button type="button" class="btn btn-dark">비우기</button>`;
      $('#totalPrice').append(temp_html);
    },
  });
}

/* 장바구니 페이지에서 메뉴 수량 수정 */
function cartMenuEdit(menuId) {
  let menuAmount = $('#menuAmount').val();
  $.ajax({
    type: 'PUT',
    url: `/api/cart/${menuId}`,
    data: { menuId, menuAmount },
    success: function (response) {
      alert(response['message']);
      window.location.reload();
    },
  });
}

/* 장바구니 페이지에서 해당 메뉴 삭제 */
function cartMenuDel(menuId) {
  $.ajax({
    type: 'DELETE',
    url: `/api/cart/${menuId}`,
    data: { menuId },
    success: function (response) {
      alert(response['message']);
      window.location.reload();
    },
  });
}
