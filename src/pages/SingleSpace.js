import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpace } from "../store/space/actions";
import { selectSingleSpace } from "../store/space/selectors";
import { useParams } from "react-router-dom";

export default function SingleSpace() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const spaceData = useSelector(selectSingleSpace);
  const space = spaceData.space;

  // const storyByDate = space.stories.sort(
  //   (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  // ); //stories sorted by date
  // console.log("sorted", storyByDate);

  useEffect(() => {
    dispatch(fetchSingleSpace(id));
  }, [dispatch, id]);

  if (!space || !space.stories) return <h3>Loading...</h3>; //wait for load

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
      <div className="storiesContainer">
        {!space.stories ? (
          <h3>No stories for this space</h3>
        ) : (
          space.stories.map((story) => (
            <div
              className="stories"
              style={{ backgroundImage: "url(" + story.imgUrl + ")" }}
            >
              <div className="storiesContent">
                <h3>{story.name}</h3>
                <p>{story.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
