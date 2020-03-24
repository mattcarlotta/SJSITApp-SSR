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

const CreatingForms = () => (
	<TextContainer>
		<InfoText>
			To manually create forms (A/P forms), go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/forms/create"
				target="_blank"
			>
				Create Form
			</Link>{" "}
			page and fill out the <strong>New AP Form</strong> by: Selecting the{" "}
			<strong>Season ID</strong> you&#39;ve previously created, as well as,
			selecting the appropriate <strong>Enrollment Month</strong>,{" "}
			<strong>Expiration Date</strong>, and the{" "}
			<strong>
				Send Email Notifications Date (optional -- read below for more details)
			</strong>
			. Once you&#39;ve filled out the form, click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="140px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Create Form
		</Button>
		&nbsp;
		<InfoText>
			button to create a new A/P form. By design, A/P forms will automatically
			aggregate events within the <strong>Enrollment Month</strong> dates,
			therefore, as long as an event&#39;s date is between this date range,
			they&#39;ll automatically be added to the A/P Form.
		</InfoText>
		<br />
		<br />
		<InfoText>
			According to the <strong>Send Email Notifications Date</strong>, email
			notifications will be automatically sent to all active members notifying
			them that a new A/P form has been created and will need to be filled out
			before the <strong>Expiration Date</strong>. Leaving this{" "}
			<strong>Send Email Notifications Date</strong> field blank, will send the
			email notifications immediately.
		</InfoText>
	</TextContainer>
);

export default CreatingForms;
