import React, { useMemo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ContentHeader } from '../../components/ContentHeader'
import { HistoryFinanceCard } from '../../components/HistoryFinanceCard'
import { SelectInput } from '../../components/Selectinput'
import gains from "../../repositories/gains"
import expenses from "../../repositories/expenses"
import { 
  Container,
  Content,
  Filters 
} from './style'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

interface IData {
  id: string
  description: string 
  amountFormatted: string
  frequency: string 
  dataFormatted: string 
  tagColor: string 
}

export const List: React.FC = () => {
  const { type } = useParams()
  const [data, setData] = useState<IData[]>([])

  const title = useMemo(() => {
    return type === 'entry-balance' ? {
      title: "Entradas",
      lineColor: ""
    } : {
      title: "Saídas",
      lineColor: "#E44C4E"
    }
  }, [type])

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses
  }, [type])

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

  useEffect(() => {
    const response = listData.map(item => {
      return {
        id: String(Math.random() * data.length),
        description: item.description, 
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4E41F0" : "#E44C4E"
      }
    })

    setData(response)
  }, [])

  return (
    <Container>
       <ContentHeader 
        title={title.title}
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
        {data.map(item => (
          <HistoryFinanceCard 
          tagColor={item.tagColor}
          title={item.description}
          subTitle={item.dataFormatted}
          amount={item.amountFormatted}
          /> 
        ))}
      </Content>
    </Container>
  )
}