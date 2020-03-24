import React from "react";
import Float from "components/Body/Float";
import AccountButton from "~containers/Auth/AccountButton";

const RightMenu = props => (
	<Float
		style={{
			marginLeft: "auto",
			overflow: "hidden",
		}}
		direction="right"
	>
		<AccountButton {...props} />
	</Float>
);

export default RightMenu;
