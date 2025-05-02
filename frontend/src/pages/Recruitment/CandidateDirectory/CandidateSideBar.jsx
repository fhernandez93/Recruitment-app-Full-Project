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
import { useParams } from "react-router-dom";

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
  const [englishCertificationList, setEnglishCertificationList] = useState([]);
  const [globalStatusList, setGlobalStatusList] = useState([]);
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
  
  useEffect(() => {
    const fetchGlobalStatusList = async () => {
      try {
        const response = await axios.get(`api/global-statuses`);
        const data = response.data;
  
        setGlobalStatusList(
          data.map(stat => ({
            label: stat.Status,
            value: stat.StatusID,
          }))
        );
      } catch (error) {
        toastr.error("Failed to load the list of Status.");
      }
    };
  
    fetchGlobalStatusList();
  }, []);

  useEffect(() => {
    const fetchEnglishCertifications = async () => {
      try {
        const response = await axios.get(`api/english-certifications`);
        const data = response.data;
  
        setEnglishCertificationList(
          data.map(cert => ({
            label: cert.Certification,
            value: cert.CertificationID,
          }))        
        );
      } catch (error) {
        toastr.error("Failed to load English Certifications.");
      }
    };
  
    fetchEnglishCertifications();
  }, []);
  
  
  useEffect(() => {
    const fetchGlobalCandidate = async () => {
      try {
        const response = await axios.get(`api/global-candidates/${candidateId}`);
        // Destructure to exclude CandidateID, UpdatedAt and CreatedAt. We don't need them in the form.
        const { CandidateID, UpdatedAt, CreatedAt, ...restOfData } = response.data;
  
        setInitialValues( {...restOfData} );
      } catch (error) {
        toastr.error("Failed to load the information of the candidate.");
      }
    };
  
    fetchGlobalCandidate();
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
                const response = await axios.patch(`api/global-candidates/${candidateId}`, values);
                showQuickToastr("Saved.");
              } catch (error) {
                toastr.error("An error occurred while saving changes.");
                console.error("Failed to save:", error);
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
                              <h5 className="text-primary">{ initialValues.CandidateFirstName + " " + initialValues.CandidateLastName }</h5>
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
                                  options={globalStatusList}
                                  classNamePrefix="select2-selection"
                                  name="GlobalStatusID"
                                  value={globalStatusList.find(
                                    stat => stat.value === values.GlobalStatusID
                                  )}
                                  onChange={selectedOption => {
                                    handleChange({
                                      target: {
                                        name: "GlobalStatusID",
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
                              options={englishCertificationList}
                              classNamePrefix="select2-selection"
                              name="EnglishCertificationID"
                              value={englishCertificationList.find(
                                cert => cert.value === values.EnglishCertificationID
                              )}
                              onChange={selectedOption => {
                                handleChange({
                                  target: {
                                    name: "EnglishCertificationID",
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
                              defaultRating={values.EnglishRating}
                              onChange={rate => {
                                setRate(rate);
                                handleChange({
                                  target: {
                                    name: "EnglishRating",
                                    value: rate,
                                  },
                                });
                              }}
                              onBlur={handleBlur}
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
                              name="EducationNotes"
                              rows="3"
                              placeholder={props.t("Education") + "..."}
                              value={values.EducationNotes}
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
                              name="Skills"
                              rows="3"
                              placeholder={props.t("Skills") + "..."}
                              value={values.Skills}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Col>
                          <Col md={12} className="mt-3">
                            <Label className="form-label">{props.t("Work History")}</Label>
                            <textarea
                              className="input-large form-control"
                              name="WorkHistory"
                              rows="3"
                              placeholder={props.t("Work History") + "..."}
                              value={values.WorkHistory}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Col>
                          <Col md={12} className="mt-3">
                            <Label className="form-label">{props.t("Candidate Notes")}</Label>
                            <textarea
                              className="input-large form-control"
                              name="CandidateNotes"
                              rows="3"
                              placeholder={props.t("Candidate Notes") + "..."}
                              value={values.CandidateNotes}
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
        ) :  
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      }
    </React.Fragment>
  )
}

import PropTypes from "prop-types";

CandidateSideBar.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withRouter(withTranslation()(CandidateSideBar))