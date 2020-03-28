import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const CreateForm = () => <div>New AP Form</div>;

export default requiresStaffCredentials(CreateForm);
