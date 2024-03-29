import { formatCurrency } from '../../utils/formatCurrency'
import {
  Container,
  SideLeft,
  SideRight,
  LegendContainer,
  Legend
} from './styles'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Tooltip
} from 'recharts'

interface IBarChartProps {
  title: string,
  data: {
    name:string,
    amount: number,
    percent: number,
    color: string 
  }[] 
}

export const BarChartBox: React.FC<IBarChartProps> = ({
  title,
  data
}) => {
  return (
    <Container>
      <SideLeft>
        <h2>{title}</h2>

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
          <BarChart data={data}>
            <Bar dataKey="amount">
              {data.map(indicator => (
                <Cell 
                  key={indicator.name}
                  cursor="pointer"
                  fill={indicator.color}
                />
              ))}
            </Bar>
            <Tooltip formatter={(value) => formatCurrency(Number(value))}/>
          </BarChart>
        </ResponsiveContainer>
      </SideRight>
    </Container>
  )
}