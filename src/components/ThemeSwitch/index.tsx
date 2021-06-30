import React, { useCallback } from 'react'
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { useDarkModeManager } from 'state/user/hooks'
interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string
}
interface Props extends SwitchProps {
  classes: Styles
}
const IOSSwitch = withStyles(() =>
  createStyles({
    root: {
      width: 56,
      height: 28,
      padding: 0,
    },
    switchBase: {
      padding: 3,
      '&$checked': {
        transform: 'translateX(28px)',
        '& + $track': {
          opacity: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.38)',
        },
        '& $thumb': {
          backgroundColor: 'rgba(6, 34, 32, 1)',
        },
      },
    },
    thumb: {
      width: 20,
      height: 20,
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    track: {
      borderRadius: 28 / 2,
      backgroundColor: '#C9F0ED',
      opacity: 1,
      transition: 'background-color border 300 cubic-bezier(0.4, 0, 0.2, 1) 0',
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  )
})

export default function ThemeSwitch() {
  const [darkMode, toggleSetDarkMode] = useDarkModeManager()
  const handleChange = useCallback(() => {
    toggleSetDarkMode()
  }, [toggleSetDarkMode])
  return <IOSSwitch checked={darkMode} onChange={handleChange} name="toggleDarkMode" />
}
