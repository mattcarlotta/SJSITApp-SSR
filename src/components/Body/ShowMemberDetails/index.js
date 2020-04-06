import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import DisplayStatus from "~components/Body/DisplayStatus";
import LightText from "~components/Body/LightText";
import Small from "~components/Body/Small";
import Title from "~components/Body/Title";

const ShowMemberDetails = ({
	firstName,
	lastName,
	registered,
	role,
	status,
}) => (
	<div>
		<Title style={{ fontSize: 36, margin: "0" }}>
			{firstName} {lastName}
		</Title>
		<LightText style={{ margin: "0" }}>
			Account Status:{" "}
			<Small>
				<DisplayStatus status={status} /> <span>({status})</span>
			</Small>
		</LightText>
		<LightText style={{ margin: "5px 0 0 0" }}>
			Registered: <Small>{moment(registered).format("MMMM Do, YYYY")}</Small>
		</LightText>
		<LightText style={{ margin: "5px 0 0 0" }}>
			Role: <Small style={{ textTransform: "capitalize" }}>{role}</Small>
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
