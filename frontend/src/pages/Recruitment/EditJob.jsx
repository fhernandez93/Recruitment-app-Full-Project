import React, { useEffect, useState, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardTitle, CardBody, Col, Container, Row, Label, Input, FormFeedback, Form, InputGroup } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { updateUser as onUpdateUser } from "/src/store/contacts/actions";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import InputMask from "react-input-mask"

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

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
                        <label
                          htmlFor="example-date-input"
                          className="col-md-2 col-form-label"
                        >
                          Date
                        </label>
                          <div className="docs-datepicker">
                            <InputGroup>
                              <Flatpickr
                                // value={Date.parse()}
                                className="form-control d-block"
                                placeholder="Pick a date"
                                options={{
                                  altInput: true,
                                  dateFormat: "d-m-y"
                                }}
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary docs-datepicker-trigger"
                                  disabled
                                >
                                  <i
                                    className="fa fa-calendar"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </InputGroup>
                            <div className="docs-datepicker-container" />
                          </div>
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Job Start Date</Label>
                          <div className="docs-datepicker">
                            <InputGroup>
                              <Flatpickr
                                // value={Date.parse()}
                                className="form-control d-block"
                                placeholder="Pick a date"
                                options={{
                                  altInput: true,
                                  dateFormat: "d-m-y"
                                }}
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary docs-datepicker-trigger"
                                  disabled
                                >
                                  <i
                                    className="fa fa-calendar"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </InputGroup>
                            <div className="docs-datepicker-container" />
                          </div>
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
                        <select defaultValue="0" className="form-select">
                          <option value="0"></option>
                          <option value="1">Ryan Gavrilles</option>
                          <option value="2">Luis Ramirez</option>
                          <option value="3">Francisco Hernandez</option>
                        </select>
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Hiring Manager</Label>
                        <select defaultValue="0" className="form-select">
                          <option value="0"></option>
                          <option value="1">Ryan Gavrilles</option>
                          <option value="2">Luis Ramirez</option>
                          <option value="3">Francisco Hernandez</option>
                        </select>
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Interviewer</Label>
                        <select defaultValue="0" className="form-select">
                          <option value="0"></option>
                          <option value="1">Ryan Gavrilles</option>
                          <option value="2">Luis Ramirez</option>
                          <option value="3">Francisco Hernandez</option>
                        </select>
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
                        <select defaultValue="0" className="form-select">
                          <option value="0"></option>
                          <option value="1">Forcasted</option>
                          <option value="2">Open</option>
                          <option value="3">Filled</option>
                          <option value="4">Hold</option>
                          <option value="5">Cancelled</option>
                        </select>
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
                          type="number"
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
                          type="number"
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
                        <select defaultValue="0" className="form-select">
                          <option value="0"></option>
                          <option value="1">Arizona</option>
                          <option value="2">Central</option>
                          <option value="3">Eastern</option>
                          <option value="4">Mexico City</option>
                          <option value="5">Mountain</option>
                          <option value="5">Pacific</option>
                        </select>
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Days (from)</Label>
                        <select defaultValue="0" className="form-select">
                          <option value="0"></option>
                          <option value="1">Monday</option>
                          <option value="2">Tuesday</option>
                          <option value="3">Wednesday</option>
                          <option value="4">Thursday</option>
                          <option value="5">Friday</option>
                          <option value="6">Saturday</option>
                          <option value="5">Sunday</option>
                        </select>
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Days (to)</Label>
                        <select defaultValue="0" className="form-select">
                          <option value="0"></option>
                          <option value="1">Monday</option>
                          <option value="2">Tuesday</option>
                          <option value="3">Wednesday</option>
                          <option value="4">Thursday</option>
                          <option value="5">Friday</option>
                          <option value="6">Saturday</option>
                          <option value="5">Sunday</option>
                        </select>
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Start Time - End Time</Label>
                        <div className="d-flex align-items-center gap-2">
                          <select defaultValue="0" name="mySelect1" className="form-select">
                            <option value=""></option>
                            <option value="00">00</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                          </select>
                          <span> : </span>
                          <select defaultValue="0" name="mySelect2" className="form-select">
                            <option value=""></option>
                            <option value="00">00</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                            <option value="32">32</option>
                            <option value="33">33</option>
                            <option value="34">34</option>
                            <option value="35">35</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                            <option value="44">44</option>
                            <option value="45">45</option>
                            <option value="46">46</option>
                            <option value="47">47</option>
                            <option value="48">48</option>
                            <option value="49">49</option>
                            <option value="50">50</option>
                            <option value="51">51</option>
                            <option value="52">52</option>
                            <option value="53">53</option>
                            <option value="54">54</option>
                            <option value="55">55</option>
                            <option value="56">56</option>
                            <option value="57">57</option>
                            <option value="58">58</option>
                            <option value="59">59</option>
                          </select>
                          <span> - </span>
                            <select defaultValue="0" name="mySelect1" className="form-select">
                            <option value=""></option>
                            <option value="00">00</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                          </select>
                          <span> : </span>
                          <select defaultValue="0" name="mySelect2" className="form-select">
                            <option value=""></option>
                            <option value="00">00</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                            <option value="32">32</option>
                            <option value="33">33</option>
                            <option value="34">34</option>
                            <option value="35">35</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                            <option value="44">44</option>
                            <option value="45">45</option>
                            <option value="46">46</option>
                            <option value="47">47</option>
                            <option value="48">48</option>
                            <option value="49">49</option>
                            <option value="50">50</option>
                            <option value="51">51</option>
                            <option value="52">52</option>
                            <option value="53">53</option>
                            <option value="54">54</option>
                            <option value="55">55</option>
                            <option value="56">56</option>
                            <option value="57">57</option>
                            <option value="58">58</option>
                            <option value="59">59</option>
                          </select>
                        </div>
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
                      <button type="button" className="btn btn-primary float-end" >
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