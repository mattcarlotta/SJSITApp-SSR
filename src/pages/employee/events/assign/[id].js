import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const ScheduleEvent = () => <div>Schedule Event</div>;

export default requiresStaffCredentials(ScheduleEvent);
