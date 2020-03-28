import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const SendMail = () => <div>Send Mail</div>;

export default requiresStaffCredentials(SendMail);
