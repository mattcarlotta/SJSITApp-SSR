import React from "react";
import { MdAssignment } from "react-icons/md";
import FlexCenter from "~components/Body/FlexCenter";

const NoForms = () => (
	<FlexCenter
		style={{
			color: "#909090",
			flexDirection: "column",
			background: "#f7f6f6",
			height: 252,
			border: "1px solid rgba(12, 137, 157, 0.4)",
		}}
	>
		<p css="margin: 0;padding: 0;">
			<MdAssignment style={{ fontSize: 70 }} />
		</p>
		<p css="margin: 0;padding: 0;">No form this month</p>
	</FlexCenter>
);

export default NoForms;
