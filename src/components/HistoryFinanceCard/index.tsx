import React from "react"
import { 
  Container,
  Tag 
} from "./styles"


interface IHistoryFinanceCard {
  cardColor: string 
  tagColor: string
  title: string 
  subTitle: string
  amount: string
}

export const HistoryFinanceCard: React.FC<IHistoryFinanceCard> = ({
  cardColor,
  tagColor,
  title,
  subTitle,
  amount
}) => {
  return (
    <Container color={cardColor}>
      <Tag color={tagColor} />
      <div>
        <span>{title}</span>
        <small>{subTitle}</small>
      </div>
      <h3>{amount}</h3>
    </Container>
  )
}