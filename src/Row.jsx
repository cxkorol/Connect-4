import * as ThemeUI from 'theme-ui'

export const Row = ({ row, play }) => {
  return (
    <tr>
      {row.map((cell, i) => (
        <Cell key={i} value={cell} columnIndex={i} play={play} />
      ))}
    </tr>
  )
}

export const Cell = ({ value, columnIndex, play }) => {
  const cellColor = () => {
    switch (value) {
      case 1:
        return 'red'
      case 2:
        return 'yellow'
      default:
        return 'white'
    }
  }

  return (
    <td>
      <ThemeUI.Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          height: ['40px', null, '75px'],
          width: ['40px', null, '75px'],
          backgroundColor: 'white',
          cursor: 'pointer',
        }}
        onClick={() => {
          play(columnIndex)
        }}
      >
        <ThemeUI.Box
          sx={{
            width: ['40px', null, '75px'],
            height: ['40px', null, '75px'],
            borderRadius: '50%',
            transition: 'background-color 0.4s',
            backgroundColor: cellColor,
          }}
        />
      </ThemeUI.Box>
    </td>
  )
}
