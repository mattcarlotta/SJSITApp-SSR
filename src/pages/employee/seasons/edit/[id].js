import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const EditSeason = () => <div>Edit Season</div>;

export default requiresStaffCredentials(EditSeason);
