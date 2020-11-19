import "./App.css";
import "normalize.css";
import styled from "styled-components";
import TodoItem from "./components/TodoItem";
import React from "react";

const { useState } = React;

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
const TodoAddWrapper = styled.div`
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

const TodoFilterWrapper = styled.div`
  text-align: center;
  margin: 8px auto;
`;

const DivideLine = styled.div`
  content: "";
  width: 95%;
  border-bottom: 1px solid #6c6c6c;
  margin: 5px auto;
`;
const Button = styled.span`
  font-size: 14px;
  padding: 3px 5px;
  border: 1px solid #6c6c6c;
  border-radius: 5px;
  cursor: pointer;
  & + & {
    margin-left: 5px;
  }
`;

const TodoAdd = ({ handleAddTodo }) => {
  const [value, setValue] = useState("");
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <TodoAddWrapper>
      <InputField
        type="text"
        placeholder="新增 todo"
        value={value}
        onChange={handleInputChange}
      />
      <Button
        onClick={() => {
          handleAddTodo(value);
          setValue("");
        }}
      >
        新增
      </Button>
    </TodoAddWrapper>
  );
};

const TodoFilter = ({ filterList }) => {
  return <TodoFilterWrapper>{filterList}</TodoFilterWrapper>;
};

let todoId = 1;
function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("All");

  const handleAddTodo = (value) => {
    setTodos([
      {
        id: todoId,
        content: value,
        isDone: false,
        isUpdate: false,
      },
      ...todos,
    ]);
    todoId++;
  };

  const handleTogglerIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, isDone: !todo.isDone };
      })
    );
  };

  const handleTogglerUpdateTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, isUpdate: !todo.isUpdate };
      })
    );
  };
  const handleUpdateTodo = (id, value) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, content: value, isUpdate: false };
      })
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const FilterMap = {
    All: () => true,
    Done: (todo) => todo.isDone,
    NotDone: (todo) => !todo.isDone,
  };
  const FilterName = Object.keys(FilterMap);
  const filterList = FilterName.map((name) => (
    <Button key={name} name={name} onClick={() => setStatus(name)}>
      {name}
    </Button>
  ));

  return (
    <AppWrapper>
      <TitleH1>Todo List</TitleH1>
      <TodoBox>
        <TodoAdd handleAddTodo={handleAddTodo} />
        <DivideLine />
        {todos.filter(FilterMap[status]).map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleTogglerIsDone={handleTogglerIsDone}
            handleTogglerUpdateTodo={handleTogglerUpdateTodo}
            handleUpdateTodo={handleUpdateTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
        <TodoFilter filterList={filterList} />
      </TodoBox>
    </AppWrapper>
  );
}

export default App;
