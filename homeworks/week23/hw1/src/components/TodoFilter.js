import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateStatus } from "../redux/actions";

const TodoFilterWrapper = styled.div`
  text-align: center;
  margin: 8px auto;
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

const TodoFilter = () => {
  const dispatch = useDispatch();
  const FilterName = ["All", "Done", "NotDone"];
  return (
    <TodoFilterWrapper>
      {FilterName.map((name) => (
        <Button
          type="button"
          key={name}
          name={name}
          onClick={() => dispatch(updateStatus(name))}
        >
          {name}
        </Button>
      ))}
    </TodoFilterWrapper>
  );
};

export default TodoFilter;
