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

const ChangingPassword = () => (
	<TextContainer>
		<InfoText>To change your password, go to the</InfoText>
		&nbsp;
		<Link blue style={linkStyle} href="/employee/resetpassword" target="_blank">
			Reset Password
		</Link>
		&nbsp;
		<InfoText>
			page and fill out the <strong>Email</strong> field. Once finished, click
			the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="160px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Reset Password
		</Button>
		&nbsp;
		<InfoText>
			button to initiate a password reset request. In a few minutes, a password
			reset request email will be sent to the account&#39;s email address. Open
			the email, and click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="210px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Create New Password
		</Button>
		&nbsp;
		<InfoText>
			link. This link will take you to an Update Password form. Fill out the
		</InfoText>
		&nbsp;
		<strong>New Password</strong>
		&nbsp;
		<InfoText>field. Once completed, click the</InfoText>
		&nbsp;
		<Button
			primary
			width="175px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Update Password
		</Button>
		&nbsp;
		<InfoText>button to update the account&#39;s password.</InfoText>
		&nbsp;
		<WarningText>
			Be advised that resetting the password will log you out of the current
			session.
		</WarningText>
		<InfoText>
			To proceed, please re-log into your account with the updated password.
		</InfoText>
	</TextContainer>
);

export default ChangingPassword;
