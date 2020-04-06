import React from "react";
import PropTypes from "prop-types";
import Line from "~components/Body/Line";
import PaneBody from "~components/Body/PaneBody";
import ShowAvatar from "~components/Body/ShowAvatar";
import ShowMemberDetails from "~components/Body/ShowMemberDetails";
import FlexAlignItemsCenter from "~components/Body/FlexAlignItemsCenter";
import UpdateSettingsForm from "~containers/Forms/Auth/UpdateSettingsForm";

const Profile = ({
	deleteUserAvatar,
	serverMessage,
	updateUserAvatar,
	viewMember,
}) => (
	<PaneBody>
		<FlexAlignItemsCenter style={{ marginBottom: 10 }}>
			<ShowAvatar
				id={viewMember._id}
				avatar={viewMember.avatar}
				serverMessage={serverMessage}
				updateAvatar={updateUserAvatar}
				deleteAvatar={() => deleteUserAvatar(viewMember._id)}
			/>
			<ShowMemberDetails {...viewMember} />
		</FlexAlignItemsCenter>
		<Line width="550px" />
		<UpdateSettingsForm />
	</PaneBody>
);

Profile.propTypes = {
	deleteUserAvatar: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
	updateUserAvatar: PropTypes.func.isRequired,
	viewMember: PropTypes.shape({
		_id: PropTypes.string,
		avatar: PropTypes.string,
		email: PropTypes.string,
		emailReminders: PropTypes.bool,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		registered: PropTypes.string,
		role: PropTypes.string,
		schedule: PropTypes.any,
		status: PropTypes.string,
	}),
};

export default Profile;
