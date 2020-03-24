import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import DisplayStatus from "~components/Body/DisplayStatus";
import LightText from "~components/Body/LightText";
import Line from "~components/Body/Line";
import PaneBody from "~components/Body/PaneBody";
import Small from "~components/Body/Small";
import Title from "~components/Body/Title";
import UpdateSettingsForm from "~containers/Forms/Member/UpdateSettingsForm";

const Profile = ({ firstName, lastName, registered, role, status }) => (
	<PaneBody>
		<Title style={{ fontSize: 36, margin: 0 }}>
			{firstName} {lastName}
		</Title>
		<LightText style={{ marginTop: 10 }}>
			Account Status:{" "}
			<Small>
				<DisplayStatus status={status} /> <span>({status})</span>
			</Small>
		</LightText>
		<LightText>
			Registered: <Small>{moment(registered).format("MMMM Do, YYYY")}</Small>
		</LightText>
		<LightText>
			Role: <Small style={{ textTransform: "capitalize" }}>{role}</Small>
		</LightText>
		<Line width="400px" />
		<UpdateSettingsForm />
	</PaneBody>
);

Profile.propTypes = {
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	registered: PropTypes.string,
	role: PropTypes.string,
	status: PropTypes.string,
};

export default Profile;
