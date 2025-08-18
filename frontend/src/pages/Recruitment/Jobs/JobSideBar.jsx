import React, {useState, useEffect, useRef, useCallback} from "react"
import Select from "react-select"
import { withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"
import { Row, Col, Card, CardBody, Label, FormGroup, Input, Form, Nav, NavItem, NavLink } from "reactstrap"
import Rating from "react-rating";
import RatingTooltip from "react-rating-tooltip";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom"
import axios from 'axios'
import { useParams } from "react-router-dom";
import classnames from "classnames";

//Import images
import avatar2 from "/src/assets/images/users/avatar-2.jpg"
import avatar3 from "/src/assets/images/users/avatar-3.jpg"
import avatar4 from "/src/assets/images/users/avatar-4.jpg"
import avatar6 from "/src/assets/images/users/avatar-6.jpg"
import avatar1 from "/src/assets/images/users/avatar-1.jpg"
import profileImg from "/src/assets/images/profile-img.png"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL;

const JobSideBar = (props) => {
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [activeTab, setActiveTab] = useState("1");
  const [initialValues, setInitialValues] = useState(null);
  const [selectedGroup, setselectedGroup] = useState(null);
  const [englishCertificationList, setEnglishCertificationList] = useState([]);
  const [globalStatusList, setGlobalStatusList] = useState([]);
  const [rate, setRate] = useState("");
  const ref = React.createRef();

  const toggleCustom = tab => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  }

  toastr.options = {
    positionClass: "toast-top-right",
    timeOut: "3000",
    closeButton: true,
    debug: false,
    progressBar: true,
    preventDuplicates: true,
    newestOnTop: true,
  };

  const showQuickToastr = (message, timeout = 700) => {
    toastr.options.timeOut = timeout; // Dynamically set the timeOut value
    toastr.options.progressBar = false
    toastr.success(message); // Call toastr with the message
  };

  const { id } = useParams(); // Get the id from the URL
  const candidateId = parseInt(id, 10);
  
  if (isNaN(candidateId)) {
    toastr.error("Failed to load the candidate info.");
    throw new Error("Invalid candidate ID: " + id);
  }

  const validationSchema = Yup.object({
    CandidateFirstName: Yup.string().max(250).required(),
    CandidateLastName: Yup.string().max(250).required(),
    GlobalStatusID: Yup.number().required().positive().integer(),
    EnglishCertificationID: Yup.number().positive().integer(),
    EnglishRating: Yup.number().positive().integer(),
    EducationNotes: Yup.string().max(2500),
    Skills: Yup.string().max(2500),
    WorkHistory: Yup.string().max(2500),
    CandidateNotes: Yup.string().max(2500),
  });

  const CustomPrevArrow = () => {
    return (
      <div
        style={{
          left: "-5px",
          zIndex: 10,
          fontSize: "24px",
          color: "black",
          position: "absolute",
        }}
      >
        <i className="mdi mdi-chevron-left text-primary me-1" />
      </div>
    );
  };
  
  const sliderSettings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  
  const handleSelectGroup = (selectedGroup) => {
    setselectedGroup(selectedGroup)
  }
  
  return (
    <React.Fragment>
      { 
        <Formik 
          innerRef={ref}
          initialValues={
            [
              {}
            ]
          }
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {
            ({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched }) => {

              return (
                <Form>
                  <Card className="overflow-hidden">
                    <div className="bg-primary bg-soft">
                      <Row>
                        <Card className="mb-0">
                          <CardBody>
                            <Col xs="12">
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
                                      <i className="far fa-user"></i>
                                    </span>
                                    <span className="d-none d-sm-block">Qualified 4</span>
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
                                      <i className="far fa-envelope"></i>
                                    </span>
                                    <span className="d-none d-sm-block">Disqualified 0</span>
                                  </NavLink>
                                </NavItem>
                              </Nav>
                            </Col>
                          </CardBody>
                        </Card>
                      </Row>
                    </div>
                    <CardBody className="pt-0">
                      <div className="mt-2">
                        <Form className="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
                          <div className="search-box me-2">
                            <div className="position-relative">
                              <Input
                                type="text"
                                className="form-control "
                                placeholder="Search..."
                              />
                              <i className="bx bx-search-alt search-icon" />
                            </div>
                          </div>
                          <Nav className="product-view-nav" pills>
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: activeTab === "1",
                                })}
                                onClick={() => {
                                  toggleTab("1")
                                }}
                              >
                                <i className="bx bx-grid-alt" />
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: activeTab === "2",
                                })}
                                onClick={() => {
                                  toggleTab("2")
                                }}
                              >
                                <i className="bx bx-list-ul" />
                              </NavLink>
                            </NavItem>
                          </Nav>
                        </Form>
                      </div>
                    </CardBody>
                    <CardBody className="pt-0 viewjob-sidebar">
                      <div className="mt-2">
                        <Link to="#" className="d-flex candidate">
                          <img
                            className="d-flex me-3 rounded-circle"
                            src={avatar2}
                            alt="optumus-suite"
                            height="45"
                          />
                          <div className="flex-grow-1 chat-user-box">
                            <p className="user-title m-0">John Doe</p>
                            <p className="text-muted">Senior Dev</p>
                          </div>
                        </Link>

                        <Link to="#" className="d-flex candidate">
                          <img
                            className="d-flex me-3 rounded-circle"
                            src={avatar3}
                            alt="optumus-suite"
                            height="45"
                          />
                          <div className="chat-user-box">
                            <p className="user-title m-0">Johnny Doe</p>
                            <p className="text-muted">Senior Dev</p>
                          </div>
                        </Link>

                        <Link to="#" className="d-flex candidate">
                          <img
                            className="d-flex me-3 rounded-circle"
                            src={avatar4}
                            alt="optumus-suite"
                            height="45"
                          />
                          <div className="chat-user-box">
                            <p className="user-title m-0">Jane Doe</p>
                            <p className="text-muted">Junior Dev</p>
                          </div>
                        </Link>

                        <Link to="#" className="d-flex candidate">
                          <img
                            className="d-flex me-3 rounded-circle"
                            src={avatar6}
                            alt="optumus-suite"
                            height="45"
                          />
                          <div className="chat-user-box">
                            <p className="user-title m-0">Jay Doe</p>
                            <p className="text-muted">Junior Dev</p>
                          </div>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                </Form>
              )
            }
          }
        </Formik>
      }
    </React.Fragment>
  )
}

import PropTypes from "prop-types";

JobSideBar.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withRouter(withTranslation()(JobSideBar))