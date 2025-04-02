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

const EditCandidate = () => {
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
        <Breadcrumbs rootTitle="Recruitment" rootLink="/recruitment/" title="Candidate Directory" titleLink="/recruitment/candidate-directory" breadcrumbItem="Edit Candidate" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Candidate Information</CardTitle>
                <Form onSubmit={validation.handleSubmit}>
                  <Row form>
                    <Col xs={6}>
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
                      {/* Add other fields (designation, email, tags, projects) similarly */}
                    </Col>
                    <Col xs={6}>
                      <div className="mb-3">
                        <Label className="form-label">Date of Birth</Label>
                        <div className="col-md-12">
                          <input
                            className="form-control"
                            type="date"
                            defaultValue="2019-08-19"
                            id="example-date-input"
                          />
                        </div>
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      {/* Add other fields (designation, email, tags, projects) similarly */}
                    </Col>
                    <Col xs={6}>
                      <div className="mb-3">
                        <Label className="form-label">Global Status</Label>
                        <Select
                          value={selectedGroup}
                          onChange={() => {
                            handleSelectGroup();
                          }}
                          options={optionGroup}
                          classNamePrefix="select2-selection"
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      {/* Add other fields (designation, email, tags, projects) similarly */}
                    </Col>
                    <Col xs={3}>
                      <div className="mb-3">
                        <Label className="d-block mb-3">English Skills</Label>
                        <div className="form-check form-check-inline">
                          <Input
                            type="radio"
                            id="customRadioInline1"
                            name="customRadioInline1"
                            className="form-check-input"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="customRadioInline1"
                          >
                            Poor
                          </Label>
                        </div>
                        &nbsp;
                        <div className="form-check form-check-inline">
                          <Input
                            type="radio"
                            id="customRadioInline2"
                            name="customRadioInline1"
                            className="form-check-input"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="customRadioInline2"
                          >
                            Good
                          </Label>
                        </div>
                        &nbsp;
                        <div className="form-check form-check-inline">
                          <Input
                            type="radio"
                            id="customRadioInline3"
                            name="customRadioInline1"
                            className="form-check-input"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="customRadioInline3"
                          >
                            Great
                          </Label>
                        </div>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <div className="mb-3">
                        <Label className="d-block mb-3">Longevity Skills</Label>
                        <div className="form-check form-check-inline">
                          <Input
                            type="radio"
                            id="rdoLongetivity1"
                            name="rdoLongetivity1"
                            className="form-check-input"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="rdoLongetivity1"
                          >
                            Poor
                          </Label>
                        </div>
                        &nbsp;
                        <div className="form-check form-check-inline">
                          <Input
                            type="radio"
                            id="rdoLongetivity2"
                            name="rdoLongetivity1"
                            className="form-check-input"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="rdoLongetivity2"
                          >
                            Good
                          </Label>
                        </div>
                        &nbsp;
                        <div className="form-check form-check-inline">
                          <Input
                            type="radio"
                            id="rdoLongetivity3"
                            name="rdoLongetivity1"
                            className="form-check-input"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="rdoLongetivity3"
                          >
                            Great
                          </Label>
                        </div>
                      </div>
                    </Col>
                    <Col lg={12} className="mb-3">
                      <Label className="d-block mb-3">Experience</Label>
                      {["Administrative", "Call Center", "Claims Processing", "Customer Service", "Financial", "Insurance", "Medical Background", "Teaching"].map((checkName, index) => (
                        <div className="form-check form-check-inline" key={index}>
                          <Input
                            type="checkbox"
                            className="form-check-Input"
                            id={`formrow-customCheck${index + 1}`}
                          />
                          <Label
                            className="form-check-Label"
                            htmlFor={`formrow-customCheck${index + 1}`}
                          >
                            {checkName}
                          </Label>
                          &nbsp;&nbsp;
                        </div>
                      ))}
                    </Col>
                    <Col lg={12} className="mb-3">
                      <label htmlFor="message">Comments</label>
                      <textarea
                        id="message"
                        className="form-control"
                        placeholder="Enter Your Coment"
                      ></textarea>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Certifications & Courses</CardTitle>
                <TableContainer
                    columns={certificationColumns}
                    data={certificationData}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    className="custom-header-css"
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Interviews</CardTitle>
                <TableContainer
                    columns={interviewColumns}
                    data={interviewData}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    className="custom-header-css"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-end">
              <button type="submit" className="btn btn-success">
                Save
              </button>
              <br />
              <br />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditCandidate;