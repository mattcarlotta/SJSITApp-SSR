import React from "react";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import Link from "~components/Navigation/Link";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingAllEvents = () => (
	<TextContainer>
		<InfoText>
			To view all available events (games, promotionals, or misc.), go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/events/viewall?page=1"
				target="_blank"
			>
				View Events
			</Link>{" "}
			page.
		</InfoText>
	</TextContainer>
);

export default ViewingAllEvents;
