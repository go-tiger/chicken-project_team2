$(document).ready(function () {
  getMenuList();
});

function getMenuList() {
  $.ajax({
    type: 'GET',
    url: '/api/menu/admin/menu',
    data: {},
    success: function (response) {
      // console.log(response['0']['id']);
      // console.log(response['0']['Menu']);
      console.log(response);
      let userId = response['0']['id'];
      let rows = response['0']['Menu'];
      for (let i = 0; i < rows.length; i++) {
        let id = rows[i]['id'];
        let name = rows[i]['menuName'];
        let price = rows[i]['menuPrice'];
        let url = rows[i]['menuPhoto'];
        let temp_html = `<div class="card mb-4 col-4 mx-4" style="width: 18rem">
        <img
          class="card-img-top img-fluid"
          src="${url}"
          alt="Card image cap"
        />
        <div class="card-body">
          <h4 class="card-title">${name}</h4>
          <p class="card-text">가격 : ${price}원</p>
        </div>
      </div>`;
        $('#chickenMenu').append(temp_html);
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
