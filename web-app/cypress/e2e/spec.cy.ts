describe("counter", () => {
  it("counts", () => {
    cy.visit("/counter");
    cy.get('span[id="count"]').contains(0);
    cy.get('button[id="counter"]').click().click().click();
    cy.get('span[id="count"]').contains(3);
  });

  it("using an astro component counts", () => {
    cy.visit("/counter/component");
    cy.get('span[id="count"]').contains(0);
    cy.get('button[id="counter"]').click().click().click();
    cy.get('span[id="count"]').contains(3);
  });

  it("using an endpoint counts", () => {
    cy.visit("/counter/endpoint");
    cy.get('span[id="count"]').contains(0);
    cy.get('button[id="counter"]').click().click().click();
    cy.get('span[id="count"]').contains(3);
  });

  it("using web assembly counts", () => {
    cy.visit("/counter/wasm");
    cy.get('span[id="count"]').contains(0);
    cy.get('button[id="counter"]').click().click().click();
    cy.get('span[id="count"]').contains(3);
  });

  it("using a worker counts", () => {
    cy.visit("/counter/worker");
    cy.get('span[id="count"]').contains(0);
    cy.get('button[id="counter"]').click().click().click();
    cy.get('span[id="count"]').contains(3);
  });

  it("using solid js counts", () => {
    cy.visit("/counter/solid-js");
    cy.get('span[id="count"]').contains(0);
    cy.get('button[id="counter"]').click().click().click();
    cy.get('span[id="count"]').contains(3);
  });

  it("using session storage counts", () => {
    cy.visit("/counter/web-storage");
    cy.get('span[id="session-count"]').contains(0);
    cy.get('button[id="session-counter"]').click().click().click();
    cy.get('span[id="session-count"]').contains(3);
    cy.get('button[id="session-resetter"]').click();
    cy.get('span[id="session-count"]').contains(0);
  });

  it("using local storage counts", () => {
    cy.visit("/counter/web-storage");
    cy.get('span[id="local-count"]').contains(0);
    cy.get('button[id="local-counter"]').click().click().click();
    cy.get('span[id="local-count"]').contains(3);
    cy.get('button[id="local-resetter"]').click();
    cy.get('span[id="local-count"]').contains(0);
  });

  it("using indexeddb counts", () => {
    cy.visit("/counter/web-storage");
    cy.get('button[id="indexeddb-resetter"]').click();
    cy.get('span[id="indexeddb-count"]').contains(0);
    cy.get('button[id="indexeddb-counter"]').click().click().click();
    cy.get('span[id="indexeddb-count"]').contains(3);
    cy.get('button[id="indexeddb-resetter"]').click();
    cy.get('span[id="indexeddb-count"]').contains(0);
  });
});
