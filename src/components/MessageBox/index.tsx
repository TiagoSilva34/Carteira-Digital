import { Container } from "./styles"

interface IMessageBoxProps {
  title: string 
  description: string 
  footer: string 
  icon: string
}

export const MessageBox: React.FC<IMessageBoxProps>  = ({
  title,
  description,
  footer,
  icon
}) => {
  return (
    <Container>
        <header>
          <h1>
            {title} 
            <img src={icon} alt="" />
          </h1>
          <p>{description}</p>
        </header>
        
        <footer>
          <span>{footer}</span>
        </footer>
    </Container>
  )
}