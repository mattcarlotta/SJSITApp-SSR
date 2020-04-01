import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import ContactForm from "~containers/Forms/Mail/ContactForm";

const ContactUsPage = () => <ContactForm />;

export default requiresBasicCredentials(ContactUsPage);
