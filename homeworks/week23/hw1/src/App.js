import styled from "styled-components";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statusSelector, todoSelector } from "./redux/selectors";
import { addTodo } from "./redux/actions";

const AppWrapper = styled.div`
  background: #f0f0f0;
  min-height: 700px;
`;

const TitleH1 = styled.div`
  font-size: 4em;
  font-weight: bold;
  text-align: center;
  color: palevioletred;
  padding: 20px 0;
`;

const TodoBox = styled.div`
  max-width: 500px;
  border: 2px solid #6c6c6c;
  border-radius: 10px;
  margin: 0 auto;
`;
const TodoAddWrapper = styled.form`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;
const InputField = styled.input`
  width: 88%;
  border: 0;
  font-size: 16px;
  background: #f0f0f0;

  &:focus {
    border: 0;
  }
`;

const DivideLine = styled.div`
  content: "";
  width: 95%;
  border-bottom: 1px solid #6c6c6c;
  margin: 5px auto;
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

const TodoAdd = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <TodoAddWrapper
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(addTodo(value));
        setValue("");
      }}
    >
      <InputField
        type="text"
        placeholder="新增 todo"
        value={value}
        onChange={handleInputChange}
      />
      <Button type="submit">新增</Button>
    </TodoAddWrapper>
  );
};

function App() {
  const status = useSelector(statusSelector);
  const todos = useSelector(todoSelector);
  return (
    <AppWrapper>
      <TitleH1>Todo List</TitleH1>
      <TodoBox>
        <TodoAdd />
        <DivideLine />
        {todos
          .filter((todo) => {
            if (status === "All") return todo;
            return status === "Done" ? todo.isDone : !todo.isDone;
          })
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        <TodoFilter />
      </TodoBox>
    </AppWrapper>
  );
}

export default App;
