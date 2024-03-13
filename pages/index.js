import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { userAtom } from "@/store";
import { useAtomValue } from "jotai";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const userData = useAtomValue(userAtom);
  let loggedIn = userData && userData.email ? true : false;

  return (
    <div style={{height:'100%'}}>
      <Head>
        <title>Careo</title>
        <meta name="description" content="Your Self-Care Superhero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image width='1920' height='600' style={{position: 'fixed', objectFit: 'cover', maxWidth:'100%'}} src="/assets/brown-bottles.jpg" alt="Makeup Bottles" priority />
      
      <div style={{top: '30px', display:'grid', justifyContent:'center', position: 'relative', color: 'white', fontSize: 96, fontFamily: 'Crimson Text'}}>
        <center><span>Careo</span></center>
        <center><span>Your Self-care Superhero</span></center> {/*change font?*/}
        </div>
      <section style={{display:'grid', justifyContent: 'center', position: 'relative', top: '350px', bottom: '115px'}}>
        <Link href='/sign-up'><center><Button className={`${styles.register}`}>Register Here</Button></center></Link>
        <p style={{marginTop:'10px',fontSize: '24px'}}>Already have an account? <Link style={{color:'green'}}href="/login">Log In</Link>.</p>
      </section>
    </div>
  );
}
 