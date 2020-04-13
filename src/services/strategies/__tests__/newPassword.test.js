import { updatePassword } from "~services/strategies/newPassword";
import {
	emptyPassword,
	invalidToken,
	notUniquePassword,
} from "~messages/errors";
import { User } from "~models";

const next = jest.fn();

describe("New Password Request Middleware", () => {
	let res;
	beforeEach(() => {
		res = mockResponse();
	});

	let db;
	let currentUser;
	beforeAll(async () => {
		db = connectDatabase();
		currentUser = await User.findOne({ email: "member3@example.com" });
	});

	afterAll(async () => {
		await db.close();
	});

	it("handles empty token requests", async done => {
		const emptyToken = {
			password: "newpassword",
			token: "",
		};

		const req = mockRequest(null, null, emptyToken);

		await updatePassword(req, res, next);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ err: invalidToken });
		done();
	});

	it("handles missing password token requests", async done => {
		const missingPassword = {
			password: "",
			token: "12345",
		};

		const req = mockRequest(null, null, missingPassword);

		await updatePassword(req, res, next);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ err: emptyPassword });
		done();
	});

	it("handles invalid token requests", async done => {
		const invalidTokenRequest = {
			password: "newpassword",
			token: "12345",
		};

		const req = mockRequest(null, null, invalidTokenRequest);

		await updatePassword(req, res, next);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ err: invalidToken });
		done();
	});

	it("handles same password update requests", async done => {
		const samePassword = {
			password: "password",
			token: currentUser.token,
		};

		const req = mockRequest(null, null, samePassword);

		await updatePassword(req, res, next);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ err: notUniquePassword });
		done();
	});

	it("handles valid password update requests", async done => {
		const updatePasswordRequest = {
			password: "newpassword",
			token: currentUser.token,
		};

		const req = mockRequest(null, null, updatePasswordRequest);

		await updatePassword(req, res, next);

		const updatedUser = await User.findOne({ email: currentUser.email });

		expect(currentUser.password).not.toEqual(updatedUser.password);
		expect(req.user).toEqual(currentUser.email);
		expect(next).toHaveBeenCalledTimes(1);
		done();
	});
});
