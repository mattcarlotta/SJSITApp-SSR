import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";
import ContactForm from "~containers/Forms/Mail/ContactForm";

const ContactUs = () => (
	<AppLayout>
		<ContactForm />
	</AppLayout>
);

export default requiresBasicCredentials(ContactUs);
