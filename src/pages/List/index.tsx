import React from 'react'
import { ContentHeader } from '../../components/ContentHeader'
import { HistoryFinanceCard } from '../../components/HistoryFinanceCard'
import { SelectInput } from '../../components/Selectinput'
import { 
  Container,
  Content 
} from './style'

export const List: React.FC = () => {
  const options = [
    {
      value: "Rodrigo",
      label: "Rodrigo"
    }
  ]

  return (
    <Container>
       <ContentHeader 
        titulo='Saídas'
        lineColor='#E44C4E'
      >
        <SelectInput 
          options={options}
        />
      </ContentHeader>

      <Content>
        <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
        <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
         <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
          <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
          <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
          <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
          <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
          <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
          <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
          <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
          <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
          <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
          <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
          <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
          <HistoryFinanceCard 
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        />
        
      </Content>
    </Container>
  )
}