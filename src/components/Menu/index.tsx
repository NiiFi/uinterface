import React from 'react'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper, { PopperProps } from '@material-ui/core/Popper'
import MenuList from '@material-ui/core/MenuList'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

export type CustomMenuProps = PopperProps & { onClose: () => void }
export default function CustomMenu({ children, onClose, ...rest }: CustomMenuProps) {
  return (
    <Popper {...rest} transition disablePortal>
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: 'bottom' }}>
          <ClickAwayListener onClickAway={onClose}>
            <Paper>
              <MenuList>{children}</MenuList>
            </Paper>
          </ClickAwayListener>
        </Grow>
      )}
    </Popper>
  )
}
