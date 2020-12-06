import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO_ISDONE,
  TOGGLE_TODO_ISUPDATE,
  UPDATE_TODO,
  UPDATE_FILTER_STATUS,
} from "./actionTypes";

export function addTodo(value) {
  return {
    type: ADD_TODO,
    payload: {
      value,
    },
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
}

export function toggleTodoIsDone(id) {
  return {
    type: TOGGLE_TODO_ISDONE,
    payload: {
      id,
    },
  };
}

export function toggleTodoIsUpdate(id) {
  return {
    type: TOGGLE_TODO_ISUPDATE,
    payload: {
      id,
    },
  };
}
export function updateTodo(id, value) {
  return {
    type: UPDATE_TODO,
    payload: {
      id,
      value,
    },
  };
}

export function updateStatus(status) {
  return {
    type: UPDATE_FILTER_STATUS,
    payload: {
      status,
    },
  };
}
