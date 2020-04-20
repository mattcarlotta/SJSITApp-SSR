context("Staff Dashboard Page", () => {
	beforeEach(() => {
		cy.request("POST", "/api/signin", {
			email: "carlotta.matt@gmail.com",
			password: "password",
		});
		cy.reload();
		cy.visit("/employee/dashboard");
	});

	it("displays an employee list of availabilites", () => {
		cy.get("[data-test=employee-avail-list]")
			.should("have.length", 1)
			.find("li")
			.first()
			.contains("Matthew Carlotta");
	});
});
