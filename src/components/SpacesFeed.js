import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpaces } from "../store/space/actions";
import { selectSpacesFeed } from "../store/space/selectors";
import "./SpacesFeed.scss";
import { Link } from "react-router-dom";

export default function SpacesFeed() {
  const dispatch = useDispatch();
  const spaces = useSelector(selectSpacesFeed);

  useEffect(() => {
    dispatch(fetchAllSpaces);
  }, [dispatch]);

  return (
    <div className="spacesFeedContainer">
      <h1>Spaces</h1>
      {!spaces ? (
        <h3>No spaces to view</h3>
      ) : (
        spaces.map((space) => (
          <div
            className="spaceCard"
            key={space.id}
            style={{
              backgroundColor: space.backgroundColor,
              color: space.color,
            }}
          >
            <h3>{space.title}</h3>
            <p>{space.description}</p>
            <Link to={`/spaces/${space.id}`}>
              <button>Visit space</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
