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

const CreatingMembers = () => (
	<TextContainer>
		<InfoText>
			To authorize members to sign up, go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/members/create"
				target="_blank"
			>
				Create Member
			</Link>{" "}
			page and fill out the <strong>Create Member</strong> form by: Selecting
			the appropriate <strong>Role</strong> and providing the member&#39;s email
			address that you wish to authorize. Once you&#39;ve filled out the form,
			click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="150px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Create Member
		</Button>
		&nbsp;
		<InfoText>button to authorize the member to sign up.</InfoText>
		<br />
		<br />
		<InfoText>
			The member will receive an email that contains a special{" "}
			<strong>Authorization Key</strong> that gives them access to use the{" "}
			<Link blue style={linkStyle} href="/employee/signup" target="_blank">
				Sign Up
			</Link>{" "}
			form. If they click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="85px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Sign Up
		</Button>
		&nbsp;
		<InfoText>
			button in the email, the authorization key will be automatically applied
			to the form, otherwise they must include it. Once they&#39;ve filled out
			the rest of the fields: <strong>Authorized Email</strong>,{" "}
			<strong>First Name</strong>, <strong>Last Name</strong>, and a{" "}
			<strong>Password</strong>, they need to click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="85px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Register
		</Button>
		&nbsp;
		<InfoText>
			button to sign up. If they provided a valid authorization key, then
			they&#39;ll be given immediate access to the application, as well as an
			account creation email confirmation. They can sign into their new account
			by filling out the{" "}
			<Link blue style={linkStyle} href="/employee/login" target="_blank">
				Log In
			</Link>{" "}
			form with their <strong>Email</strong> and <strong>Password</strong>{" "}
			details.
		</InfoText>
	</TextContainer>
);

export default CreatingMembers;
