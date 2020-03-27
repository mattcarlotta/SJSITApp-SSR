import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";
import ViewSettings from "~containers/Body/ViewSettings";
import { fetchMemberSettings } from "~actions/Members";

const SettingsPage = () => (
	<AppLayout>
		<ViewSettings />
	</AppLayout>
);

SettingsPage.getInitialProps = async ctx => {
	const {
		store: { dispatch },
	} = ctx;
	dispatch(fetchMemberSettings(ctx));

	return {};
};

export default requiresBasicCredentials(SettingsPage);
