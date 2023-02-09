import styled from "styled-components";

declare module 'styled-components' {
  export interface DefaultTheme {
      title: string,
    
      colors: {
        primaty: string,
        secondary: string,
        tertiary: string,
    
        white: string,
        black: string,
        gray: string,
    
        success: string,
        info: string,
        warning: string
    }
  }
}