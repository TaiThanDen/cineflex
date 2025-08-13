/// <reference types="cypress" />

describe("Cineflex Landing Page", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.get("button")
        .contains("✕", { timeout: 3000 }) // chờ quảng cáo load
        .click({ multiple: true, force: true }) // đóng tất cả nếu có nhiều
        .should("not.exist");
  });

  it("1. Hiển thị trang landing đúng nội dung", () => {
    cy.contains("Tuyệt đối điện ảnh").should("be.visible");
    cy.contains("Cineflex").should("exist");

    // Scroll xuống để đảm bảo phần tử hiển thị trên màn hình
    cy.contains("Tại sao chọn Cineflex?")
        .scrollIntoView()
        .should("be.visible");

    cy.contains("Câu hỏi thường gặp")
        .scrollIntoView()
        .should("be.visible");
  });


  it("2. Click 'Khám phá Cineflex' chuyển sang trang /home", () => {
    cy.contains("Khám phá Cineflex").click();
    cy.url().should("include", "/home");
  });

  it("3. Mở một câu hỏi FAQ và kiểm tra nội dung", () => {
    cy.contains("Cineflex là gì?").click();
    cy.contains("Cineflex là một nền tảng phát trực tuyến phim toàn cầu").should("be.visible");
  });

  it("4. Kiểm tra có đúng 3 box lợi ích", () => {
    cy.get("h3").contains("Bảo mật hàng đầu").should("exist");
    cy.get("h3").contains("Thanh toán linh hoạt").should("exist");
    cy.get("h3").contains("Nội dung toàn cầu").should("exist");
  });

  it("5. Kiểm tra phần tử video tồn tại", () => {
    cy.get("video").should("exist");
  });
});
