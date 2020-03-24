import React from "react";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import { Tooltip } from "antd";

export const showFullList = employees =>
	!isEmpty(employees) ? (
		employees.map(({ _id, firstName, lastName }) => (
			<p key={_id} style={{ margin: 0, padding: 0 }}>
				&#183; {firstName} {lastName}
			</p>
		))
	) : (
		<span>(none)</span>
	);

const DisplayScheduledEmployees = ({ employees }) => (
	<Tooltip
		arrowPointAtCenter
		title={/* istanbul ignore next */ () => showFullList(employees)}
		overlayStyle={{ maxWidth: 400 }}
		placement="top"
	>
		<span css="cursor: default;">{employees.length}</span>
	</Tooltip>
);

DisplayScheduledEmployees.propTypes = {
	employees: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			firstName: PropTypes.string,
			lastName: PropTypes.string,
		}),
	),
};

export default DisplayScheduledEmployees;
