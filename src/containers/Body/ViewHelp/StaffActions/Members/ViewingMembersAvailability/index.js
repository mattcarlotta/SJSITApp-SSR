import React from "react";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import WarningText from "~components/Body/WarningText";
import Link from "~components/Navigation/Link";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingMembersAvailability = () => (
	<TextContainer>
		<InfoText>
			To view the current month&#39;s members&#39; availability percentage, go
			to the
		</InfoText>
		&nbsp;
		<Link blue style={linkStyle} href="/employee/dashboard" target="_blank">
			Dashboard
		</Link>
		&nbsp;
		<InfoText>
			page and underneath the <strong>Availability</strong> tab you will see the
			members&#39; availability for that particular month&#39;s A/P form.
		</InfoText>
		<WarningText>
			Be advised that the availability will only show up if there is at least 1
			registered member and there is at least 1 event within that A/P form&#39;s
			start and end month dates.
		</WarningText>
	</TextContainer>
);

export default ViewingMembersAvailability;
