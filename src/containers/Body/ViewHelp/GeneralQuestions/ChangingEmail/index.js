import React from "react";
import Button from "~components/Body/Button";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import WarningText from "~components/Body/WarningText";
import Link from "~components/Navigation/Link";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const btnStyle = {
	display: "inline-block",
};

const ChangingEmail = () => (
	<TextContainer>
		<InfoText>To change your email, go to the</InfoText>
		&nbsp;
		<Link blue style={linkStyle} href="/employee/settings" target="_blank">
			Settings
		</Link>
		&nbsp;
		<InfoText>
			page and update the <strong>Email</strong> field with a new email address.
			Once finished, click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="165px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Update Settings
		</Button>
		&nbsp;
		<InfoText>button to save and update your email.</InfoText>
		&nbsp;
		<WarningText>
			Be advised that updating your email will log you out of the current
			session.
		</WarningText>
		<InfoText>
			To proceed, please log in with your new email address and your account
			password.
		</InfoText>
	</TextContainer>
);

export default ChangingEmail;
