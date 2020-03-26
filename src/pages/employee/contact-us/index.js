import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";

const ContactUs = () => (
	<AppLayout>
		<div>Contact Us</div>
	</AppLayout>
);

export default requiresBasicCredentials(ContactUs);
