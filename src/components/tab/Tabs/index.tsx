import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MuiTabs, { TabsProps } from '@material-ui/core/Tabs'

export default function Tabs(props: TabsProps) {
  const useStyles = makeStyles({
    root: {
      flex: 1,
      minHeight: '40px',
    },
    indicator: {
      backgroundColor: 'transparent',
    },
  })
  return <MuiTabs {...props} classes={useStyles()} />
}
