import React from "react";
import Button from "~components/Body/Button";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import WarningText from "~components/Body/WarningText";
import Link from "~components/Navigation/Link";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const btnStyle = {
	display: "inline-block",
};

const CreatingSeasons = () => (
	<TextContainer>
		<InfoText>
			To create a season, go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/seasons/create"
				target="_blank"
			>
				Create Season
			</Link>{" "}
			page and fill out the <strong>New Season</strong> form by: Selecting the{" "}
			<strong>Season Duration</strong> (beginning of and end of season) dates.
			Once completed, click the
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
			Create Season
		</Button>
		&nbsp;
		<InfoText>button to create the season.</InfoText>
		<WarningText>
			Be advised that events and forms can&#39;t be created until at least one
			season exists.
		</WarningText>
	</TextContainer>
);

export default CreatingSeasons;
