import React from "react";
import ViewApForm from "~containers/Forms/Form/ViewApForm";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import app from "~utils/axiosConfig";
import { parseCookie, parseData } from "~utils/parseResponse";
import { resetForms, setFormAp } from "~actions/Forms";

const ViewAPFormPage = () => <ViewApForm />;

ViewAPFormPage.getInitialProps = async ({
	store: { dispatch },
	query,
	req,
}) => {
	const { id } = query;

	try {
		dispatch(resetForms());

		const res = await app.get(`form/view/${id}`, parseCookie(req));
		const data = parseData(res);

		dispatch(setFormAp(data));
	} catch (e) {
		return { serverError: e.toString() };
	}

	return {};
};

export default requiresBasicCredentials(ViewAPFormPage);
