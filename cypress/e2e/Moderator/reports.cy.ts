describe("Tố cáo bình luận", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit("/moderator/reports");
  });

  const openFirstReportModal = () => {
    cy.get("table tbody tr").first().within(() => {
      cy.contains(/^Chi tiết$/i).click();
    });

    // Chờ modal hiển thị
    cy.get('div[role="dialog"]', { timeout: 10000 })
        .should("be.visible")
        .and("contain.text", "Comment");
  };

  it("Kiểm tra bảng hiển thị đầy đủ thông tin", () => {
    cy.get("table thead tr").within(() => {
      cy.contains("#").should("be.visible");
      cy.contains("Tài khoản bình luận").should("be.visible");
      cy.contains("Nội dung bình luận").should("be.visible");
      cy.contains("Thời gian").should("be.visible");
      cy.contains("Trạng thái").should("be.visible");
    });

    cy.get("table tbody tr").should("have.length.greaterThan", 0);

    cy.get("table tbody tr").first().within(() => {
      cy.get("td").eq(0).invoke("text").should("match", /\S+/);
      cy.get("td").eq(1).invoke("text").should("match", /\S+/);
      cy.get("td").eq(2).invoke("text").should("match", /\S+/);
      cy.get("td").eq(3).invoke("text").should("match", /\S+/);
      cy.get("td").eq(4).invoke("text").should("match", /\S+/);
      cy.get("td").eq(5).within(() => {
        cy.contains(/^Chi tiết$/i).should("exist");
      });
    });
  });

  it("Mở modal Chi tiết và kiểm tra thông tin", () => {
    openFirstReportModal();

    cy.get('div[role="dialog"]').within(() => {
      cy.contains(/Nội dung comment/i).should("exist");
      cy.contains(/Nội dung:/i).should("exist");
      cy.contains(/Người comment:/i).should("exist");
      cy.contains(/Người report:/i).should("exist");
      cy.contains(/Ngày khởi tạo:/i).should("exist");
      cy.contains(/Trạng thái:/i).should("exist");
    });

    cy.contains(/^Đóng$/i).click();
  });

  it("Bỏ qua báo cáo từ modal và kiểm tra trạng thái", () => {
    cy.get("table tbody tr").first().within(() => {
      cy.get("td").eq(4).invoke("text").then((statusText) => {
        if (statusText.trim() === "Chưa xử lý") {
          cy.contains(/^Chi tiết$/i).click();
          cy.get('div[role="dialog"]').within(() => {
            cy.contains(/^Bỏ qua$/i).click();
          });
          cy.get("table tbody tr").first().should("contain", "Đã bỏ qua");
        } else {
          cy.log("Bỏ qua test vì trạng thái không phải Chưa xử lý");
        }
      });
    });
  });

  it("Xóa bình luận từ modal và kiểm tra trạng thái", () => {
    cy.get("table tbody tr").first().within(() => {
      cy.get("td").eq(4).invoke("text").then((statusText) => {
        if (statusText.trim() === "Chưa xử lý") {
          cy.contains(/^Chi tiết$/i).click();
          cy.get('div[role="dialog"]').within(() => {
            cy.contains(/^Xóa$/i).click();
          });
          cy.get("table tbody tr").first().should("contain", "Đã xóa comment");
        } else {
          cy.log("Bỏ qua test vì trạng thái không phải Chưa xử lý");
        }
      });
    });
  });

});
