import React from "react";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import Link from "~components/Navigation/Link";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingSchedule = () => (
	<TextContainer>
		<InfoText>To view the month to month schedule, go to the</InfoText>
		&nbsp;
		<Link blue style={linkStyle} href="/employee/schedule" target="_blank">
			Schedule
		</Link>
		&nbsp;
		<InfoText>
			page. By default, the <strong>All Games</strong> option will selected,
			which will showcase all available home games within the specified month
			and year.
		</InfoText>
	</TextContainer>
);

export default ViewingSchedule;
