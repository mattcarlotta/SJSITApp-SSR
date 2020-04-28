import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { connect } from "react-redux";
import { Card, Col } from "antd";
import { FaUserClock } from "react-icons/fa";
import LoadingPanel from "~components/Body/LoadingPanel";
import MemberAvailabilityAverage from "~components/Body/MemberAvailabilityAverage";
import moment from "~utils/momentWithTZ";
import columns from "../Columns";

moment.tz.setDefault("America/Los_Angeles");

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

const format = "MMM Do";

export const Availability = props => (
	<Col {...columns}>
		<Card
			style={{ marginBottom: 0 }}
			bodyStyle={{ minHeight: "300px" }}
			title={
				<>
					<FaUserClock style={iconStyle} />
					<span css="vertical-align: middle;">Availability</span>
				</>
			}
			extra={
				!isEmpty(props.months) ? (
					<span css="color: #fff; font-size: 16px;">
						{moment(props.months[0]).format(format)} -{" "}
						{moment(props.months[1]).format(format)}
					</span>
				) : null
			}
		>
			{props.isLoading ? (
				<LoadingPanel />
			) : (
				<MemberAvailabilityAverage {...props} />
			)}
		</Card>
	</Col>
);

Availability.propTypes = {
	eventAvailability: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			label: PropTypes.string,
			value: PropTypes.number,
		}),
	),
	months: PropTypes.arrayOf(PropTypes.string),
	isLoading: PropTypes.bool.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = ({ dashboard }) => ({
	eventAvailability: dashboard.eventAvailability.data,
	months: dashboard.eventAvailability.months,
	isLoading: dashboard.eventAvailability.isLoading,
});

export default connect(mapStateToProps)(Availability);
