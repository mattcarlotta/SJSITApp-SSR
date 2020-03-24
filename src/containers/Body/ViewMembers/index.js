import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "antd";
import { FaUsers } from "react-icons/fa";
import Head from "~components/Navigation/Head";
import Table from "~components/Body/Table";
import QueryHandler from "~components/Navigation/QueryHandler";
import {
	deleteMember,
	deleteManyMembers,
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
	deleteManyMembers,
	fetchMembers,
	...rest
}) => (
	<Fragment>
		<Head title={title} />
		<Card
			title={
				<Fragment>
					<FaUsers style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</Fragment>
			}
		>
			<QueryHandler {...rest}>
				{props => (
					<Fragment>
						<Filters {...props} {...rest} />
						<Table
							{...props}
							{...rest}
							columns={columns}
							data={data}
							deleteAction={deleteMember}
							deleteManyRecords={deleteManyMembers}
							fetchData={fetchMembers}
							viewLocation="members"
						/>
					</Fragment>
				)}
			</QueryHandler>
		</Card>
	</Fragment>
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
	deleteManyMembers: PropTypes.func.isRequired,
	fetchMembers: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	totalDocs: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
	data: state.members.data,
	isLoading: state.members.isLoading,
	totalDocs: state.members.totalDocs,
});

const mapDispatchToProps = {
	deleteMember,
	deleteManyMembers,
	fetchMembers,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMembers);
