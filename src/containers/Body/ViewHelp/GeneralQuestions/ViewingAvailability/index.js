import React from "react";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import Link from "~components/Navigation/Link";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingAvailability = () => (
	<TextContainer>
		<InfoText>To view your month to month availability, go to the</InfoText>
		&nbsp;
		<Link blue style={linkStyle} href="/employee/settings" target="_blank">
			Settings
		</Link>
		&nbsp;
		<InfoText>
			page and click on the <strong>Availability</strong> tab -- you can change
			the <strong>Month</strong> and/or <strong>Year</strong> to reflect which
			month and year you&#39;d wish to view. The pie chart displays your
			responses and availability for the selected month&#39;s A/P form and the
			bar chart displays the amount of games that you were scheduled for versus
			the amount of available home games.
		</InfoText>
		<br />
		<br />
		<InfoText>
			To view your current month&#39;s availability percentage, go to the
		</InfoText>
		&nbsp;
		<Link blue style={linkStyle} href="/employee/dashboard" target="_blank">
			Dashboard
		</Link>
		&nbsp;
		<InfoText>
			page and underneath the <strong>Availabilty</strong> tab will be your
			current month&#39;s availability percentage.
		</InfoText>
	</TextContainer>
);

export default ViewingAvailability;
