jest.mock("next/router", () => ({
	...require.requireActual("next/router"),
	default: {
		...require.requireActual("next/router").default,
		back: jest.fn(),
		push: jest.fn(),
		replace: jest.fn(),
	},
}));

module.exports = require.requireMock("next/router");
