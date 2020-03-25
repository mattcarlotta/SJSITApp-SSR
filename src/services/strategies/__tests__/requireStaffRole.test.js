import { User } from "~models";
import { requireStaffRole } from "~services/strategies";
import { accessDenied, badCredentials } from "~messages/errors";

const next = jest.fn();

describe("Require Staff Role Authentication Middleware", () => {
	let res;
	beforeEach(() => {
		res = mockResponse();
	});

	let db;
	beforeAll(() => {
		db = connectDatabase();
	});

	afterAll(async () => {
		await db.close();
	});

	it("handles invalid requests requiring staff privileges", async done => {
		const req = mockRequest();

		await requireStaffRole(req, res, next);

		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledWith({ err: accessDenied });
		done();
	});

	it("handles suspended staff authenticated sessions", async done => {
		const existingUser = await User.findOne({
			email: "suspended.employee@example.com",
		});

		const session = {
			user: {
				id: existingUser._id,
				role: "staff",
			},
		};

		const req = mockRequest(null, session);

		await requireStaffRole(req, res, next);
		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledWith({ err: badCredentials });
		done();
	});

	it("handles deleted/non-existent staff authenticated sessions", async done => {
		const session = {
			user: {
				id: "5d5b5e952871780ef474807d",
				role: "staff",
			},
		};

		const req = mockRequest(null, session);

		await requireStaffRole(req, res, next);
		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledWith({ err: badCredentials });
		done();
	});

	it("handles valid requests requiring staff privileges", async done => {
		const existingUser = await User.findOne({
			email: "carlotta.matt@gmail.com",
		});
		const session = {
			user: {
				id: existingUser._id,
				role: existingUser.role,
			},
		};

		const req = mockRequest(null, session);

		await requireStaffRole(req, res, next);
		expect(next).toHaveBeenCalledTimes(1);
		done();
	});
});
