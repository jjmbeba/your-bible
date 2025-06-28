describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  }),
  it("should load the home page", () => {
    cy.title().should("eq", "Your Bible");

    cy.get("[data-testid='hero-title']").should("have.text", "Your Bible");
    cy.get("[data-testid='home-page-description']").should("have.text", "A modern, feature-rich Bible application for reading, studying, and exploring scripture with AI-powered insights.");
  }),
  it("should display hero buttons and navigate to the correct page", () => {
    cy.get("button[name='start-reading']").should("have.text", "Start Reading");
    cy.get("button[name='search-scriptures']").should("have.text", "Search Scriptures");

    cy.get("button[name='start-reading']").click();
    cy.url().should("include", "/bible");

    cy.visit("/");
    cy.get("button[name='search-scriptures']").click();
    cy.url().should("include", "/search");
  }),
  it("should display the app features", () => {

    cy.get("[data-testid='home-page-features-title']").should("have.text", "Everything you need for Bible study");
    cy.get("[data-testid='home-page-features-description']").should("have.text", "Powerful tools to enhance your spiritual journey and deepen your understanding of scripture.");
    cy.get("[data-testid='home-page-feature-read']").should("have.text", "Bible Reading");
    cy.get("[data-testid='home-page-feature-search']").should("have.text", "Advanced Search");
    cy.get("[data-testid='home-page-feature-collections']").should("have.text", "Personal Collections");
    cy.get("[data-testid='home-page-feature-stories']").should("have.text", "AI Story Generation");
  }),
  it("should navigate to the correct page when clicking on a feature", () => {
    cy.get("[data-testid='home-page-feature-read']").click();
    cy.url().should("include", "/bible");

    cy.visit("/");
    cy.get("[data-testid='home-page-feature-search']").click();
    cy.url().should("include", "/search");

    cy.visit("/");
    cy.get("[data-testid='home-page-feature-collections']").click();
    cy.url().should((url) => {
      expect(url).to.satisfy((url: string) => 
        url.includes("/collections") || url.includes("/sign-in")
      );
    });

    cy.visit("/");
    cy.get("[data-testid='home-page-feature-stories']").click();
    cy.url().should((url) => {
      expect(url).to.satisfy((url: string) => 
        url.includes("/stories") || url.includes("/sign-in")
      );
    });
    
  }),
  it("should display quick actions", () => {

    cy.get("[data-testid='home-page-quick-actions-title']").should("have.text", "Get started quickly");
    cy.get("[data-testid='home-page-quick-actions-description']").should("have.text", "Choose your path and begin your Bible study journey today.");

    cy.get("[data-testid='home-page-quick-action-start-reading']").should("have.text", "Start Reading");
    cy.get("[data-testid='home-page-quick-action-take-notes']").should("have.text", "Take Notes");
    cy.get("[data-testid='home-page-quick-action-generate-stories']").should("have.text", "Generate Stories");  
  }),
  it("should navigate to the correct page when clicking on a quick action", () => {
    cy.get("[data-testid='home-page-quick-action-start-reading']").click();
    cy.url().should("include", "/bible");

    cy.visit("/");
    cy.get("[data-testid='home-page-quick-action-take-notes']").click();
    cy.url().should("include", "/bible");

    cy.visit('/')
    cy.get("[data-testid='home-page-quick-action-generate-stories']").click();
    cy.url().should((url) => {
      expect(url).to.satisfy((url: string) => 
        url.includes("/stories") || url.includes("/sign-in")
      );
    });
  }),
  it("should display cta buttons and navigate to the correct page", () => {

    cy.get("[data-testid='home-page-cta-title']").should("have.text", "Ready to dive deeper?");
    cy.get("[data-testid='home-page-cta-description']").should("have.text", "Create an account to save your collections, notes, and generated stories.");
    cy.get("[data-testid='home-page-cta-sign-in']").should("have.text", "Sign In");
    cy.get("[data-testid='home-page-cta-start-reading']").should("have.text", "Start Reading Now");

    cy.get("[data-testid='home-page-cta-sign-in']").click();
    cy.url().should("include", "/sign-in");

    cy.visit('/')
    cy.get("[data-testid='home-page-cta-start-reading']").click();
    cy.url().should("include", "/bible");
  })
});