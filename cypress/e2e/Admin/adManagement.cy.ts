/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("Cannot read properties of null")) {
    return false;
  }
});

describe("Admin - Quản lý quảng cáo", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit("/admin/ads");
  });

  it("Hiển thị danh sách đơn vị cung cấp quảng cáo", () => {
    cy.contains("Đơn vị cung cấp quảng cáo").click();

    cy.contains("Thêm mới").should("be.visible");

    cy.get("table").within(() => {
      cy.contains("Tên đơn vị").should("exist");
      cy.contains("Số điện thoại").should("exist");
      cy.contains("email").should("exist");
    });
  });

  it("Hiển thị danh sách quảng cáo", () => {
    cy.contains("Quảng cáo").click();

    cy.get("table").within(() => {
      cy.contains("Link").should("exist");
      cy.contains("Trạng thái").should("exist");
      cy.contains("Chi tiết").should("exist");
    });
  });

  it("Mở modal và thêm đơn vị cung cấp quảng cáo", () => {
    cy.contains("Đơn vị cung cấp quảng cáo").click();

    cy.contains("Thêm mới").click();

    cy.get('[role="dialog"]').should("be.visible");
    cy.contains("Thêm đơn vị cung cấp").should("exist");

    cy.get('input[name="alias"]').type("Công ty ABC");
    cy.get('input[name="phone"]').type("0987654321");
    cy.get('input[name="email"]').type("abc@example.com");

    cy.contains("Xác nhận").click();

    cy.get('[role="dialog"]').should("not.exist");
  });

  it("Thêm quảng cáo mới", () => {
    cy.contains("Quảng cáo").click();
    cy.contains("Thêm quảng cáo").click();
    cy.get('[role="dialog"]').should("be.visible");

    cy.get('[role="dialog"]').contains("Test").click();
    cy.contains("Tiếp tục").click();

    cy.contains("Nhập thông tin").should("exist");
    cy.get('input[name="link"]').type("https://example.com");
    cy.get('input[name="image"]').type("https://example.com/banner.png");

    cy.get("label").contains("Loại quảng cáo").parent().click();
    cy.get("ul[role='listbox']").should("be.visible");
    cy.contains("li", "Banner").click();

    cy.contains("Hoàn tất").click();
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("Mở modal Chi tiết trong tab Đơn vị cung cấp quảng cáo", () => {
    cy.contains("Đơn vị cung cấp quảng cáo").click();
    cy.get("table tbody tr").first().within(() => {
      cy.contains(/^Chi tiết$/i).click();
    });

    cy.get('div[role="dialog"]').should("be.visible").within(() => {
      cy.contains(/tên đơn vị/i).should("exist");
      cy.contains(/email/i).should("exist");
      cy.contains(/số điện thoại/i).should("exist");
    });
  });

  it("Mở modal Chi tiết trong tab Quảng cáo và Ẩn quảng cáo", () => {
    // Mở tab Quảng cáo
    cy.contains("Quảng cáo").click();

    // Mở modal Chi tiết của quảng cáo đầu tiên
    cy.get("table tbody tr").first().within(() => {
      cy.contains(/^Chi tiết$/i).click();
    });

    // Trong modal kiểm tra thông tin
    cy.get('div[role="dialog"]').should("be.visible").within(() => {
      cy.contains(/link quảng cáo/i).should("exist");
      cy.contains(/link ảnh/i).should("exist");
      cy.contains(/loại quảng cáo/i).should("exist");

      // Click nút Ẩn bên trong modal
      cy.contains(/^Tắt quảng cáo$/i).click();
    });

    // Xác nhận ẩn

    // Kiểm tra trạng thái đã ẩn trong bảng
    cy.get("table tbody tr").first().should("contain", "Đã ẩn");
  });
  it("Mở modal Chi tiết trong tab Quảng cáo và Hiện quảng cáo", () => {
    // Mở tab Quảng cáo
    cy.contains("Quảng cáo").click();

    // Mở modal Chi tiết của quảng cáo đầu tiên
    cy.get("table tbody tr").first().within(() => {
      cy.contains(/^Chi tiết$/i).click();
    });

    // Trong modal kiểm tra thông tin
    cy.get('div[role="dialog"]').should("be.visible").within(() => {
      cy.contains(/link quảng cáo/i).should("exist");
      cy.contains(/link ảnh/i).should("exist");
      cy.contains(/loại quảng cáo/i).should("exist");

      // Click nút Ẩn bên trong modal
      cy.contains(/^Hiện quảng cáo$/i).click();
    });

    // Xác nhận ẩn

    // Kiểm tra trạng thái đã ẩn trong bảng
    cy.get("table tbody tr").first().should("contain", "Đang hoạt động");
  });


});
