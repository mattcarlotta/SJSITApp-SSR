import isEmpty from "lodash/isEmpty";

/**
 * Helper function to parse a fields' [name]: value from an array into an object.
 *
 * @function
 * @param {array} fields - an array containing fields.
 * @returns {object} - parsed fields with [name]: value.
 * @throws {error}
 */
export default fields => {
	try {
		if (isEmpty(fields)) throw new Error("You must supply an array of fields!");

		const parsedFields = fields.reduce(
			(acc, { name, type, value, notes, updateEvent }) => {
				switch (type) {
					case "time": {
						acc["callTimes"] = acc["callTimes"] || [];
						if (value) acc["callTimes"].push(value.format());
						break;
					}
					case "date": {
						acc[name] = value ? value.format() : "";
						break;
					}
					case "range": {
						const values = value.map(val => val.format());
						acc[name] = values;
						break;
					}
					case "radiogroup": {
						acc["responses"] = acc["responses"] || [];
						acc["responses"].push({ id: name, value, notes, updateEvent });
						break;
					}
					default: {
						acc[name] = value;
						break;
					}
				}
				return acc;
			},
			{},
		);

		return parsedFields;
	} catch (err) {
		return err.toString();
	}
};
