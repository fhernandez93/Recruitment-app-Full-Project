import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row, Badge, CardBody, CardTitle, CardSubtitle, Table, Label, Nav, NavItem, NavLink, TabContent, TabPane, Form, Input } from "reactstrap"
import features from "/src/assets/images/crypto/features-img/img-1.png"
import { map } from 'lodash';
import Select from "react-select"
import classnames from "classnames"

const TrackDetails = (props) => {
  const {handleTrackTitleClick, id, fakeProps} = props
  const [customActiveTab, setCustomActiveTab] = useState("1");

  // Function to toggle active tab
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab);
    }
  };

  const getTrackById = (id) => {
    const track = fakeProps.find(track => track.id === id);
    if (!track) {
        throw new Error(`Track with id ${id} not found`);
    }
    return track;
  }

  const {title, titleColor, description, currentStatus, roles, positions} = getTrackById(id)

  // Fake fetch:

  const optionWithGroup = [
    {
      label: "With",
      options: [
        { label: "Employee 1", value: "1" },
        { label: "Employee 2", value: "2" },
        { label: "Employee 3", value: "3" },
        { label: "Employee 4", value: "4" }
      ]
    }
  ]

  // Add a handler for the close button
  const handleClose = () => {
    handleTrackTitleClick(null, false)
  };

  return (
    <Card className="position-relative"> {/* Add position-relative for positioning the close button */}
      {/* Close button - positioned absolutely in the top-right corner */}
      <button 
        onClick={() => handleClose()}
        className="position-absolute end-0 m-2 btn btn-link p-1"
        style={{
          top: "0.5rem",
          zIndex: 1,
          fontSize: '1.25rem',
          lineHeight: 1,
          color: '#6c757d' // A muted color, change as needed
        }}
        aria-label="Close"
      >
        <i className="mdi mdi-close"></i>
      </button>
      
      <div>
        <Row>
          <Col lg="12">
            <div className="p-4">
              <h5 className={titleColor}>
                {title}
              </h5>
              <div className="mt-3">
                <p className="text-medium">
                  Current Status:
                  &nbsp;
                  <Badge color="primary font-size-14">
                    { currentStatus }
                  </Badge>
                </p>
              </div>


              <div className="mt-5 hori-timeline">
                <div className="owl-carousel owl-theme  navs-carousel events" id="timeline-carousel" >
                  {true ? (
                    <>
                      <div
                        className="col-sm-4 item event-list"
                        style={{ display: "inline-table" }}
                      >
                        <div>
                          <div className="event-date">
                            <div className="text-primary mb-1">
                              Interviews
                            </div>
                            &nbsp;
                            {/* <h5 className="mb-4"></h5> */}
                          </div>
                          <div className="event-down-icon">
                            <i className="bx bx-group font-size-2-5rem text-primary down-arrow-icon" style={{top: "-10px"}} />
                          </div>

                          <div className="mt-3 px-3">
                            <p className="text-muted">
                              Details of candidate interviews
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-sm-4 item event-list"
                        style={{ display: "inline-table" }}
                      >
                        <div>
                          <div className="event-date">
                            <div className="text-primary mb-1">
                              Decision
                            </div>
                            &nbsp;
                            {/* <h5 className="mb-4"></h5> */}
                          </div>
                          <div className="event-down-icon">
                            <i className="mdi mdi-head-alert-outline text-primary down-arrow-icon" style={{top: "-13px", fontSize: "2.2rem"}} />
                          </div>

                          <div className="mt-3 px-3">
                            <p className="text-muted">
                              Evaluations and hiring progress
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-sm-4 item event-list"
                        style={{ display: "inline-table" }}
                      >
                        <div>
                          <div className="event-date">
                            <div className="text-primary mb-1">
                              Offer
                            </div>
                            &nbsp;
                            {/* <h5 className="mb-4"></h5> */}
                          </div>
                          <div className="event-down-icon">
                            <i className="mdi mdi-handshake-outline text-primary down-arrow-icon" style={{top: "-13px", fontSize: "2.1rem"}} />
                          </div>

                          <div className="mt-3 px-3">
                            <p className="text-muted">
                              Sent job offers and current status
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}


                </div>
              </div>

              <div md={6} className="mt-4">

                <Nav tabs className="nav-tabs-custom nav-justified">
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "1",
                      })}
                      onClick={() => {
                        toggleCustom("1");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="fas fa-home"></i>
                      </span>
                      <span className="d-none d-sm-block">Interviews</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "2",
                      })}
                      onClick={() => {
                        toggleCustom("2");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="far fa-user"></i>
                      </span>
                      <span className="d-none d-sm-block">Decisions</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "3",
                      })}
                      onClick={() => {
                        toggleCustom("3");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="far fa-envelope"></i>
                      </span>
                      <span className="d-none d-sm-block">Offers</span>
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={customActiveTab} className="text-muted">
                  <TabPane tabId="1">
                    <div>
                      <CardBody>
                        <div className="table-responsive">
                          <Table className="table mb-0 track-table">
                            <tbody>
                              <tr>
                                <td>
                                  <div className="form-check mb-2">
                                    <input type="checkbox" className="form-check-input input-mini" id="statusRow1" value="checked" />
                                    <Label className="form-check-label" htmlFor="statusRow1">Schedule First Interview</Label>
                                  </div>
                                </td>
                                <td></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="form-check mb-2">
                                    <input type="checkbox" className="form-check-input input-mini" id="statusRow2" value="checked" />
                                    <Label className="form-check-label" htmlFor="statusRow2">First Interview Scheduled</Label>
                                  </div>
                                </td>
                                <td>
                                  <div style={{display: "flex"}}>
                                    <Label className="form-label">Date: &nbsp;</Label>
                                    <div className="div-track-date">
                                      <input
                                        className="form-control form-control-sm"
                                        type="date"
                                        defaultValue=""
                                        id="date-input1"
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div style={{display: "flex"}}>
                                    <Label className="form-label">With: </Label>
                                    <div style={{position: "relative", top: "-10px"}}>
                                      <Select
                                        options={optionWithGroup}
                                        classNamePrefix="select2-selection"
                                        className="small-select form-control-sm m-width-140"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="form-check mb-2">
                                    <input type="checkbox" className="form-check-input input-mini" id="statusRow3" value="checked" />
                                    <Label className="form-check-label" htmlFor="statusRow3">Schedule Second Interview</Label>
                                  </div>
                                </td>
                                <td></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="form-check mb-2">
                                    <input type="checkbox" className="form-check-input input-mini" id="statusRow4" value="checked" />
                                    <Label className="form-check-label" htmlFor="statusRow4">Second Interview Scheduled</Label>
                                  </div>
                                </td>
                                <td>
                                  <div style={{display: "flex"}}>
                                    <Label className="form-label">Date: &nbsp;</Label>
                                    <div className="div-track-date">
                                      <input
                                        className="form-control form-control-sm"
                                        type="date"
                                        defaultValue=""
                                        id="date-input1"
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div style={{display: "flex"}}>
                                    <Label className="form-label">With: </Label>
                                    <div style={{position: "relative", top: "-10px"}}>
                                      <Select
                                        options={optionWithGroup}
                                        classNamePrefix="select2-selection"
                                        className="small-select form-control-sm m-width-140"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="form-check mb-2">
                                    <input type="checkbox" className="form-check-input input-mini" id="statusRow5" value="checked" />
                                    <Label className="form-check-label" htmlFor="statusRow5">Schedule Final Interview</Label>
                                  </div>
                                </td>
                                <td></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="form-check mb-2">
                                    <input type="checkbox" className="form-check-input input-mini" id="statusRow6" value="checked" />
                                    <Label className="form-check-label" htmlFor="statusRow6">Final Interview Scheduled</Label>
                                  </div>
                                </td>
                                <td>
                                  <div style={{display: "flex"}}>
                                    <Label className="form-label">Date: &nbsp;</Label>
                                    <div className="div-track-date">
                                      <input
                                        className="form-control form-control-sm"
                                        type="date"
                                        defaultValue=""
                                        id="date-input1"
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div style={{display: "flex"}}>
                                    <Label className="form-label">With: </Label>
                                    <div style={{position: "relative", top: "-10px"}}>
                                      <Select
                                        options={optionWithGroup}
                                        classNamePrefix="select2-selection"
                                        className="small-select form-control-sm m-width-140"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          <div className="d-flex flex-wrap gap-2 mt-2">
                            <button
                              type="button"
                              className="btn btn-success "
                            >
                              <i className="mdi mdi-account-arrow-right-outline font-size-16 align-middle me-2"></i>{" "}
                              Advance Candidate
                            </button>
                            <button
                              type="button"
                              className="btn btn-warning "
                            >
                              <i className="mdi mdi-exclamation font-size-16 align-middle me-2"></i>{" "}
                              Decision
                            </button>
                          </div>
                        </div>
                      </CardBody>
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <CardBody>
                      <Form>
                        <Row>
                        <div className="mb-3" style={{marginBottom: "0 !important"}}>
                          <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-Input"
                              id="formrow-customCheck"
                            />
                            <Label
                              className="form-check-Label"
                              htmlFor="formrow-customCheck"
                            >
                              Make Offer

                              &nbsp;&nbsp;
                              <div className="btn-group btn-group-sm" role="group" style={{top: "-0.1rem"}}>
                                <button type="button" className="btn btn-outline-primary" style={{borderRadius: "50px"}}>
                                  <i className="mdi mdi-plus"></i>
                                </button>
                              </div>
                            </Label>
                          </div>
                          
                        </div>
                        </Row>
                        <div className="mb-3">
                          <Label htmlFor="formrow-firstname-Input">Position</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            placeholder="Enter The Position"
                          />
                        </div>

                        <Row>
                          <Col md={4}>
                            <div className="mb-3">
                              <Label htmlFor="formrow-email-Input">Start Date</Label>
                              <Input
                                type="date"
                                className="form-control"
                                id="formrow-date-Input"
                                placeholder="Enter Your Date"
                              />
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="mb-3">
                              <Label htmlFor="formrow-InputShift">Shift</Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="formrow-InputShift"
                                placeholder="Enter Shift"
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Label htmlFor="formrow-InputSalary">Salary</Label>
                              <select
                                id="formrow-InputSalary"
                                className="form-control"
                              >
                                <option defaultValue>Enter Salary</option>
                                <option>...</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                      <hr />
                      <Row>
                        <Col md={4} style={{top: "0.2rem !important"}}>
                          <div className="form-check mb-2" >
                            <input type="checkbox" className="form-check-input input-mini" id="statusRow2" value="checked" />
                            <Label className="form-check-label" htmlFor="statusRow2">Pass on Candidate</Label>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <select
                              id="formrow-InputSalary"
                              className="form-control"
                            >
                              <option defaultValue>Reason</option>
                              <option>...</option>
                            </select>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} style={{top: "0.2rem !important"}}>
                          <div className="form-check mb-2" >
                            <input type="checkbox" className="form-check-input input-mini" id="statusRow2" value="checked" />
                            <Label className="form-check-label" htmlFor="statusRow2">Candidate notified of decision to not continue recruitment</Label>
                          </div>
                        </Col>
                      </Row>
                      
                    </CardBody>
                  </TabPane>
                  <TabPane tabId="3">
                    
                    <Col lg={12} className="mb-3">
                      <CardBody>
                        <label htmlFor="message">Offers</label>
                        <textarea
                          id="offers"
                          className="form-control"
                          placeholder="Offers"
                        ></textarea>
                      </CardBody>
                    </Col>

                  </TabPane>
                </TabContent>
              </div>
            </div>
          </Col>
          <Col lg="3" sm="4" className="align-self-center">
            <div>
              { 
                // <img src={features} alt="" style={{opacity: "0.4"}} className="img-fluid d-block" />
              }
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

TrackDetails.propTypes = {
  handleTrackTitleClick: PropTypes.func.isRequired,
  fakeProps: PropTypes.object.isRequired,
};

export default TrackDetails;