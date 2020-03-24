import React from "react";
import { FaTrash, FaTools } from "react-icons/fa";
import Button from "~components/Body/Button";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import WarningText from "~components/Body/WarningText";
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

const DeletingMembers = () => (
	<TextContainer>
		<InfoText>
			To delete a member, go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/members/viewall?page=1"
				target="_blank"
			>
				View Members
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
			(Delete) button. A pop up will confirm your selection and will remove the
			member upon confirmation.
		</InfoText>
		<WarningText>
			Be advised that deleting a member will remove them from all their
			scheduled events and will remove their recorded A/P form responses. If you
			wish to retain their recorded A/P form responses, then suspend the member
			instead of deleting them.
		</WarningText>
	</TextContainer>
);

export default DeletingMembers;
