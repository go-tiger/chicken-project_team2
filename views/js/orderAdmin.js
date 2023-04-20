$(document).ready(function () {
  getOrderList();
});

function deleteOrder(orderId) {
  $.ajax({
    type: 'DELETE',
    url: `/api/order/delete/${orderId}`,
    data: {},
    success: function (response) {
      alert(response['message']);
      window.location.reload();
    },
  });
}

function getOrderList() {
  $.ajax({
    type: 'GET',
    url: '/api/order/admin',
    data: {},
    success: function (response) {
      let rows = response['orders'];
      for (let i = 0; i < rows.length; i++) {
        let orderId = rows[i]['orderId'];
        let email = rows[i]['order']['user']['email'];
        let menuName = rows[i]['menuName'];
        let menuAmount = rows[i]['menuAmount'];
        let address = rows[i]['order']['address'];
        let phone = rows[i]['order']['user']['phone'];
        let memo = rows[i]['order']['memo'];
        let orderStatus = rows[i]['order']['orderStatus'];
        if (orderStatus < 2) {
          let temp_html = `<tr>
              <td>${orderId}</td>          
              <td>${email}</td>
              <td>${menuName}</td>
              <td>${menuAmount}</td>
              <td>${address}</td>
              <td>${phone}</td>
              <td>${memo}</td>
              <td><button type="button" class="btn btn-outline-danger" onclick="deleteOrder(${orderId})">삭제</button></td>
            </tr>
            `;
          $('#adminOrder').append(temp_html);
        } else if (orderStatus > 1) {
          let temp_html = `<tr>
              <td>${orderId}</td>          
              <td>${email}</td>
              <td>${menuName}</td>
              <td>${menuAmount}</td>
              <td>${address}</td>
              <td>${phone}</td>
              <td>${memo}</td>
            </tr>
            `;
          $('#ordersDone').append(temp_html);
        }
      }
    },
  });
}
