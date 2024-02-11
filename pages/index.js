import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Careo</title>
        <meta name="description" content="Your Self-Care Superhero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className} centered`}>
        <div id="hero-text">
          <h1>Careo</h1>
          <h4>Your Self-Care Superhero</h4>
        </div>
        <Image id="landing-image" width="900" height="900" src="/assets/landing.jpg" alt="Careo Skin Care Products" priority></Image>
        <Link href="/sign-up">
          <Button>Register Now</Button>
        </Link>
        <div id="login-footer" style={{textAlign:"center"}}>Already have an account? <Link href="/login">Log In here.</Link></div>
      </main>
    </>
  );
}
