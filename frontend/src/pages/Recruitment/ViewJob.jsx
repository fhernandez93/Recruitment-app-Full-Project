import React, { useEffect, useState, useMemo } from "react";
import { withRouter } from "react-router-dom"
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  Card, CardTitle, CardBody, Col, Container, Row, Label, Input, FormFeedback, Form, InputGroup,
  Nav, NavItem, NavLink, CardSubtitle, Button, TabContent, TabPane, Collapse, Table, UncontrolledTooltip, 
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
 } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { updateUser as onUpdateUser } from "/src/store/contacts/actions";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import InputMask from "react-input-mask"
import classnames from "classnames";
import JobSideBar from "./Jobs/JobSideBar";

import avatar2 from "/src/assets/images/users/avatar-2.jpg"

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { addEventSuccess } from './../../store/calendar/actions';

const   ViewJob = () => {
  const { id } = useParams(); // Get the candidate ID from the URL
  const history = useHistory();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.contacts);
  const [activeStatusTab, setActiveStatusTab] = useState("1");
  const [activeCandidateTab, setActiveCandidateTab] = useState("1");

  const [selectedGroup, setselectedGroup] = useState(null);
  const handleSelectGroup = (selectedGroup) => {
    setselectedGroup(selectedGroup)
  }

  const optionGroup = [
    {
      // "Future Potential", "No Future Potential", "Open Interviews", "Hired"
      label: "Status",
      options: [
        { label: "Future Potential", value: "1" },
        { label: "No Future Potential", value: "2" },
        { label: "Open Interviews", value: "3" },
        { label: "Hired", value: "4" }
      ]
    }
  ];

  // Find the candidate to edit
  // const candidate = users.find((user) => user.id === parseInt(id));
  const candidate = 1

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: candidate?.name || "",
      designation: candidate?.designation || "",
      tags: candidate?.tags || "",
      email: candidate?.email || "",
      projects: candidate?.projects || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      tags: Yup.array().required("Please Enter Tag"),
      email: Yup.string().required("Please Enter Your Email"),
      projects: Yup.number().required("Please Enter Your Project"),
    }),
    onSubmit: (values) => {
      const updatedUser = {
        id: candidate.id,
        ...values,
      };
      dispatch(onUpdateUser(updatedUser));
      history.push("/candidate-directory"); // Redirect back to the candidate directory
    },
  });


  if (!candidate) {
    return <React.Fragment>
      <div className="page-content">
        <Container fluid>
          Candidate not found
        </Container>
      </div>
    </React.Fragment>;
  }

  const toggleActiveStatusTab = tab => {
    if (activeStatusTab !== tab) {
      setActiveStatusTab(tab);
    }
  }

  const toggleActiveCandidateTab = tab => {
    if (activeStatusTab !== tab) {
      setActiveStatusTab(tab);
    }
  }

  const jobStatuses = [
    {id: 0, statusName: "Schedule 1st Interview", statusNameMini: "Schedule 1st", },
    {id: 1, statusName: "Schedule 2nd Interview", statusNameMini: "Schedule 2nd", },
    {id: 2, statusName: "Schedule Final Interview", statusNameMini: "Schedule Final", },
    {id: 3, statusName: "1st Interview Scheduled", statusNameMini: "1st Scheduled", },
    {id: 4, statusName: "2nd Interview Scheduled", statusNameMini: "2nd Scheduled", },
    {id: 5, statusName: "Final Interview Scheduled", statusNameMini: "Final Scheduled", },
    {id: 6, statusName: "Pass on Candidate", statusNameMini: "Pass", },
    {id: 7, statusName: "Hold on Candidate", statusNameMini: "Hold", },
    {id: 8, statusName: "Make Offer", statusNameMini: "Make Offer", },
    {id: 9, statusName: "Offer Made", statusNameMini: "Offer Made", },
    {id: 10, statusName: "Offer Accepted", statusNameMini: "Offer Accepted", },
    {id: 11, statusName: "Hired for Position", statusNameMini: "Hired", },
  ]

  const certificationColumns = useMemo(
    () => [
      {
          Header: 'Certification Name',
          accessor: 'certificationName',
      },
      {
          Header: 'Organization',
          accessor: 'organization',
      },
      {
          Header: 'Expedition Date',
          accessor: 'expeditionDate',
      },
      {
          Header: 'Certificate Link',
          accessor: 'certificateLink',
      },
    ],
    []
  );

  const certificationData = [
    {
        "certificationName": "PowerApps Developer",
        "organization": "Microsoft",
        "expeditionDate": "2025",
        "certificateLink": "http://microsoft.com/certificate"
    },
    {
        "certificationName": "PowerBi Developer",
        "organization": "Microsoft",
        "expeditionDate": "2024",
        "certificateLink": "http://microsoft.com/certificate2"
    },
  ];

  const interviewColumns = useMemo(
    () => [
        {
            Header: 'Date',
            accessor: 'interviewDate',
        },
        {
            Header: 'Time',
            accessor: 'interviewTime',
        },
        {
            Header: 'Position',
            accessor: 'position',
        },
    ],
    []
  );
  const [searchMenu, setSearchMenu] = useState(false);
  const [settingsMenu, setSettingsMenu] = useState(false);
  const [otherMenu, setOtherMenu] = useState(false);
  const [isMenu, setisMenu] = useState(false)
  const toggleMenu = () => {
    setisMenu(!isMenu)
  }

  const interviewData = [
    {
        "interviewDate": "02/18/2025",
        "interviewTime": "4:00 PM",
        "position": "PowerApps Developer",
    },
    {
        "interviewDate": "02/19/2025",
        "interviewTime": "5:00 PM",
        "position": "PowerBI Developer",
    },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs rootTitle="Recruitment" rootLink="/recruitment/" title="Jobs" titleLink="/recruitment/jobs" breadcrumbItem="View Job" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                {/* <CardTitle className="h4">Custom Tabs</CardTitle> */}
                {/* <p className="card-title-desc">Example of custom tabs</p> */}
                <Nav tabs className="nav-tabs-custom nav-justified">
                  {
                    // {id: 0, statusName: "", statusNameMini: "", },
                    jobStatuses.map((status, index) => (
                      <NavItem key={"navitem_status_" + status.id}>
                        <NavLink 
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeStatusTab === "navitem_status_" + status.id,
                          })}
                          onClick={() => {
                            toggleActiveStatusTab("navitem_status_" + status.id);
                          }}
                        >
                          <span className="d-block d-sm-none">
                            <i className="fas fa-home"></i>
                          </span>

                          <span className="d-none d-sm-block" id={`status_tooltip_${status.id}`}>
                            { status.statusNameMini }
                          </span>
                          <UncontrolledTooltip
                            placement="top"
                            target={`status_tooltip_${status.id}`}
                          >
                            { status.statusName }
                          </UncontrolledTooltip>
                        </NavLink>
                      </NavItem>
                    ))
                  }
                </Nav>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
            <Col xl="4">
              <JobSideBar />
            </Col>
            <Col xl="8">

              <Card>
                <CardBody className="border-bottom">
                  <Row>
                    <Col xs="12">
                      <ul className="list-inline user-chat-nav text-end mb-0">
                        <li className="list-inline-item d-none d-sm-inline-block">
                          <Dropdown
                            isOpen={searchMenu}
                            toggle={() => {
                              setSearchMenu(!searchMenu);
                            }}
                          >
                            <DropdownToggle
                              tag="i"
                              className="btn nav-btn"
                              type="button"
                            >
                              <i className="bx bx-search-alt-2" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end py-0 dropdown-menu-md">
                              <Form className="p-3">
                                <div className="m-0">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      placeholder="Search ..."
                                      aria-label="Recipient's username"
                                    />
                                    <button className="btn btn-primary" type="submit">
                                      <i className="mdi mdi-magnify"></i>
                                    </button>
                                  </InputGroup>
                                </div>
                              </Form>
                            </DropdownMenu>
                          </Dropdown>
                        </li>
                        <li className="list-inline-item  d-none d-sm-inline-block">
                          <Dropdown
                            isOpen={settingsMenu}
                            toggle={() => {
                              setSettingsMenu(!settingsMenu);
                            }}
                          >
                            <DropdownToggle
                              tag="i"
                              className="btn nav-btn"
                              type="button"
                            >
                              <i className="bx bx-cog" />
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem href="#">View Profile</DropdownItem>
                              <DropdownItem href="#">Clear chat</DropdownItem>
                              <DropdownItem href="#">Muted</DropdownItem>
                              <DropdownItem href="#">Delete</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </li>

                        <li className="list-inline-item">
                          <Dropdown
                            isOpen={otherMenu}
                            toggle={() => {
                              setOtherMenu(!otherMenu);
                            }}
                          >
                            <DropdownToggle
                              tag="i"
                              className="btn nav-btn"
                              type="button"
                            >
                              <i className="bx bx-dots-horizontal-rounded" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                              <DropdownItem href="#">Action</DropdownItem>
                              <DropdownItem href="#">Another Action</DropdownItem>
                              <DropdownItem href="#">Something else</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </li>

                        <li className="list-inline-item">
                          <Dropdown
                          >
                            <DropdownToggle
                              tag="i"
                              className="btn nav-btn color-danger"
                              type="button"
                            >
                              <i className="mdi mdi-hand-left text-danger" />
                            </DropdownToggle>
                          </Dropdown>
                        </li>
                        <li className="list-inline-item">
                          <Dropdown
                            isOpen={isMenu}
                            toggle={toggleMenu}
                          >
                            <DropdownToggle
                              type="button"
                              tag="button"
                              className="btn btn-light"
                            >
                              <i className="mdi mdi-wallet me-1" />
                              <span className="d-none d-sm-inline-block">
                                Move to <i className="mdi mdi-chevron-down" />
                              </span>
                            </DropdownToggle>
                            <DropdownMenu>
                              {
                                jobStatuses.map((status, index) => (
                                    <DropdownItem href="#">{ status.statusName }</DropdownItem>
                                  )
                                )
                              }
                            </DropdownMenu>
                          </Dropdown>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <Card>
                        <CardBody>
                          <div className="d-flex">
                            <div className="me-3">
                              <img
                                src={avatar2}
                                alt=""
                                className="avatar-md rounded-circle img-thumbnail"
                              />
                            </div>
                            <div className="flex-grow-1 align-self-center">
                              <div className="text-muted">
                                <h5>John Doe</h5>
                                <p className="mb-1">john@abc.com</p>
                                <p className="mb-0">Oxford University</p>
                              </div>
                            </div>
                            
                            {/* Data */}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

            










              <Card>
                <CardBody>
                  {/* <CardTitle className="h4">Custom Tabs</CardTitle> */}
                  {/* <p className="card-title-desc">Example of custom tabs</p> */}
                  <Nav tabs className="nav-tabs-custom nav-justified">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeStatusTab === "1",
                        })}
                        onClick={() => {
                          toggleActiveStatusTab("1");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-home"></i>
                        </span>
                        <span className="d-none d-sm-block">Profile</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeStatusTab === "2",
                        })}
                        onClick={() => {
                          toggleActiveStatusTab("2");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="far fa-user"></i>
                        </span>
                        <span className="d-none d-sm-block">Timeline</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeStatusTab === "3",
                        })}
                        onClick={() => {
                          toggleActiveStatusTab("3");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="far fa-envelope"></i>
                        </span>
                        <span className="d-none d-sm-block">Review</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeStatusTab === "4",
                        })}
                        onClick={() => {
                          toggleActiveStatusTab("4");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-cog"></i>
                        </span>
                        <span className="d-none d-sm-block">Comments</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardBody>
              </Card>
            </Col>
          </Row>
      </Container>
    </div>
  );
};

export default withRouter(ViewJob);