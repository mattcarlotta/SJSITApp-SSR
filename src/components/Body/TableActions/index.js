/* eslint-disable react/forbid-prop-types */
import React from "react";
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
	top: 1,
};

const TableActions = ({
	assignLocation,
	deleteAction,
	editLocation,
	handleClickAction,
	handleDeleteRecords,
	record,
	selectedRowKeys,
	sendMail,
	viewLocation,
}) => (
	<>
		{assignLocation && (
			<>
				<Button
					primary
					dataTest="assign-location"
					padding="3px 0 0 0"
					marginRight="0px"
					onClick={() =>
						Router.push(
							`/employee/${assignLocation}/assign/[id]`,
							`/employee/${assignLocation}/assign/${record._id}`,
						)
					}
				>
					<FaClipboardCheck style={{ ...iconStyle, fontSize: 17 }} />
					&nbsp;
					<span>Schedule</span>
				</Button>
				<Spacer />
			</>
		)}
		{viewLocation && (
			<>
				<Button
					primary
					dataTest="view-location"
					padding="3px 0 0 0"
					marginRight="0px"
					onClick={() =>
						Router.push(
							`/employee/${viewLocation}/view/[id]`,
							`/employee/${viewLocation}/view/${record._id}`,
						)
					}
				>
					<FaSearchPlus style={{ ...iconStyle, fontSize: 16 }} />
					&nbsp;
					<span>View</span>
				</Button>
				<Spacer />
			</>
		)}
		{editLocation && (
			<>
				<Button
					primary
					dataTest="edit-location"
					padding="3px 0px 0 3px"
					marginRight="0px"
					onClick={() =>
						Router.push(
							`/employee/${editLocation}/edit/[id]`,
							`/employee/${editLocation}/edit/${record._id}`,
						)
					}
				>
					<FaEdit style={iconStyle} />
					&nbsp;
					<span>Edit</span>
				</Button>
				<Spacer />
			</>
		)}
		{sendMail && (
			<>
				<Button
					primary
					dataTest="send-mail"
					padding="3px 0 0 0"
					marginRight="0px"
					onClick={() => handleClickAction(sendMail, record)}
				>
					<FaShareSquare style={{ ...iconStyle, fontSize: 18 }} />
					&nbsp;
					<span>Send</span>
				</Button>
				<Spacer />
			</>
		)}
		{deleteAction && (
			<>
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
					<Button
						dataTest="delete-item"
						danger
						padding="5px 0 1px 0"
						marginRight="0px"
					>
						<FaTrash style={{ ...iconStyle, fontSize: 16 }} />
						&nbsp;
						<span>Delete</span>
					</Button>
				</Popconfirm>
				<Spacer />
			</>
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
				<Button
					dataTest="delete-many-items"
					padding="5px 0 1px 0"
					marginRight="0px"
					style={{
						textShadow: "none",
					}}
				>
					<FaCheckSquare
						style={{ ...iconStyle, fontSize: 16, color: "#1890ff" }}
					/>
					&nbsp;
					<span>Delete</span>
				</Button>
			</Popconfirm>
		)}
	</>
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
