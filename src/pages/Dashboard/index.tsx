import React, { useMemo, useState } from 'react'

import { ContentHeader } from '../../components/ContentHeader'
import { SelectInput } from '../../components/Selectinput'
import { WalletBox } from '../../components/WalletBox'

import gains from "../../repositories/gains"
import expenses from "../../repositories/expenses"
import listOfMonths from "../../utils/months"

import { 
  Container,
  Content 
} from './styles'

export const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1)
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())
  const options = [
    {
      value: "Rodrigo",
      label: "Rodrigo"
    }
  ]

  const years = useMemo(() => {
    let uniqueYears: number[] = []

    const expensesAndGains: any[] = [...expenses, ...gains]

    expensesAndGains.forEach(item => {
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
  
  }, [])

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month
      }
    })
  }, [])


  const handleMonthSelected = (month: string) => {
    try {
      var parseMonth = Number(month)
      setMonthSelected(parseMonth)
    } catch (error) {
      throw new Error("Invalid month value. Is accept 0 - 24")
    }
  }

  const handleYearSelected = (year: string) => {
    try {
      var parseYear = Number(year)
      setYearSelected(parseYear)
    } catch (error) {
      throw new Error("Invalid year value. Is accept integer number")
    }
  }
  return (
    <Container>
      <ContentHeader 
        title='Dashboard'
        lineColor='#fff'
      >
        <SelectInput 
          options={months}
          onChange={e => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput 
          options={years}
          onChange={e => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Content>
        <WalletBox 
          title='saldo'
          amount={150.00}
          footerLabel="Atualizado com base nas entradas e sa??das"
          icon="dollar"
          color="#4E41F0"
        />

        <WalletBox 
          title='entradas'
          amount={5000.00}
          footerLabel="Atualizado com base nas entradas e sa??das"
          icon="arrowUp"
          color="#F7931B"
        />

        <WalletBox 
          title='sa??das'
          amount={4850.00}
          footerLabel="Atualizado com base nas entradas e sa??das"
          icon="arrowDown"
          color="#E44C4E"
        />
      </Content>
    </Container>
  )
}