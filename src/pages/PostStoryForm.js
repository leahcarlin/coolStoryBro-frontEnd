import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { newStory } from "../store/user/actions";

export default function PostStory() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const dispatch = useDispatch();
  const [previewImg, setPreviewImg] = useState(false);

  console.log("preview image", previewImg);
  const submitNewStory = (e) => {
    e.preventDefault();
    dispatch(newStory(name, content, imgUrl));
  };

  return (
    <div className="PostStoryFormContainer">
      <h3>Post a Cool Story Bro</h3>
      <div className="PostStoryWrapper">
        <form onSubmit={submitNewStory}>
          <ul>
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
              <input
                type="button"
                value="Preview Image"
                onClick={() => setPreviewImg(true)}
              />
            </li>
            <li className="PostStoryButtons">
              <input type="submit" value="Post Story" />
            </li>
          </ul>
        </form>
        {previewImg ? (
          <div className="PreviewImage">
            <img src={imgUrl} alt="preview" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
