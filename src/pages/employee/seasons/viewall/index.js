import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const ViewSeasons = () => <div>View All Seasons</div>;

export default requiresStaffCredentials(ViewSeasons);
