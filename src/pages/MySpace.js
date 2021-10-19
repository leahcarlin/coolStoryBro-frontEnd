import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import { deleteStory } from "../store/user/actions";

export default function MySpace() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  //   console.log("user", user);

  if (!user.id) return <h3>Loading...</h3>; //wait for load

  return (
    <div className="MySpaceContainer">
      <div
        className="MySpaceHeader"
        style={{
          backgroundColor: user.space.backgroundColor,
          color: user.space.color,
        }}
      >
        <h1>{user.space.title}</h1>
        <h4>{user.space.description}</h4>
      </div>
      <div className="MySpaceButtons">
        <button>Edit my space</button>
        <button>Post a cool story bro</button>
      </div>
      <div className="storiesContainer">
        {!user.space.stories ? (
          <h3>No stories for this space</h3>
        ) : (
          user.space.stories.map((story) => (
            <div
              className="stories"
              style={{ backgroundImage: "url(" + story.imgUrl + ")" }}
            >
              <div className="storiesContent">
                <h3>{story.name}</h3>
                <p>{story.content}</p>
                <button
                  className="DeleteStory"
                  onClick={() => dispatch(deleteStory)}
                >
                  Delete Story
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}