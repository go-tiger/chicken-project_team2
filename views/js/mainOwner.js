$(document).ready(function () {
  getOrderLists();
});

function getOrderLists() {
  $.ajax({
    type: 'GET',
    url: '/api/order/owner',
    data: {},
    success: function (response) {
      let rows = response['orders'];

      console.log(response);

      for (let i = 0; i < rows.length; i++) {
        let orderId = rows[i]['orderId'];
        let email = rows[i]['order']['user']['email'];
        let menuName = rows[i]['menuName'];
        let menuAmount = rows[i]['menuAmount'];
        let address = rows[i]['order']['address'];
        let phone = rows[i]['order']['user']['phone'];
        let memo = rows[i]['order']['memo'];
        let orderStatus = rows[i]['order']['orderStatus'];

        if (orderStatus == 0) {
          let temp_html = `<tr>
          <td>${orderId}</td>
          <td>${email}</td>
          <td>${menuName}</td>
          <td>${menuAmount}</td>
          <td>${address}</td>
          <td>${phone}</td>
          <td>${memo}</td>
          <td><button type="button" class="btn btn-success">수락</button></td>
          <td><button type="button" class="btn btn-danger">거절</button></td>
        </tr>
          `;
          $('#orderList').append(temp_html);
        } else if (orderStatus == 1) {
          let temp_html = `<tr>
          <td>${orderId}</td>
          <td>${email}</td>
          <td>${menuName}</td>
          <td>${address}</td>
          <td>${phone}</td>
          <td>${memo}</td>
          <td><button type="button" class="btn btn-secondary">진행중</button></td>
        </tr>`;
          $('#orderIng').append(temp_html);
        } else if (orderStatus == 2) {
          let temp_html = `<tr>
          <td>${orderId}</td>
          <td>${email}</td>
          <td>${menuName}</td>
          <td>${address}</td>
          <td>${phone}</td>
          <td>${memo}</td>
        </tr>`;
          $('#orderDone').append(temp_html);
        }
      }
    },
  });
}
