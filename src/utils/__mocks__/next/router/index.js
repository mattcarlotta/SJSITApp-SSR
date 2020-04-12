jest.mock("next/router", () => ({
	...require.requireActual("next/router"),
	default: {
		...require.requireActual("next/router").default,
		push: jest.fn(),
		replace: jest.fn(),
	},
}));

module.exports = require.requireMock("next/router");
