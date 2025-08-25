describe("Bình luận phim", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit("/home"); // Trang home
    // cy.get("button")
    //     .contains("✕", { timeout: 5000 })
    //     .then(($btn) => {
    //       if ($btn.length > 0) {
    //         cy.wrap($btn).click({ multiple: true, force: true });
    //       }
    //     });
  });

  it("Nhập và gửi bình luận", () => {
    // Nhấn Watch Now
    cy.get('button[aria-label="Xem ngay"]').first().click();

    // Đợi load trang chi tiết phim
    cy.url().should("include", "/preview");

    // Chuyển sang tab Bình luận
    cy.contains("Bình luận").click();

    // Nhập nội dung bình luận
    const commentText = "Phim này xem rất hay!";
    cy.get('textarea[placeholder="Viết bình luận..."]')
        .should("be.visible")
        .type(commentText);

    // Nhấn Gửi
    cy.contains("Gửi").click();

    // Kiểm tra bình luận vừa gửi xuất hiện
    cy.contains(commentText).should("be.visible");
  });

  it("Báo cáo bình luận", () => {
    cy.get('button[aria-label="Xem ngay"]').first().click();
    cy.url().should("include", "/preview");
    cy.contains("Bình luận").click();

    // Mở menu của bình luận đầu tiên
    cy.get('button[aria-label="add"]').first().click();

    // Chọn Báo cáo trong menu
    cy.contains("Báo cáo").click();

    // Kiểm tra modal hiện ra
    cy.get('input[name="content"]').should("be.visible");

    const reasonText = "Bình luận vi phạm nội quy.";
    cy.get('input[name="content"]').type(reasonText);

    // Xác nhận báo cáo
  cy.contains("button", "Xác nhận").click();

    // Đảm bảo modal đóng lại
    cy.get('input[name="content"]').should("not.exist");
  });
 
it("Xoá bình luận", () => {
  cy.get('button[aria-label="Xem ngay"]').first().click();
  cy.url().should("include", "/preview");
  cy.contains("Bình luận").click();

  // Mở menu của bình luận đầu tiên
  cy.get('button[aria-label="add"]').first().click();

  // Chọn Xóa trong menu
  cy.contains("button", "Xóa").click();

});
});
