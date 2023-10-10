import React, { useMemo, useState } from 'react'

import { ContentHeader } from '../../components/ContentHeader'
import { SelectInput } from '../../components/Selectinput'
import { WalletBox } from '../../components/WalletBox'

import gains from "../../repositories/gains"
import expenses from "../../repositories/expenses"
import listOfMonths from "../../utils/months"
import sadImage from '../../assets/sad.svg'
import happyImage from '../../assets/happy.svg'

import { 
  Container,
  Content 
} from './styles'
import { MessageBox } from '../../components/MessageBox'

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

  const totalExpensive = useMemo(() => {
    let total: number = 0 

    expenses.forEach(item => {
      const date = new Date(item.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount)
        } catch {
          throw new Error('Invalid amount! Amount must be ')
        }
      }
    })

    return total
  }, [monthSelected, yearSelected])

  const totalGains = useMemo(() => {
    let total: number = 0 

    gains.forEach(item => {
      const date = new Date(item.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount)
        } catch {
          throw new Error('Invalid amount! Amount must be ')
        }
      }
    })

    return total
  }, [monthSelected, yearSelected])

  const totalBalance = useMemo(() => {
    return totalGains - totalExpensive
  }, [totalGains, totalExpensive])

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description: "Neste mês, você gastou mais do que deveria",
        footerText: "Verifique suas saídas",
        icon: sadImage
      }
    } else if (totalBalance === 0) {
      return {
        title: "Ufaaa!",
        description: "Neste mês, você gastou exatamente o que ganho",
        footerText: "Tome cuidado",
        icon: happyImage
      }
    } else {
      return {
        title: "Que triste!",
        description: "Neste mês, você gastou exatamente o que ganho",
        footerText: "Tome cuidado",
        icon: happyImage
      }
    }
  }, [totalBalance])

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
          amount={totalBalance}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="dollar"
          color="#4E41F0"
        />

        <WalletBox 
          title='entradas'
          amount={totalGains}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="arrowUp"
          color="#F7931B"
        />

        <WalletBox 
          title='saídas'
          amount={totalExpensive}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="arrowDown"
          color="#E44C4E"
        />
        <MessageBox 
          title={message.title}
          description={message.description}
          footer={message.footerText}
          icon={message.icon}
        />
      </Content>
    </Container>
  )
}