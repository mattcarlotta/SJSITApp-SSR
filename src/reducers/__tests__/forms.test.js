import * as types from "~types";
import formReducer, { initialState } from "~reducers/Forms";
import * as mocks from "~reducers/__mocks__/~reducers.mocks";

const formsData = {
	forms: mocks.formData,
	totalDocs: 1,
};

const apformData = {
	form: mocks.formData,
	events: mocks.eventsApData,
};

describe("Form Reducer", () => {
	it("initially matches the initialState pattern", () => {
		expect(formReducer(undefined, { payload: {}, type: "" })).toEqual(
			initialState,
		);
	});

	it("sets forms data", () => {
		const state = formReducer(undefined, {
			type: types.FORMS_SET,
			payload: formsData,
		});

		expect(state).toEqual({
			data: mocks.formData,
			isLoading: false,
			totalDocs: 1,
			editForm: {},
			events: [],
			viewForm: {},
		});
	});

	it("sets forms AP data", () => {
		const state = formReducer(undefined, {
			type: types.FORMS_SET_AP,
			payload: apformData,
		});

		expect(state).toEqual({
			data: [],
			editForm: {},
			events: mocks.eventsApData,
			viewForm: mocks.formData,
			isLoading: true,
			totalDocs: 0,
		});
	});

	it("when fetching all forms, resets to initialState", () => {
		let state = formReducer(undefined, {
			type: types.FORMS_SET,
			payload: formsData,
		});

		state = formReducer(state, {
			type: types.FORMS_FETCH,
		});

		expect(state).toEqual(initialState);
	});

	it("sets event for editing", () => {
		const state = formReducer(undefined, {
			type: types.FORMS_SET_EDIT,
			payload: { ...mocks.formData },
		});

		expect(state).toEqual({
			data: [],
			editForm: { ...mocks.formData },
			events: [],
			viewForm: {},
			isLoading: true,
			totalDocs: 0,
		});
	});
});
