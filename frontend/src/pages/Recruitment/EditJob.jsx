import React, { useEffect, useState, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardTitle, CardBody, Col, Container, Row, Label, Input, FormFeedback, Form } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { updateUser as onUpdateUser } from "/src/store/contacts/actions";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Select from "react-select";
import TableContainer from "./CandidateDirectory/TableContainer";
//Import Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditJob = () => {
  const { id } = useParams(); // Get the candidate ID from the URL
  const history = useHistory();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.contacts);

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
  const candidate = users.find((user) => user.id === parseInt(id));

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
    return <div>Candidate not found</div>;
  }

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
        <Breadcrumbs rootTitle="Recruitment" rootLink="/recruitment/" title="Job" titleLink="/recruitment/edit-job" breadcrumbItem="Edit Job" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Job Information</CardTitle>
                <Form onSubmit={validation.handleSubmit}>
                  {/* Job name */}
                  <Row className="edit-job-row">
                    <Col xs={12} md={5} className="offset-md-1 mt-3">
                      <div className="mt-4">
                        <Label className="form-label mt-2 text-muted">
                          What should this job be called?
                        </Label>
                      </div>
                    </Col>
                    <Col xs={12} md={5} className="mt-3">
                      <div className="mb-3">
                        <Label className="form-label">Name</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  {/* Job ID */}
                  <Row className="edit-job-row">
                    <Col xs={12} md={5} className="offset-md-1 mt-3">
                      <div className="mt-4 pr-1">
                        <Label className="form-label mt-2 text-muted">
                          ID code for this job
                        </Label>
                      </div>
                    </Col>
                    <Col xs={12} md={5} className="mt-3">
                      <div className="mb-3">
                        <Label className="form-label">Job ID</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  {/* Client */}
                  <Row className="edit-job-row">
                    <Col xs={12} md={5} className="offset-md-1 mt-3">
                      <div className="mt-4">
                        <Label className="form-label mt-2 text-muted">
                          What is the client's name?
                        </Label>
                      </div>
                    </Col>
                    <Col xs={12} md={5} className="mt-3">
                      <div className="mb-3 pr-1">
                        <Label className="form-label">Client</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  {/* Location */}
                  <Row className="edit-job-row">
                    <Col xs={12} md={5} className="offset-md-1 mt-3">
                      <div className="mt-4 pr-1">
                        <Label className="form-label mt-2 text-muted">
                          Set the location for your job postings here. Some job feeds require each listing to have a specific location. If left blank, location details will not be requested
                        </Label>
                      </div>
                    </Col>
                    <Col xs={12} md={5} className="mt-3">
                      <div className="mb-3">
                        <Label className="form-label">City</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">State</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Country</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  {/* Dates */}
                  <Row className="edit-job-row">
                    <Col xs={12} md={5} className="offset-md-1 mt-3">
                      <div className="mt-4 pr-1">
                        <Label className="form-label mt-2 text-muted">
                          Enter the dates for when the job was posted and when the position is scheduled to start
                        </Label>
                      </div>
                    </Col>
                    <Col xs={12} md={5} className="mt-3">
                      <div className="mb-3">
                        <Label className="form-label">Date Posted</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Job Start Date</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  {/* Hiring Team */}
                  <Row className="edit-job-row">
                    <Col xs={12} md={5} className="offset-md-1 mt-3">
                      <div className="mt-4 pr-1">
                        <Label className="form-label mt-2 text-muted">
                          Information about the hiring team involved in the recruitment process
                        </Label>
                      </div>
                    </Col>
                    <Col xs={12} md={5} className="mt-3">
                      <div className="mb-3">
                        <Label className="form-label">Recruiting Lead</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Hiring Manager</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Interviewers</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  {/* Details */}
                  <Row className="edit-job-row">
                    <Col xs={12} md={5} className="offset-md-1 mt-3">
                      <div className="mt-4 pr-1">
                        <Label className="form-label mt-2 text-muted">
                          Key details about the job, including status, description, and salary range
                        </Label>
                      </div>
                    </Col>
                    <Col xs={12} md={5} className="mt-3">
                      <div className="mb-3">
                        <Label className="form-label">Job Status</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Job Description</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Salary Range Low</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Salary Range High</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  {/* Schedule */}
                  <Row className="edit-job-row">
                    <Col xs={12} md={5} className="offset-md-1 mt-3">
                      <div className="mt-4 pr-1">
                        <Label className="form-label mt-2 text-muted">
                          Work schedule details, time zone and days of the week
                        </Label>
                      </div>
                    </Col>
                    <Col xs={12} md={5} className="mt-3">
                      <div className="mb-3">
                        <Label className="form-label">Time Zone</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Days (from)</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Days (to)</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Start Time - End Time</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  {/* Employees needed */}
                  <Row className="edit-job-row">
                    <Col xs={12} md={5} className="offset-md-1 mt-3">
                      <div className="mt-4 pr-1">
                        <Label className="form-label mt-2 text-muted">
                          Number of positions required and how many have been filled
                        </Label>
                      </div>
                    </Col>
                    <Col xs={12} md={5} className="mt-3">
                      <div className="mb-3">
                        <Label className="form-label">Date Posted</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Job Start Date</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} className="mt-3">
                      <button type="button" className="btn btn-primary" >
                        <i className="bx bx-send font-size-16 align-middle me-2"></i>{" "}
                        Submit
                      </button>
                    </Col>
                  </Row>

                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditJob;