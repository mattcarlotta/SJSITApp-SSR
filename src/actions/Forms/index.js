import isEmpty from "lodash.isempty";
import * as types from "~types";

/**
 * Creates a new form.
 *
 * @function createForm
 * @param {object} props - props contain seasonId, begin/end month dates and an expiration date.
 * @returns {object}
 */
export const createForm = props => ({
	type: types.FORMS_CREATE,
	props,
});

/**
 * Deletes a new form.
 *
 * @function deleteForm
 * @param {string} formId
 * @returns {object}
 */
export const deleteForm = formId => ({
	type: types.FORMS_DELETE,
	formId,
});

/**
 * Deletes many forms.
 *
 * @function deleteManyForms
 * @param {array} ids
 * @returns {object}
 */
export const deleteManyForms = ids => ({
	type: types.FORMS_DELETE_MANY,
	ids,
});

/**
 * Fetches all forms.
 *
 * @function fetchForms
 * @returns {object}
 */
export const fetchForms = () => ({
	type: types.FORMS_FETCH,
});

/**
 * Resend forms emails.
 *
 * @function resendMail
 * @param {string} formId
 * @returns {object}
 */
export const resendMail = formId => ({
	type: types.FORMS_RESEND_MAIL,
	formId,
});

/**
 * Resets forms state.
 *
 * @function resetForms
 * @returns {object}
 */
export const resetForms = () => ({
	type: types.FORMS_RESET,
});

/**
 * Sets an A/P form for veiwing/editing to redux state
 *
 * @function setApForm
 * @param {array} data - contains form and events data
 * @returns {object}
 */
export const setFormAp = data => ({
	type: types.FORMS_SET_AP,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets A/P forms to redux state for ViewForms page
 *
 * @function setForms
 * @param {array} data - contains forms data ([_id, seasonId, startMonth, startDate, expirationDate]).
 * @returns {object}
 */
export const setForms = data => ({
	type: types.FORMS_SET,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets a single form to redux state for editing.
 *
 * @function setFormToEdit
 * @param {object} data - contains form data ([_id, seasonId, startMonth, startDate, expirationDate]).
 * @returns {object}
 */
export const setFormToEdit = data => ({
	type: types.FORMS_SET_EDIT,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Updates a single form.
 *
 * @function updateForm
 * @param {object} data - contains form data ([_id, seasonId, startMonth, startDate, expirationDate])
 * @returns {object}
 */
export const updateForm = props => ({
	type: types.FORMS_UPDATE,
	props,
});

/**
 * Updates a single A/P form with user response.
 *
 * @function updateFormAp
 * @param {object} data - contains form data ([_id, value])
 * @returns {object}
 */
export const updateFormAp = props => ({
	type: types.FORMS_UPDATE_AP,
	props,
});
