export default (field, dataSource) => {
	switch (field.name) {
		case "sendTo":
			return {
				...field,
				dataSource,
				disabled: false,
			};
		default: {
			return {
				...field,
				disabled: false,
			};
		}
	}
};
