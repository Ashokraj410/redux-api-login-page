{/*import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;*/}


import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import containerReducer from "./Components/Reducer/ContainerReducer";
import containerSaga from "./Components/Saga/ContainerSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();


const store = configureStore({
  reducer: {
    auth: authReducer,
    container: containerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({thunk: true}).concat(sagaMiddleware),
});

sagaMiddleware.run(containerSaga)
export default store;