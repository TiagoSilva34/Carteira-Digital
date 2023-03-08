import styled from "styled-components"
interface IContainerProps {
  color: string 
}

export const Container = styled.div<IContainerProps> `
  background-color: ${props => props.color};
  color: ${props => props.theme.colors.white};

  height: 150px;
  width: 32%;

  margin: 10px 0;

  border-radius: 5px;
  padding: 10px 20px;

  position: relative;

  overflow: hidden;

  > img {
    height: 110%;

    position: absolute;
    top: -10px;
    right: -30px;

    opacity: .3;
  }

  > span {
    font-size: 20px;
    font-weight: 500;
  }

  > small {
    font-size: 12px;

    position: absolute;
    bottom: 10px;
  }
`