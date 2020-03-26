import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import moment from "moment-timezone";
import Router from "next/router";
import { Button as AntButton, DatePicker, Select } from "antd";
import { FaCalendarPlus } from "react-icons/fa";
import Button from "~components/Body/Button";
import CollapseFlex from "~components/Body/CollapseFlex";
import FilterButton from "~components/Body/FilterButton";
import FlexEnd from "~components/Body/FlexEnd";
import FlexStart from "~components/Body/FlexStart";

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const format = "MM-DD-YYYY";

const EventFilters = ({ clearFilters, queries, push, teams, updateQuery }) => {
	const startDate = queries.startDate
		? moment(queries.startDate, format)
		: null;
	const endDate = queries.endDate ? moment(queries.endDate, format) : null;

	return (
		<CollapseFlex>
			<FlexStart>
				<div css="margin-right: 5px;font-size: 15px;width: 65px;">
					Filter by:
				</div>
				<FilterButton
					id="event-date"
					content={
						<RangePicker
							className="filter-range-picker"
							value={[startDate, endDate]}
							format={format}
							onChange={value =>
								updateQuery({
									page: 1,
									startDate: !isEmpty(value) ? value[0].format(format) : null,
									endDate: !isEmpty(value) ? value[1].format(format) : null,
								})
							}
						/>
					}
					title="Event Date"
					value={startDate}
				/>
				<FilterButton
					id="event-type"
					content={
						<Select
							allowClear
							value={queries.type}
							placeholder="Select an event type..."
							style={{ width: 140 }}
							onChange={value => updateQuery({ page: 1, type: value })}
						>
							<Option value="game">Game</Option>
							<Option value="promotional">Promotional</Option>
							<Option value="other">Other</Option>
						</Select>
					}
					title="Event Type"
					value={queries.type}
				/>
				<FilterButton
					id="team"
					content={
						<Select
							allowClear
							value={queries.team}
							placeholder="Select a team..."
							style={{ width: 140 }}
							onChange={value => updateQuery({ page: 1, team: value })}
						>
							<Option value="sharks">Sharks</Option>
							<Option value="barracuda">Barracuda</Option>
						</Select>
					}
					title="Team"
					value={queries.team}
				/>
				<FilterButton
					id="opponent"
					content={
						<Select
							allowClear
							value={queries.opponent}
							placeholder="Select an opponent..."
							style={{ width: 250 }}
							onChange={value => updateQuery({ page: 1, opponent: value })}
						>
							{!isEmpty(teams) ? (
								teams.map(team => (
									<Option key={team} value={team}>
										{team}
									</Option>
								))
							) : (
								<Option value="disabled" disabled>
									(none found)
								</Option>
							)}
						</Select>
					}
					title="Opponent"
					value={queries.opponent}
				/>
				<FilterButton
					id="sent-emails"
					content={
						<Select
							allowClear
							value={queries.sentEmailReminders}
							placeholder="Select an email status..."
							style={{ width: 140 }}
							onChange={value =>
								updateQuery({ page: 1, sentEmailReminders: value })
							}
						>
							<Option value="sent">Sent</Option>
							<Option value="unsent">Unsent</Option>
						</Select>
					}
					title="Email Status"
					value={queries.sentEmailReminders}
				/>
				<AntButton
					id="clear-filters"
					style={{ height: 41 }}
					onClick={clearFilters}
				>
					Clear All
				</AntButton>
			</FlexStart>
			<FlexEnd>
				<Button
					primary
					className="add-event"
					width="180px"
					marginRight="0px"
					padding="5px 10px"
					onClick={() => Router.push("/employee/events/create")}
				>
					<FaCalendarPlus
						style={{ position: "relative", top: 1, fontSize: 16 }}
					/>
					&nbsp; Add Event
				</Button>
			</FlexEnd>
		</CollapseFlex>
	);
};

EventFilters.propTypes = {
	clearFilters: PropTypes.func.isRequired,
	queries: PropTypes.shape({
		endDate: PropTypes.string,
		opponent: PropTypes.string,
		sentEmailReminders: PropTypes.string,
		startDate: PropTypes.string,
		team: PropTypes.string,
		type: PropTypes.string,
	}),
	push: PropTypes.func.isRequired,
	updateQuery: PropTypes.func.isRequired,
	teams: PropTypes.arrayOf(PropTypes.string),
};

export default EventFilters;
