import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../store/actions";
import Login from '../pages/Authentication/Login';

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {

  // REDUX BEGINS
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.User);

  useEffect(() => {
    // Fetch user data only if it's not already available and not loading
    if (!data && !loading) {
      dispatch(fetchUser());
      // console.log("Fetching user data...");
    }

    if (data) {
      // console.log("User data fetched:", data);
    }

  }, [data]); // Dependencies to ensure effect runs correctly
  // REDUX ENDS

  // Wait until either data or error is known
  if (loading || (!data && !error)) {
    return <></>;
  }

  // If the route is protected and no user data is available, redirect to login
  if (isAuthProtected && (!data || error)) {
    return (
      <Redirect
        to={{ pathname: "/login", state: { from: rest.location } }}
      />
    );
  }

  // Render the protected route component if data is available
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export default Authmiddleware;
