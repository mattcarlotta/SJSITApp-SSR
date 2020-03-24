import React from "react";
import { FaEdit, FaTools } from "react-icons/fa";
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

const EditingSeasons = () => (
	<TextContainer>
		<InfoText>
			To edit a season, go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/seasons/viewall?page=1"
				target="_blank"
			>
				View Seasons
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
		<InfoText>
			(Edit) button. Edit the <strong>Season Duration</strong> field and click
			the
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
			Update Season
		</Button>
		&nbsp;
		<InfoText>button to save your changes.</InfoText>
		<WarningText>
			Be advised that editing a season will update any events and forms that
			share its Season ID.
		</WarningText>
	</TextContainer>
);

export default EditingSeasons;
