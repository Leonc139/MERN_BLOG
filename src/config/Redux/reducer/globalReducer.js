const initialState = {
  name: "Calvin",
};

const globalReducer = (state = initialState, action) => {
  if (action.type === "UPDATE_NAME") {
    return {
      ...state,
      name: "Leo",
    };
  }
  return state;
};

export default globalReducer;
