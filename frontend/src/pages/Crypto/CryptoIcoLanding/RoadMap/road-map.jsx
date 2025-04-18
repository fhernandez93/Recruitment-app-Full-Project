import React, { useState } from "react"
import { Container, Row, Col } from "reactstrap"

const RoadMap = () => {
  const [step1, setStep1] = useState(true)
  const [step2, setStep2] = useState(false)

  return (
    <React.Fragment>
      <section className="section bg-white" id="roadmap">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="small-title">Timeline</div>
                <h4>Our Roadmap</h4>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col lg="12">
              <div className="hori-timeline">
                <div
                  className="owl-carousel owl-theme  navs-carousel events"
                  id="timeline-carousel"
                >
                  {step1 ? (
                    <>
                      <Row>
                        <Col md={4}>
                          <div
                            className="item event-list"
                            style={{ display: "inline-table" }}
                          >
                            <div>
                              <div className="event-date">
                                <div className="text-primary mb-1">
                                </div>
                                <h5 className="mb-4">First step</h5>
                              </div>
                              <div className="event-down-icon">
                                <i className="bx bx-search h1 text-primary down-arrow-icon"/>
                              </div>

                              <div className="mt-3 px-3">
                                <p className="text-muted">
                                Full description of something here.
                                </p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div
                            className="item event-list"
                            style={{ display: "inline-table" }}
                          >
                            <div>
                              <div className="event-date">
                                <div className="text-primary mb-1">
                                </div>
                                <h5 className="mb-4">Second step</h5>
                              </div>
                              <div className="event-down-icon">
                                <i className="bx bx-down-arrow-circle h1 text-primary down-arrow-icon"/>
                              </div>

                              <div className="mt-3 px-3">
                                <p className="text-muted">
                                  Full description of something here.
                                </p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div
                            className="item event-list active"
                            style={{ display: "inline-table" }}
                          >
                            <div>
                              <div className="event-date">
                                <div className="text-primary mb-1">
                                </div>
                                <h5 className="mb-4">Third step</h5>
                              </div>
                              <div className="event-down-icon">
                                <i className="bx bx-medal h1 text-primary down-arrow-icon"/>
                              </div>

                              <div className="mt-3 px-3">
                                <p className="text-muted">
                                  Full description of something here.
                                </p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default RoadMap
