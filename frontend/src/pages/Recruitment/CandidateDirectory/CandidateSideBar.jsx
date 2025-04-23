import React, {useState, useEffect, useRef, useCallback} from "react"
import Select from "react-select"
import { withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"
import { Row, Col, Card, CardBody, Label, FormGroup, Input, Form } from "reactstrap"
import Rating from "react-rating";
import RatingTooltip from "react-rating-tooltip";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom"
import axios from 'axios'

import avatar1 from "/src/assets/images/users/avatar-1.jpg"
import profileImg from "/src/assets/images/profile-img.png"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL;

const CandidateSideBar = (props) => {

  const [initialValues, setInitialValues] = useState(null);
  const [selectedGroup, setselectedGroup] = useState(null);
  const [rate, setRate] = useState("");
  const ref = React.createRef();

  toastr.options = {
    positionClass: "toast-top-right",
    timeOut: "3000",
    closeButton: true,
    debug: false,
    progressBar: true,
    preventDuplicates: true,
    newestOnTop: true,
  };

  const validationSchema = Yup.object({
    id: Yup.number().required().positive().integer(),
    firstName: Yup.string().max(100).required(),
    lastName: Yup.string().max(100).required(),
    status: Yup.number().required().positive().integer(),
    englishCertification: Yup.number().positive().integer(),
    englishRating: Yup.number().positive().integer(),
    education: Yup.string().max(2500),
    skills: Yup.string().max(2500),
    workHistory: Yup.string().max(2500),
    candidateNotes: Yup.string().max(2500),
  });

  useEffect(() => {
    // fetchCandidate().then(setInitialValues);
    setInitialValues({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      status: "2",
      englishCertification: "2",
      englishRating: "4",
      education: "Test Education",
      skills: "Test Skills",
      workHistory: "Test Work History",
      candidateNotes: "Test Candidate Notes",
    })
  }, [])

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
  const statusList = {
    label: "Status",
    options: [
      { label: "Future Potential", value: "1" },
      { label: "No Future Potential", value: "2" },
      { label: "Open Interviews", value: "3" },
      { label: "Hired", value: "4" }
    ]
  }
  const englishCertificationList =  {
    label: "English Certification",
    options: [
      { label: "None", value: "1" },
      { label: "TOEFL", value: "2" },
      { label: "IELTS", value: "3" },
      { label: "Cambridge", value: "4" },
    ]
  }

  return (
    <React.Fragment>
      { initialValues ? 
        (
          <Formik 
            innerRef={ref}
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const userId = encodeURIComponent(values.id);
                const response = await axios.patch(
                  `api/global-candidates/${userId}`,
                  values
                );
                console.success("Saved");
              } catch (error) {
                console.error("Failed to save:", error);
                // Optional: Show error to user
                toastr.error("An error occurred while saving changes.");
              } finally {
                setSubmitting(false);
              }

            }}
          >
            {
              ({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched }) => {

                const timeoutRef = useRef(null);
                const previousValues = useRef(values);

                useEffect(() => {
                  // Skip the first render
                  if (JSON.stringify(previousValues.current) === JSON.stringify(values)) return;

                  // Clear the previous timeout
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }

                  // Set a new timeout
                  timeoutRef.current = setTimeout(() => {
                    handleSubmit();
                  }, 1000); // Delay in milliseconds

                  previousValues.current = values;
                  
                  return () => {
                    clearTimeout(timeoutRef.current);
                  };
                }, [values, handleSubmit]);

                return (
                  <Form>
                    {
                      isSubmitting && (
                        <div className="spinner-border text-primary sidebar-spinner" role="status">
                          <span className="visually-hidden">Saving...</span>
                        </div>
                      )
                    }
                    <Card className="overflow-hidden">
                      <div className="bg-primary bg-soft">
                        <Row>
                          <Col xs="7">
                            <div className="text-primary p-3">
                              <h5 className="text-primary">{ initialValues.firstName + " " + initialValues.lastName }</h5>
                              <br />
                            </div>
                          </Col>
                          <Col xs="5" className="align-self-end">
                            <img src={profileImg} alt="" className="img-fluid" />
                          </Col>
                        </Row>
                      </div>
                      <CardBody className="pt-0">
                        <Row>
                          <Col sm="3">
                            <div className="avatar-md profile-user-wid mb-2" >
                              <img
                                src={avatar1}
                                alt=""
                                className="img-thumbnail rounded-circle"
                              />
                            </div>
                          </Col>
                          <Col sm="9" className="" style={{top: '-2.7rem'}}>
                            <Row className="">
                              <Col sm={4}>
                                <Label
                                  htmlFor="horizontal-firstname-Input"
                                  className="col-form-label"
                                >
                                  {
                                    props.t("Status")
                                  }
                                </Label>
                              </Col>
                              <Col sm={8}>
                                <Select
                                  options={statusList.options}
                                  classNamePrefix="select2-selection"
                                  name="status"
                                  value={statusList.options.find(
                                    opt => opt.value === values.status
                                  )}
                                  onChange={selectedOption => {
                                    handleChange({
                                      target: {
                                        name: "status",
                                        value: selectedOption.value,
                                      },
                                    });
                                  }}
                                  onBlur={handleBlur}
                                />

                                
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row>
                          
                        </Row>
                        <Row className="">
                          <Slider {...sliderSettings}>
                            <div className="slide text-center" key="slide1">
                              <i className="far fa-file-pdf text-danger"></i>
                              <p className="text-muted mb-0">Resume (EN)</p>
                            </div>
                            <div className="slide text-center" key="slide2">
                              <i className="far fa-file-word text-primary"></i>
                              <p className="text-muted mb-0">Resume (ES)</p>
                            </div>
                          </Slider>
                        </Row>
                        <Row className="mt-4">
                          <Col sm={5}>
                            <Label
                              htmlFor="english-certification"
                              className="col-form-label"
                            >
                              {props.t("English Certification")}
                            </Label>
                          </Col>
                          <Col md={7}>
                            <Select
                              options={englishCertificationList.options}
                              classNamePrefix="select2-selection"
                              name="englishCertification"
                              value={englishCertificationList.options.find(
                                opt => opt.value === values.englishCertification
                              )}
                              onChange={selectedOption => {
                                handleChange({
                                  target: {
                                    name: "englishCertification",
                                    value: selectedOption.value,
                                  },
                                });
                              }}
                              onBlur={handleBlur}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col sm={5}>
                            <Label
                              htmlFor="english-rating"
                              className="col-form-label"
                            >
                              {props.t("English Rating")}
                            </Label>
                          </Col>
                          <Col md={7}>
                            <RatingTooltip 
                              max={5}
                              defaultRating={values.englishRating}
                              onChange={rate => {
                                setRate(rate);
                              }}
                              ActiveComponent={
                                <i className="mdi mdi-star text-primary" />
                              }
                              InActiveComponent={
                                <i className="mdi mdi-star-outline text-primary" />
                              }
                            />
                          </Col>
                          <Col md={12} className="mt-3">
                            <Label className="form-label">{props.t("Education")}</Label>
                            <textarea
                              className="input-large form-control"
                              name="education"
                              rows="3"
                              placeholder={props.t("Education") + "..."}
                              value={values.education}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {
                              // errors.education && <div>{errors.education}</div>
                            }
                          </Col>
                          <Col md={12} className="mt-3">
                            <Label className="form-label">{props.t("Skills")}</Label>
                            <textarea
                              className="input-large form-control"
                              name="skills"
                              rows="3"
                              placeholder={props.t("Skills") + "..."}
                              value={values.skills}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Col>
                          <Col md={12} className="mt-3">
                            <Label className="form-label">{props.t("Work History")}</Label>
                            <textarea
                              className="input-large form-control"
                              name="workHistory"
                              rows="3"
                              placeholder={props.t("Work History") + "..."}
                              value={values.workHistory}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Col>
                          <Col md={12} className="mt-3">
                            <Label className="form-label">{props.t("Candidate Notes")}</Label>
                            <textarea
                              className="input-large form-control"
                              name="candidateNotes"
                              rows="3"
                              placeholder={props.t("Candidate Notes") + "..."}
                              value={values.candidateNotes}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Form>
                )
              }
            }
          </Formik>
        ) :  <div>Loading...</div>
      }
    </React.Fragment>
  )
}

import PropTypes from "prop-types";

CandidateSideBar.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withRouter(withTranslation()(CandidateSideBar))