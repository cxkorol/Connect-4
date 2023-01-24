/**
 * Returns a new empty game board.
 * @returns {array}
 */
export const generateNewBoard = () => [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
]

/**
 * Returns a new deep clone list of board.
 * @param {array} board
 * @returns {array}
 */
export const deepCloneBoard = (board) => [
  [...board[0]],
  [...board[1]],
  [...board[2]],
  [...board[3]],
  [...board[4]],
  [...board[5]],
]

/**
 * Checks vertical column winning combination and returns players number.
 * @param {array} board
 * @returns {number}
 */
function checkVertical(board) {
  // Check only if row is 3 or greater
  for (let row = 3; row < 6; row++) {
    for (let column = 0; column < 7; column++) {
      if (board[row][column]) {
        if (
          board[row][column] === board[row - 1][column] &&
          board[row][column] === board[row - 2][column] &&
          board[row][column] === board[row - 3][column]
        ) {
          return board[row][column]
        }
      }
    }
  }
}

/**
 * Checks horizontal row winning combination and returns players number.
 * @param {array} board
 * @returns {number}
 */
function checkHorizontal(board) {
  // Check only if column is 3 or less
  for (let row = 0; row < 6; row++) {
    for (let column = 0; column < 4; column++) {
      if (board[row][column]) {
        if (
          board[row][column] === board[row][column + 1] &&
          board[row][column] === board[row][column + 2] &&
          board[row][column] === board[row][column + 3]
        ) {
          return board[row][column]
        }
      }
    }
  }
}

/**
 * Checks right diagonal winning combination and returns players number.
 * @param {array} board
 * @returns {number}
 */
function checkDiagonalRight(board) {
  // Check only if row is 3 or greater AND column is 3 or less
  for (let row = 3; row < 6; row++) {
    for (let column = 0; column < 4; column++) {
      if (board[row][column]) {
        if (
          board[row][column] === board[row - 1][column + 1] &&
          board[row][column] === board[row - 2][column + 2] &&
          board[row][column] === board[row - 3][column + 3]
        ) {
          return board[row][column]
        }
      }
    }
  }
}

/**
 * Checks left diagonal winning combination and returns players number.
 * @param {array} board
 * @returns {number}
 */
function checkDiagonalLeft(board) {
  // Check only if row is 3 or greater AND column is 3 or greater
  for (let row = 3; row < 6; row++) {
    for (let column = 3; column < 7; column++) {
      if (board[row][column]) {
        if (
          board[row][column] === board[row - 1][column - 1] &&
          board[row][column] === board[row - 2][column - 2] &&
          board[row][column] === board[row - 3][column - 3]
        ) {
          return board[row][column]
        }
      }
    }
  }
}

/**
 * Checks if there is no winnig combination.
 * @param {array} board
 * @returns {string}
 */
function checkDraw(board) {
  for (let row = 0; row < 6; row++) {
    for (let column = 0; column < 7; column++) {
      if (board[row][column] === null) {
        return null
      }
    }
  }
  return 'draw'
}

/**
 * Checks all winning combinations and returns game result.
 * @param {array} board
 * @returns {number || string}
 */
export function checkForWin(board) {
  return (
    checkVertical(board) ||
    checkDiagonalRight(board) ||
    checkDiagonalLeft(board) ||
    checkHorizontal(board) ||
    checkDraw(board)
  )
}
