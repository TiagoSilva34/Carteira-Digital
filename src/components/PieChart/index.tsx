import { 
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts'
import {
  Container,
  SideLeft,
  LegendContainer,
  Legend,
  SideRight
} from './styles'

interface IPieChartProps {
  data: {
    name: string
    value: number 
    percent: number
    color: string 
  }[]
}

export const PieChartComponent: React.FC<IPieChartProps> = ({ data }) => 
  (
    <Container>
      <SideLeft>
        <LegendContainer>
           {data.map(indicator => (
            <Legend key={indicator.name} color={indicator.color}>
              <div>{isNaN(indicator.percent) ? 0 : indicator.percent}%</div>
              <span>{indicator.name}</span>
            </Legend>
           ))}
        </LegendContainer>
      </SideLeft>

      <SideRight>
        <ResponsiveContainer>
          <PieChart>
            <Pie 
              data={data}
              dataKey='percent'
            >
              {data.map((indicator) => (
                <Cell key={indicator.name} fill={indicator.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </SideRight>
    </Container>
  )
