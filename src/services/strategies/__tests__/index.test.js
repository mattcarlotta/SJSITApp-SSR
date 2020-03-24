import {
	localLogin,
	localSignup,
	newPassword,
	requireAuth,
	requireStaffRole,
	resetToken,
	requireRelogin,
} from "~services/strategies";

describe("Default Strategy Services Exports", () => {
	it("exports localLogin", () => {
		expect(localLogin).toBeDefined();
	});

	it("exports localSignup", () => {
		expect(localSignup).toBeDefined();
	});

	it("exports newPassword", () => {
		expect(newPassword).toBeDefined();
	});

	it("exports requireAuth", () => {
		expect(requireAuth).toBeDefined();
	});

	it("exports requireStaffRole", () => {
		expect(requireStaffRole).toBeDefined();
	});

	it("exports resetToken", () => {
		expect(resetToken).toBeDefined();
	});

	it("exports requireRelogin", () => {
		expect(requireRelogin).toBeDefined();
	});
});
