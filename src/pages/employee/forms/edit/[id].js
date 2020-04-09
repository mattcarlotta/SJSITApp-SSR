import React from "react";
import EditForm from "~containers/Forms/Form/EditForm";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import app from "~utils/axiosConfig";
import { resetForms, setFormToEdit } from "~actions/Forms";
import { parseCookie, parseData } from "~utils/parseResponse";

const EditFormPage = () => <EditForm />;

EditFormPage.getInitialProps = async ({ store: { dispatch }, req, query }) => {
	const headers = parseCookie(req);
	const { id } = query;

	try {
		dispatch(resetForms());

		let res = await app.get(`form/edit/${id}`, headers);
		const forms = parseData(res);

		res = await app.get("seasons/all/ids", headers);
		const seasons = parseData(res);

		dispatch(
			setFormToEdit({
				...forms.form,
				seasonIds: seasons.seasonIds,
			}),
		);
	} catch (e) {
		return { serverError: e.toString() };
	}

	return {};
};

export default requiresStaffCredentials(EditFormPage);
