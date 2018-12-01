const initialState = {
  user: null
};

const reducer = (state = initialState, action) => {
  if (action === 'SET_USER') {
    return {
      user: action.user
    };
  }
  else {
    return state;
  }
};

export default reducer;