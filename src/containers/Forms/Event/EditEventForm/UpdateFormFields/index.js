import moment from "moment-timezone";

export default (result, field, editEvent, onFieldRemove) => {
	switch (field.name) {
		case "seasonId": {
			return [
				...result,
				{
					...field,
					selectOptions: editEvent.seasonIds,
					value: editEvent.seasonId,
					disabled: false,
				},
			];
		}
		case "team": {
			return [...result, { ...field, value: editEvent.team, disabled: false }];
		}
		case "opponent": {
			return [
				...result,
				{
					...field,
					value: editEvent.opponent,
					selectOptions: editEvent.teams,
					disabled: false,
				},
			];
		}
		case "eventType": {
			return [
				...result,
				{ ...field, value: editEvent.eventType, disabled: false },
			];
		}
		case "location": {
			return [
				...result,
				{ ...field, value: editEvent.location, disabled: false },
			];
		}
		case "eventDate": {
			return [
				...result,
				{ ...field, value: moment(editEvent.eventDate), disabled: false },
			];
		}
		case "uniform": {
			return [
				...result,
				{ ...field, value: editEvent.uniform, disabled: false },
			];
		}
		case "notes": {
			return [...result, { ...field, value: editEvent.notes, disabled: false }];
		}
		case "callTime": {
			const callTimes = editEvent.callTimes.map((value, key) => ({
				...field,
				name: key <= 0 ? "callTime" : `callTime-${value}`,
				label: key <= 0 ? "Scheduling Call Times" : "",
				value: moment(value),
				required: key <= 0,
				disabled: false,
				height: key > 0 && "auto",
				onFieldRemove: key <= 0 ? null : onFieldRemove,
			}));
			return [...result, ...callTimes];
		}
	}
};
