import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const CreateMember = () => <div>Create Member</div>;

export default requiresStaffCredentials(CreateMember);
