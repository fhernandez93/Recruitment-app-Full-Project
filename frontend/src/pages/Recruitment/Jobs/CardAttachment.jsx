import PropTypes from 'prop-types'
import React from "react"
import { Link } from "react-router-dom"
import { Card, Col, Row } from "reactstrap"

const CardAttachment = props => {
  const { filename, name, category, extension, dateUploaded, color, icon } = props.attachment
  // const nameIcon = name.charAt(0).toUpperCase()
  
  return (
    <React.Fragment>
      <Col xl="12" sm="12">
        <Card>
          <Row>
            <Col xl="5">
              <div className="text-center p-4 border-end">
                <div className="avatar-sm mx-auto mb-3 mt-1">
                  <span
                    className={
                      "avatar-title rounded-circle  bg-" +
                      color +
                      " primary text-" +
                      color +
                      " font-size-16"
                    }
                  >
                    <i className={icon + " text-white"} style={{fontSize: "1.2rem"}}></i>
                  </span>
                </div>
                <h5 className="text-truncate">{name}</h5>
                <div className="mt-4">
                  <Link to="#" className="text-decoration-underline text-reset">
                    <small>View File <i className="mdi mdi-arrow-right"></i></small>
                  </Link>
                </div>
              </div>
              
            </Col>

            <Col xl="7">
              <div className="p-4 text-center text-xl-start">
                <Row>
                  <Col xs="6">
                    <div>
                      <p className="text-muted mb-2 text-truncate">Name</p>
                      <h5>{filename}</h5>
                    </div>
                  </Col>
                  <Col xs="6">
                    <div>
                      <p className="text-muted mb-2 text-truncate">
                        Date Uploaded
                      </p>
                      <h5>{dateUploaded}</h5>
                    </div>
                  </Col>
                  <Col className="mt-4" xs="6">
                    <div>
                      <p className="text-muted mb-2 text-truncate">Category</p>
                      <h5>{category}</h5>
                    </div>
                  </Col>
                  <Col className="mt-4" xs="6">
                    <div>
                      <p className="text-muted mb-2 text-truncate">
                        Extension
                      </p>
                      <h5>{extension}</h5>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardAttachment.propTypes = {
  attachment: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    extension: PropTypes.string.isRequired,
    dateUploaded: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.string
  }).isRequired
}

export default CardAttachment
