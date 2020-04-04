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
import Flex from "~components/Body/Flex";
import FlexAlignItemsCenter from "~components/Body/FlexAlignItemsCenter";
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
		<FlexAlignItemsCenter style={{ marginBottom: 10 }}>
			<Flex direction="column" style={{ marginRight: 20 }}>
				{showAvatarForm ? (
					<UpdateAvatarForm id={id} closeAvatarForm={toggleAvatarForm} />
				) : (
					<Avatar
						avatar={avatar}
						deleteUserAvatar={() => deleteUserAvatar(id)}
						openAvatarForm={toggleAvatarForm}
					/>
				)}
			</Flex>
			<Flex direction="column" style={{ height: 200 }}>
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
					Registered:{" "}
					<Small>{moment(registered).format("MMMM Do, YYYY")}</Small>
				</LightText>
				<LightText style={{ margin: "5px 0 0 0" }}>
					Role: <Small style={{ textTransform: "capitalize" }}>{role}</Small>
				</LightText>
			</Flex>
		</FlexAlignItemsCenter>
		<Line width="550px" />
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
