import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const EditEvent = () => <div>Edit Event</div>;

export default requiresStaffCredentials(EditEvent);
