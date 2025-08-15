describe("Quản lý bình luận", () => {
    beforeEach(() => {
        cy.loginAsAdmin();
        cy.visit("/moderator/all-comments");
    });
    const openFirstCommentModal = () => {
        cy.get("table tbody tr").first().within(() => {
            cy.contains(/^Chi tiết$/i).click();
        });
        cy.get('div[role="dialog"]', { timeout: 10000 })
            .should("be.visible")
            .and("contain.text", "Mục comment");
    };
    it("Kiểm tra bảng hiển thị đầy đủ thông tin", () => {
        cy.get("table thead tr").within(() => {
            cy.contains("#").should("be.visible");
            cy.contains("Tài khoản").should("be.visible");
            cy.contains("Nội dung bình luận").should("be.visible");
            cy.contains("Mục comment").should("be.visible");
            cy.contains("Thời gian").should("be.visible");
            cy.contains("Trạng thái").should("be.visible");
            cy.contains("Hành động").should("be.visible");
        });
        cy.get("table tbody tr").should("have.length.greaterThan", 0);
        cy.get("table tbody tr").first().within(() => {
            cy.get("td").eq(0).should("not.be.empty");
            cy.get("td").eq(1).should("not.be.empty");
            cy.get("td").eq(2).should("not.be.empty");
            cy.get("td").eq(3).should("not.be.empty");
            cy.get("td").eq(4).should("not.be.empty");
            cy.get("td").eq(5).should("not.be.empty");
            cy.get("td").eq(6).within(() => {
                cy.contains(/^Chi tiết$/i).should("exist");
            });
        });
    });
    it("Mở modal Chi tiết và kiểm tra thông tin bình luận", () => {
        openFirstCommentModal();
        cy.get('div[role="dialog"]').within(() => {
            cy.contains(/Mục comment/i).should("exist");
            cy.contains(/Ngày bắt đầu/i).should("exist");
            cy.contains(/Nội dung bình luận/i).should("exist");
        });
        cy.contains(/^Đóng$/i).click();
    });
    it("Ẩn bình luận từ modal và kiểm tra trạng thái", () => {
        cy.get("table tbody tr").first().within(() => {
            cy.get("td").eq(5).invoke("text").then((statusText) => {
                if (statusText.trim() === "Hiện") {
                    cy.contains(/^Chi tiết$/i).click();
                }
                else {
                    cy.log("Bỏ qua test vì trạng thái không phải 'Hiện'");
                    return;
                }
            });
        });
        // Chờ modal hiển thị với timeout dài hơn
        cy.get('div[role="dialog"]', { timeout: 10000 })
            .should("be.visible")
            .within(() => {
            cy.contains(/^Xóa$/i).click();
        });
        // Sau khi xóa, chờ bảng reload
        cy.get("table tbody tr").first({ timeout: 10000 })
            .should("contain", "Ẩn");
    });
});
