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

const ViewingForms = () => (
	<TextContainer>
		<InfoText>To view an A/P form, go to the</InfoText>
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
			button located next to the <strong>Forms</strong> tab.
		</InfoText>
		<WarningText>
			Be advised that this button will disappear once the form has expired.
		</WarningText>
	</TextContainer>
);

export default ViewingForms;
