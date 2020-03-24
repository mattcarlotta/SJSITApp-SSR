import React from "react";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import Link from "~components/Navigation/Link";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewMemberAuthorizations = () => (
	<TextContainer>
		<InfoText>
			To view all member authorizations (as well as their registration status),
			go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/members/authorizations/viewall?page=1"
				target="_blank"
			>
				View Authorizations
			</Link>{" "}
			page.
		</InfoText>
	</TextContainer>
);

export default ViewMemberAuthorizations;
