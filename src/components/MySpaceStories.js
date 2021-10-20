import React from "react";
import { selectUser } from "../store/user/selectors";
import { deleteStory } from "../store/user/actions";
import { useDispatch, useSelector } from "react-redux";

export default function MySpaceStories() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <div>
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
                  onClick={() => dispatch(deleteStory(story.id))}
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
