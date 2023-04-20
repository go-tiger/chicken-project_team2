$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: '/login/check',
    data: {},
    success: function (response) {},
  });
});

function signUp() {
  let userName = $('#userName').val();
  let password = $('#pw').val();
  let confirm = $('#rePw').val();
  let email = $('#email').val();
  let phone = $('#phone').val();
  let address = $('#address').val();
  let userType = $('input[name=btnradio]:checked').val();
  $.ajax({
    type: 'POST',
    url: '/api/user/signup',
    data: {
      userName,
      password,
      confirm,
      email,
      phone,
      address,
      userType,
    },
    success: function (response) {
      console.log("회원가입이 완료되었습니다.")
      location.href = '/';
    },
    error: function (response) {
      alert(response.message)
    },
  });
}

function signOut() {
  $.ajax({
    type: 'DELETE',
    url: '/logout',
    data: {},
    success: function (response) {
      alert(response['message']);
      location.href = '/';
    },
  });
}

function signIn() {
  let email = $('#signUpEmail').val();
  let password = $('#signUpPassword').val();
  $.ajax({
    type: 'POST',
    url: '/api/user/login',
    data: { email, password },
    success: function (response) {
      console.log("로그인성공!")
      window.location.href = '/main';
    },
    error: function (response) {
      alert(response.message);
    },
  });
}
