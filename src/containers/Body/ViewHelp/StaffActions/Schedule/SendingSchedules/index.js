import React from "react";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import WarningText from "~components/Body/WarningText";

const SendingSchedules = () => (
	<TextContainer>
		<InfoText>
			If there are scheduled events for a particular month, then monthly
			schedules will automatically be generated and sent out on the{" "}
			<strong>25th of each prior month</strong>. For example, events that have
			been scheduled for the month of December, will be sent out on November
			25th. Any events that do not have at least one member assigned to them,
			will not be included in the schedule.
		</InfoText>
		<WarningText>
			Be advised that this service is automated and expects the schedule to
			completed by the 25th of each month. Missing this deadline may result in
			missing/incomplete schedules being emailed.
		</WarningText>
	</TextContainer>
);

export default SendingSchedules;
