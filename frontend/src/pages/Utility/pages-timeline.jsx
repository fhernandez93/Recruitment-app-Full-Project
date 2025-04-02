import React, { useState } from "react"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import BuySell from "/src/pages/Dashboard-crypto/buy-sell";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const PagesTimeline = () => {
  const [step1, setStep1] = useState(true)
  const [step2, setStep2] = useState(false)
  const statuses = [
    {
      id: 1,
      stausTitle: "Final Interview",
      iconClass: "bx-copy-alt",
      description: "15 March. Final score: 5/10",
    },
    {
      id: 2,
      stausTitle: "Pass on Candidate",
      iconClass: "bx-x",
      description:
        "15 March. Not good enough.",
    },
    
  ];
  const statuses2 = [
    {
      id: 1,
      stausTitle: "Final Interview",
      iconClass: "bx-copy-alt",
      description: "20 March. Final score: 9/10",
    },
    {
      id: 2,
      stausTitle: "Offer Made",
      iconClass: "bx-money",
      description:
        "25 March. Made an offer of $1",
    },
    {
      id: 3,
      stausTitle: "Offer Accepted",
      iconClass: "bx-check",
      description:
        "26 March. He accepted.",
    },
    
  ];

  //meta title
  document.title = "View Candidate | Optumus Suite ";

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Utility" breadcrumbItem="Candidate: John Doe" />

          <Row>
            <Col lg="2">
                <BuySell />
            </Col>
            <Col lg="10">


            <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Global Track</CardTitle>

                  <div className="hori-timeline">
                    <div
                      className="owl-carousel owl-theme  navs-carousel events"
                      id="timeline-carousel"
                    >
                      {step1 ? (
                        <>
                          <div
                            className="item event-list"
                            style={{ display: "inline-table" }}
                          >
                            <div>
                              <div className="event-date">
                                <div className="text-primary mb-1">
                                  01 March
                                </div>
                                <h5 className="mb-4">First Interview</h5>
                              </div>
                              <div className="event-down-icon">
                                <i className="bx bx-check h1 text-primary down-arrow-icon" />
                              </div>

                              <div className="mt-3 px-3">
                                <p className="text-muted">
                                  The candidate has strong English skills.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            className="item event-list"
                            style={{ display: "inline-table" }}
                          >
                            <div>
                              <div className="event-date">
                                <div className="text-primary mb-1">
                                  10 March
                                </div>
                                <h5 className="mb-4">Second Interview</h5>
                              </div>
                              <div className="event-down-icon">
                                <i className="bx bx-check h1 text-primary down-arrow-icon" />
                              </div>

                              <div className="mt-3 px-3">
                                <p className="text-muted">
                                  The candidate has experience in call centers.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            className="item event-list active"
                            style={{ display: "inline-table" }}
                          >
                            <div>
                              <div className="event-date">
                                <div className="text-primary mb-1">
                                  15 March
                                </div>
                                <h5 className="mb-4">Third Interview</h5>
                              </div>
                              <div className="event-down-icon">
                                <i className="bx bx-check h1 text-primary down-arrow-icon" />
                              </div>

                              <div className="mt-3 px-3">
                                <p className="text-muted">
                                  Technical exam score: 8/10
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null}


                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">Positions</h4>  
          </div>

          <Row>
            <Col lg="4">
              <Card>
                <CardBody>
                  <CardTitle className="mb-5">Power BI Developer Track</CardTitle>
                  <div >
                    <ul className="verti-timeline list-unstyled">
                      {/* Render Horizontal Timeline Events */}
                      {statuses.map((status, key) => (
                        <li key={key} className="event-list">
                          <div className="event-timeline-dot">
                            <i
                              className={
                                status.id === 3
                                  ? "bx bx-right-arrow-circle bx-fade-right"
                                  : "bx bx-right-arrow-circle"
                              }
                            />
                          </div>
                          <div className="d-flex">
                            <div className="me-3">
                              <i
                                className={
                                  "bx " + status.iconClass + " h2 text-primary"
                                }
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div>
                                <h5>{status.stausTitle}</h5>
                                <p className="text-muted">
                                  {status.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card>
                <CardBody>
                  <CardTitle className="mb-5">Power Apps Developer Track</CardTitle>
                  <div >
                    <ul className="verti-timeline list-unstyled">
                      {/* Render Horizontal Timeline Events */}
                      {statuses.map((status, key) => (
                        <li key={key} className="event-list">
                          <div className="event-timeline-dot">
                            <i
                              className={
                                status.id === 3
                                  ? "bx bx-right-arrow-circle bx-fade-right"
                                  : "bx bx-right-arrow-circle"
                              }
                            />
                          </div>
                          <div className="d-flex">
                            <div className="me-3">
                              <i
                                className={
                                  "bx " + status.iconClass + " h2 text-primary"
                                }
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div>
                                <h5>{status.stausTitle}</h5>
                                <p className="text-muted">
                                  {status.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card>
                <CardBody>
                  <CardTitle className="mb-5">Power Apps Developer Track</CardTitle>
                  <div >
                    <ul className="verti-timeline list-unstyled">
                      {/* Render Horizontal Timeline Events */}
                      {statuses2.map((status, key) => (
                        <li key={key} className="event-list">
                          <div className="event-timeline-dot">
                            <i
                              className={
                                status.id === 3
                                  ? "bx bx-right-arrow-circle bx-fade-right"
                                  : "bx bx-right-arrow-circle"
                              }
                            />
                          </div>
                          <div className="d-flex">
                            <div className="me-3">
                              <i
                                className={
                                  "bx " + status.iconClass + " h2 text-primary"
                                }
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div>
                                <h5>{status.stausTitle}</h5>
                                <p className="text-muted">
                                  {status.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>




            </Col>
          </Row>
          
        </div>
      </div>
    </React.Fragment>
  )
}

export default PagesTimeline
