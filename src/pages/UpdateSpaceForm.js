import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSpace } from "../store/user/actions";
import { selectUser } from "../store/user/selectors";

export default function UpdateSpaceForm() {
  const user = useSelector(selectUser);
  const [title, setTitle] = useState(user.space.title || "");
  const [description, setDescription] = useState(user.space.description || "");
  const [backgroundColor, setBackgroundColor] = useState(
    user.space.backgroundColor || ""
  );
  const [color, setColor] = useState(user.space.color || "");
  const dispatch = useDispatch();

  const updateSpaceOnSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSpace(title, description, backgroundColor, color));
  };

  return (
    <div className="PostStoryFormContainer">
      <h3>Edit Your Space</h3>
      <div className="PostStoryWrapper">
        <form onSubmit={updateSpaceOnSubmit}>
          <ul>
            <li className="form-row">
              <label>
                Title:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
            </li>
            <li className="form-row">
              <label>
                Description:
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </li>
            <li className="form-row">
              <label>
                Background Color:
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
              </label>
            </li>
            <li className="form-row">
              <label>
                Text Color:
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </label>
            </li>
            <li className="PostStoryButtons">
              <input type="submit" value="Save Changes" />
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
