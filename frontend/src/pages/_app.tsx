import '../../styles/globals.css'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import Head from "next/head";
import { SSRProvider } from "react-bootstrap";
import DashboardLayout from "../components/common/DashboardLayout";
import { AuthProvider } from "../hooks/AuthContext";
import GeneralLayout from "../components/common/GeneralLayout";

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
	const getLayout =
		Component.getLayout ||
		((page) => {
			return (
				<SSRProvider>
					<GeneralLayout>{page}</GeneralLayout>
				</SSRProvider>
			);
		});

	return (
		<>
			<Head>
				<title>HackHub</title>
				<style>{dom.css()}</style>
			</Head>
			<AuthProvider>
				{getLayout(<Component {...pageProps} />)}
			</AuthProvider>
			<ToastContainer />
		</>
	);
}

export default MyApp
