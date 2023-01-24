import { Game } from './game'
import * as ThemeUI from 'theme-ui'

function App() {
  return (
    <ThemeUI.Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
      }}
    >
      <Game />
    </ThemeUI.Box>
  )
}

export default App
