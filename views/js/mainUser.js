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
      let userId = response['0']['id'];
      let rows = response['0']['Menu'];
      for (let i = 0; i < rows.length; i++) {
        let id = rows[i]['id'];
        let name = rows[i]['menuName'];
        let temp_html = `<div class="col">
                          <div class="card shadow-sm">
                            <svg
                              class="bd-placeholder-img card-img-top"
                              width="100%"
                              height="225"
                              xmlns="http://www.w3.org/2000/svg"
                              role="img"
                              aria-label="Placeholder: Thumbnail"
                              preserveAspectRatio="xMidYMid slice"
                              focusable="false"
                            >
                              <title>Placeholder</title>
                              <rect width="100%" height="100%" fill="#55595c" />
                              <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                                ${id},   ${name},
                              </text>
                            </svg>
                            <div class="card-body">
                              <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                  <button type="button" class="btn btn-sm btn-outline-secondary" onclick="a(${userId},${id})">
                                    장바구니추가
                                  </button>
                                  <button type="button" class="btn btn-sm btn-outline-secondary" onclick="b(${userId},${id})">
                                    바로 주문
                                  </button>
                                </div>
                              </div>
                            </div>
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
