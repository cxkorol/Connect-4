import * as React from 'react'
import * as ThemeUI from 'theme-ui'

import { Row } from './row'
import { useGame } from './use-game'

export const Game = () => {
  const { state, play, undo, newGame, isStepBack } = useGame()
  return (
    <>
      <ThemeUI.Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          p: '20px',
        }}
      >
        <ThemeUI.Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
            py: '20px',
          }}
        >
          <ThemeUI.Button
            sx={{
              backgroundColor: 'green',
              borderRadius: '8px',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: '1px 1px 18px 3px hsl(53.89,100.00%,67.25%)',
                transform: [
                  'scale3d(1.01, 1.01, 1.0)',
                  'scale3d(1.08, 1.08, 1.08)',
                ],
                transition: 'all .2s',
              },
            }}
            onClick={() => {
              newGame()
            }}
          >
            New Game
          </ThemeUI.Button>
          <ThemeUI.Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <ThemeUI.Box
              sx={{
                fontWeight: '700',
              }}
            >
              Next Player:
            </ThemeUI.Box>
            <ThemeUI.Box
              sx={{
                borderRadius: '50%',
                background: state.currentPlayer === 1 ? 'red' : 'yellow',
                width: '25px',
                height: '25px',
              }}
            />
          </ThemeUI.Box>
        </ThemeUI.Box>
        <table>
          <tbody>
            {state.board.map((row, i) => (
              <Row key={i} row={row} play={play} />
            ))}
          </tbody>
        </table>
        {state.gameOver && (
          <ThemeUI.Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              pt: '10px',
              color: state.currentPlayer === 1 ? 'red' : 'yellow',
            }}
          >
            {state.message}
          </ThemeUI.Box>
        )}

        {isStepBack && (
          <ThemeUI.Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              pt: '10px',
            }}
          >
            <ThemeUI.Button
              sx={{
                backgroundColor: 'green',
                borderRadius: '8px',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '1px 1px 18px 3px hsl(53.89,100.00%,67.25%)',
                  transform: 'scale3d(1.01, 1.01, 1.01)',
                  transition: 'all .2s',
                },
              }}
              onClick={() => {
                undo()
              }}
            >
              Undo
            </ThemeUI.Button>
          </ThemeUI.Box>
        )}
      </ThemeUI.Box>
    </>
  )
}
