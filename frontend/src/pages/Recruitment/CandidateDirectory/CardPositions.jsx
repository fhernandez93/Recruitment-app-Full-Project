import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row } from "reactstrap"
import { Link } from "react-router-dom"
import SimpleBar from "simplebar-react"
import { Table } from "reactstrap"
import { CardBody } from "reactstrap"


const CardPositions = props => {
  const { positions } = props
  
  return (
    <React.Fragment>
      <Card className="position-relative"> 
        <div className="btn-group btn-group-sm">
            <button 
              className="position-absolute end-0 btn btn-primary"
              style={{
                top: "0.5rem",
                zIndex: "1",
                margin: "0.5rem 2rem"
              }}
            >
            <i className="mdi mdi-plus font-size-16 align-middle me-2"></i>
            Add &nbsp;
          </button>
        </div>
        <div>
          <Row>
            <Col lg="12">
              <div className="p-4">
                <h5 className="text-primary">
                  Positions
                </h5>

              </div>
            </Col>
            <Col lg="3" sm="4" className="align-self-center">
              <div>
                { 
                  // <img src={features} alt="" style={{opacity: "0.4"}} className="img-fluid d-block" />
                }
              </div>
            </Col>
          </Row>
          <Row>
            <div>
              <CardBody className="pt-0">
                <div className="">
                  <SimpleBar >
                    <div className="table-responsive">
                      <Table className="table table-nowrap align-middle table-hover mb-0">
                        <tbody>
                          {
                            positions.map((position, index) => (
                              <tr key={index}>
                                <td>
                                  <h5 className="text-truncate font-size-14 mb-1">
                                    <Link to="#" className="text-dark">
                                      { position.name }
                                    </Link>
                                  </h5>
                                  <p className="text-muted mb-0">{position.status}</p>
                                </td>
                                <td style={{ width: "90px" }}>
                                  <div>
                                    <div
                                      className="btn-group btn-group-example mb-3"
                                      role="group"
                                    >
                                      <button
                                        type="button"
                                        className="btn btn-primary w-xs"
                                      >
                                        <i className="mdi mdi-thumb-up"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-danger w-xs"
                                      >
                                        <i className="mdi mdi-thumb-down"></i>
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              
                            ))
                          }
                        </tbody>
                      </Table>
                    </div>
                  </SimpleBar>
                </div>
              </CardBody>
            </div>
          </Row>
        </div>
      </Card>
    </React.Fragment>
  )
}

export default CardPositions