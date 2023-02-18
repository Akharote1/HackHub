import Cookies from "universal-cookie";
import axios from "axios";

const SERVER_BASE_URL = "http://213.136.88.20:17120/";
const LOCAL_SERVER_URL = "http://127.0.0.1:17120/";
const DJANGO_URL = "https://672e-49-32-152-89.in.ngrok.io";

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

export const axiosDjangoClient = axios.create({
	baseURL: DJANGO_URL,
	headers: {
		Authorization: getAuthToken(),
	},
});

export default axiosClient;
