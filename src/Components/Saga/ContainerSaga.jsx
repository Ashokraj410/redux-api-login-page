import { call, put, takeLatest, all } from "redux-saga/effects";
import * as actions from "../Actions/Action";
import * as types from "../Type/Types";
import { containerApi } from "../../Api/axiosInstance";

const ACTIVE_URL = "api/container/search/ACTIVE";
const ADD_URL = "api/container/create";
const UPDATE_URL = "api/container/update";
const DEPOT_URL = "api/depot/all";

function* fetchContainer() {
  try {
    const requestData = { pagination: { index: 1, rowCount: -1 } };
    const response = yield call(containerApi.put, "api/container/search/ACTIVE", requestData);

    console.log("🔥 API RESPONSE FULL DATA:", response.data);

    const apiData =
      response.data?.data?.tableData ||
      response.data?.data ||
      response.data ||
      [];

    yield put(actions.fetchContainerSuccess({ data: { tableData: apiData } }));
  } catch (err) {
    console.error("❌ Fetch container error:", err);
    yield put(actions.fetchContainerFailure(err.response?.data || err.message));
  }
}


function* addContainer(action) {
  try {
    yield call(containerApi.post, ADD_URL, action.payload);
    yield put({ type: types.FETCH_CONTAINER_REQUEST });
  } catch (err) {
    yield put(actions.addContainerFailure(err.response?.data || err.message));
  }
}

function* updateContainer(action) {
  try {
    yield call(containerApi.put, `${UPDATE_URL}/${action.payload.id}`, action.payload);
    yield put({ type: types.FETCH_CONTAINER_REQUEST });
  } catch (err) {
    yield put(actions.updateContainerFailure(err.response?.data || err.message));
  }
}

export default function* containerSaga() {
  yield takeLatest(types.FETCH_CONTAINER_REQUEST, fetchContainer);
  yield takeLatest(types.ADD_CONTAINER_REQUEST, addContainer);
  yield takeLatest(types.UPDATE_CONTAINER_REQUEST, updateContainer);
}
