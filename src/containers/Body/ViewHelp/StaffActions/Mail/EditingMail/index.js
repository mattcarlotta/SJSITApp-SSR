import React from "react";
import { FaEdit, FaRegTimesCircle, FaTools } from "react-icons/fa";
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

const EditingMail = () => (
	<TextContainer>
		<InfoText>
			To edit mail, go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/mail/viewall?page=1"
				target="_blank"
			>
				View Mail
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
			width="80px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Preview
		</Button>
		&nbsp;
		<InfoText>
			button to preview what the email will look like before sending it out. To
			ensure consistency, the message will be automatically wrapped in a
			pre-defined email template. If you&#39;re statisified with the final look,
			then click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="55px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Send
		</Button>
		&nbsp;
		<InfoText>button to save the email.</InfoText>
		<br />
		<br />
		<InfoText>
			If a <strong>Send Date</strong> was provided and has already past, you can
			either remove the date by hovering over the <strong>Send Date</strong>{" "}
			field and clicking the{" "}
			<FaRegTimesCircle style={{ ...iconStyle, color: "red", fontSize: 20 }} />{" "}
			button or by selecting a later date. If the <strong>Send Date</strong> is
			left empty, the email will be sent out immediately.
		</InfoText>
	</TextContainer>
);

export default EditingMail;
