import axios from "axios";
import { apiUrl } from "../../config/constants";

export const spacesFetched = (data) => {
  return {
    type: "space/allSpaces",
    payload: data,
  };
};

export const singleSpaceFetched = (data) => {
  return {
    type: "space/singleSpace",
    payload: data,
  };
};

export const fetchAllSpaces = async (dispatch, getState) => {
  try {
    const res = await axios.get(`${apiUrl}/spaces`);
    const allSpaces = res.data;
    // console.log("spaces data", allSpaces);
    dispatch(spacesFetched(allSpaces));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchSingleSpace = (id) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${apiUrl}/spaces/${id}`);
    console.log("single space from get req", res.data);
    const singleSpace = res.data;
    dispatch(singleSpaceFetched(singleSpace));
  } catch (e) {
    console.log(e.message);
  }
};
