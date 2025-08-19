/// <reference types="cypress" />

describe("Quản lý phim - Admin Dashboard", () => {
  beforeEach(() => {
    cy.loginAsAdmin().then(() => {
      cy.visit("/admin/movies");
    });
  });

  it("Hiển thị tiêu đề và danh sách phim", () => {
    cy.contains(/quản lý phim/i).should("be.visible");

    // Kiểm tra có ít nhất 1 thẻ phim hiển thị
    cy.get("img").should("have.length.greaterThan", 0);

    // Kiểm tra các phim cụ thể (nếu chắc chắn có)
    cy.contains(/S Line/i).should("exist");

  });

  it("Click vào một phim để xem chi tiết", () => {
    cy.contains(/S Line/i).click();

    cy.url().should("include", "/admin/movies/");

    cy.contains(/Season 1/i, { timeout: 10000 })
        .scrollIntoView();

    cy.get("table").should("exist");
    cy.get("table tbody tr").should("have.length.at.least", 1);
  });

  it("Hiển thị danh sách tập phim", () => {
<<<<<<< HEAD
    cy.contains(/S Line/i).click();

    cy.get("table").should("exist");

    cy.contains(/S Line-S1E6/i).should("exist");
    cy.contains(/4iIO9oOG5w02YAqiXg02KVxhYVz5mYHKKWtKbDWhGZ7pg/i).should("exist");
    cy.contains("3040").should("exist"); 
  });

  it("Có nút thêm, xoá, chỉnh sửa phim và tập", () => {
    cy.contains(/S Line/i).click();

    // Các nút điều khiển (dùng regex để tránh lỗi chữ hoa/thường)
    cy.contains(/thêm mùa/i, { timeout: 10000 }).should("exist");
    cy.contains(/thêm tập/i).should("exist");

    cy.get("table tbody tr").first().within(() => {
      cy.contains(/sửa/i).should("exist");
      cy.contains(/xóa/i).should("exist");
    });

    cy.contains(/chỉnh sửa/i).should("exist");
  });
it("Thêm phim mới thành công", () => {
  // Mở modal thêm phim
  cy.contains("+ Thêm phim").click();

  // Điền form
  cy.get("input[placeholder='Nhập tên phim...']").type("Cypress Movie");
  cy.get("input[placeholder='https://example.com/poster.jpg']").type(
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTn6E_I_SFNaf-n63hXFpEncxaBTprBbMcBobqkrZcmpz5Ina3WNznSURV-ChRnnd4R0Sklq2dRASe9C7qoHk_T-frz9wRd4UCjyyOZUvzwPA"
  );
  cy.get("textarea[placeholder*='Mô tả']").type(
    "Đây là phim được thêm bằng Cypress test, có mô tả dài hơn 10 ký tự."
  );
  cy.get("input[type='date']").type("2025-08-16");
  cy.get("select").select("16+");
  cy.get("input#isSeries").check();
  cy.get("input#onGoing").uncheck();

  // Submit form
    cy.contains("button", /^Thêm phim$/).click();

  // Kiểm tra phim mới có trong list
  cy.contains("Cypress Movie", { timeout: 20000 }).should("exist");
});


  it("Chỉnh sửa phim vừa thêm thành công", () => {
    // Tìm phim mới thêm trong danh sách → bấm Sửa
    cy.contains(/Cypress Movie/i).click();

    cy.contains("✏️ Chỉnh sửa").click(); // hoặc icon edit nếu bạn dùng

    // Đổi tên phim
    cy.get("label:contains('Tên phim')")
      .parent()
      .find("input")
      .clear()
      .type("Cypress Movie Updated");

    // Đổi poster
    cy.get("label:contains('URL Poster')")
      .parent()
      .find("input")
      .clear()
      .type("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrvVqEapXsm3wyIBCj0j6GwUMwEpsUElyGSA&s")

    // Đổi ngày phát hành
    cy.get("label:contains('Ngày phát hành')")
      .parent()
      .find("input[type=date]")
      .clear()
      .type("2025-12-31");

    // Đổi mô tả
    cy.get("label:contains('Mô tả')")
      .parent()
      .find("textarea")
      .clear()
      .type("Mô tả đã được cập nhật từ Cypress test.");

    // Đổi độ tuổi xem
      cy.get("select[name=ageRating]").select("16+");


    // Submit
    cy.contains("button", "Sửa phim").click();

    // Verify alert
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Cập nhật phim thành công");
    });

    // Verify phim đã cập nhật hiển thị
    cy.contains("Cypress Movie Updated", { timeout: 10000 }).should("exist");
  });

it("Mở modal thêm mùa", () => {
  cy.contains(/Cypress Movie/i).click();

  // bấm nút mở modal
  cy.contains("Thêm mùa").click();

  // modal hiển thị
  cy.get("div[role='dialog']").should("be.visible");
  cy.get("div[role='dialog']").within(() => {
    cy.contains("Thêm mùa").should("exist"); // nút lưu trong modal
  });
});

it("Thêm mùa mới thành công", () => {
  cy.contains(/Cypress Movie/i).click();

  // mở modal
  cy.contains("Thêm mùa").click();

  cy.get("div[role='dialog']").within(() => {
    // nhập tên tùy chỉnh
    cy.get("input[name='title']").type("Mùa đặc biệt");

    // nhập mô tả
    cy.get("textarea[name='description']").type(
      "Đây là mô tả cho mùa đặc biệt thêm bằng Cypress"
    );

    // nhập ngày phát hành
    cy.get("input[name='releaseDate']").type("2025-08-01");

    cy.contains("button", /^Thêm mùa$/).click();

  });

  // kiểm tra dữ liệu được hiển thị
  cy.contains("Mùa đặc biệt").should("exist");
});

it("Không nhập tên tùy chỉnh thì báo lỗi", () => {
  cy.contains(/Cypress Movie/i).click();

  // mở modal
  cy.contains("Thêm mùa").click();

  cy.get("div[role='dialog']").within(() => {
    // bỏ trống title
    cy.get("input[name='title']").clear();

    cy.contains("button", /^Thêm mùa$/).click();

  });
});

it("Chỉnh sửa mùa", () => {
  cy.contains(/Cypress Movie/i).click();

  // mở modal
  cy.contains("button", /^chỉnh sửa$/).click();

  cy.get("div[role='dialog']").within(() => {
    // nhập tên tùy chỉnh
    cy.get("input[name='title']").type("Mùa chỉnh sửa");

    // nhập mô tả
    cy.get("textarea[name='description']").type(
      "Đây là mô tả được cập cho mùa đặc biệt thêm bằng Cypress"
    );

    // nhập ngày phát hành
    cy.get("input[name='releaseDate']").type("2025-08-02");

    cy.contains("button", /^Xác nhận$/).click();

  });

  // kiểm tra dữ liệu được hiển thị
  cy.contains("Mùa chỉnh sửa").should("exist");
});

 it("Mở modal thêm tập", () => {
    cy.contains(/Cypress Movie/i).click();

    // click nút mở modal
    cy.contains("Thêm tập").click();

    // modal hiển thị
    cy.get("div[role='dialog']").should("be.visible");
    cy.contains("Thêm tập").should("exist");
  });

  it("Nhập dữ liệu hợp lệ và thêm tập", () => {
    cy.contains(/Cypress Movie/i).click();
    cy.contains("Thêm tập").click();

    cy.get("div[role='dialog']").within(() => {
      cy.get("input[name='number']").type("1");
      cy.get("input[name='title']").type("Tập mở đầu");
      cy.get("input[name='url']").type("9dv6SKcvE802QYshxxDNQavhvtBzQVBItmFmTcEa9Xxs");
      cy.get("input[name='duration']").type("1200");
      cy.get("input[name='openingEnd']").type("90");
      cy.get("textarea[name='description']").type(
        "Đây là tập đầu tiên mở màn cho series."
      );
      cy.get("input[name='releaseDate']").type("2025-08-16");

      // bấm xác nhận
      cy.contains("Xác nhận").click();
    });

    // kiểm tra hiển thị trên bảng
    cy.contains("Tập mở đầu").should("exist");
  });

  it("Không nhập số tập thì báo lỗi", () => {
    cy.contains(/Cypress Movie/i).click();
    cy.contains("Thêm tập").click();

    cy.get("div[role='dialog']").within(() => {
      cy.get("input[name='number']").clear();
      cy.contains("Xác nhận").click();
    });

    // kiểm tra báo lỗi hiển thị
    cy.contains("Số tập phim phải là số").should("exist");
  });

  it("Chỉnh sửa tập phim", () => {
    cy.contains(/Cypress Movie/i).click();

    // bấm nút SỬA ở hàng tập
    cy.get("table")
      .contains("tr", "Tập mở đầu")
      .within(() => {
        cy.contains(/^Sửa$/).click();
      });

    // trong modal
    cy.get("div[role='dialog']").within(() => {
      cy.get("input[name='title']").clear().type("Tập chỉnh sửa");
      cy.get("textarea[name='description']").clear().type("Mô tả tập đã được chỉnh sửa bằng Cypress");
      cy.get("input[name='duration']").clear().type("1500");
      cy.contains("button", /^Xác nhận$/).click();
    });

    cy.contains("Tập chỉnh sửa").should("exist");
    cy.contains("1500").should("exist");
  });

    it("Xóa tập phim", () => {
    cy.contains(/Cypress Movie/i).click();
    cy.get("table")
      .contains("tr", "Tập chỉnh sửa")
      .within(() => {
        cy.contains(/^Xóa$/).click();
      });

    // modal xác nhận xóa tập
    cy.get("div[role='dialog']").within(() => {
      cy.contains("Xóa tập").should("exist");
      cy.contains("button", /^Xác nhận$/).click();
    });

    cy.contains("Tập chỉnh sửa").should("not.exist");
  });

    it("Xóa mùa", () => {
    // bấm nút XÓA mùa
    cy.contains(/Cypress Movie/i).click();
    cy.contains(/^Xóa$/).click();

    cy.get("div[role='dialog']").within(() => {
      cy.contains("Xóa mùa").should("exist");
      cy.contains("button", /^Xác nhận$/).click();
    });

    cy.contains("Mùa chỉnh sửa").should("not.exist");
  });

    it("Xóa phim", () => {
    // bấm nút XÓA PHIM
    cy.contains(/Cypress Movie/i).click();
    cy.contains(/^Xóa phim$/).click();

    cy.get("div[role='dialog']").within(() => {
      cy.contains("Xóa phim").should("exist");
      cy.contains("button", /^Xóa phim$/).click();
    });

    cy.contains(/Cypress Movie Updated/i).should("not.exist");
  });
});

