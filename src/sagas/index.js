import { all } from "redux-saga/effects";
import authSagas from "./Auth";
import dashboardSagas from "./Dashboard";
import eventsSagas from "./Events";
import formsSagas from "./Forms";
import mailSagas from "./Mail";
import membersSagas from "./Members";
import seasonsSagas from "./Seasons";
import teamsSagas from "./Teams";

export default function* rootSaga() {
	yield all([
		authSagas(),
		dashboardSagas(),
		eventsSagas(),
		formsSagas(),
		mailSagas(),
		membersSagas(),
		seasonsSagas(),
		teamsSagas(),
	]);
}
