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

const JobSideBar = ({JobId, ApplicationStatuses}) => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [customActiveTab, setCustomActiveTab] = useState("Qualified");
  const [activeTab, setActiveTab] = useState("1");
  const [allApplications, setAllApplications] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);
  const [selectedGroup, setselectedGroup] = useState(null);
  const [englishCertificationList, setEnglishCertificationList] = useState([]);
  const [globalStatusList, setGlobalStatusList] = useState([]);
  const [rate, setRate] = useState("");
  const ref = React.createRef();

  const toggleCustom = tab => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab);
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
    toastr.options.timeOut = ti
    meout; // Dynamically set the timeOut value
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

  useEffect(() => {
    const fetchApplications = async () => {
      try {
  
        const response = await axios.get(`api/applications/job/${JobId}`);
        if (response.data.length === 0) {
          toastr.error("No applications found.");
        } else {
          setAllApplications(response.data);
          console.log("Applications fetched:", response.data);
        }

      } catch (error) {
        toastr.error("Failed to load the information of the applications.");
      }
    };

    const fetchCandidates = async () => {
      try {
  
        const response = await axios.get(`api/candidates`);
        if (response.data.length === 0) {
          toastr.error("No candidates found.");
        } else {
          setAllCandidates(response.data);
        }

      } catch (error) {
        toastr.error("Failed to load the information of the candidate.");
      }
    };
  
    fetchApplications()
    fetchCandidates()
  }, [])

  const handleCheckboxChange = (candidateId) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId) // If it is here, remove it
        : [...prev, candidateId]               // It is not here, add it
    );
  };

  const handleAddCandidates = async () => {
    try {
      await axios.post("api/applications", {
        JobId: parseInt(JobId), // From props
        ApplicationStatusId: 2, //ApplicationStatuses.shift().ApplicationStatusId, // From props
        Candidates: selectedCandidates, // IDs array
      });

      setSelectedCandidates([]); // Clear selected candidates
      toastr.success("Candidates applied successfully!");
    } catch (err) {
      toastr.error("Failed to create applications.");
    }
  };


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
                                      active: customActiveTab === "Qualified",
                                    })}
                                    onClick={() => {
                                      toggleCustom("Qualified");
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
                                      active: customActiveTab === "Disqualified",
                                    })}
                                    onClick={() => {
                                      toggleCustom("Disqualified");
                                    }}
                                  >
                                    <span className="d-block d-sm-none">
                                      <i className="far fa-envelope"></i>
                                    </span>
                                    <span className="d-none d-sm-block">Disqualified 0</span>
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                      active: customActiveTab === "Add",
                                    })}
                                    onClick={() => {
                                      toggleCustom("Add");
                                    }}
                                  >
                                    <span className="d-block d-sm-none">
                                      <i className="far fa-envelope"></i>
                                    </span>
                                    <span className="d-none d-sm-block">Add</span>
                                  </NavLink>
                                </NavItem>
                              </Nav>
                            </Col>
                          </CardBody>
                        </Card>
                      </Row>
                    </div>
                    { 
                      customActiveTab === "Add" && (
                        <>
                          <CardBody className="pt-0">
                            <div className="mt-2">
                              <div className="mt-4 mt-sm-0 d-flex align-items-center">
                                <div className="search-box me-2 flex-grow-1">
                                  <div className="position-relative ">
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
                                      className="bg-secondary text-white"
                                      onClick={() => {
                                        alert("Add Candidate button clicked");
                                      }}
                                    >
                                      <i className="bx bx-list-ul" />
                                    </NavLink>
                                  </NavItem>
                                </Nav>
                                <Nav className="product-view-nav" pills>
                                  <NavItem>
                                    <NavLink
                                      className="bg-primary text-white"
                                      onClick={handleAddCandidates}
                                    >
                                      <i className="bx bx-user-plus" />
                                    </NavLink>
                                  </NavItem>
                                </Nav>
                              </div>
                            </div>
                          </CardBody>
                          <CardBody className="pt-0 viewjob-sidebar">
                            <div className="mt-2 ">
                              {
                                allCandidates.map((candidate, index) => {
                                  return (
                                    <div key={index} className="candidate-row">
                                      <div className="d-flex align-items-center candidate">
                                        <input
                                          className="form-check-input me-2"
                                          type="checkbox"
                                          onChange={() => handleCheckboxChange(candidate.CandidateId)}
                                        />
                                        <Link to="#" className="d-flex align-items-center">
                                          <img
                                            className="d-flex me-3 rounded-circle"
                                            src={candidate.Avatar || avatar1}
                                            alt="optumus-suite"
                                            height="45"
                                          />
                                          <div className="flex-grow-1 chat-user-box">
                                            <p className="user-title m-0">
                                              {candidate.FirstName} {candidate.LastName}
                                            </p>
                                            <p className="text-muted">{candidate.EducationNotes}</p>
                                          </div>
                                        </Link>
                                      </div>
                                    </div>

                                  )
                                })
                              }

                            </div>
                          </CardBody>
                        </>
                      )  
                    }
                  </Card>
              )
            }
          }
        </Formik>
      }
    </React.Fragment>
  )
}

import PropTypes from "prop-types";
import App from './../../../App';

JobSideBar.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withRouter(withTranslation()(JobSideBar))