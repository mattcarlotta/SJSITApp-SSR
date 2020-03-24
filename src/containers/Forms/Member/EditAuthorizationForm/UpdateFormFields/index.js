export default (field, editToken) => {
	switch (field.name) {
		case "role": {
			return { ...field, value: editToken.role, disabled: !!editToken.email };
		}
		case "authorizedEmail": {
			return {
				...field,
				value: editToken.authorizedEmail,
				disabled: !!editToken.email,
			};
		}
	}
};
