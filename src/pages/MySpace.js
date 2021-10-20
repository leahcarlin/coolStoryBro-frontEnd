import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import MySpaceStories from "../components/MySpaceStories";
import PostStoryForm from "./PostStoryForm";

export default function MySpace() {
  // const dispatch = useDispatch();
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
      <MySpaceStories />
      <PostStoryForm />
    </div>
  );
}
