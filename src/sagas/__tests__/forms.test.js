import Router from "next/router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import app from "~utils/axiosConfig";
import * as actions from "~actions/Forms";
import { resetServerMessage, setServerMessage } from "~actions/Messages";
import * as sagas from "~sagas/Forms";
import * as mocks from "~sagas/__mocks__/sagas.mocks";
import messageReducer from "~reducers/Messages";
import formReducer from "~reducers/Forms";
import { parseData, parseMessage } from "~utils/parseResponse";
import { selectQuery } from "~utils/selectors";
import toast from "~components/Body/Toast";

const formId = "0123456789";
const ids = mocks.ids;

describe("Form Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	describe("Create Form", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully created a new form!";
			props = mocks.formData;
		});

		it("logical flow matches pattern for a create form request", () => {
			const res = { data: { message } };

			testSaga(sagas.createForm, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.post, "form/create", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.call(Router.push, "/employee/forms/viewall?page=1")
				.next()
				.isDone();
		});

		it("successfully creates a new form", async () => {
			mockApp.onPost("form/create").reply(200, { message });

			return expectSaga(sagas.createForm, { props })
				.dispatch(actions.createForm)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to create a new form.";
			mockApp.onPost("form/create").reply(404, { err });

			return expectSaga(sagas.createForm, { props })
				.dispatch(actions.createForm)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Delete Form", () => {
		it("logical flow matches pattern for delete form requests", () => {
			const message = "Successfully deleted form.";
			const res = { data: { message } };

			testSaga(sagas.deleteForm, { formId })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.delete, `form/delete/${formId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(actions.fetchForms())
				.next()
				.isDone();
		});

		it("successfully deletes a form", async () => {
			const message = "Successfully deleted the form.";
			mockApp.onDelete(`form/delete/${formId}`).reply(200, { message });

			return expectSaga(sagas.deleteForm, { formId })
				.dispatch(actions.deleteForm)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the form.";
			mockApp.onDelete(`form/delete/${formId}`).reply(404, { err });

			return expectSaga(sagas.deleteForm, { formId })
				.dispatch(actions.deleteForm)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Delete Many Forms", () => {
		it("logical flow matches pattern for delete many forms requests", () => {
			const message = "Successfully deleted forms.";
			const res = { data: { message } };

			testSaga(sagas.deleteManyForms, { ids })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.delete, `forms/delete-many`, { data: { ids } })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(actions.fetchForms())
				.next()
				.isDone();
		});

		it("successfully deletes many forms", async () => {
			const message = "Successfully deleted the forms.";
			mockApp.onDelete(`forms/delete-many`).reply(200, { message });

			return expectSaga(sagas.deleteManyForms, { ids })
				.dispatch(actions.deleteManyForms)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the event.";
			mockApp.onDelete(`forms/delete-many`).reply(404, { err });

			return expectSaga(sagas.deleteManyForms, { ids })
				.dispatch(actions.deleteManyForms)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Forms", () => {
		let data;
		let query;
		beforeEach(() => {
			data = { forms: mocks.formsData, totalDocs: 1 };
			query = "?page=1";
		});

		it("logical flow matches pattern for fetch forms requests", () => {
			const res = { data };

			testSaga(sagas.fetchForms, { formId })
				.next()
				.select(selectQuery)
				.next()
				.call(app.get, `forms/allundefined`)
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setForms(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches all forms", async () => {
			mockApp.onGet(`forms/all${query}`).reply(200, data);

			return expectSaga(sagas.fetchForms)
				.provide([[matchers.select.selector(selectQuery), query]])
				.dispatch(actions.fetchForms)
				.withReducer(formReducer)
				.hasFinalState({
					data: mocks.formsData,
					isLoading: false,
					totalDocs: 1,
					editForm: {},
					events: [],
					viewForm: {},
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch forms.";
			mockApp.onGet(`forms/all${query}`).reply(404, { err });

			return expectSaga(sagas.fetchForms)
				.provide([[matchers.select.selector(selectQuery), query]])
				.dispatch(actions.fetchForms)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Resend Form Mail", () => {
		it("logical flow matches pattern for resend form requests", () => {
			const message = "Successfully resent mail.";
			const res = { data: { message } };

			testSaga(sagas.resendFormEmails, { formId })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, `form/resend-email/${formId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "info", message: res.data.message })
				.next()
				.put(actions.fetchForms())
				.next()
				.isDone();
		});

		it("successfully resend an form mail", async () => {
			const message = "Successfully resent the form mail.";
			mockApp.onPut(`form/resend-email/${formId}`).reply(200, { message });

			return expectSaga(sagas.resendFormEmails, { formId })
				.dispatch(actions.resendFormEmails)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to resend the form mail.";
			mockApp.onPut(`form/resend-email/${formId}`).reply(404, { err });

			return expectSaga(sagas.resendFormEmails, { formId })
				.dispatch(actions.resendFormEmails)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Update Form", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the form!";
			props = mocks.formsData;
		});

		it("logical flow matches pattern for update form requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateForm, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, "form/update", { ...props })
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

		it("successfully updates an form", async () => {
			mockApp.onPut("form/update").reply(200, { message });

			return expectSaga(sagas.updateForm, { props })
				.dispatch(actions.updateForm)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to update the form.";
			mockApp.onPut("form/update").reply(404, { err });

			return expectSaga(sagas.updateForm, { props })
				.dispatch(actions.updateForm)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Update Form AP", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the AP form!";
			props = mocks.formsData;
		});

		it("logical flow matches pattern for update AP form requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateFormAp, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, "form/update/ap", { ...props })
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

		it("successfully updates an AP form", async () => {
			mockApp.onPut("form/update/ap").reply(200, { message });

			return expectSaga(sagas.updateFormAp, { props })
				.dispatch(actions.updateFormAp)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to update the AP form.";
			mockApp.onPut("form/update/ap").reply(404, { err });

			return expectSaga(sagas.updateFormAp, { props })
				.dispatch(actions.updateFormAp)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});
});
