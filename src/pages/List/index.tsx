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
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1))
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()))
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
    {value: 8, label: "Agosto"},
    {value: 9, label: "Setembro"},
    {value: 2, label: "Fevereiro"},
  ]

  const years = [
    {value: 2023, label: 2023},
    {value: 2019, label: 2019},
    {value: 2018, label: 2018},
  ]

  useEffect(() => {
    const filteredDate = listData.filter(item => {
      const date = new Date(item.date)
      const month = String(date.getMonth() + 1)
      const year = String(date.getFullYear())
      return month === monthSelected && year === yearSelected
    })
    
    const formattedData = filteredDate.map(item => {
      return {
        id: String(new Date().getTime()) + item.amount,
        description: item.description, 
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4E41F0" : "#E44C4E"
      }
    })

    setData(formattedData)
  }, [listData, monthSelected, yearSelected, data.length])


  return (
    <Container>
       <ContentHeader 
        title={title.title}
        lineColor='#E44C4E'
      >
        <SelectInput 
          options={months}
          onChange={e => setMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput 
          options={years}
          onChange={e => setYearSelected(e.target.value)}
          defaultValue={yearSelected}
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