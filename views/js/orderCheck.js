$(document).ready(function () {
  getOrderLists();
});

function getOrderLists() {
  $.ajax({
    type: 'GET',
    url: '/api/order',
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
        let orderStat = '주문 접수 중';
        if (orderStatus == 0) {
          orderStat = '주문 접수 중';
        } else if (orderStatus == 1) {
          orderStat = '배달 중';
        } else if (orderStatus == 2) {
          orderStat = '배달 완료';
        } else if (orderStatus == 3) {
          orderStat = '주문 거절';
        }
        let temp_html = `<tr>
                          <td>${orderId}</td>
                          <td>${email}</td>
                          <td>${menuName}</td>
                          <td>${menuAmount}</td>
                          <td>${address}</td>
                          <td>${phone}</td>
                          <td>${memo}</td>
                          <td>${orderStat}</td>
                          </tr>`;
        $('#userOrderList').append(temp_html);
      }
    },
  });
}
