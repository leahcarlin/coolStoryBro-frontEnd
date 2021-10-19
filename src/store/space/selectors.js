export const selectSpacesFeed = (reduxState) => reduxState.space.allSpaces;

export const selectSingleSpace = (reduxState) => {
  return {
    space: reduxState.space.space,
    story: reduxState.space.story,
  };
};
