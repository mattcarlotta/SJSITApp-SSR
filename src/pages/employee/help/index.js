import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import ViewHelp from "~containers/Body/ViewHelp";

const HelpPage = () => <ViewHelp />;

export default requiresBasicCredentials(HelpPage);
