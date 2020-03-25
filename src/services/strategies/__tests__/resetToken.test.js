import { User } from "~models";
import { resetToken } from "~services/strategies/resetToken";
import { missingEmailCreds } from "~messages/errors";

const next = jest.fn();

describe("Reset Password Token Request Middleware", () => {
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

	it("handles empty body requests", async done => {
		const emptybody = {
			email: "",
		};

		const req = mockRequest(null, null, emptybody);

		await resetToken(req, res, next);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ err: missingEmailCreds });
		done();
	});

	it("handles invalid reset password token requests", async done => {
		const emailInvalid = {
			email: "invalidemail@example.com",
		};

		const req = mockRequest(null, null, emailInvalid);

		await resetToken(req, res, next);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ err: missingEmailCreds });
		done();
	});

	it("handles valid reset password token requests", async done => {
		const email = "member2@example.com";
		const currentUser = await User.findOne({ email });

		const req = mockRequest(null, null, { email: currentUser.email });

		await resetToken(req, res, next);

		const updatedUser = await User.findOne({ email });

		expect(currentUser.token).not.toEqual(updatedUser.token);
		expect(req.user).toEqual(currentUser.email);
		expect(next).toHaveBeenCalledTimes(1);
		done();
	});
});
