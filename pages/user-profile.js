import Head from "next/head";
import { useState, useEffect } from "react";
//import { useAtom } from 'jotai';
import {Container, Col, Row, Card, Button, FormControl, FormCheck, Form} from "react-bootstrap";
//import ListGroup from 'react-bootstrap/ListGroup';
import { Inter } from "next/font/google";
import TabNavigation from "@/components/TabNavigation";
import Image from 'next/image';
//import { conditionsAtom } from "@/store";
//import { userAtom } from "@/store";
import { getUserData } from "@/lib/userData";
//import { useRouter } from "next/router";
//import profile_icon from "/assets/profile_icon.png";
import profile_icon from "../public/assets/profile_icon.png";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store";

const inter = Inter({ subsets: ["latin"] });

export default function UserProfile() {
  const userData = useAtomValue(userAtom);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState();

  useEffect(() => {
    const getConditions = async () => {
        const data = await getUserData().then((value) => {
            return value?.conditions;
        });
        setSelectedConditions(data);
    };

    const getCriteria = async () => {
        const data = await getUserData().then((value) => {
            return ((value?.useBudget) ? "[Budget: $" + value?.budget + "], " : "") + ((value?.vegan) ? "[Vegan], " : "") + ((value?.crueltyFree) ? "[Cruelty Free]" : "");

        });
        setSelectedCriteria(data);
    };

    getConditions();
    getCriteria();

  }, []);

  // Array of JSX objects in the selected conditions view
  let selected = [];
  for (let i = 0; i < selectedConditions.length; i++) {
    selected.push(
      <div key={i}>
        <span style={{display: "flex", justifyContent: "space-between"}}>
          <p>{selectedConditions[i]}</p>
        </span> 
        <hr />
      </div>
    );
  }

  //This does similar listing as above. Leaving here for potential future use   
  /*for (let i = 0; i < selectedConditions.length; i++) {
    selected.push(
        <ListGroupItem key={i}>{selectedConditions[i]}</ListGroupItem>
    );
  }*/

  return (
    <>
      <Head>
        <title>Care Profile</title>
        <meta name="description" content="Your Self-Care Superhero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <div style={{textAlign:"center"}} id="hero-text">
          <h1>Your Care Profile</h1>
          <br />
        </div>
        <br/>
        <Container fluid style={{marginBottom:"5em"}}>
          <Row style={{minHeight: "25em", marginLeft: "1%", marginRight: "1%"}}>
            <Col className="mx-auto condition-card">
              <Row>
                <Card text="light" className="overflow-auto" style={{minHeight: "auto", maxHeight: "auto", background: "#FFFFFF", padding: "1em"}}> 
                  <Card.Title>Selected Conditions</Card.Title>
                  <hr></hr>
                  {selected}
                </Card>
                <Card text="light" className="overflow-auto" style={{minHeight: "auto", maxHeight: "auto", background: "#FFFFFF", padding: "1em"}}>
                  <Card.Title>Product criteria</Card.Title>
                  <hr></hr>
                  {selectedCriteria}
                </Card>
              </Row>
            </Col>
          </Row>
          <br /><br />
          <Row className="mx-auto" style={{maxWidth: "25em"}}>
            <Button>View Saved Lists</Button>
            <hr></hr>
            <Button>Update User Conditions</Button>
          </Row>
        </Container>
      </main>
    </>
  );
}