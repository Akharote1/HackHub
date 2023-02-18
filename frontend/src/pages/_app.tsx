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
import { useEffect } from "react";

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

	useEffect(() => {
		(function(d, m){
			var kommunicateSettings = 
					{"appId":"f089d4937e608c1f3034c2ba42c3bd8f","popupWidget":true,"automaticChatOpenOnNavigation":true};
			var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
			s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
			var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
			window.kommunicate = m; m._globals = kommunicateSettings;
		})(document, window.kommunicate || {});
	}, []);

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
