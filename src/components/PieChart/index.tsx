import { Container } from "./styles"
import { 
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts'
import {
  SideLeft,
  LegendContainer,
  Legend,
  SideRight
} from './styles'

export const PieChartComponent: React.FC = () => 
  (
    <Container>
      <SideLeft>
        <LegendContainer>
          <Legend color="#F7931B">
            <div>95%</div>
            <span>Entradas</span>
          </Legend>
          <Legend color="#E44C4E">
            <div>95%</div>
            <span>Saídas</span>
          </Legend>
        </LegendContainer>
      </SideLeft>

      <SideRight>
        <ResponsiveContainer>
          <PieChart>
            <Pie 
              data={[]}
              labelLine={false}
              dataKey="percent"
            >

            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </SideRight>
    </Container>
  )
