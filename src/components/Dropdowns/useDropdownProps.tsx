import { useRef, useCallback, useState } from 'react'

export default function useDropdownProps() {
  const [open, setOpen] = useState<boolean>(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])
  const handleClick = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  return { open, elementRef, handleClose, handleClick }
}
