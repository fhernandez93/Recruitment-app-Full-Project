import React from "react"
import { Container, Row } from "reactstrap"

//Import Components
import CardBox from "./card-box"

const CardsMini = () => {
  const coins = [
    {
      title: "Software Engineering",
      color: "warning",
      icon: "mdi mdi-check",
      value: "Front End Developer",
      rate: "Description of the job here.",  
      isIncrease: true,
    },
    {
      title: "Data & Analytics",
      color: "warning",
      icon: "mdi mdi-check",
      value: "Power BI Analyst",
      rate: "Description of the job here.",  
      isIncrease: true,
    },
    {
      title: "Software Engineering",
      color: "warning",
      icon: "mdi mdi-check",
      value: "Front End Developer",
      rate: "Description of the job here.",  
      isIncrease: true,
    },
    {
      title: "Data & Analytics",
      color: "warning",
      icon: "mdi mdi-check",
      value: "Power BI Analyst",
      rate: "Description of the job here.",  
      isIncrease: true,
    },
    {
      title: "Software Engineering",
      color: "warning",
      icon: "mdi mdi-check",
      value: "Front End Developer",
      rate: "Description of the job here.",  
      isIncrease: true,
    },
    {
      title: "Data & Analytics",
      color: "warning",
      icon: "mdi mdi-check",
      value: "Power BI Analyst",
      rate: "Description of the job here.",  
      isIncrease: true,
    },
    {
      title: "Software Engineering",
      color: "warning",
      icon: "mdi mdi-check",
      value: "Front End Developer",
      rate: "Description of the job here.",  
      isIncrease: true,
    },
    {
      title: "Data & Analytics",
      color: "warning",
      icon: "mdi mdi-check",
      value: "Power BI Analyst",
      rate: "Description of the job here.",  
      isIncrease: true,
    },
    {
      title: "Software Engineering",
      color: "warning",
      icon: "mdi mdi-check",
      value: "Front End Developer",
      rate: "Description of the job here.",  
      isIncrease: true,
    },
    {
      title: "Data & Analytics",
      color: "warning",
      icon: "mdi mdi-check",
      value: "Power BI Analyst",
      rate: "Description of the job here.",  
      isIncrease: true,
    },
    {
      title: "Software Engineering",
      color: "warning",
      icon: "mdi mdi-check",
      value: "Front End Developer",
      rate: "Description of the job here.",  
      isIncrease: true,
    },
    {
      title: "Data & Analytics",
      color: "warning",
      icon: "mdi mdi-check",
      value: "Power BI Analyst",
      rate: "Description of the job here.",  
      isIncrease: true,
    },
  ]

  return (
    <React.Fragment>
      <section className="section bg-white p-0">
        <Container>
          <div className="currency-price">
            <Row>
              {/* reder card boxes */}
              <CardBox coins={coins} />
            </Row>
          </div>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default CardsMini
