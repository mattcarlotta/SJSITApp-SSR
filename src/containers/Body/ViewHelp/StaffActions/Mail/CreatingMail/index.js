import React from "react";
import Button from "~components/Body/Button";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import Link from "~components/Navigation/Link";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const btnStyle = {
	display: "inline-block",
};

const CreatingMail = () => (
	<TextContainer>
		<InfoText>
			To create an email, go to the{" "}
			<Link blue style={linkStyle} href="/employee/mail/create" target="_blank">
				Send Mail
			</Link>{" "}
			page and fill out the <strong>Send Mail</strong> form by: Selecting at
			least one member to <strong>Send To</strong>, including a{" "}
			<strong>Send From</strong> email address (default address has been
			provided), selecting an appropriate <strong>Send Date (optional)</strong>,
			and lastly filling in a <strong>Subject</strong> and a{" "}
			<strong>Message</strong>. Once completed, click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="80px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Preview
		</Button>
		&nbsp;
		<InfoText>
			button to preview what the email will look like before sending it out. To
			ensure consistency, the message will be automatically wrapped in a
			pre-defined email template. If you&#39;re statisified with the final look,
			then click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="55px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Send
		</Button>
		&nbsp;
		<InfoText>
			button to save the email. If a <strong>Send Date</strong> was not
			provided, then the email will be sent out immediately.
		</InfoText>
	</TextContainer>
);

export default CreatingMail;
