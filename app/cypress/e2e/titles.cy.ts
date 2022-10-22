describe("shows correct title", () => {
  it("on home page", () => {
    cy.visit("/");
    cy.title().should("equal", "Peter Matthews");
  });
  it("on projects page", () => {
    cy.visit("/prj");
    cy.title().should("equal", "Projects");
  });
  it("on about page", () => {
    cy.visit("/abt");
    cy.title().should("equal", "About Me");
  });
});
