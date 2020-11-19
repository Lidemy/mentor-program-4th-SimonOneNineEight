import styled from 'styled-components';
import 'normalize.css';
import React from 'react'

const { useState } = React;
const InputField = styled.input`
  width: 88%;
  border: 0;
  font-size: 16px;
  background: #F0F0F0;
  
  &:focus{
    border: 0;
  }
`
const Button = styled.span`
  font-size: 14px;
  padding: 3px 5px;
  border: 1px solid #6C6C6C;
  border-radius: 5px;
  cursor: pointer;
  & + & {
    margin-left: 5px;
  }
`

const TodoItemWrapper = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  margin: 0 auto;
  border-bottom: 1px solid #E0E0E0;
`
const TodoContent = styled.div`
  font-size: 16px;
  ${prop => prop.isDone && `
    color: 	#BEBEBE;
    text-decoration: line-through;
  `}
`
const TodoButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const TodoUpdateWrapper = styled.div`
  display: flex;````````````~~~~~~~``
  justify-content: center;
`

const TodoUpdate = ({todo, handleUpdateTodo}) => {
  const [value, setValue] = useState('');
  const handleInputChange = e => {
    setValue(e.target.value)
  }

  return(
    <TodoUpdateWrapper>
      <InputField type='text' placeholder={todo.content} value={value} onChange={handleInputChange} />
      <Button onClick={() => {handleUpdateTodo(todo.id, value); setValue('');}}>確認</Button>
    </TodoUpdateWrapper>
  )
}

const TodoItem = ({todo, handleTogglerIsDone, handleTogglerUpdateTodo, handleUpdateTodo, handleDeleteTodo}) => {
  const handleTogglerClick = () => {handleTogglerIsDone(todo.id)}
  const handleUpdateClick = () => {handleTogglerUpdateTodo(todo.id)}
  const handleDeleteClick = () => {handleDeleteTodo(todo.id)}

  return (
    <div>
      {todo.isUpdate && <TodoUpdate todo={todo} handleUpdateTodo={handleUpdateTodo}/>}
      {!todo.isUpdate &&
      <TodoItemWrapper data-todo-id={todo.id}>
        <TodoContent isDone={todo.isDone}>{todo.content}</TodoContent>
        <TodoButtonWrapper>
          <Button onClick={handleTogglerClick}>{todo.isDone ? '已完成' : '未完成'}</Button>
          <Button onClick={handleUpdateClick}>編輯</Button>
          <Button onClick={handleDeleteClick}>刪除</Button>
        </TodoButtonWrapper>
      </TodoItemWrapper>}
    </div>
  )
}

export default TodoItem
