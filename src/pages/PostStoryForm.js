import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { newStory } from "../store/user/actions";

export default function PostStory() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const dispatch = useDispatch();

  const submitNewStory = (e) => {
    e.preventDefault();
    dispatch(newStory(name, content, imgUrl));
  };

  return (
    <div className="PostStoryFormContainer">
      <h3>Post a Cool Story Bro</h3>
      <form onSubmit={submitNewStory}>
        <ul className="PostStoryWrapper">
          <li className="form-row">
            <label>
              Story Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </li>
          <li className="form-row">
            <label>
              Content:
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
          </li>
          <li className="form-row">
            <label>
              Image url:
              <input
                type="url"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </label>
          </li>
          <li className="PostStoryButtons">
            <input type="button" value="Preview Image" />
          </li>
          <li className="PostStoryButtons">
            <input type="submit" value="Post Story" />
          </li>
        </ul>
      </form>
    </div>
  );
}
