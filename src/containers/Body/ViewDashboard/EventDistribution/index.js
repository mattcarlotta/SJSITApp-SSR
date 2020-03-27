import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import { connect } from "react-redux";
import { Card, Col, DatePicker } from "antd";
import { FaChartBar } from "react-icons/fa";
import { fetchEventDistribution } from "~actions/Dashboard";
import MemberEventCountChart from "~components/Body/MemberEventCountChart";
import columns from "../Columns";

const RangePicker = DatePicker.RangePicker;

const newcolumns = {
	...columns,
	xl: 24,
	xxl: 24,
};

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

export class EventDistribution extends Component {
	state = {
		startDate: moment().startOf("month"),
		endDate: moment().endOf("month"),
	};

	handleSelection = dates => {
		const [startDate, endDate] = dates;
		this.setState({ startDate, endDate }, () =>
			this.props.fetchEventDistribution({
				startDate: startDate.format(),
				endDate: endDate.format(),
			}),
		);
	};

	render = () => (
		<Col className="event-distribution-panel" {...newcolumns}>
			<Card
				bodyStyle={{ minHeight: "500px" }}
				title={
					<>
						<FaChartBar style={iconStyle} />
						<span css="vertical-align: middle;">Event Distribution</span>
					</>
				}
				extra={
					<RangePicker
						allowClear={false}
						format="MM/DD/YYYY"
						className="dashboard-range-picker"
						value={[this.state.startDate, this.state.endDate]}
						onChange={this.handleSelection}
					/>
				}
			>
				<MemberEventCountChart height="650px" {...this.props} />
			</Card>
		</Col>
	);
}

EventDistribution.propTypes = {
	members: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			"Event Count": PropTypes.number,
		}),
	),
	fetchEventDistribution: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	members: state.dashboard.eventCounts,
	loggedinUserId: state.auth.id,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	fetchEventDistribution,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDistribution);
