import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import FlexEnd from "~components/Body/FlexEnd";
import moment from "~utils/momentWithTZ";

const Option = Select.Option;

const ScheduleHeader = ({
	id,
	handleSelection,
	months,
	role,
	selectedGames,
	selectedMonth,
	selectedYear,
	onChange: updateCalendarDate,
	years,
	value: calendarDate,
}) => {
	const gameOptions =
		role === "employee" ? ["All Games", "My Games"] : ["All Games"];
	return (
		<FlexEnd className="schedule-header">
			{!id && (
				<Select
					size="large"
					onChange={value => {
						handleSelection({
							name: "selectedGames",
							value,
							calendarDate,
							updateCalendarDate,
						});
					}}
					value={selectedGames}
				>
					{gameOptions.map(game => (
						<Option key={game} value={game}>
							{game}
						</Option>
					))}
				</Select>
			)}
			<Select
				size="large"
				onChange={value => {
					handleSelection({
						name: "selectedMonth",
						value,
						calendarDate,
						updateCalendarDate,
					});
				}}
				value={selectedMonth}
			>
				{months.map(month => (
					<Option key={month} value={month}>
						{month}
					</Option>
				))}
			</Select>
			<Select
				size="large"
				value={selectedYear}
				onChange={value => {
					handleSelection({
						name: "selectedYear",
						value,
						calendarDate,
						updateCalendarDate,
					});
				}}
			>
				{years.map(year => (
					<Option key={year} value={year}>
						{year}
					</Option>
				))}
			</Select>
		</FlexEnd>
	);
};

ScheduleHeader.propTypes = {
	id: PropTypes.string,
	handleSelection: PropTypes.func.isRequired,
	months: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func,
	role: PropTypes.string,
	selectedGames: PropTypes.string,
	selectedMonth: PropTypes.string,
	selectedYear: PropTypes.number,
	years: PropTypes.arrayOf(PropTypes.number),
	value: PropTypes.instanceOf(moment),
};

export default ScheduleHeader;
