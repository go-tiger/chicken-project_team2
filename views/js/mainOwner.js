$(document).ready(function () {
  getOrderLists();
});

function update(orderId) {
  $.ajax({
    type: 'PUT',
    url: `/api/order/update/${orderId}`,
    data: {},
    success: function (response) {
      alert(response['message']);
      window.location.reload();
    },
  });
}

function done(orderId) {
  $.ajax({
    type: 'PUT',
    url: `/api/order/done/${orderId}`,
    data: {},
    success: function (response) {
      alert(response['message']);
      window.location.reload();
    },
  });
}

function refuse(orderId) {
  $.ajax({
    type: 'PUT',
    url: `/api/order/refuse/${orderId}`,
    data: {},
    success: function (response) {
      alert(response['message']);
      window.location.reload();
    },
  });
}

function getOrderLists() {
  $.ajax({
    type: 'GET',
    url: '/api/order/owner',
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

        if (orderStatus == 0) {
          let temp_html = `<tr>
          <td>${orderId}</td>
          <td>${email}</td>
          <td>${menuName}</td>
          <td>${menuAmount}</td>
          <td>${address}</td>
          <td>${phone}</td>
          <td>${memo}</td>
          <td><button type="button" class="btn btn-success" onclick="update(${orderId})">수락</button></td>
          <td><button type="button" class="btn btn-danger" onclick="refuse(${orderId})">거절</button></td>
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
          <td><button type="button" class="btn btn-secondary" onclick="done(${orderId})">진행중</button></td>
        </tr>`;
          $('#orderIng').append(temp_html);
        } else if (orderStatus > 1) {
          let orderStat = '완료';
          if (orderStatus == 3) {
            orderStat = '거절';
          }
          let temp_html = `<tr>
          <td>${orderId}</td>
          <td>${email}</td>
          <td>${menuName}</td>
          <td>${address}</td>
          <td>${phone}</td>
          <td>${memo}</td>
          <td>${orderStat}</td>
        </tr>`;
          $('#orderDone').append(temp_html);
        }
      }
    },
  });
}
