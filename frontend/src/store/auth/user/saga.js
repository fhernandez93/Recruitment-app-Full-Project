import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
} from "./actionTypes"
import { fetchUser, fetchUserSuccess, fetchUserFail } from "./actions";

function* fetchUserSaga() {
  axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL;

  try {
    const response = yield call(() => axios.get('/api/user', {
      withCredentials: true,
    })); 
    yield put(fetchUserSuccess(response.user));
  } catch (error) {
    yield put(fetchUserFail(error.message));
  }
}

function* UserSaga() {
  yield takeEvery(FETCH_USER, fetchUserSaga);
}

export default UserSaga;
