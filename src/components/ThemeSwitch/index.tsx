import React, { useCallback } from 'react'
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { useDarkModeManager } from 'state/user/hooks'
import styled from 'styled-components/macro'
import { DarkModeIcon, LightModeIcon } from '../Icons'
interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string
}
interface Props extends SwitchProps {
  classes: Styles
  onChange: () => void
}

const SwitchWrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 56px;
  height: 28px;
`
const SwitchIcon = styled.span<{ isDark?: boolean }>`
  position: absolute;
  width: fit-content;
  top: 0;
  right: ${({ isDark }) => !isDark && '5px'};
  left: ${({ isDark }) => isDark && '-5px'};
  z-index: 1;
`
const CustomSwitch = withStyles(() =>
  createStyles({
    root: {
      width: 56,
      height: 28,
      padding: 0,
    },
    switchBase: {
      padding: 4,
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
  const { checked } = props
  return (
    <SwitchWrapper
      onClick={(e) => {
        e.stopPropagation()
        props.onChange && props.onChange()
      }}
    >
      {checked && (
        <SwitchIcon isDark={true}>
          <DarkModeIcon color={'rgba(6, 34, 32, 1)'} width={'32'} height="30" />
        </SwitchIcon>
      )}
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
      {!checked && (
        <SwitchIcon>
          <LightModeIcon color={'rgba(12, 68, 63, 0.6)'} width={'24'} height="29" />
        </SwitchIcon>
      )}
    </SwitchWrapper>
  )
})

export default function ThemeSwitch() {
  const [darkMode, toggleSetDarkMode] = useDarkModeManager()
  const handleChange = useCallback(() => {
    toggleSetDarkMode()
  }, [toggleSetDarkMode])
  return (
    <CustomSwitch
      checked={darkMode}
      onClick={(e) => e.stopPropagation()}
      onChange={handleChange}
      name="toggleDarkMode"
    />
  )
}
