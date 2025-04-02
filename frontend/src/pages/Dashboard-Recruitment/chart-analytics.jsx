import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from "react-apexcharts";

const ChartAnalytics = props => {
  const series = [56, 38, 26];
  const options = {
    labels: ["Series A", "Series B", "Series C"],
    colors: ["#556ee6", "#34c38f", "#f46a6a"],
    legend: { show: !1 },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  };

  return (
    <React.Fragment>
      <Col xl="4">
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Position Analytics</h4>

            <div>
              <div id="donut-chart">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="donut"
                  height={260}
                  className="apex-charts"
                />
              </div>
            </div>

            <div className="text-center text-muted">
              <Row>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-primary me-1" /> Forecasted
                    </p>
                    <h5>213</h5>
                  </div>
                </Col>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-success me-1" /> Open
                    </p>
                    <h5>176</h5>
                  </div>
                </Col>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-danger me-1" /> Closed
                    </p>
                    <h5>73</h5>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default ChartAnalytics;
