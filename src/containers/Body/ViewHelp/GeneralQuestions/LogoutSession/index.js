import React from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Button from "~components/Body/Button";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";

const btnStyle = {
	display: "inline-block",
};

const iconStyle = {
	position: "relative",
	top: 2,
};

const LogoutSession = () => (
	<TextContainer>
		<InfoText>
			By default, you&#39;ll stay logged into your current session for 30 days
			from the time you first logged in. If you wish to manually log out, simply
			click the
		</InfoText>
		&nbsp;
		<Button
			width="120px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			<FaUserCircle style={iconStyle} /> Jane Doe
		</Button>
		&nbsp;
		<InfoText>
			button located at the top right of the application. This will open a menu.
			Click the
		</InfoText>
		&nbsp;
		<Button
			width="100px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			<FaSignOutAlt style={iconStyle} /> Logout
		</Button>
		&nbsp;
		<InfoText>option to end the session.</InfoText>
	</TextContainer>
);

export default LogoutSession;
