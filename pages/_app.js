import '@/styles/bootstrap.min.css'; //Theme used is cyborg theme from bootswatch.com
import "@/styles/globals.css";
import { Provider } from "jotai";
import Header from "@/components/Header";

// Config dotenv as early as possible
require('dotenv').config();

export default function App({ Component, pageProps }) {
  return (
    <Provider>
        <Header />
        <Component {...pageProps} />
    </Provider>
    );
}
