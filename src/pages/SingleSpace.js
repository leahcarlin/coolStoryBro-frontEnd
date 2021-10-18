import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpace, fetchStoriesById } from "../store/space/actions";
import { selectSingleSpace } from "../store/space/selectors";
import { useParams } from "react-router-dom";

export default function SingleSpace() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const space = useSelector(selectSingleSpace);
  console.log("space in single space", space);

  useEffect(() => {
    dispatch(fetchSingleSpace(id));
    dispatch(fetchStoriesById)(id);
  }, [dispatch, id]);

  if (!space) return <h3>Loading...</h3>; //wait for load

  return (
    <div className="singleSpaceContainer">
      <div
        className="singleSpaceHeader"
        style={{
          backgroundColor: space.backgroundColor,
          color: space.color,
          padding: "40px 20px 20px 20px",
        }}
      >
        <h1>{space.title}</h1>
        <h5>{space.description}</h5>
      </div>
      <div className="singleSpaceStories">
        <p>stories here</p>
      </div>
    </div>
  );
}
