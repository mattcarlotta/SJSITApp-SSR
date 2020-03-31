import React from "react";
import NewMemberForm from "~containers/Forms/Member/NewMemberForm";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const CreateMemberPage = () => <NewMemberForm />;

export default requiresStaffCredentials(CreateMemberPage);
