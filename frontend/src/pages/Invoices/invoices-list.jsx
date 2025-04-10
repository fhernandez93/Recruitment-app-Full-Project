import React, { useEffect } from "react"
import { Col, Container, Row } from "reactstrap"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb"

//Import Card invoice
import CardInvoice from "./card-invoice"
import { getInvoices as onGetInvoices } from "/src/store/actions"

const InvoicesList = props => {
   //meta title
   document.title="Invoice List | Optumus Suite ";

  const dispatch = useDispatch()

  const { invoices } = useSelector(state => ({
    invoices: state.invoices.invoices,
  }))

  useEffect(() => {
    dispatch(onGetInvoices())
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice List" />

          <Row>
            {map(invoices, (invoice, key) => (
              <CardInvoice data={invoice} key={"_invoice_" + key} />
            ))}
          </Row>
          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                  Load more
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

InvoicesList.propTypes = {
  invoices: PropTypes.array,
  onGetInvoices: PropTypes.func,
}

export default withRouter(InvoicesList)
