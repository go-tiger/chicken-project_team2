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
    url: '/signup',
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
      alert(response['message']);
      location.href = '/';
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
