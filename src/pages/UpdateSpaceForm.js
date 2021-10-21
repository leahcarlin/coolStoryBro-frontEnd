import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSpace } from "../store/user/actions";
import { selectUser } from "../store/user/selectors";

export default function UpdateSpaceForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [color, setColor] = useState("");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const updateSpaceOnSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSpace(title, description, backgroundColor, color));
    alert("You've successfully updated your space!");
  };

  return (
    <div className="PostStoryFormContainer">
      <h3>Edit Your Space</h3>
      <div className="PostStoryWrapper">
        <form onSubmit={updateSpace}>
          <ul>
            <li className="form-row">
              <label>
                Title:
                <input
                  type="text"
                  value={user.space.title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
            </li>
            <li className="form-row">
              <label>
                Description:
                <input
                  type="text"
                  value={user.space.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </li>
            <li className="form-row">
              <label>
                Background Color:
                <input
                  type="color"
                  value={user.space.backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
              </label>
            </li>
            <li className="form-row">
              <label>
                Text Color:
                <input
                  type="color"
                  value={user.space.color}
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
