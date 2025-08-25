/// <reference types="cypress" />

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("reading 'document'")) {
    return false; // bỏ qua lỗi document null từ chart/lib
  }
});

describe("Admin Dashboard", () => {
  beforeEach(() => {
    cy.loginAsAdmin().then(() => {
      cy.visit("/admin/dashboard");
    });
  });

  it("Sidebar hiển thị đầy đủ mục quản lý", () => {
    cy.get("aside").within(() => {
      cy.contains("Thống kê").should("be.visible");
      cy.contains("Quản lý thể loại").should("be.visible");
      cy.contains("Quản lý phim").should("be.visible");
      cy.contains("Quản lý người dùng").should("be.visible");
      cy.contains("Quản lý VIP").should("be.visible");
      cy.contains("Quản lý quảng cáo").should("be.visible");
    });
  });

  it("Hiển thị thống kê phim hot nhất", () => {
    cy.contains("Thống kê phim hot nhất", { timeout: 10000 }).should("be.visible");

    cy.contains("Thống kê phim hot nhất")
      .parent()
      .find("div", { timeout: 10000 })
      .should("contain.text", "Smurf")
      .and("contain.text", "F1 - The Movie")
      .and("contain.text", "Together");

    // kiểm tra có số lượt like (💜 có thể là icon, nên check container thay vì contains)
    cy.get("div")
      .contains(/💜|lượt thích/i, { timeout: 10000 })
      .should("exist");
  });

  it("Hiển thị biểu đồ Tỉ lệ Free vs Premium", () => {
    cy.contains("Tỉ lệ Free vs Premium", { timeout: 10000 })
      .scrollIntoView()
      .should("be.visible");
    cy.contains("Người dùng miễn phí").should("exist");
    cy.contains("Người dùng premium").should("exist");
    cy.get("svg", { timeout: 10000 }).should("exist");
  });

  it("Hiển thị biểu đồ Thống kê người dùng", () => {
    cy.contains("Thống kê người dùng", { timeout: 10000 })
      .scrollIntoView()
      .should("be.visible");
    cy.contains("Người dùng").should("exist");
    cy.get("svg", { timeout: 10000 }).should("exist");
  });

  it("Hiển thị tổng quan doanh thu", () => {
    cy.contains("Tổng quan doanh thu", { timeout: 10000 })
      .scrollIntoView()
      .should("be.visible");
    cy.contains("Tổng doanh thu").should("exist");
    cy.contains("60.000", { timeout: 10000 }).should("exist"); // kiểm tra số liệu mẫu
  });

  it("Hiển thị tổng số quảng cáo", () => {
    cy.contains("Tổng số quảng cáo", { timeout: 10000 })
      .scrollIntoView()
      .should("be.visible");
    cy.contains("13").should("exist");
  });

  it("Hiển thị biểu đồ Phân bố nội dung", () => {
    cy.contains("Phân bố nội dung", { timeout: 10000 })
      .scrollIntoView()
      .should("be.visible");
    cy.get("svg", { timeout: 10000 }).should("exist");
  });
});
