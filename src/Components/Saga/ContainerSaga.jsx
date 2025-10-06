import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../Actions/Action";
import {
  FETCH_CONTAINER_REQUEST,
  ADD_CONTAINER_REQUEST,
  UPDATE_CONTAINER_REQUEST,
  DELETE_CONTAINER_REQUEST,
} from "../Type/Types";
import {containerApi }from '../../Api/axiosInstance'



const ACTIVE_URL = "https://hastin-container.com/staging/api/container/search/ACTIVE"; 
const ADD_URL = "https://hastin-container.com/staging/api/container-group/get";
const UPDATE_URL = "https://hastin-container.com/staging/api/container/update";
const DELETE_URL = "https://hastin-container.com/staging/api/container"; // DELETE /container/:id

// Fetch containers
function* fetchContainer(action) {
  try {
    const requestData = {
      pagination: {
        index: 1,
        rowCount: -1,
        searchObj: null,
        sortingObj: null,
      },
    };

    const response = yield call(containerApi.put, ACTIVE_URL, requestData);
    console.log("API Response:", response.data);

    // Make sure we pass an array to the reducer
    const itemsArray = Array.isArray(response.data?.data?.tableData) 
      ? response.data.data.tableData
      : []; // adjust according to API structure

    yield put(actions.fetchContainerSuccess({data:{tableData:itemsArray}}));
  } catch (error) {
    yield put(actions.fetchContainerFailure(error.response?.data || error.message));
  }
}


// Add container
function* addContainer(action) {
  try {
    const response = yield call(containerApi.post, ADD_URL, action.payload);
    yield put(actions.addContainerSuccess(response.data));
  } catch (error) {
    yield put(actions.addContainerFailure(error.response?.data || error.message));
  }
}

// Update container
function* updateContainer(action) {
  try {
    const response = yield call(containerApi.put, `${UPDATE_URL}/${action.payload.id}`, action.payload);
    yield put(actions.updateContainerSuccess(response.data));
  } catch (error) {
    yield put(actions.updateContainerFailure(error.response?.data || error.message));
  }
}

// Delete container
function* deleteContainer(action) {
  try {
    yield call(containerApi.delete, `${DELETE_URL}/${action.payload}`);
    yield put(actions.deleteContainerSuccess(action.payload));
  } catch (error) {
    yield put(actions.deleteContainerFailure(error.response?.data || error.message));
  }
}

// Watcher saga
export default function* containerSaga() {
  yield takeLatest(FETCH_CONTAINER_REQUEST, fetchContainer);
  yield takeLatest(ADD_CONTAINER_REQUEST, addContainer);
  yield takeLatest(UPDATE_CONTAINER_REQUEST, updateContainer);
  yield takeLatest(DELETE_CONTAINER_REQUEST, deleteContainer);
}
