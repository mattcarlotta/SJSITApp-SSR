import MockAdapter from "axios-mock-adapter";
import axios from "utils/axiosConfig";

const mockApp = new MockAdapter(axios);

export default mockApp;
