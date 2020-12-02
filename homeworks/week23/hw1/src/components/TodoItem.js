import styled from "styled-components";
import "normalize.css";
import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleTodoIsDone,
  toggleTodoIsUpdate,
  updateTodo,
} from "../redux/actions";

const { useState } = React;
const InputField = styled.input`
  width: 88%;
  border: 0;
  font-size: 16px;
  background: #f0f0f0;

  &:focus {
    border: 0;
  }
`;
const Button = styled.button`
  font-size: 14px;
  padding: 3px 5px;
  border: 1px solid #6c6c6c;
  border-radius: 5px;
  cursor: pointer;
  & + & {
    margin-left: 5px;
  }
`;

const TodoItemWrapper = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  margin: 0 auto;
  border-bottom: 1px solid #e0e0e0;
`;
const TodoContent = styled.div`
  font-size: 16px;
  ${(prop) =>
    prop.isDone &&
    `
    color: 	#BEBEBE;
    text-decoration: line-through;
  `}
`;
const TodoButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const TodoUpdateWrapper = styled.form`
  display: flex;
  justify-content: center;
`;

const TodoUpdate = ({ todo }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <TodoUpdateWrapper
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(updateTodo(todo.id, value));
        setValue("");
      }}
    >
      <InputField
        type="text"
        placeholder={todo.value}
        value={value}
        onChange={handleInputChange}
      />
      <Button type="submit">確認</Button>
    </TodoUpdateWrapper>
  );
};

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div>
      {todo.isUpdate && <TodoUpdate todo={todo} />}
      {!todo.isUpdate && (
        <TodoItemWrapper data-todo-id={todo.id}>
          <TodoContent isDone={todo.isDone}>{todo.value}</TodoContent>
          <TodoButtonWrapper>
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(toggleTodoIsDone(todo.id));
              }}
            >
              {todo.isDone ? "已完成" : "未完成"}
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(toggleTodoIsUpdate(todo.id));
              }}
            >
              編輯
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(deleteTodo(todo.id));
              }}
            >
              刪除
            </Button>
          </TodoButtonWrapper>
        </TodoItemWrapper>
      )}
    </div>
  );
};

export default TodoItem;
