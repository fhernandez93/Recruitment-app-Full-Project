import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import axios from "axios";
import { fetchUser } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";
import Login from '../pages/Authentication/Login';

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {

  // // REDUX BEGINS
  // const dispatch = useDispatch();
  // const { user, loading } = useSelector(state => state.user);
  
  // useEffect(() => {
  //   dispatch(fetchUser());
  // }, [dispatch]);
  // // REDUX ENDS

  // FETCH BEGINS
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {  // Only fetch if we're in loading state
      const fetchUser = async () => {
        try {
          axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL;
          const response = await axios.get('/api/user', { withCredentials: true });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null);  // Explicitly set user to null on error
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, []);  // Add loading as dependency

  if (loading) {
    return <Layout>...</Layout>;
  }

  return (
    <Route
      {...rest}
      render={props => {

        if (isAuthProtected && !user) {
          return (
            // <Login {...props} />
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        )

      }}
    />
  )
}

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any, 
}

export default Authmiddleware;
