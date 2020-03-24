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

const ChangingEmailPreferences = () => (
	<TextContainer>
		<InfoText>To change your email preferences, go to the</InfoText>
		&nbsp;
		<Link blue style={linkStyle} href="/employee/settings" target="_blank">
			Settings
		</Link>
		&nbsp;
		<InfoText>
			page and toggle the <strong>Email Reminders</strong> field. Once finished,
			click the
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
		<InfoText>
			button to update and save your changes.{" "}
			<strong>
				Please note that will only affect event and A/P form reminders; this
				does not affect the monthly schedule.
			</strong>
		</InfoText>
	</TextContainer>
);

export default ChangingEmailPreferences;
