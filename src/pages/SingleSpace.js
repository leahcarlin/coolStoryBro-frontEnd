import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpace } from "../store/space/actions";
import { selectSingleSpace } from "../store/space/selectors";
import { useParams } from "react-router-dom";

export default function SingleSpace() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const spaceData = useSelector(selectSingleSpace);
  const stories = spaceData.story;
  // console.log("spaceData", spaceData);

  useEffect(() => {
    dispatch(fetchSingleSpace(id));
  }, [dispatch, id]);

  if (!spaceData) return <h3>Loading...</h3>; //wait for load

  const storiesByDate = stories.sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="singleSpaceContainer">
      <div
        className="singleSpaceHeader"
        style={{
          backgroundColor: spaceData.space.backgroundColor,
          color: spaceData.space.color,
          padding: "40px 20px 20px 20px",
        }}
      >
        <h1>{spaceData.space.title}</h1>
        <h5>{spaceData.space.description}</h5>
      </div>
      <div className="storiesContainer">
        {!stories ? (
          <h3>No stories for this space</h3>
        ) : (
          storiesByDate.map((s) => (
            <div
              className="stories"
              style={{ backgroundImage: "url(" + s.imgUrl + ")" }}
            >
              <div className="storiesContent">
                <h3>{s.name}</h3>
                <p>{s.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
