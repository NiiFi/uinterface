import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'

interface StyledTabsProps {
  value: number
  onChange: (event: React.ChangeEvent<any>, newValue: number) => void
}
export default withStyles({
  root: {
    borderBottom: '2px solid #CED0D9',
    flex: 1,
  },
  indicator: {
    backgroundColor: 'transparent',
  },
})((props: StyledTabsProps) => <Tabs {...props} />)
