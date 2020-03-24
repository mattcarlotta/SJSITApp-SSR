import React from "react";
import { FaTrash, FaTools } from "react-icons/fa";
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

const DeletingForms = () => (
	<TextContainer>
		<InfoText>
			To delete a form (A/P form), go to the{" "}
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
			danger
			width="100px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			<FaTrash style={{ ...iconStyle, marginRight: 5 }} />
			<span>Delete</span>
		</Button>
		&nbsp;
		<InfoText>
			(delete) button. A pop up will confirm your selection and will remove the
			form upon confirmation. Please note that deleting A/P forms{" "}
			<strong>will not</strong> delete any events found within the enrollment
			month field.
		</InfoText>
	</TextContainer>
);

export default DeletingForms;
