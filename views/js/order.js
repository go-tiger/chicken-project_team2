$(document).ready(function () {
  getMyCart();
});

function postOrder() {
  let address = $('#address').val();
  console.log(address);

  let memo = $('#memo').val();
  console.log(memo);

  let totalPrice = $('#price').val();
  console.log(totalPrice);

  $.ajax({
    type: 'POST',
    url: '/api/order',
    data: {
      address,
      memo,
      totalPrice,
    },
    success: function (response) {
      alert(response['message']);
      location.href = '/orderchk';
    },
  });
}

function getMyCart() {
  $.ajax({
    type: 'GET',
    url: '/api/cart/order',
    data: {},
    success: function (response) {
      let rows = response['0']['cart'];
      let address = response['0']['cart']['0']['user']['address'];
      let totalPrice = 0;

      for (let i = 0; i < rows.length; i++) {
        let menuAmount = rows[i]['menuAmount'];
        let menuName = rows[i]['chickenMenu']['menuName'];
        let menuPrice = rows[i]['chickenMenu']['menuPrice'];

        totalPrice += menuPrice * menuAmount;

        let temp_html = `<p>${menuName}<strong> ${menuAmount} 마리</strong></p>`;
        $('#menuList').append(temp_html);
      }
      // console.log(orderList);

      temp_html = `<textarea class="form-control" id="address" rows="3">${address}</textarea>`;
      $('#userAddress').append(temp_html);
      temp_html = `<p>총 : <span>${totalPrice}</span>원</p>`;
      $('#totalPrice').append(temp_html);

      $('#price').val(totalPrice);
    },
  });
}
