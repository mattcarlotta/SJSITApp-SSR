import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import ContactForm from "~containers/Forms/Mail/ContactForm";

const ContactUs = () => <ContactForm />;

export default requiresBasicCredentials(ContactUs);
