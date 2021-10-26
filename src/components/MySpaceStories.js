import React from "react";
import { deleteStory } from "../store/user/actions";
import { useDispatch } from "react-redux";

export default function MySpaceStories(props) {
  const { user } = props;
  const dispatch = useDispatch();

  return (
    <div className="storiesContainer">
      {!user.space.stories ? (
        <h3>No stories for this space</h3>
      ) : (
        user.space.stories.map((story) => (
          <div
            className="stories"
            style={{
              backgroundImage: "url(" + story.imgUrl + ")",
              backgroundSize: "cover",
            }}
          >
            <div className="StoriesContent">
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
  );
}
