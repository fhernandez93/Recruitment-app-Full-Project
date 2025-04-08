// export const FETCH_USER = "FETCH_USER";
// export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
// export const FETCH_USER_FAIL = "FETCH_USER_FAIL";

import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
} from "./actionTypes"

export const fetchUser = () => ({
  type: FETCH_USER,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFail = (error) => ({
  type: FETCH_USER_FAIL,
  payload: error,
});
