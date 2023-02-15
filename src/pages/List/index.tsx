import React from 'react'
import { ContentHeader } from '../../components/ContentHeader'
import { HistoryFinanceCard } from '../../components/HistoryFinanceCard'
import { SelectInput } from '../../components/Selectinput'
import { 
  Container,
  Content,
  Filters 
} from './style'

export const List: React.FC = () => {
  const months = [
    {value: 7, label: "Julho"},
    {value: 8, label: "Agosto"},
    {value: 9, label: "Setembro"},
  ]

  const years = [
    {value: 2020, label: 2020},
    {value: 2019, label: 2019},
    {value: 2018, label: 2018},
  ]

  return (
    <Container>
       <ContentHeader 
        titulo='Saídas'
        lineColor='#E44C4E'
      >
        <SelectInput 
          options={months}
        />
        <SelectInput 
          options={years}
        />
      </ContentHeader>

      <Filters>
        <button 
          type='button'
          className='tag-filter tag-filter-recurrent'
        >
          Recorrentes
        </button>

        <button 
          type='button'
          className='tag-filter tag-filter-eventual'
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        <HistoryFinanceCard 
          tagColor='#E44C4E'
          title='Conta de luz'
          subTitle='14/02/2023'
          amount='R$ 130,00'
        /> 
      </Content>
    </Container>
  )
}