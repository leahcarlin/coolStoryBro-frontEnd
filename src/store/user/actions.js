import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const NEW_STORY_SUCCESS = "NEW_STORY_SUCCESS";
export const SPACE_UPDATE_SUCCESS = "SPACE_UPDATE_SUCCESS"

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const deleteSuccess = (storyId) => {
  return {
    type: DELETE_SUCCESS,
    payload: storyId,
  };
};

export const newStorySuccess = (data) => {
  return {
    type: NEW_STORY_SUCCESS,
    payload: data,
  };
};

export const spaceUpdateSuccess = (data) => {
  return {
    type: SPACE_UPDATE_SUCCESS,
    payload: data,
  };
}

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

// Delete a story
export const deleteStory = (storyId) => async (dispatch, getState) => {
  try {
    dispatch(appLoading());
    const res = await axios.delete(`${apiUrl}/stories/${storyId}`);
    console.log("story deleted?", res.data);
    // filter here
    dispatch(deleteSuccess(storyId));

    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e.message);
  }
};

// Post a new story (authMiddleware)
export const newStory =
  (name, content, imgUrl) => async (dispatch, getState) => {
    // console.log("check new story items", name, content, imgUrl);
    const { space, token } = selectUser(getState());
    dispatch(appLoading());

    const res = await axios.post(
      `${apiUrl}/spaces/${space.id}/story`,
      {
        name,
        content,
        imgUrl,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("new story", res);
    dispatch(
      showMessageWithTimeout(
        "You've successfully posted a story!",
        false,
        res.data.message,
        3000
      )
    );
    dispatch(newStorySuccess(res.data.story));
    dispatch(appDoneLoading());
  };

// Update a space (authMiddleware)
export const updateSpace =
  (title, description, backgroundColor, color) =>
  async (dispatch, getState) => {
    const { space, token } = selectUser(getState());
    dispatch(appLoading());

    const res = await axios.put(
      `${apiUrl}/spaces/${space.id}`,
      {
        title,
        description,
        backgroundColor,
        color,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("updated space", res);
    dispatch(
      showMessageWithTimeout(
        "You've successfully updated your space!",
        false,
        res.data.message,
        3000
      )
    );
    dispatch(spaceUpdateSuccess(res.data)
    dispatch(appDoneLoading());
  };
