import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const CreateSeason = () => <div>Create Season</div>;

export default requiresStaffCredentials(CreateSeason);
