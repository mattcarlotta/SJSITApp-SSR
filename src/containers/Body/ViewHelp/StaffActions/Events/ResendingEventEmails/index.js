import React from "react";
import { FaShareSquare, FaTools } from "react-icons/fa";
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

const ResendingEventEmails = () => (
	<TextContainer>
		<InfoText>
			To resend event (games, promotionals, or misc.) email reminders, go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/events/viewall?page=1"
				target="_blank"
			>
				View Events
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
			<FaShareSquare style={{ ...iconStyle, marginRight: 5 }} />
			<span>Send</span>
		</Button>
		&nbsp;
		<InfoText>
			(Send/Resend Mail) button. If the event takes place within a day, the
			email reminders will be sent out immediately.
		</InfoText>
	</TextContainer>
);

export default ResendingEventEmails;
