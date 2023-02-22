const id = new URLSearchParams(location.search).get('id');
console.log(id);
getUserLists();

function deleteUser(id) {
  let result = confirm('정말로 삭제하시겠습니까?');

  if (result) {
    $.ajax({
      type: 'DELETE',
      url: `/api/user/${id}`,
      data: {},
      success: function () {
        alert('삭제되었습니다.');
        location.reload();
      },
    });
  } else {
    alert('취소되었습니다.');
  }
}

function deleteUser(id) {
  let result = confirm('정말로 삭제하시겠습니까?');

  if (result) {
    $.ajax({
      type: 'DELETE',
      url: `/api/user/${id}`,
      data: {},
      success: function () {
        alert('삭제되었습니다.');
        location.reload();
      },
    });
  } else {
    alert('취소되었습니다.');
  }
}

function getUserLists(page) {
  $.ajax({
    type: 'GET',
    url: `/api/user/list`,
    data: {},
    success: function (response) {
      const AdminUser = response.allUsers.map(user => {
        return `<tr>
  <td>${user.id}</td>
  <td>${user.email}</td>
  <td>${user.address}</td>
  <td>${user.phone}</td>
  <td><button type="button" class="btn btn-outline-dark"><a href="/user/${user.id}">수정</a></button></td>
  <td><button type="button" class="btn btn-outline-dark" onclick="deleteUser(${user.id})">삭제</button></td>  
</tr>`;
      });
      $('#userList').append(AdminUser.join());

      const edminUser = response.allUsers.map(user => {
        return `<!----이메일(고정)----->
  <div class="mb-3 row">
    <label for="staticEmail" class="col-12 col-form-label">이메일</label>
    <div class="col-sm-10">
      <input
        type="text"
        readonly
        class="form-control-plaintext"
        id="staticEmail"
        value="${user.email}"
      />
    </div>
  </div>
  <!----이메일(고정)----->
  <hr class="col-12" />
  <!----주소(고정)----->
  <div class="mb-3 row">
    <label for="inputAddress" class="col-12 col-form-label">주소</label>
    <div class="col-sm-10">
      <input
        type="text"
        readonly
        class="form-control-plaintext"
        id="staticAddress"
        value="${user.address}"
      />
    </div>
  </div>
  <!----주소(고정)----->
  <hr class="col-12" />
  <!----핸드폰(고정)----->
  <div class="mb-3 row">
    <label for="inputPhone" class="col-12 col-form-label">핸드폰</label>
    <div class="col-sm-10">
      <input
        type="text"
        readonly
        class="form-control-plaintext"
        id="staticEmail"
        value="${user.phone}"
      />
    </div>
  </div>
  <!----핸드폰(고정)----->`;
      });
      console.log(edminUser);
      $('#myProfile').append(edminUser.join(' '));
    },
  });
}
