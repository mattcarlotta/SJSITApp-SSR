context("Home Page", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("initially should a logo and an 'Employee Login' button", () => {
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

	it("changes the home page to have a 'Go To Dashboard' button", () => {
		cy.get("button").click();

		cy.get("form").find("input").first().type("carlotta.matt@gmail.com");

		cy.get("form").find("input").eq(1).type("password");

		cy.get("form").submit();

		cy.url().should("eq", "http://localhost:3000/employee/dashboard");

		cy.visit("/");

		cy.get("button").should("have.text", "Go To Dashboard");
	});
});
