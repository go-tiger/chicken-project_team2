$(document).ready(function () {
  getMyProfile();
});

function getMyProfile() {
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
      <!----주소(고정)----->
      <div class="mb-3 row">
        <label for="inputAddress" class="col-12 col-form-label">주소</label>
        <div class="col-sm-10">
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            id="staticAddress"
            value="${address}"
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
            value="${phone}"
          />
        </div>
      </div>
      <!----핸드폰(고정)----->
      `;
      $('#myProfile').append(temp_html);
    },
  });
}
