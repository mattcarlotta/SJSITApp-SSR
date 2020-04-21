import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";
import { Card } from "antd";
import { FaFolderPlus, FaFolderOpen } from "react-icons/fa";
import Head from "~components/Navigation/Head";
import Button from "~components/Body/Button";
import FlexEnd from "~components/Body/FlexEnd";
import Table from "~components/Body/Table";
import QueryHandler from "~components/Navigation/QueryHandler";
import {
	deleteManySeasons,
	deleteSeason,
	fetchSeasons,
} from "~actions/Seasons";
import columns from "./Columns";

const title = "Seasons";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

export const ViewSeasons = ({
	data,
	deleteManySeasons,
	deleteSeason,
	fetchSeasons,
	...rest
}) => (
	<>
		<Head title={title} />
		<Card
			title={
				<>
					<FaFolderOpen style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</>
			}
		>
			<FlexEnd>
				<Button
					dataTest="nav-create-season"
					primary
					width="180px"
					marginRight="0px"
					padding="5px 10px"
					style={{ marginBottom: 20 }}
					onClick={() => Router.push("/employee/seasons/create")}
				>
					<FaFolderPlus style={{ position: "relative", top: 2 }} />
					&nbsp; New Season
				</Button>
			</FlexEnd>
			<QueryHandler>
				{props => (
					<Table
						{...rest}
						{...props}
						columns={columns}
						data={data}
						deleteAction={deleteSeason}
						deleteManyRecords={deleteManySeasons}
						editLocation="seasons"
						fetchData={fetchSeasons}
					/>
				)}
			</QueryHandler>
		</Card>
	</>
);

ViewSeasons.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.any,
			seasonId: PropTypes.string,
			startDate: PropTypes.string,
			endDate: PropTypes.string,
		}),
	),
	deleteManySeasons: PropTypes.func.isRequired,
	deleteSeason: PropTypes.func.isRequired,
	fetchSeasons: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	totalDocs: PropTypes.number.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	data: state.seasons.data,
	isLoading: state.seasons.isLoading,
	totalDocs: state.seasons.totalDocs,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	deleteManySeasons,
	deleteSeason,
	fetchSeasons,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSeasons);
