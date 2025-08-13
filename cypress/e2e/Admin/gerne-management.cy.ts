describe("Quản lý thể loại", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit("/admin/genres"); // URL trang quản lý thể loại
  });

  it("Hiển thị danh sách thể loại", () => {
    cy.get("table tbody tr").should("have.length.at.least", 1);
    cy.get("table thead").within(() => {
      cy.contains("#");
      cy.contains("Id");
      cy.contains("Tên");
    });
  });

  // it("Thêm thể loại mới", () => {
  //   const newGenre = "Thể loại test " + Date.now();
  //
  //   // Mở modal thêm
  //   cy.contains(/^THÊM THỂ LOẠI$/i).click();
  //
  //   // Nhập tên thể loại
  //   cy.get('div[role="dialog"]').within(() => {
  //     cy.get('input[name="name"]').type(newGenre);
  //     cy.contains(/^THÊM$/i).click();
  //   });
  //
  //   // Kiểm tra đã thêm thành công
  //   cy.get("table tbody tr").first().should("contain", newGenre);
  // });
});
