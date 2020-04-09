import React from "react";
import NewForm from "~containers/Forms/Form/NewForm";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import app from "~utils/axiosConfig";
import { parseCookie, parseData } from "~utils/parseResponse";
import { setSeasonsIds } from "~actions/Seasons";

const CreateFormPage = () => <NewForm />;

CreateFormPage.getInitialProps = async ({ store: { dispatch }, req }) => {
	try {
		const res = await app.get("seasons/all/ids", parseCookie(req));
		const data = parseData(res);

		dispatch(setSeasonsIds(data));
	} catch (e) {
		return { serverError: e.toString() };
	}

	return {};
};

export default requiresStaffCredentials(CreateFormPage);
