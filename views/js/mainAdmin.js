$(document).ready(function () {
  getUserLists();
});

function getUserLists() {
  $.ajax({
    type: 'GET',
    url: '/api/user/users',
    data: {},
    success: function (response) {
      let rows = response['0']['users'];

      for (let i = 0; i < rows.length; i++) {
        let userId = rows[i]['id'];
        let email = rows[i]['email'];
        let address = rows[i]['address'];
        let phone = rows[i]['phone'];

        let temp_html = `<tr>
        <td>${userId}</td>
        <td>${email}</td>
        <td>${address}</td>
        <td>${phone}</td>
        <td><button type="button" class="btn btn-warning">수정</button></td>
        <td><button type="button" class="btn btn-danger" onclick="deleteUser(${userId})">삭제</button></td>
      </tr>
        `;
        $('#userList').append(temp_html);
      }
    },
  });
}

// function deleteUser(userId) {
//   alert(userId);
// }

function deleteUser(userId) {
  $.ajax({
    type: 'DELETE',
    url: `/api/user/admin/${userId}`,
    data: {},
    success: function (response) {
      alert(response['message']);
      location.reload();
    },
  });
}
