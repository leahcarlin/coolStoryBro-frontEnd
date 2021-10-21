import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import MySpaceStories from "../components/MySpaceStories";
import PostStoryForm from "./PostStoryForm";
import Loading from "../components/Loading";

export default function MySpace() {
  const user = useSelector(selectUser);
  const space = user.space;
  const [editMode, setEditMode] = useState(false);
  const [postStoryMode, setPostStoryMode] = useState(false);
  const history = useHistory();
  console.log("story mode", postStoryMode);

  if (user.token === null) {
    history.push("/");
  }

  if (space === null) {
    return <Loading />;
  }

  if (!user.id) return <h3>Loading...</h3>; //wait for load

  const displayButtons =
    user.id === space.userId && editMode === false && postStoryMode === false;

  return (
    <div className="MySpaceContainer">
      <div
        className="MySpaceHeader"
        style={{
          backgroundColor: space.backgroundColor,
          color: space.color,
        }}
      >
        <h1>{space.title}</h1>
        <h4>{space.description}</h4>
      </div>
      <div className="PostStoryContainer">
        {displayButtons ? (
          <div className="MySpaceButtons">
            <button onClick={() => setEditMode(true)}>Edit my space</button>
            <button onClick={() => setPostStoryMode(true)}>
              Post a cool story bro
            </button>
          </div>
        ) : null}
        <MySpaceStories user={user} />
        {/* {postStoryMode ? <PostStoryForm /> : null} */}
        <PostStoryForm />
      </div>
    </div>
  );
}
