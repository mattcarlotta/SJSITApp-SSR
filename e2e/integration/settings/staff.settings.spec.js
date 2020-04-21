context("Staff Settings Page", () => {
	beforeEach(() => {
		cy.request("POST", "/api/signin", {
			email: "staffmember@example.com",
			password: "password",
		});
		cy.reload();
		cy.visit("/employee/settings");
	});

	it("intially displays the profile tab", () => {
		cy.get(".ant-tabs-tab-active").should("have.text", "Profile");
	});

	it("displays 2 disabled tabs", () => {
		cy.get(".ant-tabs-tab-disabled").should("have.length", 2);
	});
});
