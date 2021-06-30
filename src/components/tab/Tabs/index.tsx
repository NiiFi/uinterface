import React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import useTheme from 'hooks/useTheme'

interface StyledTabsProps {
  value: number
  onChange: (event: React.ChangeEvent<any>, newValue: number) => void
}

export default withStyles(() => {
  const theme = useTheme()
  return createStyles({
    root: {
      borderBottom: `1px solid ${theme.bg3}`,
      flex: 1,
      minHeight: '40px',
    },
    indicator: {
      backgroundColor: 'transparent',
    },
  })
})((props: StyledTabsProps) => <Tabs {...props} />)
