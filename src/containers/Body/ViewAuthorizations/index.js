import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "antd";
import { FaKey } from "react-icons/fa";
import Head from "~components/Navigation/Head";
import Table from "~components/Body/Table";
import QueryHandler from "~components/Navigation/QueryHandler";
import {
	deleteToken,
	deleteManyTokens,
	fetchTokens,
	resendToken,
} from "~actions/Members";
import Filters from "./Filters";
import columns from "./Columns";

const title = "Authorizations";

export const ViewAuthorizations = ({
	deleteManyTokens,
	deleteToken,
	fetchTokens,
	resendToken,
	tokens,
	...rest
}) => (
	<>
		<Head title={title} />
		<Card
			title={
				<>
					<FaKey
						style={{
							verticalAlign: "middle",
							marginRight: 10,
							fontSize: 20,
						}}
					/>
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
							data={tokens}
							deleteAction={deleteToken}
							deleteManyRecords={deleteManyTokens}
							fetchData={fetchTokens}
							editLocation="members/authorizations"
							sendMail={resendToken}
						/>
					</>
				)}
			</QueryHandler>
		</Card>
	</>
);

ViewAuthorizations.propTypes = {
	deleteManyTokens: PropTypes.func.isRequired,
	deleteToken: PropTypes.func.isRequired,
	fetchTokens: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	tokens: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.any,
			authorizedEmail: PropTypes.string,
			email: PropTypes.string,
			role: PropTypes.string,
			token: PropTypes.string,
		}),
	),
	resendToken: PropTypes.func.isRequired,
	totalDocs: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
	tokens: state.members.tokens,
	isLoading: state.members.isLoading,
	totalDocs: state.members.totalDocs,
});

const mapDispatchToProps = {
	deleteManyTokens,
	deleteToken,
	fetchTokens,
	resendToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAuthorizations);
