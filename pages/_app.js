import '@/styles/bootstrap.min.css'; //Theme used is cyborg theme from bootswatch.com
import "@/styles/globals.css";

// Config dotenv as early as possible
require('dotenv').config();

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
