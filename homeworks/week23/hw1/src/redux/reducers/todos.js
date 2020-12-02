import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO_ISDONE,
  TOGGLE_TODO_ISUPDATE,
  UPDATE_TODO,
} from "../actionTypes";

const initalState = {
  todos: [],
};

let todoId = 0;
const todoReducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: todoId++,
            value: action.payload.value,
            isDone: false,
            isUpdate: false,
          },
        ],
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }
    case TOGGLE_TODO_ISDONE: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return { ...todo, isDone: !todo.isDone };
        }),
      };
    }
    case TOGGLE_TODO_ISUPDATE: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return { ...todo, isUpdate: !todo.isUpdate };
        }),
      };
    }
    case UPDATE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            value: action.payload.value,
            isDone: false,
            isUpdate: false,
          };
        }),
      };
    }
    default: {
      return state;
    }
  }
};

export default todoReducer;
