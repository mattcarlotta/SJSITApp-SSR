context("Home Page", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("initially displays a logo and an 'Employee Login' button", () => {
		cy.get(".container")
			.find(".text-wrapper")
			.should("have.length", 2)
			.find("span")
			.should(e => {
				const elements = e.map((_, el) => Cypress.$(el));

				expect(elements[0].text()).to.equal("sharks");
				expect(elements[3].text()).to.equal("ice team");
			});

		cy.get("button")
			.should("have.length", 1)
			.should("have.text", "Employee Login");
	});

	it("changes the home page to have a 'Go To Dashboard' button when logged in", () => {
		cy.request("POST", "/api/signin", {
			email: "carlotta.matt@gmail.com",
			password: "password",
		});

		cy.reload();

		cy.get("button").should("have.text", "Go To Dashboard");
	});
});
