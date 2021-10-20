import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  DELETE_SUCCESS,
  NEW_STORY_SUCCESS,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  space: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case DELETE_SUCCESS:
      return {
        ...state,
        space: {
          ...state.space,
          stories: state.space.stories.filter(
            (story) => story.id !== action.payload
          ),
        },
      };
    case NEW_STORY_SUCCESS: {
      return {
        ...state,
        space: {
          ...state.space,
          stories: [...state.space.stories, action.payload],
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
