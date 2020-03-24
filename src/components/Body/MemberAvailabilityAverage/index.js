/* eslint-disable react/jsx-boolean-value */
import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { ResponsivePie } from "@nivo/pie";
import NoAvailability from "~components/Body/NoAvailability";

const VALIDCOLORS = ["#2979FF", "#BBBBBB"];
const INVALIDCOLORS = ["#F04D4D", "#BBBBBB"];
const styles = {
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	fontSize: 16,
	color: "#025f6d",
	textAlign: "center",
	pointerEvents: "none",
};

const MemberAvailabilityAverage = ({ eventAvailability }) => {
	const availabilityPercentage = get(eventAvailability[0], ["value"]) || 0;

	return !isEmpty(eventAvailability) ? (
		<div css="height: 250px;width: 250px; margin-left: auto; margin-right: auto; position: relative;">
			<ResponsivePie
				indexBy="id"
				colors={availabilityPercentage >= 75 ? VALIDCOLORS : INVALIDCOLORS}
				data={eventAvailability}
				innerRadius={0.8}
				startAngle={360}
				endAngle={0}
				enableRadialLabels={false}
				enableSlicesLabels={false}
				tooltipFormat={/* istanbul ignore next */ value => `${value}%`}
				animate={true}
				motionStiffness={90}
				motionDamping={15}
			/>
			<div style={styles}>
				<span>{availabilityPercentage}%</span>
				<span>Availability</span>
			</div>
		</div>
	) : (
		<NoAvailability />
	);
};

MemberAvailabilityAverage.propTypes = {
	eventAvailability: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			label: PropTypes.string,
			value: PropTypes.number,
		}),
	),
};

export default MemberAvailabilityAverage;
/* eslint-enable react/jsx-boolean-value */
