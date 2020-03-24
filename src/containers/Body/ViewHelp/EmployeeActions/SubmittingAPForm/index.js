import React from "react";
import Button from "~components/Body/Button";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import WarningText from "~components/Body/WarningText";
import Link from "~components/Navigation/Link";

const btnStyle = {
	display: "inline-block",
};

const linkStyle = {
	margin: 0,
	padding: 0,
};

const SubmittingAPForm = () => (
	<TextContainer>
		<InfoText>To add your availability to an A/P form, go to the</InfoText>
		&nbsp;
		<Link blue style={linkStyle} href="/employee/dashboard" target="_blank">
			Dashboard
		</Link>
		&nbsp;
		<InfoText>page and click on the</InfoText>
		&nbsp;
		<Button
			width="60px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			View
		</Button>
		&nbsp;
		<InfoText>
			button located next to the <strong>Forms</strong> tab. For each game
			within the <strong>Sharks & Barracuda A/P Form</strong>, select one of the
			four available options: <strong>I want to work.</strong>,{" "}
			<strong>Available to work.</strong>, <strong>Prefer not to work.</strong>,
			or <strong>Not available to work.</strong> If you&#39;re unavailable to
			work or you want to work but have some stipulations, then you can
			optionally add a reason/note to the specified game. This note will be
			visible to a staff member when they&#39;re scheduling the specified game.
		</InfoText>
		<br />
		<br />
		<InfoText style={{ marginTop: 30 }}>
			Please note that all games must be filled out before the form can be
			submitted. Once the form has been completely filled out, click the
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
			Submit AP Form
		</Button>
		&nbsp;
		<InfoText>button to add your availabilty to the A/P form. </InfoText>
		<WarningText>
			Be advised that you will have up until the form&#39;s expiration date to
			view and update your responses. After the date has expired, the form will
			no longer be viewable.
		</WarningText>
	</TextContainer>
);

export default SubmittingAPForm;
