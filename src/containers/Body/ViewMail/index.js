import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "antd";
import { FaMailBulk } from "react-icons/fa";
import Head from "~components/Navigation/Head";
import Table from "~components/Body/Table";
import QueryHandler from "~components/Navigation/QueryHandler";
import {
	deleteMail,
	deleteManyMails,
	fetchMails,
	resendMail,
} from "actions/Mail";
import Filters from "./Filters";
import columns from "./Columns";

const title = "Mail";

export const ViewMail = ({
	data,
	deleteMail,
	deleteManyMails,
	fetchMails,
	resendMail,
	...rest
}) => (
	<Fragment>
		<Head title={title} />
		<Card
			title={
				<Fragment>
					<FaMailBulk
						style={{
							verticalAlign: "middle",
							marginRight: 10,
							fontSize: 20,
						}}
					/>
					<span css="vertical-align: middle;">{title}</span>
				</Fragment>
			}
		>
			<QueryHandler {...rest}>
				{props => (
					<Fragment>
						<Filters {...props} {...rest} />
						<Table
							{...rest}
							{...props}
							columns={columns}
							data={data}
							deleteAction={deleteMail}
							deleteManyRecords={deleteManyMails}
							editLocation="mail"
							fetchData={fetchMails}
							sendMail={resendMail}
						/>
					</Fragment>
				)}
			</QueryHandler>
		</Card>
	</Fragment>
);

ViewMail.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.any,
			message: PropTypes.string,
			sendTo: PropTypes.arrayOf(PropTypes.string),
			sendFrom: PropTypes.string,
			sendDate: PropTypes.string,
			status: PropTypes.string,
			subject: PropTypes.string,
		}),
	),
	deleteMail: PropTypes.func.isRequired,
	deleteManyMails: PropTypes.func.isRequired,
	fetchMails: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	resendMail: PropTypes.func.isRequired,
	totalDocs: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
	data: state.mail.data,
	isLoading: state.mail.isLoading,
	totalDocs: state.mail.totalDocs,
});

const mapDispatchToProps = {
	deleteMail,
	deleteManyMails,
	fetchMails,
	resendMail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMail);
