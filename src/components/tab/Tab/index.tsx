import React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import { colors } from '../../../theme'
export default withStyles(() =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: 500,
      marginRight: '0px',
      color: colors(false).bg4,
      '& > .MuiTab-wrapper': {
        padding: '0.5rem 1rem',
      },
      '&:hover': {
        opacity: 1,
        fontWeight: 700,
        color: colors(false).primary1,
        '& > .MuiTab-wrapper': {
          backgroundColor: colors(false).bg5,
          borderRadius: '8px',
        },
      },
      '&$selected': {
        fontWeight: 700,
        color: colors(false).primary1,
        '& > .MuiTab-wrapper': {
          backgroundColor: colors(false).bg5,
          borderRadius: '8px',
        },
      },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />)

interface StyledTabProps {
  label: string
}
