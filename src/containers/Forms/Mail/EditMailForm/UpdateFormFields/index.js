import moment from "moment-timezone";

export default (field, editEmail) => {
	const {
		dataSource,
		message,
		sendDate,
		sendFrom,
		sendTo,
		subject,
	} = editEmail;

	switch (field.name) {
		case "sendTo": {
			return {
				...field,
				dataSource,
				value: sendTo,
				disabled: false,
			};
		}
		case "sendFrom": {
			return {
				...field,
				value: sendFrom,
				disabled: false,
			};
		}
		case "sendDate": {
			return {
				...field,
				value: moment(sendDate),
				disabled: false,
			};
		}
		case "subject": {
			return {
				...field,
				value: subject,
				disabled: false,
			};
		}
		default: {
			return {
				...field,
				value: message,
				disabled: false,
			};
		}
	}
};
