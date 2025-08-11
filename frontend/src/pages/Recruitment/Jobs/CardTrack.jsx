import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row } from "reactstrap"
import features from "/src/assets/images/crypto/features-img/img-1.png"
import { map } from 'lodash';

const CardTrack = props => {
  const { id, title, titleColor, description, currentStatus, roles, positions } = props.track;
  const { handleTrackTitleClick } = props
  
  return (
    <React.Fragment>
      <Card>
        <div>
          <Row>
            <Col lg="9" sm="8">
              <div className="p-4">
                <h5
                  className={titleColor + " track-title"}
                  onClick={() => {
                    handleTrackTitleClick(id, false)
                  }} // Add the click handler
                  style={{ cursor: "pointer" }}
                >
                  {title}
                </h5>
                <p>{description}</p>

                <div className="">
                  <p className="mb-1">
                    <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                    <b>Status:</b> {currentStatus}
                  </p>
                  <p className="mb-1">
                    <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                    <b>Roles:</b> {roles.map((role, index) => (
                      <span key={index}>{role}{index === roles.length - 1 ? '' : ', '}</span>
                    ))}
                  </p>
                  <p className="mb-0">
                    <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                    <b>Positions:</b>
                    {map(positions, (position, index) => (
                      <span key={index}>
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        - {position.name} [{position.status}]
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="3" sm="4" className="align-self-center">
              <div>
                <img src={features} alt="" style={{opacity: "0.4"}} className="img-fluid d-block" />
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </React.Fragment>
  )
}

CardTrack.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleColor: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currentStatus: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    positions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  handleTrackTitleClick: PropTypes.func.isRequired, // Add prop type for the handler
};


export default CardTrack