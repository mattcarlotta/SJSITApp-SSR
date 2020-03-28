import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const EditForm = () => <div>Edit Form</div>;

export default requiresStaffCredentials(EditForm);
