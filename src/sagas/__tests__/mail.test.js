import Router from "next/router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import app from "~utils/axiosConfig";
import * as actions from "~actions/Mail";
import { resetServerMessage, setServerMessage } from "~actions/Messages";
import * as sagas from "~sagas/Mail";
import * as mocks from "~sagas/__mocks__/sagas.mocks";
import messageReducer from "~reducers/Messages";
import mailReducer from "~reducers/Mail";
import { parseData, parseMessage } from "~utils/parseResponse";
import { selectQuery } from "~utils/selectors";
import toast from "~components/Body/Toast";

const mailId = "0123456789";
const ids = mocks.ids;

describe("Mail Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	describe("Contact Us", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully created a new contact us mail!";
			props = mocks.contactUsMail;
		});

		it("logical flow matches pattern for a create contact us mail request", () => {
			const res = { data: { message } };

			testSaga(sagas.contactUs, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.post, "mail/contact", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.call(Router.push, "/employee/dashboard")
				.next()
				.isDone();
		});

		it("successfully creates a new contact us mail", async () => {
			mockApp.onPost("mail/contact").reply(200, { message });

			return expectSaga(sagas.contactUs, { props })
				.dispatch(actions.contactUs)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to create a new  contact us mail.";
			mockApp.onPost("mail/contact").reply(404, { err });

			return expectSaga(sagas.contactUs, { props })
				.dispatch(actions.contactUs)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Create Mail", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully created a new mail!";
			props = mocks.mailData;
		});

		it("logical flow matches pattern for a create mail request", () => {
			const res = { data: { message } };

			testSaga(sagas.createMail, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.post, "mail/create", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.call(Router.push, "/employee/mail/viewall?page=1")
				.next()
				.isDone();
		});

		it("successfully creates a new mail", async () => {
			mockApp.onPost("mail/create").reply(200, { message });

			return expectSaga(sagas.createMail, { props })
				.dispatch(actions.createMail)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to create a new mail.";
			mockApp.onPost("mail/create").reply(404, { err });

			return expectSaga(sagas.createMail, { props })
				.dispatch(actions.createMail)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Delete Mail", () => {
		it("logical flow matches pattern for delete mail requests", () => {
			const message = "Successfully deleted the email.";
			const res = { data: { message } };

			testSaga(sagas.deleteMail, { mailId })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.delete, `mail/delete/${mailId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(actions.fetchMails())
				.next()
				.isDone();
		});

		it("successfully deletes a mail", async () => {
			const message = "Successfully deleted the email.";
			mockApp.onDelete(`mail/delete/${mailId}`).reply(200, { message });

			return expectSaga(sagas.deleteMail, { mailId })
				.dispatch(actions.deleteMail)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the email.";
			mockApp.onDelete(`mail/delete/${mailId}`).reply(404, { err });

			return expectSaga(sagas.deleteMail, { mailId })
				.dispatch(actions.deleteMail)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Delete Many Mails", () => {
		it("logical flow matches pattern for delete many mails requests", () => {
			const message = "Successfully deleted the mails.";
			const res = { data: { message } };

			testSaga(sagas.deleteManyMails, { ids })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.delete, `mails/delete-many`, { data: { ids } })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(actions.fetchMails())
				.next()
				.isDone();
		});

		it("successfully deletes many mails", async () => {
			const message = "Successfully deleted the mails.";
			mockApp.onDelete(`mails/delete-many`).reply(200, { message });

			return expectSaga(sagas.deleteManyMails, { ids })
				.dispatch(actions.deleteManyMails)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the event.";
			mockApp.onDelete(`mails/delete-many`).reply(404, { err });

			return expectSaga(sagas.deleteManyMails, { ids })
				.dispatch(actions.deleteManyMails)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Mails", () => {
		let mailData;
		let query;
		beforeEach(() => {
			mailData = { mails: mocks.mailsData, totalDocs: 1 };
			query = "?page=1";
		});

		it("logical flow matches pattern for fetch mails requests", () => {
			const res = { mailData };

			testSaga(sagas.fetchMails)
				.next()
				.select(selectQuery)
				.next()
				.call(app.get, `mail/allundefined`)
				.next(res)
				.call(parseData, res)
				.next(res.mailData)
				.put(actions.setMails(res.mailData))
				.next()
				.isDone();
		});

		it("successfully fetches all mails", async () => {
			mockApp.onGet(`mail/all${query}`).reply(200, mailData);

			return expectSaga(sagas.fetchMails)
				.provide([[matchers.select.selector(selectQuery), query]])
				.dispatch(actions.fetchMails)
				.withReducer(mailReducer)
				.hasFinalState({
					data: mocks.mailsData,
					editMail: {},
					isLoading: false,
					totalDocs: 1,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch mails.";
			mockApp.onGet(`mail/all${query}`).reply(404, { err });

			return expectSaga(sagas.fetchMails)
				.provide([[matchers.select.selector(selectQuery), query]])
				.dispatch(actions.fetchMails)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Resend Mail", () => {
		it("logical flow matches pattern for resend mail requests", () => {
			const message = "Successfully resent mail.";
			const res = { data: { message } };

			testSaga(sagas.resendMail, { mailId })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, `mail/resend/${mailId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "info", message: res.data.message })
				.next()
				.put(actions.fetchMails())
				.next()
				.isDone();
		});

		it("successfully resend an mail", async () => {
			const message = "Successfully resent the mail.";
			mockApp.onPut(`mail/resend/${mailId}`).reply(200, { message });

			return expectSaga(sagas.resendMail, { mailId })
				.dispatch(actions.resendMail)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to resend the mail.";
			mockApp.onPut(`mail/resend/${mailId}`).reply(404, { err });

			return expectSaga(sagas.resendMail, { mailId })
				.dispatch(actions.resendMail)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Update Mail", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the email!";
			props = mocks.mailsData;
		});

		it("logical flow matches pattern for update mail requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateMail, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, "mail/update", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.call(Router.back)
				.next()
				.isDone();
		});

		it("successfully updates an mail", async () => {
			mockApp.onPut("mail/update").reply(200, { message });

			return expectSaga(sagas.updateMail, { props })
				.dispatch(actions.updateMail)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to update the email.";
			mockApp.onPut("mail/update").reply(404, { err });

			return expectSaga(sagas.updateMail, { props })
				.dispatch(actions.updateMail)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});
});
