import React, { useState } from 'react'


import { 
  Container, 
  ToggleLabel,
  ToggleSelector 
} from "./styles"

export const Toggle: React.FC = () => {
  const [show, setShow] = useState(false)

  return (
    <Container>
      <ToggleLabel>dark</ToggleLabel>
      <ToggleSelector
        checked={show}
        uncheckedIcon={false}
        checkedIcon={false}
        onChange={() => setShow(!show)}
      />
      <ToggleLabel>light</ToggleLabel>
    </Container>
  )
}