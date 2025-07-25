import PropTypes from 'prop-types'

import { Redirect } from "react-router-dom"
import React from "react"

import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { authProtectedRoutes,publicRoutes } from "./routes"

// Import all middleware
import Authmiddleware from "./routes/route"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Fake Backend
import fakeBackend from "/src/helpers/AuthType/fakeBackend";

// Import scss
import "./assets/scss/theme.scss"
import "./assets/scss/custom.scss"

// Activating fake backend
fakeBackend();

const App = props => {

  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }
                
  const Layout = getLayout()
  return (
    <React.Fragment>
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
                exact
              />
            ))}

            {authProtectedRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                exact
              />
            ))}
            <Route component={() => <Redirect to="/404" />}  />
          </Switch>
        </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
