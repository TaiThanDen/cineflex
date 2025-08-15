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
        cy.contains(/test/i).should("exist");
        cy.contains(/lupin the 3rd/i).should("exist");
        cy.contains(/clevatess/i).should("exist");
    });
    it("Click vào một phim để xem chi tiết", () => {
        cy.contains(/clevatess/i).click();
        // ✅ URL đúng
        cy.url().should("include", "/admin/movies/");
        // ✅ Mùa 1 và mô tả phim
        cy.contains(/mùa 1/i, { timeout: 10000 })
            .scrollIntoView();
        cy.contains(/clevatess là chúa tể/i).should("exist");
        // ✅ Bảng tập phim
        cy.get("table").should("exist");
        cy.get("table tbody tr").should("have.length.at.least", 1);
    });
    it("Hiển thị danh sách tập phim", () => {
        cy.contains(/clevatess/i).click();
        cy.get("table").should("exist");
        cy.contains(/năng lực của chúa tể bóng tối/i).should("exist");
        cy.contains(/chúa tể của bóng tối/i).should("exist");
        cy.contains("24").should("exist"); // thời lượng
    });
    it("Có nút thêm, xoá, chỉnh sửa phim và tập", () => {
        cy.contains(/clevatess/i).click();
        // Các nút điều khiển (dùng regex để tránh lỗi chữ hoa/thường)
        cy.contains(/thêm mùa/i, { timeout: 10000 }).should("exist");
        cy.contains(/thêm tập/i).should("exist");
        cy.get("table tbody tr").first().within(() => {
            cy.contains(/sửa/i).should("exist");
            cy.contains(/xóa/i).should("exist");
        });
        cy.contains(/chỉnh sửa/i).should("exist");
    });
});
