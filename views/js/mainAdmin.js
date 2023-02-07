$(document).ready(function () {
  const page = new URLSearchParams(location.search).get('page') || 1;
  getUserLists(page);
});

function getUserLists(page) {
  $.ajax({
    type: 'GET',
    url: `/api/user/users?page=${page}`,
    data: {},
    success: function (response) {
      const html = response.paginationUsers.map(user => {
        return `<tr>
        <td>${user.id}</td>
        <td>${user.email}</td>
        <td>${user.address}</td>
        <td>${user.phone}</td>
        <td><button type="button" class="btn btn-warning" onclick="location.href='/admin/edit/?id=${user.id}'">수정</button></td>
        <td><button type="button" class="btn btn-danger" onclick="deleteUser(${user.id})">삭제</button></td>
        </tr>`;
      });
      $('#userList').append(html.join());

      const lastPage = response.pageInfo.lastPage;
      const currentPage = Number(page);
      const pagesInPageGroup = 5;

      const pageGroup = Math.ceil(currentPage / pagesInPageGroup);
      const pageGroupLast =
        pageGroup * pagesInPageGroup > lastPage
          ? lastPage
          : pageGroup * pagesInPageGroup;

      const pages = [];

      const pageGroupFirst =
        pageGroup === 1 ? 1 : (pageGroup - 1) * pagesInPageGroup + 1;
      if (pageGroup > 1) {
        // 이전 페이지 그룹 - 1 => 이전 페이지 그룹의 마지막 페이지는 (pageGroup-1)*2
        pages.push(
          `<li class="page-item">
          <a class="page-link" href='?page=${
            (pageGroup - 1) * pagesInPageGroup
          }' aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>`
        );
      }

      // 페이지 그룹의 첫번 째 페이지가 1보다 크면 이전 화살 만들기
      if (currentPage > 1) {
        pages.push(`<li class="page-item">
        <a class="page-link" href="?page=${
          currentPage - 1
        }" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>`);
      }

      // 페이지 그룹의 마지막 페이지까지 페이지 숫자 렌더링 하기
      for (i = pageGroupFirst; i <= pageGroupLast; i++) {
        pages.push(
          `<li class="page-item"><a class="page-link" href='?page=${i}'>${i}</a></li>`
        );
      }

      // 페이지 그룹의 마지막 페이지가 총 마지막 페이지보다 작을 때 다음 화살 만들기
      if (currentPage < lastPage) {
        pages.push(`<li class="page-item">
        <a class="page-link" href='?page=${currentPage + 1}' aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>`);
      }

      // 다음 페이지 그룹으로 가기
      if (pageGroupLast < lastPage) {
        // 다음 페이지 그룹 + 2 => 다음 페이지 그룹의 첫 페이지는 pageGroup * pagesInPageGroup + 1
        pages.push(
          `<li class="page-item">
          <a class="page-link" href='?page=${
            pageGroup * pagesInPageGroup + 1
          }' aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>`
        );
      }

      $('#adminUserList').append(pages.join(''));
    },
  });
}
