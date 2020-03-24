import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { FaCaretSquareDown } from "react-icons/fa";
import { Dropdown, Tooltip } from "antd";
import RenderEmailDetails from "../RenderEmailDetails";

const RenderSendTo = ({ fields }) => {
	const { sendTo } = fields;
	return (
		<tr>
			<td css="display: inline-block; font-size: 16px; max-width: 550px">
				<div css="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
					<span>to&nbsp;</span>
					<span>
						{!isEmpty(sendTo) && sendTo.length > 1 ? (
							sendTo.map((email, key) => (
								<span id="multipleemailaddresses" key={email}>
									{email.replace(
										/ <.*?>/g,
										key < sendTo.length - 1 ? ", " : ".",
									)}
								</span>
							))
						) : sendTo[0] ? (
							<span id="singleemailaddress">
								{sendTo[0].replace(/ <.*?>/g, ".")}
							</span>
						) : (
							<span id="invalidsendtoaddress" css="color:red;">
								Invalid Recipient Address.
							</span>
						)}
					</span>
				</div>
			</td>
			<td css="display: inline-block;">
				&nbsp;
				<Tooltip
					placement="bottom"
					title="Show details"
					style={{ cursor: "pointer" }}
				>
					<Dropdown
						overlay={<RenderEmailDetails {...fields} />}
						trigger={["click"]}
						placement="bottomLeft"
					>
						<FaCaretSquareDown style={{ fontSize: 14 }} />
					</Dropdown>
				</Tooltip>
			</td>
		</tr>
	);
};

RenderSendTo.propTypes = {
	fields: PropTypes.shape({
		message: PropTypes.string,
		sendTo: PropTypes.arrayOf(PropTypes.string),
		sendFrom: PropTypes.string,
		sendDate: PropTypes.string,
		subject: PropTypes.string,
	}),
};

export default RenderSendTo;
