import React from "react";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import Link from "~components/Navigation/Link";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingAllSeasons = () => (
	<TextContainer>
		<InfoText>
			To view all available seasons, go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/seasons/viewall?page=1"
				target="_blank"
			>
				View Seasons
			</Link>{" "}
			page.
		</InfoText>
	</TextContainer>
);

export default ViewingAllSeasons;
