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

const AuthorizationFilters = ({ clearFilters, queries, push, updateQuery }) => (
	<CollapseFlex>
		<FlexStart>
			<div css="margin-right: 5px;font-size: 15px; width: 65px;">
				Filter by:
			</div>
			<FilterButton
				id="email-registration"
				content={
					<Select
						allowClear
						value={queries.email}
						placeholder="Select a status..."
						style={{ width: 150 }}
						onChange={value => updateQuery({ page: 1, email: value })}
					>
						<Option value="registered">Registered</Option>
						<Option value="unregistered">Unregistered</Option>
					</Select>
				}
				title="Registration Status"
				value={queries.email}
			/>
			<FilterButton
				id="authorized-email"
				content={
					<FilterInput
						name="authorizedEmail"
						placeholder="email"
						value={queries.authorizedEmail}
						updateQuery={updateQuery}
					/>
				}
				title="Authorized Email"
				value={queries.authorizedEmail}
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
				className="add-member"
				primary
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

AuthorizationFilters.propTypes = {
	clearFilters: PropTypes.func.isRequired,
	queries: PropTypes.shape({
		authorizedEmail: PropTypes.string,
		email: PropTypes.string,
		role: PropTypes.string,
	}),
	push: PropTypes.func.isRequired,
	updateQuery: PropTypes.func.isRequired,
};

export default AuthorizationFilters;
