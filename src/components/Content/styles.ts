import styled from "styled-components";

export const Container = styled.div `
  grid-area: CT;
  color: ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.primary};

  padding: 25px;
`