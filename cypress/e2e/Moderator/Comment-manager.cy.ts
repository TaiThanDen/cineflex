/// <reference types="cypress" />

describe("Tố cáo bình luận - Sections", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit("/moderator/sections");
  });

  const openSectionByTitle = (titleText) => {
    // Tìm dòng chứa 'Show: CHẠY ĐI CHỜ CHI' và click Xem thêm
    cy.get("table tbody tr").contains(new RegExp(`Show:\\s*${titleText}`, "i"))
        .parents("tr")
        .within(() => {
          cy.contains(/^Xem thêm$/i).click();
        });

    // Đảm bảo đã vào trang danh sách bình luận
    cy.url().should("match", /\/moderator\/sections\/[a-z0-9-]+/i);
  };

  const openCommentModalFromSection = () => {
    // Click "CHI TIẾT" ở bình luận đầu tiên
    cy.get("table tbody tr").first().within(() => {
      cy.contains(/^CHI TIẾT$/i).click();
    });

    // Chờ modal hiện
    cy.get('div[role="dialog"]', { timeout: 10000 })
        .should("be.visible")
        .and("contain.text", "Comment");
  };

  it("Kiểm tra bảng tố cáo hiển thị đầy đủ thông tin", () => {
    cy.get("table thead tr").within(() => {
      cy.contains("#").should("be.visible");
      cy.contains("Id").should("be.visible");
      cy.contains("Tên gợi nhớ").should("be.visible");
    });

    cy.get("table tbody tr").should("have.length.greaterThan", 0);

    cy.get("table tbody tr").first().within(() => {
      cy.get("td").eq(0).invoke("text").should("match", /\S+/);
      cy.get("td").eq(1).invoke("text").should("match", /\S+/);
      cy.get("td").eq(2).invoke("text").should("match", /\S+/);
      cy.contains(/^Xem thêm$/i).should("exist");
    });
  });

  it("Kiểm tra bảng tất cả bình luận hiển thị đầy đủ", () => {
    openSectionByTitle("CHẠY ĐI CHỜ CHI");
    // Hoặc scroll trực tiếp đến bảng
    cy.get("table thead tr").scrollIntoView();
    cy.get("table thead tr").within(() => {
      cy.contains("#").should("be.visible");
      cy.contains("Tài khoản").should("be.visible");
      cy.contains("Nội dung bình luận").should("be.visible");
      cy.contains("Mục comment").should("be.visible");
      cy.contains("Thời gian").should("be.visible");
      cy.contains("Trạng thái").should("be.visible");
    });

    cy.get("table tbody tr").should("have.length.greaterThan", 0);
  });

  it("Mở modal Chi tiết bình luận của show CHẠY ĐI CHỜ CHI và kiểm tra thông tin", () => {
    openSectionByTitle("CHẠY ĐI CHỜ CHI");
    openCommentModalFromSection();

    cy.get('div[role="dialog"]').within(() => {
      cy.contains(/Mục comment/i).should("exist");
      cy.contains(/Người dùng comment/i).should("exist");
      cy.contains(/Ngày bắt đầu/i).should("exist");
      cy.contains(/Nội dung bình luận/i).should("exist");
    });

    cy.contains(/^Đóng$/i).click();
  });

  // it("Xóa bình luận từ modal và kiểm tra", () => {
  //   openSectionByTitle("CHẠY ĐI CHỜ CHI");
  //   openCommentModalFromSection();
  //
  //   cy.get('div[role="dialog"]').within(() => {
  //     cy.contains(/^XÓA$/i).click();
  //   });
  //
  //   // Sau khi xóa, bình luận đầu tiên không nên còn hiện trạng thái 'Hiện'
  //   cy.get("table tbody tr").first().should("not.contain", "Hiện");
  // });
});
