import Cookies from "universal-cookie";
import axios from "axios";

const SERVER_BASE_URL = "http://213.136.88.20:17120/";
const LOCAL_SERVER_URL = "http://127.0.0.1:17120/";

const cookies = new Cookies();

const getAuthToken = () => {
	const token = cookies.get("token");
	if (token) {
		return "Bearer " + token;
	}
	return undefined;
};

const baseURL = LOCAL_SERVER_URL;

const axiosClient = axios.create({
	baseURL: baseURL,
	headers: {
		Authorization: getAuthToken(),
	},
});

export default axiosClient;
