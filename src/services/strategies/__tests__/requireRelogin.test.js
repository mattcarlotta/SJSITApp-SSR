import { User } from "~models";
import { requireRelogin } from "~services/strategies";

const next = jest.fn();

describe("Require Relogin Authentication Middleware", () => {
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

	it("handles expired loggedin sessions", async done => {
		const req = mockRequest();

		await requireRelogin(req, res, next);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.clearCookie).toHaveBeenCalledWith("SJSITApp", { path: "/" });
		expect(res.json).toHaveBeenCalledWith({ role: "guest" });
		done();
	});

	it("handles suspended loggedin sessions", async done => {
		const existingUser = await User.findOne({
			email: "suspended.employee@example.com",
		});

		const session = {
			user: {
				id: existingUser._id,
			},
		};

		const req = mockRequest(null, session);

		await requireRelogin(req, res, next);
		expect(res.clearCookie).toHaveBeenCalledWith("SJSITApp", { path: "/" });
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({ role: "guest" });
		done();
	});

	it("handles deleted/non-existent member loggedin sessions", async done => {
		const session = {
			user: {
				id: "5d5b5e952871780ef474807d",
			},
		};

		const req = mockRequest(null, session);

		await requireRelogin(req, res, next);
		expect(res.clearCookie).toHaveBeenCalledWith("SJSITApp", { path: "/" });
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({ role: "guest" });
		done();
	});

	it("handles valid loggedin sessions", async done => {
		const existingUser = await User.findOne({
			email: "carlotta.matt@gmail.com",
		});
		const session = {
			user: {
				id: existingUser._id,
			},
		};

		const req = mockRequest(null, session);

		await requireRelogin(req, res, next);
		expect(next).toHaveBeenCalledTimes(1);
		done();
	});
});
