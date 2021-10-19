const initialState = {
  allSpaces: [],
  space: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "space/allSpaces": {
      return {
        ...state,
        allSpaces: [...action.payload],
      };
    }
    case "space/singleSpace": {
      console.log("reducer action", action.payload);
      return {
        ...state,
        space: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
