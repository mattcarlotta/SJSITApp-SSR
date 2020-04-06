import React from "react";
import PropTypes from "prop-types";
import { FaBan, FaUserPlus } from "react-icons/fa";
import Button from "~components/Body/Button";
import Flex from "~components/Body/Flex";
import Line from "~components/Body/Line";
import PaneBody from "~components/Body/PaneBody";
import ShowAvatar from "~components/Body/ShowAvatar";
import ShowMemberDetails from "~components/Body/ShowMemberDetails";
import FlexAlignItemsCenter from "~components/Body/FlexAlignItemsCenter";
import EditMemberForm from "~containers/Forms/Member/EditMemberForm";

const iconStyle = {
	position: "relative",
	top: 3,
};

const Profile = ({
	deleteMemberAvatar,
	isCollapsed,
	updateMemberAvatar,
	updateMemberStatus,
	serverMessage,
	viewMember,
}) => {
	const isActive = viewMember.status === "active";

	return (
		<PaneBody>
			<Flex direction={`${isCollapsed ? "column" : "row"}`}>
				<FlexAlignItemsCenter style={{ marginBottom: 10 }}>
					<ShowAvatar
						id={viewMember._id}
						avatar={viewMember.avatar}
						serverMessage={serverMessage}
						updateAvatar={updateMemberAvatar}
						deleteAvatar={() => deleteMemberAvatar(viewMember._id)}
					/>
					<ShowMemberDetails {...viewMember} />
				</FlexAlignItemsCenter>
				<div
					css={`
						display: flex;
						align-self: flex-start;
						margin: ${isCollapsed ? "0 0 10px 35px" : "55px 0 0 0"};
					`}
				>
					<Button
						primary={!isActive}
						danger={isActive}
						width="130px"
						padding="0px"
						style={{ height: 40, marginLeft: isCollapsed ? 0 : 20 }}
						onClick={() =>
							updateMemberStatus({
								_id: viewMember._id,
								status: viewMember.status,
							})
						}
					>
						{isActive ? (
							<>
								<FaBan style={iconStyle} /> Suspend
							</>
						) : (
							<>
								<FaUserPlus style={iconStyle} /> Activate
							</>
						)}
					</Button>
				</div>
			</Flex>
			<Line width="550px" />
			<EditMemberForm />
		</PaneBody>
	);
};

Profile.propTypes = {
	deleteMemberAvatar: PropTypes.func.isRequired,
	isCollapsed: PropTypes.bool.isRequired,
	serverMessage: PropTypes.string,
	updateMemberAvatar: PropTypes.func.isRequired,
	updateMemberStatus: PropTypes.func.isRequired,
	viewMember: PropTypes.shape({
		_id: PropTypes.string,
		avatar: PropTypes.string,
		email: PropTypes.string,
		events: PropTypes.any,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		registered: PropTypes.string,
		role: PropTypes.string,
		schedule: PropTypes.any,
		status: PropTypes.string,
	}),
};

export default Profile;
