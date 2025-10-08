
import * as types from "../Type/Types";

const initialState = { items: [], loading: false, error: null };

const containerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CONTAINER_REQUEST:
    case types.ADD_CONTAINER_REQUEST:
    case types.UPDATE_CONTAINER_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_CONTAINER_SUCCESS:
  return {
    ...state,
    loading: false,
    items: action.payload?.data?.tableData || action.payload?.data || [],
    error: null,
  };
    case types.ADD_CONTAINER_SUCCESS:
      return { ...state, loading: false, items: [...state.items, action.payload], error: null };

    case types.UPDATE_CONTAINER_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((i) => (i.id === action.payload.id ? action.payload : i)),
        error: null,
      };

    case types.FETCH_CONTAINER_FAILURE:
    case types.ADD_CONTAINER_FAILURE:
    case types.UPDATE_CONTAINER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default containerReducer;

