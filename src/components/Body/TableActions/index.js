/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import Router from "next/router";
import { Popconfirm } from "antd";
import {
	FaCheckSquare,
	FaExclamationCircle,
	FaEdit,
	FaShareSquare,
	FaTrash,
	FaSearchPlus,
	FaClipboardCheck,
} from "react-icons/fa";
import Button from "~components/Body/Button";
import Spacer from "~components/Body/Spacer";

const iconStyle = {
	position: "relative",
	top: 2,
};

const TableActions = ({
	assignLocation,
	deleteAction,
	editLocation,
	handleClickAction,
	handleDeleteRecords,
	push,
	record,
	selectedRowKeys,
	sendMail,
	viewLocation,
}) => (
	<Fragment>
		{assignLocation && (
			<Fragment>
				<Button
					primary
					padding="3px 0 0 0"
					marginRight="0px"
					onClick={() =>
						Router.push(`/employee/${assignLocation}/assign/${record._id}`)
					}
				>
					<FaClipboardCheck style={{ ...iconStyle, fontSize: 17 }} />
					&nbsp;
					<span>Schedule</span>
				</Button>
				<Spacer />
			</Fragment>
		)}
		{viewLocation && (
			<Fragment>
				<Button
					primary
					padding="3px 0 0 0"
					marginRight="0px"
					onClick={() =>
						Router.push(`/employee/${viewLocation}/view/${record._id}`)
					}
				>
					<FaSearchPlus style={{ ...iconStyle, fontSize: 16 }} />
					&nbsp;
					<span>View</span>
				</Button>
				<Spacer />
			</Fragment>
		)}
		{editLocation && (
			<Fragment>
				<Button
					primary
					padding="3px 0px 0 3px"
					marginRight="0px"
					onClick={() =>
						Router.push(`/employee/${editLocation}/edit/${record._id}`)
					}
				>
					<FaEdit style={iconStyle} />
					&nbsp;
					<span>Edit</span>
				</Button>
				<Spacer />
			</Fragment>
		)}
		{sendMail && (
			<Fragment>
				<Button
					primary
					padding="3px 0 0 0"
					marginRight="0px"
					onClick={() => handleClickAction(sendMail, record)}
				>
					<FaShareSquare style={{ ...iconStyle, fontSize: 18 }} />
					&nbsp;
					<span>Send</span>
				</Button>
				<Spacer />
			</Fragment>
		)}
		{deleteAction && (
			<Fragment>
				<Popconfirm
					placement="top"
					title="Are you sure? This action is irreversible."
					icon={
						<span className="anticon">
							<FaExclamationCircle style={{ color: "red" }} />
						</span>
					}
					onConfirm={() => handleClickAction(deleteAction, record)}
				>
					<Button danger padding="5px 0 1px 0" marginRight="0px">
						<FaTrash style={{ ...iconStyle, fontSize: 16 }} />
						&nbsp;
						<span>Delete</span>
					</Button>
				</Popconfirm>
				<Spacer />
			</Fragment>
		)}
		{!isEmpty(selectedRowKeys) && (
			<Popconfirm
				placement="top"
				title="Are you sure? This action is irreversible."
				icon={
					<span className="anticon">
						<FaExclamationCircle style={{ color: "red" }} />
					</span>
				}
				onConfirm={() => handleDeleteRecords(selectedRowKeys)}
			>
				<Button padding="5px 0 1px 0" marginRight="0px">
					<FaCheckSquare
						style={{ ...iconStyle, fontSize: 16, color: "#1890ff" }}
					/>
					&nbsp;
					<span>Delete</span>
				</Button>
			</Popconfirm>
		)}
	</Fragment>
);

TableActions.propTypes = {
	assignLocation: PropTypes.string,
	deleteAction: PropTypes.func,
	editLocation: PropTypes.string,
	handleClickAction: PropTypes.func.isRequired,
	handleDeleteRecords: PropTypes.func.isRequired,
	record: PropTypes.any.isRequired,
	selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
	sendMail: PropTypes.func,
	viewLocation: PropTypes.string,
};

export default TableActions;
/* eslint-enable react/forbid-prop-types */
