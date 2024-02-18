import { Html, Head, Main, NextScript } from "next/document";
import Image from "next/image";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body>
        <div id="header">
          <Link href="/"><Image width="32" height="32" src="/assets/careo-temp-logo.png" alt="Careo Logo"></Image></Link>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}