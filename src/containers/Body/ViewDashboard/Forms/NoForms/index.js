import React from "react";
import { MdAssignment } from "react-icons/md";
import FlexCenter from "components/Body/FlexCenter";

const NoForms = () => (
	<FlexCenter style={{ color: "#909090", flexDirection: "column" }}>
		<p css="margin: 60px 0 0 0;padding: 0;">
			<MdAssignment style={{ fontSize: 70 }} />
		</p>
		<p css="margin: 0;padding: 0;">No form this month</p>
	</FlexCenter>
);

export default NoForms;
