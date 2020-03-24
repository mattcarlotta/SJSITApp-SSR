import React from "react";
import { FaSearchPlus, FaTools } from "react-icons/fa";
import Button from "~components/Body/Button";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import Link from "~components/Navigation/Link";

const iconStyle = {
	position: "relative",
	top: 2,
};

const linkStyle = {
	margin: 0,
	padding: 0,
};

const btnStyle = {
	display: "inline-block",
};

const ViewingMemberProfile = () => (
	<TextContainer>
		<InfoText>
			To view a member&#39;s profile, go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/members/viewall?page=1"
				target="_blank"
			>
				View Members
			</Link>{" "}
			page, underneath the <strong>Table Actions</strong> column, click on one
			of the
		</InfoText>
		&nbsp;
		<Button
			width="50px"
			padding="3px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			<FaTools style={iconStyle} />
		</Button>
		&nbsp;
		<InfoText>table actions buttons to open a menu, then click on the</InfoText>
		&nbsp;
		<Button
			primary
			width="80px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			<FaSearchPlus style={{ ...iconStyle, marginRight: 5 }} />
			<span>View</span>
		</Button>
		&nbsp;
		<InfoText>
			(View) button. Here you&#39;ll have access to their{" "}
			<strong>Profile</strong>, <strong>Availabilty</strong>,{" "}
			<strong>Responses</strong>, and <strong>Schedule</strong>.
		</InfoText>
	</TextContainer>
);

export default ViewingMemberProfile;
