import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Sends a single mail to staff or admin.
 *
 * @function contactUs
 * @param {object} props - contains mail data ([sendTo, message, subject]).
 * @returns {object}
 */
export const contactUs = props => ({
	type: types.MAIL_CONTACT_US,
	props,
});

/**
 * Sends a single mail.
 *
 * @function createMail
 * @param {object} props - contains mail data ([sendTo, sendFrom, sendDate, message, subject]).
 * @returns {object}
 */
export const createMail = props => ({
	type: types.MAIL_CREATE,
	props,
});

/**
 * Deletes a new mail.
 *
 * @function deleteMail
 * @param {string} eventId
 * @returns {object}
 */
export const deleteMail = mailId => ({
	type: types.MAIL_DELETE,
	mailId,
});

/**
 * Deletes many mails.
 *
 * @function deleteManyMails
 * @param {array} ids
 * @returns {object}
 */
export const deleteManyMails = ids => ({
	type: types.MAIL_DELETE_MANY,
	ids,
});

/**
 * Fetches a single mail for viewing/editing.
 *
 * @function fetchMail
 * @param {string} mailId
 * @returns {object}
 */
export const fetchMail = mailId => ({
	type: types.MAIL_EDIT,
	mailId,
});

/**
 * Fetches all mails.
 *
 * @function fetchMails
 * @returns {object}
 */
export const fetchMails = () => ({
	type: types.MAIL_FETCH,
});

/**
 * Resends a single mail.
 *
 * @function resendMail
 * @param {string} mailId
 * @returns {object}
 */
export const resendMail = mailId => ({
	type: types.MAIL_RESEND,
	mailId,
});

/**
 * Sets any mails for ViewMail to redux state
 *
 * @function setMails
 * @param {array} data - contains mail data ([id, sendTo, sendFrom, sendDate, sent, message, subject]).
 * @returns {object}
 */
export const setMails = data => ({
	type: types.MAIL_SET,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets a single mail to redux state for editing.
 *
 * @function setMailToEdit
 * @param {object} data - contains mail data ([id, sendTo, sendFrom, sendDate, sent, message, subject]).
 * @returns {object}
 */
export const setMailToEdit = data => ({
	type: types.MAIL_SET_EDIT,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Updates a single mail.
 *
 * @function updateMail
 * @param {object} data - contains mail data ([id, sendTo, sendFrom, sendDate, sent, message, subject]).
 * @returns {object}
 */
export const updateMail = props => ({
	type: types.MAIL_UPDATE_EDIT,
	props,
});
