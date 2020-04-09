import React from "react";
import EditSeasonForm from "~containers/Forms/Season/EditSeasonForm";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import app from "~utils/axiosConfig";
import { parseCookie, parseData } from "~utils/parseResponse";
import { resetSeasons, setSeasonToEdit } from "~actions/Seasons";

const EditSeasonsPage = () => <EditSeasonForm />;

EditSeasonsPage.getInitialProps = async ({
	store: { dispatch },
	req,
	query,
}) => {
	const { id } = query;
	const headers = parseCookie(req);

	try {
		dispatch(resetSeasons());

		const res = await app.get(`season/edit/${id}`, headers);
		const data = parseData(res);
		dispatch(setSeasonToEdit(data));
	} catch (e) {
		return { serverError: e.toString() };
	}

	return {};
};

export default requiresStaffCredentials(EditSeasonsPage);
