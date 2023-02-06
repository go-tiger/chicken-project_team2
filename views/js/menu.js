$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: '/api/menu/admin/menu',
    data: {},
    success: function (response) {
      // console.log(response);
      // console.log(response['0']['Menu']);
      let rows = response['0']['Menu'];
      for (let i = 0; i < rows.length; i++) {
        let id = rows[i]['id'];
        let name = rows[i]['menuName'];
        let price = rows[i]['menuPrice'];
        let img = rows[i]['menuPhoto'];
        // console.log('id: ', id);
        // console.log('name: ', name);
        // console.log('price: ', price);
        // console.log('url: ', img);
        let menu_append = `<div class="card mb-4 col-4 mx-4" style="width: 18rem">
                            <img
                              class="card-img-top img-fluid"
                              src="../images/${img}"
                              alt="Card image cap"
                            />
                            <div class="card-body">
                              <h4 class="card-title">${name}</h4>
                              <p class="card-text">가격 : ${price}</p>
                            </div>
                            <div>
                              <button
                                type="button"
                                class="btn btn-primary col-3 mb-3"
                                onclick="location.href='/admin/editMenu'"
                              >
                                수정
                              </button>
                              <button
                                type="submit"
                                class="btn btn-primary col-3 mb-3"
                                onclick=""
                              >
                                삭제
                              </button>
                            </div>
                          </div>`;
        $('#chickenMenu').append(menu_append);
      }
    },
  });
});

/* 메뉴 추가 */
function chickenMenuAdd() {
  let menuName = $('#menuName').val();
  let menuPrice = $('#menuPrice').val();
  let file = $('#file')[0].files[0];
  /* 파일을 보낼려면 formdata에 보내야한다 */
  /* 보낼 벨류값도 같이 */
  let formData = new FormData();
  formData.append('file', file);
  formData.append('menuName', menuName);
  formData.append('menuPrice', menuPrice);

  $.ajax({
    type: 'POST',
    url: `/api/menu/`,
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    enctype: 'multipart/form-data',
    success: function (response) {
      console.log(response);
      // alert(response['message']);
    },
  });
}
