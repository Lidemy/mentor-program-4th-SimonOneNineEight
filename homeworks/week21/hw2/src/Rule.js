const findTheWinner = (squares, x, y) => {
  if(x === null || y === null) return
  const blackOrWhite = squares[y][x] // find out this black or white
  console.log(blackOrWhite)
  let winner 
  // calculate how many same color chesses in a row
  const calculateChessInRow = (blackOrWhite, x, y, directionX, directionY) => {
    let chessInRow = 0
    let nextX = x + directionX
    let nextY = y + directionY
    
    for(let i = 0; i < 4; i++) {
      if(nextX < 0 || nextX > 18 || nextY < 0 || nextY > 18 ) return
      if(squares[nextY][nextX] !== blackOrWhite) break
      chessInRow++
      nextX += directionX
      nextY += directionY
    }
    
    return chessInRow
  }
  // if there are 4 chesses in a row, we have the winner

  if(calculateChessInRow(blackOrWhite, x, y, 1, 0) + calculateChessInRow(blackOrWhite, x, y, -1, 0) >= 4 ||
    calculateChessInRow(blackOrWhite, x, y, 0, 1) + calculateChessInRow(blackOrWhite, x, y, 0, -1) >= 4 ||
    calculateChessInRow(blackOrWhite, x, y, 1, 1) + calculateChessInRow(blackOrWhite, x, y, -1, -1) >= 4 ||
    calculateChessInRow(blackOrWhite, x, y, -1, 1) + calculateChessInRow(blackOrWhite, x, y, 1, -1) >= 4) {
      winner = blackOrWhite
    }
  return winner
}

export default findTheWinner

