$(document).ready(function () {
  getEditProfile();
});

function editProfile() {
  let password = $('#pw').val();
  let confirm = $('#rePw').val();
  let phone = $('#phone').val();
  let address = $('#address').val();

  $.ajax({
    type: 'PUT',
    url: '/api/mypage/edit',
    data: {
      password,
      confirm,
      phone,
      address,
    },
    success: function (response) {
      alert(response['message']);
      location.reload();
    },
    error: function (response) {
      if ('Validation error' == response['responseJSON'].message) {
        alert('중복된 정보가 있습니다.');
      } else {
        alert(response['responseJSON'].message);
      }
    },
  });
}

function getEditProfile() {
  $.ajax({
    type: 'GET',
    url: '/api/mypage',
    data: {},
    success: function (response) {
      let email = response['0']['user']['email'];
      let address = response['0']['user']['address'];
      let phone = response['0']['user']['phone'];

      let temp_html = `<!----이메일(고정)----->
      <div class="mb-3 row">
        <label for="staticEmail" class="col-12 col-form-label">이메일</label>
        <div class="col-sm-10">
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            id="staticEmail"
            value="${email}"
          />
        </div>
      </div>
      <!----이메일(고정)----->
      <hr class="col-12" />
      <!----패스워드(유동)----->
      <div class="mb-3 row">
        <label for="pw" class="col-12 col-form-label">비밀번호</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="pw" />
        </div>
      </div>
      <!----패스워드(유동)----->
      <hr class="col-12" />
      <!----패스워드(유동)----->
      <div class="mb-3 row">
        <label for="rePw" class="col-12 col-form-label"
          >비밀번호 확인</label
        >
        <div class="col-sm-10">
          <input type="password" class="form-control" id="rePw" />
        </div>
      </div>
      <!----패스워드(유동)----->
      <hr class="col-12" />
      <!----주소(유동)----->
      <div class="mb-3 row">
        <label for="address" class="col-12 col-form-label">주소</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="address" value="${address}" />
        </div>
      </div>
      <!----주소(유동)----->
      <hr class="col-12" />
      <!----주소(유동)----->
      <div class="mb-3 row">
        <label for="phone" class="col-12 col-form-label">핸드폰</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="phone" value="${phone}"/>
        </div>
      </div>
      <!----주소(유동)----->`;
      $('#editProfile').append(temp_html);
    },
  });
}
