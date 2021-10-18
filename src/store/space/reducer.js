const initialState = {
  allSpaces: [],
  spaceDetails: null,
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
      return {
        ...state,
        spaceDetails: { ...action.payload },
      };
    }
    default: {
      return state;
    }
  }
}
