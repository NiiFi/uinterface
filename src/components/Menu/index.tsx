import React from 'react'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper, { PopperProps } from '@material-ui/core/Popper'
import MenuList from '@material-ui/core/MenuList'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import useTheme from 'hooks/useTheme'

export type CustomMenuProps = PopperProps & { onClose: () => void }
export default function CustomMenu({ children, onClose, ...rest }: CustomMenuProps) {
  const theme = useTheme()
  return (
    <Popper {...rest} transition disablePortal>
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: 'bottom' }}>
          <ClickAwayListener onClickAway={onClose}>
            <Paper style={{ borderRadius: '12px', backgroundColor: theme.bg0, border: `1px solid ${theme.bg1}` }}>
              <MenuList>{children}</MenuList>
            </Paper>
          </ClickAwayListener>
        </Grow>
      )}
    </Popper>
  )
}
