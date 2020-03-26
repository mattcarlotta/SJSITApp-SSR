import React from "react";
import isEmpty from "lodash.isempty";
import PropTypes from "prop-types";
import FormatDate from "~components/Body/FormatDate";
import Flex from "~components/Body/Flex";
import Text from "~components/Body/Text";

const RenderEmailDetails = ({ sendDate, sendFrom, sendTo, subject }) => (
	<div
		className="renderdetails"
		css="background: #fdfdfd; box-shadow: 0 2px 4px rgba(0,0,0,0.2); border: 1px solid rgba(0,0,0,0.2); padding: 10px; max-height: 400px; overflow-y: auto;"
	>
		<Flex>
			<Text
				style={{
					color: "#999",
					textAlign: "right",
					width: 80,
					marginRight: 5,
				}}
			>
				from:&nbsp;
			</Text>
			<Text>
				{sendFrom || (
					<span className="invalidsendfromaddresse" css="color: red;">
						Invalid Sending Address
					</span>
				)}
			</Text>
		</Flex>
		<Flex>
			<Text
				style={{
					color: "#999",
					textAlign: "right",
					width: 80,
					marginRight: 5,
				}}
			>
				to:&nbsp;
			</Text>
			<Text>
				{!isEmpty(sendTo) && sendTo.length > 1
					? sendTo.map((email, key) => (
							<p
								id="multiplerecipients"
								css="margin:0; padding: 0;"
								key={email}
							>
								{key < sendTo.length - 1 ? `${email}, ` : `${email}`}
							</p>
					  ))
					: sendTo[0] || (
							<span className="invalidrecipient" css="color:red;">
								Invalid Recipient Address
							</span>
					  )}
			</Text>
		</Flex>
		<Flex>
			<Text
				style={{
					color: "#999",
					textAlign: "right",
					width: 80,
					marginRight: 5,
				}}
			>
				date:&nbsp;
			</Text>
			<Text>
				<FormatDate
					style={{ display: "inline" }}
					date={sendDate}
					format="MMM DD, YYYY, hh:mm a"
				/>
			</Text>
		</Flex>
		<Flex>
			<Text
				style={{
					color: "#999",
					textAlign: "right",
					width: 80,
					marginRight: 5,
				}}
			>
				subject:&nbsp;
			</Text>
			<Text style={{ width: "85%" }}>
				{subject || (
					<span className="emptysubject" css="color: red;">
						(empty subject)
					</span>
				)}
			</Text>
		</Flex>
	</div>
);

RenderEmailDetails.propTypes = {
	sendTo: PropTypes.arrayOf(PropTypes.string),
	sendFrom: PropTypes.string,
	sendDate: PropTypes.string,
	subject: PropTypes.string,
};

export default RenderEmailDetails;
