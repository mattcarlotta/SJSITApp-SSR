import * as types from "types";
import * as actions from "actions/Forms";

const data = {
	_id: "0123456789",
	seasonId: "20192020",
	startMonth: "2019-08-01T07:00:00.000Z",
	endMonth: "2019-09-01T06:59:59.000Z",
	expirationDate: "2019-08-08T06:59:00.000Z",
	notes: "Test",
};

const formId = "1234567890";

describe("Forms Actions", () => {
	it("returns FORMS_CREATE with data", () => {
		const props = data;
		const value = actions.createForm(props);

		expect(value).toEqual({
			type: types.FORMS_CREATE,
			props,
		});
	});

	it("returns FORMS_DELETE with a formId", () => {
		const value = actions.deleteForm(formId);

		expect(value).toEqual({
			type: types.FORMS_DELETE,
			formId,
		});
	});

	it("returns FORMS_DELETE_MANY with ids", () => {
		const ids = ["01", "02", "03"];
		const value = actions.deleteManyForms(ids);

		expect(value).toEqual({
			type: types.FORMS_DELETE_MANY,
			ids,
		});
	});

	it("returns FORMS_EDIT", () => {
		const value = actions.fetchForm(formId);

		expect(value).toEqual({
			type: types.FORMS_EDIT,
			formId,
		});
	});

	it("returns FORMS_FETCH", () => {
		const value = actions.fetchForms();

		expect(value).toEqual({
			type: types.FORMS_FETCH,
		});
	});

	it("returns FORMS_RESET_AP", () => {
		const value = actions.resetApForm();

		expect(value).toEqual({
			type: types.FORMS_RESET_AP,
		});
	});

	it("returns FORMS_RESEND_MAIL", () => {
		const value = actions.resendMail(formId);

		expect(value).toEqual({
			type: types.FORMS_RESEND_MAIL,
			formId,
		});
	});

	it("returns FORMS_SET_AP with an empty array if data is empty", () => {
		const value = actions.setFormAp([]);

		expect(value).toEqual({
			type: types.FORMS_SET_AP,
			payload: [],
		});
	});

	it("returns FORMS_SET_AP with data", () => {
		const value = actions.setFormAp(data);

		expect(value).toEqual({
			type: types.FORMS_SET_AP,
			payload: data,
		});
	});

	it("returns FORMS_SET with an empty array if data is empty", () => {
		const value = actions.setForms([]);

		expect(value).toEqual({
			type: types.FORMS_SET,
			payload: [],
		});
	});

	it("returns FORMS_SET with data", () => {
		const value = actions.setForms(data);

		expect(value).toEqual({
			type: types.FORMS_SET,
			payload: data,
		});
	});

	it("returns FORMS_SET_EDIT with an empty object if data is empty", () => {
		const value = actions.setFormToEdit({});

		expect(value).toEqual({
			type: types.FORMS_SET_EDIT,
			payload: {},
		});
	});

	it("returns FORMS_SET_EDIT with data", () => {
		const value = actions.setFormToEdit({ ...data });

		expect(value).toEqual({
			type: types.FORMS_SET_EDIT,
			payload: { ...data },
		});
	});

	it("returns FORMS_UPDATE with props", () => {
		const props = data;

		const value = actions.updateForm(props);

		expect(value).toEqual({
			type: types.FORMS_UPDATE,
			props,
		});
	});

	it("returns FORMS_UPDATE_AP with props", () => {
		const props = data;

		const value = actions.updateFormAp(props);

		expect(value).toEqual({
			type: types.FORMS_UPDATE_AP,
			props,
		});
	});
});
