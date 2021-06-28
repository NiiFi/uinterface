import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import { colors } from '../../../theme'

interface StyledTabsProps {
  value: number
  onChange: (event: React.ChangeEvent<any>, newValue: number) => void
}

export default withStyles({
  root: {
    borderBottom: `1px solid ${colors(false).bg3}`,
    flex: 1,
    minHeight: '40px',
  },
  indicator: {
    backgroundColor: 'transparent',
  },
})((props: StyledTabsProps) => <Tabs {...props} />)
