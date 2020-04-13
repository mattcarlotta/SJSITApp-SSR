import { localSignup } from "~services/strategies/localSignup";
import {
	expiredToken,
	invalidSignupEmail,
	invalidToken,
	missingSignupCreds,
	tokenAlreadyUsed,
	usernameAlreadyTaken,
} from "~messages/errors";
import { createSignupToken } from "~utils/helpers";
import moment from "~utils/momentWithTZ";
import { Season, Token } from "~models";

const next = jest.fn();

const newSeason = {
	seasonId: "20402041",
	startDate: new Date(2040, 9, 6),
	endDate: new Date(2041, 7, 6),
};

const newHire = {
	authorizedEmail: "signuptoken@example.com",
	role: "employee",
	seasonId: "20402041",
	token: createSignupToken(),
	expiration: new Date(2080, 10, 6),
};

describe("Local Signup Middleware", () => {
	let res;
	beforeEach(async () => {
		res = mockResponse();
	});

	afterEach(() => {
		next.mockClear();
	});

	let db;
	let signupToken;
	beforeAll(async () => {
		db = connectDatabase();
		await Season.create(newSeason);
		await Token.create(newHire);
		signupToken = await Token.findOne({
			authorizedEmail: newHire.authorizedEmail,
		});
	});

	afterAll(async () => {
		await db.close();
	});

	it("handles empty body requests", async done => {
		const emptybody = {
			email: "",
			firstName: "",
			lastName: "",
			password: "",
			token: "",
		};

		const req = mockRequest(null, {}, emptybody);

		await localSignup(req, res, next);

		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledWith({ err: missingSignupCreds });
		done();
	});

	it("handles invalid tokens", async done => {
		const invalidSignupToken = {
			email: "newsignup@test.com",
			firstName: "New",
			lastName: "Signup",
			password: "password",
			token: "invalidtoken",
		};

		const req = mockRequest(null, {}, invalidSignupToken);

		await localSignup(req, res, next);

		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledWith({ err: invalidToken });
		done();
	});

	it("handles invalid emails with valid tokens", async done => {
		const invalidEmailWithValidToken = {
			email: "invalidemail@test.com",
			firstName: "New",
			lastName: "Signup",
			password: "password",
			token: signupToken.token,
		};

		const req = mockRequest(null, {}, invalidEmailWithValidToken);

		await localSignup(req, res, next);

		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledWith({ err: invalidSignupEmail });
		done();
	});

	it("handles tokens that have already been used", async done => {
		const usedMemberToken = await Token.findOne({
			email: "member@example.com",
		});

		const usedToken = {
			email: "member@example.com",
			firstName: "New",
			lastName: "Signup",
			password: "password",
			token: usedMemberToken.token,
		};

		const req = mockRequest(null, {}, usedToken);

		await localSignup(req, res, next);

		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledWith({ err: tokenAlreadyUsed });
		done();
	});

	it("handles expired token signup requests", async done => {
		const expiredHire = {
			authorizedEmail: "expiredmember@example.com",
			email: "",
			role: "member",
			seasonId: "20402041",
			token: createSignupToken(),
			expiration: moment(Date.now()).subtract(90, "days").endOf("day").toDate(),
		};

		const expiredSignup = await Token.create(expiredHire);

		const expiredHireUpdate = {
			email: "expiredmember@example.com",
			firstName: "Expired",
			lastName: "Member",
			role: "member",
			password: "password",
			token: expiredSignup.token,
		};

		const req = mockRequest({}, {}, expiredHireUpdate);

		await localSignup(req, res, next);

		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledWith({ err: expiredToken });
		done();
	});

	it("handles invalid first and last name requests", async done => {
		const invalidUsernameSignup = {
			email: "signuptoken@example.com",
			firstName: "Matt",
			lastName: "Carlotta",
			password: "password",
			token: signupToken.token,
		};

		const req = mockRequest({}, {}, invalidUsernameSignup);

		await localSignup(req, res, next);

		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledWith({
			err: usernameAlreadyTaken,
		});
		done();
	});

	it("handles valid signup requests", async done => {
		const newUserSignup = {
			email: "signuptoken@example.com",
			firstName: "New",
			lastName: "Signup",
			password: "password",
			token: signupToken.token,
		};

		const req = mockRequest({}, {}, newUserSignup);

		await localSignup(req, res, next);

		expect(req.user).toEqual(
			expect.objectContaining({
				email: expect.any(String),
				firstName: expect.any(String),
				lastName: expect.any(String),
			}),
		);
		expect(next).toHaveBeenCalledTimes(1);
		done();
	});
});
