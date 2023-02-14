import React from 'react'
import { 
  Container,
  TitleContainer,
  Controllers
} from './styles'

interface IContentHeaderProps {
  titulo: string,
  lineColor: string,
  children: React.ReactNode
}

export const ContentHeader: React.FC<IContentHeaderProps> = ({
  titulo,
  lineColor,
  children
}) => {
  return (
    <Container>
      <TitleContainer lineColor={lineColor}>
        <h1>{titulo}</h1> 
      </TitleContainer> 

      <Controllers>
       {children}
      </Controllers> 
    </Container>
  )
}