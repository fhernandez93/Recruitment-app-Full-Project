import React from "react";
import { Card, CardBody, Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// import Component
import CatalogLeftBar from "./CatalogLeftBar";
import CatalogList from "./CatalogList";
import RecentComponent from "./RecentComponent";
import ComponentStorage from "./ComponentStorage";

const Index = () => {

   //meta title
   document.title="File Manager | Optumus Suite ";

  const series = [76]
  const options = {
    chart: {
      height: 150,
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#556ee6"],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
        },

        hollow: {
          size: "60%",
        },

        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "16px",
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    stroke: {
      dashArray: 3,
    },
    labels: ["ComponentStorage"],
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Apps" breadcrumbItem="File Manager" />
          <div className="d-xl-flex">
            <div className="w-100">
              <div className="d-md-flex">
                {/* FileRightBar  */}
                <CatalogLeftBar />
                <div className="w-100">
                  <Card>
                    <CardBody>
                      <CatalogList />
                      <RecentComponent />
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
            <ComponentStorage options={options} series={series} />
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default Index
