$(document).ready(function () {
  getOrderLists();
});

function getOrderLists() {
  $.ajax({
    type: 'GET',
    url: '/api/order/orders',
    data: {},
    success: function (response) {
      // let rows = response['0']['users'];
      // for (let i = 0; i < rows.length; i++) {
      //   let temp_html = `<tr>
      //   <td>${}</td>
      //   <td>${}</td>
      //   <td>${}</td>
      //   <td>${}</td>
      //   <td>${}</td>
      //   <td>${}</td>
      //   <td><button type="button" class="btn btn-success" onclick="confirmOrder(${})">수락</button></td>
      //   <td><button type="button" class="btn btn-danger" onclick="deleteOrder(${})">삭제</button></td>
      // </tr>
      //   `;
      //   $('#orderList').append(temp_html);
      // }
    },
  });
}
