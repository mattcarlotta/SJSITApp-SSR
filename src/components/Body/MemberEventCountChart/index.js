/* eslint-disable react/jsx-boolean-value */
import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { ResponsiveBar } from "@nivo/bar";
import { FaChartBar } from "react-icons/fa";
import CalendarContainer from "~components/Body/CalendarContainer";
import FadeIn from "~components/Body/FadeIn";
import FlexCenter from "~components/Body/FlexCenter";

const MemberEventCountChart = ({ height, members, style }) =>
	!isEmpty(members) ? (
		<div css="height: 650px;width: 100%;padding-left: 18px;padding-right: 35px;">
			<div css="height: 100%;width: 100%;background-color: #fff;border-radius: 3px;">
				<ResponsiveBar
					data={members}
					margin={{ top: 60, right: 40, bottom: 250, left: 80 }}
					indexBy="name"
					keys={["Event Count"]}
					motionStiffness={180}
					motionDamping={13}
					axisLeft={{
						legend: "Number of Events",
						legendPosition: "middle",
						legendOffset: -70,
						tickValues: 2,
					}}
					axisBottom={{
						tickRotation: -90,
						legend: "Employee Name",
						legendPosition: "middle",
						legendOffset: 220,
					}}
					labelTextColor="#fefefe"
					colors={{ scheme: "set2" }}
					colorBy="index"
					theme={{
						axis: {
							legend: {
								text: {
									fill: "#bbb",
									fontSize: 16,
								},
							},
							ticks: {
								text: {
									fill: "#888",
									fontSize: 16,
								},
							},
						},
						grid: {
							line: {
								stroke: "#d1d1d1",
								strokeWidth: 2,
								strokeDasharray: "4 4",
							},
						},
					}}
				/>
			</div>
		</div>
	) : (
		<FadeIn timing="0.3s">
			<CalendarContainer height={height} style={{ display: "flex", ...style }}>
				<FlexCenter
					style={{ color: "#909090", flexDirection: "column", marginTop: 5 }}
				>
					<p css="margin: 0;padding: 0;">
						<FaChartBar style={{ fontSize: 70 }} />
					</p>
					<p css="margin: 0;padding: 0;">No event data</p>
				</FlexCenter>
			</CalendarContainer>
		</FadeIn>
	);

MemberEventCountChart.propTypes = {
	members: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			"Event Count": PropTypes.number,
		}),
	),
	height: PropTypes.string,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default MemberEventCountChart;
/* eslint-enable react/jsx-boolean-value */
