import { User } from "~models";
import { requireAuth } from "~services/strategies";
import { badCredentials, invalidSession } from "~messages/errors";

const next = jest.fn();

describe("Require Authentication Middleware", () => {
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

	it("handles missing login sessions", async done => {
		const req = mockRequest();

		await requireAuth(req, res, next);
		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledWith({
			role: "guest",
			err: badCredentials,
		});
		done();
	});

	it("handles suspended login sessions", async done => {
		const existingUser = await User.findOne({
			email: "suspended.employee@example.com",
		});

		const session = {
			user: {
				id: existingUser._id,
			},
		};

		const req = mockRequest(null, session);

		await requireAuth(req, res, next);
		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledWith({
			role: "guest",
			err: invalidSession,
		});
		done();
	});

	it("handles deleted/non-existent member login sessions", async done => {
		const session = {
			user: {
				id: "5d5b5e952871780ef474807d",
			},
		};

		const req = mockRequest(null, session);

		await requireAuth(req, res, next);
		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledWith({
			role: "guest",
			err: invalidSession,
		});
		done();
	});

	it("handles valid login sessions", async done => {
		const existingUser = await User.findOne({
			email: "carlotta.matt@gmail.com",
		});
		const session = {
			user: {
				id: existingUser._id,
				email: existingUser.email,
			},
		};

		const req = mockRequest(null, session);

		await requireAuth(req, res, next);
		expect(next).toHaveBeenCalledTimes(1);
		done();
	});
});
