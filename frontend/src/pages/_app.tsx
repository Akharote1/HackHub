import '../../styles/globals.css'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import Head from "next/head";
import { SSRProvider } from "react-bootstrap";
import Layout from '../components/common/Layout';

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ||
    ((page) => {
      return (
        <SSRProvider>
          <Layout>{page}</Layout>
        </SSRProvider>
      );
    });

  return (
    <>
      <Head>
        <title>HackHub</title>
        <style>{dom.css()}</style>
      </Head>
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer />
    </>
  )
}

export default MyApp
