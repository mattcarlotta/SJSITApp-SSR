export default (field, newEvent) => {
	switch (field.name) {
		case "seasonId":
			return {
				...field,
				selectOptions: newEvent.seasonIds,
				disabled: false,
			};
		case "opponent":
			return { ...field, selectOptions: newEvent.teams, disabled: false };
		default: {
			return {
				...field,
				disabled: false,
			};
		}
	}
};
