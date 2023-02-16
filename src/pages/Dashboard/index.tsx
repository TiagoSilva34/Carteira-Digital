import React from 'react'
import { ContentHeader } from '../../components/ContentHeader'
import { SelectInput } from '../../components/Selectinput'
import { Container } from './styles'

export const Dashboard: React.FC = () => {
  const options = [
    {
      value: "Rodrigo",
      label: "Rodrigo"
    }
  ]
  return (
    <Container>
      <ContentHeader 
        title='Dashboard'
        lineColor='#fff'
      >
        <SelectInput 
          options={options}
        />
      </ContentHeader>
    </Container>
  )
}