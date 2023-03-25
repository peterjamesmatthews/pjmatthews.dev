describe("test counter", () => {
	it("counts counter", () => {
		cy.visit("/counter/");
		cy.get("span[id='count']").should("have.text", "0");
		cy.get("button").click();
		cy.get("button").click();
		cy.get("span[id='count']").should("have.text", "2");
		cy.get("button").click();
		cy.get("button").click();
		cy.get("span[id='count']").should("have.text", "4");
	});

	it("counts WebAssembly counter", () => {
		cy.visit("/counter/wasm/");
		cy.get("span[id='count']").should("have.text", "0");
		cy.get("button").click();
		cy.get("span[id='count']").should("have.text", "1");
		cy.get("button").click();
		cy.get("span[id='count']").should("have.text", "2");
		cy.get("button").click();
		cy.get("span[id='count']").should("have.text", "3");
		cy.get("button").click();
		cy.get("span[id='count']").should("have.text", "4");
	});

	it("counts web worker counter", () => {
		cy.visit("/counter/worker/");
		cy.get("span[id='count']").should("have.text", "0");
		cy.get("button").click();
		cy.get("button").click();
		cy.get("span[id='count']").should("have.text", "2");
		cy.get("button").click();
		cy.get("button").click();
		cy.get("span[id='count']").should("have.text", "4");
	});

	it("counts Solid counter", () => {
		cy.visit("/counter/solid/");
		cy.get("span[id='count']").should("have.text", "0");
		cy.get("button").click();
		cy.get("button").click();
		cy.get("span[id='count']").should("have.text", "2");
		cy.get("button").click();
		cy.get("button").click();
		cy.get("span[id='count']").should("have.text", "4");
	});

	it("counts session storage counter", () => {
		cy.visit("/counter/web-storage/");
		cy.get("span[id='session-count']").should("have.text", "0");
		cy.get("button[id='session-counter']").click();
		cy.get("button[id='session-counter']").click();
		cy.get("span[id='session-count']").should("have.text", "2");
		cy.reload();
		cy.get("span[id='session-count']").should("have.text", "2");
		cy.get("button[id='session-resetter']").click();
		cy.get("span[id='session-count']").should("have.text", "0");
		cy.get("button[id='session-counter']").click();
		cy.get("button[id='session-counter']").click();
		cy.get("span[id='session-count']").should("have.text", "2");
		cy.clearAllSessionStorage();
		cy.reload();
		cy.get("span[id='session-count']").should("have.text", "0");
	});

	it("counts local storage counter", () => {
		cy.visit("/counter/web-storage/");
		cy.get("span[id='local-count']").should("have.text", "0");
		cy.get("button[id='local-counter']").click();
		cy.get("button[id='local-counter']").click();
		cy.get("span[id='local-count']").should("have.text", "2");
		cy.reload();
		cy.get("span[id='local-count']").should("have.text", "2");
		cy.get("button[id='local-resetter']").click();
		cy.get("span[id='local-count']").should("have.text", "0");
		cy.get("button[id='local-counter']").click();
		cy.get("button[id='local-counter']").click();
		cy.get("span[id='local-count']").should("have.text", "2");
		cy.clearAllLocalStorage();
		cy.reload();
		cy.get("span[id='local-count']").should("have.text", "0");
	});

	it("counts IndexedDB counter", () => {
		cy.visit("/counter/web-storage/");
		cy.get("span[id='indexeddb-count']").should("have.text", "0");
		cy.get("button[id='indexeddb-counter']").click();
		cy.get("button[id='indexeddb-counter']").click();
		cy.get("span[id='indexeddb-count']").should("have.text", "2");
		cy.get("button[id='indexeddb-resetter']").click();
		cy.get("span[id='indexeddb-count']").should("have.text", "0");
		cy.get("button[id='indexeddb-counter']").click();
		cy.get("button[id='indexeddb-counter']").click();
		cy.get("span[id='indexeddb-count']").should("have.text", "2");
	});
});
