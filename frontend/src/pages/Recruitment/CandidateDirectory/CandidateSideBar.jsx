import React, {useState} from "react"
import Select from "react-select"
import { Row, Col, Card, CardBody, Label, FormGroup, Input } from "reactstrap"
import RatingTooltip from "react-rating-tooltip";
import { Link } from "react-router-dom"

import avatar1 from "/src/assets/images/users/avatar-1.jpg"
import profileImg from "/src/assets/images/profile-img.png"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CandidateSideBar = () => {

  const [selectedGroup, setselectedGroup] = useState(null);
  const [rate, setRate] = useState("");
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
  
  const CustomNextArrow = (props) => {
    const { className } = props;
    return (
      <div
        className={className}
        style={{
          zIndex: 10,
          fontSize: "24px",
          color: "black",
          position: "absolute",
        }}
      >
        <i className="mdi mdi-chevron-right text-primary me-1" />
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
  ]

  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">John Doe</h5>
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
                    Status
                  </Label>
                </Col>
                <Col sm={8}>
                  <Select
                    value={selectedGroup}
                    onChange={() => {
                      handleSelectGroup();
                    }}
                    options={optionGroup}
                    classNamePrefix="select2-selection"
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
                htmlFor="billing-name"
                className="col-form-label"
              >
                English Certification
              </Label>
            </Col>
            <Col md={7}>
              <Select
                value={selectedGroup}
                onChange={() => {
                  handleSelectGroup();
                }}
                options={optionGroup}
                classNamePrefix="select2-selection"
              />
            </Col>
          </Row>
          <Row className="mt-1">
            <Col sm={5}>
              <Label
                htmlFor="billing-name"
                className="col-form-label"
              >
                English Rating
              </Label>
            </Col>
            <Col md={7}>
              {/* <RatingTooltip
                max={5}
                onChange={rate => {
                  setRate(rate);
                }}
                ActiveComponent={
                  <i
                    className="mdi mdi-star text-primary"
                    // style={starStyle}
                  />
                }
                InActiveComponent={
                  <i
                    className="mdi mdi-star-outline text-primary"
                    // style={starStyle}
                  />
                }
              /> */}
            </Col>
            <Col md={12} className="mt-3">
              <Label className="form-label">Education</Label>
              <textarea
                className="input-large form-control"
                id="message"
                rows="3"
                placeholder="Education..."
              />
            </Col>
            <Col md={12} className="mt-3">
              <Label className="form-label">Skills</Label>
              <textarea
                className="input-large form-control"
                id="message"
                rows="3"
                placeholder="Skills..."
              />
            </Col>
            <Col md={12} className="mt-3">
              <Label className="form-label">Work History</Label>
              <textarea
                className="input-large form-control"
                id="message"
                rows="3"
                placeholder="Work History..."
              />
            </Col>
            <Col md={12} className="mt-3">
              <Label className="form-label">Candidate Notes</Label>
              <textarea
                className="input-large form-control"
                id="message"
                rows="3"
                placeholder="Candidate Notes..."
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default CandidateSideBar
