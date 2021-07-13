import React from 'react'
import MuiAppBar, { AppBarProps } from '@material-ui/core/AppBar'
import useTheme from 'hooks/useTheme'

export default function AppBar({ children, ...rest }: AppBarProps) {
  const theme = useTheme()
  return (
    <MuiAppBar
      position="static"
      style={{
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.bg3}`,
        backgroundColor: theme.bg0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      {...rest}
    >
      {children}
    </MuiAppBar>
  )
}
