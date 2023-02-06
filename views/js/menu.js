$(document).ready(function () {
  const searchParams = new URLSearchParams(location.search);
  const editMenuId = searchParams.get('id');
  // console.log(editMenuId);
  $.ajax({
    type: 'GET',
    url: '/api/menu/admin/menu',
    data: {},
    success: function (response) {
      // console.log(response);
      if (editMenuId === null) {
        console.log('상품 관리 페이지');
        let rows = response['0']['Menu'];
        for (let i = 0; i < rows.length; i++) {
          let menuId = rows[i]['id'];
          let name = rows[i]['menuName'];
          let price = rows[i]['menuPrice'];
          let img = rows[i]['menuPhoto'];
          let menuAppend = `<div class="card" style="width: 18rem">
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
                                  onclick="location.href='/admin/editMenu/?id=${menuId}'"
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
          $('#chickenMenu').append(menuAppend);
        }
      } else {
        console.log('상품 수정 페이지');
        let edit = response['0']['Menu'][editMenuId];
        // console.log(edit);
        let name = edit['menuName'];
        let price = edit['menuPrice'];
        let img = edit['menuPhoto'];
        console.log(name);
        console.log(price);
        console.log(img);
        let menuEdit = `<div class="card mb-4 col-4 mx-4" style="width: 18rem">
                          <img
                            class="card-img-top img-fluid"
                            src="../../images/${img}"
                            alt="Card image cap"
                          />
                          <div class="card-body">
                            <h4 class="card-title">${name}</h4>
                            <p class="card-text">가격 : ${price}</p>
                          </div>
                          <div>`;
        $('#editMenu').append(menuEdit);
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

/* 메뉴 수정 */
function chickenMenuEdit() {
  const searchParams = new URLSearchParams(location.search);
  const menuId = searchParams.get('id');

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
    type: 'PUT',
    url: `/api/menu/${menuId}`,
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    enctype: 'multipart/form-data',
    success: function (response) {
      console.log(response);
      alert(response['message']);
      history.back();
    },
  });
}
