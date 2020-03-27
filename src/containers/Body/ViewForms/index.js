import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "antd";
import { FaFileSignature } from "react-icons/fa";
import Head from "~components/Navigation/Head";
import Table from "~components/Body/Table";
import QueryHandler from "~components/Navigation/QueryHandler";
import {
	deleteForm,
	deleteManyForms,
	fetchForms,
	resendMail,
} from "~actions/Forms";
import Filters from "./Filters";
import columns from "./Columns";

const title = "Forms";

export const ViewForms = ({
	data,
	deleteForm,
	deleteManyForms,
	fetchForms,
	resendMail,
	...rest
}) => (
	<>
		<Head title={title} />
		<Card
			title={
				<>
					<FaFileSignature
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
							{...rest}
							{...props}
							columns={columns}
							data={data}
							deleteAction={deleteForm}
							deleteManyRecords={deleteManyForms}
							fetchData={fetchForms}
							editLocation="forms"
							viewLocation="forms"
							sendMail={resendMail}
						/>
					</>
				)}
			</QueryHandler>
		</Card>
	</>
);

ViewForms.propTypes = {
	deleteForm: PropTypes.func.isRequired,
	deleteManyForms: PropTypes.func.isRequired,
	fetchForms: PropTypes.func.isRequired,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			seasonId: PropTypes.string,
			startMonth: PropTypes.string,
			endMonth: PropTypes.string,
			expirationDate: PropTypes.string,
			sendEmailNotificationsDate: PropTypes.string,
			sentEmails: PropTypes.bool,
		}),
	),
	isLoading: PropTypes.bool.isRequired,
	resendMail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	data: state.forms.data,
	isLoading: state.forms.isLoading,
	totalDocs: state.forms.totalDocs,
});

const mapDispatchToProps = {
	deleteForm,
	deleteManyForms,
	fetchForms,
	resendMail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewForms);
