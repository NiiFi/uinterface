import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MuiTabs, { TabsProps } from '@material-ui/core/Tabs'
import useTheme from 'hooks/useTheme'

export default function Tabs(props: TabsProps) {
  const theme = useTheme()
  const useStyles = makeStyles({
    root: {
      borderBottom: `1px solid ${theme.bg3}`,
      flex: 1,
      minHeight: '40px',
    },
    indicator: {
      backgroundColor: 'transparent',
    },
  })
  return <MuiTabs {...props} classes={useStyles()} />
}
