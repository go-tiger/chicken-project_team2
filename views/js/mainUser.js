$(document).ready(function () {
  getMenuList();
});

function getMenuList() {
  $.ajax({
    type: 'GET',
    url: '/api/menu/admin/menu',
    data: {},
    success: function (response) {
      let userId = response['0']['id'];
      let rows = response['0']['Menu'];
      for (let i = 0; i < rows.length; i++) {
        let id = rows[i]['id'];
        let name = rows[i]['menuName'];
        let price = rows[i]['menuPrice'];
        let url = rows[i]['menuPhoto'];
        let temp_html = `
      <div class="col" id="cardCenter">
        <div class="card p-3" style="width: 18rem">
          <img
            class="card-img-top img-fluid"
            src="${url}"
            alt="Card image cap"
          />
          <div class="card-body">
            <h4 class="card-title">${name}</h4>
            <p class="card-text">가격 : ${price}원</p>
          </div>
        <div>
          <button
            type="submit"
            class="btn btn-primary col-6 mb-3"
            onclick="a()"
          >
            장바구니 추가
          </button>
          <button
            type="submit"
            class="btn btn-primary col-4 mb-3"
            onclick="b()"
          >
            주문하기
          </button>
        </div>
      </div>`;
        $('#menu').append(temp_html);
      }
    },
  });
}

function a(userId, id) {
  $.ajax({
    type: 'POST',
    url: `/api/cart/${userId}/${id}`,
    data: {},
    success: function (response) {
      // console.log(response);
      // alert(response['message']);
    },
  });
}

function b(userId, id) {
  $.ajax({
    type: 'POST',
    url: `/api/order/${userId}/${id}`,
    data: {},
    success: function (response) {
      // console.log(response);
      // alert(response['message']);
    },
  });
}
