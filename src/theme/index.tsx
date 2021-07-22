import React, { useMemo } from 'react'
import { Text, TextProps as TextPropsOriginal } from 'rebass'
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Colors } from './styled'

export * from './components'

type TextProps = Omit<TextPropsOriginal, 'css'>

export const MEDIA_WIDTHS = {
  upToExtraSmall: 400,
  upToSmall: 904,
  upToMedium: 1239,
  upToLarge: 1439,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white: darkMode ? 'rgba(6, 34, 32, 1)' : white,
    black: darkMode ? white : black,

    // text
    text1: darkMode ? '#FFFFFF' : 'rgba(12, 68, 63, 1)',
    text2: darkMode ? '#C3C5CB' : 'rgba(12, 68, 63, 0.38)',
    text3: darkMode ? '#6C7284' : '#888D9B',
    text4: darkMode ? 'rgba(255, 255, 255, 0.6)' : '#0C443F',
    text5: darkMode ? '#2C2F36' : '#0C443F',
    text6: darkMode ? 'rgba(255, 255, 255, 0.38)' : 'rgba(12, 68, 63, 0.38)',

    // backgrounds / greys
    bg0: darkMode ? 'rgba(6, 34, 32, 1)' : '#FFF',
    bg1: darkMode ? '#212429' : '#F7F8FA',
    bg2: darkMode ? '#2C2F36' : '#EDEEF2',
    bg3: darkMode ? 'rgba(20, 60, 56, 1)' : '#C9F0ED',
    bg4: darkMode ? '#565A69' : 'rgba(12, 68, 63, 0.6)',
    bg5: darkMode ? 'rgba(9, 53, 49, 1)' : 'rgba(228, 247, 245, 1)',
    bg6: darkMode ? 'rgba(5, 26, 24, 1)' : white,
    bg7: darkMode ? '#051A18' : '#F7FDFC',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: '#9871F9',
    primary2: darkMode ? '#3680E7' : '#FF8CC3',
    primary3: darkMode ? '#4D8FEA' : '#FF99C9',
    primary4: darkMode ? '#376bad70' : '#F6DDE8',
    primary5: darkMode ? '#153d6f70' : '#FDEAF1',

    // color text
    primaryText1: darkMode ? '#6da8ff' : '#ff007a',

    // secondary colors
    secondary1: darkMode ? '#2172E5' : '#ff007a',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#FDEAF1',

    // other
    red1: '#FD4040',
    red2: '#F82D3A',
    red3: '#D60000',
    green1: '#27AE60',
    green2: '#09CF7C',
    yellow1: '#e3a507',
    yellow2: '#ff8f00',
    yellow3: '#F3B71E',
    blue1: '#2172E5',
    blue2: '#5199FF',
    orange1: '#F79942',

    error: 'rgba(239, 70, 47, 1)',
    success: '#27AE60',
    warning: '#ff8f00',

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  label(props: TextProps) {
    return <TextWrapper fontWeight={600} color={'text1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} color={'text1'} {...props} />
  },
  mediumHeaderEllipsis(props: TextProps) {
    return (
      <TextWrapper
        fontWeight={500}
        fontSize={20}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        {...props}
      />
    )
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'blue1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow3'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  },
}

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg1} !important;
}

a {
 color: ${({ theme }) => theme.blue1}; 
}
`
export const Disclaimer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.warning};
  color: black;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.bg3};
  font-size: 0.75rem;
  padding: 10px 20px;
  > span {
    font-weight: bold;
  }
`

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const CircleWrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.bg0};
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 50%;
`
