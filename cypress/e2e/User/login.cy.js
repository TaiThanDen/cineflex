describe("Đăng nhập", () => {
    beforeEach(() => {
        cy.visit("/login");
        // Đóng quảng cáo nếu có nút ✕
        cy.get("button")
            .contains("✕", { timeout: 5000 })
            .then(($btn) => {
            if ($btn.length > 0) {
                cy.wrap($btn).click({ multiple: true, force: true });
            }
        });
    });
    it("Đăng nhập thành công với thông tin hợp lệ", () => {
        cy.get('input[type="email"]').type("tuanhhhts00576@fpt.edu.vn");
        cy.get('input[type="password"]').type("admin123456");
        cy.contains("Đăng nhập").click();
        // Kiểm tra điều hướng đúng trang chủ
        cy.url().should("include", "/home");
        // Kiểm tra thông báo
        cy.contains("Chào mừng quay trở lại!", { timeout: 8000 }).should("exist");
    });
    it("Hiển thị lỗi khi nhập sai mật khẩu", () => {
        cy.get('input[type="email"]').type("tuanhhhts00576@fpt.edu.vn");
        cy.get('input[type="password"]').type("sai_password");
        cy.contains("Đăng nhập").click();
        // Kiểm tra hiển thị lỗi
        cy.contains("Email hoặc mật khẩu không hợp lệ", { timeout: 5000 }).should("exist");
    });
    it("Đăng xuất thành công", () => {
        // Đăng nhập trước
        cy.get('input[type="email"]').type("tuanhhhts00576@fpt.edu.vn");
        cy.get('input[type="password"]').type("admin123456");
        cy.contains("Đăng nhập").click();
        // Kiểm tra đã vào trang chủ
        cy.url().should("include", "/home");
        // Vào trang profile
        cy.visit("/profile");
        // Click nút Đăng xuất
        cy.contains("Đăng xuất").click();
        // Kiểm tra đã bị chuyển hướng về trang đăng nhập (hoặc trạng thái logout)
        cy.url().should("include", "/login");
        // Kiểm tra không còn hiển thị thông tin người dùng (nếu có)
        cy.contains("Đăng nhập").should("exist");
    });
});
