import React from 'react'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'

export default withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: 500,
      marginRight: theme.spacing(4),
      color: 'black',
      '&:hover': {
        opacity: 1,
      },
      '&$selected': {
        fontWeight: 700,
      },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />)

interface StyledTabProps {
  label: string
}
