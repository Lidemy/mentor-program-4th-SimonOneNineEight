import { UPDATE_FILTER_STATUS } from "../actionTypes";

const initialState = {
  status: "All",
};
const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTER_STATUS: {
      return {
        ...state,
        status: action.payload.status,
      };
    }
    default: {
      return state;
    }
  }
};

export default statusReducer;
