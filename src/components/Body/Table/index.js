/* eslint-disable react/forbid-prop-types, react/jsx-boolean-value */
import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { Popover } from "antd";
import { FaTools } from "react-icons/fa";
import dynamic from "next/dynamic";
import Button from "~components/Body/Button";
import FadeIn from "~components/Body/FadeIn";
import FlexCenter from "~components/Body/FlexCenter";
import LoadingTable from "~components/Body/LoadingTable";
import TableActions from "~components/Body/TableActions";

const Table = dynamic(() => import("antd/es/table"), {
	ssr: false,
});

class CustomTable extends Component {
	state = {
		selectedRowKeys: [],
		isMounted: false,
	};

	componentDidMount = () => {
		this.handlePageOverflowRedirect();
		this.setState({ isMounted: true });
	};

	shouldComponentUpdate = (nextProps, nextState) =>
		nextProps.isLoading !== this.props.isLoading ||
		nextProps.queries !== this.props.queries ||
		nextProps.queryString !== this.props.queryString ||
		nextState.isMounted !== this.state.isMounted ||
		nextState.selectedRowKeys !== this.state.selectedRowKeys;

	componentDidUpdate = prevProps => {
		const { isLoading } = this.props;

		if (prevProps.isLoading !== isLoading && !isLoading)
			this.handlePageOverflowRedirect();
	};

	handlePageOverflowRedirect = () => {
		if (isEmpty(this.props.data) && this.props.totalDocs > 0)
			this.props.updateQuery({ page: Math.ceil(this.props.totalDocs / 10) });
	};

	handleClickAction = (action, record) => action(record._id);

	handleDeleteRecords = selectedRowKeys => {
		this.setState({ selectedRowKeys: [] }, () => {
			this.props.deleteManyRecords(selectedRowKeys);
		});
	};

	handleSelectChange = selectedRowKeys => {
		this.setState({ selectedRowKeys });
	};

	createTableColumns = () => {
		const tableColumns = this.props.columns.map(props => ({
			...props,
		}));

		tableColumns.push({
			title: "Actions",
			key: "action",
			render: (_, record) => (
				<Popover
					placement="bottom"
					title={<FlexCenter>Available Actions</FlexCenter>}
					content={
						<TableActions
							{...this.props}
							{...this.state}
							record={record}
							handleClickAction={this.handleClickAction}
							handleDeleteRecords={this.handleDeleteRecords}
						/>
					}
					trigger="click"
				>
					<Button
						dataTest="table-actions"
						padding="3px"
						marginRight="0px"
						onClick={null}
					>
						<FaTools style={{ position: "relative", top: 2 }} />
					</Button>
				</Popover>
			),
			fixed: "right",
			width: 100,
		});

		return tableColumns;
	};

	render = () =>
		this.props.isLoading || !this.state.isMounted ? (
			<LoadingTable />
		) : (
			<FadeIn timing="0.4s">
				<Table
					columns={this.createTableColumns()}
					dataSource={this.props.data}
					rowSelection={
						typeof this.props.rowSelection !== "undefined"
							? this.props.rowSelection
							: {
									selectedRowKeys: this.state.selectedRowKeys,
									onChange: this.handleSelectChange,
							  }
					}
					pagination={{
						position: "bottom",
						current: this.props.queries.page,
						showTotal: /* istanbul ignore next */ total => (
							<span>{total}&nbsp;items</span>
						),
						total: this.props.totalDocs,
					}}
					bordered={true}
					rowKey="_id"
					scroll={{ x: 1300 }}
					onChange={
						/* istanbul ignore next */ ({ current: page }) =>
							this.props.updateQuery({ page })
					}
				/>
			</FadeIn>
		);
}

CustomTable.propTypes = {
	assignLocation: PropTypes.string,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			dataIndex: PropTypes.string.isRequired,
			key: PropTypes.string.isRequired,
			render: PropTypes.func,
		}),
	).isRequired,
	data: PropTypes.any.isRequired,
	isLoading: PropTypes.bool.isRequired,
	queries: PropTypes.any,
	queryString: PropTypes.string,
	rowSelection: PropTypes.bool,
	location: PropTypes.any,
	deleteAction: PropTypes.func,
	deleteManyRecords: PropTypes.func,
	editLocation: PropTypes.string,
	fetchData: PropTypes.func.isRequired,
	sendMail: PropTypes.func,
	totalDocs: PropTypes.number,
	viewLocation: PropTypes.string,
	updateQuery: PropTypes.func.isRequired,
};

export default CustomTable;
/* eslint-enable react/forbid-prop-types, react/jsx-boolean-value */
