import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tab, { TabProps } from '@material-ui/core/Tab'
import useTheme from 'hooks/useTheme'

type CustomTabProps = TabProps & {
  wrapperStyles?: {
    root?: React.CSSProperties
    hover?: React.CSSProperties
    selected?: React.CSSProperties
  }
}
export default function CustomTab({ wrapperStyles = {}, ...props }: CustomTabProps) {
  const theme = useTheme()
  const useStyles = makeStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: 500,
      marginRight: '0px',
      color: theme.text4,
      '& > .MuiTab-wrapper': {
        padding: '0.5rem 1rem',
        ...wrapperStyles?.root,
      },
      '&:hover': {
        opacity: 1,
        fontWeight: 700,
        color: theme.primary1,
        '& > .MuiTab-wrapper': {
          backgroundColor: theme.bg5,
          borderRadius: '8px',
          ...wrapperStyles?.hover,
        },
      },
      '&$selected': {
        fontWeight: 700,
        color: theme.primary1,
        '& > .MuiTab-wrapper': {
          backgroundColor: theme.bg5,
          borderRadius: '8px',
          ...wrapperStyles?.selected,
        },
      },
    },
    selected: {},
  })
  return <Tab disableRipple {...props} classes={useStyles()} />
}
