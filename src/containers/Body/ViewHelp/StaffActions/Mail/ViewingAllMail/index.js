import React from "react";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import Link from "~components/Navigation/Link";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingAllMail = () => (
	<TextContainer>
		<InfoText>
			To view all available mail, go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/mail/viewall?page=1"
				target="_blank"
			>
				View Mail
			</Link>{" "}
			page.
		</InfoText>
	</TextContainer>
);

export default ViewingAllMail;
