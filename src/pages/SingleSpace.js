import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpace } from "../store/space/actions";
import { selectSingleSpace } from "../store/space/selectors";
import { useParams } from "react-router-dom";

export default function SingleSpace() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const space = useSelector(selectSingleSpace);

  useEffect(() => {
    dispatch(fetchSingleSpace(id));
  }, [dispatch, id]);

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
    </div>
  );
}
