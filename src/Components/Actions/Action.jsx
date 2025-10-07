
{/*import{FETCH_CONTAINER_REQUEST,FETCH_CONTAINER_SUCCESS,FETCH_CONTAINER_FAILURE,ADD_CONTAINER_REQUEST,ADD_CONTAINER_SUCCESS,ADD_CONTAINER_FAILURE,
UPDATE_CONTAINER_REQUEST,UPDATE_CONTAINER_SUCCESS,UPDATE_CONTAINER_FAILURE,DELETE_CONTAINER_REQUEST,DELETE_CONTAINER_SUCCESS,
DELETE_CONTAINER_FAILURE} from "../Type/Types"


export const fetchContainerRequest=(payload)=>({
    type:FETCH_CONTAINER_REQUEST,
    payload,
});
export const fetchContainerSuccess=(data)=>({
    type:FETCH_CONTAINER_SUCCESS,
    payload:data,
});
export const fetchContainerFailure=(error)=>({
    type:FETCH_CONTAINER_FAILURE,
    payload:error,
});
export const addContainerRequest=(item)=>({
    type:ADD_CONTAINER_REQUEST,
    payload:item,
    
});
export const addContainerSuccess=(item)=>({
    type:ADD_CONTAINER_SUCCESS,
    payload:item,
});
export const addContainerFailure=(error)=>({
    type:ADD_CONTAINER_FAILURE,
    payload:error,
});
export const updateContainerRequest=(item)=>({
    type:UPDATE_CONTAINER_REQUEST,
    payload:item,
});
export const updateContainerSuccess=(item)=>({
    type:UPDATE_CONTAINER_SUCCESS,
    payload:item,
});
export const updateContainerFailure=(error)=>({
    type:UPDATE_CONTAINER_FAILURE,
    payload:error,
});
export const deleteContainerRequest=(id)=>({
    type:DELETE_CONTAINER_REQUEST,
    payload:id,
});
export const deleteContainerSuccess=(id)=>({
    type:DELETE_CONTAINER_SUCCESS,
    payload:id,
});
export const deleteContainerFailure=(error)=>({
    type:DELETE_CONTAINER_FAILURE,
    payload:error,
})

*/}

import {
  FETCH_CONTAINER_REQUEST, FETCH_CONTAINER_SUCCESS, FETCH_CONTAINER_FAILURE,
  ADD_CONTAINER_REQUEST, ADD_CONTAINER_SUCCESS, ADD_CONTAINER_FAILURE,
  UPDATE_CONTAINER_REQUEST, UPDATE_CONTAINER_SUCCESS, UPDATE_CONTAINER_FAILURE,
} from "../Type/Types";

export const fetchContainerRequest = () => ({ type: FETCH_CONTAINER_REQUEST });
export const fetchContainerSuccess = (data) => ({ type: FETCH_CONTAINER_SUCCESS, payload: data });
export const fetchContainerFailure = (error) => ({ type: FETCH_CONTAINER_FAILURE, payload: error });

export const addContainerRequest = (item) => ({ type: ADD_CONTAINER_REQUEST, payload: item });
export const addContainerSuccess = (item) => ({ type: ADD_CONTAINER_SUCCESS, payload: item });
export const addContainerFailure = (error) => ({ type: ADD_CONTAINER_FAILURE, payload: error });

export const updateContainerRequest = (item) => ({ type: UPDATE_CONTAINER_REQUEST, payload: item });
export const updateContainerSuccess = (item) => ({ type: UPDATE_CONTAINER_SUCCESS, payload: item });
export const updateContainerFailure = (error) => ({ type: UPDATE_CONTAINER_FAILURE, payload: error });

{/*
export const deleteContainerRequest = (id) => ({ type: DELETE_CONTAINER_REQUEST, payload: id });
export const deleteContainerSuccess = (id) => ({ type: DELETE_CONTAINER_SUCCESS, payload: id });
export const deleteContainerFailure = (error) => ({ type: DELETE_CONTAINER_FAILURE, payload: error });*/}

