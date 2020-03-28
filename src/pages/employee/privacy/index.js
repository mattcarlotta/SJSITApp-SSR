import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import ViewPrivacy from "~containers/Body/ViewPrivacy";

const PrivacyPage = () => <ViewPrivacy />;

export default requiresBasicCredentials(PrivacyPage);
