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

const UpdatingAPForm = () => (
	<TextContainer>
		<InfoText>To update your availabilty to an A/P form, go to the</InfoText>
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
			button located next to the <strong>Forms</strong> tab. Update your
			previous responses accordingly and click the
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
		<InfoText>button when you&#39;re done. </InfoText>
		<WarningText>
			Be advised that you will have up until the form&#39;s expiration date to
			view and update your responses. After the date has expired, the form will
			no longer be viewable.
		</WarningText>
	</TextContainer>
);

export default UpdatingAPForm;
