import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const ViewEvents = () => <div>View All Events</div>;

export default requiresStaffCredentials(ViewEvents);
