import { SessionProvider } from "next-auth/react";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Layout from "../components/layout/layout";

import "../styles/globals.css";
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

export default function MyApp({ Component, pageProps }) {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </AlertProvider>
  );
}
