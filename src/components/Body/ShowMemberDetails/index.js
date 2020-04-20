import React from "react";
import PropTypes from "prop-types";
import DisplayStatus from "~components/Body/DisplayStatus";
import LightText from "~components/Body/LightText";
import Small from "~components/Body/Small";
import Title from "~components/Body/Title";
import moment from "~utils/momentWithTZ";

const ShowMemberDetails = ({
	firstName,
	lastName,
	registered,
	role,
	status,
}) => (
	<div>
		<Title data-test="user-name" style={{ fontSize: 36, margin: "0" }}>
			{firstName} {lastName}
		</Title>
		<LightText style={{ margin: "0" }}>
			Account Status:{" "}
			<Small>
				<DisplayStatus status={status} />{" "}
				<span data-test="user-status">({status})</span>
			</Small>
		</LightText>
		<LightText style={{ margin: "5px 0 0 0" }}>
			Registered:{" "}
			<Small data-test="user-registered">
				{moment(registered).format("MMMM Do, YYYY")}
			</Small>
		</LightText>
		<LightText style={{ margin: "5px 0 0 0" }}>
			Role:{" "}
			<Small data-test="user-role" style={{ textTransform: "capitalize" }}>
				{role}
			</Small>
		</LightText>
	</div>
);

ShowMemberDetails.propTypes = {
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	registered: PropTypes.string,
	role: PropTypes.string,
	status: PropTypes.string,
};

export default ShowMemberDetails;
