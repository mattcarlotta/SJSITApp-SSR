import React from "react";
import PropTypes from "prop-types";
import { Button as AntButton, Select } from "antd";
import { FaUserPlus } from "react-icons/fa";
import Button from "~components/Body/Button";
import CollapseFlex from "~components/Body/CollapseFlex";
import FilterButton from "~components/Body/FilterButton";
import FilterInput from "~components/Body/FilterInput";
import FlexEnd from "~components/Body/FlexEnd";
import FlexStart from "~components/Body/FlexStart";

const Option = Select.Option;

const MembersFilters = ({ clearFilters, queries, push, updateQuery }) => (
	<CollapseFlex>
		<FlexStart>
			<div css="margin-right: 5px;font-size: 15px; width: 65px;">
				Filter by:
			</div>
			<FilterButton
				id="status"
				content={
					<Select
						allowClear
						value={queries.status}
						placeholder="Select an account status..."
						style={{ width: 210 }}
						onChange={value => updateQuery({ page: 1, status: value })}
					>
						<Option value="active">Active</Option>
						<Option value="suspended">Suspended</Option>
					</Select>
				}
				title="Account Status"
				value={queries.status}
			/>
			<FilterButton
				id="role"
				content={
					<Select
						allowClear
						value={queries.role}
						placeholder="Select a role..."
						style={{ width: 130 }}
						onChange={value => updateQuery({ page: 1, role: value })}
					>
						<Option value="staff">Staff</Option>
						<Option value="employee">Employee</Option>
					</Select>
				}
				title="Role"
				value={queries.role}
			/>
			<FilterButton
				id="email"
				content={
					<FilterInput
						name="email"
						placeholder="email"
						value={queries.email}
						updateQuery={updateQuery}
					/>
				}
				title="Email"
				value={queries.email}
			/>
			<FilterButton
				id="first-name"
				content={
					<FilterInput
						name="firstName"
						placeholder="first name"
						value={queries.firstName}
						updateQuery={updateQuery}
					/>
				}
				title="First Name"
				value={queries.firstName}
			/>
			<FilterButton
				id="last-name"
				content={
					<FilterInput
						name="lastName"
						placeholder="last name"
						value={queries.lastName}
						updateQuery={updateQuery}
					/>
				}
				title="Last Name"
				value={queries.lastName}
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
				className="add-member"
				width="180px"
				marginRight="0px"
				padding="5px 10px"
				onClick={() => push("/employee/members/create")}
			>
				<FaUserPlus style={{ position: "relative", top: 2 }} />
				&nbsp; Add Member
			</Button>
		</FlexEnd>
	</CollapseFlex>
);

MembersFilters.propTypes = {
	clearFilters: PropTypes.func.isRequired,
	queries: PropTypes.shape({
		email: PropTypes.string,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		role: PropTypes.string,
		status: PropTypes.string,
	}),
	push: PropTypes.func.isRequired,
	updateQuery: PropTypes.func.isRequired,
};

export default MembersFilters;
