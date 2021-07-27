import { useWindowSize } from './useWindowSize'

export default function useBreakpoint(breakpointWidth: number) {
  const { width } = useWindowSize()

  return breakpointWidth > (width || 0)
}
