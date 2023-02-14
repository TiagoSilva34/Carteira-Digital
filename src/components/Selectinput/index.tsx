import React from 'react'
import { 
  Container,
} from './styles'


interface ISelectInputProps {
  options: {
    value: string | number,
    label: string | number
  }[]
}

export const SelectInput: React.FC<ISelectInputProps> = ({ options }) => {
  return (
    <Container>
      <select>
       {options.map(opt => (
        <option value={opt.value}>{opt.label}</option>
       ))}
      </select>
    </Container>
  )
}