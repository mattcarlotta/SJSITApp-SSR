import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import Avatar from "~components/Body/Avatar";
import DisplayStatus from "~components/Body/DisplayStatus";
import LightText from "~components/Body/LightText";
import Line from "~components/Body/Line";
import PaneBody from "~components/Body/PaneBody";
import Small from "~components/Body/Small";
import Title from "~components/Body/Title";
import UpdateAvatarForm from "~containers/Forms/Auth/UpdateAvatarForm";
import UpdateSettingsForm from "~containers/Forms/Auth/UpdateSettingsForm";

const Profile = ({
	avatar,
	deleteUserAvatar,
	id,
	firstName,
	lastName,
	registered,
	role,
	showAvatarForm,
	status,
	toggleAvatarForm,
}) => (
	<PaneBody>
		{showAvatarForm ? (
			<UpdateAvatarForm id={id} closeAvatarForm={toggleAvatarForm} />
		) : (
			<Avatar
				avatar={avatar}
				deleteUserAvatar={() => deleteUserAvatar(id)}
				openAvatarForm={toggleAvatarForm}
			/>
		)}
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
	avatar: PropTypes.string,
	deleteUserAvatar: PropTypes.func.isRequired,
	firstName: PropTypes.string,
	id: PropTypes.string.isRequired,
	lastName: PropTypes.string,
	registered: PropTypes.string,
	role: PropTypes.string,
	showAvatarForm: PropTypes.bool.isRequired,
	status: PropTypes.string,
	toggleAvatarForm: PropTypes.func.isRequired,
};

export default Profile;
