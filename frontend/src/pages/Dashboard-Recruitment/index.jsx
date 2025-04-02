import React, { useEffect } from "react"
import { Container, Row, Col } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import CardUser from "./card-user"
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
import PositionsFilled from "./positions-filled"
import ChartAnalytics from "./chart-analytics"
import TotalSellingProduct from "./total-selling-product"
import Tasks from "./tasks"
import ChatBox from "./chat-box"

const DashboardRecruitment = props => {
  const reports = [
    {
      icon: "bx bx-file-blank",
      title: "Positions Open",
      value: "130",
      badgeValue: "+ 0.2%",
      color: "success",
      desc: "From previous period",
    },
    {
      icon: "bx bx-user",
      title: "Total Candidates",
      value: "500",
      badgeValue: "+ 0.2%",
      color: "success",
      desc: "From previous period",
    },
    {
      icon: "bx bx-conversation",
      title: "Interviews Scheduled",
      value: "25",
      badgeValue: "0%",
      color: "warning",
      desc: "From previous period",
    },
  ];

  //meta title
  document.title="Recruitment Dashboard | Optumus Suite ";
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="" breadcrumbItem="Recruitment" />

          <Row>
            {/* welcome card */}
            <CardWelcome />

            <Col xl="8">
              <Row>
                {/*mimi widgets */}
                <MiniWidget reports={reports} />
              </Row>
            </Col>
          </Row>

          <Row>
            {/* earning */}
            <PositionsFilled />

            {/* sales anytics */}
            <ChartAnalytics />
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default DashboardRecruitment
