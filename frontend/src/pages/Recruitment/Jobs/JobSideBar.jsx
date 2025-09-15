import React, {useState, useEffect, useRef, useCallback} from "react"
import Select from "react-select"
import { withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"
import { Row, Col, Card, CardBody, Label, FormGroup, Input, Form, Nav, NavItem, NavLink } from "reactstrap"
import Rating from "react-rating";
import RatingTooltip from "react-rating-tooltip";
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

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

  // Fetch Applications (only once on mount)
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

    fetchApplications();
  }, [JobId]);

  // Fetch Candidates (runs when page, limit, or search changes)
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`/api/candidates`, {
          params: { page, limit, search }
        });

        setTotalPages(response.data.pages);
        setAllCandidates(response.data.results);
        
      } catch (error) {
        toastr.error("Failed to load the candidates.");
      }
    };

    fetchCandidates();
  }, [page, limit, search]);

  console.log("JobSideBar rendered");

  // Log selectedCandidates changes
  useEffect(() => {
    console.log("selectedCandidates changed", selectedCandidates);
  }, [selectedCandidates]);

  // Log allCandidates before rendering
  console.log('allCandidates:', allCandidates.map(c => c.CandidateId));

  const handleCheckboxChange = (candidateId) => {
    console.log("Checkbox changed for candidate ID:", candidateId);
    const id = Number(candidateId); // normalize type

    setSelectedCandidates(prev => {
      const exists = prev.some(x => Number(x) === id);
      const next = exists ? prev.filter(x => Number(x) !== id) : [...prev, id];
      console.log("selectedCandidates ->", next);
      return next;
    });
  };

  const handleAddCandidate = async (candidateId) => {
    try {
      await axios.post("api/applications", {
        JobId: parseInt(JobId),
        ApplicationStatusId: 1, // Default status
        Candidates: [candidateId], // API expects an array
      });

      toastr.success("Candidate added successfully!");
    } catch (err) {
      toastr.error("Failed to add candidate.");
    }
  };

  const handleAddCandidates = async () => {
    if (selectedCandidates.length === 0) {
      toastr.warning("Please select at least one candidate.");
      return;
    }

    try {
      await axios.post("api/applications", {
        JobId: parseInt(JobId),
        ApplicationStatusId: 1, // Default status
        Candidates: selectedCandidates, // array of IDs
      });

      setSelectedCandidates([]); // clear selections after success
      toastr.success("Candidates added successfully!");
    } catch (err) {
      toastr.error("Failed to add candidates.");
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
              customActiveTab === "Qualified" && (
                <CardBody className="pt-0 viewjob-sidebar">
                  <div className="mt-2 ">
                    Hello Qualified
                  </div>
                </CardBody>
              )
            }
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
                              value={search}
                            onChange={(e) => {
                              setPage(1); // reset to first page on new search
                              setSearch(e.target.value);
                            }}
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
                      {allCandidates.map((candidate) => {
                          const candidateIdNum = Number(candidate.CandidateId);
                          console.log('candidate.CandidateId:', candidate.CandidateId, 'typeof:', typeof candidate.CandidateId, 'candidateIdNum:', candidateIdNum, 'selectedCandidates:', selectedCandidates);
                          return (
                            <div key={candidateIdNum} className="candidate-row">
                              <div className="d-flex align-items-center candidate w-100 justify-content-between">
                                {/* Left side: checkbox + info */}
                                <div className="d-flex align-items-center">
                                  <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    name={`candidate-${candidateIdNum}`}
                                    id={`candidate-${candidateIdNum}`}
                                    checked={selectedCandidates.includes(candidateIdNum)}
                                    onChange={() => {
                                      setSelectedCandidates(prev => {
                                        if (prev.includes(candidateIdNum)) {
                                          return prev.filter(id => id !== candidateIdNum);
                                        } else {
                                          return [...prev, candidateIdNum];
                                        }
                                      });
                                      console.log("Checkbox event:", `candidate-${candidateIdNum}`);
                                    }}
                                  />

                                <Link to="#" className="d-flex align-items-center">
                                  <img
                                    className="d-flex me-3 rounded-circle"
                                    src={candidate.Avatar || avatar1}
                                    alt="candidate-avatar"
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

                              {/* Right side: plus button for single add */}
                              <button
                                className="btn btn-md rounded-circle"
                                onClick={() => handleAddCandidate(candidate.CandidateId)}
                                title="Add this candidate to job"
                              >
                                <i className="bx bx-plus"></i>
                              </button>
                            </div>
                          </div>

                        );
                      })}
                    </div>
                  </CardBody>

                </>
              )  
            }
          </Card>
    </React.Fragment>
  )
}

import PropTypes from "prop-types";
import App from './../../../App';

JobSideBar.propTypes = {
  t: PropTypes.func.isRequired,
};

export default (withTranslation()(JobSideBar))