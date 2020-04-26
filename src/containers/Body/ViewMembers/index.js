import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "antd";
import { FaUsers } from "react-icons/fa";
import Head from "~components/Navigation/Head";
import Table from "~components/Body/Table";
import QueryHandler from "~components/Navigation/QueryHandler";
import {
	deleteMember,
	// deleteManyMembers,
	fetchMembers,
} from "~actions/Members";
import Filters from "./Filters";
import columns from "./Columns";

const title = "Members";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

export const ViewMembers = ({
	data,
	deleteMember,
	// deleteManyMembers,
	fetchMembers,
	...rest
}) => (
	<>
		<Head title={title} />
		<Card
			title={
				<>
					<FaUsers style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</>
			}
		>
			<QueryHandler {...rest}>
				{props => (
					<>
						<Filters {...props} {...rest} />
						<Table
							{...props}
							{...rest}
							columns={columns}
							data={data}
							deleteAction={deleteMember}
							// deleteManyRecords={deleteManyMembers}
							fetchData={fetchMembers}
							viewLocation="members"
							rowSelection={null}
						/>
					</>
				)}
			</QueryHandler>
		</Card>
	</>
);

ViewMembers.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.any,
			role: PropTypes.string,
			status: PropTypes.string,
			registered: PropTypes.string,
			email: PropTypes.string,
			emailReminders: PropTypes.bool,
			firstName: PropTypes.string,
			lastName: PropTypes.string,
		}),
	),
	deleteMember: PropTypes.func.isRequired,
	// deleteManyMembers: PropTypes.func.isRequired,
	fetchMembers: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	totalDocs: PropTypes.number.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	data: state.members.data,
	isLoading: state.members.isLoading,
	totalDocs: state.members.totalDocs,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	deleteMember,
	// deleteManyMembers,
	fetchMembers,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMembers);
