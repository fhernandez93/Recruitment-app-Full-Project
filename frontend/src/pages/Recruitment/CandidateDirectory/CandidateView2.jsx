import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, CardTitle, CardSubtitle, Button, TabContent, TabPane, Card, Collapse, CardBody, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import CardTrack from "./CardTrack"
import CardPositions from "./CardPositions"
import CardInterviews from "./CardInterviews"
import CardAttachment from "./CardAttachment"
import TrackDetails from "./TrackDetails"

import classnames from "classnames";
import "simplebar-react/dist/simplebar.min.css";

//import action
import { getChartsData as onGetChartsData } from "/src/store/actions";

// Pages Components
import CandidateSideBar from "./CandidateSideBar";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";

const RecruitmentCandidateView2 = props => {
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [showTracksList, setShowTracksList] = useState(true)
  const [selectedTrackId, setSelectedTrackId] = useState(null)
  const [selectedTrackData, setSelectedTrackData] = useState([])
  
  const [customIconActiveTab, setcustomIconActiveTab] = useState("1");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetChartsData("yearly"));
  }, [dispatch]);

  const toggleCustom = tab => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const [col1, setcol1] = useState(true);
  const [col2, setcol2] = useState(true);
  const [col3, setcol3] = useState(true);

  const t_col1 = () => setcol1(!col1);
  const t_col2 = () => setcol2(!col2);
  const t_col3 = () => setcol3(!col3);

  // Handler to hide tracks and show the new component
  const handleTrackTitleClick = (id = null, showTracksList = false ) => {
    
    const getTrackById = (id) => {
      const track = tracks.find(track => track.id === id);
      if (!track) {
          throw new Error(`Track with id ${id} not found`);
      }
      return track;
    }
    
    if (id === null) {
      setSelectedTrackId(null);
      setSelectedTrackData({});
      setShowTracksList(true);
      return
    }
    
    setSelectedTrackId(id); // This is a fake backend call to get the track data
    setSelectedTrackData(getTrackById(id));
    setShowTracksList(showTracksList);
    
  };

  const tracks = [
    {
      id: "1",
      title: "January 2024 (Closed)",
      titleColor: "text-primary",
      description: "Description of the track.",
      currentStatus: "Second Interview Scheduled",
      roles: ["Analyst", "Clinical Analyst"],
      positions: [
        { name: "EPIC Analyst (Beaker-CP)", status: "Pending Decision" },
        { name: "EPIC Analyst (Willow)", status: "Pending Decision" },
      ],
      interviews: [
        {
          id: "1",
          date: "02/27/2025",
          title: "AMS-EHR Analyst (Beaker-CP)",
          positionId: "101",
          positionName: "AMS-EHR Analyst (Beaker-CP)",
          statusId: "1001",
          statusName: "First Interview",
        },
        {
          id: "2",
          date: "02/25/2025",
          title: "Open Interview",
          positionId: "",
          positionName: "",
          statusId: "1002",
          statusName: "Open Interview",
        },
      ]
    },
    { 
      id: "2",
      title: "February 2024 (Closed)",
      titleColor: "text-danger",
      description: "Description of the track.",
      currentStatus: "Rejection Sent to Candidate",
      roles: ["Analyst", "Clinical Analyst"],
      positions: [
        { name: "EPIC Analyst (Beaker-CP)", status: "Rejected" }
      ],
      interviews: []
    }
  ]

  const attachments = [
    { id: "1", filename: "Resume (En).pdf", name: "Resume (En)", category: "Resume", extension: "PDF", dateUploaded: "02/01/2025", color: "danger", icon: "far fa-file-pdf"},
    { id: "2", filename: "Resume (Es).doc", name: "Resume (Es)", category: "Resume", extension: "DOC", dateUploaded: "02/02/2025",  color: "primary", icon: "far fa-file-word" },
  ]

  //meta title
  document.title="View Candidate | Optumus Suite ";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("View Candidates")}
            breadcrumbItem={props.t("View Candidate")}
          />

          <Row>
            <Col xl="4">
              <CandidateSideBar />
            </Col>
            <Col xl="8">
              <Card>
                <CardBody>
                  {/* <CardTitle className="h4">Custom Tabs</CardTitle> */}
                  {/* <p className="card-title-desc">Example of custom tabs</p> */}
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
                        <span className="d-none d-sm-block">Recruiting Tracks</span>
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
                        <span className="d-none d-sm-block">Candidate History</span>
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
                        <span className="d-none d-sm-block">Attachments</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "4",
                        })}
                        onClick={() => {
                          toggleCustom("4");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-cog"></i>
                        </span>
                        <span className="d-none d-sm-block">Settings</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardBody>
              </Card>
              <TabContent activeTab={customActiveTab} className="text-muted">
                <TabPane tabId="1">
                  {showTracksList ? (
                    <>
                      {tracks.map((track, index) => (
                        <CardTrack
                          key={index}
                          track={track}
                          handleTrackTitleClick={handleTrackTitleClick} // Pass the handler correctly
                        />
                      ))}
                      <Card>
                        <div>
                          <Row>
                            <Col lg="9" sm="8">
                              <div className="p-4 track-add">
                                <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                                  <i className="bx bx-plus-circle" style={{ fontSize: '1.2rem' }}></i> 
                                  Add track
                                </p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Card>
                    </>
                  ) : ( 
                    <div>
                      <TrackDetails 
                        id={selectedTrackId}
                        fakeProps={tracks}
                        handleTrackTitleClick={handleTrackTitleClick}
                      />
                      <CardPositions positions={selectedTrackData.positions} />
                      <CardInterviews interviews={selectedTrackData.interviews} />
                    </div>
                  )}
                </TabPane>
                <TabPane tabId="2">
                  <Row className="custom-wrapper">
                    <Col lg={12}>
                      
                      <div className="accordion" id="accordion">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className={classnames(
                                "accordion-button",
                                "fw-medium",
                                { collapsed: !col1 }
                              )}
                              type="button"
                              onClick={t_col1}
                              style={{ cursor: "pointer" }}
                            >
                              Interviews
                            </button>
                          </h2>

                          <Collapse isOpen={col1} className="accordion-collapse">
                            <Card style={{marginBottom: 0}}>
                                <div className="accordion-body">
                                  <div className="table-responsive">
                                    <Table className="table table-sm m-0">
                                      <thead>
                                        <tr>
                                          <th>Track</th>
                                          <th>Date</th>
                                          <th>Position(s)</th>
                                          <th>Type</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>January 2025</td>
                                          <td>01/03/2025</td>
                                          <td>N/A</td>
                                          <td>First Interview</td>
                                        </tr>
                                        <tr>
                                          <td>January 2025</td>
                                          <td>01/03/2025</td>
                                          <td>Clinical Analyst (Impact Advisors)</td>
                                          <td>Second Interview</td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                            </Card>
                          </Collapse>
                        </div>
                      </div>

                      <div className="accordion mt-4" id="accordion">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className={classnames(
                                "accordion-button",
                                "fw-medium",
                                { collapsed: !col2 }
                              )}
                              type="button"
                              onClick={t_col2}
                              style={{ cursor: "pointer" }}
                            >
                              Positions
                            </button>
                          </h2>

                          <Collapse isOpen={col2} className="accordion-collapse">
                            <Card style={{marginBottom: 0}}>
                                <div className="accordion-body">
                                  <div className="table-responsive">
                                    <Table className="table table-sm m-0">
                                      <thead>
                                        <tr>
                                          <th>Type</th>
                                          <th>Uploaded</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>January 2025</td>
                                          <td>01/03/2025</td>
                                        </tr>
                                        <tr>
                                          <td>January 2025</td>
                                          <td>01/03/2025</td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                            </Card>
                          </Collapse>
                        </div>
                      </div>

                      <div className="accordion mt-4" id="accordion">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className={classnames(
                                "accordion-button",
                                "fw-medium",
                                { collapsed: !col3 }
                              )}
                              type="button"
                              onClick={t_col3}
                              style={{ cursor: "pointer" }}
                            >
                              Roles
                            </button>
                          </h2>

                          <Collapse isOpen={col3} className="accordion-collapse">
                            <Card style={{marginBottom: 0}}>
                                <div className="accordion-body">
                                  <div className="table-responsive">
                                    <Table className="table table-sm m-0">
                                      <thead>
                                        <tr>
                                          <th>Type</th>
                                          <th>Uploaded</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>January 2025</td>
                                          <td>01/03/2025</td>
                                        </tr>
                                        <tr>
                                          <td>January 2025</td>
                                          <td>01/03/2025</td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                            </Card>
                          </Collapse>
                        </div>
                      </div>
                        
                    </Col>
                  </Row>






                </TabPane>
                <TabPane tabId="3">

                  <Row>
                    { attachments.map((attachment, key) => (
                      <CardAttachment attachment={attachment} key={"_attachment_" + key} />
                    ))}
                  </Row>

                </TabPane>
              </TabContent>
            </Col>
          </Row>


        </Container>
      </div>
    </React.Fragment>
  );
};

RecruitmentCandidateView2.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(RecruitmentCandidateView2);
