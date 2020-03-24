import React from "react";
import { FaEdit, FaTools } from "react-icons/fa";
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

const EditingForms = () => (
	<TextContainer>
		<InfoText>
			To edit a form (A/P form), go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/forms/viewall?page=1"
				target="_blank"
			>
				View Forms
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
			<FaEdit style={{ ...iconStyle, marginRight: 5 }} />
			<span>Edit</span>
		</Button>
		&nbsp;
		<InfoText>(Edit) button. Edit any of the fields and click the</InfoText>
		&nbsp;
		<Button
			primary
			width="140px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Update Form
		</Button>
		&nbsp;
		<InfoText>
			button to update the A/P form. By design, A/P forms will automatically
			aggregate events within the <strong>Enrollment Month</strong> dates,
			therefore, as long as an event&#39;s date is between this date range,
			they&#39;ll be automatically added to the A/P Form.
		</InfoText>
	</TextContainer>
);

export default EditingForms;
