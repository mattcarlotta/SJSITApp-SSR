import React from "react";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import Link from "~components/Navigation/Link";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingAllMembers = () => (
	<TextContainer>
		<InfoText>
			To view all available members, go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/members/viewall?page=1"
				target="_blank"
			>
				View Members
			</Link>{" "}
			page.
		</InfoText>
	</TextContainer>
);

export default ViewingAllMembers;
