import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";
import axios from 'axios'
import { Link } from "react-router-dom";

axios.defaults.baseURL = 'http://localhost:3000';

//Import Countdown
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span>You are good to go!</span>;
  } else {
    // Render a countdown
    return (
      <>
        <div className="coming-box">
          {days}
          <span>Days</span>
        </div>
        <div className="coming-box">
          {hours}
          <span>Hours</span>
        </div>
        <div className="coming-box">
          {minutes}
          <span>Minutes</span>
        </div>
        <div className="coming-box">
          {seconds}
          <span>Seconds</span>
        </div>
      </>
    );
  }
};

const Section = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get(`/api/members`)
        .then(response => setMembers(response.data.members))
        .catch(error => console.error('Error fetching members:', error));
}, []);
  return (
    <React.Fragment>
        <div>
            <h1>Members</h1>
            <ul>
                {members.map((member, index) => (
                    <li key={index}>{member}</li>
                ))}
            </ul>
        </div>
      <section className="section hero-section bg-ico-hero" id="home">
        <div className="bg-overlay bg-primary" />
        <Container>
          <Row className="align-items-center">
            <Col lg="12">
              <div className="text-white-50">
                <h1 className="text-white font-weight-semibold mb-3 hero-title">
                  Optumus Careers
                </h1>
                <p className="font-size-14">
                  Let's find you the right job at Optumus
                </p>

                <div className="d-flex flex-wrap gap-2 mt-4">


                  <Link to="#" className="btn btn-success me-1">
                    Explore Careers
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Section;
