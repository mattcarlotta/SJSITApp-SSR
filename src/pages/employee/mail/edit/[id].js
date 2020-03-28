import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const EditMail = () => <div>Edit Mail</div>;

export default requiresStaffCredentials(EditMail);
