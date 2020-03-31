import React from "react";
import NewSeasonForm from "~containers/Forms/Season/NewSeasonForm";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const CreateSeasonPage = () => <NewSeasonForm />;

export default requiresStaffCredentials(CreateSeasonPage);
