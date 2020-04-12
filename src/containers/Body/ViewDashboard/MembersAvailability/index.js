import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import isEmpty from "lodash.isempty";
import { connect } from "react-redux";
import { Card, Col } from "antd";
import { FaUserClock } from "react-icons/fa";
import Bold from "~components/Body/Bold";
import Flex from "~components/Body/Flex";
import FlexEnd from "~components/Body/FlexEnd";
import FlexStart from "~components/Body/FlexStart";
import Float from "~components/Body/Float";
import List from "~components/Body/List";
import ListItem from "~components/Body/ListItem";
import LoadingPanel from "~components/Body/LoadingPanel";
import NoAvailability from "~components/Body/NoAvailability";
import columns from "../Columns";

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

const listItemStyle = {
	fontSize: 16,
	paddingLeft: 5,
};

const listStyle = {
	height: 215,
	overflowY: "auto",
	padding: "0 5px",
	backgroundColor: "#f7f6f6",
	borderLeft: "1px solid rgba(12, 137, 157, 0.4)",
	borderRight: "1px solid rgba(12, 137, 157, 0.4)",
	borderBottom: "1px solid rgba(12, 137, 157, 0.4)",
};

const tableHeader = {
	background:
		"linear-gradient(90deg,#12454e 0%,rgb(16,116,131) 50%,#12454e 100%)",
	color: "#fff",
	padding: "5px",
	borderTopLeftRadius: 3,
	borderTopRightRadius: 3,
	fontSize: 18,
};

const format = "MM/DD/YYYY";

export const MembersAvailability = ({
	membersAvailability,
	months,
	isLoading,
}) => (
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
				!isEmpty(months) ? (
					<span css="color: #fff; font-size: 16px;">
						{moment(months[0]).format(format)} -{" "}
						{moment(months[1]).format(format)}
					</span>
				) : null
			}
		>
			{isLoading ? (
				<LoadingPanel />
			) : !isEmpty(membersAvailability) ? (
				<>
					<Flex style={tableHeader}>
						<FlexStart
							style={{ marginLeft: 5, marginBottom: "0px !important" }}
						>
							Employee
						</FlexStart>
						<FlexEnd style={{ marginRight: 5, textAlign: "right" }}>
							Availability &#40;%&#41;
						</FlexEnd>
					</Flex>
					<List style={listStyle}>
						{membersAvailability.map(({ id, availability }, key) => (
							<ListItem
								key={id}
								style={{
									...listItemStyle,
									backgroundColor: key % 2 ? "#d8d8d8" : "transparent",
								}}
							>
								<Bold>{id}</Bold>
								<Float direction="right" style={{ paddingRight: 5 }}>
									{availability}&#37;
								</Float>
							</ListItem>
						))}
					</List>
				</>
			) : (
				<NoAvailability />
			)}
		</Card>
	</Col>
);

MembersAvailability.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	membersAvailability: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			availability: PropTypes.number,
		}),
	),
	months: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = ({ dashboard }) => ({
	isLoading: dashboard.membersAvailability.isLoading,
	membersAvailability: dashboard.membersAvailability.data,
	months: dashboard.membersAvailability.months,
});

export default connect(mapStateToProps)(MembersAvailability);
