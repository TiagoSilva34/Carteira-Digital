import React, { useMemo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ContentHeader } from '../../components/ContentHeader'
import { HistoryFinanceCard } from '../../components/HistoryFinanceCard'
import { SelectInput } from '../../components/Selectinput'
import gains from "../../repositories/gains"
import expenses from "../../repositories/expenses"
import listOfMonths from "../../utils/months"
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import { uuid } from 'uuidv4'
import { 
  Container,
  Content,
  Filters 
} from './style'

interface IData {
  id: string
  description: string 
  amountFormatted: string
  frequency: string 
  dateFormatted: string 
  tagColor: string 
}

export const List: React.FC = () => {
  const { type } = useParams()
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1))
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()))
  const [frequencyFilterSelected, setFrequencyFilterSelected] = useState<string[]>(['recorrente', 'eventual'])
  const [data, setData] = useState<IData[]>([])

  const pageData = useMemo(() => {
    return type === "entry-balance" ? 
    {
      title: "Entradas",
      lineColor: "#F7931b",
      data: gains
    }
    :
    {
      title: "Saídas",
      lineColor: "#E44C4E",
      data: expenses
    }
  }, [type])

  const years = useMemo(() => {
    let uniqueYears: number[] = []

    const { data } = pageData

    data.forEach(item => {
      const date = new Date(item.date)
      const year = date.getFullYear()

      if(!uniqueYears.includes(year)) {
        uniqueYears.push(year)
      }
    })

    return uniqueYears.filter(item => !Number.isNaN(item)).map(year => {
      return {
        value: year,
        label: year
      }
    })
  
  }, [pageData])

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month
      }
    })
  }, [])

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency)

    if(alreadySelected >= 0) {
      const filtered = frequencyFilterSelected.filter(item => item !== frequency)
      console.log(filtered)
      setFrequencyFilterSelected(filtered)
    } else {
      setFrequencyFilterSelected(prev => [...prev, frequency])
    }
  }

  useEffect(() => {
    const { data } = pageData
    const filteredDate = data.filter(item => {
      const date = new Date(item.date)
      const month = String(date.getMonth() + 1)
      const year = String(date.getFullYear())
      return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency)
    })
    
    const formattedData = filteredDate.map(item => {
      return {
        id: String(Math.random() * 20000),
        description: item.description, 
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4E41F0" : "#E44C4E"
      }
    })

    setData(formattedData)
  }, [pageData, monthSelected, yearSelected, data.length, frequencyFilterSelected])


  return (
    <Container>
       <ContentHeader 
        title={pageData.title}
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
          className={`
          tag-filter 
          tag-filter-recurrent
          ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>

        <button 
          type='button'
          className={`
          tag-filter
          tag-filter-eventual
          ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('eventual')}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {data.map(item => (
          <HistoryFinanceCard 
          tagColor={item.tagColor}
          title={item.description}
          subTitle={item.dateFormatted}
          amount={item.amountFormatted}
          /> 
        ))}
      </Content>
    </Container>
  )
}