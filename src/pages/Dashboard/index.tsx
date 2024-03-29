import React, { useMemo, useState } from 'react'

import { ContentHeader } from '../../components/ContentHeader'
import { SelectInput } from '../../components/Selectinput'
import { WalletBox } from '../../components/WalletBox'
import { MessageBox } from '../../components/MessageBox'
import { PieChartComponent } from '../../components/PieChart'
import { HistoryBox } from '../../components/HistoryBox'

import gains from "../../repositories/gains"
import expenses from "../../repositories/expenses"
import listOfMonths from "../../utils/months"
import sadImage from '../../assets/sad.svg'
import happyImage from '../../assets/happy.svg'

import { 
  Container,
  Content 
} from './styles'
import { BarChartBox } from '../../components/BarChartBox'

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

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpensive

    const percentGains = (totalGains / total) * 100
    const percentExpenses = (totalExpensive / total) * 100

    const data = [
      {
        name: "Entradas",
        value: totalExpensive,
        percent: Number(percentExpenses.toFixed(1)),
        color: '#F7931B'
      },
      {
        name: "Saídas",
        value: totalGains,
        percent: Number(percentGains.toFixed(1)),
        color: '#E44C4E'
      },
    ]

    return data
  }, [totalGains, totalExpensive])

  const historyData = useMemo(() => {
    return listOfMonths.map((_, month) => {
      let amountEntry = 0

      gains.forEach((gain) => {
        const date = new Date(gain.date)
        const gainMonth = date.getMonth()
        const gainYear = date.getFullYear()

        if (gainMonth === month && gainYear === yearSelected) {
          try {
            amountEntry += Number(gain.amount)
          } catch (error) {
            throw new Error('Amount entry is invalid')
          }
        } 
      })

      let amountOutput = 0
      expenses.forEach((expense) => {
        const date = new Date(expense.date)
        const gainMonth = date.getMonth()
        const gainYear = date.getFullYear()

        if (gainMonth === month && gainYear === yearSelected) {
          try {
            amountOutput += Number(expense.amount)
          } catch (error) {
            throw new Error('Amount entry is invalid')
          }
        } 
      })

      return {
        monthNumber: month,
        month: listOfMonths[month].substring(0, 3),
        amountEntry,
        amountOutput
      }
    })
    .filter(item => {
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()

      return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
    })
  }, [yearSelected])

  const relationExpensevesRecurrentVersusEventual = useMemo(() => {
    let amountReccurrent = 0
    let amountEventual = 0

    expenses.filter(expense => {
      const date = new Date(expense.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1

      return month === monthSelected && year === yearSelected
    })
    .forEach(expense => {
      if (expense.frequency === 'recorrente') {
        return amountReccurrent += Number(expense.amount)
      }

      if (expense.frequency === 'eventual') {
        return amountEventual += Number(expense.amount)
      }
    }) 

    const total = amountReccurrent + amountEventual
    const percent = Number(((amountEventual / total) * 100).toFixed(2))
    return [
      {
        name: 'Recorrentes',
        amount: amountReccurrent,
        percent,
        color: '#F7931B'
      },
      {
        name: 'Eventuals',
        amount: amountEventual,
        percent,
        color: '#E44C4E'
      }
    ]
  }, [monthSelected, yearSelected])

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountReccurrent = 0
    let amountEventual = 0

    gains.filter(gain => {
      const date = new Date(gain.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1

      return month === monthSelected && year === yearSelected
    })
    .forEach(gain => {
      if (gain.frequency === 'recorrente') {
        return amountReccurrent += Number(gain.amount)
      }

      if (gain.frequency === 'eventual') {
        return amountEventual += Number(gain.amount)
      }
    }) 

    const total = amountReccurrent + amountEventual
    const percent = Number(((amountEventual / total) * 100).toFixed(2))
    return [
      {
        name: 'Recorrentes',
        amount: amountReccurrent,
        percent,
        color: '#F7931B'
      },
      {
        name: 'Eventuals',
        amount: amountEventual,
        percent,
        color: '#E44C4E'
      }
    ]
  }, [monthSelected, yearSelected])


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

        <PieChartComponent 
          data={relationExpensesVersusGains}
        />

        <HistoryBox 
          data={historyData}
          lineColorAmountEntry="#F7931B"
          lineColorAmountOutput="#E44C4E"
        />

        <BarChartBox 
          title="Saídas"
          data={relationExpensevesRecurrentVersusEventual}
        />
        <BarChartBox 
          title="Entradas"
          data={relationGainsRecurrentVersusEventual}
        />
      </Content>
    </Container>
  )
}