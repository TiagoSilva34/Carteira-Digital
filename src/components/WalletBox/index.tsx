import React, { useMemo } from "react"

import dollarImg from "../../assets/dollar.svg"
import arrowUpImg from "../../assets/arrow-up.svg"
import arrowDownImg from "../../assets/arrow-down.svg"

import CountUp from "react-countup"

import { Container } from "./styles"
interface IWalletBoxProps {
  title: string 
  amount: number 
  footerLabel: string
  icon?: 'dollar' | 'arrowUp' | 'arrowDown'
  color: string
}

export const WalletBox: React.FC<IWalletBoxProps> = ({
  title,
  amount,
  footerLabel,
  icon,
  color
}) => {
  const iconSelected = useMemo(() => {
    switch(icon) {
      case 'dollar':
        return dollarImg
      case 'arrowUp':
        return arrowUpImg
      case 'arrowDown':
        return arrowDownImg
      default:
        return undefined
    }
  }, [icon]) 

  return (
    <Container
      color={color}
    >
      <span>{title}</span>
      <h1>
        <CountUp 
          end={amount}  
          prefix="R$ "  
          separator="."   
          decimal=","   
          decimals={2}
        />
      </h1>
      <small>{footerLabel}</small>
      {iconSelected && <img src={iconSelected} alt={title} />}
    </Container>
  )
}