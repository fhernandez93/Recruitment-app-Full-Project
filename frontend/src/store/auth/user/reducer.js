import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
} from "./actionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, loading: true, error: null };

    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case FETCH_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default user;
