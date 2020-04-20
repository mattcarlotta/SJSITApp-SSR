import React from "react";
import PropTypes from "prop-types";
import { MdEvent, MdEventNote } from "react-icons/md";
import FlexCenter from "~components/Body/FlexCenter";

const NoEvents = ({ selectedToday }) => (
	<FlexCenter
		style={{ color: "#909090", flexDirection: "column", marginTop: 5 }}
	>
		<p data-test="no-events" css="margin: 0;padding: 0;">
			{!selectedToday ? (
				<MdEventNote style={{ fontSize: 70 }} />
			) : (
				<MdEvent style={{ fontSize: 70 }} />
			)}
		</p>
		<p css="margin: 0;padding: 0;text-align: center;">
			{!selectedToday ? "No upcoming scheduled events" : "No events today"}
		</p>
	</FlexCenter>
);

NoEvents.propTypes = {
	selectedToday: PropTypes.bool.isRequired,
};

export default NoEvents;
