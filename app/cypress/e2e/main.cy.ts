describe("Home", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("shows correct title", () => {
    cy.title().should("equal", "Peter Matthews");
  });
});
