import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import { Button as AntButton, DatePicker, Select } from "antd";
import { FaPaperPlane } from "react-icons/fa";
import Button from "~components/Body/Button";
import CollapseFlex from "~components/Body/CollapseFlex";
import FilterButton from "~components/Body/FilterButton";
import FlexEnd from "~components/Body/FlexEnd";
import FlexStart from "~components/Body/FlexStart";

const Option = Select.Option;
const format = "MM-DD-YYYY";

const MailFilters = ({ clearFilters, queries, push, updateQuery }) => {
	const sendDate = queries.sendDate ? moment(queries.sendDate, format) : null;

	return (
		<CollapseFlex>
			<FlexStart>
				<div css="margin-right: 5px;font-size: 15px; width: 65px;">
					Filter by:
				</div>
				<FilterButton
					id="send-date"
					content={
						<DatePicker
							allowClear
							format={format}
							className="filter-date-picker"
							value={sendDate}
							placeholder="Select an expiration date..."
							onChange={value =>
								updateQuery({
									page: 1,
									sendDate: value ? value.format(format) : null,
								})
							}
						/>
					}
					title="Send Date"
					value={sendDate}
				/>
				<FilterButton
					id="status"
					content={
						<Select
							allowClear
							value={queries.status}
							placeholder="Select an email status..."
							style={{ width: 195 }}
							onChange={value => updateQuery({ page: 1, status: value })}
						>
							<Option value="sent">Sent</Option>
							<Option value="unsent">Unsent</Option>
						</Select>
					}
					title="Email Status"
					value={queries.status}
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
					className="send-mail"
					width="180px"
					marginRight="0px"
					padding="5px 10px"
					onClick={() => push("/employee/mail/create")}
				>
					<FaPaperPlane style={{ position: "relative", top: 2 }} />
					&nbsp; Send Mail
				</Button>
			</FlexEnd>
		</CollapseFlex>
	);
};

MailFilters.propTypes = {
	clearFilters: PropTypes.func.isRequired,
	queries: PropTypes.shape({
		sendDate: PropTypes.string,
		status: PropTypes.string,
	}),
	push: PropTypes.func.isRequired,
	updateQuery: PropTypes.func.isRequired,
};

export default MailFilters;
