{/*import {
    FETCH_CONTAINER_REQUEST, FETCH_CONTAINER_SUCCESS, FETCH_CONTAINER_FAILURE, ADD_CONTAINER_REQUEST, ADD_CONTAINER_SUCCESS, ADD_CONTAINER_FAILURE,
    UPDATE_CONTAINER_REQUEST, UPDATE_CONTAINER_SUCCESS, UPDATE_CONTAINER_FAILURE, DELETE_CONTAINER_REQUEST, DELETE_CONTAINER_SUCCESS, DELETE_CONTAINER_FAILURE
} from "../Type/Types"



const initialState = {
    items: [],
    loading: null,
    error: null,
    token: localStorage.getItem("token") || null,
    accessCode: localStorage.getItem("accessCode") || null,

};

const containerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONTAINER_REQUEST:
        case ADD_CONTAINER_REQUEST:
        case UPDATE_CONTAINER_REQUEST:
        case DELETE_CONTAINER_REQUEST:
            return { ...state, loading: true };

        case FETCH_CONTAINER_SUCCESS:
            const tableData=action.payload?.data?.tableData;
    return { 
        ...state, 
        loading: false, 
        items: Array.isArray(tableData)?tableData: [] 
    };


        case ADD_CONTAINER_SUCCESS:
            return { ...state, loading: false, items: [...state.items, action.payload] };
        case UPDATE_CONTAINER_SUCCESS:
            return {
                ...state, loading: false,
                items: state.items.map((i) => i.id === action.payload.id ? action.payload : i),
            }
        case DELETE_CONTAINER_SUCCESS:
            return { ...state, loading: false, items: state.items.filter((i) => i.id !== action.payload), }
        case FETCH_CONTAINER_FAILURE:
        case ADD_CONTAINER_FAILURE:
        case UPDATE_CONTAINER_FAILURE:
        case DELETE_CONTAINER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }

}
export default containerReducer;*/}
{/*
import {
  FETCH_CONTAINER_REQUEST, FETCH_CONTAINER_SUCCESS, FETCH_CONTAINER_FAILURE,
  ADD_CONTAINER_REQUEST, ADD_CONTAINER_SUCCESS, ADD_CONTAINER_FAILURE,
  UPDATE_CONTAINER_REQUEST, UPDATE_CONTAINER_SUCCESS, UPDATE_CONTAINER_FAILURE,
  DELETE_CONTAINER_REQUEST, DELETE_CONTAINER_SUCCESS, DELETE_CONTAINER_FAILURE
} from "../Type/Types";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const containerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTAINER_REQUEST:
    case ADD_CONTAINER_REQUEST:
    case UPDATE_CONTAINER_REQUEST:
    case DELETE_CONTAINER_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_CONTAINER_SUCCESS:
      return { ...state, loading: false, items: action.payload?.data?.tableData || [], error: null };
    case ADD_CONTAINER_SUCCESS:
      return { ...state, loading: false, items: [...state.items, action.payload], error: null };
    case UPDATE_CONTAINER_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        items: state.items.map((i) => i.id === action.payload.id ? action.payload : i),
        error: null 
      };
    case DELETE_CONTAINER_SUCCESS:
      return { ...state, loading: false, items: state.items.filter((i) => i.id !== action.payload), error: null };

    case FETCH_CONTAINER_FAILURE:
    case ADD_CONTAINER_FAILURE:
    case UPDATE_CONTAINER_FAILURE:
    case DELETE_CONTAINER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default containerReducer;
*/}
import * as types from  "../Type/Types";

const initialState = { items: [], loading: false, error: null };

const containerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CONTAINER_REQUEST:
    case types.ADD_CONTAINER_REQUEST:
    case types.UPDATE_CONTAINER_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_CONTAINER_SUCCESS:
      return { ...state, loading: false, items: action.payload?.data?.tableData || [], error: null };
    case types.ADD_CONTAINER_SUCCESS:
      return { ...state, loading: false, items: [...state.items, action.payload], error: null };
    case types.UPDATE_CONTAINER_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map(i => i.id === action.payload.id ? action.payload : i),
        error: null
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
