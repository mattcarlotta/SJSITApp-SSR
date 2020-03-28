import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const CreateEvent = () => <div>Create Event</div>;

export default requiresStaffCredentials(CreateEvent);
