import * as React from 'react'

import {
  checkForWin,
  deepCloneBoard,
  generateNewBoard,
} from './utils/game-utils'

const game = {
  player1: 1,
  player2: 2,
  currentPlayer: 1,
  board: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ],
  gameOver: false,
  message: '',
}

const initialGameState = {
  prev: game,
  current: game,
  isStepBack: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'newGame':
      return {
        ...initialGameState,
      }
    case 'togglePlayer':
      return {
        prev: {
          ...state.current,
        },
        current: {
          ...state.current,
          currentPlayer: action.nextPlayer,
          board: action.board,
        },
        isStepBack: true,
      }
    case 'endGame':
      return {
        ...state,
        prev: {
          ...initialGameState.prev,
        },
        current: {
          ...state.current,
          gameOver: true,
          message: action.message,
          board: action.board,
        },
        isStepBack: false,
      }
    case 'undo':
      return {
        prev: {
          ...state.current,
        },
        current: {
          ...state.prev,
        },
        isStepBack: false,
      }
    case 'updateMessage':
      return {
        ...state,
        message: action.message,
      }
    default:
      throw Error(`Action "${action.type}" is not a valid action.`)
  }
}

export function useGame() {
  const persistedState = localStorage.getItem('state')
  const [state, dispatch] = React.useReducer(
    reducer,
    JSON.parse(persistedState) || initialGameState
  )

  React.useEffect(() => {
    persistState(state)
  }, [state])

  /**
   * @name persistState
   * @description persists state in local storage
   * @private
   */
  function persistState(state) {
    localStorage.setItem('state', JSON.stringify(state))
  }

  /**
   * @name clearPersitedStorage
   * @description clear persited storage
   * @private
   */
  function clearPersitedStorage() {
    localStorage.removeItem('state')
  }

  /**
   * @name nextStep
   * @description determine the winner or set the next step
   * @private
   */
  function nextStep(column) {
    let board = deepCloneBoard(state.current.board)

    //check if cell is taken by starting at the bottom row and working up
    for (let row = 5; row >= 0; row--) {
      if (!board[row][column]) {
        board[row][column] = state.current.currentPlayer
        break
      }
    }

    // Check status of board
    const result = checkForWin(board)

    // Player 1  wins
    if (result === state.current.player1) {
      clearPersitedStorage()
      return dispatch({
        type: 'endGame',
        message: 'Player1 (red) wins!',
        board,
      })
    }

    // Player 2 wins
    if (result === state.current.player2) {
      clearPersitedStorage()
      return dispatch({
        type: 'endGame',
        message: 'Player2 (yellow) wins!',
        board,
      })
    }

    // Draw
    if (result === 'draw') {
      clearPersitedStorage()
      return dispatch({
        type: 'endGame',
        message: 'Draw Game!',
        board,
      })
    }

    // Next step
    const nextPlayer =
      state.current.currentPlayer === state.current.player1
        ? state.current.player2
        : state.current.player1

    return dispatch({ type: 'togglePlayer', nextPlayer, board })
  }

  /**
   * @name undo
   * @description undo the last action
   * @public
   */
  function undo() {
    dispatch({ type: 'undo' })
  }

  /**
   * @name play
   * @description place the step
   * @public
   */
  function play(column) {
    if (state.current.gameOver) {
      return dispatch({
        type: 'updateMessage',
        message: 'Game Over. Please start a new game.',
      })
    }

    nextStep(column)
  }

  /**
   * @name newGame
   * @description start a new game
   * @public
   */
  function newGame() {
    dispatch({ type: 'newGame', board: generateNewBoard() })
  }

  return {
    state: state.current,
    play,
    undo,
    newGame,
    isStepBack: state.isStepBack,
  }
}
