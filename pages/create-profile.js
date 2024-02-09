import Head from "next/head";
import { useState, useEffect } from "react";
import {atom, useAtom} from 'jotai';
import {Container, Col, Row, Card, Button, FormSelect, FormCheck, Form} from "react-bootstrap";
import { Inter } from "next/font/google";
import { conditionsAtom, profileAtom } from "@/store";

const inter = Inter({ subsets: ["latin"] });

// props.conditions must be an array of strings
export default function CreateProfile(props) {
  const [conditions, setConditions] = useAtom(conditionsAtom);
  const [profile, setProfile] = useAtom(profileAtom);
  const [listConditions, setListConditions] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  let age = 18;
  let vegan = false;
  let crueltyFree = false;
  let budget = 100;
  let budgetBool = false;

  // Populate the list of conditions
  // setListConditions(props.conditions);
  useEffect(() => {
    if (listConditions.length === 0 && selectedConditions.length === 0) {
      setListConditions(conditions);
    }
  }, [listConditions, conditions, selectedConditions]);
  //setListConditions(test_conditions);

  // Array of JSX objects in the list of conditions view
  let list = [];
  for (let i = 0; i < listConditions.length; i++) {
    list.push(
      <div key={i}>
        <span style={{display: "flex", justifyContent: "space-between"}}>
          <p>{listConditions[i]}</p>
          <Button variant="success" onClick={() => {addCondition(i)}}>Add</Button>
        </span> 
        <hr />
      </div>
    );
  }

  // Array of JSX objects in the selected conditions view
  let selected = [];
  for (let i = 0; i < selectedConditions.length; i++) {
    selected.push(
      <div key={i}>
        <span style={{display: "flex", justifyContent: "space-between"}}>
          <p>{selectedConditions[i]}</p>
          <Button variant="outline-danger" onClick={() => {removeCondition(i)}}>X</Button>
        </span> 
        <hr />
      </div>

    );
  }

  let ages = [];
  for (let i = 18; i < 120; i++) {
    ages.push(<option key={i} value={i}>{i}</option>)
  }

  // // Renders the page whenever a condition is added or removed.
  // useEffect(() => {
  // },[listConditions]);

  // Check for population of conditions
  // if (!props.conditions) {
  //   return (<p>Error loading conditions, please try refreshing the app.<br/> We are sorry for the inconvenience.</p>);
  // }

  // Add new condition to the list of selected conditions
  function addCondition(conditionIndex) {
    if (listConditions.length > 0) {
      setSelectedConditions([listConditions[conditionIndex], ...selectedConditions]);
      let newArr = Array.from(listConditions);
      newArr.splice(conditionIndex, 1);
      setListConditions(newArr);
    }
  }

  // Remove a condition from the selected list
  function removeCondition(conditionIndex) {
    let newArr = Array.from(selectedConditions);
    const con = selectedConditions[conditionIndex];
    newArr.splice(conditionIndex, 1);
    setSelectedConditions(newArr);
    setListConditions([con, ...listConditions]);
  }

  function setBudget(val) {
    budget = isNan(val) ? parseInt(val) : budget;
  }

  function formSubmit() {
    let p = {};
    p.conditions = selectedConditions;
    p.age = age;
    p.budget = budgetBool ? budget : -1;
    p.vegan = vegan;
    p.crueltyFree = crueltyFree;
    console.log(JSON.stringify(p));
  }

  return (
    <>
      <Head>
        <title>Create Care Profile</title>
        <meta name="description" content="Your Self-Care Superhero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <div style={{textAlign:"center"}} id="hero-text">
          <h1>Create Care Profile</h1>
          <br />
          <p>Please select your conditions from the list below</p>
        </div>
        <br/>
        <Container fluid style={{marginBottom:"5em"}}>
          <Row style={{minHeight: "25em", maxHeight: "25em", marginLeft: "1%", marginRight: "1%"}}>
            <Col className="mx-auto" style={{minHeight: "25em", maxHeight: "25em", maxWidth:"50em"}}>
              <Row>
                <Card text="light" className="overflow-auto" style={{minHeight: "25em", maxHeight: "25em", background: "#FFFFFF", padding: "1em"}}> 
                  <Card.Title>All</Card.Title>
                  <hr></hr>
                  {list}
                </Card>
              </Row>
            </Col>
            <Col className="mx-auto" style={{minHeight: "25em", maxHeight: "25em", maxWidth:"50em"}}>
              <Card text="light" className="overflow-auto" style={{minHeight: "25em", maxHeight: "25em", background: "#FFFFFF", padding: "1em"}}> 
                <Card.Title>Selected</Card.Title>
                <hr></hr>
                {selected}
              </Card>
            </Col>
          </Row>
          <br /><br />
          <Row className="mx-auto" style={{maxWidth: "50em"}}>
            <span style={{display: "flex", justifyContent: "center"}}>
              <h5 style={{marginRight: "2em"}}>Your Age: </h5>
              <FormSelect onChange={(e) => age = e.currentTarget.value}>
                {ages}
              </FormSelect>
            </span>
          </Row>
          <br />
          <Row className="mx-auto" style={{maxWidth: "50em"}}>
            <span style={{display: "flex", justifyContent: "center"}}>
              <FormCheck label="Only display vegan products" onChange={() => vegan = !vegan}>
              </FormCheck>
            </span>
          </Row>
          <br />
          <Row className="mx-auto" style={{maxWidth: "50em"}}>
            <span style={{display: "flex", justifyContent: "center"}}>
              <FormCheck label="Only display cruelty-free products" onChange={() => crueltyFree = !crueltyFree}>
              </FormCheck>
            </span>
          </Row>
          <br />
          <Row className="mx-auto" style={{maxWidth: "50em"}}>
            <span style={{display: "flex", justifyContent: "center"}}>
              <FormCheck label="Set max budget" onChange={() => budgetBool = !budgetBool}>
              </FormCheck>
              <Form.Control type="number" onChange={(e) => setBudget(e.currentTarget.value)}>

              </Form.Control>
            </span>
          </Row>
          <br /><br />
          <Row className="mx-auto" style={{maxWidth: "25em"}}>
            <Button onClick={formSubmit}>Create</Button>
          </Row>
        </Container>
      </main>
    </>
  );
}