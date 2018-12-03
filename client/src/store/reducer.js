const initialState = {
  user: null
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_USER') {
    return {
      user: action.user
    };
  }
  else {
    return state;
  }
};

export default reducer;