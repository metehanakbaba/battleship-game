import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    body: string
    header: string
    text: string
    gray: string
    grayShip: string
    toggleBorder: string
    black: string
    logo: string
    red: string
    gameBoard:
      {
        your: {
          field: string
          hover: string
          hit: string
          miss: string
        }
        opponent: {
          field: string
          hover: string
          hit: string
          miss: string
        }
      }
  }
}