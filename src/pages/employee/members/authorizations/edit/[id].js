import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const EditAuthorizations = () => <div>Edit Authorizations</div>;

export default requiresStaffCredentials(EditAuthorizations);
