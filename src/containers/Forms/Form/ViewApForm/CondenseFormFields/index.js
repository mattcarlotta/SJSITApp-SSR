import groupBy from "lodash/groupBy";

/**
 * Helper function to merge event notes (textarea) into an event field's (radiogroup) object.
 *
 * @function
 * @param {array} formFields - an array containing form fields.
 * @function groupBy - separates fields into object categories by type (radigroup, textarea).
 * @function find - finds an eventNote (textarea) by matching its id to an event (radiogroup) field's id.
 * @returns {array} - an array with single event fields objects with updated event notes properties.
 */
export default formFields => {
	const { radiogroup, textarea } = groupBy(formFields, "type");

	const updateFormFields = radiogroup.map(field => {
		const eventNote = textarea.find(item => field.id === item.id);
		return { ...field, notes: eventNote.value };
	});

	return updateFormFields;
};
