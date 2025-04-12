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

export const fetchUserSuccess = (data) => ({
  type: FETCH_USER_SUCCESS,
  payload: data,
});

export const fetchUserFail = (error) => ({
  type: FETCH_USER_FAIL,
  payload: error,
});
