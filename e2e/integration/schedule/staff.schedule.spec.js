context("Staff Dashboard Page", () => {
	beforeEach(() => {
		cy.request("POST", "/api/signin", {
			email: "carlotta.matt@gmail.com",
			password: "password",
		});
		cy.reload();
		cy.visit("/employee/schedule");
	});

	it("displays a calendar", () => {
		cy.get(".ant-fullcalendar-table").should("have.length", 1);

		cy.get("[data-test=upcoming-event").should("have.length", 2);
	});

	it("displays 3 select buttons", () => {
		cy.get(".ant-select").should("have.length", 3).first().click();

		cy.get(".ant-select-dropdown-menu-item")
			.should("have.length", 1)
			.and("have.text", "All Games");
	});
});
