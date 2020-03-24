import React from "react";
import PropTypes from "prop-types";
import { FaEllipsisV, FaReply, FaStar } from "react-icons/fa";
import Bold from "~components/Body/Bold";
import FormatDate from "~components/Body/FormatDate";

const iconStyle = {
	fontSize: 10,
	marginLeft: 10,
};

const RenderSendFrom = ({ sendDate, sendFrom }) => (
	<tr>
		<td css="width: 100%;">
			<table css="width: 100%;">
				<tbody>
					<tr>
						<td>
							<Bold>
								{sendFrom ? (
									sendFrom.replace(/ <.*?>/g, "")
								) : (
									<span id="invalidsendingaddress" css="color: red;">
										Invalid Sending Address&nbsp;
									</span>
								)}
							</Bold>
							{sendFrom.includes("<") && (
								<span id="sendfromaddress" css="font-size: 16px;">
									{sendFrom.substring(sendFrom.indexOf("<"))}
									&nbsp;
								</span>
							)}
							<a
								css="color: #222;font-size: 16px;"
								rel="noopener noreferrer"
								target="_blank"
								href="https://support.google.com/mail/answer/1311182?hl=en"
								ghelpcontext="long_header"
							>
								via
							</a>
							<span css="font-size: 16px;">&nbsp;sendgrid.net&nbsp;</span>
						</td>
					</tr>
				</tbody>
			</table>
		</td>
		<td css="white-space: nowrap;">
			<FormatDate
				date={sendDate}
				format="MMM DD, YYYY, hh:mm a"
				style={{ fontSize: 16, display: "inline" }}
			/>
			<FaStar style={iconStyle} />
			<FaReply style={iconStyle} />
			<FaEllipsisV style={iconStyle} />
		</td>
	</tr>
);

RenderSendFrom.propTypes = {
	sendFrom: PropTypes.string,
	sendDate: PropTypes.string,
};

export default RenderSendFrom;
