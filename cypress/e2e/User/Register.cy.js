describe('Register Page', () => {
    beforeEach(() => {
        cy.visit('/register');
        // Đóng quảng cáo nếu có nút ✕
        cy.get('button')
            .contains('✕', { timeout: 3000 })
            .then(($btn) => {
            if ($btn.length > 0) {
                cy.wrap($btn).click({ multiple: true, force: true });
            }
        });
    });
    it('Hiển thị đầy đủ các thành phần giao diện', () => {
        cy.contains('ĐĂNG KÝ').should('be.visible');
        cy.get('input[name="username"]').should('exist');
        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="password"]').should('exist');
        cy.get('input[name="passwordConfirm"]').should('exist');
        cy.get('button[type="submit"]').should('contain', 'Đăng ký');
    });
    it('Đăng ký thành công với dữ liệu hợp lệ', () => {
        const email = `test${Date.now()}@example.com`;
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type('Password123!');
        cy.get('input[name="passwordConfirm"]').type('Password123!');
        cy.get('button[type="submit"]').click();
    });
    it('Hiển thị lỗi khi thiếu thông tin bắt buộc', () => {
        cy.get('button[type="submit"]').click();
        cy.contains('Username phải có tối thiểu 5 ký tự').should('exist');
        cy.contains('Email không hợp lệ').should('exist');
        cy.contains('Mật khẩu phải có tối thiểu 8 ký tự').should('exist');
    });
    it('Hiển thị lỗi khi email không hợp lệ', () => {
        cy.get('input[name="email"]').type('abc@gmail');
        cy.get('button[type="submit"]').click();
        cy.contains('Email không hợp lệ').should('exist');
    });
    it('Hiển thị lỗi khi mật khẩu quá yếu', () => {
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="email"]').type(`test${Date.now()}@example.com`);
        cy.get('input[name="password"]').type('123');
        cy.get('input[name="passwordConfirm"]').type('123');
        cy.get('button[type="submit"]').click();
        cy.contains('Mật khẩu phải có tối thiểu 8 ký tự').should('exist');
    });
    it('Hiển thị lỗi khi xác nhận mật khẩu không khớp', () => {
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="email"]').type(`test${Date.now()}@example.com`);
        cy.get('input[name="password"]').type('Password123!');
        cy.get('input[name="passwordConfirm"]').type('Password321!');
        cy.get('button[type="submit"]').click();
        cy.contains('Mật khẩu không trùng khớp').should('exist');
    });
});
