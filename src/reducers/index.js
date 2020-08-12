/* istanbul ignore file */
import { combineReducers } from "redux";
import * as types from "~types";
import authReducer from "./Auth";
import dashboardReducer from "./Dashboard";
import eventReducer from "./Events";
import formReducer from "./Forms";
import mailReducer from "./Mail";
import memberReducer from "./Members";
import seasonReducer from "./Seasons";
import serverMessageReducer from "./Messages";
import teamsReducer from "./Teams";

const reducers = {
	auth: authReducer,
	dashboard: dashboardReducer,
	events: eventReducer,
	forms: formReducer,
	mail: mailReducer,
	members: memberReducer,
	seasons: seasonReducer,
	server: serverMessageReducer,
	teams: teamsReducer,
};

const rootReducer = combineReducers(reducers);

const combinedReducers = (state, action) =>
	rootReducer(action.type === types.USER_SIGNOUT ? undefined : state, action);

export default combinedReducers;
