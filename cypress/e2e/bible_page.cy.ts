describe('Bible Page', () => {
    beforeEach(() => {
        cy.visit("/bible");
    })

    it("should load the bible page", () => {
        cy.url().should("include", "/bible");
        
        cy.get("[data-testid='bible-page-select-bible-and-chapter']").should("have.text", "Select a Bible and Chapter to view the content");
    }),

    it("should display the bible, book and chapter selector", () => {
        cy.get("[data-testid='bible-selector']").should("be.visible");

        cy.get("[data-testid='bible-dropdown-book-trigger']").should("be.visible");
        cy.get("[data-testid='bible-dropdown-chapter-trigger']").should("be.visible");
    }),

    it("should disable the book and chapter selector when the bible is not selected", () => {
        cy.get("[data-testid='bible-dropdown-book-trigger']").should("be.disabled");
        cy.get("[data-testid='bible-dropdown-chapter-trigger']").should("be.disabled");
    }),

    it("should select a bible and chapter from the popover & display the content", () => {
        cy.get("[data-testid='bible-selector']").click();
        
        cy.get("[role='combobox']").should("be.visible");
        
        cy.get("[data-slot='command-item']").first().click();
        
        cy.get("[data-testid='bible-selector']").should("not.have.text", "Select bible");
        
        cy.get("[data-testid='bible-dropdown-book-trigger']").should("not.be.disabled");

        cy.get("[data-testid='bible-dropdown-chapter-trigger']").should("be.disabled");

        cy.get("[data-testid='bible-dropdown-book-trigger']").click();

        cy.get("[data-slot='select-item']").first().click();

        cy.get("[data-testid='bible-page-content']").should("be.visible");
    })
})