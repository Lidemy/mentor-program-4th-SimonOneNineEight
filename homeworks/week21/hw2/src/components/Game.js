import styled from 'styled-components'
import React from 'react'
import Board from './Board' 
import findTheWinner from '../Rule'
const {useState} = React


const AppWrapper = styled.div`
  min-height: 100vh;
  justify-content: center;
  background-color: #3C3C3C;
`
const H1 = styled.div`
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: #ffffff;
`
const H3 = styled.div`
  text-align: center;
  font-size: 24px;
  color: #ffffff;
`
const Information = ({blackOrWhite, winner}) => {
  return (
    <div>
      <H1>五子棋</H1>
      <H3>{winner? `Winner: ${winner}`: `Next: ${blackOrWhite}`}</H3>
    </div>
  )
}

const Game = () => {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)))
  const [stepPlayed, setStepPlayed] = useState(0)
  const [blackIsNext, setBlackIsNext] = useState(true)
  const [currentX, setCurrentX] = useState(null)
  const [currentY, setCurrentY] = useState(null)
  const blackOrWhite = blackIsNext? 'black': 'white';
  const winner = findTheWinner(board, currentX, currentY)
  const handleMove = (xIndex, yIndex) => {
    setCurrentX(xIndex)
    setCurrentY(yIndex)
    const squares = [...board]
    if( winner || squares[yIndex][xIndex]) return
    setBoard(
      squares.map((row, currentY) => {
        // 如果這一個橫排不是我要改的，直接回傳即可
        if (currentY !== yIndex) return row;
        // 如果是的話，找到我要改的那個 x 的位置
        return row.map((col, currentX) => {
          if (currentX !== xIndex) return col
          return blackOrWhite
        })
      })
    )
    setStepPlayed(stepPlayed + 1)
    setBlackIsNext(!blackIsNext)
  }

  return (
    <AppWrapper>
      <Information blackOrWhite={blackOrWhite} winner={winner}/>
      <Board squares={board} onClick={handleMove}/>
    </AppWrapper>
    
  )
}

export default Game;