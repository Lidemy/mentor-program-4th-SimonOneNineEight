import React from 'react';
import styled from 'styled-components'

const Squares = styled.div`
  display: table;
  float: left;
  margin: 0;
  width: 25px;
  height: 25px;
  background:
  linear-gradient(to bottom, transparent 48%,
          #4c4c4c 48%,
          #4c4c4c 52%,
          transparent 52%),
  linear-gradient(to right, transparent 48%,
          #4c4c4c 48%,
          #4c4c4c 52%,
          transparent 52%);
`
const Black = styled.div`
  content: '';
  background-color: black;
  width: 20px;
  height: 20px;
  border: 0;
  margin: 2px auto 0;
  border-radius: 50%;
  justify-content: center;
`

const White = styled.div`
  content: '';
  background-color: #FCFCFC;
  width: 20px;
  height: 20px;
  border: 0;
  margin: 2px auto 0;
  border-radius: 50%;
`

const Square = ({value, onClick}) => {
  return (
    <Squares onClick={onClick}>
      {value ? value === 'black' ? <Black/> : <White /> : null}
    </Squares>
  )
}

export default Square